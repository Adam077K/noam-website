import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { quote } from "@/content/about";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Pull-quote — the profile's single large serif epigraph, set to BREAK the margin.
 *
 * Reuses the Home epigraph device (an oversized opening quotation glyph bleeding
 * off the start edge, the founder's voice in the editorial serif at dramatic
 * scale) but recasts it on warm BONE rather than the dark band — here it is a
 * margin-breaking interruption inside the running profile, not a full-bleed dark
 * spread. The quote runs wider than the body measure, pushing past the reading
 * column to land as the emotional center of the piece.
 *
 * RTL-correct: the glyph and the attribution rule mirror via logical props.
 */
export function AboutQuote({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-x-clip bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="03"
          title={{ he: "אפיגרף", en: "Epigraph" }}
          locale={locale}
        />

        <figure className="relative mt-12 sm:mt-16">
          {/* Oversized quotation glyph — bleeds off the start edge, breaking margin. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -z-0 select-none font-editorial text-[9rem] leading-[0.6] text-accent/15 -start-3 sm:-top-16 sm:text-[14rem] lg:-start-6"
          >
            &#8220;
          </span>

          <blockquote className="relative">
            <p className="max-w-[24ch] font-editorial text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.16] text-ink">
              <InView as="span" className="block">
                {t(quote.text, locale)}
              </InView>
            </p>

            <figcaption className="mt-10 flex items-center gap-4">
              <InView as="span" motion="rule-draw" delay={300} className="h-px w-12 bg-accent" />
              <cite className="not-italic text-body-sm text-slate-strong">
                {t(quote.attribution, locale)}
              </cite>
            </figcaption>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
