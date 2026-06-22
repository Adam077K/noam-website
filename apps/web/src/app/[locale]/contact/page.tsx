import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { t } from "@/content/types";
import {
  contactFacts,
  contactIntro,
  contactForm,
  discretionGuarantee,
} from "@/content/contact";
import { pageMetadata } from "@/lib/seo";
import { InView } from "@/components/ui";
import { RunningHead, SectionHead } from "@/components/sections/home/journal";
import { ContactForm } from "@/components/sections/contact/contact-form";

/**
 * Contact page — "The Journal" CORRESPONDENCE chapter.
 *
 * Redesigned for above-the-fold primacy: the first viewport delivers the
 * pull-quote H1, the non-negotiable discretion one-liner, the phone + email
 * contact, and the leading edge of the form — all without scrolling at
 * 1366×768 and 1440×820. The folio "05" is demoted to a low-opacity CSS
 * watermark behind the form panel; the redundant small folio counter and the
 * orphan blue rule are removed.
 *
 * RTL-correct throughout (logical props only); phone/email render dir="ltr".
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = {
    he: 'פנייה — ד"ר נעם כתרי · אורולוגיה ורפואה מינית, תל אביב',
    en: "Enquiries — Dr. Noam Kitrey · Urology & Sexual Medicine, Tel Aviv",
  };
  const description = {
    he: 'פנייה דיסקרטית לד"ר נעם כתרי: 054-7181718, דוא"ל, או טופס. כל פנייה בסודיות מלאה. מרפאה פרטית בתל אביב.',
    en: "Reach Dr. Noam Kitrey discreetly: 054-7181718, email, or form. Every enquiry in full confidence. Private clinic in Tel Aviv.",
  };
  return pageMetadata({
    locale,
    path: "/contact",
    title: t(title, locale),
    description: t(description, locale),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const telPrimary = contactFacts.phonePrimary.replace(/[^0-9+]/g, "");
  const telSecondary = contactFacts.phoneSecondary.replace(/[^0-9+]/g, "");

  return (
    <>
      <RunningHead locale={locale} />

      {/* ── Above-fold chapter opener ──────────────────────────────────────── */}
      <section className="relative overflow-x-clip bg-paper">
        <div className="mx-auto w-full max-w-[1280px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">

          {/* Section running-head: "05 · CORRESPONDENCE" */}
          <SectionHead
            folio="05"
            title={contactIntro.sectionTitle}
            locale={locale}
          />

          {/* ── Chapter opener: H1 pull-quote + discretion strip + contact ── */}
          <div className="mt-6 grid gap-x-12 gap-y-8 sm:mt-7 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-x-16 xl:gap-x-20">

            {/* LEFT / MAIN: H1 → discretion → phone → email */}
            <div className="flex flex-col gap-6">
              {/* H1 pull-quote — the chapter opener, above the fold */}
              <InView as="div" motion="fade-in-up">
                <p className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate-strong eyebrow">
                  {t(contactIntro.eyebrow, locale)}
                </p>
                <h1 className="max-w-[22ch] text-pretty font-editorial text-ink [font-size:clamp(2rem,3.8vw,3.5rem)] [line-height:1.08] [letter-spacing:-0.02em]">
                  {t(contactIntro.headline, locale)}
                </h1>
              </InView>

              {/* Non-negotiable discretion guarantee — one-liner, both languages */}
              <InView
                as="div"
                motion="fade-in-up"
                delay={80}
                className="flex items-start gap-3 border-s-2 border-accent ps-4 py-1"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-body-sm font-medium text-ink">
                    {discretionGuarantee.lead.he}
                  </p>
                  {locale === "en" && (
                    <p className="text-body-sm text-slate-strong italic-none">
                      {discretionGuarantee.lead.en}
                    </p>
                  )}
                  {locale === "he" && (
                    <p className="text-body-sm text-slate-strong" dir="ltr" style={{ textAlign: "left" }}>
                      {discretionGuarantee.lead.en}
                    </p>
                  )}
                </div>
              </InView>

              {/* Phone primary + email — above-fold contact touch-points */}
              <InView
                as="div"
                motion="fade-in-up"
                delay={140}
                className="flex flex-col gap-4"
              >
                <a
                  href={`tel:${telPrimary}`}
                  className="group/tel inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ink/20 text-slate-strong transition-colors duration-300 group-hover/tel:border-accent group-hover/tel:text-accent group-focus-visible/tel:border-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
                      <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1 17 17 0 0 1-17-17 1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1L6.6 10.8z" />
                    </svg>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate-strong eyebrow">
                      {t(contactIntro.phoneLabel, locale)}
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-display-md font-medium tabular-nums text-ink transition-colors duration-300 group-hover/tel:text-accent"
                    >
                      {contactFacts.phonePrimary}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${contactFacts.email}`}
                  className="group/mail inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ink/20 text-slate-strong transition-colors duration-300 group-hover/mail:border-accent group-hover/mail:text-accent group-focus-visible/mail:border-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 7l10 7 10-7" />
                    </svg>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-slate-strong eyebrow">
                      {t(contactIntro.emailLabel, locale)}
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-body-base text-ink transition-colors duration-300 group-hover/mail:text-accent"
                    >
                      {contactFacts.email}
                    </span>
                  </span>
                </a>
              </InView>
            </div>

            {/* RIGHT / MARGIN: secondary phone + address */}
            <InView
              as="dl"
              motion="fade-in-up"
              delay={200}
              className="flex flex-col self-start border-t border-ink/20 lg:mt-0"
            >
              <ContactRow
                href={`tel:${telSecondary}`}
                label={t(contactIntro.phoneSecondaryLabel, locale)}
                value={contactFacts.phoneSecondary}
                ltr
              />
              <ContactRow
                label={t(contactIntro.addressLabel, locale)}
                value={t(contactFacts.address, locale)}
              />
            </InView>
          </div>
        </div>
      </section>

      {/* ── Correspondence form section — the "05" becomes a watermark here ── */}
      <section className="relative overflow-x-clip bg-paper pb-24 sm:pb-28 lg:pb-32">
        {/* Folio "05" watermark — low-opacity, behind content, decorative only */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          <span
            aria-hidden
            className="absolute -top-8 end-0 block font-editorial leading-[0.8] tabular-nums text-ink/[0.06] [font-size:clamp(12rem,22vw,20rem)]"
            dir="ltr"
          >
            05
          </span>
        </span>

        <div className="relative mx-auto w-full max-w-[1280px] px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">

          {/* Discretion guarantee — full passage directly above the form */}
          <div className="mb-10 sm:mb-12">
            <SectionHead
              folio="§"
              title={discretionGuarantee.sectionTitle}
              locale={locale}
            />
            <InView
              as="blockquote"
              motion="fade-in-up"
              delay={40}
              className="mt-7 grid gap-x-16 gap-y-5 sm:mt-8 lg:grid-cols-[0.42fr_1fr]"
            >
              <p className="flex items-start gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-accent eyebrow lg:pt-1">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-px w-8 shrink-0 bg-accent"
                />
                {t(discretionGuarantee.eyebrow, locale)}
              </p>
              <div>
                <p className="max-w-[30ch] font-editorial text-display-lg leading-[1.12] text-ink">
                  {t(discretionGuarantee.lead, locale)}
                </p>
                <p className="mt-5 max-w-[60ch] text-body-base leading-relaxed text-slate-strong">
                  {t(discretionGuarantee.body, locale)}
                </p>
              </div>
            </InView>
          </div>

          {/* ── The correspondence form ───────────────────────────────────── */}
          <SectionHead
            folio="✎"
            title={contactForm.sectionTitle}
            locale={locale}
          />

          <div className="mt-10 grid gap-x-16 gap-y-10 sm:mt-12 lg:grid-cols-[0.42fr_1fr]">
            <InView as="div" motion="fade-in-up">
              <h2 className="max-w-[14ch] font-editorial text-display-lg leading-[1.08] text-ink">
                {t(contactForm.heading, locale)}
              </h2>
              <p className="mt-5 max-w-[36ch] text-body-base text-slate-strong">
                {t(contactForm.subhead, locale)}
              </p>
            </InView>

            {/* The correspondence card */}
            <InView
              as="div"
              motion="fade-in-up"
              delay={100}
              className="relative border border-ink/15 bg-paper-pure p-6 sm:p-8 lg:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-px start-0 h-1 w-16 bg-accent"
              />
              <ContactForm locale={locale} />
            </InView>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Refined contact-detail row — a hairline-ruled typographic lockup.
 */
function ContactRow({
  href,
  label,
  value,
  ltr = false,
  breakValue = false,
}: {
  href?: string;
  label: string;
  value: string;
  ltr?: boolean;
  breakValue?: boolean;
}) {
  const inner = (
    <>
      <dt className="text-caption uppercase tracking-[0.18em] text-slate-strong eyebrow">
        {label}
      </dt>
      <dd
        dir={ltr ? "ltr" : undefined}
        className={
          "min-w-0 text-end text-body-base text-ink" +
          (ltr ? " font-mono tabular-nums" : "") +
          (breakValue ? " break-all" : "")
        }
      >
        {value}
      </dd>
    </>
  );

  const rowClass =
    "flex items-baseline justify-between gap-6 border-b border-border py-5";

  if (!href) {
    return <div className={rowClass}>{inner}</div>;
  }

  return (
    <a
      href={href}
      className={
        rowClass +
        " group/row transition-colors duration-300 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-paper [&>dd]:transition-colors [&>dd]:duration-300 hover:[&>dd]:text-accent"
      }
    >
      {inner}
    </a>
  );
}
