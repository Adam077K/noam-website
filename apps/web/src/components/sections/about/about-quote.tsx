import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { quote } from "@/content/about";
import { InView } from "@/components/ui";

/**
 * Editorial pull-quote — the founder's voice, set large in the display serif on
 * deep ink, reusing the Home quote-band treatment exactly so the two pages rhyme.
 * A hairline eyebrow, an oversized opening quotation glyph as a printer's mark, the
 * quote in the serif at display scale, and a hairline-led byline. Dark section →
 * the serif accent earns its keep. RTL-correct; attribution is not italicised
 * (Hebrew has no italic).
 */
export function AboutQuote({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-paper sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1100px]">
        <InView
          as="p"
          motion="fade-in-up"
          className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-accent-light eyebrow"
        >
          <span aria-hidden className="inline-block h-px w-8 bg-accent-light" />
          {t({ he: "בגובה העיניים", en: "In his words" }, locale)}
        </InView>

        {/* Oversized opening quotation mark — serif, low-opacity, as a printer's mark. */}
        <span
          aria-hidden
          className="mt-6 block font-editorial text-[5rem] leading-[0.6] text-accent-light/40 sm:text-[7rem]"
        >
          &#8220;
        </span>

        <blockquote className="mt-2">
          <p className="max-w-[26ch] font-editorial text-display-md leading-[1.28] text-paper sm:text-display-lg">
            <InView as="span" className="block">
              {t(quote.text, locale)}
            </InView>
          </p>

          <footer className="mt-10 flex items-center gap-4">
            <InView
              as="span"
              motion="rule-draw"
              delay={300}
              className="h-px w-12 bg-accent-light"
            />
            <cite className="not-italic text-body-sm text-ink-10">
              {t(quote.attribution, locale)}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
