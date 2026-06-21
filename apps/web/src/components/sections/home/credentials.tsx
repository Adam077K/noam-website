import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/home";
import { InView } from "@/components/ui";

/**
 * Professional record — the trust moat read in full (v3). Where the hero register
 * is the at-a-glance scan, this is the deliberate, verifiable ledger: a two-column
 * editorial table with a numbered spine, the institution in the display serif, the
 * exact appointment beneath, and a foot-rule carrying the qualifying detail (MD,
 * Tel Aviv University · in practice since 2010). Reads like the credentials page of
 * an institution's annual report — serious, top-of-field, nothing decorative.
 *
 * RTL-correct via logical props; rules + grid mirror naturally.
 */
export function Credentials({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Section head — label + a one-line framing statement, asymmetric. */}
        <div className="grid gap-x-16 gap-y-6 border-b border-ink pb-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(credentials.eyebrow, locale)}
          </p>
          <p className="max-w-[48ch] text-body-base text-slate-strong">
            {t(
              {
                he: "רקע מקצועי מלא — מתפקידי ניהול בשיבא ועד יו\"ר ועדת הנחיות באיגוד האורולוגיה האירופי.",
                en: "A complete professional record — from unit leadership at Sheba to chairing a clinical-guidelines committee for the European Association of Urology.",
              },
              locale,
            )}
          </p>
        </div>

        {/* The ledger. */}
        <dl className="border-t border-border">
          {credentials.items.map((item, i) => (
            <InView
              as="div"
              motion="fade-in-up"
              delay={i * 60}
              key={item.key}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 border-b border-border py-7 sm:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-x-10 sm:py-8"
            >
              <span aria-hidden className="font-mono text-body-sm tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="font-editorial text-display-md leading-tight text-ink">
                {t(item.institution, locale)}
              </dt>
              <dd className="col-span-2 mt-2.5 text-body-base leading-relaxed text-slate sm:col-span-1 sm:mt-0 sm:pt-1.5">
                {t(item.title, locale)}
              </dd>
            </InView>
          ))}
        </dl>

        {/* Foot-rule — the qualifying detail, in quiet utility type. */}
        <InView
          as="div"
          motion="fade-in-up"
          className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-caption uppercase tracking-[0.16em] text-slate eyebrow"
        >
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
            {t({ he: "בוגר רפואה, אוניברסיטת תל אביב", en: "MD, Tel Aviv University" }, locale)}
          </span>
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
            <span className="normal-case">
              {t({ he: "בעיסוק פרטי משנת", en: "In private practice since" }, locale)}{" "}
              <span className="font-mono" dir="ltr">2010</span>
            </span>
          </span>
        </InView>
      </div>
    </section>
  );
}
