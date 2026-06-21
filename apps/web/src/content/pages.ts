import type { LocalizedString } from "./types";

/**
 * Minimal per-route shell copy (eyebrow + H1 + lede) so navigation works
 * end-to-end. Real Phase 2 sections replace these page bodies; the chrome
 * and content-layer plumbing stay.
 */
export type PageShell = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  lede: LocalizedString;
};

export const pages: Record<"home" | "about" | "expertise" | "clinic" | "contact", PageShell> = {
  home: {
    eyebrow: { he: "מומחה בבריאות הגבר", en: "Specialist in Men's Health" },
    title: { he: 'ד"ר נעם קיטרי', en: "Dr. Noam Kitrey" },
    lede: {
      he: "ראש היחידה לאורולוגיה תפקודית ואנדרולוגיה במרכז שיבא. טיפול אישי, דיסקרטי ומבוסס-ראיות בבריאות הגבר.",
      en: "Head of Functional Urology & Andrology at Sheba Medical Center. Personal, discreet, evidence-based care in men's health.",
    },
  },
  about: {
    eyebrow: { he: "אודות", en: "About" },
    title: { he: "ניסיון של למעלה משני עשורים", en: "More Than Two Decades of Experience" },
    lede: {
      he: "רופא בכיר עם מומחיות באורולוגיה תפקודית, אנדרולוגיה וטיפול בהפרעות בתפקוד המיני. הסיפור המלא יתווסף בקרוב.",
      en: "A senior physician specialising in functional urology, andrology, and the treatment of sexual dysfunction. The full story is coming soon.",
    },
  },
  expertise: {
    eyebrow: { he: "תחומי מומחיות", en: "Areas of Expertise" },
    title: { he: "שירותים", en: "Expertise" },
    lede: {
      he: "מגוון רחב של טיפולים בבריאות הגבר ובאורולוגיה תפקודית. פירוט מלא של התחומים יתווסף בקרוב.",
      en: "A broad range of treatments across men's health and functional urology. Full detail of each area is coming soon.",
    },
  },
  clinic: {
    eyebrow: { he: "הקליניקה", en: "The Clinic" },
    title: { he: "סביבה פרטית ודיסקרטית", en: "A Private, Discreet Setting" },
    lede: {
      he: "הקליניקה ממוקמת במגדל רסיטל בתל אביב, בסביבה שקטה ומכבדת. פרטים נוספים יתווספו בקרוב.",
      en: "Located in the Resital Tower in Tel Aviv, in a calm and respectful setting. More details are coming soon.",
    },
  },
  contact: {
    eyebrow: { he: "צור קשר", en: "Get in Touch" },
    title: { he: "קביעת תור", en: "Book an Appointment" },
    lede: {
      he: "פנייה דיסקרטית לתיאום ייעוץ פרטי. טופס יצירת הקשר וטופס הזימון המלא יתווספו בקרוב.",
      en: "Reach out discreetly to arrange a private consultation. The full contact and booking form is coming soon.",
    },
  },
};
