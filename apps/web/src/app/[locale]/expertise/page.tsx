import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { expertiseGroups, expertiseSeo } from "@/content/expertise";
import { ExpertiseHeader } from "@/components/sections/expertise/page-header";
import { ExpertiseGroup } from "@/components/sections/expertise/expertise-group";
import { ContactCta } from "@/components/sections/shared/contact-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/expertise",
    title: t(expertiseSeo.title, locale),
    description: t(expertiseSeo.description, locale),
  });
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <ExpertiseHeader locale={locale} />
      {expertiseGroups.map((group, i) => (
        <ExpertiseGroup
          key={group.anchor}
          group={group}
          locale={locale}
          tinted={i % 2 === 1}
        />
      ))}
      <ContactCta locale={locale} />
    </>
  );
}
