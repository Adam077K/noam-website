import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { video } from "@/content/home";
import { Eyebrow, Reveal, VideoSlot, Icon } from "@/components/ui";

/**
 * Video intro. Soft wash band, asymmetric split: video slot on one side, the
 * doctor's pull-quote on the other. The quote is set in a weight-500 face (no
 * italic — Hebrew has none) with a large accent quotation mark. Mobile stacks
 * video-first. The pull-quote is a founder-voice draft pending approval.
 */
export function VideoIntro({ locale }: { locale: Locale }) {
  return (
    <section className="bg-wash px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-1 lg:order-2">
          <VideoSlot
            slot="intro-video"
            label={t(video.headline, locale)}
            caption={t(video.placeholderSubtitle, locale)}
          />
        </Reveal>

        <div className="order-2 lg:order-1">
          <Reveal>
            <Eyebrow withRule>{t(video.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-display-lg text-ink">{t(video.headline, locale)}</h2>
          </Reveal>
          <Reveal delay={120}>
            <figure className="mt-6">
              <Icon
                name="spark"
                aria-hidden
                className="mb-3 h-6 w-6 text-accent"
              />
              <blockquote className="text-display-md font-medium leading-snug text-ink-80">
                {t(video.quote, locale)}
              </blockquote>
              <figcaption className="mt-4 text-body-sm font-medium text-slate-strong">
                {t(video.quoteAttribution, locale)}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
