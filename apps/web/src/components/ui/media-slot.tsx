import { Icon } from "./icons";
import { cn } from "@/lib/utils";

const RATIO = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
} as const;

type Ratio = keyof typeof RATIO;

/**
 * Portrait / in-context media slot — ref-#3 style.
 * Until the founder supplies real photography, renders an intentional placeholder:
 * — soft mist gradient panel (mist-50 → mist-200 diagonal)
 * — organic mist blob behind the slot edge for warmth
 * — a monogram medallion (doctor initials) at centre
 * — a subtle caption label at lower edge
 * Object-fit:cover ready: drop a real <Image> inside and zero layout shift occurs.
 * `data-slot` marks the handoff point for photo injection.
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
          {/* Primary mist blob — peeks past the slot edge (organic shape) */}
          <span
            aria-hidden
            className="pointer-events-none absolute -end-10 -top-10 -z-10 h-[78%] w-[80%] bg-mist/35 blur-[60px]"
            style={{ borderRadius: "62% 38% 56% 44% / 54% 60% 40% 46%" }}
          />
          {/* Counter-blob low on the start side for depth */}
          <span
            aria-hidden
            className="pointer-events-none absolute -start-8 bottom-[-8%] -z-10 h-[50%] w-[58%] bg-mist-200/70 blur-[50px]"
            style={{ borderRadius: "48% 52% 42% 58% / 58% 44% 56% 42%" }}
          />
        </>
      )}
      <div
        data-slot={slot}
        role="img"
        aria-label={alt}
        className={cn(
          RATIO[ratio],
          /* Layered mist surface: gradient → hairline ring → soft shadow */
          "group/slot relative flex flex-col items-center justify-center overflow-hidden rounded-[24px]",
          "bg-gradient-to-br from-mist-50 via-mist-100 to-mist-200",
          "ring-1 ring-mist-soft",
          "[box-shadow:inset_0_1px_2px_rgba(255,255,255,0.9),0_24px_48px_-20px_rgba(32,42,44,0.14)]",
        )}
      >
        {/* Soft radial inner light for depth */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_8%,rgba(255,255,255,0.65),transparent_62%)]"
        />
        {/* Concentric inner hairline — reads as intentional frame */}
        <span aria-hidden className="absolute inset-[10px] rounded-[14px] ring-1 ring-mist/25" />

        {/* Monogram medallion — the considered placeholder */}
        <span
          aria-hidden
          className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-paper/80 shadow-[0_8px_24px_rgba(32,42,44,0.1)] ring-1 ring-mist-soft backdrop-blur-[2px]"
        >
          <span className="text-[1.375rem] font-semibold tracking-[0.04em] text-ink-80">
            {monogram}
          </span>
        </span>
        {/* Fine guide rule beneath the mark */}
        <span aria-hidden className="relative mt-4 h-px w-10 bg-mist" />

        {/* Caption label at lower edge */}
        {caption && (
          <span className="absolute bottom-0 inset-inline-0 px-4 pb-4 text-center text-[0.75rem] font-medium uppercase tracking-[0.1em] text-slate">
            {caption}
          </span>
        )}
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
