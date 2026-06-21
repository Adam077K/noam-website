import { Heebo, Inter, Geist_Mono, Frank_Ruhl_Libre, Fraunces } from "next/font/google";

/**
 * Editorial bilingual type system (v2 "Quiet Authority").
 *
 * DISPLAY (the design's voice) — high-contrast serifs, used at dramatic scale:
 * - Frank Ruhl Libre drives Hebrew (RTL) editorial headings.
 * - Fraunces drives Latin (LTR) editorial headings — optical sizing on for the big cuts.
 *
 * TEXT / UI (the counterpoint) — clean grotesks, small, for legibility:
 * - Heebo (HE) and Inter (EN) carry body, eyebrows, nav, captions.
 * - Geist Mono carries numbers, phone, email, the index numerals, tabular data.
 */
export const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heebo",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-frank",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
