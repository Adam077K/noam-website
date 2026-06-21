import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { Button, Eyebrow, MediaSlot, Reveal, Icon } from "@/components/ui";

/**
 * Award-grade hero. Asymmetric two-column split on a soft cool-blue wash: text on
 * the start side, a 3:4 portrait slot with a soft-blue blob on the end side. A
 * restrained ambient blob drifts behind the text; a credential micro-row anchors
 * trust above the fold. Mobile stacks portrait-first (the visual hook before the
 * dense credential copy). Motion: a single staggered fade-up, reduced-motion safe.
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-wash">
      {/* Ambient soft-blue light, fixed depth — pointer-safe, never on a scroll layer. */}
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
              ratio="3/4"
              slot="hero-portrait"
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
                {t(hero.subhead, locale)}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  href={localeHref(locale, "/contact")}
                  size="lg"
                  variant="primary"
                  withArrow
                  arrowInCircle
                  className="[--focus-offset:theme(colors.wash)]"
                >
                  {t(hero.primaryCta, locale)}
                </Button>
                <Button
                  href={localeHref(locale, "/about")}
                  variant="ghost"
                  size="lg"
                  withArrow
                  className="[--focus-offset:theme(colors.wash)]"
                >
                  {t(hero.secondaryCta, locale)}
                </Button>
              </div>
            </Reveal>

            {/* Credential micro-row — three quiet authority chips. */}
            <Reveal delay={240}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/70 pt-6 text-body-sm text-slate">
                {hero.microRow.map((item, i) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    <Icon
                      name="shieldCheck"
                      aria-hidden
                      className="h-4 w-4 text-accent"
                    />
                    {t(item, locale)}
                  </li>
                ))}
                <li className="inline-flex items-center gap-2">
                  <Icon name="phone" aria-hidden className="h-4 w-4 text-accent" />
                  <a
                    href={`tel:${contact.phone.replace(/-/g, "")}`}
                    className="font-mono text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-wash"
                  >
                    <span dir="ltr">{contact.phone}</span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
