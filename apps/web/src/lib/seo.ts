import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

/**
 * Shared metadata helpers — keep title/description/OG/canonical/hreflang
 * consistent across every page's `generateMetadata`. A single source for the
 * `metadataBase` and the alternates map so no page hand-rolls its own hreflang.
 *
 * `metadataBase` reads `NEXT_PUBLIC_SITE_URL` (set per environment) and falls
 * back to the production origin so absolute OG/canonical URLs resolve even
 * before the env var is wired. OG image is intentionally omitted for now — a
 * static default is a fast-follow; the text fields ship today.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://drkitrey.com";

export const metadataBase = new URL(SITE_URL);

const SITE_NAME: Record<Locale, string> = {
  he: 'ד"ר נעם כתרי',
  en: "Dr. Noam Kitrey",
};

/** OG `locale` tag per app locale (BCP-47-ish region forms search engines expect). */
const OG_LOCALE: Record<Locale, string> = {
  he: "he_IL",
  en: "en_US",
};

/**
 * Build the `alternates` block for a page: a self-canonical (locale-prefixed)
 * plus the hreflang `languages` map pointing each locale at its own URL.
 * `path` is the locale-less route ("" for home, "/about", …).
 */
export function localizedAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `/${l}${path}`]),
  ) as Record<Locale, string>;
  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}

/**
 * Compose a page's full `Metadata`: title + description, a self-canonical with
 * hreflang alternates, and an `openGraph` block (website type, localized title/
 * description/locale, site name). Pages call this from `generateMetadata`.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME[locale],
      title,
      description,
      locale: OG_LOCALE[locale],
      url: `/${locale}${path}`,
    },
  };
}
