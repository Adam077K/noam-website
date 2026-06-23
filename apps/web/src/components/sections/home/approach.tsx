import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { trust } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaSlot } from "@/components/ui/media-slot";
import { InView } from "@/components/ui/in-view";

/**
 * Authority / Feature band — ref #3 structure.
 *
 * Two-column split: clinic photo slot (start) + text block (end).
 * On mobile: stacks, photo first.
 * Eyebrow → h2 → body → 3 pillar chips.
 * Photo uses MediaSlot (intentional placeholder, object-fit:cover ready).
 */
export function Approach({ locale }: { locale: Locale }) {
  return (
    <Section tone="canvas" id="approach">
      <div className="grid items-center gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">

        {/* ── MEDIA SLOT ──────────────────────────────────────────── */}
        <InView motion="fade-in-up" delay={0} className="w-full">
          <MediaSlot
            ratio="4/5"
            alt={t(
              {
                he: 'ד"ר כתרי במרפאה — אורולוגיה תפקודית ורפואה מינית',
                en: "Dr. Kitrey in clinic — functional urology and sexual medicine",
              },
              locale,
            )}
            caption={t(
              { he: "מרפאה פרטית · תל אביב", en: "Private clinic · Tel Aviv" },
              locale,
            )}
            slot="approach-clinic"
            blob
            monogram="NK"
            className="mx-auto w-full max-w-[420px] lg:max-w-none"
          />
        </InView>

        {/* ── TEXT BLOCK ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <InView as="div" motion="fade-in-up" delay={80}>
            <Eyebrow tone="default" withRule>
              {t(trust.eyebrow, locale)}
            </Eyebrow>
          </InView>

          <InView as="h2" motion="fade-in-up" delay={130}
            className="max-w-[20ch] text-balance text-[length:var(--text-display-md)] font-semibold leading-[var(--text-display-md--line-height)] tracking-[var(--text-display-md--letter-spacing)] text-ink"
          >
            {t(trust.headline, locale)}
          </InView>

          <InView as="p" motion="fade-in-up" delay={180}
            className="max-w-[50ch] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-ink-80"
          >
            {t(trust.body, locale)}
          </InView>

          {/* Three pillars */}
          <ul className="mt-2 flex flex-col gap-5">
            {trust.pillars.map((pillar, i) => (
              <InView
                key={pillar.key}
                as="li"
                motion="fade-in-up"
                delay={240 + i * 70}
                className="flex gap-4 border-t border-border pt-5"
              >
                {/* Mist dot accent */}
                <span
                  aria-hidden
                  className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mist"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[length:var(--text-body-base)] font-semibold leading-snug text-ink">
                    {t(pillar.title, locale)}
                  </span>
                  <span className="text-[length:var(--text-body-sm)] leading-[var(--text-body-sm--line-height)] text-slate">
                    {t(pillar.blurb, locale)}
                  </span>
                </div>
              </InView>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
