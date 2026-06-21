import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { seo } from "@/content/clinic";
import { AtmosphereHero } from "@/components/sections/clinic/atmosphere-hero";
import { LocationMap } from "@/components/sections/clinic/location-map";
import { WhatToExpect } from "@/components/sections/clinic/what-to-expect";
import { ContactClose } from "@/components/sections/home/contact-close";

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
      <ContactClose locale={locale} />
    </>
  );
}
