import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface card. Paper fill, hairline cool-grey border, soft diffuse card
 * shadow — no harsh drop shadow. `interactive` upgrades the shadow and warms the
 * border to accent-soft on hover (no transform: a medical surface should settle,
 * not pop). The nested padding follows the 8px rhythm.
 */
export function Card({
  children,
  interactive = false,
  className,
}: {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-paper shadow-card transition-[box-shadow,border-color] duration-[250ms] ease-premium",
        interactive && "hover:border-border-accent hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
