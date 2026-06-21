import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { trust } from "@/content/home";
import { Eyebrow, IconCircle, Reveal } from "@/components/ui";
import type { IconName } from "@/components/ui";

const PILLAR_ICONS: Record<string, IconName> = {
  discretion: "shield",
  personal: "user",
  authority: "compass",
};

/**
 * Dark "why me" band. The ink surface breaks the page rhythm and lends gravitas.
 * A lede statement of approach sits above three pillars (discretion / personal /
 * authority), each with an inverse icon circle. Accent text on ink uses the
 * lighter accent for AA contrast per ART-DIRECTION-V2.
 */
export function TrustBand({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-20 text-paper sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 start-[-6%] h-[360px] w-[360px] rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="inverse" withRule>
              {t(trust.eyebrow, locale)}
            </Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-balance text-display-lg text-paper">
              {t(trust.headline, locale)}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-body-lg text-paper/75">{t(trust.body, locale)}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {trust.pillars.map((pillar, i) => (
            <Reveal key={pillar.key} delay={i * 80}>
              <div className="flex flex-col gap-3 border-t border-accent-light/20 pt-6">
                <IconCircle name={PILLAR_ICONS[pillar.key] ?? "spark"} size="md" inverse />
                <h3 className="text-display-md font-semibold text-paper">
                  {t(pillar.title, locale)}
                </h3>
                <p className="text-body-sm text-paper/70">{t(pillar.blurb, locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
