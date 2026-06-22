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
 * Hero — ref #3 clinic-minimal (v3).
 *
 * Two-column grid: text start, portrait end.
 * Eyebrow → display H1 → deck → dual CTA row → micro-credential chips.
 * Portrait: MediaSlot with organic mist blobs peering behind, rounded 24px panel.
 * Mobile: single column, text → portrait, CTAs full-width.
 *
 * RTL: logical props only (ms-/me-, ps-/pe-, inset-inline-start/end).
 * dir="ltr" on phone numbers.
 */
export function Hero({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <section
      className="relative overflow-hidden bg-paper px-[clamp(1.25rem,4vw,2.5rem)]"
      aria-label={t({ he: "ראש עמוד", en: "Hero" }, locale)}
    >
      {/* Soft mist ambient blob — top end corner, purely decorative */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -end-24 -z-10 h-[480px] w-[480px] bg-mist/20 blur-[100px]"
        style={{ borderRadius: "62% 38% 56% 44% / 54% 60% 40% 46%" }}
      />

      <div className="mx-auto max-w-[1200px] py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid items-center gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)]">

          {/* ── TEXT COLUMN ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            <InView as="div" motion="fade-in-up" delay={0}>
              <Eyebrow withRule>
                {t(hero.eyebrow, locale)}
              </Eyebrow>
            </InView>

            <InView as="div" motion="fade-in-up" delay={80}>
              <h1
                className={[
                  "max-w-[18ch] text-balance text-ink",
                  "[font-size:var(--text-masthead)] [line-height:var(--text-masthead--line-height)]",
                  "[letter-spacing:var(--text-masthead--letter-spacing)] [font-weight:var(--text-masthead--font-weight)]",
                ].join(" ")}
              >
                {isHe
                  ? "אורולוגיה תפקודית ורפואה מינית"
                  : "Functional Urology & Sexual Medicine"}
              </h1>
            </InView>

            <InView as="p" motion="fade-in-up" delay={140}
              className="max-w-[48ch] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-slate-strong"
            >
              {t(hero.subhead, locale)}
            </InView>

            {/* Pull-quote / emotional bridge */}
            <InView as="p" motion="fade-in-up" delay={180}
              className="max-w-[44ch] text-[length:var(--text-body-base)] leading-[var(--text-body-base--line-height)] text-ink-60 border-s-2 border-mist ps-4"
            >
              {t(hero.headline, locale)}
            </InView>

            {/* CTA row */}
            <InView as="div" motion="fade-in-up" delay={240}
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
            <InView as="ul" motion="fade-in-up" delay={300}
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
            <InView as="div" motion="fade-in-up" delay={340}
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

          {/* ── PORTRAIT COLUMN ─────────────────────────────────────── */}
          <InView
            as="div"
            motion="fade-in-up"
            delay={180}
            className="order-first lg:order-none"
          >
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
