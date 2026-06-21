import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { story } from "@/content/about";
import { Eyebrow, Reveal } from "@/components/ui";

/**
 * Story / philosophy. A calm editorial two-column rhythm on paper: a sticky
 * heading column on the start side anchors the section while the three
 * founder-voice paragraphs read down the end side. The first paragraph carries a
 * short accent rule and slightly larger lede weight so the section opens with
 * intent. Founder-voice copy is wired as-is, pending approval. Single-column and
 * fully readable on mobile; each paragraph fades in on a short stagger.
 */
export function AboutStory({ locale }: { locale: Locale }) {
  return (
    <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow withRule>{t(story.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 max-w-sm text-balance text-display-lg text-ink">
              {t(story.headline, locale)}
            </h2>
          </Reveal>
        </div>

        <div className="max-w-2xl space-y-6">
          {story.paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 80}>
              <p
                className={
                  i === 0
                    ? "border-s-2 border-accent/50 ps-5 text-body-lg text-ink-80"
                    : "text-body-lg text-slate-strong"
                }
              >
                {t(para, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
