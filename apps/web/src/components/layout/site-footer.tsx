import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { brand, nav, contact, footer } from "@/content/site";
import { t } from "@/content/types";

/**
 * Footer — ink background, ref-#3 minimal style.
 * Three columns on desktop (brand · nav · contact) stacking on mobile.
 * Phone/email/address always render dir="ltr" so digits never reorder in RTL.
 * Nav links hover to mist (the only accent).
 * Max-width 1200px, inline padding follows the container rail.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">

          {/* Brand column */}
          <div className="space-y-3">
            <p className="text-[1.25rem] font-semibold leading-tight tracking-tight text-paper">
              {t(brand.name, locale)}
            </p>
            <p className="text-[0.875rem] leading-relaxed text-paper/55">
              {t(brand.role, locale)}
            </p>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <h2 className="eyebrow mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
              {t(footer.navHeading, locale)}
            </h2>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localeHref(locale, item.href)}
                    className="text-[0.875rem] text-paper/70 transition-colors duration-200 hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h2 className="eyebrow mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
              {t(footer.contactHeading, locale)}
            </h2>
            <dl className="space-y-3 text-[0.875rem]">
              <div>
                <dt className="sr-only">{t(footer.phoneLabel, locale)}</dt>
                <dd>
                  <a
                    href={`tel:${contact.phone.replace(/-/g, "")}`}
                    className="font-mono text-paper/70 transition-colors duration-200 hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
                    className="text-paper/70 transition-colors duration-200 hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <span dir="ltr">{contact.email}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{t(footer.addressLabel, locale)}</dt>
                <dd className="text-paper/55">{t(contact.address, locale)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 border-t border-paper/10 pt-6">
          <p className="text-[0.8125rem] text-paper/35">
            &copy; {year} {t(brand.name, locale)}. {t(footer.rights, locale)}.
          </p>
        </div>
      </div>
    </footer>
  );
}
