import { locales, type Locale } from "./config";

/** Build a locale-prefixed href. `path` is the locale-less route ("" | "/about"). */
export function localeHref(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

/**
 * Swap the locale of an already-localized pathname, preserving the rest of the
 * path. `/he/about` + `en` → `/en/about`. Used by the language toggle.
 */
export function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash); segments[1] is the current locale.
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname}`;
}
