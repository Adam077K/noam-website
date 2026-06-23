import Link from "next/link";
import { Card } from "./card";
import { IconCircle } from "./icon-circle";
import { Icon, type IconName } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Service teaser card — ref-#3 style.
 * Mist icon-circle top → title (h3) → one-line blurb → quiet "learn more" link.
 * The whole card is a single link; trailing arrow mirrors under RTL.
 * On hover: border warms to mist-soft, shadow lifts (via Card).
 * Rounded 20px, generous padding, 8px gap scale.
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
      className="group/card block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2"
      style={{ "--index": index } as React.CSSProperties}
    >
      <Card interactive className="flex h-full flex-col gap-5 p-6 sm:p-7">
        <IconCircle name={icon} size="lg" />
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-[1.375rem] font-semibold leading-snug tracking-tight text-ink">
            {title}
          </h3>
          <p className="text-[0.9375rem] leading-relaxed text-slate">{blurb}</p>
        </div>
        <span
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-80",
            "opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100",
          )}
        >
          {cue}
          <Icon
            name="arrow"
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-200 rtl:rotate-180 group-hover/card:translate-x-0.5 rtl:group-hover/card:-translate-x-0.5"
          />
        </span>
      </Card>
    </Link>
  );
}
