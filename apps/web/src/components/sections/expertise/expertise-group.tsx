import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import {
  type ExpertiseGroup as ExpertiseGroupData,
  expertiseCtaHref,
} from "@/content/expertise";
import { Button, Eyebrow, Icon, Reveal } from "@/components/ui";
import { Section } from "@/components/ui";
import { ConditionCard } from "./condition-card";

/**
 * One Areas-of-Care group: a calm header (eyebrow + H2 + intro, with a discreet
 * reassurance line for the core groups) over a responsive condition grid, closed
 * by a quiet group micro-CTA. The grid stays two-up (never three) so dense copy
 * keeps breathing room; cards cascade in on an 80ms stagger. `tinted` lets the
 * caller alternate surfaces between groups for the page's overall rhythm.
 */
export function ExpertiseGroup({
  group,
  locale,
  tinted = false,
}: {
  group: ExpertiseGroupData;
  locale: Locale;
  tinted?: boolean;
}) {
  return (
    <Section id={group.anchor} tone={tinted ? "tinted" : "paper"} className="scroll-mt-20">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow withRule>{t(group.eyebrow, locale)}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-balance text-display-lg text-ink">
            {t(group.title, locale)}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 text-body-lg text-slate">{t(group.intro, locale)}</p>
        </Reveal>
        {group.reassurance && (
          <Reveal delay={180}>
            <p className="mt-5 inline-flex items-start gap-2.5 text-body-sm font-medium text-slate-strong">
              <Icon
                name="shieldCheck"
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              />
              {t(group.reassurance, locale)}
            </p>
          </Reveal>
        )}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {group.conditions.map((condition, i) => (
          <Reveal key={condition.anchor} delay={i * 80}>
            <ConditionCard condition={condition} locale={locale} />
          </Reveal>
        ))}
      </div>

      {group.microCta && (
        <Reveal delay={120} className="mt-10">
          <Button
            href={localeHref(locale, expertiseCtaHref)}
            variant="ghost"
            size="lg"
            withArrow
          >
            {t(group.microCta, locale)}
          </Button>
        </Reveal>
      )}
    </Section>
  );
}
