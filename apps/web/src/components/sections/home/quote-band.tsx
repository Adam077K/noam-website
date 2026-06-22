import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { video } from "@/content/home";
import { InView } from "@/components/ui/in-view";

/**
 * Pull-quote epigraph — dark ink band.
 *
 * Full-bleed ink background with a large pull-quote in paper.
 * Affiliations listed below in a quiet hairline row.
 * Generous whitespace. Single centred column, max 32ch.
 *
 * RTL: logical padding; quote glyph placed at inline-start.
 * dir="ltr" never needed here — all content is multilingual text.
 */
export function QuoteBand({ locale }: { locale: Locale }) {
  const affiliations = [
    { he: "מרכז שיבא", en: "Sheba Medical Center" },
    { he: "EAU", en: "EAU" },
    { he: "SHSQ", en: "SHSQ" },
    { he: 'היל"ם · ESSM', en: "HILAM · ESSM" },
  ];

  return (
    <section
      className="relative overflow-hidden bg-ink px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(4rem,8vw,7rem)]"
      aria-label={t({ he: "ציטוט", en: "Quote" }, locale)}
    >
      {/* Soft mist ambient glow — decorative */}
      <span
        aria-hidden
        className="pointer-events-none absolute -start-16 top-1/2 -z-0 h-[320px] w-[320px] -translate-y-1/2 bg-mist/10 blur-[80px]"
        style={{ borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <figure>
          {/* Decorative open-quote glyph */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 -start-1 select-none text-[6rem] leading-[0.7] text-mist-light/20 sm:-top-10 sm:text-[9rem]"
          >
            &#8220;
          </span>

          <blockquote className="relative">
            <InView as="p" motion="fade-in-up" delay={0}
              className="max-w-[32ch] text-[clamp(1.125rem,3.2vw,2.5rem)] font-semibold leading-[1.2] text-paper"
            >
              {t(video.quote, locale)}
            </InView>

            <figcaption className="mt-10 flex items-center gap-4">
              <InView as="span" motion="rule-draw" delay={300}
                className="h-px w-12 bg-mist-light"
              />
              <cite className="not-italic text-[length:var(--text-body-sm)] text-ink-10">
                {t(video.quoteAttribution, locale)}
              </cite>
            </figcaption>
          </blockquote>
        </figure>

        {/* Affiliations belt */}
        <div className="mt-14 border-t border-paper/15 pt-7">
          <p className="mb-4 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-paper/45">
            {t({ he: "שיוכים", en: "Affiliations" }, locale)}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {affiliations.map((inst, i) => (
              <li key={i} className="flex items-center gap-x-5">
                {i > 0 && (
                  <span aria-hidden className="h-px w-4 bg-paper/25" />
                )}
                <span className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-paper/65">
                  {t(inst, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
