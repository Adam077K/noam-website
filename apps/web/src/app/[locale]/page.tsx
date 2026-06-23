import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/hero";
import { Credentials } from "@/components/sections/home/credentials";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { Approach } from "@/components/sections/home/approach";
import { QuoteBand } from "@/components/sections/home/quote-band";
import { ContactClose } from "@/components/sections/home/contact-close";

const seo = {
  title: {
    he: 'ד"ר נעם כתרי — אורולוג בכיר, רפואה מינית ותפקודית · תל אביב',
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
  return pageMetadata({
    locale,
    path: "",
    title: t(seo.title, locale),
    description: t(seo.description, locale),
  });
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
    <main id="main-content">
      {/* (1) Hero — display headline + portrait + CTAs */}
      <Hero locale={locale} />

      {/* (2) Trust / Stats belt — 4 credential facts */}
      <Credentials locale={locale} />

      {/* (3) Services grid — 2×2 rounded cards */}
      <ServicesIndex locale={locale} />

      {/* (4) Authority band — clinic photo + approach text */}
      <Approach locale={locale} />

      {/* (5) Pull-quote — dark ink epigraph band */}
      <QuoteBand locale={locale} />

      {/* (6) Contact CTA — phone + book appointment */}
      <ContactClose locale={locale} />
    </main>
  );
}
