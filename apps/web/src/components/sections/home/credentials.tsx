import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/home";
import { InView } from "@/components/ui";

/**
 * Credentials — the trust moat, set as an editorial register (v2 "Quiet
 * Authority"). NO badges, NO icon chips. Four authority lines in a hairline-ruled
 * ledger: a mono numeral, the institution in the display serif, the role in small
 * grotesk beneath. Reads like the masthead of an institution's annual report.
 *
 * RTL-correct via logical props; rules + grid mirror naturally.
 */
export function Credentials({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px]">
        <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-slate eyebrow">
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          {t(credentials.eyebrow, locale)}
        </p>

        <dl className="mt-12 border-t border-ink">
          {credentials.items.map((item, i) => (
            <InView
              as="div"
              motion="fade-in-up"
              delay={i * 70}
              key={item.key}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border py-7 sm:grid-cols-[3rem_1fr_1.1fr] sm:gap-x-10 sm:py-9"
            >
              <span aria-hidden className="font-mono text-body-sm tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="font-editorial text-display-md text-ink">
                {t(item.institution, locale)}
              </dt>
              <dd className="col-span-2 mt-2 text-body-base text-slate sm:col-span-1 sm:mt-0 sm:pt-2">
                {t(item.title, locale)}
              </dd>
            </InView>
          ))}
        </dl>
      </div>
    </section>
  );
}
