import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { contactCta } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";

/**
 * Editorial contact close (v2 "Quiet Authority"). No pale-blue panel: an
 * asymmetric closing spread on bone — an oversized serif invitation start-side, a
 * hairline-led action stack end-side. One drawn blue rule separates the masthead
 * from the page above it. Phone renders dir="ltr"; the underline draws on hover.
 */
export function ContactClose({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 pb-28 pt-8 sm:px-6 sm:pb-32 lg:px-8 lg:pb-40">
      <div className="mx-auto w-full max-w-[1240px]">
        <InView
          as="div"
          motion="rule-draw"
          className="h-px w-full bg-ink"
        />

        <div className="grid gap-x-16 gap-y-12 pt-16 sm:pt-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {t(contactCta.eyebrow, locale)}
            </p>
            <h2 className="mt-6 max-w-[16ch] text-balance font-editorial text-display-xl text-ink">
              <InView as="span" className="block">
                {t(contactCta.headline, locale)}
              </InView>
            </h2>
            <p className="mt-6 max-w-[44ch] text-body-lg text-slate-strong">
              {t(contactCta.body, locale)}
            </p>
          </div>

          {/* Action stack — editorial, end-aligned, hairline-underlined. */}
          <InView as="div" motion="fade-in-up" delay={140} className="flex flex-col gap-6 lg:items-end">
            <a
              href={localeHref(locale, "/contact")}
              className="group/cta inline-flex items-center gap-3 self-start border-b border-ink pb-2 text-display-md font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-paper lg:self-end"
            >
              {t(contactCta.primaryCta, locale)}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/cta:translate-x-1.5 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1.5"
              >
                &#8594;
              </span>
            </a>

            <div className="flex flex-col gap-1.5 text-body-sm text-slate lg:items-end">
              <span className="text-caption uppercase tracking-[0.18em] text-slate eyebrow">
                {t(contactCta.callPrefix, locale)}
              </span>
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="font-mono text-body-base text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span dir="ltr">{contact.phone}</span>
              </a>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
