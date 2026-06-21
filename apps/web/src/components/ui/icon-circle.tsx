import { Icon, type IconName } from "./icons";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const RING: Record<Size, string> = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

const GLYPH: Record<Size, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-7 w-7",
};

/**
 * Soft-blue circular icon container. The pale `accent-tint` fill keeps the bright
 * `accent` glyph legible (ink-on-soft-blue contrast is AAA per ART-DIRECTION-V2)
 * while reading warm and hand-placed rather than a sterile chip. `inverse` adapts
 * it for the dark ink band. Decorative — the label beside it carries meaning.
 */
export function IconCircle({
  name,
  size = "md",
  inverse = false,
  className,
}: {
  name: IconName;
  size?: Size;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-pill",
        inverse
          ? "bg-accent-light/15 text-accent-light ring-1 ring-accent-light/25"
          : "bg-accent-tint text-accent ring-1 ring-accent-soft/70",
        RING[size],
        className,
      )}
    >
      <Icon name={name} className={GLYPH[size]} />
    </span>
  );
}
