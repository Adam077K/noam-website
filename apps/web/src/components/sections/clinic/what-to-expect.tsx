import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expect } from "@/content/clinic";
import { InView } from "@/components/ui";
import { Folio, SectionHead } from "@/components/sections/home/journal";

/**
 * The Itinerary — a journal NUMBERED ITINERARY (v4 "The Journal", field-note cut).
 *
 * The four-step visit reads as a numbered itinerary: a contents-style preamble
 * (headline + standfirst), then four hairline-ruled stages, each anchored by an
 * oversized folio numeral (01–04) sitting like a chapter mark beside a serif step
 * title and a grotesk blurb. No medallions, no accent-tint pills, no connecting
 * rail — restraint as the point, to lower pre-visit anxiety.
 *
 * RTL-correct via logical props; rows stack to a single column on mobile.
 */
export function WhatToExpect({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="03"
          title={{ he: "מהלך הביקור", en: "The Itinerary" }}
          locale={locale}
        />

        {/* Itinerary preamble — headline + calm field-note standfirst. */}
        <div className="mt-10 grid gap-x-16 gap-y-6 sm:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="max-w-[16ch] text-balance font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(expect.headline, locale)}
            </InView>
          </h2>
          <InView as="p" motion="fade-in-up" delay={120} className="max-w-[48ch] text-body-base text-slate-strong">
            {t(expect.standfirst, locale)}
          </InView>
        </div>

        {/* The itinerary — hairline-topped numbered stages. */}
        <ol className="mt-14 border-t border-ink/20 sm:mt-16">
          {expect.steps.map((step, i) => (
            <li key={step.key} className="border-b border-ink/12">
              <InView
                as="div"
                motion="fade-in-up"
                delay={i * 80}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-5 py-9 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-10 sm:py-11 lg:grid-cols-[6rem_minmax(0,24ch)_minmax(0,1fr)] lg:gap-x-12"
              >
                {/* Oversized folio anchor — the itinerary stage mark. */}
                <Folio
                  n={String(i + 1).padStart(2, "0")}
                  tone="accent"
                  className="text-[2rem] leading-none sm:text-[3rem] lg:text-[3.5rem]"
                />
                <h3 className="font-editorial text-display-md leading-tight text-ink">
                  {t(step.title, locale)}
                </h3>
                <p className="col-span-2 mt-3 max-w-[52ch] text-body-lg text-slate-strong sm:col-span-1 sm:mt-0 lg:col-auto">
                  {t(step.blurb, locale)}
                </p>
              </InView>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
