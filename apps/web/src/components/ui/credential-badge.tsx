import { Icon, type IconName } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Authority signal. Institution eyebrow → role/title → optional verifying glyph.
 * Flat (no elevation) — trust signals sit, they don't float. The `light` variant
 * lives on paper/wash; `dark` is for the ink band, where the accent-soft border
 * reads as a faint elegant glow (AAA on ink per ART-DIRECTION-V2).
 */
export function CredentialBadge({
  institution,
  title,
  icon = "shieldCheck",
  tone = "light",
  className,
}: {
  institution: string;
  title: string;
  icon?: IconName;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex items-start gap-3.5 rounded-md border p-4 sm:p-5",
        dark
          ? "border-accent-soft/25 bg-paper/[0.04]"
          : "border-border-accent bg-wash",
        className,
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill",
          dark ? "bg-accent-light/15 text-accent-light" : "bg-paper text-accent ring-1 ring-accent-soft/70",
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="space-y-1">
        <p
          className={cn(
            "eyebrow text-eyebrow font-semibold uppercase tracking-[0.12em]",
            dark ? "text-accent-light" : "text-slate-strong",
          )}
        >
          {institution}
        </p>
        <p className={cn("text-body-sm font-medium leading-snug", dark ? "text-paper" : "text-ink")}>
          {title}
        </p>
      </div>
    </div>
  );
}
