import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { trust } from "@/content/home";
import { InView } from "@/components/ui";

/**
 * The approach — editorial three-column manifesto on bone paper (v2 "Quiet
 * Authority"). NO icon cards: a lead statement set in the display serif, then the
 * three pillars as hairline-topped columns (mono index · serif title · grotesk
 * body), divided by vertical rules that DRAW down on entry. Restraint as the
 * whole point — confidence through type and space, not decoration.
 *
 * RTL-correct via logical props; the vertical dividers + grid mirror naturally.
 */
export function Approach({ locale }: { locale: Locale }) {
  return (
    <section className="bg-canvas px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Lead — the approach stated as an editorial line. */}
        <div className="max-w-[26ch]">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(trust.eyebrow, locale)}
          </p>
          <h2 className="mt-6 text-pretty font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(trust.headline, locale)}
            </InView>
          </h2>
        </div>

        <InView as="p" motion="fade-in-up" delay={120} className="mt-8 max-w-[60ch] text-body-lg text-slate-strong">
          {t(trust.body, locale)}
        </InView>

        {/* Pillars — hairline-topped columns, divided by drawing vertical rules. */}
        <div className="mt-16 grid gap-px border-t border-ink sm:mt-20 sm:grid-cols-3">
          {trust.pillars.map((pillar, i) => (
            <div key={pillar.key} className="relative pt-8 sm:px-8 sm:first:ps-0">
              {/* Vertical divider that draws down — skipped on the first column. */}
              {i > 0 && (
                <InView
                  as="span"
                  motion="rule-draw-y"
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 start-0 hidden w-px bg-border sm:block"
                />
              )}
              <InView as="div" motion="fade-in-up" delay={i * 90}>
                <span className="font-mono text-body-sm tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-editorial text-display-md text-ink">
                  {t(pillar.title, locale)}
                </h3>
                <p className="mt-3 max-w-[34ch] text-body-base text-slate">
                  {t(pillar.blurb, locale)}
                </p>
              </InView>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
