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
 * Mist-tinted circular icon container — ref-#3 style.
 * The mist-200 fill with mist icon reads calm and premium.
 * `inverse` adapts it for the dark ink-band sections.
 * Decorative — the label beside it carries meaning.
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
        "inline-flex shrink-0 items-center justify-center rounded-full",
        inverse
          ? "bg-mist/20 text-mist ring-1 ring-mist/30"
          : "bg-mist-200 text-ink-80 ring-1 ring-mist-soft",
        RING[size],
        className,
      )}
    >
      <Icon name={name} className={GLYPH[size]} />
    </span>
  );
}
