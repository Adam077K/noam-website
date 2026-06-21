import { cn } from "@/lib/utils";

/**
 * Section label sitting above a heading. UPPERCASE + tracked in LTR; the `.eyebrow`
 * class (globals.css) strips both case-transform and tracking under html[lang=he]
 * since Hebrew has no case. `tone` adapts the colour for dark sections. Pure text,
 * never a background — accompanied by a short accent rule for a premium cue.
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
      ? "text-accent"
      : tone === "inverse"
        ? "text-accent-light"
        : "text-slate";

  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-[0.14em]",
        color,
        className,
      )}
    >
      {withRule && (
        <span
          aria-hidden
          className={cn(
            "h-px w-6",
            tone === "inverse" ? "bg-accent-light/60" : "bg-accent/50",
          )}
        />
      )}
      {children}
    </span>
  );
}
