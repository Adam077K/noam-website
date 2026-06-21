import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/about";
import { contactCta } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";

/**
 * About masthead — editorial profile spread (v2/v3 "Quiet Authority"), matched to
 * the Home hero so the page reads as one design language. A precise utility line
 * sits above an asymmetric grid: a large bilingual serif headline + founder-voice
 * intro anchored to a strict type column (start), and a real WARM-DUOTONE portrait
 * of Dr. Kitrey as a hairline-framed editorial column (end).
 *
 * The portrait is the same CSS background-image pattern as Home (`.portrait`), so a
 * missing file degrades gracefully to a DESIGNED empty state (bone fill + hairline
 * frame + "NK / Portrait"), never a broken grey box. `portrait--2` lights up when
 * /portraits/kitrey-2.png lands. RTL-correct throughout (logical props); phone and
 * the Tel Aviv · Est. line render dir="ltr".
 */
export function AboutHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Utility line — the masthead rule above the fold, mirroring Home. */}
        <InView
          as="div"
          motion="fade-in-up"
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-b border-border py-4 text-caption uppercase tracking-[0.2em] text-slate eyebrow"
        >
          <span className="max-w-full">
            <span
              aria-hidden
              className="me-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent align-middle"
            />
            {t(hero.eyebrow, locale)}
          </span>
          <span className="font-mono normal-case tracking-[0.08em] text-slate-strong">
            <span dir="ltr">Tel Aviv · Est. 2010</span>
          </span>
        </InView>

        {/* The spread: type column (start) + portrait column (end). */}
        <div className="grid items-center gap-x-12 gap-y-8 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-x-16 lg:pb-24 lg:pt-16">
          {/* Type column — FIRST on mobile (text-first), start side on lg. */}
          <div className="order-1">
            <h1 className="max-w-[20ch] text-pretty font-editorial text-ink [font-size:clamp(2.05rem,3.7vw,3.375rem)] [line-height:1.07] [letter-spacing:-0.018em] sm:max-w-[18ch]">
              <InView as="span" className="block pb-[0.12em]">
                {t(hero.headline, locale)}
              </InView>
            </h1>

            {/* Drawn signature hairline — the recurring blue motif. */}
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
              {t(hero.intro, locale)}
            </InView>

            {/* CTAs — one solid primary, one click-to-call. Mirrors Home. */}
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
                {t(contactCta.primaryCta, locale)}
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

          {/* Portrait column — warm duotone, hairline-framed editorial element.
              BELOW the text on mobile; capped so it never dominates screen one. */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-2">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
              {/* Hairline frame offset — gives the portrait an art-directed mat. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 border border-border"
              />
              {/* The designed empty state (monogram + caption) shows until a photo
                  lands; `portrait--2` resolves /portraits/kitrey-2.png when present. */}
              <div
                className="portrait portrait--2 relative h-[42vh] max-h-[420px] w-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:max-h-none"
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
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-3 text-caption text-slate">
              <span className="font-editorial text-body-base normal-case tracking-normal text-ink">
                {t(hero.portraitCaption, locale)}
              </span>
              <span className="uppercase tracking-[0.18em] eyebrow">
                {t({ he: "אורולוג בכיר", en: "Senior Urologist" }, locale)}
              </span>
            </figcaption>
          </InView>
        </div>
      </div>
    </section>
  );
}
