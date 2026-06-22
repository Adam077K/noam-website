import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface card — ref-#3 style.
 * Rounded 20px (radius-xl), soft mist-tinted shadow (never harsh), no strong border.
 * `interactive` adds a hover lift + border glow on the mist accent.
 * Padding follows the 8px grid.
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
        "rounded-[20px] border border-border bg-paper shadow-[0_8px_30px_rgba(32,42,44,0.08)] transition-[box-shadow,border-color] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
        interactive &&
          "hover:border-mist-soft hover:shadow-[0_12px_40px_rgba(32,42,44,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
