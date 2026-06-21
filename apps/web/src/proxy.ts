import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Locale routing: every page lives under /{locale}. Requests that lack a known
 * locale prefix are redirected into the canonical default (he), preserving the
 * rest of the path. `/` → `/he`, `/about` → `/he/about`.
 */
function hasLocalePrefix(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and any path with a file extension (static assets).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
