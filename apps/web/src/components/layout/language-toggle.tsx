"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { swapLocaleInPath } from "@/i18n/routing";
import { a11y } from "@/content/site";
import { t } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * HE | EN pill pair. Each option is a real <Link> to the same path under the
 * other locale, so navigation preserves the route and updates html[lang]/[dir]
 * via the locale layout. Active locale is ink/600, inactive slate/400.
 */
export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t(a11y.switchLanguage, locale)}
      className="inline-flex items-center rounded-pill border border-border p-0.5"
    >
      {locales.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            href={swapLocaleInPath(pathname, code)}
            lang={code}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-pill px-3 text-body-sm transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-surface font-semibold text-ink"
                : "font-normal text-slate hover:text-ink",
            )}
          >
            {code === "he" ? "ע" : "EN"}
          </Link>
        );
      })}
    </div>
  );
}
