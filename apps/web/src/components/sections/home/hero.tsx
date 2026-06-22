import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * Hero — "The Journal" opening article (v6, clean + professional).
 *
 * The headline is the clear focal point: a well-sized serif statement with
 * balanced margins, a precise standfirst, a hairline-separated credential line
 * (the trust moat, inline and scholarly), and a clean primary CTA + phone. The
 * type side reads composed and full on its own. The portrait is a MODEST, refined
 * framed accent — clearly secondary, never a giant empty box — carrying the warm
 * cream / NK placeholder until a real photo fills it.
 *
 * No watermark folio: the only "01" is the small label in the section running
 * head, never a large numeral behind the text.
 *
 * RTL-correct: logical props, mirrored arrows; phone renders dir="ltr".
 */
export function Hero({ locale }: { locale: Locale }) {
  // Credential line — the moat, set inline + hairline-separated, scholarly.
  const credentials: LocalizedPair[] = [
    {
      he: "מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה, שיבא",
      en: "Head of Functional Urology & Andrology, Sheba",
    },
    { he: "יו״ר ועדת ההנחיות, EAU", en: "EAU Guidelines Chair" },
    { he: "מנהל SHSQ", en: "SHSQ Director" },
  ];

  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
        <SectionHead folio="01" title={{ he: "המרפאה", en: "The Practice" }} locale={locale} />

        <div className="grid items-start gap-x-12 gap-y-12 pb-16 pt-10 sm:pt-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-x-16 lg:pb-24 lg:pt-14">
          {/* TYPE SIDE — composed and full on its own; the focal point. */}
          <div className="order-1">
            <p className="text-caption uppercase tracking-[0.2em] text-slate eyebrow">
              {t(hero.eyebrow, locale)}
            </p>

            <h1 className="mt-6 max-w-[19ch] text-balance font-editorial text-ink [font-size:clamp(2.1rem,3.9vw,3.5rem)] [line-height:1.08] [letter-spacing:-0.018em]">
              <InView as="span" className="block pb-[0.1em]">
                {t(hero.headline, locale)}
              </InView>
            </h1>

            <InView
              as="div"
              motion="rule-draw"
              delay={320}
              className="mt-7 h-px w-24 bg-accent"
            />

            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="mt-6 max-w-[52ch] text-body-lg text-ink-80"
            >
              {t(hero.subhead, locale)}
            </InView>

            {/* Credential line — inline, hairline-separated. */}
            <InView
              as="ul"
              motion="fade-in-up"
              delay={180}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/15 pt-5 text-body-sm text-slate-strong"
            >
              {credentials.map((c, i) => (
                <li key={i} className="flex items-center gap-x-3">
                  {i > 0 && <span aria-hidden className="text-ink/25">·</span>}
                  <span>{t(c, locale)}</span>
                </li>
              ))}
            </InView>

            {/* Actions — a clean primary CTA + the phone. */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={240}
              className="mt-9 flex flex-col gap-x-8 gap-y-4 sm:flex-row sm:items-center"
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
          </div>

          {/* PORTRAIT — a modest, refined framed accent. Clearly secondary. */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-2">
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:ms-auto lg:me-0">
              {/* Fine offset mat + a small accent tick — an intentional frame. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 border border-ink/20"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 -start-2.5 h-12 w-px bg-accent"
              />
              <div
                className="portrait portrait--1 relative aspect-[4/5] w-full overflow-hidden"
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
        </div>
      </div>
    </section>
  );
}

type LocalizedPair = { he: string; en: string };
