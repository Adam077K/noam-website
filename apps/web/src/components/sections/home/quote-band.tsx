import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { video } from "@/content/home";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * Pull-quote — full-bleed EPIGRAPH on deep ink (v5 — mobile RTL clip fix).
 *
 * Fixes applied:
 * - padding-inline >=24px (was px-4=16px). Now px-6 (24px) on mobile, more on sm/lg.
 *   RTL right edge was clipping; both logical sides now have safe space.
 * - Quote font-size: clamp(1.125rem, 3.5vw, 2.75rem) — floor at 18px.
 * - Constrained max-w-[28ch] on blockquote so quote reads as one thought, not word-per-line.
 */
export function QuoteBand({ locale }: { locale: Locale }) {
  const institutions = [
    { he: "מרכז שיבא", en: "Sheba Medical Center" },
    { he: "איגוד האורולוגיה האירופי", en: "European Association of Urology" },
    { he: "המרכז לבריאות מינית", en: "Sexual Health Center" },
    { he: 'היל"ם · ESSM', en: "HILAM · ESSM" },
  ];

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 text-paper sm:px-8 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="04"
          title={{ he: "אפיגרף", en: "Epigraph" }}
          locale={locale}
          tone="inverse"
        />

        <figure className="relative mt-12 sm:mt-16">
          {/* Oversized opening quotation glyph — breaks off the start edge decoratively. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -z-0 select-none font-editorial text-[9rem] leading-[0.6] text-accent-light/20 -start-3 sm:-top-16 sm:text-[14rem] lg:-start-6"
          >
            &#8220;
          </span>

          <blockquote className="relative">
            {/*
              Quote text: >=18px floor, constrained measure (max-w-[28ch]) so the
              quote reads as one composed thought, never one word per line on mobile.
              clamp(1.125rem, 3.5vw, 2.75rem): 18px on 375px screens → 44px at 1280px.
            */}
            <p className="max-w-[28ch] font-editorial [font-size:clamp(1.125rem,3.5vw,2.75rem)] [line-height:1.22] text-paper">
              <InView as="span" className="block">
                {t(video.quote, locale)}
              </InView>
            </p>

            <figcaption className="mt-10 flex items-center gap-4">
              <InView
                as="span"
                motion="rule-draw"
                delay={300}
                className="h-px w-12 bg-accent-light"
              />
              <cite className="not-italic text-body-sm text-ink-10">
                {t(video.quoteAttribution, locale)}
              </cite>
            </figcaption>
          </blockquote>
        </figure>

        {/* Static affiliation line — quiet, hairline-led row, no scrolling. */}
        <div className="mt-16 border-t border-paper/15 pt-7 sm:mt-20">
          <p className="mb-4 text-caption uppercase tracking-[0.22em] text-paper/45 eyebrow">
            {t({ he: "שיוכים", en: "Affiliations" }, locale)}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-caption uppercase tracking-[0.16em] text-paper/65 eyebrow">
            {institutions.map((inst, i) => (
              <li key={i} className="flex items-center gap-x-6">
                {i > 0 && (
                  <span aria-hidden className="text-paper/25">
                    /
                  </span>
                )}
                <span>{t(inst, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
