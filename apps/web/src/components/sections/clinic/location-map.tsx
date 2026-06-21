import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { location, MAP_QUERY } from "@/content/clinic";
import { InView } from "@/components/ui";

/**
 * Location + map — editorial conversion (v2 "Quiet Authority").
 *
 * The address is a refined typographic lockup (mono index · eyebrow label · serif
 * line) on bone, set start-side as a hairline-ruled ledger — no card, no shadow,
 * no icon circle. The map sits end-side inside a single hairline frame.
 *
 * Map strategy — graceful degradation, never a broken embed:
 *  · NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY set → official Maps Embed iframe (lazy, a11y title).
 *  · No key → a warm, editorial placeholder (bone field + faint cartographic grid +
 *    hairline pin) whose whole surface links to Google Maps directions, so the
 *    panel is always useful.
 *
 * RTL-correct via logical props; the address renders dir="ltr" for street-number
 * + floor ordering.
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
    <section className="bg-canvas px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Lead. */}
        <div className="max-w-[26ch]">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(location.eyebrow, locale)}
          </p>
          <h2 className="mt-6 text-pretty font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(location.headline, locale)}
            </InView>
          </h2>
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-12 sm:mt-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          {/* Address — a typographic lockup on a hairline ledger. */}
          <InView as="div" motion="fade-in-up" className="border-t border-ink pt-8">
            <dl className="flex flex-col gap-9">
              <div>
                <dt className="flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-slate eyebrow">
                  <span className="font-mono text-[0.65rem] text-accent">01</span>
                  {t(location.addressLabel, locale)}
                </dt>
                <dd className="mt-3 max-w-[30ch] font-editorial text-display-md leading-snug text-ink" dir="ltr">
                  {t(location.address, locale)}
                </dd>
              </div>

              <div className="border-t border-border pt-7">
                <dt className="flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-slate eyebrow">
                  <span className="font-mono text-[0.65rem] text-accent">02</span>
                  {t(location.parkingLabel, locale)}
                </dt>
                <dd className="mt-3 max-w-[40ch] text-body-base text-slate-strong">
                  {t(location.parkingNote, locale)}
                </dd>
              </div>
            </dl>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/dir mt-9 inline-flex items-center gap-3 self-start border-b border-ink pb-1.5 text-body-base font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              {t(location.directionsCta, locale)}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/dir:translate-x-1 rtl:rotate-180 rtl:group-hover/dir:-translate-x-1"
              >
                &#8594;
              </span>
            </a>
          </InView>

          {/* Map — official embed when keyed, warm editorial placeholder otherwise.
              A single hairline frame, no card, no shadow, no radius. */}
          <InView as="div" motion="fade-in-up" delay={120}>
            <div className="relative">
              {/* Hairline mat — matches the hero interior frame. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 hidden border border-border sm:block"
              />
              {embedSrc ? (
                <div className="relative h-full min-h-[22rem] overflow-hidden border border-border bg-paper">
                  <iframe
                    title={mapTitle}
                    src={embedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full min-h-[22rem] w-full border-0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={mapTitle}
                  className="group/map relative flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden border border-border bg-paper transition-colors duration-300 hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  {/* Faint cartographic grid so the field reads as a map surface. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px]"
                  />
                  {/* Hairline pin — drawn, not a filled medallion. */}
                  <span className="relative flex h-12 w-12 items-center justify-center">
                    <span aria-hidden className="absolute inset-0 rounded-full border border-accent" />
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="relative mt-6 inline-flex items-center gap-2.5 border-b border-ink pb-1 text-body-sm font-medium text-ink transition-colors group-hover/map:border-accent group-hover/map:text-accent">
                    {t(location.directionsCta, locale)}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/map:translate-x-0.5 rtl:rotate-180 rtl:group-hover/map:-translate-x-0.5"
                    >
                      &#8594;
                    </span>
                  </p>
                  <p className="relative mt-3 max-w-[30ch] px-6 text-center text-caption text-slate" dir="ltr">
                    {t(location.address, locale)}
                  </p>
                </a>
              )}
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
