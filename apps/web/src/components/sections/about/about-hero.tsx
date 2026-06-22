"use client";

import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/about";
import { contact, brand } from "@/content/site";
import { InView } from "@/components/ui";
import { MediaSlot } from "@/components/ui/media-slot";

/**
 * About masthead — ref-#3 structure: large portrait RIGHT + credentials/headline LEFT.
 *
 * COMPOSITION:
 *   Desktop (lg+): Two-column grid.
 *     START col (wider): name display, credential row, eyebrow, headline, intro, CTAs.
 *     END col: large MediaSlot portrait (aspect-[3/4]), organic mist blob.
 *   Tablet (md): stacked, portrait below text at 60% width centred.
 *   Mobile: portrait above CTAs, compact.
 *
 * RTL-correct: logical CSS props only. Phone/number spans carry dir="ltr".
 * No italic in Hebrew. All focus rings visible. h1 is the ONLY h1 on this page.
 */
export function AboutHero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section className="relative overflow-x-clip bg-paper">

      {/* ── Main two-column grid ── */}
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,2.5rem)] pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2.5rem,5vw,4rem)]">
        <div className="grid items-start gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 lg:grid-cols-[minmax(0,1fr)_clamp(260px,36%,440px)]">

          {/* ── START column — identity + headline + CTAs ── */}
          <div className="order-2 lg:order-1">

            {/* Physician name — the authority anchor */}
            <div className="mb-5 border-b border-[var(--color-ink-divider)] pb-5 sm:mb-6 sm:pb-6">
              <p
                className="eyebrow mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-mist"
              >
                {isHe ? "רופא בכיר" : "Physician"}
              </p>
              {/* Display name — largest element in column */}
              <p className="font-sans text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                {t(brand.name, locale)}
              </p>
            </div>

            {/* Credential row — primary role + secondary role as inline pills */}
            <div className="mb-7 flex flex-wrap gap-2 sm:mb-8">
              {[
                isHe
                  ? "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה · שיבא"
                  : "Head, Functional Urology & Andrology Unit · Sheba",
                isHe
                  ? "מנהל SHSQ · שיבא"
                  : "Director, SHSQ · Sheba",
                isHe
                  ? 'יו"ר ועדת EAU — חבלות אורולוגיות'
                  : "Chair, EAU Guidelines — Urological Trauma",
              ].map((cred, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-mist-50 px-3 py-1.5 text-[0.8125rem] font-medium leading-snug text-ink-80 ring-1 ring-mist-soft"
                >
                  {cred}
                </span>
              ))}
            </div>

            {/* Display H1 — the profile thesis. Single h1 on this page. */}
            <h1 className="max-w-[24ch] text-balance font-sans text-[clamp(1.625rem,3.8vw,2.875rem)] font-semibold leading-[1.1] tracking-[-0.018em] text-ink">
              {t(hero.headline, locale)}
            </h1>

            {/* Accent rule */}
            <InView
              as="div"
              motion="rule-draw"
              delay={300}
              className="mt-6 h-px w-20 bg-mist sm:mt-7"
            />

            {/* Personal intro */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="mt-5 max-w-[54ch] text-[1.0625rem] leading-[1.65] text-ink-80 sm:mt-6 sm:text-[1.125rem]"
            >
              {t(hero.intro, locale)}
            </InView>

            {/* CTAs */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={200}
              className="mt-7 flex flex-col gap-x-8 gap-y-3.5 sm:mt-8 sm:flex-row sm:items-center"
            >
              <a
                href={localeHref(locale, "/contact")}
                className="group/cta inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.875rem] font-semibold text-paper transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {t({ he: "לקביעת ייעוץ", en: "Book a consultation" }, locale)}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5 rtl:rotate-180 rtl:group-hover/cta:-translate-x-0.5"
                >
                  &#8594;
                </span>
              </a>

              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="group/tel inline-flex min-h-[44px] items-center gap-2.5 text-[0.875rem] text-slate-strong transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="eyebrow text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-strong">
                  {t({ he: "או חייגו", en: "Or call" }, locale)}
                </span>
                <span className="font-mono font-medium text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>
          </div>

          {/* ── END column — large portrait slot ── */}
          <div className="order-1 lg:order-2">
            <MediaSlot
              ratio="3/4"
              alt={t(hero.portraitAlt, locale)}
              caption={isHe ? "אורולוגיה פונקציונלית · שיבא" : "Functional Urology · Sheba"}
              slot="about-hero-portrait"
              blob
              monogram="NK"
              className="mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
