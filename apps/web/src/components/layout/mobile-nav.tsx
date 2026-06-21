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
 * Mobile navigation: hamburger button that opens a full-screen paper overlay.
 * Links stagger-fade in (translateY + opacity). Closes on route change, Escape,
 * and backdrop. Locks body scroll while open. Hidden at lg+ (header shows the
 * inline nav there).
 *
 * The overlay is a modal dialog (`role="dialog"` + `aria-modal`): on open focus
 * moves to the first nav link, Tab is trapped to cycle within the overlay, and
 * on close focus is restored to the hamburger trigger so keyboard users never
 * land behind the backdrop.
 */
export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Escape to close + scroll lock while open.
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

  // Move focus into the overlay on open; restore it to the trigger on close.
  // `wasOpen` guards the restore so it never fires on initial mount (when the
  // overlay was never open) and only steals focus back after a real close.
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

  // Trap Tab within the overlay, cycling first↔last focusable element.
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
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t(open ? a11y.closeMenu : a11y.openMenu, locale)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          className="fixed inset-0 z-50 flex flex-col bg-paper/96 backdrop-blur-sm [animation:fade-in_250ms_ease-out]"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="text-body-base font-semibold text-ink">
              {t(brand.name, locale)}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t(a11y.closeMenu, locale)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                &times;
              </span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-4 pt-6" aria-label="Primary">
            {nav.map((item, i) => (
              <Link
                key={item.key}
                ref={i === 0 ? firstLinkRef : undefined}
                href={localeHref(locale, item.href)}
                onClick={close}
                style={{ "--index": i } as React.CSSProperties}
                className="rounded-md px-2 py-3 text-display-md font-medium text-ink [animation:stagger-in_200ms_var(--ease-premium)_both] [animation-delay:calc(var(--index)*60ms)] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-5">
            <LanguageToggle locale={locale} />
            <Link
              href={localeHref(locale, "/contact")}
              onClick={close}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-body-sm font-medium text-paper transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t(cta.book, locale)}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
