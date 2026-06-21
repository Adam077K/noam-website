import type { Locale } from "@/i18n/config";
import type { PageShell as PageShellContent } from "@/content/pages";
import { t } from "@/content/types";

/**
 * Minimal Phase-1 page body: eyebrow + H1 + lede on a soft wash hero.
 * Real Phase 2 sections replace this; the locale plumbing and chrome stay.
 */
export function PageShell({
  locale,
  content,
}: {
  locale: Locale;
  content: PageShellContent;
}) {
  return (
    <section className="bg-wash px-4 py-24 sm:px-6 md:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate">
          {t(content.eyebrow, locale)}
        </p>
        <h1 className="mt-3 text-display-xl text-ink">{t(content.title, locale)}</h1>
        <p className="mt-6 max-w-2xl text-body-lg text-slate">
          {t(content.lede, locale)}
        </p>
      </div>
    </section>
  );
}
