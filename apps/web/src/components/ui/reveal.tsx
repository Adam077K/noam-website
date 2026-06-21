"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-entry reveal. Adds `.fade-in-up` → `.is-visible` (defined in globals.css,
 * which also honours prefers-reduced-motion) once the element crosses ~100px into
 * the viewport, then disconnects (once-only, no scroll-jank). `delay` drives the
 * staggered cascade for grid children. Uses IntersectionObserver — never a scroll
 * listener — per the motion discipline in DESIGN-SYSTEM §6.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // No-IO fallback (very old browsers): reveal on the next tick, not synchronously.
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
      { rootMargin: "0px 0px -100px 0px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("fade-in-up", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
