import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import { founderReviewNote, type Condition } from "@/content/expertise";
import { Card, IconCircle } from "@/components/ui";
import type { IconName } from "@/components/ui";

/**
 * A single condition within a group. Shares the ServiceCard anatomy exactly —
 * soft-blue icon circle → title → explanatory body — but is an *anchor target*
 * rather than a link (the group carries one micro-CTA, so the card itself doesn't
 * navigate). Hover/focus-within still warm the surface so it reads as a live,
 * scannable element. `scroll-mt` clears the sticky header (h-16 → lg:h-[72px])
 * so deep links and the Home preview land with the title in view, not under chrome.
 */
export function ConditionCard({
  condition,
  locale,
}: {
  condition: Condition;
  locale: Locale;
}) {
  return (
    <Card
      interactive
      className="group/condition flex h-full scroll-mt-24 flex-col gap-4 p-7 target:border-border-accent target:shadow-card-hover focus-within:border-border-accent sm:p-8 lg:scroll-mt-28"
    >
      {/* Anchor target sits on the card so `:target` highlighting tracks the link. */}
      <span id={condition.anchor} className="sr-only" />
      <IconCircle name={condition.icon as IconName} size="lg" />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-display-md font-semibold text-ink">
          {t(condition.title, locale)}
        </h3>
        <p className="text-body-sm leading-relaxed text-slate">
          {t(condition.body, locale)}
        </p>
      </div>
      {condition.founderReview && (
        <p className="mt-1 border-t border-border/70 pt-3 text-eyebrow font-medium uppercase tracking-[0.1em] text-slate">
          {t(founderReviewNote, locale)}
        </p>
      )}
    </Card>
  );
}
