import { Icon } from "./icons";
import { cn } from "@/lib/utils";

const RATIO = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
} as const;

type Ratio = keyof typeof RATIO;

/**
 * Portrait / in-context media slot. Until the founder supplies real photography this
 * renders a *composed* on-brand placeholder — never a broken image. The frame is a
 * layered surface (wash-deep→surface field, hairline outer ring + inner-highlight
 * inset, soft card shadow) so it reads as an intentional, framed slot rather than an
 * empty grey box. Inside sits a bespoke monogram medallion (the doctor's initials)
 * over a fine guide rule, and a real soft-blue organic blob (`blur-3xl`, asymmetric
 * radius, offset to one side) glows behind it for the hand-placed warmth from the art
 * direction. `data-slot` marks where the real <Image> drops in; `alt` is carried so
 * it inherits a meaningful description.
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
  /** Initials shown on the placeholder medallion until real photography lands. */
  monogram?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      {blob && (
        <>
          {/* Real soft glow — a saturated accent blob, offset to the end/top so it peeks
              as an organic shape past the slot edge, not a flat uniform halo. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -end-12 -top-12 -z-10 h-[82%] w-[88%] bg-accent/40 blur-[64px]"
            style={{ borderRadius: "62% 38% 56% 44% / 54% 60% 40% 46%" }}
          />
          {/* A second, paler counter-blob low on the start side for depth balance. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -start-10 bottom-[-10%] -z-10 h-[56%] w-[64%] bg-accent-soft/80 blur-[56px]"
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
          // Layered composed surface: gradient field, hairline frame, inner highlight
          // + soft diffuse shadow. Concentric inner ring keeps the frame reading.
          "group/slot relative flex flex-col items-center justify-center overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-wash-deep via-surface to-wash-deep",
          "ring-1 ring-border",
          "[box-shadow:inset_0_1px_2px_rgba(255,255,255,0.85),inset_0_-40px_72px_-40px_rgba(20,99,230,0.32),0_24px_48px_-20px_rgba(20,32,46,0.18)]",
        )}
      >
        {/* Soft inner light from the top to give the field depth, not a flat block. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_8%,rgba(255,255,255,0.7),transparent_62%)]"
        />
        {/* Concentric inner hairline so the slot reads as an intentional frame. */}
        <span aria-hidden className="absolute inset-[10px] rounded-[12px] ring-1 ring-accent-soft/35" />

        {/* Bespoke monogram medallion — the considered placeholder. */}
        <span
          aria-hidden
          className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-paper/85 shadow-card ring-1 ring-accent-soft/60 backdrop-blur-[1px]"
        >
          <span className="text-display-md font-semibold tracking-[0.04em] text-accent">
            {monogram}
          </span>
        </span>
        {/* Fine guide rule beneath the mark — a quiet hand-placed detail. */}
        <span aria-hidden className="relative mt-5 h-px w-12 bg-accent-soft/60" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-caption text-slate">{caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * Explainer video slot. Ink field with a soft-blue play button (scales on hover);
 * bilingual caption below. No autoplay; this is a placeholder until the founder
 * supplies the embed. `data-slot` marks the drop-in point.
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
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-5 -inset-y-6 -z-10 bg-accent-tint/60 blur-[2px]"
        style={{ borderRadius: "58% 42% 50% 50% / 50% 55% 45% 50%" }}
      />
      <div
        data-slot={slot}
        role="img"
        aria-label={label}
        className="group/video relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-ink ring-1 ring-ink-80"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_30%,rgba(20,99,230,0.18),transparent_65%)]"
        />
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-pill bg-accent text-paper shadow-card transition-transform duration-200 ease-premium group-hover/video:scale-105">
          <Icon name="play" aria-hidden className="h-6 w-6 translate-x-0.5" />
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-caption text-slate">{caption}</figcaption>
      )}
    </figure>
  );
}
