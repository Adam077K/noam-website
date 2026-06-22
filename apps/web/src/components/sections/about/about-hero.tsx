import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero, folio as aboutFolio } from "@/content/about";
import { brand, contact } from "@/content/site";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "@/components/sections/home/journal";

/**
 * About masthead — the opening of a long-form journal PROFILE ("The Physician").
 *
 * Reuses the locked Home journal vocabulary — running head ("Vol. I · Profile"),
 * an oversized folio "01" graphic anchor, a small-caps SectionHead on a hairline,
 * the warm editorial serif at dramatic scale, and the grid-breaking warm-duotone
 * portrait with its designed cream/NK empty state (lit by /portraits/kitrey-1.png).
 *
 * Distinct from Home's hero: this is a single-subject PROFILE opening — the
 * headline is the thesis of the profile, the intro is the standfirst, and the
 * portrait is the subject of the piece, not a supporting figure. The credential
 * moat lives further down in the Professional Record ledger, so the masthead stays
 * a clean editorial opening. RTL-correct via logical props; phone renders dir="ltr".
 */
export function AboutHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-x-clip bg-paper">
      {/* Running head — the journal volume line + clinical-record masthead. */}
      <div className="border-b border-ink/15">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="text-caption uppercase tracking-[0.2em] text-slate eyebrow" dir="ltr">
            {t(aboutFolio, locale)}
          </p>
          <p className="hidden text-caption uppercase tracking-[0.2em] text-slate-60 eyebrow sm:block">
            {t(brand.masthead, locale)}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14">
        <SectionHead folio="01" title={{ he: "הרופא", en: "The Physician" }} locale={locale} />

        {/* Primary type column (wide) + margin column (the profile portrait). */}
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-x-16">
          {/* PRIMARY. */}
          <div className="relative order-1">
            {/* Oversized folio anchor, bleeding off the start edge behind the type. */}
            <Folio
              n="01"
              className="pointer-events-none absolute -top-6 -z-0 text-[7rem] -start-2 sm:text-[10rem] lg:-top-10 lg:text-[13rem]"
            />

            <p className="relative mb-6 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
              {t(hero.eyebrow, locale)}
            </p>

            <h1 className="relative max-w-[20ch] text-balance font-editorial text-ink [font-size:clamp(1.75rem,5.2vw,3.75rem)] [line-height:1.08] [letter-spacing:-0.02em] sm:max-w-[18ch] sm:text-pretty">
              <InView as="span" className="block pb-[0.12em]">
                {t(hero.headline, locale)}
              </InView>
            </h1>

            <InView
              as="div"
              motion="rule-draw"
              delay={360}
              className="mt-8 h-px w-28 bg-accent sm:mt-10"
            />

            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="mt-7 max-w-[52ch] text-body-lg text-ink-80 sm:mt-8"
            >
              {t(hero.intro, locale)}
            </InView>

            <InView
              as="div"
              motion="fade-in-up"
              delay={200}
              className="mt-9 flex flex-col gap-x-8 gap-y-4 sm:mt-10 sm:flex-row sm:items-center"
            >
              <a
                href={localeHref(locale, "/contact")}
                className="group/cta inline-flex items-center justify-center gap-3 bg-ink px-7 py-3.5 text-body-sm font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {t({ he: "לקביעת ייעוץ", en: "Book a consultation" }, locale)}
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
                <span className="text-caption uppercase tracking-[0.18em] text-slate eyebrow">
                  {t({ he: "או חייגו", en: "Or call" }, locale)}
                </span>
                <span className="font-mono font-medium text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>
          </div>

          {/* MARGIN — the grid-breaking profile portrait (lg only). */}
          <aside className="relative order-2 hidden lg:block">
            <InView as="figure" motion="fade-in-up" delay={160} className="relative">
              <div className="relative -mt-44 w-[150%] max-w-none lg:-me-[max(0px,calc((100vw-1280px)/2+2rem))] xl:-mt-52">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-3 -inset-y-3 border border-ink/25"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 -start-3 h-16 w-px bg-accent"
                />
                <div
                  className="portrait portrait--1 relative aspect-[3/4] w-full overflow-hidden"
                  role="img"
                  aria-label={t(hero.portraitAlt, locale)}
                >
                  <span aria-hidden className="portrait__empty">
                    <span className="portrait__monogram">NK</span>
                    <span className="portrait__caption eyebrow">
                      {t({ he: "דיוקן", en: "Portrait" }, locale)}
                    </span>
                  </span>
                </div>
                <figcaption className="mt-3.5 font-editorial text-body-sm normal-case tracking-normal text-ink">
                  {t(hero.portraitCaption, locale)}
                </figcaption>
              </div>
            </InView>
          </aside>

          {/* Portrait — MOBILE (below text, capped). */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-3 lg:hidden">
            <div className="relative mx-auto w-full max-w-[340px]">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 border border-ink/20"
              />
              <div
                className="portrait portrait--1 relative h-[42vh] max-h-[420px] w-full overflow-hidden"
                role="img"
                aria-label={t(hero.portraitAlt, locale)}
              >
                <span aria-hidden className="portrait__empty">
                  <span className="portrait__monogram">NK</span>
                  <span className="portrait__caption eyebrow">
                    {t({ he: "דיוקן", en: "Portrait" }, locale)}
                  </span>
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
