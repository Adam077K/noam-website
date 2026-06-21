import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { atmosphere } from "@/content/clinic";
import { InView } from "@/components/ui";

/**
 * Clinic atmosphere hero — editorial conversion (v2 "Quiet Authority").
 *
 * An asymmetric spread on warm bone, mirroring the Home masthead: a precise
 * utility line, a massive bilingual serif headline anchored to a strict type
 * column (start), a drawn blue hairline, and a calm anxiety-reducing intro — set
 * beside a hairline-framed clinic-interior column (end) that uses the Home
 * DESIGNED empty-state pattern (warm cream field + hairline mat + label), never a
 * broken grey box. No wash band, no ambient blobs, no shadowed cards.
 *
 * The interior slot is a CSS background-image (`.clinic-shot`), so a missing file
 * degrades gracefully to the bone surface + label. RTL-correct via logical props;
 * the practice/since line renders dir="ltr".
 */
export function AtmosphereHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Utility line — a precise masthead rule above the fold. */}
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
            {t(atmosphere.eyebrow, locale)}
          </span>
          <span className="font-mono normal-case tracking-[0.08em] text-slate-strong">
            <span dir="ltr">Recital Tower · Tel Aviv</span>
          </span>
        </InView>

        {/* The spread: type column (start) + interior column (end). */}
        <div className="grid items-center gap-x-12 gap-y-8 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-x-16 lg:pb-24 lg:pt-16">
          {/* Type column — FIRST on mobile (text-first), start side on lg. */}
          <div className="order-1">
            <h1 className="max-w-[18ch] text-pretty font-editorial text-ink [font-size:clamp(2.15rem,4vw,3.625rem)] [line-height:1.05] [letter-spacing:-0.018em] sm:max-w-[16ch]">
              <InView as="span" className="block pb-[0.12em]">
                {t(atmosphere.headline, locale)}
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
              className="mt-7 max-w-[48ch] text-body-lg text-ink-80 sm:mt-8"
            >
              {t(atmosphere.body, locale)}
            </InView>
          </div>

          {/* Interior column — warm cream designed empty state, hairline-framed.
              BELOW the text on mobile; capped so it never dominates screen one. */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-2">
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none">
              {/* Hairline frame offset — gives the slot an art-directed mat. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 border border-border"
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
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-3 text-caption text-slate">
              <span className="font-editorial text-body-base normal-case tracking-normal text-ink">
                {t(atmosphere.photoCaption, locale)}
              </span>
              <span className="uppercase tracking-[0.18em] eyebrow">
                {t({ he: "תל אביב", en: "Tel Aviv" }, locale)}
              </span>
            </figcaption>
          </InView>
        </div>
      </div>
    </section>
  );
}
