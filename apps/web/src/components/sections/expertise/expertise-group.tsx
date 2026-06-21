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

/**
 * One Areas-of-Care group rendered as a NUMBERED EDITORIAL INDEX (v2 "Quiet
 * Authority") — the Home services-index pattern, expanded. No cards, no icon
 * chips, no wash bands. A two-column masthead (eyebrow + serif group title
 * start-side, intro end-side) over a hairline, then a numbered list: a mono
 * numeral, the condition name in the editorial serif with a hover-draw accent
 * underline, and the descriptive body in small grotesk. Hairline rules divide
 * rows; on hover the row warms and shifts a hair. Each row carries its stable
 * `scroll-mt` anchor so Home previews and deep links land precisely.
 *
 * The core groups close on a quiet reassurance line + an underline-on-hover
 * micro-CTA. The gender-affirming condition keeps its founder/legal review note.
 *
 * RTL-correct throughout via logical props; arrows, underlines and dividers
 * mirror naturally.
 */
export function ExpertiseGroup({
  group,
  locale,
}: {
  group: ExpertiseGroupData;
  locale: Locale;
}) {
  return (
    <section
      id={group.anchor}
      className="scroll-mt-24 bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Group masthead — asymmetric: label + serif title start-side, intro end-side. */}
        <div className="grid gap-x-16 gap-y-6 border-b border-ink pb-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {t(group.eyebrow, locale)}
            </p>
            <h2 className="mt-6 max-w-[16ch] text-balance font-editorial text-display-lg text-ink">
              <InView as="span" className="block">
                {t(group.title, locale)}
              </InView>
            </h2>
          </div>
          <InView
            as="p"
            motion="fade-in-up"
            delay={120}
            className="max-w-[52ch] text-body-base text-slate-strong lg:pb-1.5"
          >
            {t(group.intro, locale)}
          </InView>
        </div>

        {/* The index of conditions. */}
        <ol className="mt-2">
          {group.conditions.map((condition, i) => (
            <li
              key={condition.anchor}
              id={condition.anchor}
              className="scroll-mt-24 border-b border-border"
            >
              <div className="group/row grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-8 transition-[padding,background-color] duration-500 ease-premium hover:bg-canvas/60 hover:ps-3 sm:grid-cols-[auto_1fr] sm:gap-x-8 sm:py-10">
                {/* Numeral — mono, blue accent: the one colour in the row. */}
                <span
                  aria-hidden
                  className="font-mono text-body-sm tabular-nums text-accent sm:text-body-base"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Condition name (serif) + body descriptor (grotesk). */}
                <div className="min-w-0">
                  <h3 className="font-editorial text-index text-ink">
                    <span className="relative inline-block">
                      {t(condition.title, locale)}
                      <span
                        aria-hidden
                        className="index-underline absolute inset-x-0 -bottom-1 h-px bg-accent"
                      />
                    </span>
                  </h3>
                  <p className="mt-4 max-w-[64ch] text-body-base text-slate">
                    {t(condition.body, locale)}
                  </p>
                  {condition.founderReview && (
                    <p className="mt-4 flex items-center gap-2.5 text-caption uppercase tracking-[0.14em] text-slate-60 eyebrow">
                      <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
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
