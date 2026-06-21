import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { t } from "@/content/types";
import { hero } from "@/content/home";
import { contact } from "@/content/site";
import { InView } from "@/components/ui";

/**
 * Masthead hero — a pure typographic statement (v2 "Quiet Authority").
 *
 * No image, no wash panel, no chips. Near-full-viewport bone paper carrying a
 * massive editorial serif headline that mask-reveals line-by-line, one precise
 * positioning line, a single discreet primary action, and the credentials as a
 * fine hairline-separated masthead lockup — accreditations on a journal masthead,
 * not trust badges. A single blue signature hairline draws across on entry.
 *
 * Asymmetric: copy is pinned to the start edge with a deliberate end-side void.
 * RTL-correct (logical props, mirrored rule origin); phone renders dir="ltr".
 */
export function Hero({ locale }: { locale: Locale }) {
  // The masthead lockup — fine type, hairline-separated, like accreditations.
  const masthead = [
    { he: "המרכז הרפואי שיבא", en: "Sheba Medical Center" },
    { he: 'יו"ר ועדת ההנחיות EAU', en: "EAU Guidelines Chair" },
    { he: "מנהל SHSQ", en: "SHSQ Director" },
    { he: 'בוגר רפואה, אונ׳ ת"א', en: "MD, Tel Aviv University" },
  ];

  return (
    <section className="relative flex min-h-[88vh] flex-col justify-center overflow-x-clip bg-paper px-4 pb-16 pt-12 sm:px-6 sm:pb-20 lg:min-h-[92vh] lg:px-8 lg:pt-16">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Eyebrow — small grotesk counterpoint to the big serif below. */}
        <InView as="p" motion="fade-in-up" className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          {t(hero.eyebrow, locale)}
        </InView>

        {/* The masthead headline — editorial serif at dramatic scale, mask-revealed. */}
        <h1 className="mt-7 max-w-[20ch] text-pretty font-editorial text-masthead text-ink sm:mt-9 sm:max-w-[16ch]">
          <InView as="span" className="block" delay={60}>
            {t(hero.headline, locale)}
          </InView>
        </h1>

        {/* The drawn signature hairline — the recurring motif, here in blue accent. */}
        <InView
          as="div"
          motion="rule-draw"
          delay={420}
          className="mt-9 h-px w-full max-w-[680px] bg-accent sm:mt-11"
        />

        {/* One precise positioning line + the single discreet action, asymmetric. */}
        <div className="mt-9 grid gap-x-12 gap-y-8 sm:mt-11 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <InView as="p" motion="fade-in-up" delay={120} className="max-w-[52ch] text-body-lg text-slate-strong">
            {t(hero.subhead, locale)}
          </InView>

          <InView as="div" motion="fade-in-up" delay={200} className="flex flex-col gap-5 lg:items-end">
            <a
              href={localeHref(locale, "/contact")}
              className="group/cta inline-flex items-center gap-3 self-start rounded-none border-b border-ink pb-1.5 text-body-base font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-paper lg:self-end"
            >
              {t(hero.primaryCta, locale)}
              <span
                aria-hidden
                className="text-lg leading-none transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
              >
                &#8594;
              </span>
            </a>
            <a
              href={`tel:${contact.phone.replace(/-/g, "")}`}
              className="self-start font-mono text-body-sm text-slate transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:self-end"
            >
              <span dir="ltr">{contact.phone}</span>
            </a>
          </InView>
        </div>
      </div>

      {/* Credential masthead lockup, pinned to the foot of the viewport. */}
      <div className="mx-auto mt-14 w-full max-w-[1240px] sm:mt-20 lg:mt-24">
        <InView as="div" motion="fade-in-up" delay={280}>
          <p className="mb-4 text-caption uppercase tracking-[0.22em] text-slate eyebrow">
            {t({ he: "רקע מקצועי", en: "Credentials" }, locale)}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-4 text-body-sm text-slate-strong">
            {masthead.map((item, i) => (
              <li key={i} className="flex items-center gap-x-5">
                {i > 0 && <span aria-hidden className="text-border-strong">/</span>}
                <span>{t(item, locale)}</span>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}
