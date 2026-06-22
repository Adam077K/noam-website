import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { atmosphere } from "@/content/clinic";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";

/**
 * Clinic field-note opener — above-fold chapter fix (v6, poster discipline).
 *
 * POSTER DISCIPLINE (GLOBAL-RULE §1):
 * - ONE display H1 at 44-72px, unambiguously the largest text on screen.
 * - Ghost "01" watermark in the OUTER margin only (inset-inline-end-[-2%] at lg)
 *   so it never occupies a content column. Opacity 0.06 (< 0.07 threshold).
 * - SectionHead removed: the running head (RunningHead in page.tsx) + an inline
 *   eyebrow carry the breadcrumb — no triple-label.
 * - First real content unit (body copy + CTA) visible above fold at both 1366+1440.
 * - clinic-shot__caption sub-label DELETED — the NK monogram reads as a designed
 *   mark without a word naming it.
 * - Blue accent rule repositioned below H1 (not floating in dead space).
 *
 * Layout:
 * - LG+: [primary: eyebrow → H1 → rule → body → CTA] | [margin: portrait plate
 *   → figcaption → address lines]
 * - Mobile: primary first, plate below.
 * - No SectionHead folio band (eliminated triple-label).
 *
 * RTL-correct: logical props throughout. dir="ltr" on address digits and phone.
 */
export function AtmosphereHero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section className="relative overflow-x-clip bg-paper">
      {/*
        Ghost "01" watermark — pushed to the OUTER margin beyond the content grid.
        At lg+ positioned at inset-inline-end-[-2%] so the content grid (max-w-1280px)
        never overlaps it. Opacity 0.06. Hidden on mobile (no room in margin).
      */}
      <span
        aria-hidden
        className="ghost-numeral pointer-events-none absolute top-6 hidden lg:block [inset-inline-end:calc(50%-680px)]"
        style={{ opacity: 0.06 }}
      >
        <span dir="ltr">01</span>
      </span>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pt-9">
        {/*
          Grid: PRIMARY (wide, order-1) + MARGIN plate (order-2).
          Mobile: single column, primary first.
          LG: [minmax(0,1fr)] [18rem] — asymmetric journal layout.
          gap-y tighter than previous (gap-y-8→gap-y-6) to compress vertical white.
        */}
        <div className="grid gap-x-12 gap-y-6 pb-10 sm:gap-x-14 sm:gap-y-8 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-16 lg:pb-16">

          {/* ── PRIMARY — eyebrow → H1 → rule → body → CTA ───────────────── */}
          <div className="relative order-1 z-10 flex flex-col">

            {/*
              Eyebrow — chapter label, compact, directly above H1.
              Two-tier: section label (small-caps) only. No folio number here
              (ghost watermark handles the numeral; no triple-label).
            */}
            <p className="mb-2 text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow">
              {t(atmosphere.eyebrow, locale)}
            </p>

            {/*
              DISPLAY H1 — the visual centrepiece, unambiguously largest on screen.
              clamp: 1.875rem floor (30px mobile) → 3.875rem cap (62px desktop).
              font-editorial: Frank Ruhl Libre in HE, Fraunces in EN.
              No InView wrapper: above-fold content, visible immediately.
            */}
            <h1 className="max-w-[22ch] text-pretty font-editorial text-ink [font-size:clamp(1.875rem,4.5vw,3.875rem)] [letter-spacing:-0.02em] [line-height:1.06]">
              {t(atmosphere.headline, locale)}
            </h1>

            {/* Accent rule — brand motif, connects H1 to body. */}
            <InView
              as="div"
              motion="rule-draw"
              delay={240}
              className="mt-5 h-px w-20 bg-accent sm:mt-6"
            />

            {/*
              Body — anxiety-reducing standfirst, first real content unit.
              text-body-lg (18px), max-w-[52ch] comfortable measure.
              No InView delay on the paragraph so it's paint-visible above fold.
            */}
            <p className="mt-4 max-w-[52ch] text-body-lg leading-relaxed text-ink-80 sm:mt-5">
              {t(atmosphere.body, locale)}
            </p>

            {/*
              CTA — request consultation link (above-fold on desktop).
              Secondary phone link below. min-h-[48px] per directive.
            */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={180}
              className="mt-7 flex flex-col gap-x-8 gap-y-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              <a
                href={localeHref(locale, "/contact")}
                className="group/cta inline-flex min-h-[48px] w-full items-center justify-center gap-3 bg-ink px-7 text-body-sm font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto sm:justify-start"
              >
                {isHe ? "לבקשת ייעוץ" : "Request a consultation"}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
                >
                  &#8594;
                </span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-body-sm text-slate-strong transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="text-caption uppercase tracking-[0.16em] text-slate eyebrow">
                  {isHe ? "או חייגו" : "Or call"}
                </span>
                <span className="font-mono text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>
          </div>

          {/* ── MARGIN — clinic plate → figcaption → address lines ─────────── */}
          <InView as="figure" motion="fade-in-up" delay={160} className="order-2 z-10">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
              {/* Hairline mat + accent tick — journal plate frame motif. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 border border-ink/20"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 -start-2.5 h-12 w-px bg-accent"
              />
              {/*
                Clinic-shot plate. ratio: 36vh/380px on mobile, 4:5 on desktop.
                NK monogram only — NO sub-label (clinic-shot__caption is suppressed
                via CSS display:none; we also do not pass any text to that element).
                aria-label on the wrapper carries the accessible description.
              */}
              <div
                className="clinic-shot relative h-[36vh] max-h-[360px] w-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:max-h-none"
                role="img"
                aria-label={t(atmosphere.photoAlt, locale)}
              >
                <span aria-hidden className="clinic-shot__empty">
                  <span className="clinic-shot__monogram">NK</span>
                  {/* clinic-shot__credential mirrors portrait treatment —
                      one quiet data line at the lower edge of the panel. */}
                  <span
                    className="absolute bottom-0 start-0 end-0 px-4 pb-3 text-center font-mono text-[0.5rem] uppercase tracking-[0.18em] text-ink/50"
                  >
                    {isHe
                      ? "אורולוגיה פונקציונלית · שיבא"
                      : "Functional Urology · Sheba"}
                  </span>
                </span>
              </div>
              {/*
                Figcaption — location credit below the plate.
                overflow-visible + pb-2 so the last line never clips at 1366 (RTL fix).
              */}
              <figcaption className="mt-4 overflow-visible pb-2 font-editorial text-body-sm normal-case tracking-normal text-ink">
                {t(atmosphere.photoCaption, locale)}
              </figcaption>
            </div>

            {/*
              Address detail lines — right-column content so the margin column
              carries real information (not just the plate).
              dir="ltr" on address digits per RTL isolation rule.
            */}
            <InView
              as="dl"
              motion="fade-in-up"
              delay={260}
              className="mt-7 flex flex-col gap-1.5 border-t border-ink/12 pt-5"
            >
              <dt className="text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
                {isHe ? "קליניקות איל" : "Ayal Specialist Clinics"}
              </dt>
              <dd className="font-editorial text-body-base text-ink" dir="ltr">
                156 Menachem Begin Rd
              </dd>
              <dd className="mt-0.5 font-editorial text-body-base text-ink" dir="ltr">
                {isHe ? "קומה 17 · תל אביב" : "Floor 17 · Tel Aviv"}
              </dd>
            </InView>
          </InView>
        </div>
      </div>
    </section>
  );
}
