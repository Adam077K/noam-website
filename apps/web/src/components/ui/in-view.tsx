"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Generic scroll-entry primitive. Toggles `.is-visible` on its own element once
 * it crosses ~80px into the viewport, then disconnects (once-only, no jank).
 *
 * Unlike `Reveal` (which is hard-wired to `.fade-in-up`), this composes with any
 * of the v2 editorial motion classes — `mask-reveal`, `rule-draw`, `rule-draw-y`
 * — passed via `motion`/`className`. globals.css owns the keyframes and the
 * prefers-reduced-motion fallback. Uses IntersectionObserver, never a scroll
 * listener, per the motion discipline.
 */
export function InView({
  children,
  as: Tag = "div",
  motion = "mask-reveal",
  delay = 0,
  threshold = 0.01,
  className,
  style,
}: {
  children?: ReactNode;
  as?: ElementType;
  /** Which globals.css motion class to drive. */
  motion?: "mask-reveal" | "rule-draw" | "rule-draw-y" | "fade-in-up" | "none";
  delay?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setVisible(true));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold },
    );
    observer.observe(el);
    // Safety net: never let an element stay hidden if IO somehow misfires
    // (tab restore, layout race). Forces the revealed state after 1.4s.
    const failsafe = window.setTimeout(() => setVisible(true), 1400);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={cn(motion !== "none" && motion, visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
    >
      {children}
    </Tag>
  );
}
