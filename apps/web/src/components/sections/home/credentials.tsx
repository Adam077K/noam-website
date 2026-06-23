import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { InView } from "@/components/ui/in-view";

/**
 * Trust / Stats belt — ref #3 structure.
 *
 * Four credential stats in a tight horizontal row on a mist-50 tinted band.
 * Reads like a fact-sheet: bold metric + quiet label. No decorative elements.
 * On mobile: 2×2 grid. On lg: single row of 4.
 *
 * Verified facts only — no invented numbers.
 */
export function Credentials({ locale }: { locale: Locale }) {
  const stats = [
    {
      key: "sheba",
      metric: { he: "ראש היחידה", en: "Head of Unit" },
      label: { he: "אורולוגיה תפקודית ואנדרולוגיה · שיבא", en: "Functional Urology & Andrology · Sheba" },
    },
    {
      key: "eau",
      metric: { he: 'יו"ר ועדה', en: "Committee Chair" },
      label: { he: "הנחיות קליניות · חבלות אורולוגיות · EAU", en: "Clinical Guidelines · Urological Trauma · EAU" },
    },
    {
      key: "shsq",
      metric: { he: "מנהל המרכז", en: "Center Director" },
      label: { he: "המרכז לבריאות מינית (SHSQ) · שיבא", en: "Sexual Health Center (SHSQ) · Sheba" },
    },
    {
      key: "md",
      metric: { he: "רופא", en: "Physician" },
      label: { he: "MD, אוניברסיטת תל אביב · בשיבא משנת 2010", en: "MD, Tel Aviv University · At Sheba since 2010" },
    },
  ] as const;

  return (
    <section
      className="bg-mist-50 px-[clamp(1.25rem,4vw,2.5rem)]"
      aria-label={t({ he: "אישורים", en: "Credentials" }, locale)}
    >
      <div className="mx-auto max-w-[1200px] py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <InView
              key={stat.key}
              as="div"
              motion="fade-in-up"
              delay={i * 60}
              className="flex flex-col gap-1.5"
            >
              <span
                className="text-[length:var(--text-display-sm)] font-semibold leading-tight text-ink"
              >
                {t(stat.metric, locale)}
              </span>
              <span className="text-[length:var(--text-body-sm)] leading-[var(--text-body-sm--line-height)] text-slate">
                {t(stat.label, locale)}
              </span>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
