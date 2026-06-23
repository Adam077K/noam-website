export type Locale = 'he' | 'en';

export const LOCALES: Locale[] = ['he', 'en'];
export const DEFAULT_LOCALE: Locale = 'he';

export const dir = (locale: Locale): 'rtl' | 'ltr' => (locale === 'he' ? 'rtl' : 'ltr');

/** Path to the same page in the other locale (home only for now). */
export const altLocalePath = (locale: Locale): string => (locale === 'he' ? '/en' : '/he');

/** Locale-prefixed href helper for in-site anchors/links. */
export const localizeHref = (locale: Locale, path: string): string => {
  if (path.startsWith('#') || path.startsWith('tel:') || path.startsWith('mailto:') || path.startsWith('http')) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean === '/' ? '' : clean}`;
};
