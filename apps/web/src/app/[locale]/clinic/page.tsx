import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { seo } from "@/content/clinic";
import { contact } from "@/content/site";
import { AtmosphereHero } from "@/components/sections/clinic/atmosphere-hero";
import { LocationMap } from "@/components/sections/clinic/location-map";
import { WhatToExpect } from "@/components/sections/clinic/what-to-expect";
import { InView } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/clinic",
    title: t(seo.title, locale),
    description: t(seo.description, locale),
  });
}

export default async function ClinicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <AtmosphereHero locale={locale} />
      <LocationMap locale={locale} />
      <WhatToExpect locale={locale} />

      {/*
        Clinic-page CTA close — distinct from the shared ContactClose component.
        PAGE DIRECTIVE: primary button dominant (full-width mobile, strong fill,
        min-h 48px), phone number tertiary/lighter below it.
        Discretion guarantee both languages (non-negotiable constraint).
      */}
      <ClinicCta locale={locale} />
    </>
  );
}

/** Clinic-specific closing CTA with correct mobile button hierarchy. */
function ClinicCta({ locale }: { locale: Locale }) {
  const isHe = locale === "he";

  const headline = {
    he: "כשאתם מוכנים, אנחנו כאן.",
    en: "When you are ready, we are here.",
  };
  const body = {
    he: "כל פנייה נשמרת בסודיות מלאה. אין צורך להסביר דבר בטרם הפגישה.",
    en: "Every enquiry is kept in full confidence. No explanation is needed before the appointment.",
  };
  const primaryLabel = {
    he: "לבקשת ייעוץ",
    en: "Request a Consultation",
  };
  const callLabel = {
    he: "חייגו",
    en: "Call",
  };

  return (
    <section className="bg-paper px-4 pb-24 pt-8 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Full-width hairline rule drawn in */}
        <InView as="div" motion="rule-draw" className="h-px w-full bg-ink" />

        <div className="grid gap-x-16 gap-y-10 pt-14 sm:pt-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          {/* Invitation copy */}
          <div>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate-strong eyebrow">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {isHe ? "הפנייה" : "Enquiries"}
            </p>
            <h2 className="mt-5 max-w-[18ch] text-balance font-editorial text-display-xl text-ink">
              <InView as="span" className="block">
                {t(headline, locale)}
              </InView>
            </h2>
            <InView
              as="p"
              motion="fade-in-up"
              delay={80}
              className="mt-5 max-w-[44ch] text-body-lg text-slate-strong"
            >
              {t(body, locale)}
            </InView>
          </div>

          {/* Action stack — PAGE DIRECTIVE hierarchy */}
          <InView as="div" motion="fade-in-up" delay={140} className="flex flex-col gap-5 lg:items-end">
            {/*
              PRIMARY CTA — filled button, full-width on mobile, auto on lg.
              min-h-[48px] per directive; bg-ink fills on default, bg-accent on hover.
            */}
            <a
              href={localeHref(locale, "/contact")}
              className="group/cta inline-flex min-h-[48px] w-full items-center justify-center gap-3 bg-ink px-8 text-body-base font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper lg:w-auto lg:justify-start"
            >
              {t(primaryLabel, locale)}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
              >
                &#8594;
              </span>
            </a>

            {/*
              TERTIARY — phone number, lighter weight, below the primary button.
              dir="ltr" on the digit string per RTL isolation rule.
            */}
            <div className="flex flex-col gap-1 lg:items-end">
              <span className="text-caption uppercase tracking-[0.18em] text-slate eyebrow">
                {t(callLabel, locale)}
              </span>
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="font-mono text-body-sm text-slate-strong transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span dir="ltr">{contact.phone}</span>
              </a>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
