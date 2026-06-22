"use client";

import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero, folio as aboutFolio } from "@/content/about";
import { brand, contact } from "@/content/site";
import { InView } from "@/components/ui";

/**
 * About masthead — REDESIGNED: trust + bio above the fold at 1366×768 and 1440×820.
 *
 * One structural change drives everything:
 *   - The left/margin column that was a dead "NK Portrait" box now carries the
 *     CREDENTIAL CAPSULE: physician name + verified positions as a typographic panel.
 *     This is the page's signature asymmetric element that no other page reuses.
 *   - The right/primary column carries the DISPLAY H1 (the profile thesis) + the
 *     personal intro standfirst + CTAs — all composing the first 650 px.
 *   - ONE portrait slot only (mobile). No mid-scroll portrait duplicate.
 *   - "01" is demoted to a ghost watermark at z-0 behind everything.
 *   - Triple-label collapsed: ONE breadcrumb index, ONE display H1. The "01"
 *     SectionHead folio + large "THE PHYSICIAN" label + ghost "01" visual-H1
 *     are replaced by: breadcrumb band (just the running head) + display H1.
 *
 * RTL-correct: logical CSS props only (ps/pe/ms/me/start/end). Phone/number
 * spans carry dir="ltr". No physical left/right. No italics in Hebrew.
 */
export function AboutHero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section className="relative overflow-x-clip bg-paper">
      {/* Running head — the journal volume line + clinical-record masthead.
          This is now the ONLY breadcrumb-style label on this page. */}
      <div className="border-b border-ink/15">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <p
            className="text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow"
            dir="ltr"
          >
            {t(aboutFolio, locale)}
          </p>
          <p className="hidden text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow sm:block">
            {t(brand.masthead, locale)}
          </p>
        </div>
      </div>

      {/* Ghost watermark "01" — absolute z-0, purely decorative, never competes. */}
      <span
        aria-hidden
        className="ghost-numeral pointer-events-none absolute inset-inline-end-[2%] top-8 select-none sm:top-12"
        style={{ opacity: 0.06 }}
      >
        <span dir="ltr">01</span>
      </span>

      {/* MAIN GRID — two columns on lg:
          LTR: [credential capsule (20rem)] | [display H1 + intro + CTAs]
          RTL: same — logical grid, columns flip automatically. */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 pb-14 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-x-20 xl:gap-x-24">

          {/* ── LEFT / START COLUMN — CREDENTIAL CAPSULE (signature element) ──
              A typographic authority panel: vertical stack of verified positions
              separated by hairline rules. This is the trust anchor for the page;
              nothing else on the site shares this layout. */}
          <aside className="order-2 lg:order-1 lg:border-e lg:border-ink/12 lg:pe-14 xl:pe-20">
            <InView
              as="div"
              motion="none"
              delay={80}
              className="flex flex-col gap-0"
            >
              {/* Physician name — display serif, the largest element in this column. */}
              <div className="border-b border-ink/12 pb-6">
                <p
                  className="mb-1.5 text-caption uppercase tracking-[0.16em] text-slate-strong eyebrow"
                >
                  {isHe ? "רופא בכיר" : "Physician"}
                </p>
                <p className="font-editorial text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.1] text-ink [letter-spacing:-0.015em]">
                  {t(brand.name, locale)}
                </p>
              </div>

              {/* Position 1 — Head of unit */}
              <div className="border-b border-ink/12 py-5">
                <p className="mb-1 text-caption uppercase tracking-[0.14em] text-slate-strong eyebrow">
                  {isHe ? "תפקיד ראשי" : "Primary role"}
                </p>
                <p className="text-body-sm font-medium leading-snug text-ink">
                  {isHe
                    ? "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה"
                    : "Head, Functional Urology & Andrology Unit"}
                </p>
                <p className="mt-0.5 text-body-sm leading-snug text-slate-strong">
                  {isHe ? "המרכז הרפואי שיבא" : "Sheba Medical Center"}
                </p>
              </div>

              {/* Position 2 — Director SHSQ */}
              <div className="border-b border-ink/12 py-5">
                <p className="mb-1 text-caption uppercase tracking-[0.14em] text-slate-strong eyebrow">
                  {isHe ? "מנהל" : "Director"}
                </p>
                <p className="text-body-sm font-medium leading-snug text-ink">
                  {isHe ? "מנהל המרכז לבריאות מינית (SHSQ)" : "Director, Sexual Health Center (SHSQ)"}
                </p>
                <p className="mt-0.5 text-body-sm leading-snug text-slate-strong">
                  {isHe ? "שיבא" : "Sheba"}
                </p>
              </div>

              {/* Position 3 — EAU Chair */}
              <div className="pt-5">
                <p className="mb-1 text-caption uppercase tracking-[0.14em] text-slate-strong eyebrow">
                  {isHe ? "ועדה בינלאומית" : "International committee"}
                </p>
                <p className="text-body-sm font-medium leading-snug text-ink">
                  {isHe
                    ? 'יו"ר ועדת ההנחיות הקליניות — חבלות אורולוגיות'
                    : "Chair, EAU Clinical Guidelines — Urological Trauma"}
                </p>
                <p className="mt-0.5 text-body-sm leading-snug text-slate-strong">
                  {isHe
                    ? "איגוד האורולוגיה האירופי (EAU)"
                    : "European Association of Urology (EAU)"}
                </p>
              </div>

              {/* Quiet accent rule at the bottom of the capsule — draws on scroll. */}
              <InView
                as="div"
                motion="rule-draw"
                delay={500}
                className="mt-6 h-px w-16 bg-accent"
              />
            </InView>
          </aside>

          {/* ── RIGHT / END COLUMN — DISPLAY H1 + BIO + CTAs ── */}
          <div className="order-1 lg:order-2 lg:pt-2">
            {/* DISPLAY H1 — the profile thesis. Single h1 per page.
                No InView wrapper: this is above-fold content and must be
                visible immediately without waiting for IO. */}
            <h1 className="max-w-[22ch] text-balance font-editorial text-ink [font-size:clamp(2rem,4.8vw,3.75rem)] [line-height:1.08] [letter-spacing:-0.02em]">
              {t(hero.headline, locale)}
            </h1>

            {/* Accent rule — the signature hairline, draws on scroll. */}
            <InView
              as="div"
              motion="rule-draw"
              delay={340}
              className="mt-7 h-px w-24 bg-accent sm:mt-8"
            />

            {/* Personal intro — the standfirst / opening paragraph of the profile.
                [FOUNDER-REVIEW] — wired as-is from copy deck, pending approval. */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="mt-6 max-w-[52ch] text-body-lg leading-relaxed text-ink-80 sm:mt-7"
            >
              {t(hero.intro, locale)}
            </InView>

            {/* CTAs */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={200}
              className="mt-8 flex flex-col gap-x-8 gap-y-4 sm:mt-9 sm:flex-row sm:items-center"
            >
              <a
                href={localeHref(locale, "/contact")}
                className="group/cta inline-flex min-h-[48px] items-center justify-center gap-3 bg-ink px-7 text-body-sm font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {t({ he: "לקביעת ייעוץ", en: "Book a consultation" }, locale)}
                {/* Arrow mirrors in RTL via rtl:rotate-180. */}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
                >
                  &#8594;
                </span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="group/tel inline-flex min-h-[44px] items-center gap-2.5 text-body-sm text-slate-strong transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
                  {t({ he: "או חייגו", en: "Or call" }, locale)}
                </span>
                <span className="font-mono font-medium text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>

            {/* MOBILE PORTRAIT — one instance only; appears below CTAs on sm, hidden on lg
                (no mid-scroll portrait elsewhere on this page). */}
            <InView
              as="figure"
              motion="fade-in-up"
              delay={160}
              className="mt-10 lg:hidden"
            >
              <div className="relative mx-auto w-full max-w-[320px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 border border-ink/20"
                />
                <div
                  className="portrait portrait--1 relative h-[38vh] max-h-[380px] w-full overflow-hidden"
                  role="img"
                  aria-label={t(hero.portraitAlt, locale)}
                >
                  <span aria-hidden className="portrait__empty">
                    <span className="portrait__monogram">NK</span>
                  </span>
                  {/* Credential micro-label inside portrait empty state */}
                  <span aria-hidden className="portrait__credential">
                    {isHe
                      ? "אורולוגיה פונקציונלית · שיבא"
                      : "Functional Urology · Sheba"}
                  </span>
                </div>
                <figcaption className="mt-3 font-editorial text-body-sm normal-case tracking-normal text-ink">
                  {t(hero.portraitCaption, locale)}
                </figcaption>
              </div>
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}
