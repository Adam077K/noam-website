import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { services } from "@/content/home";
import { InView } from "@/components/ui";

/**
 * Areas of Care — a numbered editorial INDEX (v2 "Quiet Authority").
 *
 * Replaces the icon-card grid entirely. Each area is a full-width row: a mono
 * numeral 01–04, the condition name set large in the editorial serif, a short
 * descriptor in small grotesk, and a directional mark. Hairline rules separate
 * rows; on hover the row warms, shifts a hair toward its arrow, and an accent
 * underline draws beneath the condition name. Rows link to the expertise anchors.
 *
 * RTL-correct: logical props, mirrored arrow + underline origin. The whole index
 * reads like a contents page in a serious journal — restraint as authority.
 */
export function ServicesIndex({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Section masthead — asymmetric: label + title start-side, intro end-side. */}
        <div className="grid gap-x-16 gap-y-8 border-b border-ink pb-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {t(services.eyebrow, locale)}
            </p>
            <h2 className="mt-6 max-w-[14ch] text-balance font-editorial text-display-lg text-ink">
              <InView as="span" className="block">
                {t(services.title, locale)}
              </InView>
            </h2>
          </div>
          <InView as="p" motion="fade-in-up" delay={120} className="max-w-[48ch] text-body-base text-slate-strong lg:pb-1.5">
            {t(services.intro, locale)}
          </InView>
        </div>

        {/* The index. */}
        <ol className="mt-2">
          {services.cards.map((card, i) => (
            <li key={card.key}>
              <Link
                href={localeHref(locale, card.anchor)}
                className="group/row block border-b border-border focus-visible:outline-none"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 transition-[padding,background-color] duration-500 ease-premium group-hover/row:bg-canvas/60 group-hover/row:ps-3 sm:gap-x-8 sm:py-9 lg:py-10">
                  {/* Numeral — mono, blue accent, the only colour in the row. */}
                  <span
                    aria-hidden
                    className="font-mono text-body-sm tabular-nums text-accent sm:text-body-base"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Condition name (big serif) + descriptor (small grotesk). */}
                  <div className="min-w-0">
                    <span className="relative inline-block font-editorial text-index text-ink">
                      {t(card.title, locale)}
                      <span
                        aria-hidden
                        className="index-underline absolute inset-x-0 -bottom-1 h-px bg-accent"
                      />
                    </span>
                    <span className="mt-2.5 block max-w-[46ch] text-body-base text-slate">
                      {t(card.blurb, locale)}
                    </span>
                  </div>

                  {/* Directional mark — mirrors under RTL, shifts on hover. */}
                  <span
                    aria-hidden
                    className="self-center text-xl leading-none text-slate transition-all duration-500 ease-premium group-hover/row:text-accent group-hover/row:translate-x-1 rtl:rotate-180 rtl:group-hover/row:-translate-x-1"
                  >
                    &#8594;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {/* All-areas link — quiet, underlined-on-hover, end-aligned. */}
        <div className="mt-12 flex justify-end">
          <Link
            href={localeHref(locale, "/expertise")}
            className="group/all inline-flex items-center gap-2.5 text-body-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            <span className="relative">
              {t(services.cta, locale)}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-[var(--ul,left)] scale-x-0 bg-accent transition-transform duration-300 ease-premium group-hover/all:scale-x-100 rtl:[--ul:right]"
              />
            </span>
            <span aria-hidden className="rtl:rotate-180">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
