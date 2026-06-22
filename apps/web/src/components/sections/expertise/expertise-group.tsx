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
 * One Areas-of-Care group — full journal CONTENTS section (v4 "The Journal").
 *
 * V5 CHANGES:
 *   • Condition name size bumped to text-[1.125rem] sm:text-[1.25rem] (≥18px)
 *     with 24px top-margin (mt-6) from the preceding entry — reads as
 *     scannable anchors, not prose. The old text-index is kept for the first
 *     title line only; body entries get a more readable, distinct scale.
 *   • Each list item has min-h-[44px] on the interactive row for tap targets.
 *   • Disclosure chevron on every interactive row (was absent on mobile).
 *   • Gender-affirming entry renders with a "by referral / pending treatment"
 *     note as well as the founder-review callout — never a bare label stub.
 *   • Mobile: the list does NOT re-render via a second ExpertiseHeader mount.
 *     There is no conditional duplicate. Each group renders once via page.tsx.
 *   • Folio warms on hover (was already implemented — kept).
 *   • RTL: logical props only, no physical left/right.
 *   • WCAG: every interactive element has focus-visible ring.
 */

/** "By referral" note rendered on the gender-affirming care entry. */
const byReferralNote = {
  he: "בהפניה בלבד · בהמתנה לקביעת תור",
  en: "By referral only · appointment pending",
} as const;

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
      className="scroll-mt-24 bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead folio={folio} title={group.eyebrow} locale={locale} />

        {/* Group title + intro — asymmetric: serif title start-side, intro end-side. */}
        <div className="mt-8 grid gap-x-16 gap-y-5 sm:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
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

        {/* ── Conditions list ──────────────────────────────────────────────── */}
        {/*
          V5 FIX: condition names ≥18px, 24px top-margin/divider so they read
          as scannable anchors. Each row has min-h-[44px] tap target. The
          anchor is on the <li> (not just the link) so in-page deep links land
          precisely with scroll-mt-24.
        */}
        <ol className="mt-10 border-t border-ink/20 sm:mt-12">
          {group.conditions.map((condition, i) => {
            const isGenderAffirming = condition.anchor === "gender-affirming";

            return (
              <li
                key={condition.anchor}
                id={condition.anchor}
                className="scroll-mt-24 border-b border-ink/10"
              >
                <div className="group/toc grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7">
                  {/* Folio numeral — graphic anchor, warms on hover. */}
                  <Folio
                    n={String(i + 1).padStart(2, "0")}
                    tone="accent"
                    className="mt-1 text-[1.75rem] leading-none transition-colors sm:text-[2.25rem]"
                  />

                  <div className="min-w-0">
                    {/*
                      Interactive title row — min-h-[44px] for mobile tap target.
                      Condition name: text-[1.125rem] sm:text-[1.25rem] (18-20px).
                      Dot-leaders + disclosure chevron on every row.
                    */}
                    <Link
                      href={localeHref(locale, expertiseCtaHref)}
                      className="group/link flex min-h-[44px] flex-wrap items-baseline gap-x-3 gap-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:flex-nowrap"
                      aria-label={t(condition.title, locale)}
                    >
                      {/* Condition name — ≥18px mobile, scannable anchor weight. */}
                      <span className="min-w-0 font-editorial text-[1.125rem] leading-snug text-ink transition-colors duration-300 group-hover/toc:text-accent sm:text-[1.25rem]">
                        {t(condition.title, locale)}
                      </span>

                      {/* Dot-leaders — fills the gap on wider viewports. */}
                      <span
                        aria-hidden
                        className="toc-leader order-3 hidden h-[0.4em] w-auto min-w-6 flex-1 translate-y-[-0.15em] text-ink/20 transition-colors duration-300 group-hover/toc:text-accent/40 sm:block sm:order-none"
                      />

                      {/* Disclosure chevron — required tap affordance. */}
                      <span
                        aria-hidden
                        className="ms-auto shrink-0 self-center text-[0.85rem] leading-none text-slate transition-all duration-300 group-hover/toc:text-accent group-hover/toc:translate-x-0.5 rtl:rotate-180 rtl:group-hover/toc:-translate-x-0.5"
                      >
                        &#8594;
                      </span>
                    </Link>

                    {/* Précis body — body-base, generous leading. */}
                    <p className="mt-3 max-w-[64ch] text-body-base text-slate leading-[1.72]">
                      {t(condition.body, locale)}
                    </p>

                    {/*
                      Gender-affirming care: "by referral / pending treatment" note.
                      Renders FIRST so the entry never looks like a bare label stub.
                      The founder-review note follows as a secondary quiet caption.
                    */}
                    {isGenderAffirming && (
                      <p className="mt-4 inline-flex items-center gap-2 rounded-sm border border-ink/15 bg-wash px-3 py-1.5 text-[0.75rem] tracking-[0.04em] text-slate-strong">
                        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent/60" />
                        {locale === "he" ? byReferralNote.he : byReferralNote.en}
                      </p>
                    )}

                    {/* Founder/legal-review note — quiet caption. */}
                    {condition.founderReview && (
                      <p className="mt-3 flex items-center gap-2.5 text-caption uppercase tracking-[0.14em] text-slate-60 eyebrow">
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
            );
          })}
        </ol>

        {/* Group close — quiet reassurance + underline-on-hover micro-CTA. */}
        {(group.reassurance || group.microCta) && (
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
