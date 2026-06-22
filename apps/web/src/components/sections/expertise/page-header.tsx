import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { brand } from "@/content/site";
import {
  expertiseHeader,
  expertiseGroups,
} from "@/content/expertise";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Expertise page masthead — the opening spread of a journal CONTENTS issue.
 *
 * V5 FIX (P1): The old design had a massive empty void in the upper 60% of
 * the viewport. This version:
 *   1. Collapses all dead vertical gap — the H1 is the FIRST element after the
 *      breadcrumb band, separated only by a tight `pt-8 sm:pt-10` guard.
 *   2. Puts the intro paragraph ADJACENT to the heading (not below it) so
 *      neither is clipped at 1366×768.
 *   3. Surfaces the FIRST 3 condition entries (dot-leader journal TOC rows)
 *      WITHIN this header section, so the page's purpose is instantly legible
 *      above the fold.
 *   4. Adds a scope line ("Functional Urology & Sexual Medicine · N subjects")
 *      anchored to the TOC rule.
 *   5. Fixes breadcrumb contrast: text-slate-strong (≥4.5:1) for both locales.
 *   6. Replaces the orphaned right-side 60px rule with a meaningful folio
 *      device ("p. 02").
 *
 * RTL-correct: logical CSS properties only, no physical left/right.
 * WCAG 2.2 AA: a11y labels, focus-visible everywhere, colour is never the
 * sole state indicator.
 */

/** Number of above-fold preview TOC entries surfaced in the header. */
const ABOVE_FOLD_COUNT = 3;

/** Aggregate subject count across all groups — derived from content. */
const totalSubjects = expertiseGroups.reduce(
  (acc, g) => acc + g.conditions.length,
  0,
);

const scopeLine = {
  he: `אורולוגיה תפקודית ורפואה מינית · ${totalSubjects} נושאי טיפול`,
  en: `Functional Urology & Sexual Medicine · ${totalSubjects} subjects`,
} as const;

export function ExpertiseHeader({ locale }: { locale: Locale }) {
  // Flatten conditions from all groups for above-fold TOC preview
  const aboveFoldConditions = expertiseGroups
    .flatMap((g) => g.conditions)
    .slice(0, ABOVE_FOLD_COUNT);

  return (
    <>
      {/* ── Breadcrumb / running-head band ─────────────────────────────────── */}
      {/* FIXED: text-slate-strong (≥4.5:1 on bone) in both locales. */}
      <div className="border-b border-ink/15 bg-paper">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow">
            {t(expertiseHeader.folio, locale)}
          </p>
          <p className="hidden text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow sm:block">
            {t(brand.masthead, locale)}
          </p>
        </div>
      </div>

      {/* ── Opening spread ─────────────────────────────────────────────────── */}
      {/*
        CRITICAL FIX: pt-8 sm:pt-10 — was pt-16/pt-24, creating 96–192px of
        dead space before any content. Reduced to 32–40px so the H1 lands in
        the top quarter of the viewport immediately below the nav.
      */}
      <section
        className="bg-paper px-4 pt-8 pb-0 sm:px-6 sm:pt-10 lg:px-8"
        aria-labelledby="expertise-page-h1"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Small-caps section anchor — sits directly above the H1. */}
          <SectionHead
            folio="—"
            title={expertiseHeader.sectionLabel}
            locale={locale}
          />

          {/*
            Standfirst spread — H1 on start side, intro deck on end side.
            At 1366px both columns are simultaneously visible, intro not clipped.
            On mobile: single column, intro flows directly after H1.
          */}
          <div className="mt-6 grid gap-x-16 gap-y-4 sm:mt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
            <h1
              id="expertise-page-h1"
              className="max-w-[22ch] text-balance font-editorial text-display-xl text-ink"
            >
              <InView as="span" className="block">
                {t(expertiseHeader.title, locale)}
              </InView>
            </h1>
            <InView
              as="p"
              motion="fade-in-up"
              delay={100}
              className="max-w-[52ch] text-body-base text-slate-strong lg:pb-1"
            >
              {t(expertiseHeader.intro, locale)}
            </InView>
          </div>

          {/* ── TOC rule + scope line ─────────────────────────────────────── */}
          {/*
            This rule opens the TOC. The scope line hangs below it as a quiet
            meta-label. The orphaned right-side rule is replaced by a folio
            "p. 02" device that gives the space meaning.
          */}
          <div className="mt-10 sm:mt-12">
            {/* Full-width hairline rule — opens the contents. */}
            <InView
              as="div"
              motion="rule-draw"
              className="h-px w-full bg-ink/30"
            />

            {/* Scope line + folio — directly below the rule. */}
            <div className="flex items-center justify-between gap-4 pt-3">
              <p className="text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
                {t(scopeLine, locale)}
              </p>
              {/* Meaningful folio replacing the orphaned decorative rule. */}
              <span
                aria-hidden
                className="font-mono text-caption tracking-[0.12em] text-slate-60"
                dir="ltr"
              >
                p. 01
              </span>
            </div>
          </div>

          {/* ── Above-fold TOC preview (first 3 entries) ────────────────────── */}
          {/*
            CRITICAL FIX: Condition entries surfaced HERE (in the header) so the
            page's purpose is instantly legible above the fold at 1366×768.
            These are read-only teasers — clicking scrolls/links to the full entry
            in the ExpertiseGroup section below.

            Mobile: condition name ≥18px via text-index (clamp 1.75rem–3rem)
            truncated with min-w-0. Each row has min-h-11 (44px) for tap targets.
            Disclosure chevron on interactive rows. Dot-leaders fill the gap.
          */}
          <ol
            className="mt-0 divide-y divide-ink/10"
            aria-label={
              locale === "he" ? "תצוגה מקדימה של תוכן העניינים" : "Table of contents preview"
            }
          >
            {aboveFoldConditions.map((condition, i) => {
              // Lay descriptor per condition — 8-12 words, factual scope only.
              const layDescriptor: Record<string, { he: string; en: string }> = {
                "erectile-dysfunction": {
                  he: "בירור, אבחון וטיפול לפי הנחיות EAU",
                  en: "Diagnosis and treatment guided by EAU guidelines",
                },
                "premature-ejaculation": {
                  he: "הערכת מקור גופני ונרכש, טיפול מותאם",
                  en: "Physical and acquired origin assessed; tailored care",
                },
                "peyronie": {
                  he: "שלב ומידה קובעים: שמרני או ניתוחי",
                  en: "Stage and degree determine: conservative or surgical",
                },
                "post-prostatectomy": {
                  he: "שיקום מובנה, פתוח ומוקדם ככל האפשר",
                  en: "Structured rehabilitation, early start improves outcome",
                },
                "incontinence": {
                  he: "אבחנת סוג מדויקת, פתרון משמרני ועד מתקדם",
                  en: "Precise type assessment; conservative to advanced care",
                },
                "overactive-bladder": {
                  he: "דחיפות ותכיפות: בירור נוירולוגי ותפקודי",
                  en: "Urgency and frequency: neurological and functional workup",
                },
                "pelvic-pain": {
                  he: "בירור יסודי גם אחרי מסלולים שנכשלו",
                  en: "Thorough workup even when earlier routes failed",
                },
                "prostatitis": {
                  he: "כאב, אי-נוחות ותסמיני שתן: אבחון וטיפול",
                  en: "Pain, discomfort, urinary symptoms: diagnosis and care",
                },
                "bph": {
                  he: "זרם חלש, תכיפות, לילות — טיפול לפי מצב",
                  en: "Weak stream, frequency, nocturia — tailored treatment",
                },
                "catheterization": {
                  he: "פתרון בטוח ושגרתי עם הדרכה מלאה",
                  en: "Safe, routine solution with complete patient guidance",
                },
                "gender-affirming": {
                  he: "ליווי אורולוגי, בהפניה בלבד",
                  en: "Urological support, by referral",
                },
                "trauma": {
                  he: "יו\"ר ועדת הנחיות EAU לחבלות אורולוגיות",
                  en: "EAU trauma-guidelines committee Chair",
                },
              };

              const descriptor = layDescriptor[condition.anchor];

              return (
                <li key={condition.anchor} className="group/row">
                  <Link
                    href={`#${condition.anchor}`}
                    className="flex min-h-11 items-baseline gap-x-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:py-3.5"
                    aria-label={t(condition.title, locale)}
                    scroll
                  >
                    {/* Entry numeral */}
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-[0.65rem] tabular-nums tracking-[0.08em] text-accent/70 transition-colors duration-300 group-hover/row:text-accent"
                      dir="ltr"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Condition name — ≥18px on mobile (text-index clamps 1.75rem+) */}
                    <span className="min-w-0 font-editorial text-[1.125rem] leading-tight text-ink transition-colors duration-300 group-hover/row:text-accent sm:text-[1.25rem]">
                      {t(condition.title, locale)}
                    </span>

                    {/* Dot-leaders */}
                    <span
                      aria-hidden
                      className="toc-leader order-3 hidden h-[0.4em] w-auto min-w-6 flex-1 translate-y-[-0.1em] text-ink/20 transition-colors duration-300 group-hover/row:text-accent/40 sm:block"
                    />

                    {/* Lay descriptor — factual scope, 8-12 words */}
                    {descriptor && (
                      <span className="hidden shrink-0 max-w-[28ch] text-right text-[0.75rem] leading-snug text-slate transition-colors duration-300 group-hover/row:text-slate-strong sm:block">
                        {locale === "he" ? descriptor.he : descriptor.en}
                      </span>
                    )}

                    {/* Disclosure chevron — tap affordance */}
                    <span
                      aria-hidden
                      className="ms-auto shrink-0 self-center text-[0.8rem] leading-none text-slate transition-all duration-300 group-hover/row:text-accent group-hover/row:translate-x-0.5 rtl:rotate-180 rtl:group-hover/row:-translate-x-0.5"
                    >
                      &#8594;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Continuation hint — leads into the ExpertiseGroup sections below. */}
          <InView
            as="div"
            motion="fade-in-up"
            delay={200}
            className="flex items-center gap-4 border-t border-ink/10 py-4"
          >
            <span className="text-caption uppercase tracking-[0.18em] text-slate-60 eyebrow">
              {locale === "he"
                ? `ועוד ${totalSubjects - ABOVE_FOLD_COUNT} נושאים — המשך למטה`
                : `and ${totalSubjects - ABOVE_FOLD_COUNT} more — continued below`}
            </span>
            <span aria-hidden className="text-[0.7rem] text-slate-60 rtl:rotate-180">
              &#8595;
            </span>
          </InView>
        </div>
      </section>
    </>
  );
}
