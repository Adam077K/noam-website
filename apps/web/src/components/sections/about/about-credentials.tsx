import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/about";
import { Eyebrow, IconCircle, Reveal } from "@/components/ui";
import type { IconName } from "@/components/ui";

/**
 * Detailed credentials — the trust moat. Rendered on the dark ink band for
 * gravitas (it breaks the page rhythm exactly like the Home trust band), structured
 * as a vertical timeline: each group is a node on a hairline spine, marked by an
 * inverse icon circle, with its credentials listed beneath. The spine + node
 * treatment turns a factual list into a considered "front of medicine" lineage
 * without inventing anything. Years render `dir="ltr"` so digits never reorder
 * under RTL. The languages node is an honest "to be confirmed" pending state.
 * Accent text on ink uses the lighter accent for AA contrast per ART-DIRECTION-V2.
 */
export function AboutCredentials({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-20 text-paper sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 end-[-6%] h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] start-[-8%] h-[320px] w-[320px] rounded-full bg-accent-light/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="inverse" withRule>
              {t(credentials.eyebrow, locale)}
            </Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-balance text-display-lg text-paper">
              {t(credentials.headline, locale)}
            </h2>
          </Reveal>
        </div>

        {/* Timeline. A hairline spine runs along the start edge; each group hangs a
            node (icon circle) off it. Logical insets keep the spine on the correct
            side under RTL automatically. */}
        <ol className="mt-14 space-y-12">
          {credentials.groups.map((group, gi) => (
            <Reveal as="li" key={group.key} delay={gi * 80}>
              <div className="relative ps-16">
                {/* Spine — drawn between this node and the next; the last node has none. */}
                {gi < credentials.groups.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute start-[1.4375rem] top-12 bottom-[-3rem] w-px bg-accent-light/20"
                  />
                )}
                {/* Node. */}
                <span className="absolute start-0 top-0">
                  <IconCircle name={group.icon as IconName} size="md" inverse />
                </span>

                <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-accent-light eyebrow">
                  {t(group.label, locale)}
                </p>

                <ul className="mt-4 space-y-3">
                  {group.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="flex flex-col gap-1 border-t border-accent-light/15 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span
                        className={
                          item.pending
                            ? "text-body-base text-paper/45"
                            : "text-body-base text-paper/90"
                        }
                      >
                        {t(item.title, locale)}
                      </span>
                      {item.year && (
                        <span
                          dir="ltr"
                          className="shrink-0 font-mono text-body-sm tabular-nums text-accent-light"
                        >
                          {item.year}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
