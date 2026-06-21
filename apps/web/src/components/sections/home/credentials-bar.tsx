import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { credentials } from "@/content/home";
import { CredentialBadge, Eyebrow, Reveal } from "@/components/ui";

const ICONS = ["shieldCheck", "compass", "spark", "user"] as const;

/**
 * Credentials belt — the trust moat. Four authority items rendered as flat badges
 * on a paper surface, framed by hairline rules so it reads as a deliberate "belt"
 * between the hero and the service grid. Two columns on tablet, four on desktop;
 * each badge fades in on a short stagger. The rarest credential (the EAU Clinical
 * Guidelines Committee chair) is `featured` so the row reads as a hierarchy with a
 * clear lead, not four interchangeable chips.
 */
export function CredentialsBar({ locale }: { locale: Locale }) {
  return (
    <section className="border-y border-border bg-paper px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow withRule className="mb-8">
            {t(credentials.eyebrow, locale)}
          </Eyebrow>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.items.map((item, i) => (
            <Reveal as="li" key={item.key} delay={i * 80}>
              <CredentialBadge
                institution={t(item.institution, locale)}
                title={t(item.title, locale)}
                icon={ICONS[i] ?? "shieldCheck"}
                tone="light"
                featured={item.key === "eau"}
                className="h-full"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
