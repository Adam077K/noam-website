import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * Hero — "The Journal" opening article (v7 — above-fold display H1 fix).
 *
 * The PAGE DIRECTIVE requires a real display H1 stating the core claim at 44-56px,
 * above-fold on both 1440x820 and 1366x768, with the credential line visible
 * (not mid-screen). The emotional deck sits beneath the H1.
 *
 * Mobile stack: nav → H1 → 2-line deck → CTA (min-h 48px, full-width) → portrait.
 *
 * Portrait reads complete & premium WITHOUT a photo. No "PORTRAIT" label.
 * RTL-correct: logical CSS props only, dir="ltr" on phone/numbers.
 */
export function Hero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-3 sm:px-8 sm:pt-4 lg:px-10 lg:pt-5">
        <SectionHead folio="01" title={{ he: "המרפאה", en: "The Practice" }} locale={locale} />

        {/*
          GRID: text side always first in DOM (order-1), portrait second (order-2).
          On mobile: single column, text then portrait.
          On lg: two columns, text left (~1.45fr), portrait right (1fr).
        */}
        <div className="grid items-start gap-x-12 gap-y-0 pb-10 pt-5 sm:pb-12 sm:pt-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-x-16 lg:pb-16 lg:pt-5">

          {/* ── TEXT SIDE ────────────────────────────────────────────────── */}
          <div className="order-1 flex flex-col">

            {/*
              DISPLAY H1 — the core clinical claim.
              HE: Frank Ruhl Libre (--font-frank via font-display on html[lang="he"]).
              EN: Fraunces (--font-fraunces via font-editorial).
              Target: 44-56px. clamp(2.75rem, 5.5vw, 3.5rem) → 44px→56px.
              No italics in Hebrew.
            */}
            <h1
              className={[
                "mt-3 max-w-[22ch] text-balance font-editorial text-ink",
                "[font-size:clamp(2.75rem,5.5vw,3.5rem)] [line-height:1.06] [letter-spacing:-0.018em]",
                isHe ? "not-italic" : "",
              ].join(" ")}
            >
              <InView as="span" className="block">
                {isHe ? "אורולוגיה תפקודית ואנדרולוגיה" : "Functional Urology & Andrology"}
              </InView>
            </h1>

            {/*
              SUBTITLE — specialty identifier.
              HE: >=12px, tracked, no uppercase (Hebrew). EN: uppercase tracked.
            */}
            <p className="mt-2.5 font-mono text-[0.75rem] tracking-[0.14em] text-slate-strong eyebrow">
              {isHe
                ? "אורולוגיה תפקודית · רפואה מינית"
                : "FUNCTIONAL UROLOGY · SEXUAL MEDICINE"}
            </p>

            {/*
              CREDENTIAL LINE — visible above fold, not mid-screen.
              Hairline-separated, scholarly inline list.
            */}
            <InView
              as="ul"
              motion="fade-in-up"
              delay={80}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-ink/15 pt-3 text-[0.75rem] text-slate-strong"
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
              DECK / STANDFIRST — 1-2 lines of emotional copy beneath H1+credentials.
              This is the former headline, demoted to deck role.
            */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={140}
              className="mt-5 max-w-[52ch] text-body-base leading-relaxed text-ink-80"
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
              delay={200}
              className="mt-6 flex flex-col gap-y-3 sm:flex-row sm:items-center sm:gap-x-8"
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
            Secondary to heading. No "PORTRAIT" label.
            On mobile: appears AFTER the CTA (order-3 forces below CTA on mobile
            since CTA is inside order-1 div, portrait is order-2 grid child).
            On lg: right column, auto height.
          */}
          <InView
            as="figure"
            motion="fade-in-up"
            delay={200}
            className="order-2 mt-8 sm:mt-10 lg:mt-0"
          >
            <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[280px] lg:ms-auto lg:me-0 lg:max-w-[256px]">
              {/* Fine offset mat border — an intentional editorial frame. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 border border-ink/20"
              />
              {/* Accent tick — the signature motif. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 -start-2.5 h-12 w-px bg-accent"
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
                </span>
              </div>
              <figcaption className="mt-3 font-editorial text-body-sm normal-case tracking-normal text-ink">
                {t(hero.portraitCaption, locale)}
              </figcaption>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
