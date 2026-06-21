import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { location, MAP_QUERY } from "@/content/clinic";
import { Eyebrow, Icon, IconCircle, Reveal } from "@/components/ui";

/**
 * Location + map. A two-column split: an address card (address rendered dir="ltr"
 * for correct number/floor ordering, plus a discreet parking/transit note) beside
 * an embedded Google Map.
 *
 * Map strategy — graceful degradation, never a broken embed:
 *  · If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is set, render the official Maps Embed
 *    iframe (lazy-loaded, a11y title).
 *  · If no key, render a *composed* on-brand map placeholder (wash field, soft-blue
 *    pin medallion) whose entire surface links to Google Maps directions for the
 *    address — so the panel is always useful, with or without a key.
 */
export function LocationMap({ locale }: { locale: Locale }) {
  const embedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const query = encodeURIComponent(MAP_QUERY);
  const mapTitle = t(location.mapTitle, locale);
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedSrc = embedKey
    ? `https://www.google.com/maps/embed/v1/place?key=${embedKey}&q=${query}`
    : null;

  return (
    <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow withRule>{t(location.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-balance text-display-lg text-ink">
              {t(location.headline, locale)}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Address card. */}
          <Reveal>
            <div className="flex h-full flex-col gap-7 rounded-2xl border border-border bg-surface p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <IconCircle name="compass" size="md" />
                <div className="min-w-0">
                  <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate eyebrow">
                    {t(location.addressLabel, locale)}
                  </p>
                  <p className="mt-2 text-body-base text-ink" dir="ltr">
                    {t(location.address, locale)}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate eyebrow">
                  {t(location.parkingLabel, locale)}
                </p>
                <p className="mt-2 text-body-sm text-slate">
                  {t(location.parkingNote, locale)}
                </p>
              </div>

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group/dir mt-auto inline-flex items-center gap-2 text-body-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <span>{t(location.directionsCta, locale)}</span>
                <Icon
                  name="arrow"
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 rtl:rotate-180 group-hover/dir:translate-x-0.5 rtl:group-hover/dir:-translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>

          {/* Map — official embed when keyed, composed directions placeholder otherwise. */}
          <Reveal delay={80}>
            {embedSrc ? (
              <div className="h-full min-h-[20rem] overflow-hidden rounded-2xl border border-border shadow-card">
                <iframe
                  title={mapTitle}
                  src={embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[20rem] w-full border-0"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={mapTitle}
                className="group/map relative flex h-full min-h-[20rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-wash via-surface to-wash-deep shadow-card transition-shadow duration-200 ease-premium hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {/* Faint cartographic grid so the field reads as a map surface, not a blank box. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(20,99,230,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,230,0.06)_1px,transparent_1px)] [background-size:44px_44px]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 end-[-8%] h-44 w-44 rounded-full bg-accent-tint/50 blur-3xl"
                />

                {/* Soft-blue pin medallion. */}
                <span className="relative flex h-16 w-16 items-center justify-center rounded-pill bg-paper/85 shadow-card ring-1 ring-accent-soft/60 backdrop-blur-[1px] transition-transform duration-200 ease-premium group-hover/map:scale-105">
                  <Icon name="compass" aria-hidden className="h-7 w-7 text-accent" />
                </span>

                <p className="relative mt-5 inline-flex items-center gap-2 text-body-sm font-medium text-accent">
                  <span>{t(location.directionsCta, locale)}</span>
                  <Icon
                    name="arrow"
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 rtl:rotate-180 group-hover/map:translate-x-0.5 rtl:group-hover/map:-translate-x-0.5"
                  />
                </p>
                <p className="relative mt-2 max-w-xs px-4 text-center text-caption text-slate" dir="ltr">
                  {t(location.address, locale)}
                </p>
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
