import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "./journal";

/** Scholarly superscript reference marker; mirrors via logical spacing. */
function Ref({ n }: { n: string }) {
  return (
    <sup className="ms-0.5 align-super font-mono text-[0.4em] font-normal text-accent">
      <span dir="ltr">{n}</span>
    </sup>
  );
}

/**
 * Hero — "The Journal" opening article (v4).
 *
 * An oversized folio "01" anchors the page like a chapter number. The headline
 * carries scholarly superscript references (¹ ² ³) that resolve to journal-style
 * FOOTNOTE credentials set small in the margin column — the trust moat as
 * marginalia, not badges. The warm-duotone portrait BREAKS the grid: it bleeds
 * out of the margin past the page's type edge rather than sitting in a tidy box,
 * keeping the designed empty state (cream + NK) until a real photo lands.
 *
 * RTL-correct: logical props, mirrored bleed + arrows; phone/volume render dir=ltr;
 * the superscript markers and footnotes mirror naturally.
 */
export function Hero({ locale }: { locale: Locale }) {
  // Footnote credentials — the moat, presented as scholarly references.
  const footnotes: Array<{ ref: string; value: { he: string; en: string } }> = [
    {
      ref: "1",
      value: {
        he: "המרכז הרפואי שיבא · מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה",
        en: "Sheba Medical Center · Head of Functional Urology & Andrology",
      },
    },
    {
      ref: "2",
      value: {
        he: "יו״ר ועדת ההנחיות הקליניות, איגוד האורולוגיה האירופי (EAU)",
        en: "Chair, Clinical Guidelines Committee, European Association of Urology",
      },
    },
    {
      ref: "3",
      value: {
        he: "מנהל המרכז לבריאות מינית (SHSQ), שיבא",
        en: "Director, Sexual Health Center (SHSQ), Sheba",
      },
    },
  ];

  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14">
        <SectionHead
          folio="01"
          title={{ he: "פרופיל", en: "Profile" }}
          locale={locale}
        />

        {/* Primary type column (wide) + margin column (footnotes + portrait). */}
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-x-16">
          {/* PRIMARY. */}
          <div className="relative order-1">
            {/* Oversized folio anchor, bleeding off the start edge behind the type. */}
            <Folio
              n="01"
              className="pointer-events-none absolute -top-6 -z-0 text-[7rem] -start-2 sm:text-[10rem] lg:-top-10 lg:text-[13rem]"
            />

            <h1 className="relative max-w-[20ch] text-pretty font-editorial text-ink [font-size:clamp(2.25rem,4.4vw,4rem)] [line-height:1.04] [letter-spacing:-0.02em] sm:max-w-[16ch]">
              <InView as="span" className="block pb-[0.12em]">
                {t(hero.headline, locale)}
                {/* References sit at the end of the headline like a journal title. */}
                <Ref n="1" />
                <Ref n="2" />
                <Ref n="3" />
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
              className="mt-7 max-w-[48ch] text-body-lg text-ink-80 sm:mt-8"
            >
              {t(hero.subhead, locale)}
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
                <span className="text-caption uppercase tracking-[0.18em] text-slate eyebrow">
                  {t({ he: "או חייגו", en: "Or call" }, locale)}
                </span>
                <span className="font-mono font-medium text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>

            {/* Footnote credentials — scholarly marginalia. On mobile they sit here,
                inline beneath the primary; on lg they move to the margin column. */}
            <ol className="mt-12 space-y-3 border-t border-ink/15 pt-6 lg:hidden">
              {footnotes.map((f) => (
                <li key={f.ref} className="flex gap-3 text-body-sm text-slate-strong">
                  <span className="font-mono text-caption text-accent">
                    <span dir="ltr">{f.ref}</span>
                  </span>
                  <span className="leading-snug">{t(f.value, locale)}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* MARGIN — footnotes (lg) + the grid-breaking portrait. */}
          <aside className="relative order-2 hidden lg:block">
            {/* The portrait BREAKS the grid: it overlaps UP past the section-head rule
                and bleeds OUT past the page's outer edge, wider than its column, with a
                fine offset hairline mat. Not a tidy box. Empty state = cream + NK. */}
            <InView as="figure" motion="fade-in-up" delay={160} className="relative">
              <div className="relative -mt-44 w-[150%] -translate-x-0 max-w-none lg:-me-[max(0px,calc((100vw-1280px)/2+2rem))] xl:-mt-52">
                {/* Folio-style frame: a hairline mat offset toward the type column. */}
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
                <figcaption className="mt-3.5 flex items-baseline justify-between gap-2 text-caption text-slate">
                  <span className="font-editorial text-body-sm normal-case tracking-normal text-ink">
                    {t(hero.portraitCaption, locale)}
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-[0.06em] text-slate-60">
                    <span dir="ltr">Fig. 1</span>
                  </span>
                </figcaption>
              </div>
            </InView>

            {/* Footnotes set small in the margin, under the portrait. */}
            <ol className="mt-10 space-y-3.5 border-t border-ink/15 pt-5">
              {footnotes.map((f) => (
                <li key={f.ref} className="flex gap-2.5 text-body-sm leading-snug text-slate-strong">
                  <span className="font-mono text-caption text-accent">
                    <span dir="ltr">{f.ref}</span>
                  </span>
                  <span>{t(f.value, locale)}</span>
                </li>
              ))}
            </ol>
          </aside>

          {/* Portrait for MOBILE — below the text, capped, still grid-breaking-lite. */}
          <InView
            as="figure"
            motion="fade-in-up"
            delay={160}
            className="order-3 lg:hidden"
          >
            <div className="relative mx-auto w-full max-w-[340px]">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 border border-ink/20"
              />
              <div
                className="portrait portrait--1 relative h-[40vh] max-h-[400px] w-full overflow-hidden"
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
              <figcaption className="mt-3 flex items-baseline justify-between gap-2 text-caption text-slate">
                <span className="font-editorial text-body-sm normal-case tracking-normal text-ink">
                  {t(hero.portraitCaption, locale)}
                </span>
                <span className="font-mono text-[0.65rem] text-slate-60">
                  <span dir="ltr">Fig. 1</span>
                </span>
              </figcaption>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
