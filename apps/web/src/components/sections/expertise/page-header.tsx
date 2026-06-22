import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { brand } from "@/content/site";
import { expertiseHeader } from "@/content/expertise";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Areas of Care masthead — the opening spread of a journal CONTENTS issue
 * (v4 "The Journal"). It reuses Home's locked vocabulary so the page reads as
 * the same publication: a running-head masthead (volume line + clinical record),
 * then a folio'd SectionHead, an oversized editorial-serif standfirst H1, and one
 * intro paragraph on a generous rail — closed by a single drawn ink rule that
 * opens the contents below.
 *
 * Dialed down from Home: no "Fig."/page-number affectation, no marquee. RTL-correct
 * via logical props; the volume line + masthead render with the writing direction.
 */
export function ExpertiseHeader({ locale }: { locale: Locale }) {
  return (
    <>
      {/* Running-head masthead — the journal volume line + clinical-record line. */}
      <div className="border-b border-ink/15 bg-paper">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="text-caption uppercase tracking-[0.2em] text-slate eyebrow">
            {t(expertiseHeader.folio, locale)}
          </p>
          <p className="hidden text-caption uppercase tracking-[0.2em] text-slate-60 eyebrow sm:block">
            {t(brand.masthead, locale)}
          </p>
        </div>
      </div>

      <section className="bg-paper px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            folio="—"
            title={expertiseHeader.sectionLabel}
            locale={locale}
          />

          {/* Standfirst spread — serif H1 on a wide rail, intro alongside. */}
          <div className="mt-10 grid gap-x-16 gap-y-6 sm:mt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="max-w-[20ch] text-balance font-editorial text-display-xl text-ink">
              <InView as="span" className="block">
                {t(expertiseHeader.title, locale)}
              </InView>
            </h1>
            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="max-w-[52ch] text-body-lg text-slate-strong"
            >
              {t(expertiseHeader.intro, locale)}
            </InView>
          </div>

          <InView
            as="div"
            motion="rule-draw"
            className="mt-14 h-px w-full bg-ink sm:mt-16"
          />
        </div>
      </section>
    </>
  );
}
