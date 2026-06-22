import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { location, MAP_QUERY } from "@/content/clinic";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * The Dateline — location article (v5, map strategy update).
 *
 * PAGE DIRECTIVE: Replace Google Maps live iframe (brand violation / blank-spinner
 * risk) with a static monochrome/warm map placeholder + styled 'Get directions'
 * link. Interactive map, if ever added, must be lazy-loaded behind a tap.
 *
 * Current strategy: the warm editorial placeholder is always shown. The placeholder
 * is a hairline-framed field of the page's bone tone with a faint cartographic
 * grid, a hairline location pin, and the plain-text address. The whole surface is
 * an anchor → Google Maps directions. No iframe, no blank spinner.
 *
 * The address column (start side) is the dominant information layer; the map plate
 * (end side) is the visual editorial anchor. `lg:grid-cols-[0.82fr_1.18fr]` keeps
 * the address column readable at the same weight as the plate.
 *
 * RTL-correct via logical props; the address/numbers render dir="ltr".
 */
export function LocationMap({ locale }: { locale: Locale }) {
  const query = encodeURIComponent(MAP_QUERY);
  const mapTitle = t(location.mapTitle, locale);
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="bg-canvas px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="02"
          title={{ he: "המען", en: "The Dateline" }}
          locale={locale}
        />

        {/* Section headline + standfirst preamble */}
        <div className="mt-8 grid gap-x-16 gap-y-5 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="max-w-[14ch] text-balance font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(location.headline, locale)}
            </InView>
          </h2>
          <InView
            as="p"
            motion="fade-in-up"
            delay={120}
            className="max-w-[48ch] text-body-base text-slate-strong"
          >
            {t(location.standfirst, locale)}
          </InView>
        </div>

        <div className="mt-12 grid gap-x-16 gap-y-10 sm:mt-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">

          {/* ── ADDRESS COLUMN ─────────────────────────────────────────────── */}
          <InView as="div" motion="fade-in-up" className="border-t border-ink pt-7">
            <dl className="flex flex-col gap-8">
              {/* Full address */}
              <div>
                <dt className="flex items-center gap-2.5 text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow">
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] text-accent">01</span>
                  {t(location.addressLabel, locale)}
                </dt>
                <dd
                  className="mt-3 max-w-[26ch] font-editorial text-display-md leading-snug text-ink"
                  dir="ltr"
                >
                  {t(location.address, locale)}
                </dd>
              </div>

              {/* Parking / transit placeholder */}
              <div className="border-t border-border pt-6">
                <dt className="flex items-center gap-2.5 text-caption uppercase tracking-[0.2em] text-slate-strong eyebrow">
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] text-accent">02</span>
                  {t(location.parkingLabel, locale)}
                </dt>
                <dd className="mt-3 max-w-[40ch] text-body-base text-slate-strong">
                  {t(location.parkingNote, locale)}
                </dd>
              </div>
            </dl>

            {/* Directions CTA */}
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/dir mt-8 inline-flex items-center gap-3 self-start border-b border-ink pb-1.5 text-body-base font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
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

          {/* ── MAP PLATE ──────────────────────────────────────────────────── */}
          {/*
            Static warm editorial placeholder — a faint cartographic grid on bone
            with a hairline pin. Never an iframe, never a blank spinner.
            The entire surface is a tap target → Google Maps directions.
            Hairline mat frame + accent tick, matching the clinic plate motif.
          */}
          <InView as="figure" motion="fade-in-up" delay={120} className="relative">
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 hidden border border-ink/20 sm:block"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 -start-2.5 hidden h-12 w-px bg-accent sm:block"
              />
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={mapTitle}
                className="group/map relative flex min-h-[22rem] flex-col items-center justify-center overflow-hidden border border-ink/20 bg-paper transition-colors duration-300 hover:border-ink/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:min-h-[26rem]"
              >
                {/*
                  Faint cartographic grid — horizontal + vertical lines that evoke a
                  map surface without importing an external service.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]"
                />
                {/*
                  Diagonal street-line suggestion — a single drawn rule at ~30deg,
                  evoking a boulevard without being literal.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(145deg,var(--color-ink-divider)_0,var(--color-ink-divider)_1px,transparent_0,transparent_50%)] [background-size:120px_120px]"
                />
                {/*
                  Warm base tint — a faint canvas tone over the grid so it reads as
                  a "place" rather than a pure geometric pattern.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-canvas/40"
                />

                {/* Location pin — hairline drawn, not a filled medallion */}
                <span className="relative z-10 flex h-14 w-14 flex-col items-center">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-paper/80 shadow-[0_0_0_4px_var(--color-accent-tint)]"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {/* Pin tail */}
                  <span aria-hidden className="mt-0.5 h-4 w-px bg-accent/60" />
                </span>

                {/* Directions label */}
                <p className="relative z-10 mt-5 inline-flex items-center gap-2.5 border-b border-ink pb-1 text-body-sm font-medium text-ink transition-colors group-hover/map:border-accent group-hover/map:text-accent">
                  {t(location.directionsCta, locale)}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/map:translate-x-0.5 rtl:rotate-180 rtl:group-hover/map:-translate-x-0.5"
                  >
                    &#8594;
                  </span>
                </p>

                {/* Plain-text address below the CTA — dir="ltr" for digit ordering */}
                <p
                  className="relative z-10 mt-3 max-w-[28ch] px-8 text-center text-caption text-slate-strong"
                  dir="ltr"
                >
                  Ayal Specialist Clinics · Recital Tower<br />
                  156 Menachem Begin Rd, Tel Aviv, Floor 17
                </p>
              </a>
            </div>
            {/* Clean plate caption */}
            <figcaption className="mt-4 overflow-visible pb-1 font-editorial text-body-sm normal-case tracking-normal text-ink">
              {t(location.mapCaption, locale)}
            </figcaption>
          </InView>
        </div>
      </div>
    </section>
  );
}
