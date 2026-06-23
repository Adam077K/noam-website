import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "tinted" | "dark" | "canvas";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  canvas: "bg-mist-50 text-ink",           /* soft mist-tinted alternating section */
  tinted: "bg-mist-50 text-ink",           /* mist-50 = the new wash */
  dark: "bg-ink text-paper",
};

/**
 * Standard section wrapper — ref-#3 structure.
 * Owns the consistent vertical rhythm (clamp(4rem, 8vw, 7rem) per spec).
 * Container max-width 1200px, inline padding clamp(1.25rem, 4vw, 2.5rem).
 * `tone` swaps the surface; `wide` opts into 1280px rail for hero moments.
 * `tight` trims padding for belt-style bands (credentials bar, stats row).
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
    <Tag
      id={id}
      className={cn(
        TONE[tone],
        "px-[clamp(1.25rem,4vw,2.5rem)]",
        className,
      )}
    >
      <div
        className={cn(
          tight
            ? "py-10 sm:py-12"
            : "py-[clamp(4rem,8vw,7rem)]",
          wide ? "max-w-[1280px]" : "max-w-[1200px]",
          "mx-auto",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
