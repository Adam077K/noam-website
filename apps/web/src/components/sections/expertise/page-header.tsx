import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expertiseHeader, expertiseGroups } from "@/content/expertise";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { IconCircle } from "@/components/ui/icon-circle";
import { InView } from "@/components/ui/in-view";

/**
 * Expertise page header — ref-#3 clinic-minimal structure.
 *
 * Above-fold layout:
 *   Top band:  eyebrow + H1 (left) | deck standfirst (right) — 2-col on lg+
 *   Below:     Compact group-summary card strip — 3 cards showing group title +
 *              first 2 conditions per group. This fills the first screen so the
 *              fold never looks sparse. Full condition detail scrolls below in
 *              the ExpertiseGroup sections.
 *
 * RTL-correct: logical CSS props only. No italics in Hebrew.
 * WCAG 2.2 AA: single h1 per page, focus-visible everywhere.
 */
export function ExpertiseHeader({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <Section tone="canvas" className="border-b border-ink/10">
      {/* ── Row 1: eyebrow + H1 | deck ──────────────────────────────────────── */}
      <div className="grid gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">

        {/* LEFT: eyebrow + H1 */}
        <div className="flex flex-col gap-4">
          <InView as="div" motion="fade-in-up" delay={0}>
            <Eyebrow withRule tone="default">
              {t(expertiseHeader.eyebrow, locale)}
            </Eyebrow>
          </InView>

          <InView as="div" motion="fade-in-up" delay={60}>
            <h1
              id="expertise-page-h1"
              className="max-w-[20ch] text-balance font-semibold text-ink [font-size:clamp(2.25rem,3.5vw,3rem)] [letter-spacing:-0.018em] [line-height:1.1]"
            >
              {t(expertiseHeader.title, locale)}
            </h1>
          </InView>
        </div>

        {/* RIGHT: deck / standfirst */}
        <InView
          as="p"
          motion="fade-in-up"
          delay={130}
          className="max-w-[52ch] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-slate-strong lg:pb-1"
        >
          {t(expertiseHeader.intro, locale)}
        </InView>
      </div>

      {/* ── Divider strip ────────────────────────────────────────────────────── */}
      <InView
        as="div"
        motion="fade-in-up"
        delay={180}
        className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-ink/10 pt-5"
      >
        <span className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-slate eyebrow">
          {isHe
            ? "שלושה תחומי מומחיות · 12 מצבים קליניים"
            : "Three areas of expertise · 12 clinical conditions"}
        </span>
      </InView>

      {/* ── Row 2: Group-summary card grid — fills the fold ─────────────────── */}
      {/*
        Three cards — one per expertise group. Each shows:
          • Mist icon-circle (first condition icon of the group)
          • Group title (h2-level visually, nav landmark)
          • Eyebrow ordinal ("Subject one / two / three")
          • Compact condition-name list (all conditions, one line each)
        Clicking scrolls to the full group section below.
        3 cols on lg+, 1 col on mobile (stacks).
      */}
      <div className="mt-8 grid grid-cols-1 gap-[clamp(0.75rem,2vw,1.25rem)] sm:grid-cols-3">
        {expertiseGroups.map((group, gi) => {
          const anchorHref = `#${group.anchor}`;
          return (
            <InView
              key={group.anchor}
              as="a"
              href={anchorHref}
              motion="fade-in-up"
              delay={220 + gi * 60}
              className="group/hcard block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
            >
              <Card
                interactive
                className="flex h-full flex-col gap-4 p-5 sm:p-6"
              >
                {/* Icon circle — first condition's icon */}
                <div className="flex items-center justify-between">
                  <IconCircle name={group.conditions[0].icon} size="md" />
                  <span className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate">
                    {t(group.eyebrow, locale)}
                  </span>
                </div>

                {/* Group title */}
                <p className="font-semibold leading-snug text-ink [font-size:clamp(1rem,1.5vw,1.125rem)] [letter-spacing:-0.01em]">
                  {t(group.title, locale)}
                </p>

                {/* Condition list — compact pill tags */}
                <ul className="flex flex-wrap gap-x-2 gap-y-1.5" aria-label={t(group.title, locale)}>
                  {group.conditions.map((c) => (
                    <li
                      key={c.anchor}
                      className="rounded-full bg-mist-50 px-2.5 py-1 text-[0.75rem] leading-tight text-slate-strong ring-1 ring-mist-soft"
                    >
                      {t(c.title, locale)}
                    </li>
                  ))}
                </ul>

                {/* Hover cue arrow */}
                <span
                  aria-hidden
                  className="mt-auto flex items-center gap-1 text-[0.8125rem] font-semibold text-ink-80 opacity-0 transition-opacity duration-200 group-hover/hcard:opacity-100"
                >
                  {isHe ? "לפרטים" : "See details"}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className="rtl:rotate-180 transition-transform duration-200 group-hover/hcard:translate-x-0.5 rtl:group-hover/hcard:-translate-x-0.5"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Card>
            </InView>
          );
        })}
      </div>
    </Section>
  );
}
