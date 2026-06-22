import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { video } from "@/content/home";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * Pull-quote — a full-bleed EPIGRAPH on deep ink (v4 "The Journal").
 *
 * The composition deliberately BREAKS the margin: an oversized opening quotation
 * glyph bleeds off the start edge, and the founder's voice runs as a large serif
 * epigraph that spans wider than the body measure of the other sections — the
 * page's loudest typographic moment, by contrast quiet everywhere else. Beneath,
 * a slow institutional marquee carries the affiliations like a journal footer.
 *
 * Dark section → the serif earns its keep. RTL-correct; marquee pauses on hover
 * and is disabled under prefers-reduced-motion (see globals.css).
 */
export function QuoteBand({ locale }: { locale: Locale }) {
  const institutions = [
    { he: "המרכז הרפואי שיבא", en: "Sheba Medical Center" },
    { he: "איגוד האורולוגיה האירופי", en: "European Association of Urology" },
    { he: "המרכז לבריאות מינית", en: "Sexual Health Center" },
    { he: "האיגוד הישראלי לרפואה מינית", en: "Israeli Society for Sexual Medicine" },
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

      {/* Institutional marquee — a slow journal footer of affiliations. */}
      <div className="mt-16 border-t border-paper/15 pt-8 sm:mt-20">
        <div className="marquee group/mq" aria-hidden>
          <div className="marquee__track">
            {[0, 1].map((dup) => (
              <ul key={dup} className="marquee__group" aria-hidden={dup === 1}>
                {institutions.map((inst, i) => (
                  <li key={i} className="flex items-center gap-6 text-caption uppercase tracking-[0.2em] text-paper/55 eyebrow">
                    <span>{t(inst, locale)}</span>
                    <span aria-hidden className="text-accent-light/60">&#9670;</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        {/* Accessible static list for SR / reduced-motion (visually hidden). */}
        <ul className="sr-only">
          {institutions.map((inst, i) => (
            <li key={i}>{t(inst, locale)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
