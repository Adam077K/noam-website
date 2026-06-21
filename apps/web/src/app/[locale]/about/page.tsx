import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { seo } from "@/content/about";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutStory } from "@/components/sections/about/about-story";
import { AboutCredentials } from "@/components/sections/about/about-credentials";
import { AboutQuote } from "@/components/sections/about/about-quote";
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <AboutHero locale={locale} />
      <AboutStory locale={locale} />
      <AboutCredentials locale={locale} />
      <AboutQuote locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
