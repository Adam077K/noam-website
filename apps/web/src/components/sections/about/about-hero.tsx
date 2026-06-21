import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/about";
import { contactCta } from "@/content/home";
import { Button, Eyebrow, MediaSlot, Reveal } from "@/components/ui";

/**
 * About hero. The same asymmetric wash split as the Home hero so the page reads as
 * one design language: a personal-voice intro on the start side, a 4:5 in-context
 * portrait slot with a soft-blue blob on the end side. Ambient depth blobs float
 * behind, pointer-safe. Mobile leads with the portrait — the human hook before the
 * intro copy. Motion is a single staggered fade-up, reduced-motion safe.
 */
export function AboutHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-wash">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 end-[-10%] -z-0 h-[480px] w-[480px] rounded-full bg-wash-deep/70 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] start-[-8%] -z-0 h-[360px] w-[360px] rounded-full bg-accent-tint/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          {/* Portrait — first in DOM so it leads on mobile; reordered to the end on lg. */}
          <Reveal className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md" delay={120}>
            <MediaSlot
              ratio="4/5"
              slot="about-hero-portrait"
              alt={t(hero.portraitAlt, locale)}
              caption={t(hero.portraitCaption, locale)}
            />
          </Reveal>

          {/* Copy block. */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow withRule>{t(hero.eyebrow, locale)}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 max-w-xl text-balance text-display-xl text-ink">
                {t(hero.headline, locale)}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-body-lg text-slate-strong">
                {t(hero.intro, locale)}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8">
                <Button
                  href={localeHref(locale, "/contact")}
                  size="lg"
                  variant="primary"
                  withArrow
                  arrowInCircle
                  className="[--focus-offset:theme(colors.wash)]"
                >
                  {t(contactCta.primaryCta, locale)}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
