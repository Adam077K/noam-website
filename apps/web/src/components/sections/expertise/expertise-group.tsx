import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import {
  type ExpertiseGroup as ExpertiseGroupData,
  expertiseCtaHref,
  founderReviewNote,
} from "@/content/expertise";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "@/components/sections/home/journal";

/**
 * One Areas-of-Care group rendered as a full journal CONTENTS section (v4 "The
 * Journal") — the locked Home table-of-contents pattern, expanded into a complete
 * listing. A folio'd SectionHead small-caps running head opens the group, beneath
 * it the serif group title + intro on an asymmetric rail, then the conditions as
 * proper contents entries: an oversized Folio numeral, the condition name in the
 * editorial serif, hairline DOT-LEADERS trailing across the row, the précis below,
 * and a clean directional → mark (NO "p.12" / "Fig." affectation — dialed down).
 *
 * Each entry keeps its stable `scroll-mt` anchor id so Home previews and external
 * deep links land precisely. The gender-affirming entry keeps its founder/legal
 * review note as a quiet caption. The core groups close on a reassurance line +
 * an underline-on-hover micro-CTA.
 *
 * RTL-correct throughout via logical props; the dot-leaders, arrow and dividers
 * mirror naturally with the writing direction.
 */
export function ExpertiseGroup({
  group,
  folio,
  locale,
}: {
  group: ExpertiseGroupData;
  /** Two-digit running-head folio for this group ("01" · "02" · "03"). */
  folio: string;
  locale: Locale;
}) {
  return (
    <section
      id={group.anchor}
      className="scroll-mt-28 bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead folio={folio} title={group.eyebrow} locale={locale} />

        {/* Group title + intro — asymmetric: serif title start-side, intro end-side. */}
        <div className="mt-10 grid gap-x-16 gap-y-6 sm:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="max-w-[16ch] text-balance font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(group.title, locale)}
            </InView>
          </h2>
          <InView
            as="p"
            motion="fade-in-up"
            delay={120}
            className="max-w-[52ch] text-body-base text-slate-strong"
          >
            {t(group.intro, locale)}
          </InView>
        </div>

        {/* The contents listing for this group. */}
        <ol className="mt-14 border-t border-ink/20 sm:mt-16">
          {group.conditions.map((condition, i) => (
            <li
              key={condition.anchor}
              id={condition.anchor}
              className="scroll-mt-28 border-b border-ink/12"
            >
              <div className="group/toc grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-8 transition-[padding] duration-500 ease-premium sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-9">
                {/* Folio numeral — the signature graphic anchor, warms on hover. */}
                <Folio
                  n={String(i + 1).padStart(2, "0")}
                  tone="accent"
                  className="text-[1.75rem] leading-none transition-colors sm:text-[2.25rem]"
                />

                <div className="min-w-0">
                  {/* The contents line: title · dot-leaders · clean directional mark.
                      The whole row is a link to the consultation request. */}
                  <Link
                    href={localeHref(locale, expertiseCtaHref)}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 focus-visible:outline-none sm:flex-nowrap"
                    aria-label={t(condition.title, locale)}
                  >
                    <span className="min-w-0 font-editorial text-index leading-tight text-ink transition-colors duration-300 group-hover/toc:text-accent">
                      {t(condition.title, locale)}
                    </span>
                    {/* Dot-leaders — a repeating-dot baseline filling the gap. */}
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
                  </Link>

                  {/* The précis. */}
                  <p className="mt-3 max-w-[64ch] text-body-base text-slate">
                    {t(condition.body, locale)}
                  </p>

                  {/* Founder/legal-review note — a quiet caption. */}
                  {condition.founderReview && (
                    <p className="mt-4 flex items-center gap-2.5 text-caption uppercase tracking-[0.14em] text-slate-60 eyebrow">
                      <span
                        aria-hidden
                        className="inline-block h-px w-6 bg-border-strong"
                      />
                      {t(founderReviewNote, locale)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Group close — quiet reassurance + underline-on-hover micro-CTA. */}
        {(group.reassurance || group.microCta) && (
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {group.reassurance && (
              <p className="max-w-[44ch] text-body-base font-medium text-slate-strong">
                {t(group.reassurance, locale)}
              </p>
            )}
            {group.microCta && (
              <Link
                href={localeHref(locale, expertiseCtaHref)}
                className="group/cta inline-flex shrink-0 items-center gap-2.5 text-body-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="relative">
                  {t(group.microCta, locale)}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-[var(--ul,left)] scale-x-0 bg-accent transition-transform duration-300 ease-premium group-hover/cta:scale-x-100 rtl:[--ul:right]"
                  />
                </span>
                <span aria-hidden className="rtl:rotate-180">
                  &#8594;
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
