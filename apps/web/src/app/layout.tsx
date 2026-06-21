import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root layout is intentionally a pass-through: the real <html>/<body> (with
 * locale-dependent `lang` + `dir`) is rendered by src/app/[locale]/layout.tsx.
 * This keeps direction and document language tied to the route locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
