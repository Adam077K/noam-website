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
 * Sticky header. Logo on the start side, RTL-aware inline nav (lg+), language
 * toggle, and the primary accent CTA on the end side. A hairline bottom border
 * fades in after 40px of scroll. Below lg the inline nav collapses to MobileNav.
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
        "sticky top-0 z-40 border-b bg-paper/92 backdrop-blur-sm transition-colors duration-200",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link
          href={localeHref(locale, "")}
          className="shrink-0 text-body-base font-semibold text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {t(brand.name, locale)}
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.key}
              href={localeHref(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-body-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive(item.href) ? "font-medium text-accent" : "text-ink",
              )}
            >
              {t(item.label, locale)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageToggle locale={locale} />
          </div>
          <Link
            href={localeHref(locale, "/contact")}
            className="hidden h-10 items-center justify-center rounded-lg bg-accent px-5 text-body-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex"
          >
            {t(cta.book, locale)}
          </Link>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
