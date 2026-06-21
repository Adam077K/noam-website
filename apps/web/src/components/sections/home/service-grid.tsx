import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { services } from "@/content/home";
import { Button, Eyebrow, Reveal, ServiceCard } from "@/components/ui";
import type { IconName } from "@/components/ui";

/**
 * Service overview. A two-column grid (deliberately calmer than three) of teaser
 * cards, each linking to its anchor on the Areas of Care page. The section heading
 * leads with the positioning line; a ghost CTA closes to the full list. Cards fade
 * in on an 80ms stagger.
 */
export function ServiceGrid({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow withRule>{t(services.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-balance text-display-lg text-ink">
              {t(services.title, locale)}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-body-lg text-slate">{t(services.intro, locale)}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {services.cards.map((card, i) => (
            <Reveal key={card.key} delay={i * 80}>
              <ServiceCard
                href={localeHref(locale, card.anchor)}
                icon={card.icon as IconName}
                title={t(card.title, locale)}
                blurb={t(card.blurb, locale)}
                cue={t(services.cta, locale)}
                index={i}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <Button href={localeHref(locale, "/expertise")} variant="ghost" size="lg" withArrow>
            {t(services.cta, locale)}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
