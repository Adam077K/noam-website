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
import { ContactForm } from "@/components/sections/contact/contact-form";

/**
 * Contact page — v2 "Quiet Authority" editorial conversion.
 *
 * Phone-PRIMARY: a massive serif "Call" statement carries the page, with the
 * tap-to-call number set large in the mono register (dir="ltr"). Email and the
 * clinic address follow as refined hairline-ruled typographic lockups — no cards,
 * no icon chips, no wash bands. The non-negotiable discretion guarantee is set as
 * a prominent editorial passage (serif lead) directly above the request form,
 * which is restyled onto the warm bone surface with hairline-ruled inputs while
 * keeping every bit of its server-action wiring and accessibility intact.
 *
 * RTL-correct throughout (logical props); phone/email render dir="ltr".
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = {
    he: 'יצירת קשר — ד"ר נעם כתרי · אורולוגיה ורפואה מינית, תל אביב',
    en: "Contact — Dr. Noam Kitrey · Urology & Sexual Medicine, Tel Aviv",
  };
  const description = {
    he: "לפנייה דיסקרטית לד\"ר נעם כתרי: טלפון 054-7181718, מייל, או טופס. כל פנייה נשמרת בסודיות מלאה. מרפאה פרטית בתל אביב.",
    en: "Reach Dr. Noam Kitrey discreetly: phone 054-7181718, email, or form. Every inquiry kept in full confidence. Private clinic in Tel Aviv.",
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
    <section className="relative overflow-x-clip bg-paper">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* ── Masthead utility line ──────────────────────────────────────── */}
        <InView
          as="div"
          motion="fade-in-up"
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-b border-border py-4 text-caption uppercase tracking-[0.2em] text-slate eyebrow"
        >
          <span className="max-w-full">
            <span
              aria-hidden
              className="me-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent align-middle"
            />
            {t(contactIntro.eyebrow, locale)}
          </span>
          <span className="font-mono normal-case tracking-[0.08em] text-slate-strong">
            <span dir="ltr">Tel Aviv · By appointment</span>
          </span>
        </InView>

        {/* ── Editorial header ───────────────────────────────────────────── */}
        <div className="pt-10 sm:pt-12 lg:pt-16">
          <h1 className="max-w-[20ch] text-pretty font-editorial text-ink [font-size:clamp(2.15rem,4vw,3.625rem)] [line-height:1.05] [letter-spacing:-0.018em] sm:max-w-[17ch]">
            <InView as="span" className="block pb-[0.12em]">
              {t(contactIntro.headline, locale)}
            </InView>
          </h1>

          <InView
            as="div"
            motion="rule-draw"
            delay={360}
            className="mt-8 h-px w-28 bg-accent sm:mt-10"
          />

          <InView
            as="p"
            motion="fade-in-up"
            delay={120}
            className="mt-7 max-w-[52ch] text-body-lg text-ink-80 sm:mt-8"
          >
            {t(contactIntro.intro, locale)}
          </InView>
        </div>

        {/* ── Phone-primary editorial spread ─────────────────────────────── */}
        <div className="grid gap-x-16 gap-y-12 pt-16 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-x-20 lg:pt-24">
          {/* The CALL statement — the page's hero action, set as type. */}
          <InView as="div" motion="fade-in-up">
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {t(contactIntro.phoneLabel, locale)}
            </p>

            <a
              href={`tel:${telPrimary}`}
              className="group/call mt-6 inline-flex flex-col gap-3 focus-visible:outline-none"
            >
              <span className="font-editorial text-ink [font-size:clamp(3rem,7vw,5.25rem)] [line-height:0.96] [letter-spacing:-0.02em]">
                {t({ he: "להתקשר", en: "Call" }, locale)}
              </span>
              <span
                dir="ltr"
                className="inline-block w-fit border-b border-ink pb-1.5 font-mono text-display-md font-medium tabular-nums text-ink transition-colors duration-300 group-hover/call:border-accent group-hover/call:text-accent group-focus-visible/call:border-accent group-focus-visible/call:text-accent"
              >
                {contactFacts.phonePrimary}
              </span>
            </a>

            <p className="mt-6 max-w-[34ch] text-body-base text-slate-strong">
              {t(contactIntro.phoneHint, locale)}
            </p>
          </InView>

          {/* Refined typographic lockups — alt line · email · address. */}
          <InView
            as="dl"
            motion="fade-in-up"
            delay={120}
            className="flex flex-col self-end border-t border-ink"
          >
            <ContactRow
              href={`tel:${telSecondary}`}
              label={t(contactIntro.phoneLabel, locale)}
              value={contactFacts.phoneSecondary}
              ltr
            />
            <ContactRow
              href={`mailto:${contactFacts.email}`}
              label={t(contactIntro.emailLabel, locale)}
              value={contactFacts.email}
              ltr
              breakValue
            />
            <ContactRow
              label={t(contactIntro.addressLabel, locale)}
              value={t(contactFacts.address, locale)}
            />
          </InView>
        </div>

        {/* ── Discretion guarantee — prominent editorial passage ─────────── */}
        <div className="border-t border-ink pt-16 mt-16 sm:pt-20 sm:mt-20 lg:pt-24 lg:mt-24">
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.42fr_1fr]">
            <InView
              as="p"
              motion="fade-in-up"
              className="flex items-start gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-accent eyebrow lg:pt-2"
            >
              <span
                aria-hidden
                className="mt-2 inline-block h-px w-8 shrink-0 bg-accent"
              />
              {t(discretionGuarantee.eyebrow, locale)}
            </InView>

            <InView as="blockquote" motion="fade-in-up" delay={80}>
              <p className="max-w-[40ch] font-editorial text-display-md leading-[1.18] text-ink">
                {t(discretionGuarantee.lead, locale)}
              </p>
              <p className="mt-6 max-w-[60ch] text-body-lg text-slate-strong">
                {t(discretionGuarantee.body, locale)}
              </p>
            </InView>
          </div>
        </div>

        {/* ── Request form ───────────────────────────────────────────────── */}
        <div className="border-t border-ink pt-16 mt-16 pb-24 sm:pt-20 sm:mt-20 sm:pb-28 lg:pt-24 lg:mt-24 lg:pb-32">
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.42fr_1fr]">
            <InView as="div" motion="fade-in-up">
              <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
                <span aria-hidden className="inline-block h-px w-8 bg-accent" />
                {t({ he: "טופס", en: "Form" }, locale)}
              </p>
              <h2 className="mt-6 max-w-[14ch] font-editorial text-display-lg leading-[1.08] text-ink">
                {t(contactForm.heading, locale)}
              </h2>
              <p className="mt-5 max-w-[36ch] text-body-base text-slate-strong">
                {t(contactForm.subhead, locale)}
              </p>
            </InView>

            <InView as="div" motion="fade-in-up" delay={100}>
              <ContactForm locale={locale} />
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Refined contact-detail row — a hairline-ruled typographic lockup (label start,
 * value end), no card. Whole row is the tap target when `href` is set; the
 * hairline underline under the value draws toward the accent on hover.
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
      <dt className="text-caption uppercase tracking-[0.18em] text-slate eyebrow">
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
