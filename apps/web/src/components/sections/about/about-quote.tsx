import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { quote } from "@/content/about";
import { Icon, MediaSlot, Reveal } from "@/components/ui";

/**
 * Warmth moment — an in-context portrait beside the doctor's pull-quote on a soft
 * wash band, closing the personal arc of the page before the conversion CTA. The
 * quote is set in a weight-500 face (no italic — Hebrew has none) with a large
 * accent quotation mark, mirroring the Home video-intro pull-quote treatment so the
 * two pages rhyme. A 4:5 in-context portrait slot with the composed placeholder +
 * blob carries the human presence until real photography lands. Mobile leads with
 * the portrait; both columns fade in on a short stagger.
 */
export function AboutQuote({ locale }: { locale: Locale }) {
  return (
    <section className="bg-wash px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="order-1 mx-auto w-full max-w-xs sm:max-w-sm" delay={120}>
          <MediaSlot
            ratio="4/5"
            slot="about-context-portrait"
            alt={t(quote.portraitAlt, locale)}
            caption={t(quote.portraitCaption, locale)}
          />
        </Reveal>

        <Reveal className="order-2">
          <figure>
            <Icon name="spark" aria-hidden className="mb-4 h-7 w-7 text-accent" />
            <blockquote className="max-w-2xl text-balance text-display-md font-medium leading-snug text-ink-80">
              {t(quote.text, locale)}
            </blockquote>
            <figcaption className="mt-5 text-body-sm font-medium text-slate-strong">
              {t(quote.attribution, locale)}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
