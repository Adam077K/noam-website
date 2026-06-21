import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * IP rate limiting for the contact form: 3 submissions per 10-minute window
 * (REDESIGN-PRD §5.4).
 *
 * Backed by Upstash Redis in production. If the Upstash env vars are absent
 * (typical in local dev), we fall back to an in-memory sliding window — this
 * resets on cold start, which is acceptable for MVP per the PRD. If anything
 * throws, we *fail open* (allow the request) and log a warning, so a Redis
 * outage never blocks a legitimate inquiry.
 */

const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export type RateLimitResult = {
  /** Whether this request is allowed through. */
  success: boolean;
  /** Seconds until the window resets (best-effort; used for messaging). */
  retryAfterSeconds: number;
};

let upstash: Ratelimit | null | undefined;

/** Lazily construct the Upstash limiter, or `null` if env is not configured. */
function getUpstashLimiter(): Ratelimit | null {
  if (upstash !== undefined) return upstash;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    upstash = null;
    return null;
  }

  upstash = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
    prefix: "contact_ratelimit",
    analytics: false,
  });
  return upstash;
}

// In-memory fallback: ip -> timestamps (ms) of submissions within the window.
const memoryHits = new Map<string, number[]>();

function memoryLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const recent = (memoryHits.get(ip) ?? []).filter((t) => t > cutoff);

  if (recent.length >= LIMIT) {
    const oldest = recent[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    memoryHits.set(ip, recent);
    return { success: false, retryAfterSeconds };
  }

  recent.push(now);
  memoryHits.set(ip, recent);
  return { success: true, retryAfterSeconds: 0 };
}

/**
 * Check (and record) a submission attempt for `ip`. Fails open on any error.
 */
export async function checkContactRateLimit(ip: string): Promise<RateLimitResult> {
  const limiter = getUpstashLimiter();

  if (!limiter) {
    if (!warnedNoUpstash) {
      console.warn(
        "[contact:rate-limit] Upstash env not set — using in-memory fallback (resets on cold start).",
      );
      warnedNoUpstash = true;
    }
    return memoryLimit(ip);
  }

  try {
    const { success, reset } = await limiter.limit(ip);
    const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { success, retryAfterSeconds: success ? 0 : retryAfterSeconds };
  } catch (error) {
    // Fail open: never block a legitimate inquiry because Redis is down.
    console.warn("[contact:rate-limit] limiter error — failing open.", {
      error: error instanceof Error ? error.message : String(error),
    });
    return { success: true, retryAfterSeconds: 0 };
  }
}

let warnedNoUpstash = false;
