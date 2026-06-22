import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaSlot } from "@/components/ui/media-slot";
import { InView } from "@/components/ui/in-view";

/**
 * Hero — ref #3 clinic-minimal (v4 — premium polish).
 *
 * Two-column asymmetric grid: text start, portrait end.
 * Typography: headline uses --text-masthead at clamp(3.25rem, 6.5vw, 5.5rem),
 * weight 700, tracking -0.03em, leading 1.0 — commanding focal point.
 *
 * Portrait column: organic mist blob (high-presence, asymmetric) + double-bezel
 * panel + large NK monogram (ink ~70%, ~5:1 contrast) + floating credential chip.
 * A secondary thin-arc SVG adds a composed mark behind the panel.
 * A small floating institution chip sits above the panel.
 *
 * Motion: staggered fade-up entrance (transform + opacity only).
 * Respects prefers-reduced-motion via CSS classes (InView / .fade-in-up).
 *
 * RTL: logical CSS props only. dir="ltr" on phone numbers. No Hebrew italics.
 * WCAG AA: single h1, focus-visible rings, contrast verified.
 */
export function Hero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  /* Credential chip label — floating above portrait panel */
  const chipLabel = isHe
    ? 'שיבא · אורולוגיה תפקודית'
    : 'Sheba · Functional Urology';

  return (
    <section
      className="relative overflow-hidden bg-paper px-[clamp(1.25rem,4vw,2.5rem)]"
      aria-label={t({ he: "ראש עמוד", en: "Hero" }, locale)}
    >
      {/* ── AMBIENT BLOBS — purely decorative, behind everything ─────────── */}
      {/* Top end corner — soft mist ambient wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -end-32 -z-20 h-[560px] w-[560px] blur-[120px]"
        style={{
          borderRadius: "62% 38% 56% 44% / 54% 60% 40% 46%",
          background: "radial-gradient(ellipse, rgba(175,200,203,0.28) 0%, transparent 70%)",
        }}
      />
      {/* Bottom start — counter-wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 -start-16 -z-20 h-[320px] w-[380px] blur-[90px]"
        style={{
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          background: "radial-gradient(ellipse, rgba(200,218,218,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1200px] py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid items-center gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)]">

          {/* ── TEXT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            <InView as="div" motion="fade-in-up" delay={0}>
              <Eyebrow withRule>
                {t(hero.eyebrow, locale)}
              </Eyebrow>
            </InView>

            <InView as="div" motion="fade-in-up" delay={80}>
              <h1
                className={[
                  "text-balance text-ink",
                  "[font-size:var(--text-masthead)]",
                  "[line-height:var(--text-masthead--line-height)]",
                  "[letter-spacing:var(--text-masthead--letter-spacing)]",
                  "[font-weight:var(--text-masthead--font-weight)]",
                  /* Let the column grid constrain the width */
                  "max-w-[20ch]",
                ].join(" ")}
              >
                {isHe
                  ? "אורולוגיה תפקודית ורפואה מינית"
                  : "Functional Urology & Sexual Medicine"}
              </h1>
            </InView>

            <InView as="p" motion="fade-in-up" delay={140}
              className="max-w-[46ch] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-slate-strong"
            >
              {t(hero.subhead, locale)}
            </InView>

            {/* Pull-quote / emotional bridge */}
            <InView as="p" motion="fade-in-up" delay={200}
              className="max-w-[42ch] text-[length:var(--text-body-base)] leading-[var(--text-body-base--line-height)] text-ink-60 border-s-2 border-mist ps-4"
            >
              {t(hero.headline, locale)}
            </InView>

            {/* CTA row */}
            <InView as="div" motion="fade-in-up" delay={260}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button
                href={localeHref(locale, "/contact")}
                variant="primary"
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                {t(hero.primaryCta, locale)}
              </Button>
              <Button
                href={localeHref(locale, "/about")}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t(hero.secondaryCta, locale)}
              </Button>
            </InView>

            {/* Micro-credential chips below CTAs */}
            <InView as="ul" motion="fade-in-up" delay={320}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5"
            >
              {hero.microRow.map((item, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-2 text-[length:var(--text-body-sm)] text-slate"
                >
                  {i > 0 && (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-mist" />
                  )}
                  <span>{t(item, locale)}</span>
                </li>
              ))}
            </InView>

            {/* Phone link */}
            <InView as="div" motion="fade-in-up" delay={360}
              className="flex items-center gap-3"
            >
              <span className="text-[length:var(--text-body-sm)] text-slate">
                {t({ he: "או חייגו:", en: "Or call:" }, locale)}
              </span>
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="font-mono text-[length:var(--text-body-sm)] font-medium text-ink transition-colors hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
              >
                <span dir="ltr">{contact.phone}</span>
              </a>
            </InView>
          </div>

          {/* ── PORTRAIT COLUMN ─────────────────────────────────────────── */}
          <InView
            as="div"
            motion="fade-in-up"
            delay={100}
            className="order-first lg:order-none flex flex-col items-center lg:items-start gap-4"
          >
            {/* Floating institution chip — above the portrait panel, gives composition life */}
            <span
              aria-hidden
              className="credential-chip ms-auto me-auto lg:ms-6"
            >
              <span className="credential-chip__dot" />
              {chipLabel}
            </span>

            <MediaSlot
              ratio="4/5"
              alt={t(hero.portraitAlt, locale)}
              caption={t(hero.portraitCaption, locale)}
              slot="hero-portrait"
              blob
              monogram="NK"
              className="mx-auto w-full max-w-[440px] lg:max-w-none"
            />
          </InView>
        </div>
      </div>
    </section>
  );
}
