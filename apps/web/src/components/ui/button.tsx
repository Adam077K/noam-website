import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link" | "inverse";
type Size = "md" | "lg";

const SIZE: Record<Size, string> = {
  md: "h-11 px-5 text-body-sm",
  lg: "h-13 px-6 text-body-base",
};

const VARIANT: Record<Variant, string> = {
  // Bright medical blue, white text. Lifts 1px and deepens on hover; presses on active.
  primary:
    "bg-accent text-paper shadow-card hover:bg-accent-hover hover:-translate-y-px hover:shadow-card-hover active:translate-y-0 active:scale-[0.98]",
  // Hairline outline that warms to an accent-tinted border + faint wash on hover.
  ghost:
    "bg-transparent text-ink ring-1 ring-border hover:bg-surface hover:ring-border-accent active:scale-[0.98]",
  // Inline text link — accent, with an animated underline via the group/arrow shift.
  link: "bg-transparent px-0 text-accent hover:text-accent-hover",
  // Primary CTA recoloured for the dark ink band (white-on-blue stays AA there).
  inverse:
    "bg-accent text-paper shadow-card hover:bg-accent-light hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
};

// Offset color defaults to the paper surface so the ring reads as a crisp gap;
// on tinted/dark sections pass `className="[--focus-offset:theme(colors.wash)]"`
// (or `ink`) so the offset still matches the local surface, not transparent.
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset,theme(colors.paper))]";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show a trailing directional arrow that mirrors under RTL. */
  withArrow?: boolean;
  /** Nest the arrow inside its own circle (premium "button-in-button"). Solid variants only. */
  arrowInCircle?: boolean;
  className?: string;
};

function inner(
  { children, variant = "primary", withArrow, arrowInCircle, size }: CommonProps,
  isLink: boolean,
) {
  const solid = variant === "primary" || variant === "inverse";
  return (
    <span className={cn("inline-flex items-center", solid && arrowInCircle ? "gap-3" : "gap-2")}>
      <span>{children}</span>
      {withArrow &&
        (solid && arrowInCircle ? (
          <span
            aria-hidden
            className={cn(
              "inline-flex items-center justify-center rounded-pill bg-paper/25 transition-transform duration-200",
              size === "lg" ? "h-7 w-7" : "h-6 w-6",
              "group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5",
            )}
          >
            <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
          </span>
        ) : (
          <Icon
            name="arrow"
            aria-hidden
            className={cn(
              "h-4 w-4 transition-transform duration-200 rtl:rotate-180",
              isLink || true ? "group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" : "",
            )}
          />
        ))}
    </span>
  );
}

function classesFor(props: CommonProps) {
  const { variant = "primary", size = "md", className } = props;
  const isLinkVariant = variant === "link";
  return cn(
    "group/btn relative inline-flex items-center justify-center font-medium transition-[background-color,transform,box-shadow,color] duration-200 ease-premium",
    // Solid + ghost buttons share the card system's rounded-lg so the page reads as
    // one design language; only the inline text-link keeps the tight rounded-xs.
    isLinkVariant ? "rounded-xs" : "rounded-lg",
    isLinkVariant ? "" : SIZE[size],
    VARIANT[variant],
    focusRing,
    "disabled:pointer-events-none disabled:opacity-60",
    className,
  );
}

/** Render as a Next.js `Link` when `href` is provided, otherwise a real `<button>`. */
export function Button(
  props: CommonProps &
    (
      | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
      | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
    ),
) {
  const { variant, size, withArrow, arrowInCircle, className, children, ...rest } = props;
  const common = { children, variant, size, withArrow, arrowInCircle, className } as CommonProps;

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as { href: string } & Record<string, unknown>;
    // For the underlined link variant, render an animated underline rule.
    return (
      <Link href={href} className={classesFor(common)} {...linkRest}>
        {variant === "link" ? <LinkInner common={common} /> : inner(common, true)}
      </Link>
    );
  }

  return (
    <button className={classesFor(common)} {...(rest as ComponentProps<"button">)}>
      {variant === "link" ? <LinkInner common={common} /> : inner(common, false)}
    </button>
  );
}

/** Text-link content with the animated scaleX underline (origin flips under RTL). */
function LinkInner({ common }: { common: CommonProps }) {
  return (
    <span className="relative inline-flex items-center gap-1.5">
      <span className="relative">
        {common.children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-[var(--ul-origin,left)] scale-x-0 bg-current transition-transform duration-200 ease-premium group-hover/btn:scale-x-100 rtl:[--ul-origin:right]"
        />
      </span>
      {common.withArrow && (
        <Icon
          name="arrow"
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-200 rtl:rotate-180 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5"
        />
      )}
    </span>
  );
}
