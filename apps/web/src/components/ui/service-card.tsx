import Link from "next/link";
import { Card } from "./card";
import { IconCircle } from "./icon-circle";
import { Icon, type IconName } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Service teaser card: soft-blue icon circle → title → one-line blurb → a quiet
 * "learn more" affordance that resolves on hover. The whole card is a single link
 * (the title sits in the accessible name); the trailing arrow mirrors under RTL.
 * Hover warms the border and lifts the shadow via the underlying Card.
 */
export function ServiceCard({
  href,
  icon,
  title,
  blurb,
  cue,
  index = 0,
}: {
  href: string;
  icon: IconName;
  title: string;
  blurb: string;
  cue: string;
  index?: number;
}) {
  return (
    <Link
      href={href}
      className="group/card block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{ "--index": index } as React.CSSProperties}
    >
      <Card interactive className="flex h-full flex-col gap-4 p-7 sm:p-8">
        <IconCircle name={icon} size="lg" />
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-display-md font-semibold text-ink">{title}</h3>
          <p className="text-body-sm text-slate">{blurb}</p>
        </div>
        <span
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent",
            "opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100",
          )}
        >
          {cue}
          <Icon
            name="arrow"
            aria-hidden
            className="h-3.5 w-3.5 rtl:rotate-180 transition-transform duration-200 group-hover/card:translate-x-0.5 rtl:group-hover/card:-translate-x-0.5"
          />
        </span>
      </Card>
    </Link>
  );
}
