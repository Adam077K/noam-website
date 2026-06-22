import type { LocalizedString } from "./types";

/**
 * Site-wide content: brand identity, navigation, contact facts.
 * Authored bilingually; the canonical source for chrome + footer copy.
 * Phase 2 page sections extend the per-page modules below.
 */

export const brand = {
  name: {
    he: 'ד"ר נעם כתרי',
    en: "Dr. Noam Kitrey",
  } satisfies LocalizedString,
  // Recast as a masthead credential line (was a plain title).
  role: {
    he: "אורולוגיה תפקודית ורפואה מינית · מרכז רפואי שיבא",
    en: "Functional Urology & Sexual Medicine · Sheba Medical Center",
  } satisfies LocalizedString,
  // Journal running-head, sits in the header beside the name.
  masthead: {
    he: "כתב־עת קליני · גיליון המרפאה",
    en: "A Clinical Record · The Practice Edition",
  } satisfies LocalizedString,
};

/** Routes are locale-prefixed; `path` is appended to `/{locale}`. Journal "contents" labels. */
export const nav: ReadonlyArray<{ key: string; href: string; label: LocalizedString }> = [
  { key: "home", href: "", label: { he: "המרפאה", en: "The Practice" } },
  { key: "about", href: "/about", label: { he: "הרופא", en: "The Physician" } },
  { key: "expertise", href: "/expertise", label: { he: "תחומי הטיפול", en: "Subjects of Care" } },
  { key: "clinic", href: "/clinic", label: { he: "הביקור", en: "The Visit" } },
  { key: "contact", href: "/contact", label: { he: "פנייה", en: "Enquiries" } },
];

export const cta = {
  // The site runs a discreet inquiry flow — there is no public booking calendar.
  // Header/mobile CTA uses consultation language consistent with Home/Contact.
  consult: {
    he: "לבקשת ייעוץ",
    en: "Request a Consultation",
  } satisfies LocalizedString,
};

/** Non-mirrored facts — phone/email/stat numbers render inside <span dir="ltr">. */
export const contact = {
  phone: "054-7181718",
  email: "Dr.Kitrey@gmail.com",
  address: {
    he: 'מגדל רסיטל, דרך מנחם בגין 156, תל אביב, קומה 17',
    en: "Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17",
  } satisfies LocalizedString,
};

export const footer = {
  navHeading: { he: "ניווט", en: "Navigation" } satisfies LocalizedString,
  contactHeading: { he: "צור קשר", en: "Contact" } satisfies LocalizedString,
  phoneLabel: { he: "טלפון", en: "Phone" } satisfies LocalizedString,
  emailLabel: { he: 'דוא"ל', en: "Email" } satisfies LocalizedString,
  addressLabel: { he: "כתובת", en: "Address" } satisfies LocalizedString,
  rights: {
    he: 'כל הזכויות שמורות · ד"ר נעם כתרי',
    en: "All rights reserved · Dr. Noam Kitrey",
  } satisfies LocalizedString,
  /** Privacy reassurance line in the footer. */
  privacyNote: {
    he: "כל פנייה נשמרת בסודיות מלאה. פרטיכם אינם נמסרים לאיש.",
    en: "Every enquiry is kept in full confidence. Your details are shared with no one.",
  } satisfies LocalizedString,
  /** Journal colophon line. */
  colophon: {
    he: 'נערך ומטופל על ידי ד"ר נעם כתרי, תל אביב.',
    en: "Edited and attended by Dr. Noam Kitrey, Tel Aviv.",
  } satisfies LocalizedString,
};

export const a11y = {
  switchLanguage: {
    he: "שנה שפה / Switch language",
    en: "Switch language / שנה שפה",
  } satisfies LocalizedString,
  openMenu: { he: "פתח תפריט", en: "Open menu" } satisfies LocalizedString,
  closeMenu: { he: "סגור תפריט", en: "Close menu" } satisfies LocalizedString,
  skipToContent: { he: "דלג לתוכן", en: "Skip to content" } satisfies LocalizedString,
};
