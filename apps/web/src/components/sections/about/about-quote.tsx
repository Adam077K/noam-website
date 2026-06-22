import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { quote } from "@/content/about";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Pull-quote — the profile's philosophical epigraph.
 *
 * DESIGN INTENT (DISTINCT FROM ALL OTHER PAGES):
 * This section runs on the dark ink band — the ONLY dark section on the About
 * page — which makes it a genuine interruption in the warm-bone reading flow,
 * not just a styled box. The quote sits large and breathes; attribution is quiet.
 *
 * [FOUNDER-REVIEW] — the pull-quote text is founder voice, pending approval.
 * It is wired as-is from the copy deck and ships once the founder confirms.
 *
 * P2 FIX — RTL padding clipping:
 * The dark section uses padding-inline ≥24px (px-6) on all sizes, tested on RTL.
 * Quote text is ≥18px (text-body-lg floor) with a constrained measure (max-w-[28ch])
 * so it never runs edge-to-edge or degrades to one word per line on mobile.
 *
 * RTL-correct: logical props only; the quotation glyph mirrors via start/end logic.
 */
export function AboutQuote({ locale }: { locale: Locale }) {
  return (
    <section
      className="relative overflow-x-clip bg-ink px-6 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-36"
      aria-label={t({ he: "ציטוט פילוסופי", en: "Philosophical statement" }, locale)}
    >
      <div className="relative mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="03"
          title={{ he: "אפיגרף", en: "Epigraph" }}
          locale={locale}
          tone="inverse"
        />

        <figure className="relative mt-12 sm:mt-16">
          {/* Oversized quotation glyph — bleeds toward the start edge. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -z-0 select-none font-editorial text-[8rem] leading-[0.6] text-paper/10 -start-2 sm:-top-14 sm:text-[12rem] lg:-start-4"
          >
            &#8220;
          </span>

          <blockquote className="relative">
            {/* Quote text — min 18px (text-body-lg = 1.125rem), constrained measure.
                On very narrow widths the measure prevents single-word-per-line wrapping. */}
            <p className="max-w-[28ch] text-balance font-editorial text-[clamp(1.125rem,3.2vw,2.75rem)] leading-[1.22] text-paper">
              <InView as="span" className="block">
                {t(quote.text, locale)}
              </InView>
            </p>

            <figcaption className="mt-9 flex items-center gap-4 sm:mt-11">
              <InView
                as="span"
                motion="rule-draw"
                delay={300}
                className="h-px w-12 bg-accent-light"
              />
              <cite className="not-italic text-body-sm text-paper/70">
                {t(quote.attribution, locale)}
              </cite>
            </figcaption>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
