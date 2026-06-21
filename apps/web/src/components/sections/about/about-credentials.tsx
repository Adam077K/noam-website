import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/about";
import { InView } from "@/components/ui";

/**
 * Professional record — the trust moat read in full, as the editorial LEDGER (v2
 * "Quiet Authority"), matched to the Home credentials register. The grouped data is
 * rendered as a structured table on bone: each group is a labelled block; within it
 * every credential is a row with a mono numeral spine, the credential in the display
 * serif, an optional qualifying detail, and a year set dir="ltr". Hairline rules
 * carry the rhythm — no icon circles, no dark band, no decoration. Reads like the
 * credentials page of an institution's annual report. RTL-correct via logical props.
 */
export function AboutCredentials({ locale }: { locale: Locale }) {
  return (
    <section className="bg-canvas px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Section head — label + a one-line framing statement, asymmetric. */}
        <div className="grid gap-x-16 gap-y-6 border-b border-ink pb-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {t(credentials.eyebrow, locale)}
          </p>
          <h2 className="max-w-[24ch] text-pretty font-editorial text-display-lg text-ink">
            <InView as="span" className="block">
              {t(credentials.headline, locale)}
            </InView>
          </h2>
        </div>

        {/* The ledger — grouped blocks of label/value credential rows. */}
        <div className="mt-2">
          {credentials.groups.map((group) => (
            <div key={group.key} className="border-b border-border last:border-b-0">
              {/* Group label — a quiet register heading on a hairline-led row. */}
              <div className="grid gap-x-16 gap-y-5 pt-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.16em] text-slate eyebrow lg:sticky lg:top-28">
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
                      <dt
                        className={
                          item.pending
                            ? "font-editorial text-display-md leading-tight text-slate"
                            : "font-editorial text-display-md leading-tight text-ink"
                        }
                      >
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
            </div>
          ))}
        </div>

        {/* Foot-rule — the qualifying detail, in quiet utility type (mirrors Home). */}
        <InView
          as="div"
          motion="fade-in-up"
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-caption uppercase tracking-[0.16em] text-slate eyebrow"
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
