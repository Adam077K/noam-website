import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "tinted" | "dark" | "canvas";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  canvas: "bg-canvas text-ink",
  tinted: "bg-wash text-ink",
  dark: "bg-ink text-paper",
};

/**
 * Standard section wrapper used by every page band. Owns the macro-whitespace
 * rhythm (py-20 → py-32) and the centred content rail. `tone` swaps the surface;
 * `wide` opts into the 7xl rail for hero / full-bleed moments. Vertical padding
 * can be trimmed with `tight` for belt-style bands (the credentials bar).
 */
export function Section({
  children,
  tone = "paper",
  wide = false,
  tight = false,
  as: Tag = "section",
  className,
  innerClassName,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  wide?: boolean;
  tight?: boolean;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn(TONE[tone], "px-4 sm:px-6 lg:px-8", className)}>
      <div
        className={cn(
          tight ? "py-10 sm:py-12" : "py-20 sm:py-24 lg:py-32",
          wide ? "max-w-7xl" : "max-w-6xl",
          "mx-auto",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
