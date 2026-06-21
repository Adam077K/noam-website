import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { heebo, inter, geistMono } from "@/lib/fonts";
import { dirForLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { brand, a11y } from "@/content/site";
import { t } from "@/content/types";
import { metadataBase } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  // Root locale metadata. Pages set their own absolute title + canonical/OG via
  // `pageMetadata`; here we only anchor `metadataBase` so all absolute URLs
  // (canonical, OG) resolve, and provide a sensible site-wide default.
  return {
    metadataBase,
    title: t(brand.name, locale),
    description: t(brand.role, locale),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  const dir = dirForLocale(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${heebo.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50"
        >
          {t(a11y.skipToContent, locale)}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
