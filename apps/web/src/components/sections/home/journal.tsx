import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import type { LocalizedString } from "@/content/types";

/**
 * Clinic-minimal section primitives (ref-#3).
 *
 * Journal motifs (running head, folio numerals, SectionHead with ordinals) have
 * been removed in the clinic-minimal pivot. Only the layout helpers remain.
 *
 * RTL-correct via logical properties throughout.
 */

/**
 * A section divider heading: a small-caps title on a hairline.
 * `tone` adapts for dark sections.
 * The `folio` prop is accepted but ignored — it exists only to avoid breaking
 * call-sites that still pass it during the transition.
 */
export function SectionHead({
  title,
  locale,
  tone = "ink",
  className,
}: {
  folio?: string;
  title: LocalizedString;
  locale: Locale;
  tone?: "ink" | "inverse";
  className?: string;
}) {
  const inverse = tone === "inverse";
  return (
    <div
      className={[
        "flex items-center gap-4 border-b pb-3 text-caption uppercase tracking-[0.22em] eyebrow",
        inverse ? "border-paper/20 text-paper/70" : "border-ink/20 text-slate",
        className ?? "",
      ].join(" ")}
    >
      <span>{t(title, locale)}</span>
      <span
        aria-hidden
        className={[
          "ms-auto h-px w-10",
          inverse ? "bg-paper/25" : "bg-ink/20",
        ].join(" ")}
      />
    </div>
  );
}

/**
 * Asymmetric journal grid: a wide PRIMARY column + a narrow MARGIN column.
 * On mobile it collapses to a single column and the margin content flows inline
 * BELOW the primary (marginalia → inline footnotes). `flip` puts the margin on
 * the start side instead of the end. Logical props keep RTL correct automatically.
 */
export function JournalGrid({
  primary,
  margin,
  flip = false,
  className,
}: {
  primary: ReactNode;
  margin: ReactNode;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "grid gap-x-10 gap-y-10 lg:gap-x-16",
        flip
          ? "lg:grid-cols-[16rem_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_16rem]",
        className ?? "",
      ].join(" ")}
    >
      <div className={flip ? "lg:order-2" : "lg:order-1"}>{primary}</div>
      <aside className={flip ? "lg:order-1" : "lg:order-2"}>{margin}</aside>
    </div>
  );
}
