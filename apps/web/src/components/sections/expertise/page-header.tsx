import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expertiseHeader } from "@/content/expertise";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { InView } from "@/components/ui/in-view";

/**
 * Expertise page header — ref-#3 clinic-minimal structure.
 *
 * Clean two-column grid on desktop (eyebrow + display H1 | deck paragraph).
 * No journal/TOC structure here — the groups below carry the content.
 * First screen must be complete and structured at 1440×820 and 390×844.
 *
 * RTL-correct: logical CSS props only. No italics in Hebrew.
 * WCAG 2.2 AA: single h1 per page, focus-visible everywhere.
 */
export function ExpertiseHeader({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  return (
    <Section tone="canvas" className="border-b border-ink/10">
      <div className="grid gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">

        {/* ── START: eyebrow + H1 ── */}
        <div className="flex flex-col gap-4">
          <InView as="div" motion="fade-in-up" delay={0}>
            <Eyebrow withRule tone="default">
              {t(expertiseHeader.eyebrow, locale)}
            </Eyebrow>
          </InView>

          <InView as="div" motion="fade-in-up" delay={60}>
            <h1
              id="expertise-page-h1"
              className="max-w-[20ch] text-balance font-semibold text-ink [font-size:clamp(2.25rem,3.5vw,3rem)] [letter-spacing:-0.018em] [line-height:1.1]"
            >
              {t(expertiseHeader.title, locale)}
            </h1>
          </InView>
        </div>

        {/* ── END: deck / standfirst ── */}
        <InView
          as="p"
          motion="fade-in-up"
          delay={130}
          className="max-w-[52ch] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-slate-strong lg:pb-1"
        >
          {t(expertiseHeader.intro, locale)}
        </InView>
      </div>

      {/* Anchor count strip — factual metadata, not marketing. */}
      <InView
        as="div"
        motion="fade-in-up"
        delay={200}
        className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6"
      >
        <span className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-slate eyebrow">
          {isHe
            ? "שלושה תחומי מומחיות · 12 מצבים קליניים"
            : "Three areas of expertise · 12 clinical conditions"}
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-ink/10"
        />
        <span className="text-[length:var(--text-caption)] font-mono tracking-[0.08em] text-slate-60" dir="ltr">
          p. 01
        </span>
      </InView>
    </Section>
  );
}
