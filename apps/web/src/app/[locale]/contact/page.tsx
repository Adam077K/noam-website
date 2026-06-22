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
import { RunningHead, SectionHead, Folio } from "@/components/sections/home/journal";
import { ContactForm } from "@/components/sections/contact/contact-form";

/**
 * Contact page — "The Journal" CORRESPONDENCE article.
 *
 * Set in the locked journal vocabulary (running head, folio "05", small-caps
 * section running-heads on hairlines, oversized folio numeral anchor, the
 * asymmetric primary/margin reading grid) but composed distinctly as a page of
 * CORRESPONDENCE — the way a journal prints its editorial address.
 *
 * Phone-PRIMARY: a large editorial serif "Call" statement carries the masthead,
 * with the tap-to-call number set in the mono register (dir="ltr"). The second
 * line, email, and clinic address follow as refined hairline-ruled typographic
 * lockups in the margin — no cards, no icon chips, no wash bands. The
 * non-negotiable discretion guarantee is set as a prominent editorial passage
 * (serif lead) under its own section rule, directly above the correspondence
 * card — the request form, restyled onto the warm bone surface with hairline-
 * ruled inputs while keeping every bit of its server-action wiring and a11y.
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
    he: 'לפנייה דיסקרטית לד"ר נעם כתרי: טלפון 054-7181718, מייל, או טופס. כל פנייה נשמרת בסודיות מלאה. מרפאה פרטית בתל אביב.',
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
    <>
      <RunningHead locale={locale} />

      <section className="relative overflow-x-clip bg-paper">
        <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14">
          {/* ── Article head: folio "05" · CORRESPONDENCE running-head ────── */}
          <SectionHead
            folio="05"
            title={contactIntro.sectionTitle}
            locale={locale}
          />

          {/* ── Editorial opening — headline + intro over a folio anchor ──── */}
          <div className="relative mt-10 sm:mt-12 lg:mt-14">
            <Folio
              n="05"
              className="pointer-events-none absolute -top-6 -z-0 text-[7rem] -start-2 sm:text-[10rem] lg:-top-12 lg:text-[13rem]"
            />

            <p className="relative mb-6 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
              {t(contactIntro.eyebrow, locale)}
            </p>

            <h1 className="relative max-w-[20ch] text-pretty font-editorial text-ink [font-size:clamp(2.1rem,4.2vw,3.75rem)] [line-height:1.06] [letter-spacing:-0.02em] sm:max-w-[18ch]">
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
              className="mt-7 max-w-[50ch] text-body-lg text-ink-80 sm:mt-8"
            >
              {t(contactIntro.intro, locale)}
            </InView>
          </div>

          {/* ── Phone-primary spread: serif CALL statement + margin lockups ─ */}
          <div className="mt-16 grid gap-x-10 gap-y-14 sm:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-x-16">
            {/* The CALL statement — the page's hero action, set as type. */}
            <InView as="div" motion="fade-in-up" className="relative">
              <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
                <span aria-hidden className="inline-block h-px w-8 bg-accent" />
                {t(contactIntro.phoneLabel, locale)}
              </p>

              <a
                href={`tel:${telPrimary}`}
                className="group/call mt-7 inline-flex flex-col gap-4 focus-visible:outline-none"
              >
                <span className="font-editorial text-ink [font-size:clamp(3rem,7.5vw,5.5rem)] [line-height:0.94] [letter-spacing:-0.022em]">
                  {t(contactIntro.callWord, locale)}
                </span>
                <span
                  dir="ltr"
                  className="inline-block w-fit border-b border-ink pb-1.5 font-mono text-display-md font-medium tabular-nums text-ink transition-colors duration-300 group-hover/call:border-accent group-hover/call:text-accent group-focus-visible/call:border-accent group-focus-visible/call:text-accent"
                >
                  {contactFacts.phonePrimary}
                </span>
              </a>

              <p className="mt-7 max-w-[34ch] text-body-base text-slate-strong">
                {t(contactIntro.phoneHint, locale)}
              </p>
            </InView>

            {/* MARGIN — refined hairline-ruled lockups: second line · email · address. */}
            <InView
              as="dl"
              motion="fade-in-up"
              delay={120}
              className="flex flex-col self-end border-t border-ink"
            >
              <ContactRow
                href={`tel:${telSecondary}`}
                label={t(contactIntro.phoneSecondaryLabel, locale)}
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
          <div className="mt-20 sm:mt-24 lg:mt-28">
            <SectionHead
              folio="§"
              title={discretionGuarantee.sectionTitle}
              locale={locale}
            />
            <div className="mt-10 grid gap-x-16 gap-y-8 sm:mt-12 lg:grid-cols-[0.42fr_1fr]">
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
                <p className="max-w-[26ch] font-editorial text-display-lg leading-[1.12] text-ink">
                  {t(discretionGuarantee.lead, locale)}
                </p>
                <p className="mt-7 max-w-[60ch] text-body-lg leading-relaxed text-slate-strong">
                  {t(discretionGuarantee.body, locale)}
                </p>
              </InView>
            </div>
          </div>

          {/* ── Correspondence card — the request form ─────────────────────── */}
          <div className="mt-20 pb-24 sm:mt-24 sm:pb-28 lg:mt-28 lg:pb-32">
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

              {/* The correspondence card: hairline-framed bone panel. */}
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
        </div>
      </section>
    </>
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
