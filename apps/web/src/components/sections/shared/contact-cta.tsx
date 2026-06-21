import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { contactCta } from "@/content/home";
import { contact } from "@/content/site";
import { Button, Eyebrow, Reveal, Icon } from "@/components/ui";

/**
 * Shared contact close, reused at the foot of Home / About / Expertise / Clinic.
 * Centred on paper, framed by a subtle wash card so it reads as a deliberate
 * conversion moment rather than a flat strip: eyebrow + H2 + one discreet line,
 * the primary accent CTA, and a click-to-call fallback (phone stays LTR).
 */
export function ContactCta({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <Reveal className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-border-accent bg-wash px-6 py-12 text-center sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 start-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent-tint/60 blur-3xl"
          />
          <div className="relative flex flex-col items-center">
            <Eyebrow withRule>{t(contactCta.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-balance text-display-lg text-ink">
              {t(contactCta.headline, locale)}
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-slate">
              {t(contactCta.body, locale)}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href={localeHref(locale, "/contact")}
                size="lg"
                variant="primary"
                withArrow
                arrowInCircle
              >
                {t(contactCta.primaryCta, locale)}
              </Button>
              <p className="inline-flex items-center gap-2 text-body-sm text-slate">
                <Icon name="phone" aria-hidden className="h-4 w-4 text-accent" />
                <span>{t(contactCta.callPrefix, locale)}</span>
                <a
                  href={`tel:${contact.phone.replace(/-/g, "")}`}
                  className="font-mono font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span dir="ltr">{contact.phone}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
