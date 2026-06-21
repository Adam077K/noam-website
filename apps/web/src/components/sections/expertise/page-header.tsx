import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { expertiseHeader } from "@/content/expertise";
import { Eyebrow, Reveal } from "@/components/ui";

/**
 * Areas of Care page header. Paper hero (no portrait, per ART-DIRECTION §E):
 * eyebrow → H1 → one intro paragraph on a generous start-aligned rail, set against
 * a single restrained ambient blob so the dense catalogue below opens onto calm
 * rather than a wall of cards. A single staggered fade-up, reduced-motion safe.
 */
export function ExpertiseHeader({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-paper px-4 sm:px-6 lg:px-8">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-28 end-[-8%] h-[420px] w-[420px] rounded-full bg-wash/70 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow withRule>{t(expertiseHeader.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 text-balance text-display-xl text-ink">
              {t(expertiseHeader.title, locale)}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-body-lg text-slate-strong">
              {t(expertiseHeader.intro, locale)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
