import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "./journal";

/**
 * Hero — "The Journal" opening article (v4, dial-down).
 *
 * An oversized folio "01" anchors the page like a chapter number. The credentials
 * sit as a clean MARGINAL CREDENTIAL NOTE beside/under the headline — a small,
 * hairline-led scholarly list, with no floating reference numbers (the earlier
 * superscript ¹²³ clump read as a stray number and is gone). The warm-duotone
 * portrait BREAKS the grid: it bleeds up past the section-head rule and out past
 * the page edge, keeping the designed cream/NK empty state until a photo lands.
 *
 * RTL-correct: logical props, mirrored bleed + arrows; phone renders dir="ltr";
 * the marginal note mirrors to the correct side.
 */
export function Hero({ locale }: { locale: Locale }) {
  // Marginal credential note — the moat, set small and scholarly. No ref numbers.
  const appointments: LocalizedPair[] = [
    {
      he: "מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה, שיבא",
      en: "Head of Functional Urology & Andrology, Sheba",
    },
    {
      he: "יו״ר ועדת ההנחיות הקליניות, איגוד האורולוגיה האירופי",
      en: "Chair, Clinical Guidelines Committee, EAU",
    },
    {
      he: "מנהל המרכז לבריאות מינית (SHSQ), שיבא",
      en: "Director, Sexual Health Center (SHSQ), Sheba",
    },
  ];

  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14">
        <SectionHead folio="01" title={{ he: "המרפאה", en: "The Practice" }} locale={locale} />

        {/* Primary type column (wide) + margin column (credential note + portrait). */}
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

            <h1 className="relative max-w-[20ch] text-pretty font-editorial text-ink [font-size:clamp(2.1rem,4.2vw,3.75rem)] [line-height:1.06] [letter-spacing:-0.02em] sm:max-w-[18ch]">
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
              className="mt-7 max-w-[50ch] text-body-lg text-ink-80 sm:mt-8"
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

            {/* Marginal credential note — MOBILE position (inline beneath primary). */}
            <CredentialNote items={appointments} locale={locale} className="mt-12 lg:hidden" />
          </div>

          {/* MARGIN — credential note + the grid-breaking portrait (lg only). */}
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
                {/* Clean caption — no "Fig." affectation. */}
                <figcaption className="mt-3.5 font-editorial text-body-sm normal-case tracking-normal text-ink">
                  {t(hero.portraitCaption, locale)}
                </figcaption>
              </div>
            </InView>

            <CredentialNote items={appointments} locale={locale} className="mt-10" />
          </aside>

          {/* Portrait — MOBILE (below text, capped). */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-3 lg:hidden">
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

type LocalizedPair = { he: string; en: string };

/**
 * The marginal credential note: a hairline-led "Appointments" label over a small
 * scholarly list. Each line is preceded by a fine accent rule (not a number), so
 * it reads as an intentional credential note rather than orphaned footnote refs.
 */
function CredentialNote({
  items,
  locale,
  className,
}: {
  items: LocalizedPair[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={["border-t border-ink/20 pt-5", className ?? ""].join(" ")}>
      <p className="mb-4 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
        {t({ he: "מינויים", en: "Appointments" }, locale)}
      </p>
      <ul className="space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-body-sm leading-snug text-slate-strong">
            <span
              aria-hidden
              className="mt-[0.5em] h-px w-3 shrink-0 bg-accent"
            />
            <span>{t(item, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
