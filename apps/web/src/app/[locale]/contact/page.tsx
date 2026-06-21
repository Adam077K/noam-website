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
import { Section, Eyebrow, Reveal, Icon } from "@/components/ui";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { cn } from "@/lib/utils";

/**
 * Contact page. Phone-primary: the tap-to-call line, email and address lead the
 * page (many patients prefer to simply call), followed by the non-negotiable
 * discretion guarantee rendered prominently above the request form. The form is
 * the page's single conversion close — nothing heavier follows it.
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
  return { title: t(title, locale), description: t(description, locale) };
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
      {/* ── Header + contact options (phone-primary) ───────────────────── */}
      <Section tone="tinted" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-28 end-[-8%] h-[420px] w-[420px] rounded-full bg-wash-deep/60 blur-3xl"
        />
        <div className="relative">
          <Reveal className="max-w-2xl">
            <Eyebrow withRule>{t(contactIntro.eyebrow, locale)}</Eyebrow>
            <h1 className="mt-5 text-balance text-display-xl text-ink">
              {t(contactIntro.headline, locale)}
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-slate-strong">
              {t(contactIntro.intro, locale)}
            </p>
          </Reveal>

          {/* Phone-primary: the call line is the hero action, full-width. */}
          <Reveal delay={120} className="mt-10">
            <a
              href={`tel:${telPrimary}`}
              className="group/call relative flex flex-col gap-3 rounded-2xl border border-border-accent bg-paper p-6 shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-premium hover:-translate-y-px hover:border-accent hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-wash sm:flex-row sm:items-center sm:justify-between sm:p-7"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-pill bg-accent text-paper shadow-card transition-transform duration-200 group-hover/call:scale-105">
                  <Icon name="phone" className="h-7 w-7" />
                </span>
                <span className="flex flex-col">
                  <span className="text-body-sm font-medium text-slate">
                    {t(contactIntro.phoneLabel, locale)}
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-display-md font-medium tabular-nums text-ink transition-colors duration-200 group-hover/call:text-accent"
                  >
                    {contactFacts.phonePrimary}
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-3 text-body-sm text-slate ps-[72px] sm:ps-0 sm:text-end">
                <span className="max-w-[14rem]">
                  {t(contactIntro.phoneHint, locale)}
                </span>
              </span>
            </a>
          </Reveal>

          {/* Secondary channels: alt phone · email · address. */}
          <Reveal delay={180} className="mt-5">
            <ul className="grid gap-4 sm:grid-cols-3">
              <ContactDetail
                href={`tel:${telSecondary}`}
                icon={<Icon name="phone" className="h-5 w-5" />}
                label={t(contactIntro.phoneLabel, locale)}
                value={contactFacts.phoneSecondary}
                ltr
              />
              <ContactDetail
                href={`mailto:${contactFacts.email}`}
                icon={<Icon name="mail" className="h-5 w-5" />}
                label={t(contactIntro.emailLabel, locale)}
                value={contactFacts.email}
                ltr
                breakValue
              />
              <ContactDetail
                icon={<Icon name="mapPin" className="h-5 w-5" />}
                label={t(contactIntro.addressLabel, locale)}
                value={t(contactFacts.address, locale)}
              />
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ── Discretion guarantee + request form ────────────────────────── */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Reassurance rail — the discretion guarantee, prominent. */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-border-accent bg-wash/50 p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent-tint text-accent ring-1 ring-accent-soft/70">
                  <Icon name="shieldCheck" className="h-6 w-6" />
                </span>
                <Eyebrow className="mt-5" tone="accent">
                  {t(discretionGuarantee.eyebrow, locale)}
                </Eyebrow>
                <p className="mt-4 text-body-lg leading-relaxed text-ink">
                  <strong className="font-semibold">
                    {t(discretionGuarantee.lead, locale)}
                  </strong>{" "}
                  <span className="text-slate-strong">
                    {t(discretionGuarantee.body, locale)}
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form card. */}
          <Reveal delay={80}>
            <div className="rounded-2xl border border-border bg-paper p-6 shadow-card sm:p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-display-md text-ink">
                  {t(contactForm.heading, locale)}
                </h2>
                <p className="mt-2 text-body-base text-slate">
                  {t(contactForm.subhead, locale)}
                </p>
              </div>
              <ContactForm locale={locale} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/** Secondary contact-detail tile (alt phone / email / address). */
function ContactDetail({
  href,
  icon,
  label,
  value,
  ltr = false,
  breakValue = false,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  ltr?: boolean;
  breakValue?: boolean;
}) {
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-accent-tint text-accent ring-1 ring-accent-soft/70">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-caption font-medium uppercase tracking-[0.08em] text-slate-60">
          {label}
        </span>
        <span
          dir={ltr ? "ltr" : undefined}
          className={cn(
            "mt-0.5 text-body-sm text-ink",
            ltr && "font-mono tabular-nums",
            breakValue && "break-all",
          )}
        >
          {value}
        </span>
      </span>
    </>
  );

  const shell =
    "flex items-start gap-3 rounded-xl border border-border bg-paper p-4 transition-[border-color,box-shadow] duration-200";

  return (
    <li>
      {href ? (
        <a
          href={href}
          className={cn(
            shell,
            "hover:border-border-accent hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          )}
        >
          {body}
        </a>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </li>
  );
}
