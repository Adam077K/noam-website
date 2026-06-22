import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * Hero — "The Journal" opening article (v8 — display H1 dominance + composed fold).
 *
 * Design principles applied:
 * 1. THE FOLD IS A POSTER — H1 at 48-72px is unambiguously the largest element.
 * 2. Ghost numeral as watermark only (opacity 0.07, z-0, outer margin).
 * 3. Portrait SECONDARY — max-w-[200px] so the H1 always wins above the fold.
 * 4. Subhead bio paragraph (hero.subhead) rendered as the deck — the Sheba/SHSQ
 *    credential is the most valuable above-fold content.
 * 5. Mobile stack: H1 → deck → CTA (min-h 48px, full-width) → portrait.
 *
 * RTL-correct: logical CSS props only, dir="ltr" on phone/numbers.
 */
export function Hero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section className="relative overflow-hidden bg-paper">
      {/*
        Ghost numeral watermark — "01", opacity 0.07, positioned in the outer margin
        BEHIND all content (z-0). The display H1 sits over it; it never displaces readable content.
        DESIGN-SYSTEM RULE 2: ONE ordinal per page, in the outer margin.
      */}
      <span
        aria-hidden
        className="ghost-numeral pointer-events-none select-none"
        style={{
          top: "40%",
          insetInlineEnd: "2%",
          transform: "translateY(-50%)",
        }}
      >
        <span dir="ltr">01</span>
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pt-3 sm:px-8 sm:pt-4 lg:px-10 lg:pt-5">
        <SectionHead folio="01" title={{ he: "המרפאה", en: "The Practice" }} locale={locale} />

        {/*
          GRID: text side always first in DOM (order-1), portrait second (order-2).
          On mobile: single column, text then portrait.
          On lg: two columns, text fills ~60%, portrait is a secondary 40% column.
          Portrait max-w is deliberately restrained (200px) so the H1 is the
          dominant above-fold element at all viewport widths ≥1024px.
        */}
        <div className="grid items-start gap-x-10 gap-y-0 pb-10 pt-4 sm:pb-12 sm:pt-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-x-14 lg:pb-16 lg:pt-5">

          {/* ── TEXT SIDE ────────────────────────────────────────────────── */}
          <div className="order-1 flex flex-col">

            {/*
              DISPLAY H1 — the single dominant above-fold element.
              HE: Frank Ruhl Libre (font-editorial on html[lang="he"]).
              EN: Fraunces (font-editorial on html[lang="en"]).
              Target: 48-72px. clamp(3rem,6.5vw,4.5rem) → 48px→72px at 1440.
              No italics in Hebrew (enforced globally by letter-spacing rules).
              text-balance so multi-line wraps cleanly at narrow widths.
            */}
            <h1
              className={[
                "mt-3 max-w-[20ch] text-balance font-editorial text-ink",
                "[font-size:clamp(3rem,6.5vw,4.5rem)] [line-height:1.04] [letter-spacing:-0.02em]",
              ].join(" ")}
            >
              <InView as="span" className="block">
                {isHe ? "אורולוגיה תפקודית ואנדרולוגיה" : "Functional Urology & Andrology"}
              </InView>
            </h1>

            {/*
              CREDENTIAL LINE — the trust moat, visible above fold, not mid-screen.
              hairline-separated, scholarly inline list. 3 key appointments only.
            */}
            <InView
              as="ul"
              motion="fade-in-up"
              delay={80}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink/15 pt-3 text-[0.75rem] text-slate-strong"
            >
              {[
                {
                  he: "מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה, שיבא",
                  en: "Head, Functional Urology & Andrology Unit, Sheba",
                },
                { he: 'יו"ר ועדת ההנחיות, EAU', en: "EAU Guidelines Chair" },
                { he: "מנהל SHSQ", en: "SHSQ Director" },
              ].map((c, i) => (
                <li key={i} className="flex items-center gap-x-3">
                  {i > 0 && (
                    <span aria-hidden className="text-ink/25">
                      ·
                    </span>
                  )}
                  <span>{t(c, locale)}</span>
                </li>
              ))}
            </InView>

            {/*
              DECK / STANDFIRST — the bio paragraph is the richest above-fold content.
              hero.subhead names Sheba + SHSQ and frames the practice. Renders at
              body-lg (18px) for legibility and gravitas. max-w-[50ch] constrains
              the measure for comfortable reading.
            */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={140}
              className="mt-5 max-w-[50ch] text-body-lg leading-relaxed text-ink-80"
            >
              {t(hero.subhead, locale)}
            </InView>

            {/*
              EMOTIONAL DECK — the signature sentence (formerly the headline).
              Rendered smaller (body-base, italic-ish weight) to distinguish from bio.
              Sits as the "pull-quote bridge" between bio and CTA.
            */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={190}
              className="mt-3 max-w-[48ch] font-editorial text-[1.0625rem] leading-snug text-ink/75 [font-style:normal]"
            >
              {t(hero.headline, locale)}
            </InView>

            {/*
              PRIMARY CTA — full-width on mobile (min-h 48px), inline on desktop.
              Stack order: immediately after deck, BEFORE portrait on mobile.
            */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={240}
              className="mt-7 flex flex-col gap-y-3 sm:flex-row sm:items-center sm:gap-x-8"
            >
              <a
                href={localeHref(locale, "/contact")}
                className="group/cta inline-flex min-h-[48px] w-full items-center justify-center gap-3 bg-ink px-7 text-body-sm font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
              >
                {t(hero.primaryCta, locale)}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
                >
                  &#8594;
                </span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="group/tel inline-flex items-center gap-2.5 text-body-sm text-slate-strong transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.14em] text-slate eyebrow">
                  {t({ he: "או חייגו", en: "Or call" }, locale)}
                </span>
                <span className="font-mono font-medium text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>
          </div>

          {/*
            ── PORTRAIT ─────────────────────────────────────────────────────
            SECONDARY to heading — constrained to max-w-[200px] on desktop so the
            72px H1 always reads as the dominant element. On mobile it flows after
            the CTA (text div is order-1, portrait is order-2).
            No "PORTRAIT" label anywhere.
          */}
          <InView
            as="figure"
            motion="fade-in-up"
            delay={220}
            className="order-2 mt-10 sm:mt-12 lg:mt-4"
          >
            <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[240px] lg:ms-auto lg:me-4 lg:max-w-[200px]">
              {/* Fine offset mat border — intentional editorial frame. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 border border-ink/18"
              />
              {/* Accent tick — the signature motif, at the lower inner edge. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2 -start-2 h-10 w-px bg-accent"
              />
              {/*
                Portrait container: aspect-[4/5], warm linen placeholder.
                .portrait--1 activates ::before photo layer when kitrey-1.png exists.
                .portrait__empty is the designed no-photo state (NK monogram).
              */}
              <div
                className="portrait portrait--1 relative aspect-[4/5] w-full overflow-hidden"
                role="img"
                aria-label={t(hero.portraitAlt, locale)}
              >
                <span aria-hidden className="portrait__empty">
                  <span className="portrait__monogram">NK</span>
                  <span className="portrait__credential">
                    {t(
                      {
                        he: "ראש היחידה לאורולוגיה תפקודית ואנדרולוגיה · שיבא",
                        en: "Head, Functional Urology & Andrology · Sheba",
                      },
                      locale
                    )}
                  </span>
                </span>
              </div>
              <figcaption className="mt-2.5 font-editorial text-body-sm normal-case tracking-normal text-ink">
                {t(hero.portraitCaption, locale)}
              </figcaption>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
