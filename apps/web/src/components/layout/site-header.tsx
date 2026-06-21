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
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[76px] lg:px-8">
        <Link
          href={localeHref(locale, "")}
          className="shrink-0 font-editorial text-[1.15rem] leading-none text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:text-[1.35rem]"
        >
          {t(brand.name, locale)}
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.key}
              href={localeHref(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group/nav relative py-2 text-body-sm transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                isActive(item.href) ? "text-ink" : "text-slate",
              )}
            >
              {t(item.label, locale)}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-px origin-[var(--ul,left)] bg-accent transition-transform duration-300 ease-premium rtl:[--ul:right]",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden lg:block">
            <LanguageToggle locale={locale} />
          </div>
          <Link
            href={localeHref(locale, "/contact")}
            className="group/cta hidden items-center gap-2 border-b border-ink pb-1 text-body-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper lg:inline-flex"
          >
            {t(cta.consult, locale)}
            <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5 rtl:rotate-180 rtl:group-hover/cta:-translate-x-0.5">
              &#8594;
            </span>
          </Link>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
