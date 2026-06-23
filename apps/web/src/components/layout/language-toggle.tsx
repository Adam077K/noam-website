"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { swapLocaleInPath } from "@/i18n/routing";
import { a11y } from "@/content/site";
import { t } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * HE | EN pill pair. Active locale: ink fill (clear authority).
 * Inactive: stroke only, text-slate. Contrast ≥ 3:1 for both states.
 * The whole group has a mist-soft border container.
 */
export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t(a11y.switchLanguage, locale)}
      className="inline-flex items-center gap-0.5 rounded-[8px] border border-border bg-paper p-[2px]"
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
              "inline-flex h-[26px] min-w-[1.875rem] items-center justify-center rounded-[6px] px-2 text-[0.75rem] transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-1",
              isActive
                ? "bg-ink font-semibold text-paper"
                : "font-normal text-slate hover:text-ink",
            )}
          >
            {code === "he" ? "עב" : "EN"}
          </Link>
        );
      })}
    </div>
  );
}
