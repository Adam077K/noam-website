import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { story } from "@/content/about";
import { InView } from "@/components/ui";

/**
 * Story / philosophy — editorial prose in the Home language (v2 "Quiet Authority").
 * An asymmetric masthead head (hairline-led eyebrow + display-serif framing line)
 * sits over a strict type column of founder-voice paragraphs. No blue-bordered
 * lede, no wash card: the first paragraph simply carries a touch more weight, and a
 * drawn hairline opens the prose. Single column and fully readable on mobile; each
 * paragraph fades up on a short stagger. RTL-correct via logical props.
 */
export function AboutStory({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Section head — label + a one-line framing statement, asymmetric. */}
        <div className="grid gap-x-16 gap-y-6 border-b border-ink pb-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(story.eyebrow, locale)}
          </p>
          <h2 className="max-w-[20ch] text-pretty font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(story.headline, locale)}
            </InView>
          </h2>
        </div>

        {/* The prose — a single editorial column, lede slightly heavier. */}
        <div className="mt-12 grid gap-x-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Drawn hairline opener occupies the start column on lg; quiet on mobile. */}
          <InView
            as="div"
            motion="rule-draw"
            className="hidden h-px w-28 bg-accent lg:mt-2 lg:block"
          />
          <div className="max-w-[58ch] space-y-7">
            {story.paragraphs.map((para, i) => (
              <InView
                key={i}
                as="p"
                motion="fade-in-up"
                delay={i * 80}
                className={
                  i === 0
                    ? "text-body-lg text-ink-80"
                    : "text-body-lg text-slate-strong"
                }
              >
                {t(para, locale)}
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
