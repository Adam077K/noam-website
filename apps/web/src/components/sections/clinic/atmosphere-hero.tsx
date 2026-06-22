import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { atmosphere } from "@/content/clinic";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Clinic field-note opener — above-fold chapter fix (v5).
 *
 * PAGE DIRECTIVE: the display H1 + body must sit above the fold at both
 * 1440x820 and 1366x768. The ghost "01" ordinal is a watermark (aria-hidden,
 * position:absolute, z-0, opacity 0.07) — it never displaces content.
 *
 * Layout changes from v4:
 * - Section padding-top trimmed: pt-3 / sm:pt-4 / lg:pt-5 (matches Hero).
 * - Dropped intermediate mt-10 grid gap; grid now starts immediately after SectionHead.
 * - Folio component replaced by .ghost-numeral positioned in the outer margin.
 * - Primary column: eyebrow → H1 → divider rule → body. No vertical wasted space.
 * - Margin column: clinic-shot plate → caption → location detail lines (new).
 * - Caption: overflow-visible + pb-1 so the last line never clips at 1366.
 * - Mobile H1: clamp floor 1.75rem→1.875rem (28-30px) per directive.
 *
 * RTL-correct via logical props; caption + location details get padding-block
 * clearance so no text clips in RTL narrow viewports.
 */
export function AtmosphereHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-x-clip bg-paper">
      {/*
        Ghost "01" watermark — far outer margin, behind all content.
        Uses the .ghost-numeral design-system class (opacity 0.07, font-mono).
        inset-inline-end positions it in the margin for LTR; logical, so in RTL
        it appears on the left (start side in visual terms) — correct for Hebrew.
      */}
      <span
        aria-hidden
        className="ghost-numeral pointer-events-none absolute top-4 inset-inline-end-[1%] hidden lg:block"
      >
        01
      </span>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5">
        <SectionHead
          folio="01"
          title={{ he: "הביקור", en: "The Visit" }}
          locale={locale}
        />

        {/*
          Grid: text PRIMARY (wide, order-1) + MARGIN plate (order-2).
          On mobile: single column, text first, plate below.
          On lg: asymmetric — primary ~1fr, margin ~18rem.
          pt-4 sm:pt-5 lg:pt-6 keeps H1 immediately after SectionHead.
        */}
        <div className="grid gap-x-10 gap-y-8 pt-4 pb-10 sm:gap-x-12 sm:gap-y-10 sm:pt-5 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-16 lg:pt-6 lg:pb-16">

          {/* PRIMARY — display H1 + divider + body. No folio that pushes content. */}
          <div className="relative order-1 flex flex-col">

            {/* Eyebrow — compact, directly above H1 */}
            <p className="mb-3 text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow">
              {t(atmosphere.eyebrow, locale)}
            </p>

            {/*
              Display H1 — the visual centrepiece above the fold.
              Mobile floor: 1.875rem = 30px (per directive: 28-32px).
              Desktop: up to 3.75rem = 60px (display-xl territory).
              font-editorial uses Frank Ruhl (HE) or Fraunces (EN).
              No italics in Hebrew (enforced by html[lang="he"] .font-editorial).
            */}
            <h1 className="max-w-[20ch] text-pretty font-editorial text-ink [font-size:clamp(1.875rem,4.2vw,3.75rem)] [line-height:1.06] [letter-spacing:-0.02em]">
              <InView as="span" className="block">
                {t(atmosphere.headline, locale)}
              </InView>
            </h1>

            {/* Accent rule — the signature brand motif */}
            <InView
              as="div"
              motion="rule-draw"
              delay={280}
              className="mt-6 h-px w-20 bg-accent sm:mt-7"
            />

            {/*
              Body — anxiety-reducing copy.
              text-body-lg (18px) at max-w-[52ch] for comfortable reading measure.
            */}
            <InView
              as="p"
              motion="fade-in-up"
              delay={100}
              className="mt-5 max-w-[52ch] text-body-lg leading-relaxed text-ink-80 sm:mt-6"
            >
              {t(atmosphere.body, locale)}
            </InView>
          </div>

          {/*
            MARGIN — clinic-interior plate (editorial image slot) + caption + location
            detail lines. Below text on mobile; right column on desktop.
            Caption overflow fix: overflow-visible, pb-1 padding-block clearance.
          */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-2">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
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
                className="clinic-shot relative h-[36vh] max-h-[380px] w-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:max-h-none"
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
              {/*
                Caption — overflow-visible + pb-2 so the last line never clips at 1366.
                RTL: padding-block-end ensures clearance on all widths.
              */}
              <figcaption className="mt-4 overflow-visible pb-1 font-editorial text-body-sm normal-case tracking-normal text-ink">
                {t(atmosphere.photoCaption, locale)}
              </figcaption>
            </div>

            {/*
              Location detail lines — right column balance (per PAGE DIRECTIVE).
              Below the plate/caption on all breakpoints.
              dir="ltr" on address digits; logical margin-block so RTL aligns correctly.
            */}
            <InView
              as="dl"
              motion="fade-in-up"
              delay={220}
              className="mt-7 flex flex-col gap-1.5 border-t border-ink/12 pt-5"
            >
              <dt className="text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
                {t({ he: "קליניקות איל", en: "Ayal Specialist Clinics" }, locale)}
              </dt>
              <dd className="font-editorial text-body-base text-ink" dir="ltr">
                156 Menachem Begin Rd
              </dd>
              <dd className="mt-0.5 font-editorial text-body-base text-ink" dir="ltr">
                {t({ he: "קומה 17 · תל אביב", en: "Floor 17 · Tel Aviv" }, locale)}
              </dd>
            </InView>
          </InView>
        </div>
      </div>
    </section>
  );
}
