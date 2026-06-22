import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { services } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import type { IconName } from "@/components/ui/icons";

/**
 * Services grid — ref #3 structure.
 *
 * Eyebrow → h2 title + standfirst → 2×2 card grid → see-all link.
 * Each card: mist icon-circle + title (h3) + blurb + hover cue.
 * The grid is responsive: 1-col mobile, 2-col sm+, 4-col xl for future expansion.
 *
 * Uses ServiceCard which already owns the ref-#3 card pattern.
 */
export function ServicesIndex({ locale }: { locale: Locale }) {
  return (
    <Section tone="paper" id="services">
      {/* Section header */}
      <div className="flex flex-col gap-3">
        <InView as="div" motion="fade-in-up" delay={0}>
          <Eyebrow withRule>
            {t(services.eyebrow, locale)}
          </Eyebrow>
        </InView>
        <div className="mt-2 grid gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <InView as="h2" motion="fade-in-up" delay={60}
            className="max-w-[20ch] text-balance text-[length:var(--text-display-lg)] font-semibold leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)] text-ink"
          >
            {t(services.title, locale)}
          </InView>
          <InView as="p" motion="fade-in-up" delay={120}
            className="max-w-[46ch] text-[length:var(--text-body-base)] leading-[var(--text-body-base--line-height)] text-slate-strong"
          >
            {t(services.standfirst, locale)}
          </InView>
        </div>
      </div>

      {/* 2×2 card grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.cards.map((card, i) => (
          <InView key={card.key} as="div" motion="fade-in-up" delay={i * 70}>
            <ServiceCard
              href={localeHref(locale, card.anchor)}
              icon={card.icon as IconName}
              title={t(card.title, locale)}
              blurb={t(card.blurb, locale)}
              cue={t(
                { he: "קרא עוד", en: "Learn more" },
                locale,
              )}
              index={i}
            />
          </InView>
        ))}
      </div>

      {/* See-all CTA */}
      <InView as="div" motion="fade-in-up" delay={280}
        className="mt-10 flex justify-end"
      >
        <Button
          href={localeHref(locale, "/expertise")}
          variant="ghost"
          withArrow
        >
          {t(services.cta, locale)}
        </Button>
      </InView>
    </Section>
  );
}
