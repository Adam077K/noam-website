import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { brand } from "@/content/site";
import {
  expertiseHeader,
  expertiseGroups,
} from "@/content/expertise";
import { InView } from "@/components/ui";

/**
 * Expertise page masthead — the opening spread of a journal CONTENTS issue.
 *
 * V6 REDESIGN — matching About hero density bar:
 *
 *   PROBLEM (v5): The SectionHead component added a full ruled row before the H1,
 *   and the mt-6 grid + mt-10 TOC rule created ~300px of dead space. At 1440×820
 *   only 2-3 TOC entries were barely visible at the very bottom of the fold.
 *
 *   FIX: Mirror the About hero structure exactly:
 *   1. Breadcrumb band (running head) — same as all pages.
 *   2. Ghost watermark "01" — absolute, z-0, opacity 0.07, outer margin.
 *   3. Tight 2-col grid starts at pt-8/pt-10 — H1 on end/start, intro parallel.
 *   4. A scope eyebrow line sits ABOVE the H1 (like "רופא בכיר" on About).
 *   5. The TOC rule + first 4 entries start at mt-6 below the 2-col grid —
 *      visible without scroll at 1440×820.
 *   6. "תוכן העניינים" / "Table of Contents" label is collapsed into the TOC
 *      rule row as a tiny inline eyebrow — no separate SectionHead.
 *
 * PAGE SIGNATURE: the scope line + dot-leader TOC structure is this page's
 * unique signature element. No other page has a scannable numbered conditions
 * index above the fold.
 *
 * RTL-correct: logical CSS properties only. Phone/number spans carry dir="ltr".
 * WCAG 2.2 AA: single h1, focus-visible everywhere, min-h-[44px] tap targets.
 */

/** Number of above-fold preview TOC entries surfaced in the header. */
const ABOVE_FOLD_COUNT = 4;

/** Aggregate subject count across all groups — derived from content. */
const totalSubjects = expertiseGroups.reduce(
  (acc, g) => acc + g.conditions.length,
  0,
);

/** Factual lay descriptors for each condition — 8-12 words, scope only. */
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
    he: 'יו"ר ועדת הנחיות EAU לחבלות אורולוגיות',
    en: "EAU trauma-guidelines committee Chair",
  },
};

export function ExpertiseHeader({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  // Flatten all conditions across groups for the above-fold TOC preview.
  const aboveFoldConditions = expertiseGroups
    .flatMap((g) => g.conditions)
    .slice(0, ABOVE_FOLD_COUNT);

  return (
    <>
      {/* ── Breadcrumb / running-head band ─────────────────────────────────── */}
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

      {/* ── Opening spread section ──────────────────────────────────────────── */}
      <section
        className="relative overflow-x-clip bg-paper px-4 pt-8 pb-0 sm:px-6 sm:pt-10 lg:px-8"
        aria-labelledby="expertise-page-h1"
      >
        {/* Ghost watermark "01" — absolute, z-0, outer margin, opacity 0.07.
            Positioned at the END of the container so it sits in the outer margin
            in both LTR (right) and RTL (left) layouts.
            The content grid sits above it at default z-index (auto / 1+). */}
        <span
          aria-hidden
          className="ghost-numeral pointer-events-none absolute inset-inline-end-[1%] top-6 select-none sm:top-10"
          style={{ opacity: 0.07 }}
        >
          <span dir="ltr">01</span>
        </span>

        <div className="relative mx-auto w-full max-w-[1280px]">
          {/*
            TWO-COLUMN GRID — mirrors the About hero's asymmetric layout.
            Start column: scope eyebrow + H1 (the chapter thesis).
            End column: intro standfirst — visible at same vertical position as H1.
            Single column on mobile (stacked, h1 first).
          */}
          <div className="grid gap-x-14 gap-y-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end xl:gap-x-20">
            {/* ── START COLUMN: scope + H1 ── */}
            <div>
              {/* Scope eyebrow — sits above H1 like "רופא בכיר" above the name on About.
                  Small-caps, slate-strong (≥4.5:1). No ruled line here — that lives
                  below in the TOC row. */}
              <p className="mb-3 text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
                {isHe
                  ? `אורולוגיה תפקודית ורפואה מינית · ${totalSubjects} נושאי טיפול`
                  : `Functional Urology & Sexual Medicine · ${totalSubjects} subjects`}
              </p>

              {/* DISPLAY H1 — single h1 per page.
                  No InView: this is above-fold and must be immediately visible. */}
              <h1
                id="expertise-page-h1"
                className="max-w-[22ch] text-balance font-editorial text-ink [font-size:clamp(2rem,4.2vw,3.75rem)] [letter-spacing:-0.02em] [line-height:1.08]"
              >
                {t(expertiseHeader.title, locale)}
              </h1>

              {/* Accent rule — drawn on scroll, matches About hero. */}
              <InView
                as="div"
                motion="rule-draw"
                delay={340}
                className="mt-5 h-px w-16 bg-ink/30 sm:mt-6"
              />
            </div>

            {/* ── END COLUMN: intro standfirst ── */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={100}
              className="max-w-[52ch] text-body-base leading-[1.72] text-slate-strong lg:pb-1"
            >
              {t(expertiseHeader.intro, locale)}
            </InView>
          </div>

          {/* ── TOC opening rule + inline label + folio device ─────────────── */}
          {/*
            The SectionHead component is replaced by this inline construct:
            a full-width rule with the "TABLE OF CONTENTS" eyebrow and a folio
            on the opposite end — one minimal row, no large heading, no dead space.
            Tight mt-6 keeps everything close.
          */}
          <div className="mt-6 sm:mt-8">
            {/* Rule that opens the TOC. */}
            <InView
              as="div"
              motion="rule-draw"
              className="h-px w-full bg-ink/25"
            />

            {/* Scope / label row — directly below the rule. */}
            <div className="flex items-center justify-between gap-4 pt-2.5 pb-0">
              <p className="text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
                {t(expertiseHeader.sectionLabel, locale)}
              </p>
              {/* Meaningful folio replacing any orphaned decorative rule. */}
              <span
                aria-hidden
                className="font-mono text-caption tracking-[0.1em] text-slate-60"
                dir="ltr"
              >
                p. 01
              </span>
            </div>
          </div>

          {/* ── Above-fold TOC preview (first 4 entries) ────────────────────── */}
          {/*
            CRITICAL: these 4 entries make the page's purpose immediately legible
            above the fold at 1440×820. The TOC rule sits at ~50% of the viewport
            height; 4 compact rows fill the remaining 50%.

            Each row: dot-leaders + condition name (font-editorial ≥18px) +
            lay descriptor + arrow chevron. min-h-[44px] tap targets.
          */}
          <ol
            className="mt-0 divide-y divide-ink/10"
            aria-label={
              isHe
                ? "תצוגה מקדימה של תוכן העניינים"
                : "Table of contents preview"
            }
          >
            {aboveFoldConditions.map((condition, i) => {
              const desc = layDescriptor[condition.anchor];

              return (
                <li key={condition.anchor} className="group/row">
                  <Link
                    href={`#${condition.anchor}`}
                    className="flex min-h-[44px] items-baseline gap-x-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:py-3"
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

                    {/* Condition name — ≥18px on mobile */}
                    <span className="min-w-0 font-editorial text-[1.05rem] leading-tight text-ink transition-colors duration-300 group-hover/row:text-accent sm:text-[1.2rem]">
                      {t(condition.title, locale)}
                    </span>

                    {/* Dot-leaders */}
                    <span
                      aria-hidden
                      className="toc-leader order-3 hidden h-[0.4em] w-auto min-w-4 flex-1 translate-y-[-0.1em] text-ink/20 transition-colors duration-300 group-hover/row:text-accent/40 sm:block"
                    />

                    {/* Lay descriptor — factual scope, 8-12 words */}
                    {desc && (
                      <span className="hidden shrink-0 max-w-[28ch] text-end text-[0.72rem] leading-snug text-slate transition-colors duration-300 group-hover/row:text-slate-strong sm:block">
                        {isHe ? desc.he : desc.en}
                      </span>
                    )}

                    {/* Disclosure chevron */}
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

          {/* Continuation hint — leads into ExpertiseGroup sections below. */}
          <InView
            as="div"
            motion="fade-in-up"
            delay={200}
            className="flex items-center gap-4 border-t border-ink/10 py-3.5"
          >
            <span className="text-caption uppercase tracking-[0.18em] text-slate-60 eyebrow">
              {isHe
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
