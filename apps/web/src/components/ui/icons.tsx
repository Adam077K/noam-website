import type { SVGProps } from "react";

/**
 * Thin-stroke line icons (Phosphor-light aesthetic), authored inline so the site
 * ships zero icon-library weight. Stroke width is standardised at 1.5 and every
 * icon inherits `currentColor` so it tints from the parent (e.g. the accent
 * inside an IconCircle). `aria-hidden` by default — icons are decorative; the
 * adjacent text carries the meaning.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export type IconName =
  | "pulse"
  | "timer"
  | "shield"
  | "drop"
  | "waves"
  | "compass"
  | "arrow"
  | "phone"
  | "play"
  | "shieldCheck"
  | "user"
  | "spark";

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = ICONS[name];
  return <Cmp {...props} />;
}

function Pulse(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3.5l2-6 4 12 2.5-9 1.8 3H21" />
    </svg>
  );
}

function Timer(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.5 2.5M9.5 2.5h5M12 2.5V6" />
    </svg>
  );
}

function Shield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 2.5v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10v-5L12 3z" />
    </svg>
  );
}

function Drop(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c3.2 3.6 5.5 6.5 5.5 9.5a5.5 5.5 0 11-11 0c0-3 2.3-5.9 5.5-9.5z" />
      <path d="M9.5 14a2.5 2.5 0 002.5 2.5" opacity="0.5" />
    </svg>
  );
}

function Waves(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 2 2M3 15.5c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 2 2" />
    </svg>
  );
}

function Compass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

function Arrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16 16 0 014.5 6.2 2 2 0 016.5 4z" />
    </svg>
  );
}

function Play(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 6.5l9 5.5-9 5.5V6.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShieldCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 2.5v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10v-5L12 3z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

function User(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0113 0" />
    </svg>
  );
}

function Spark(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7L12 3.5z" />
    </svg>
  );
}

const ICONS: Record<IconName, (p: IconProps) => React.JSX.Element> = {
  pulse: Pulse,
  timer: Timer,
  shield: Shield,
  drop: Drop,
  waves: Waves,
  compass: Compass,
  arrow: Arrow,
  phone: Phone,
  play: Play,
  shieldCheck: ShieldCheck,
  user: User,
  spark: Spark,
};
