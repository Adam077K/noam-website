import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { story } from "@/content/about";
import { InView } from "@/components/ui";
import { SectionHead } from "@/components/sections/home/journal";

/**
 * The Story — the body of the journal profile, set as editorial PROSE.
 *
 * Composition (distinct from every other section): an asymmetric two-column
 * reading spread. The PRIMARY column carries the founder-voice argument with a
 * DROP-CAP opening — the first letter set in the editorial serif at chapter scale,
 * the signature of a long-form magazine profile. The MARGIN column carries
 * scholarly MARGINALIA — hairline-led side-notes that annotate the prose with the
 * verified record (Sheba, EAU, the private practice).
 *
 * On mobile the margin collapses BELOW the prose as inline notes. RTL-correct via
 * logical properties throughout; the drop-cap floats to the start side in both
 * directions because `first-letter:float-start` is logical.
 */
export function AboutStory({ locale }: { locale: Locale }) {
  const [lede, ...rest] = story.paragraphs;

  return (
    <section className="bg-canvas px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          folio="02"
          title={story.eyebrow}
          locale={locale}
        />

        <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-16">
          {/* PRIMARY — the prose, opening with a serif drop-cap. */}
          <div className="max-w-[62ch]">
            <h2 className="text-pretty font-editorial text-display-lg text-ink">
              <InView as="span" className="block">
                {t(story.headline, locale)}
              </InView>
            </h2>

            <InView
              as="p"
              motion="fade-in-up"
              delay={120}
              className="mt-9 text-body-lg leading-relaxed text-ink-80 first-letter:float-start first-letter:me-3 first-letter:mt-1 first-letter:font-editorial first-letter:text-[3.4em] first-letter:leading-[0.72] first-letter:text-accent"
            >
              {t(lede, locale)}
            </InView>

            {rest.map((para, i) => (
              <InView
                as="p"
                motion="fade-in-up"
                delay={160 + i * 80}
                key={i}
                className="mt-7 text-body-lg leading-relaxed text-ink-80"
              >
                {t(para, locale)}
              </InView>
            ))}
          </div>

          {/* MARGIN — scholarly marginalia annotating the prose. */}
          <aside className="lg:pt-2">
            <p className="mb-6 text-caption uppercase tracking-[0.2em] text-slate eyebrow">
              {t({ he: "הערות שוליים", en: "In the margin" }, locale)}
            </p>
            <ul className="space-y-7">
              {story.marginalia.map((note, i) => (
                <InView
                  as="li"
                  motion="fade-in-up"
                  delay={i * 90}
                  key={note.key}
                  className="border-t border-ink/15 pt-4"
                >
                  <p className="flex items-center gap-2.5 text-caption uppercase tracking-[0.16em] text-slate-strong eyebrow">
                    <span aria-hidden className="inline-block h-px w-4 bg-accent" />
                    {t(note.label, locale)}
                  </p>
                  <p className="mt-2.5 text-body-sm leading-snug text-slate">
                    {t(note.note, locale)}
                  </p>
                </InView>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
