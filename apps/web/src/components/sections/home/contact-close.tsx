import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { contactCta } from "@/content/home";
import { contact } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { InView } from "@/components/ui/in-view";

/**
 * Contact / Appointment CTA section — ref #3 structure.
 *
 * Mist-50 tinted band (calm, not white noise). Two-column on desktop:
 *   Start: eyebrow + h2 + body text
 *   End: phone chip + primary CTA
 *
 * Phone renders dir="ltr" per spec. No form here — routes to /contact.
 * Discreet, premium, no generic medical blue.
 */
export function ContactClose({ locale }: { locale: Locale }) {
  return (
    <Section tone="tinted" id="contact-cta">
      <div className="grid items-center gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">

        {/* ── TEXT ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <InView as="div" motion="fade-in-up" delay={0}>
            <Eyebrow withRule>
              {t(contactCta.eyebrow, locale)}
            </Eyebrow>
          </InView>

          <InView as="h2" motion="fade-in-up" delay={70}
            className="max-w-[22ch] text-balance text-[length:var(--text-display-md)] font-semibold leading-[var(--text-display-md--line-height)] tracking-[var(--text-display-md--letter-spacing)] text-ink"
          >
            {t(contactCta.headline, locale)}
          </InView>

          <InView as="p" motion="fade-in-up" delay={130}
            className="max-w-[46ch] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-slate-strong"
          >
            {t(contactCta.body, locale)}
          </InView>
        </div>

        {/* ── ACTION STACK ──────────────────────────────────────────── */}
        <InView as="div" motion="fade-in-up" delay={180}
          className="flex flex-col gap-5 lg:items-end"
        >
          {/* Primary CTA */}
          <Button
            href={localeHref(locale, "/contact")}
            variant="primary"
            size="lg"
            withArrow
            className="w-full lg:w-auto"
          >
            {t(contactCta.primaryCta, locale)}
          </Button>

          {/* Phone chip */}
          <div className="flex flex-col gap-1.5 lg:items-end">
            <span className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-slate">
              {t(contactCta.callPrefix, locale)}
            </span>
            <a
              href={`tel:${contact.phone.replace(/-/g, "")}`}
              className="group/tel inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
              aria-label={t(
                { he: `חייגו ל-${contact.phone}`, en: `Call ${contact.phone}` },
                locale,
              )}
            >
              <Icon
                name="phone"
                aria-hidden
                className="h-4 w-4 text-mist transition-transform duration-200 group-hover/tel:scale-110"
              />
              <span className="font-mono text-[length:var(--text-body-base)] font-medium text-ink transition-colors duration-200 group-hover/tel:text-mist">
                <span dir="ltr">{contact.phone}</span>
              </span>
            </a>
          </div>

          {/* Address chip */}
          <address className="not-italic text-end text-[length:var(--text-body-sm)] leading-[var(--text-body-sm--line-height)] text-slate lg:text-end">
            {t(contact.address, locale)}
          </address>
        </InView>
      </div>
    </Section>
  );
}
