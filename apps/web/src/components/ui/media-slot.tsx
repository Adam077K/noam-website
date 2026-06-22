import { Icon } from "./icons";
import { cn } from "@/lib/utils";

const RATIO = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
} as const;

type Ratio = keyof typeof RATIO;

/**
 * Portrait / in-context media slot — ref-#3 style, richly designed placeholder.
 *
 * Visual anatomy:
 *  - Outer organic mist blob (large, colored, asymmetric) behind the panel — the
 *    signature visual motif; bleeds beyond the panel edge for warmth and depth.
 *  - Secondary counter-blob low on opposite side for layered depth.
 *  - Thin arc accent (SVG) adds a composed, designed mark behind the panel.
 *  - Double-bezel portrait panel: outer shell (mist-soft ring + p-1.5) wrapping an
 *    inner core surface (mist gradient, inset highlight, concentric radius).
 *  - Large NK monogram (ink at sufficient contrast) at centre — scaled up dramatically.
 *  - Fine horizontal rule beneath the monogram.
 *  - Caption credential pill (absolute, bottom of inner frame) — the floating chip.
 *
 * Object-fit:cover ready: real <Image> drops in via data-slot, zero layout shift.
 */
export function MediaSlot({
  ratio,
  alt,
  caption,
  slot,
  blob = true,
  monogram = "NK",
  className,
}: {
  ratio: Ratio;
  alt: string;
  caption?: string;
  slot: string;
  blob?: boolean;
  monogram?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      {blob && (
        <>
          {/* Primary organic mist blob — large, high-presence, bleeds beyond panel edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute -end-10 -top-10 -z-10 h-[106%] w-[102%] blur-[44px]"
            style={{
              borderRadius: "62% 38% 56% 44% / 54% 60% 40% 46%",
              background:
                "radial-gradient(ellipse at 62% 32%, #9BBDC1 0%, #BAD2D5 46%, transparent 76%)",
              opacity: 0.95,
            }}
          />
          {/* Secondary counter-blob — lower start corner, mist-200 for depth layering */}
          <span
            aria-hidden
            className="pointer-events-none absolute -start-8 bottom-[-10%] -z-10 h-[62%] w-[64%] blur-[40px]"
            style={{
              borderRadius: "48% 52% 42% 58% / 58% 44% 56% 42%",
              background:
                "radial-gradient(ellipse at 40% 70%, #A2C3C7 0%, #C8DADA 45%, transparent 74%)",
              opacity: 0.82,
            }}
          />
          {/* Thin SVG arc accent — composed signature mark behind the panel */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -end-4 -top-8 -z-10 h-[70%] w-[70%] opacity-20"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#AFC8CB"
              strokeWidth="1"
              strokeDasharray="8 6"
            />
            <circle
              cx="100"
              cy="100"
              r="72"
              stroke="#AFC8CB"
              strokeWidth="0.5"
            />
          </svg>
        </>
      )}

      {/* ── OUTER SHELL (double-bezel first layer) ─────────────────────────── */}
      <div
        className="rounded-[28px] p-[6px]"
        style={{
          background: "linear-gradient(160deg, rgba(175,200,203,0.22) 0%, rgba(200,218,218,0.12) 50%, rgba(255,255,255,0.5) 100%)",
          boxShadow:
            "0 32px 72px -20px rgba(32,42,44,0.18), 0 8px 24px -8px rgba(32,42,44,0.10), inset 0 1px 1px rgba(255,255,255,0.8)",
          border: "1px solid rgba(175,200,203,0.35)",
        }}
      >
        {/* ── INNER CORE (double-bezel second layer) ─────────────────────── */}
        <div
          data-slot={slot}
          role="img"
          aria-label={alt}
          className={cn(
            RATIO[ratio],
            "group/slot relative flex flex-col items-center justify-center overflow-hidden rounded-[22px]",
          )}
          style={{
            background:
              "linear-gradient(160deg, #F2F7F7 0%, #E5EFF0 40%, #C8DADA 100%)",
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.95), inset 0 -2px 6px rgba(32,42,44,0.06)",
          }}
        >
          {/* Soft radial inner light — crown highlight for depth */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 90% at 50% 0%, rgba(255,255,255,0.7) 0%, transparent 58%)",
            }}
          />

          {/* Concentric inner hairline ring — reads as an intentional frame */}
          <span
            aria-hidden
            className="absolute inset-[12px] rounded-[12px] ring-1"
            style={{ borderColor: "rgba(175,200,203,0.3)" }}
          />

          {/* ── MONOGRAM — large, commanding, ink at sufficient contrast ─── */}
          <span
            aria-hidden
            className="relative z-10 flex flex-col items-center gap-4"
          >
            {/* Large display monogram — ink 70% gives ~5:1 on mist-100 background */}
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(4.5rem, 10vw, 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "color-mix(in oklab, #202A2C 84%, transparent)",
              }}
            >
              {monogram}
            </span>
            {/* Fine rule beneath the monogram */}
            <span
              aria-hidden
              style={{
                display: "block",
                width: "2.5rem",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #AFC8CB, transparent)",
              }}
            />
          </span>

          {/* ── FLOATING CREDENTIAL CHIP — bottom of the inner frame ─────── */}
          {caption && (
            <span
              className="credential-chip absolute bottom-5"
              style={{ zIndex: 10 }}
            >
              <span className="credential-chip__dot" />
              {caption}
            </span>
          )}
        </div>
      </div>

      {!caption && (
        <figcaption className="sr-only">{alt}</figcaption>
      )}
    </figure>
  );
}

/**
 * Explainer video slot — ink field with mist play button.
 * No autoplay; placeholder until founder supplies embed.
 */
export function VideoSlot({
  caption,
  slot,
  label,
  className,
}: {
  caption?: string;
  slot: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      {/* Mist blob behind the video slot */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-5 -z-10 bg-mist-100/70 blur-[24px]"
        style={{ borderRadius: "58% 42% 50% 50% / 50% 55% 45% 50%" }}
      />
      <div
        data-slot={slot}
        role="img"
        aria-label={label}
        className="group/video relative flex aspect-video items-center justify-center overflow-hidden rounded-[20px] bg-ink ring-1 ring-ink-80"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_30%,rgba(175,200,203,0.12),transparent_65%)]"
        />
        {/* Mist play button on ink — calm, premium */}
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-mist text-ink shadow-[0_8px_30px_rgba(32,42,44,0.3)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/video:scale-105">
          <Icon name="play" aria-hidden className="h-6 w-6 translate-x-0.5" />
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.8125rem] text-slate">{caption}</figcaption>
      )}
    </figure>
  );
}
