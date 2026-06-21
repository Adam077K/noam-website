import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expect } from "@/content/clinic";
import { InView } from "@/components/ui";

/**
 * "What to expect" — editorial conversion (v2 "Quiet Authority").
 *
 * The four-step journey (first contact → ongoing care) reads as a NUMBERED
 * EDITORIAL SEQUENCE on bone, reusing the Home approach pattern: a hairline rule
 * tops the list, each step is a row of mono index · serif title · grotesk blurb,
 * separated by drawn hairline rules. No medallions, no accent-tint pills, no
 * connecting-rail decoration — restraint as the point, to lower pre-visit anxiety.
 *
 * RTL-correct via logical props; rows stack to a single column on mobile.
 */
export function WhatToExpect({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Lead. */}
        <div className="max-w-[28ch]">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(expect.eyebrow, locale)}
          </p>
          <h2 className="mt-6 text-pretty font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(expect.headline, locale)}
            </InView>
          </h2>
        </div>

        {/* Sequence — hairline-topped editorial rows. */}
        <ol className="mt-14 border-t border-ink sm:mt-16">
          {expect.steps.map((step, i) => (
            <InView
              as="li"
              motion="fade-in-up"
              delay={i * 80}
              key={step.key}
              className="grid gap-x-10 gap-y-3 border-b border-border py-9 sm:grid-cols-[auto_minmax(0,1fr)] sm:py-10 lg:grid-cols-[6rem_minmax(0,22ch)_minmax(0,1fr)] lg:gap-x-12"
            >
              <span className="font-mono text-index tabular-nums leading-none text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-editorial text-display-md text-ink">
                {t(step.title, locale)}
              </h3>
              <p className="max-w-[52ch] text-body-lg text-slate-strong">
                {t(step.blurb, locale)}
              </p>
            </InView>
          ))}
        </ol>
      </div>
    </section>
  );
}
