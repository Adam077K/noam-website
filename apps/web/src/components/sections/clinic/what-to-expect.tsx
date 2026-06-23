import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expect } from "@/content/clinic";
import { InView } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { IconCircle } from "@/components/ui/icon-circle";
import type { IconName } from "@/components/ui/icons";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * What to Expect — ref-#3 service-card grid style.
 *
 * Four visit steps rendered as rounded surface cards (Card, interactive hover)
 * with a mist icon-circle, step title (h3), and calm blurb. Follows ref-#3
 * exactly: icon circle top → title → blurb, on a tinted canvas background.
 *
 * Grid: 1 col (mobile) → 2 col (sm) → 4 col (lg) — symmetric cards, equal height.
 * Section eyebrow + headline + standfirst above the grid.
 *
 * Icons: mapped to step keys. Uses the icon system in ui/icons.tsx.
 * RTL-correct: logical props throughout; no italics in Hebrew.
 */

/* Step icon mapping — each visit phase has a semantically matching icon */
const STEP_ICONS: Record<string, IconName> = {
  "first-contact":       "phone",
  "first-consultation":  "user",
  "treatment-plan":      "shieldCheck",
  "ongoing-care":        "pulse",
};

/* Step index ordinal labels — always LTR, monospace, accent-tinted */
const STEP_ORDINALS = ["01", "02", "03", "04"];

export function WhatToExpect({ locale }: { locale: Locale }) {
  return (
    <section className="bg-mist-50 px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto w-full max-w-[1200px]">

        <SectionHead
          folio="03"
          title={{ he: "מהלך הביקור", en: "The Visit" }}
          locale={locale}
        />

        {/* Section headline + standfirst preamble */}
        <div className="mt-10 grid gap-x-16 gap-y-5 sm:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="font-editorial text-ink text-balance max-w-[18ch] [font-size:clamp(1.75rem,2.5vw,2.25rem)] [line-height:1.15] [letter-spacing:-0.012em]">
            <InView as="span" className="block">
              {t(expect.headline, locale)}
            </InView>
          </h2>
          <InView
            as="p"
            motion="fade-in-up"
            delay={100}
            className="max-w-[48ch] text-[1rem] leading-relaxed text-slate-strong"
          >
            {t(expect.standfirst, locale)}
          </InView>
        </div>

        {/*
          Card grid — ref-#3 style: rounded cards with icon circles.
          1 col mobile, 2 col sm, 4 col lg. Equal height per row (h-full on Card).
          gap follows 8px grid: gap-5 (40px) at lg.
        */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {expect.steps.map((step, i) => (
            <InView
              key={step.key}
              motion="fade-in-up"
              delay={i * 70}
            >
              <Card interactive className="flex h-full flex-col gap-5 p-6 sm:p-7">
                {/* Icon circle — mist-tinted, semantic icon for each step */}
                <div className="flex items-center justify-between">
                  <IconCircle
                    name={STEP_ICONS[step.key] ?? "compass"}
                    size="lg"
                  />
                  {/* Ordinal — monospace, accent, decorative */}
                  <span
                    aria-hidden
                    className="font-mono text-[0.65rem] tracking-[0.12em] text-mist"
                    dir="ltr"
                  >
                    {STEP_ORDINALS[i]}
                  </span>
                </div>

                {/* Step title (h3) + blurb */}
                <div className="flex flex-1 flex-col gap-2.5">
                  <h3 className="text-[1.125rem] font-semibold leading-snug tracking-tight text-ink">
                    {t(step.title, locale)}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-slate">
                    {t(step.blurb, locale)}
                  </p>
                </div>
              </Card>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
