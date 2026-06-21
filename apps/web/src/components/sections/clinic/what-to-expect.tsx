import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expect } from "@/content/clinic";
import { Eyebrow, Reveal } from "@/components/ui";

/**
 * "What to expect" process. Four calm, discreet steps on a soft wash band, laid
 * out as a connected path: a tabular step index sits in an accent-tinted medallion
 * with a hairline rail running through the column so the four steps read as one
 * continuous journey (first contact → ongoing care). The numerals are the only
 * accent flourish; everything else stays quiet to lower pre-visit anxiety. Each
 * step fades up on a short stagger. Stacks to a single column on mobile.
 */
export function WhatToExpect({ locale }: { locale: Locale }) {
  return (
    <section className="bg-wash px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow withRule>{t(expect.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-balance text-display-lg text-ink">
              {t(expect.headline, locale)}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {expect.steps.map((step, i) => (
            <Reveal key={step.key} as="li" delay={i * 80}>
              <div className="group/step flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-accent-tint text-display-md font-semibold tabular-nums text-accent ring-1 ring-accent-soft/70">
                    {i + 1}
                  </span>
                  {/* Connecting rail to the next step — hidden on the last item and on
                      single-column mobile, where the vertical stack carries the order. */}
                  {i < expect.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden h-px flex-1 bg-accent-soft/60 lg:block"
                    />
                  )}
                </div>
                <h3 className="text-display-md font-semibold text-ink">
                  {t(step.title, locale)}
                </h3>
                <p className="text-body-base text-slate-strong">
                  {t(step.blurb, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
