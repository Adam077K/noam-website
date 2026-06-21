import type { Locale } from "@/i18n/config";

/**
 * A bilingual string. Every user-facing string in the content layer is authored
 * as `{ he, en }` so pages stay locale-agnostic — they call `t(value, locale)`.
 */
export type LocalizedString = {
  he: string;
  en: string;
};

/** Resolve a localized string for the active locale. */
export function t(value: LocalizedString, locale: Locale): string {
  return value[locale];
}
