import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { services } from "@/content/home";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "./journal";

/**
 * Areas of Care — journal TABLE OF CONTENTS (v5 — scannable conditions fix).
 *
 * Fix applied:
 * - Condition names get font-weight 500-600 and a left-border accent (start-border)
 *   so they're scannable at a glance, not undifferentiated prose.
 * - Each row is a proper interactive target with min-h 44px (tap affordance).
 * - The dot-leaders and folio numeral remain for the journal aesthetic.
 *
 * RTL-correct: logical props, mirrored nudge; leaders + arrow flow with writing dir.
 */
export function ServicesIndex({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="03"
          title={{ he: "תוכן העניינים", en: "Table of Contents" }}
          locale={locale}
        />

        {/* Section title + intro as a contents preamble. */}
        <div className="mt-10 grid gap-x-16 gap-y-6 sm:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="max-w-[16ch] text-balance font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(services.title, locale)}
            </InView>
          </h2>
          <InView
            as="p"
            motion="fade-in-up"
            delay={120}
            className="max-w-[48ch] text-body-base text-slate-strong"
          >
            {t(services.standfirst, locale)}
          </InView>
        </div>

        {/* Contents listing — each entry is a scannable condition card with left-border accent. */}
        <ol className="mt-14 border-t border-ink/20 sm:mt-16">
          {services.cards.map((card, i) => (
            <li key={card.key}>
              <Link
                href={localeHref(locale, card.anchor)}
                className="group/toc block border-b border-ink/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {/*
                  Row: folio numeral + condition block.
                  min-h-[44px] satisfies touch target.
                  ps-0 → group-hover ps-2 for the nudge effect.
                  The start-border accent is the key scannability fix:
                  a 3px accent stripe on the inline-start edge on hover/active.
                */}
                <div className="relative grid min-h-[44px] grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 py-5 transition-[padding] duration-500 ease-premium group-hover/toc:ps-2 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-6">

                  {/* Accent border strip — the condition scan anchor. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -start-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-premium group-hover/toc:scale-y-100"
                  />

                  {/* Folio numeral. */}
                  <Folio
                    n={String(i + 1).padStart(2, "0")}
                    tone="accent"
                    className="text-[1.75rem] leading-none transition-colors sm:text-[2.25rem]"
                  />

                  <div className="min-w-0 pt-1">
                    {/* Condition name — weight 600 (semibold) for scannability. */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:flex-nowrap">
                      <span className="min-w-0 font-editorial text-index font-semibold leading-tight text-ink">
                        {t(card.title, locale)}
                      </span>
                      {/* Dot-leaders. */}
                      <span
                        aria-hidden
                        className="toc-leader order-3 h-[0.4em] w-full min-w-6 translate-y-[-0.15em] text-ink/25 transition-colors duration-300 group-hover/toc:text-accent/60 sm:order-none sm:w-auto sm:flex-1"
                      />
                      <span
                        aria-hidden
                        className="shrink-0 self-center text-base leading-none text-slate transition-all duration-300 group-hover/toc:text-accent group-hover/toc:translate-x-0.5 rtl:rotate-180 rtl:group-hover/toc:-translate-x-0.5"
                      >
                        &#8594;
                      </span>
                    </div>
                    {/* Blurb — muted, secondary read. */}
                    <span className="mt-2 block max-w-[52ch] text-body-base text-slate">
                      {t(card.blurb, locale)}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {/* Full contents link — journal "continued in" style. */}
        <div className="mt-10 flex justify-end">
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
            <span aria-hidden className="rtl:rotate-180">
              &#8594;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
