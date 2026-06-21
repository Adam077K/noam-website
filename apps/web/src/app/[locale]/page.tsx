import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { Hero } from "@/components/sections/home/hero";
import { CredentialsBar } from "@/components/sections/home/credentials-bar";
import { ServiceGrid } from "@/components/sections/home/service-grid";
import { VideoIntro } from "@/components/sections/home/video-intro";
import { TrustBand } from "@/components/sections/home/trust-band";
import { ContactCta } from "@/components/sections/shared/contact-cta";

const seo = {
  title: {
    he: 'ד"ר נועם קיטרי — אורולוג בכיר, רפואה מינית ותפקודית · תל אביב',
    en: "Dr. Noam Kitrey — Senior Urologist, Sexual & Functional Medicine · Tel Aviv",
  },
  description: {
    he: "מומחה מוביל בישראל לתפקוד מיני של הגבר ולאורולוגיה פונקציונלית. מנהל היחידה בשיבא. טיפול דיסקרטי במרפאה פרטית בתל אביב.",
    en: "Israel's leading specialist in male sexual function and functional urology. Head of Unit at Sheba. Discreet care at a private Tel Aviv clinic.",
  },
} as const;

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <Hero locale={locale} />
      <CredentialsBar locale={locale} />
      <ServiceGrid locale={locale} />
      <VideoIntro locale={locale} />
      <TrustBand locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
