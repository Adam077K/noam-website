import { cn } from "@/lib/utils";

/**
 * Section label — sits above a heading.
 * UPPERCASE + tracked in LTR (the `.eyebrow` class in globals.css strips both
 * case-transform and tracking under html[lang=he] since Hebrew has no case).
 * `tone` adapts color for dark sections. Accompanied by an optional short mist rule.
 *
 * Color notes — all meet ≥ 4.5:1 on paper (#FFFFFF):
 *   default: slate-strong #5E6B6D ≈ 6.2:1 ✓
 *   accent:  ink-80 #3A4547 ≈ 9:1 ✓ (mist-tinted, but ink used for AA)
 *   inverse: mist-light #C9DCDE on ink ≈ 5.8:1 ✓
 */
export function Eyebrow({
  children,
  tone = "default",
  withRule = false,
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "inverse";
  withRule?: boolean;
  className?: string;
}) {
  const color =
    tone === "accent"
      ? "text-ink-80"
      : tone === "inverse"
        ? "text-mist-light"
        : "text-slate-strong";

  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em]",
        color,
        className,
      )}
    >
      {withRule && (
        <span
          aria-hidden
          className={cn(
            "h-px w-6 rounded-full",
            tone === "inverse" ? "bg-mist-light/60" : "bg-mist",
          )}
        />
      )}
      {children}
    </span>
  );
}
