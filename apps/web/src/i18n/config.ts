/**
 * i18n configuration. Hebrew is the canonical default (ART-DIRECTION-V2: RTL primary).
 */
export const locales = ["he", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "he";

/** Type guard for validating a route param before rendering. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Document direction per locale. */
export function dirForLocale(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}
