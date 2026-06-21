import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { brand, nav, contact, footer } from "@/content/site";
import { t } from "@/content/types";

/**
 * Dark (ink) footer. Three columns on desktop — brand, navigation, contact —
 * stacking on mobile. Phone and email render inside <span dir="ltr"> so digits
 * and the address never reorder under RTL.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <p className="text-display-md font-semibold text-paper">
              {t(brand.name, locale)}
            </p>
            <p className="max-w-xs text-body-sm text-slate-60">
              {t(brand.role, locale)}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="eyebrow mb-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate-60">
              {t(footer.navHeading, locale)}
            </h2>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localeHref(locale, item.href)}
                    className="text-body-sm text-paper/80 transition-colors hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow mb-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate-60">
              {t(footer.contactHeading, locale)}
            </h2>
            <dl className="space-y-3 text-body-sm">
              <div>
                <dt className="sr-only">{t(footer.phoneLabel, locale)}</dt>
                <dd>
                  <a
                    href={`tel:${contact.phone.replace(/-/g, "")}`}
                    className="font-mono text-paper/80 transition-colors hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <span dir="ltr">{contact.phone}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{t(footer.emailLabel, locale)}</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-paper/80 transition-colors hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <span dir="ltr">{contact.email}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{t(footer.addressLabel, locale)}</dt>
                <dd className="text-paper/80">{t(contact.address, locale)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-80 pt-6">
          <p className="text-body-sm text-slate-60">
            &copy; {year} {t(brand.name, locale)}. {t(footer.rights, locale)}.
          </p>
        </div>
      </div>
    </footer>
  );
}
