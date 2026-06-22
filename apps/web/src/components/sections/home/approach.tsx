import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { trust } from "@/content/home";
import { InView } from "@/components/ui";
import { SectionHead } from "./journal";

/**
 * The approach — a journal MARGIN-NOTE article (v4 "The Journal").
 *
 * The lead statement runs as the primary column body text (editorial serif lead-in
 * + grotesk body), while the three pillars are set as numbered MARGINALIA in the
 * narrow side column — annotations to the main argument, like a scholar's notes.
 * Distinct from the contents TOC and the hero: this is the "reading" moment.
 *
 * RTL-correct: logical props place the margin on the end side; on mobile it
 * collapses and the notes flow inline beneath the lead.
 */
export function Approach({ locale }: { locale: Locale }) {
  return (
    <section className="bg-canvas px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="02"
          title={{ he: "הגישה", en: "The Approach" }}
          locale={locale}
        />

        <div className="mt-10 grid gap-x-16 gap-y-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          {/* PRIMARY — a serif drop-headline leading into the body argument. */}
          <div className="max-w-[60ch]">
            <h2 className="text-pretty font-editorial text-display-lg text-ink">
              <InView as="span" className="block">
                {t(trust.headline, locale)}
              </InView>
            </h2>
            <InView as="p" motion="fade-in-up" delay={120} className="mt-8 text-body-lg leading-relaxed text-ink-80">
              {t(trust.body, locale)}
            </InView>
          </div>

          {/* MARGIN — the three pillars as numbered marginal annotations. */}
          <aside className="lg:pt-2">
            <p className="mb-6 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
              {t({ he: "הערות שוליים", en: "Notes" }, locale)}
            </p>
            <ol className="space-y-7">
              {trust.pillars.map((pillar, i) => (
                <InView
                  as="li"
                  motion="fade-in-up"
                  delay={i * 90}
                  key={pillar.key}
                  className="border-t border-ink/15 pt-4"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-caption text-accent">
                      <span dir="ltr">{`0${i + 1}`}</span>
                    </span>
                    <h3 className="font-editorial text-display-md leading-tight text-ink">
                      {t(pillar.title, locale)}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-body-sm leading-relaxed text-slate-strong">
                    {t(pillar.blurb, locale)}
                  </p>
                </InView>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
