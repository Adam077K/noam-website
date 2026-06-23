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
import { InView, Eyebrow, IconCircle } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";
import { ContactForm } from "@/components/sections/contact/contact-form";

/**
 * Contact page — "The Journal" CORRESPONDENCE chapter.
 *
 * v4 "Clinic-Minimal" rebuild (ref-#3 target):
 * — True two-column split: left = info + discretion, right = form panel
 * — First screen delivers: h1, discretion one-liner, phone + email
 * — Form panel: rounded-[20px] card, mist tinted top-bar, clean inputs
 * — Optional map slot below (clinic-shot pattern — intentional, not empty)
 * — RTL-correct via logical props throughout; numbers dir="ltr"
 * — No serif; Inter (EN) / Heebo (HE) from design system
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
      {/* ── Main contact section: two-column split ──────────────────────────── */}
      <section className="relative overflow-x-clip bg-paper">
        {/* Subtle mist blob — decorative depth, pointer-events-none */}
        <span
          aria-hidden
          className="pointer-events-none absolute end-0 top-0 -z-0 h-[60%] w-[45%] translate-x-[20%] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, #C8DADA 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3.5rem,7vw,6rem)]">
          {/* Section running-head: "05 · CORRESPONDENCE" */}
          <SectionHead
            folio="05"
            title={contactIntro.sectionTitle}
            locale={locale}
          />

          {/* ── Two-column grid ──────────────────────────────────────────────── */}
          <div className="mt-10 grid gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start xl:gap-x-[clamp(3rem,7vw,6rem)]">

            {/* ═══ LEFT COLUMN — heading + discretion + contact facts ═══════ */}
            <div className="flex flex-col gap-8">

              {/* H1 — page title, above the fold */}
              <InView as="div" motion="fade-in-up">
                <Eyebrow className="mb-4" withRule>
                  {t(contactIntro.eyebrow, locale)}
                </Eyebrow>
                <h1 className="max-w-[22ch] text-pretty font-semibold text-ink [font-size:clamp(2rem,3.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.1]">
                  {t(contactIntro.headline, locale)}
                </h1>
                <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-slate-strong">
                  {t(contactIntro.intro, locale)}
                </p>
              </InView>

              {/* ── NON-NEGOTIABLE DISCRETION GUARANTEE ──────────────────── */}
              <InView as="div" motion="fade-in-up" delay={80}>
                {/* Card — nested double-bezel style, mist tinted surface */}
                <div className="rounded-[16px] bg-mist-50 p-px ring-1 ring-mist-soft">
                  <div className="flex flex-col gap-4 rounded-[15px] bg-paper px-6 py-5">
                    {/* Eyebrow row with shield icon */}
                    <div className="flex items-center gap-3">
                      <IconCircle name="shieldCheck" size="sm" />
                      <Eyebrow tone="accent">
                        {t(discretionGuarantee.eyebrow, locale)}
                      </Eyebrow>
                    </div>
                    {/* Hebrew lead (canonical) */}
                    <p className="text-[0.9375rem] font-semibold leading-snug text-ink">
                      {discretionGuarantee.lead.he}
                    </p>
                    {/* English lead — always shown as parallel translation */}
                    <p
                      className="text-[0.9375rem] leading-snug text-slate-strong"
                      dir="ltr"
                      style={{ textAlign: locale === "he" ? "start" : undefined }}
                    >
                      {discretionGuarantee.lead.en}
                    </p>
                    {/* Body passage */}
                    <p className="border-t border-border pt-4 text-[0.875rem] leading-[1.65] text-slate-strong">
                      {t(discretionGuarantee.body, locale)}
                    </p>
                  </div>
                </div>
              </InView>

              {/* ── Contact facts: phone primary, phone secondary, email, address */}
              <InView as="div" motion="fade-in-up" delay={140}>
                <div className="flex flex-col divide-y divide-border">
                  {/* Phone primary — large prominent touch-point */}
                  <a
                    href={`tel:${telPrimary}`}
                    className="group/tel flex items-center gap-4 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper hover:text-accent"
                  >
                    <IconCircle
                      name="phone"
                      size="sm"
                      className="shrink-0 transition-all duration-300 group-hover/tel:bg-mist group-hover/tel:text-ink"
                    />
                    <span className="flex flex-col">
                      <span className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                        {t(contactIntro.phoneLabel, locale)}
                      </span>
                      <span
                        dir="ltr"
                        className="font-mono text-[1.375rem] font-semibold tabular-nums text-ink transition-colors duration-300 group-hover/tel:text-accent"
                      >
                        {contactFacts.phonePrimary}
                      </span>
                      <span className="mt-0.5 text-[0.8125rem] text-slate-strong">
                        {t(contactIntro.phoneHint, locale)}
                      </span>
                    </span>
                  </a>

                  {/* Phone secondary */}
                  <a
                    href={`tel:${telSecondary}`}
                    className="group/tel2 flex items-center gap-4 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    <IconCircle
                      name="phone"
                      size="sm"
                      className="shrink-0 opacity-60"
                    />
                    <span className="flex flex-col">
                      <span className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                        {t(contactIntro.phoneSecondaryLabel, locale)}
                      </span>
                      <span
                        dir="ltr"
                        className="font-mono text-[1rem] tabular-nums text-ink transition-colors duration-300 group-hover/tel2:text-accent"
                      >
                        {contactFacts.phoneSecondary}
                      </span>
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${contactFacts.email}`}
                    className="group/mail flex items-center gap-4 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    <IconCircle
                      name="mail"
                      size="sm"
                      className="shrink-0 transition-all duration-300 group-hover/mail:bg-mist group-hover/mail:text-ink"
                    />
                    <span className="flex flex-col">
                      <span className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                        {t(contactIntro.emailLabel, locale)}
                      </span>
                      <span
                        dir="ltr"
                        className="font-mono text-[1rem] text-ink transition-colors duration-300 group-hover/mail:text-accent"
                      >
                        {contactFacts.email}
                      </span>
                    </span>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 py-4">
                    <IconCircle name="mapPin" size="sm" className="shrink-0 opacity-70" />
                    <div className="flex flex-col">
                      <span className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                        {t(contactIntro.addressLabel, locale)}
                      </span>
                      <span className="mt-0.5 text-[0.9375rem] leading-snug text-ink">
                        {t(contactFacts.address, locale)}
                      </span>
                    </div>
                  </div>
                </div>
              </InView>
            </div>

            {/* ═══ RIGHT COLUMN — form card ════════════════════════════════ */}
            <InView as="div" motion="fade-in-up" delay={100} className="w-full">
              {/* Form card — double-bezel, rounded, mist accent top edge */}
              <div className="relative overflow-hidden rounded-[20px] bg-paper shadow-[0_8px_40px_rgba(32,42,44,0.09)] ring-1 ring-ink/[0.09]">
                {/* Mist accent top bar */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 rounded-t-[20px] bg-mist"
                />
                <div className="relative px-6 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-9 lg:px-10 lg:pb-12 lg:pt-10">
                  {/* Form heading */}
                  <div className="mb-7 border-b border-border pb-6">
                    <Eyebrow className="mb-3" withRule>
                      {t(contactForm.sectionTitle, locale)}
                    </Eyebrow>
                    <h2 className="text-[1.5rem] font-semibold leading-tight text-ink [letter-spacing:-0.015em]">
                      {t(contactForm.heading, locale)}
                    </h2>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-strong">
                      {t(contactForm.subhead, locale)}
                    </p>
                  </div>

                  <ContactForm locale={locale} />
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── Clinic address / map slot ─────────────────────────────────────────── */}
      <section className="bg-mist-50">
        <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            folio="↯"
            title={{ he: "מיקום", en: "Location" }}
            locale={locale}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
            {/* Location details */}
            <InView as="div" motion="fade-in-up" className="flex flex-col gap-5">
              <div>
                <p className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                  {t(contactIntro.addressLabel, locale)}
                </p>
                <p className="mt-2 text-[1rem] leading-snug text-ink">
                  {t(contactFacts.address, locale)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                <div>
                  <p className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                    {t(contactIntro.phoneLabel, locale)}
                  </p>
                  <a
                    href={`tel:${telPrimary}`}
                    dir="ltr"
                    className="mt-1 block font-mono text-[0.9375rem] text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
                  >
                    {contactFacts.phonePrimary}
                  </a>
                </div>
                <div>
                  <p className="eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-strong">
                    {t(contactIntro.emailLabel, locale)}
                  </p>
                  <a
                    href={`mailto:${contactFacts.email}`}
                    dir="ltr"
                    className="mt-1 block font-mono text-[0.9375rem] text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
                  >
                    {contactFacts.email}
                  </a>
                </div>
              </div>
            </InView>

            {/* Map slot — intentional placeholder, object-fit:cover ready */}
            <InView as="div" motion="fade-in-up" delay={80}>
              <div
                className="clinic-shot relative overflow-hidden rounded-[20px]"
                style={{ aspectRatio: "16/7" }}
                data-slot="map"
                role="img"
                aria-label={
                  locale === "he"
                    ? "מפת מיקום מרפאת איל, תל אביב"
                    : "Map showing Ayal Specialist Clinics location, Tel Aviv"
                }
              >
                {/* Intentional placeholder content */}
                <div className="clinic-shot__empty">
                  <span className="clinic-shot__monogram">
                    {locale === "he" ? "ת״א" : "TLV"}
                  </span>
                  <span className="clinic-shot__caption">
                    {locale === "he"
                      ? "מגדל רסיטל, דרך מנחם בגין 156"
                      : "Recital Tower, 156 Menachem Begin Rd"}
                  </span>
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>
    </>
  );
}
