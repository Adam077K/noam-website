import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { location, MAP_QUERY } from "@/content/clinic";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";
import { IconCircle } from "@/components/ui/icon-circle";

/**
 * Location section — clinic address + map placeholder.
 *
 * PAGE DIRECTIVE: No Google Maps live iframe (brand violation / blank-spinner risk).
 * Static warm editorial placeholder: faint cartographic grid + location pin.
 * The entire map surface is a tap target → Google Maps directions.
 *
 * Layout (LG+): [address column: 0.85fr] [map plate: 1.15fr]
 * Mobile: stack, address first then map plate.
 *
 * Address column: icon + label rows for address and parking/transit.
 * Map plate: mist-tinted cartographic placeholder, directions CTA.
 *
 * RTL-correct via logical props. dir="ltr" on digits and address strings.
 * [FOUNDER-REVIEW]: Parking note is a placeholder — founder to supply specifics.
 */
export function LocationMap({ locale }: { locale: Locale }) {
  const query = encodeURIComponent(MAP_QUERY);
  const mapTitle = t(location.mapTitle, locale);
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="bg-paper px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto w-full max-w-[1200px]">

        <SectionHead
          folio="02"
          title={{ he: "מיקום", en: "Location" }}
          locale={locale}
        />

        {/* Section headline + standfirst */}
        <div className="mt-10 grid gap-x-16 gap-y-5 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="font-editorial text-ink text-balance max-w-[14ch] [font-size:clamp(1.75rem,2.5vw,2.25rem)] [line-height:1.15] [letter-spacing:-0.012em]">
            <InView as="span" className="block">
              {t(location.headline, locale)}
            </InView>
          </h2>
          <InView
            as="p"
            motion="fade-in-up"
            delay={100}
            className="max-w-[48ch] text-[1rem] leading-relaxed text-slate-strong"
          >
            {t(location.standfirst, locale)}
          </InView>
        </div>

        {/* Two-column: address info + map plate */}
        <div className="mt-12 grid gap-x-14 gap-y-10 sm:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">

          {/* ── ADDRESS COLUMN ─────────────────────────────────────────────── */}
          <InView as="div" motion="fade-in-up" className="flex flex-col justify-between gap-8">
            <dl className="flex flex-col gap-7">

              {/* Full address */}
              <div className="flex gap-4">
                <IconCircle name="mapPin" size="md" className="mt-0.5 shrink-0" />
                <div>
                  <dt className="eyebrow text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-strong">
                    {t(location.addressLabel, locale)}
                  </dt>
                  <dd
                    className="mt-2 text-[1rem] leading-relaxed text-ink"
                    dir="ltr"
                  >
                    {t(location.address, locale)}
                  </dd>
                </div>
              </div>

              {/* Parking / transit — [FOUNDER-REVIEW] */}
              <div className="flex gap-4">
                <IconCircle name="compass" size="md" className="mt-0.5 shrink-0" />
                <div>
                  <dt className="eyebrow text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-strong">
                    {t(location.parkingLabel, locale)}
                  </dt>
                  <dd className="mt-2 max-w-[38ch] text-[1rem] leading-relaxed text-slate">
                    {t(location.parkingNote, locale)}
                  </dd>
                </div>
              </div>
            </dl>

            {/* Directions CTA */}
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/dir mt-2 inline-flex items-center gap-2.5 self-start border-b border-ink pb-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:border-mist hover:text-mist-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              {t(location.directionsCta, locale)}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/dir:translate-x-0.5 rtl:rotate-180 rtl:group-hover/dir:-translate-x-0.5"
              >
                &#8594;
              </span>
            </a>
          </InView>

          {/* ── MAP PLATE ──────────────────────────────────────────────────── */}
          {/*
            Static editorial placeholder — faint cartographic grid on mist-tinted
            paper, with a hairline pin at centre. Never an iframe. Never blank.
            Entire surface is a tap target → Google Maps directions.
            Double-bezel treatment: outer mat frame + inner rounded content area.
          */}
          <InView as="figure" motion="fade-in-up" delay={100} className="relative">
            <div className="relative">
              {/* Outer mat hairline */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 hidden border border-ink/12 sm:block"
              />
              {/* Accent tick — bottom-start corner, matches hero motif */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2.5 hidden h-12 w-px bg-mist sm:block"
                style={{ insetInlineStart: "-10px" }}
              />

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={mapTitle}
                className="group/map relative flex min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-[20px] border border-ink/15 bg-paper transition-[border-color,background-color] duration-300 hover:border-mist/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:min-h-[26rem]"
              >
                {/*
                  Cartographic grid — horizontal + vertical hairlines at 52px grid
                  evoking a map surface without importing an external service.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]"
                />
                {/*
                  Diagonal street-line — a single drawn rule evoking Menachem Begin Rd
                  without literal representation.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-15 [background-image:repeating-linear-gradient(148deg,var(--color-ink-divider)_0,var(--color-ink-divider)_1px,transparent_0,transparent_50%)] [background-size:120px_120px]"
                />
                {/* Mist wash over the grid — reads as a "place", not pure geometry */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-mist-50/60"
                />

                {/* Location pin — mist-ringed, not a filled medallion */}
                <span className="relative z-10 flex flex-col items-center">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-mist bg-paper shadow-[0_0_0_6px_var(--color-mist-tint)] transition-transform duration-200 group-hover/map:scale-105"
                  >
                    <span aria-hidden className="h-2 w-2 rounded-full bg-mist" />
                  </span>
                  {/* Pin tail */}
                  <span aria-hidden className="mt-0.5 h-5 w-px bg-mist/60" />
                </span>

                {/* Directions label */}
                <p className="relative z-10 mt-5 inline-flex items-center gap-2.5 border-b border-ink pb-1 text-[0.9375rem] font-medium text-ink transition-colors group-hover/map:border-mist group-hover/map:text-mist-hover">
                  {t(location.directionsCta, locale)}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/map:translate-x-0.5 rtl:rotate-180 rtl:group-hover/map:-translate-x-0.5"
                  >
                    &#8594;
                  </span>
                </p>

                {/* Plain-text address below CTA — dir="ltr" for digit ordering */}
                <p
                  className="relative z-10 mt-3 max-w-[28ch] px-8 text-center text-[0.8125rem] text-slate"
                  dir="ltr"
                >
                  Ayal Specialist Clinics · Recital Tower<br />
                  156 Menachem Begin Rd, Tel Aviv, Floor 17
                </p>
              </a>
            </div>

            {/* Map plate caption */}
            <figcaption className="mt-4 pb-1 text-[0.875rem] normal-case tracking-normal text-ink-80">
              {t(location.mapCaption, locale)}
            </figcaption>
          </InView>
        </div>
      </div>
    </section>
  );
}
