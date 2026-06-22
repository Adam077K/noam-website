"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { nav, cta, a11y, brand } from "@/content/site";
import { t } from "@/content/types";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";

/**
 * Mobile navigation — hamburger opens a full-screen paper overlay.
 * Links stagger-fade in. Closes on route change, Escape, backdrop tap.
 * Body scroll locked while open. Full a11y: focus trap + restore.
 * Primary CTA: mist pill, ink text. Hidden at lg+ where inline nav shows.
 */
export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  const onOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger — 44px min touch target */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t(open ? a11y.closeMenu : a11y.openMenu, locale)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
      >
        <span className="sr-only">
          {t(open ? a11y.closeMenu : a11y.openMenu, locale)}
        </span>
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-0.5 rounded-full bg-ink transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              open && "top-1/2 -translate-y-1/2 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-ink transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-ink transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              open && "bottom-1/2 translate-y-1/2 -rotate-45",
            )}
          />
        </span>
      </button>

      {open && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t(brand.name, locale)}
          onKeyDown={onOverlayKeyDown}
          className="fixed inset-0 z-50 flex flex-col bg-paper/97 backdrop-blur-sm [animation:fade-in_220ms_ease-out]"
        >
          {/* Header row with close button */}
          <div className="flex h-16 items-center justify-between border-b border-border px-[clamp(1.25rem,4vw,2.5rem)]">
            <span className="text-[1rem] font-semibold text-ink">
              {t(brand.name, locale)}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t(a11y.closeMenu, locale)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-mist-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
            >
              <span aria-hidden="true" className="text-2xl leading-none">&times;</span>
            </button>
          </div>

          {/* Nav links — stagger-fade in */}
          <nav
            className="flex flex-1 flex-col gap-1 px-[clamp(1.25rem,4vw,2.5rem)] pt-8"
            aria-label="Primary"
          >
            {nav.map((item, i) => (
              <Link
                key={item.key}
                ref={i === 0 ? firstLinkRef : undefined}
                href={localeHref(locale, item.href)}
                onClick={close}
                style={{ "--index": i } as React.CSSProperties}
                className="rounded-lg px-2 py-3 text-[1.375rem] font-semibold leading-snug tracking-tight text-ink [animation:stagger-in_200ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:calc(var(--index)*55ms)] hover:text-ink-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          {/* Footer with lang toggle + CTA */}
          <div className="flex items-center justify-between gap-4 border-t border-border px-[clamp(1.25rem,4vw,2.5rem)] py-5">
            <LanguageToggle locale={locale} />
            <Link
              href={localeHref(locale, "/contact")}
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full bg-mist px-6 text-[0.875rem] font-semibold text-ink transition-colors hover:bg-mist-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
            >
              {t(cta.consult, locale)}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
