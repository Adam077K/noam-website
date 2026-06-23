"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { nav, cta, brand } from "@/content/site";
import { t } from "@/content/types";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

/**
 * Sticky header — ref-#3 minimal style.
 * Wordmark (start) · nav (center/end) · lang toggle + pill CTA (end).
 * Primary CTA: pill shape, mist fill, ink text (calm, not generic medical-blue).
 * Active nav link: filled ink pill indicator under the text.
 * Hardens border + shadow after 40px scroll.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const full = localeHref(locale, href);
    return href === "" ? pathname === full : pathname.startsWith(full);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm transition-[border-color,box-shadow] duration-200",
        scrolled
          ? "border-border shadow-[0_1px_12px_rgba(32,42,44,0.06)]"
          : "border-border/50",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-[clamp(1.25rem,4vw,2.5rem)] lg:h-[84px]">

        {/* Wordmark — clean sans, no serif */}
        <Link
          href={localeHref(locale, "")}
          className="group/brand shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
        >
          <span className="block text-[1.125rem] font-semibold leading-none tracking-tight text-ink transition-colors group-hover/brand:text-ink-80 sm:text-[1.25rem]">
            {t(brand.name, locale)}
          </span>
          <span className="mt-1 hidden text-[0.6875rem] uppercase tracking-[0.12em] text-slate eyebrow lg:block">
            {t({ he: "אורולוגיה תפקודית · רפואה מינית", en: "Functional Urology · Sexual Medicine" }, locale)}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={localeHref(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group/nav relative py-2 text-[0.875rem] transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2",
                isActive(item.href) ? "font-semibold text-ink" : "font-normal text-slate",
              )}
            >
              {t(item.label, locale)}
              {/* Animated underline indicator — mist color */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-[2px] origin-[var(--ul,left)] rounded-full bg-mist transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rtl:[--ul:right]",
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover/nav:scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageToggle locale={locale} />
          </div>

          {/* Primary CTA — mist pill, ink text, min-height 48px */}
          <Link
            href={localeHref(locale, "/contact")}
            className="hidden h-11 items-center justify-center rounded-xl bg-mist px-5 text-[0.875rem] font-semibold text-ink transition-colors duration-200 hover:bg-mist-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 lg:inline-flex"
          >
            {t(cta.consult, locale)}
          </Link>

          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
