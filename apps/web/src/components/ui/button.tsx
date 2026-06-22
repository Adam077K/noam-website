import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link" | "inverse";
type Size = "md" | "lg";

const SIZE: Record<Size, string> = {
  md: "h-12 px-6 text-[0.875rem]",   /* min-height 48px per spec */
  lg: "h-14 px-7 text-[1rem]",       /* 56px large CTA */
};

const VARIANT: Record<Variant, string> = {
  /**
   * Primary — ink fill, paper text. Maximum visual weight; the commanding action.
   * Matches the ink-fill treatment used on about-hero and atmosphere-hero.
   * Lightens on hover. Presses with scale on active.
   */
  primary:
    "bg-ink text-paper hover:bg-ink-80 active:scale-[0.98]",
  /**
   * Ghost / secondary — ink outline, transparent fill. Fills mist-tint on hover.
   * Intentionally lighter than primary so hierarchy reads correctly.
   */
  ghost:
    "bg-transparent text-ink ring-1 ring-border hover:bg-mist-50 hover:ring-mist-soft active:scale-[0.98]",
  /**
   * Inline text link — mist underline, no background.
   */
  link: "bg-transparent px-0 text-ink hover:text-ink-80",
  /**
   * Inverse — for dark ink sections (quote-band etc.): mist fill, ink text.
   * Use this on bg-ink backgrounds where the primary ink fill would disappear.
   */
  inverse:
    "bg-mist text-ink hover:bg-mist-hover active:scale-[0.98]",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset,#FFFFFF)]";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Trailing directional arrow, mirrors under RTL. */
  withArrow?: boolean;
  /** Legacy prop — kept for call-site compat, no visual difference. */
  arrowInCircle?: boolean;
  className?: string;
};

function inner({ children, withArrow, size }: CommonProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{children}</span>
      {withArrow && (
        <Icon
          name="arrow"
          aria-hidden
          className={cn(
            "transition-transform duration-200 rtl:rotate-180 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5",
            size === "lg" ? "h-[1rem] w-[1rem]" : "h-[0.875rem] w-[0.875rem]",
          )}
        />
      )}
    </span>
  );
}

function classesFor(props: CommonProps) {
  const { variant = "primary", size = "md", className } = props;
  const isLinkVariant = variant === "link";
  return cn(
    "group/btn relative inline-flex items-center justify-center font-semibold transition-[background-color,transform,box-shadow,color,ring-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
    /* pill shape for all solid/ghost variants */
    isLinkVariant ? "rounded-sm" : "rounded-full",
    isLinkVariant ? "" : SIZE[size],
    VARIANT[variant],
    focusRing,
    "disabled:pointer-events-none disabled:opacity-55",
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
    return (
      <Link href={href} className={classesFor(common)} {...linkRest}>
        {variant === "link" ? <LinkInner common={common} /> : inner(common)}
      </Link>
    );
  }

  return (
    <button className={classesFor(common)} {...(rest as ComponentProps<"button">)}>
      {variant === "link" ? <LinkInner common={common} /> : inner(common)}
    </button>
  );
}

/** Text-link content with animated scaleX underline (origin flips under RTL). */
function LinkInner({ common }: { common: CommonProps }) {
  return (
    <span className="relative inline-flex items-center gap-1.5">
      <span className="relative">
        {common.children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-[var(--ul-origin,left)] scale-x-0 bg-current transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-100 rtl:[--ul-origin:right]"
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
