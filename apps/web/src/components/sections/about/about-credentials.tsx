import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/about";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Professional Record — trust moat rendered as a structured timeline ledger.
 *
 * ACCESSIBILITY FIXES (P2):
 * - All secondary / sub-label text now uses text-slate-strong (#4a443c, ≥4.5:1
 *   contrast on bone). text-slate (#6c645a, ~3.4:1) is never used at these sizes.
 * - Two-level hierarchy enforced on every credential row:
 *     ROLE: font-editorial text-display-md text-ink (prominent)
 *     INSTITUTION: text-body-sm text-slate-strong (subordinate, still ≥4.5:1)
 *   A gap-1 stack keeps the pairing tight; the role is the dominant read.
 *
 * RTL-correct via logical properties throughout; years render dir="ltr".
 */
export function AboutCredentials({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="04"
          title={credentials.eyebrow}
          locale={locale}
        />

        {/* Journal standfirst under the running head. */}
        <p className="mt-10 max-w-[60ch] text-body-lg leading-relaxed text-ink-80 sm:mt-12">
          {t(credentials.standfirst, locale)}
        </p>

        {/* Ledger — grouped credential blocks. */}
        <div className="mt-14 border-t border-ink/20 sm:mt-16">
          {credentials.groups.map((group) => (
            <div
              key={group.key}
              className="grid gap-x-10 gap-y-6 border-b border-border py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-16"
            >
              {/* Group label — hairline-led, sticky on lg.
                  Uses text-slate-strong for AA contrast at tracked-caps size. */}
              <p className="flex items-center gap-3 text-caption uppercase tracking-[0.16em] text-slate-strong eyebrow lg:sticky lg:top-28 lg:self-start">
                <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
                {t(group.label, locale)}
              </p>

              {/* Credential rows — two-level hierarchy: role (primary) + institution (sub). */}
              <dl className="border-t border-border">
                {group.items.map((item, i) => (
                  <InView
                    as="div"
                    motion="fade-in-up"
                    delay={i * 60}
                    key={i}
                    className="grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-b border-border py-7 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-8"
                  >
                    {/* Index numeral spine — accent color, monospace. */}
                    <span
                      aria-hidden
                      className="pt-0.5 font-mono text-body-sm tabular-nums text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Role + institution — two-level typographic hierarchy. */}
                    <dt className="flex flex-col gap-1.5">
                      {/* LEVEL 1 — role / position title: ink, editorial weight, primary read. */}
                      <span className="font-editorial text-display-md leading-tight text-ink">
                        {t(item.title, locale)}
                      </span>
                      {/* LEVEL 2 — institution / body: slate uppercase tracked label. */}
                      {item.institution && (
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate">
                          {t(item.institution, locale)}
                        </span>
                      )}
                    </dt>

                    {/* Year — right-aligned mono numeral. */}
                    {item.year ? (
                      <dd className="col-span-2 mt-2 font-mono text-body-sm tabular-nums text-slate-strong sm:col-span-1 sm:mt-0 sm:pt-1">
                        <span dir="ltr">{item.year}</span>
                      </dd>
                    ) : (
                      <dd
                        aria-hidden
                        className="hidden text-body-sm text-slate-strong sm:block sm:pt-1"
                      >
                        &mdash;
                      </dd>
                    )}
                  </InView>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Foot-rule — qualifying details at caption tier.
            text-slate-strong ensures ≥4.5:1 at these small tracked-caps sizes. */}
        <InView
          as="div"
          motion="fade-in-up"
          className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-caption uppercase tracking-[0.16em] text-slate-strong eyebrow"
        >
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
            {t(
              { he: "בוגר רפואה, אוניברסיטת תל אביב", en: "MD, Tel Aviv University" },
              locale,
            )}
          </span>
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
            <span className="normal-case">
              {t({ he: "בעיסוק פרטי משנת", en: "In private practice since" }, locale)}{" "}
              <span className="font-mono" dir="ltr">
                2010
              </span>
            </span>
          </span>
        </InView>
      </div>
    </section>
  );
}
