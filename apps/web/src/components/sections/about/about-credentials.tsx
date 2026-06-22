import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/about";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * Professional Record — the trust moat read in full, as the appendix LEDGER of the
 * profile (folio "04"), matched to the locked Home credentials register.
 *
 * Reuses the Home ledger pattern: a journal SectionHead, a standfirst, then a
 * structured table on warm bone where each group is a labelled block and every
 * credential is a row with a mono numeral spine, the institution/role in the
 * display serif, an optional year set dir="ltr". Hairline rules carry the rhythm —
 * no icon circles, no dark band, no decoration. Reads like the credentials page of
 * an institution's annual report. RTL-correct via logical properties throughout.
 */
export function AboutCredentials({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
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

        {/* The ledger — grouped blocks of label/value credential rows. */}
        <div className="mt-14 border-t border-ink/20 sm:mt-16">
          {credentials.groups.map((group) => (
            <div
              key={group.key}
              className="grid gap-x-10 gap-y-6 border-b border-border py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-16"
            >
              {/* Group label — a quiet register heading, hairline-led, sticky on lg. */}
              <p className="flex items-center gap-3 text-caption uppercase tracking-[0.16em] text-slate eyebrow lg:sticky lg:top-28 lg:self-start">
                <span aria-hidden className="inline-block h-px w-6 bg-border-strong" />
                {t(group.label, locale)}
              </p>

              {/* The credential rows for this group. */}
              <dl className="border-t border-border">
                {group.items.map((item, i) => (
                  <InView
                    as="div"
                    motion="fade-in-up"
                    delay={i * 60}
                    key={i}
                    className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 border-b border-border py-6 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-8 sm:py-7"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-body-sm tabular-nums text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="font-editorial text-display-md leading-tight text-ink">
                      {t(item.title, locale)}
                    </dt>
                    {item.year ? (
                      <dd className="col-span-2 mt-2.5 font-mono text-body-sm tabular-nums text-slate sm:col-span-1 sm:mt-0 sm:pt-1.5">
                        <span dir="ltr">{item.year}</span>
                      </dd>
                    ) : (
                      <dd
                        aria-hidden
                        className="hidden text-body-sm text-slate-60 sm:block sm:pt-1.5"
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

        {/* Foot-rule — the qualifying detail, in quiet utility type (mirrors Home). */}
        <InView
          as="div"
          motion="fade-in-up"
          className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-caption uppercase tracking-[0.16em] text-slate eyebrow"
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
