import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import {
  type ExpertiseGroup as ExpertiseGroupData,
  expertiseCtaHref,
  founderReviewNote,
} from "@/content/expertise";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconCircle } from "@/components/ui/icon-circle";
import { InView } from "@/components/ui/in-view";

/**
 * One Areas-of-Care group — ref-#3 clinic-minimal card grid.
 *
 * Structure per group:
 *   1. Section running head (eyebrow + title + intro text) — two-column desktop
 *   2. Card grid — 2 cols on tablet, 3 cols on desktop when ≥3 cards; 2 cols for ≤2
 *   3. Reassurance line + micro-CTA footer (groups 1 and 2 only)
 *
 * Cards: mist icon-circle → condition title (h3) → body précis → quiet hover cue.
 * Each card is NOT a link — the group-level micro-CTA and inline "by referral"
 * notes carry the interaction. This matches the ref-#3 service-card pattern.
 *
 * The gender-affirming condition renders a "by referral" badge.
 * founderReview conditions render a legal caption below the body.
 *
 * RTL: logical CSS props throughout. dir="ltr" on alphanumerics only.
 * WCAG 2.2 AA: no h1 here (page has one), min-h-[44px] tap targets on CTAs,
 * focus-visible rings, color not sole state indicator.
 *
 * Tone alternates: group index even → paper, odd → canvas (mist-50 tint).
 * The `folio` running-head folio ("01" / "02" / "03") matches the home pattern.
 *
 * `aboveFold`: when true, reduces top block-padding so group 1 starts
 * tightly below the page header — the card grid is already visible on first
 * screen without scrolling.
 */

const byReferralNote = {
  he: "בהפניה בלבד · בהמתנה לקביעת תור",
  en: "By referral only · appointment pending",
} as const;

export function ExpertiseGroup({
  group,
  folio,
  locale,
  index = 0,
  aboveFold = false,
}: {
  group: ExpertiseGroupData;
  folio: string;
  locale: Locale;
  index?: number;
  /** When true, collapses the top block-padding so this group is visible
   *  on the first screen directly under the page header. */
  aboveFold?: boolean;
}) {
  const isHe = locale === "he";
  const tone = index % 2 === 0 ? "paper" : "canvas";

  /* Card grid: 3 cols for 3+ conditions, 2 cols for exactly 2. */
  const condCount = group.conditions.length;
  const gridCols =
    condCount === 2
      ? "sm:grid-cols-2"
      : condCount >= 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-1";

  return (
    <Section
      id={group.anchor}
      tone={tone}
      className="scroll-mt-20 border-b border-ink/10"
      innerClassName={aboveFold ? "pt-10 sm:pt-12" : undefined}
    >
      {/* ── Section running head ─────────────────────────────────────────── */}
      <div className="mb-10 sm:mb-12">
        {/* ── Mobile anchor strip (< lg) ──────────────────────────────────────
            Full-width section-header row with a 2px ink hairline rule above,
            20px top/bottom padding, folio label + bold group title. This gives
            the user a strong visual pause and scannable anchor between the three
            specialty groups on narrow viewports. The h2 is placed here (the
            semantic heading for the section); on desktop it is repositioned via
            the grid below and visually hidden here to avoid duplicate headings. */}
        <div className="border-t-2 border-ink/20 py-5 lg:hidden">
          <div className="mb-1.5 flex items-center gap-3">
            <span
              className="font-mono text-[0.7rem] tracking-[0.1em] text-mist"
              aria-hidden
              dir="ltr"
            >
              {folio}
            </span>
            <Eyebrow tone="default">
              {t(group.eyebrow, locale)}
            </Eyebrow>
          </div>
          <h2 className="font-semibold text-ink [font-size:clamp(1.375rem,5vw,1.625rem)] [letter-spacing:-0.012em] [line-height:1.2]">
            {t(group.title, locale)}
          </h2>
        </div>

        {/* ── Desktop eyebrow row + 2-col grid (lg+) ───────────────────────── */}
        {/* Eyebrow row — folio numeral + label */}
        <div className="mb-5 hidden items-center gap-3 border-b border-ink/15 pb-3 lg:flex">
          <span
            className="font-mono text-[0.7rem] tracking-[0.1em] text-mist"
            aria-hidden
            dir="ltr"
          >
            {folio}
          </span>
          <Eyebrow tone="default" className="flex-1">
            {t(group.eyebrow, locale)}
          </Eyebrow>
          <span
            aria-hidden
            className="ms-auto h-px w-10 bg-ink/15"
          />
        </div>

        {/* Title + intro — asymmetric 2-col on desktop */}
        <div className="grid gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          {/* h2 on desktop only — mobile h2 is in the anchor strip above */}
          <InView as="div" motion="fade-in-up" delay={0} className="hidden lg:block">
            <h2
              aria-hidden
              className="max-w-[18ch] text-balance font-semibold text-ink [font-size:clamp(1.75rem,2.5vw,2.25rem)] [letter-spacing:-0.012em] [line-height:1.15]"
            >
              {t(group.title, locale)}
            </h2>
          </InView>

          <InView
            as="p"
            motion="fade-in-up"
            delay={80}
            className="max-w-[52ch] text-[length:var(--text-body-base)] leading-[1.7] text-slate-strong"
          >
            {t(group.intro, locale)}
          </InView>
        </div>
      </div>

      {/* ── Condition card grid ──────────────────────────────────────────── */}
      <div
        className={[
          "grid grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)]",
          gridCols,
        ].join(" ")}
      >
        {group.conditions.map((condition, i) => {
          const isGenderAffirming = condition.anchor === "gender-affirming";

          return (
            <div
              key={condition.anchor}
              id={condition.anchor}
              className="scroll-mt-24"
            >
              <InView
                as="div"
                motion="fade-in-up"
                delay={i * 60}
                className="h-full"
              >
                <Card className="flex h-full flex-col gap-5 p-6 sm:p-7">
                  {/* Icon circle — mist accent */}
                  <IconCircle name={condition.icon} size="lg" />

                  {/* Condition title */}
                  <div className="flex flex-1 flex-col gap-2.5">
                    <h3 className="text-[length:var(--text-display-sm)] font-semibold leading-[var(--text-display-sm--line-height)] tracking-[var(--text-display-sm--letter-spacing)] text-ink">
                      {t(condition.title, locale)}
                    </h3>

                    {/* Body précis */}
                    <p className="text-[length:var(--text-body-base)] leading-[1.7] text-slate-strong">
                      {t(condition.body, locale)}
                    </p>
                  </div>

                  {/* Gender-affirming: by-referral badge */}
                  {isGenderAffirming && (
                    <p className="mt-auto inline-flex items-center gap-2 rounded-[6px] border border-ink/15 bg-mist-50 px-3 py-1.5 text-[0.75rem] tracking-[0.04em] text-slate-strong">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mist"
                      />
                      {isHe ? byReferralNote.he : byReferralNote.en}
                    </p>
                  )}

                  {/* Founder/legal review caption */}
                  {condition.founderReview && (
                    <p className="mt-auto flex items-center gap-2.5 text-[length:var(--text-caption)] uppercase tracking-[0.12em] text-slate-60 eyebrow">
                      <span
                        aria-hidden
                        className="inline-block h-px w-6 bg-border-strong"
                      />
                      {t(founderReviewNote, locale)}
                    </p>
                  )}
                </Card>
              </InView>
            </div>
          );
        })}
      </div>

      {/* ── Group footer — reassurance + micro-CTA ───────────────────────── */}
      {(group.reassurance || group.microCta) && (
        <InView
          as="div"
          motion="fade-in-up"
          delay={120}
          className="mt-10 flex flex-col gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          {group.reassurance && (
            <p className="max-w-[44ch] text-[length:var(--text-body-base)] font-medium leading-[1.6] text-slate-strong">
              {t(group.reassurance, locale)}
            </p>
          )}
          {group.microCta && (
            <Button
              href={localeHref(locale, expertiseCtaHref)}
              variant="ghost"
              size="md"
              withArrow
              className="shrink-0"
            >
              {t(group.microCta, locale)}
            </Button>
          )}
        </InView>
      )}
    </Section>
  );
}
