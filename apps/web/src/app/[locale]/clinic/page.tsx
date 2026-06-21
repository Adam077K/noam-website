import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { seo } from "@/content/clinic";
import { AtmosphereHero } from "@/components/sections/clinic/atmosphere-hero";
import { LocationMap } from "@/components/sections/clinic/location-map";
import { WhatToExpect } from "@/components/sections/clinic/what-to-expect";
import { ContactCta } from "@/components/sections/shared/contact-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(seo.title, locale),
    description: t(seo.description, locale),
  };
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
      <ContactCta locale={locale} />
    </>
  );
}
