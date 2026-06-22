import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { atmosphere } from "@/content/clinic";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "@/components/sections/home/journal";

/**
 * Clinic field-note — the opening article (v4 "The Journal", field-note cut).
 *
 * The Clinic page opens like a journal FIELD-NOTE: a section running-head (folio 01
 * "The Visit"), an oversized folio anchor bleeding behind the type, a calm serif
 * headline + anxiety-reducing standfirst in the wide PRIMARY column, and the
 * clinic-interior slot set as a hairline-framed PLATE in the MARGIN column using
 * Home's designed empty-state (`.clinic-shot`) — warm cream + label, never a broken
 * grey box. No wash band, no icon cards, no shadows.
 *
 * RTL-correct via logical props; the interior slot mirrors to the correct side.
 */
export function AtmosphereHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14">
        <SectionHead
          folio="01"
          title={{ he: "הביקור", en: "The Visit" }}
          locale={locale}
        />

        {/* Primary type column (wide) + margin column (interior plate). */}
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16">
          {/* PRIMARY. */}
          <div className="relative order-1">
            {/* Oversized folio anchor, bleeding off the start edge behind the type. */}
            <Folio
              n="01"
              className="pointer-events-none absolute -top-6 -z-0 text-[7rem] -start-2 sm:text-[10rem] lg:-top-10 lg:text-[13rem]"
            />

            <p className="relative mb-6 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
              {t(atmosphere.eyebrow, locale)}
            </p>

            <h1 className="relative max-w-[18ch] text-pretty font-editorial text-ink [font-size:clamp(2.1rem,4.2vw,3.625rem)] [line-height:1.06] [letter-spacing:-0.02em] sm:max-w-[16ch]">
              <InView as="span" className="block pb-[0.12em]">
                {t(atmosphere.headline, locale)}
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
              {t(atmosphere.body, locale)}
            </InView>
          </div>

          {/* MARGIN — clinic-interior plate, designed empty-state, hairline-framed.
              BELOW the text on mobile; capped so it never dominates screen one. */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-2">
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none">
              {/* Hairline mat + accent tick — the recurring journal plate frame. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 border border-ink/20"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 -start-2.5 h-12 w-px bg-accent"
              />
              <div
                className="clinic-shot relative h-[42vh] max-h-[440px] w-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:max-h-none"
                role="img"
                aria-label={t(atmosphere.photoAlt, locale)}
              >
                <span aria-hidden className="clinic-shot__empty">
                  <span className="clinic-shot__monogram">NK</span>
                  <span className="clinic-shot__caption eyebrow">
                    {t({ he: "המרפאה", en: "The clinic" }, locale)}
                  </span>
                </span>
              </div>
              {/* Clean editorial caption — no "Fig." affectation. */}
              <figcaption className="mt-3.5 font-editorial text-body-sm normal-case tracking-normal text-ink">
                {t(atmosphere.photoCaption, locale)}
              </figcaption>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
