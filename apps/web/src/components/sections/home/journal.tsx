import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import type { LocalizedString } from "@/content/types";
import { hero } from "@/content/home";
import { brand } from "@/content/site";
import { InView } from "@/components/ui";

/**
 * Journal/Contents design language — shared primitives (v4 "The Journal").
 *
 * The home page is composed as a scholarly medical journal: a running head, large
 * folio numerals as graphic anchors, small-caps section running-heads, and an
 * asymmetric primary/margin grid for marginalia. These primitives keep that
 * vocabulary consistent across sections while each section varies its composition.
 *
 * RTL-correct via logical properties throughout; numerals/volume render dir="ltr".
 */

/** The masthead running head: the journal volume line + clinical-record masthead. */
export function RunningHead({ locale }: { locale: Locale }) {
  return (
    <div className="border-b border-ink/15 bg-paper">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <p className="text-caption uppercase tracking-[0.2em] text-slate eyebrow">
          {t(hero.folio, locale)}
        </p>
        <p className="hidden text-caption uppercase tracking-[0.2em] text-slate-60 eyebrow sm:block">
          {t(brand.masthead, locale)}
        </p>
      </div>
    </div>
  );
}

/**
 * A section running-head: a folio numeral + a small-caps title on a hairline,
 * like the header atop a journal article. `tone` adapts for dark sections.
 */
export function SectionHead({
  folio,
  title,
  locale,
  tone = "ink",
  className,
}: {
  folio: string;
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
      <span
        className={[
          "font-mono text-[0.7rem] tracking-[0.1em]",
          inverse ? "text-accent-light" : "text-accent",
        ].join(" ")}
      >
        {folio}
      </span>
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
 * Oversized folio numeral — the signature graphic anchor. Set in the editorial
 * serif at dramatic scale, low-contrast, sitting like a chapter number. Decorative
 * (aria-hidden); the real heading order is carried by the adjacent h-tags.
 */
export function Folio({
  n,
  tone = "ink",
  className,
}: {
  n: string;
  tone?: "ink" | "inverse" | "accent";
  className?: string;
}) {
  const color =
    tone === "inverse"
      ? "text-paper/15"
      : tone === "accent"
        ? "text-accent/25"
        : "text-ink/12";
  return (
    <InView
      as="span"
      motion="fade-in-up"
      aria-hidden
      className={[
        "block select-none font-editorial leading-[0.8] tabular-nums",
        color,
        className ?? "",
      ].join(" ")}
    >
      <span dir="ltr">{n}</span>
    </InView>
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
