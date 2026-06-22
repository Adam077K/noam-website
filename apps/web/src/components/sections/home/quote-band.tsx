import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { video } from "@/content/home";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * Pull-quote — a full-bleed EPIGRAPH on deep ink (v4, dial-down).
 *
 * The composition deliberately BREAKS the margin: an oversized opening quotation
 * glyph bleeds off the start edge, and the founder's voice runs as a large serif
 * epigraph. Beneath sits a STATIC, restrained affiliation line — a hairline-led
 * row of institutions (the earlier scrolling marquee is gone, per the dial-down).
 *
 * Dark section → the serif earns its keep. RTL-correct; no motion beyond the
 * quiet reveal/rule-draw (reduced-motion safe via globals.css).
 */
export function QuoteBand({ locale }: { locale: Locale }) {
  const institutions = [
    { he: "מרכז שיבא", en: "Sheba Medical Center" },
    { he: "איגוד האורולוגיה האירופי", en: "European Association of Urology" },
    { he: "המרכז לבריאות מינית", en: "Sexual Health Center" },
    { he: 'היל"ם · ESSM', en: "HILAM · ESSM" },
  ];

  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-paper sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="04"
          title={{ he: "אפיגרף", en: "Epigraph" }}
          locale={locale}
          tone="inverse"
        />

        <figure className="relative mt-12 sm:mt-16">
          {/* Oversized quotation glyph — bleeds off the start edge, breaking margin. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -z-0 select-none font-editorial text-[9rem] leading-[0.6] text-accent-light/20 -start-3 sm:-top-16 sm:text-[14rem] lg:-start-6"
          >
            &#8220;
          </span>

          <blockquote className="relative">
            <p className="max-w-[20ch] font-editorial text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.18] text-paper">
              <InView as="span" className="block">
                {t(video.quote, locale)}
              </InView>
            </p>

            <figcaption className="mt-10 flex items-center gap-4">
              <InView as="span" motion="rule-draw" delay={300} className="h-px w-12 bg-accent-light" />
              <cite className="not-italic text-body-sm text-ink-10">
                {t(video.quoteAttribution, locale)}
              </cite>
            </figcaption>
          </blockquote>
        </figure>
      </div>

      {/* Static affiliation line — a quiet, hairline-led row, no scrolling. */}
      <div className="mx-auto mt-16 w-full max-w-[1280px] border-t border-paper/15 pt-7 sm:mt-20">
        <p className="mb-4 text-caption uppercase tracking-[0.22em] text-paper/45 eyebrow">
          {t({ he: "שיוכים", en: "Affiliations" }, locale)}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-caption uppercase tracking-[0.16em] text-paper/65 eyebrow">
          {institutions.map((inst, i) => (
            <li key={i} className="flex items-center gap-x-6">
              {i > 0 && <span aria-hidden className="text-paper/25">/</span>}
              <span>{t(inst, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
