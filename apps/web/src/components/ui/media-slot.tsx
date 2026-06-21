import { Icon } from "./icons";
import { cn } from "@/lib/utils";

const RATIO = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
} as const;

type Ratio = keyof typeof RATIO;

/**
 * Portrait / in-context media slot. Until the founder supplies real photography
 * this renders an on-brand tinted placeholder — a wash-deep field, a soft silhouette
 * glyph, and the caption — never a broken image. A large soft-blue organic blob sits
 * behind it (asymmetric border-radius) for the hand-placed warmth from the art
 * direction. `data-slot` marks where real media drops in. `alt` is carried so the
 * future <Image> inherits a meaningful description.
 */
export function MediaSlot({
  ratio,
  alt,
  caption,
  slot,
  blob = true,
  className,
}: {
  ratio: Ratio;
  alt: string;
  caption?: string;
  slot: string;
  blob?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      {blob && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 bg-accent-tint/70 blur-[2px]"
          style={{ borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" }}
        />
      )}
      <div
        data-slot={slot}
        role="img"
        aria-label={alt}
        className={cn(
          RATIO[ratio],
          "relative flex items-center justify-center overflow-hidden rounded-xl bg-wash-deep ring-1 ring-accent-soft/40",
        )}
      >
        {/* Soft inner light to give the empty field depth, not a flat block. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_15%,rgba(255,255,255,0.55),transparent_60%)]"
        />
        <Icon name="user" aria-hidden className="relative h-20 w-20 text-accent/35" strokeWidth={1} />
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
        <figcaption className="mt-3 text-caption italic text-slate">{caption}</figcaption>
      )}
    </figure>
  );
}
