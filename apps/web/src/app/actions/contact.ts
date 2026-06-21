"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactFieldErrors } from "@/lib/contact/schema";
import { checkContactRateLimit } from "@/lib/contact/rate-limit";
import { sendContactEmails } from "@/lib/contact/email";

/**
 * Contact-form server action. Validates input, enforces an IP rate limit,
 * sends the clinic notification + submitter auto-reply via Resend, and returns
 * a typed discriminated union the UI can `switch` on. No PII is ever logged.
 *
 * Honeypot (`company`) filled → silent success (the bot believes it worked).
 *
 * See `src/lib/contact/CONTRACT.md` for the client integration contract.
 */

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "rate_limit" | "send" | "server";
      fieldErrors?: ContactFieldErrors;
      /** Best-effort seconds until retry, set only when error === "rate_limit". */
      retryAfterSeconds?: number;
    };

/** Resolve the best-effort client IP from proxy headers. */
async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitContact(
  formData: FormData,
): Promise<ContactResult> {
  try {
    const raw = {
      name: formData.get("name") ?? "",
      phone: formData.get("phone") ?? "",
      email: formData.get("email") ?? "",
      areaOfInterest: formData.get("areaOfInterest") || undefined,
      preferredContact: formData.get("preferredContact") ?? "",
      message: formData.get("message") ?? "",
      // Checkbox: present (any truthy "on"/"true") → true, else false.
      privacyAck:
        formData.get("privacyAck") === "on" ||
        formData.get("privacyAck") === "true",
      company: formData.get("company") ?? "",
      locale: formData.get("locale") ?? "he",
    };

    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    if (typeof raw.company === "string" && raw.company.trim() !== "") {
      return { ok: true };
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "");
        // First error per field wins; message is our stable key.
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message as ContactFieldErrors[string];
        }
      }
      return { ok: false, error: "validation", fieldErrors };
    }

    const ip = await getClientIp();
    const rate = await checkContactRateLimit(ip);
    if (!rate.success) {
      return {
        ok: false,
        error: "rate_limit",
        retryAfterSeconds: rate.retryAfterSeconds,
      };
    }

    const sent = await sendContactEmails(parsed.data);
    if (!sent.ok) {
      return { ok: false, error: "send" };
    }

    return { ok: true };
  } catch (error) {
    // Never leak PII; log only an opaque message.
    console.error("[contact:action] unexpected failure.", {
      message: error instanceof Error ? error.message : String(error),
    });
    return { ok: false, error: "server" };
  }
}
