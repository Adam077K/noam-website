import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expertiseHeader } from "@/content/expertise";
import { InView } from "@/components/ui";

/**
 * Areas of Care page header — editorial masthead (v2 "Quiet Authority"). No
 * portrait, no ambient blob: an eyebrow with its hairline accent, an oversized
 * editorial-serif H1, and one intro paragraph on a generous start-aligned rail,
 * closed by a single drawn ink rule that opens the catalogue below. The dense
 * index then reads as a calm contents page rather than a wall of cards.
 */
export function ExpertiseHeader({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="max-w-[34ch]">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(expertiseHeader.eyebrow, locale)}
          </p>
          <h1 className="mt-6 text-balance font-editorial text-display-xl text-ink">
            <InView as="span" className="block">
              {t(expertiseHeader.title, locale)}
            </InView>
          </h1>
        </div>

        <InView
          as="p"
          motion="fade-in-up"
          delay={120}
          className="mt-8 max-w-[60ch] text-body-lg text-slate-strong"
        >
          {t(expertiseHeader.intro, locale)}
        </InView>

        <InView
          as="div"
          motion="rule-draw"
          className="mt-16 h-px w-full bg-ink sm:mt-20"
        />
      </div>
    </section>
  );
}
