import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "./journal";

/**
 * Hero — "The Journal" opening article (v5, rebalanced).
 *
 * Two balanced co-anchors: the big serif headline block on the start side, and a
 * SUBSTANTIAL full-height warm-duotone portrait column on the end side that breaks
 * the grid by bleeding to the page's outer edge and slightly past top + bottom.
 * The type block (eyebrow · headline · rule · standfirst · CTA · credential note)
 * fills its column as one considered unit, so there is no dead vertical band — the
 * portrait's height and the type block read as deliberate, full, and paired.
 *
 * Credentials are a clean MARGINAL CREDENTIAL NOTE (hairline-led, no orphan ref
 * numbers). Empty portrait = the designed cream/NK state until a photo lands.
 *
 * RTL-correct: logical props, mirrored bleed + arrows; phone renders dir="ltr".
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
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
        <SectionHead folio="01" title={{ he: "המרפאה", en: "The Practice" }} locale={locale} />

        {/* The balanced spread — type block + full-height portrait column. */}
        <div className="grid items-stretch gap-x-10 gap-y-12 pt-10 sm:pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-16 lg:pb-16">
          {/* TYPE BLOCK — distributes as one unit; centred against the portrait. */}
          <div className="relative order-1 flex flex-col lg:min-h-[34rem] lg:justify-center lg:py-4">
            {/* Oversized folio anchor, ghosted behind the headline (sits below the
                eyebrow on every breakpoint so it never collides with the label). */}
            <Folio
              n="01"
              className="pointer-events-none absolute top-12 -z-0 text-[6rem] -start-2 sm:top-10 sm:text-[9rem] lg:top-6 lg:text-[12rem]"
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
              className="mt-7 h-px w-28 bg-accent sm:mt-8"
            />

            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="mt-6 max-w-[50ch] text-body-lg text-ink-80 sm:mt-7"
            >
              {t(hero.subhead, locale)}
            </InView>

            <InView
              as="div"
              motion="fade-in-up"
              delay={200}
              className="mt-8 flex flex-col gap-x-8 gap-y-4 sm:flex-row sm:items-center"
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

            {/* Credential note — sits in the type block on lg (under the CTA) and on
                mobile (inline). It anchors the lower half so nothing floats. */}
            <CredentialNote items={appointments} locale={locale} className="mt-10 lg:mt-12" />
          </div>

          {/* PORTRAIT COLUMN — a substantial, full-height editorial anchor that
              breaks the grid: it fills the row height and bleeds to the page's
              outer edge (+ a touch past top/bottom). Not a small box. */}
          <InView
            as="figure"
            motion="fade-in-up"
            delay={160}
            className="order-2 hidden lg:block"
          >
            <div className="relative -mt-12 -mb-20 h-[calc(100%+8rem)] w-[calc(100%+max(0px,calc((100vw-1280px)/2+2rem)))] max-w-none lg:-me-[max(0px,calc((100vw-1280px)/2+2rem))]">
              {/* Offset hairline mat toward the type column. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-3 -inset-y-3 z-10 border border-ink/25"
              />
              {/* Accent tick at the inner-bottom corner. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -start-3 z-10 h-20 w-px bg-accent"
              />
              <div
                className="portrait portrait--1 relative h-full min-h-[34rem] w-full overflow-hidden"
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
              {/* Caption pinned inside the bleed, lower-start corner. */}
              <figcaption className="absolute bottom-4 start-4 z-10 bg-paper/85 px-3 py-1.5 font-editorial text-body-sm normal-case tracking-normal text-ink backdrop-blur-sm">
                {t(hero.portraitCaption, locale)}
              </figcaption>
            </div>
          </InView>

          {/* PORTRAIT — MOBILE (below text, substantial but capped). */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-3 lg:hidden">
            <div className="relative mx-auto w-full max-w-[360px]">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 border border-ink/20"
              />
              <div
                className="portrait portrait--1 relative h-[46vh] max-h-[440px] w-full overflow-hidden"
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
    <div className={["max-w-[34rem] border-t border-ink/20 pt-5", className ?? ""].join(" ")}>
      <p className="mb-4 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
        {t({ he: "מינויים", en: "Appointments" }, locale)}
      </p>
      <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-body-sm leading-snug text-slate-strong">
            <span aria-hidden className="mt-[0.5em] h-px w-3 shrink-0 bg-accent" />
            <span>{t(item, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
