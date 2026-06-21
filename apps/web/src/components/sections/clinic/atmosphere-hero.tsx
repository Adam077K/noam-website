import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { atmosphere } from "@/content/clinic";
import { Eyebrow, MediaSlot, Reveal } from "@/components/ui";

/**
 * Clinic atmosphere hero. Asymmetric two-column split on a soft cool-blue wash —
 * a calm, anxiety-reducing intro on the start side, a 4:5 in-context clinic photo
 * slot with a soft-blue blob on the end side. The copy deliberately lowers the
 * temperature ("we'll make this the easy part") so the page reads reassuring, not
 * clinical. Ambient blobs sit on a fixed depth layer (pointer-safe). Mobile stacks
 * photo-first as the visual hook. Motion: a single staggered fade-up, reduced-motion safe.
 */
export function AtmosphereHero({ locale }: { locale: Locale }) {
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
          {/* Photo — first in DOM so it leads on mobile; reordered to the end on lg. */}
          <Reveal className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md" delay={120}>
            <MediaSlot
              ratio="4/5"
              slot="clinic-interior"
              alt={t(atmosphere.photoAlt, locale)}
              caption={t(atmosphere.photoCaption, locale)}
            />
          </Reveal>

          {/* Copy block. */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow withRule>{t(atmosphere.eyebrow, locale)}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 max-w-xl text-balance text-display-xl text-ink">
                {t(atmosphere.headline, locale)}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-body-lg text-slate-strong">
                {t(atmosphere.body, locale)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
