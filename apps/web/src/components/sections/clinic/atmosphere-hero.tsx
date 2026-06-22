import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { atmosphere } from "@/content/clinic";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Clinic atmosphere hero — ref-#3 layout.
 *
 * Structure: two-column asymmetric grid (LG+).
 *   LEFT  — eyebrow → H1 → accent rule → calm body → CTA row
 *   RIGHT — clinic photo slot (rounded 24px, organic blob behind, 4:5 aspect)
 *            → figcaption → address detail lines
 *
 * The photo slot uses the mist gradient placeholder (intentional, never a grey
 * void) and is object-fit:cover ready for the real photo.
 *
 * RTL-correct: logical props throughout. dir="ltr" on digits.
 * Single H1 per page. Ghost watermark in outer margin only (opacity 0.06).
 */
export function AtmosphereHero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,2.5rem)] pt-5 sm:pt-7 lg:pt-10">
        {/*
          Main grid: [primary: grow] [photo column: 22rem fixed on LG]
          Mobile: single column, photo below.
          The 22rem photo column is the "margin plate" — informative, not decorative.
        */}
        <div className="grid gap-x-14 gap-y-8 pb-12 sm:gap-x-16 sm:gap-y-10 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:pb-20">

          {/* ── LEFT — eyebrow → H1 → rule → body → CTA ──────────────────── */}
          <div className="relative order-1 z-10 flex flex-col">

            {/* Eyebrow — section label directly above H1, no triple-label */}
            <Eyebrow tone="default" withRule className="mb-3">
              {t(atmosphere.eyebrow, locale)}
            </Eyebrow>

            {/*
              DISPLAY H1 — the single, dominant heading on this page.
              clamp: 1.875rem (mobile) → 3.875rem (desktop).
              font-editorial: Heebo HE / Inter EN per globals.css.
              No InView: above-fold content, renders immediately.
            */}
            <h1
              className="font-editorial text-ink text-pretty max-w-[22ch]"
              style={{
                fontSize: "clamp(1.875rem, 4.5vw, 3.875rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
              }}
            >
              {t(atmosphere.headline, locale)}
            </h1>

            {/* Accent rule — brand motif, connects H1 to body */}
            <InView
              as="div"
              motion="rule-draw"
              delay={200}
              className="mt-5 h-px w-20 bg-mist sm:mt-6"
            />

            {/*
              Body — calm standfirst, anxiety-reducing.
              text-body-lg (18px), max-w-[52ch].
            */}
            <p className="mt-4 max-w-[52ch] text-[1.125rem] leading-relaxed text-ink-80 sm:mt-5">
              {t(atmosphere.body, locale)}
            </p>

            {/* CTA row */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={160}
              className="mt-7 flex flex-col gap-x-8 gap-y-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              {/*
                Primary CTA — filled pill, mist-tinted on hover.
                min-h-[48px] (44px touch target per WCAG 2.5.5 enhanced).
              */}
              <a
                href={localeHref(locale, "/contact")}
                className="group/cta inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full bg-ink px-7 text-[0.875rem] font-semibold text-paper transition-[background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98] sm:w-auto sm:justify-start"
              >
                {isHe ? "לבקשת ייעוץ" : "Request a consultation"}
                <Icon
                  name="arrow"
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 rtl:rotate-180 group-hover/cta:translate-x-0.5 rtl:group-hover/cta:-translate-x-0.5"
                />
              </a>

              {/* Secondary — phone, quieter weight */}
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-[0.875rem] text-slate-strong transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="eyebrow text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-slate">
                  {isHe ? "או חייגו" : "Or call"}
                </span>
                <span className="font-mono text-ink">
                  <span dir="ltr">{contact.phone}</span>
                </span>
              </a>
            </InView>
          </div>

          {/* ── RIGHT — clinic photo slot ────────────────────────────────── */}
          <InView as="figure" motion="fade-in-up" delay={120} className="order-2 z-10">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none">

              {/* Organic mist blob — peeks behind the plate for warmth */}
              <span
                aria-hidden
                className="pointer-events-none absolute -end-8 -top-8 -z-10 h-[78%] w-[82%] bg-mist/30 blur-[56px]"
                style={{ borderRadius: "60% 40% 56% 44% / 52% 62% 38% 48%" }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -start-6 bottom-[-6%] -z-10 h-[48%] w-[56%] bg-mist-200/60 blur-[44px]"
                style={{ borderRadius: "46% 54% 40% 60% / 60% 42% 58% 40%" }}
              />

              {/* Hairline mat frame — journal plate motif (inset hairline border) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 hidden border border-ink/15 sm:block"
              />
              {/* Accent tick at bottom-start corner */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 hidden h-12 w-px bg-mist sm:block"
                style={{ insetInlineStart: "-10px" }}
              />

              {/*
                Clinic-shot slot.
                Mist gradient placeholder — intentional, never a grey void.
                object-fit:cover ready: real photo drops in zero-shift.
                Rounded 24px per spec (radius-2xl).
              */}
              <div
                className="clinic-shot relative h-[38vh] max-h-[380px] w-full overflow-hidden rounded-[24px] lg:aspect-[4/5] lg:h-auto lg:max-h-none"
                role="img"
                aria-label={t(atmosphere.photoAlt, locale)}
              >
                {/* Placeholder empty state content — designed, not a grey box */}
                <span aria-hidden className="clinic-shot__empty">
                  <span className="clinic-shot__monogram">NK</span>
                  <span
                    className="absolute bottom-0 end-0 start-0 px-4 pb-3 text-center font-mono text-[0.5rem] uppercase tracking-[0.18em] text-ink/50"
                  >
                    {isHe
                      ? "אורולוגיה פונקציונלית · שיבא"
                      : "Functional Urology · Sheba"}
                  </span>
                </span>

                {/* Subtle inner vignette for depth (decorative) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_10%,rgba(255,255,255,0.55),transparent_65%)]"
                />
                {/* Concentric inner hairline — intentional plate frame */}
                <span
                  aria-hidden
                  className="absolute inset-[10px] rounded-[14px] ring-1 ring-mist/20 pointer-events-none"
                />
              </div>

              {/* Figcaption — location credit below the plate */}
              <figcaption className="mt-3 overflow-visible pb-1 text-[0.875rem] normal-case tracking-normal text-ink-80">
                {t(atmosphere.photoCaption, locale)}
              </figcaption>
            </div>

            {/*
              Address detail — right column carries real information.
              Hairline rule separates plate from data block.
              dir="ltr" on address digits for correct number ordering.
            */}
            <InView
              as="dl"
              motion="fade-in-up"
              delay={240}
              className="mt-6 flex flex-col gap-1.5 border-t border-ink/12 pt-5"
            >
              <dt className="eyebrow text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-strong">
                {isHe ? "קליניקות איל" : "Ayal Specialist Clinics"}
              </dt>
              <dd className="text-[1rem] leading-snug text-ink" dir="ltr">
                156 Menachem Begin Rd
              </dd>
              <dd className="mt-0.5 text-[1rem] leading-snug text-ink" dir="ltr">
                {isHe ? "קומה 17 · תל אביב" : "Floor 17 · Tel Aviv"}
              </dd>
            </InView>
          </InView>
        </div>
      </div>
    </section>
  );
}
