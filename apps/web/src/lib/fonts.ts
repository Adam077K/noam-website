import { Heebo, Inter, Geist_Mono } from "next/font/google";

/**
 * Self-hosted via next/font/google. Hebrew-first bilingual pairing (ART-DIRECTION-V2 §B).
 * - Heebo drives Hebrew (RTL) headings + body.
 * - Inter drives Latin (LTR) headings + body — metric kinship with Heebo keeps locales consistent.
 * - Geist Mono carries numbers, phone, email, tabular data regardless of locale.
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

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
