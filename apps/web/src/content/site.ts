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
  role: {
    he: "ראש היחידה לאורולוגיה תפקודית ואנדרולוגיה, מרכז שיבא",
    en: "Head of Functional Urology & Andrology, Sheba Medical Center",
  } satisfies LocalizedString,
};

/** Routes are locale-prefixed; `path` is appended to `/{locale}`. */
export const nav: ReadonlyArray<{ key: string; href: string; label: LocalizedString }> = [
  { key: "home", href: "", label: { he: "ראשי", en: "Home" } },
  { key: "about", href: "/about", label: { he: "אודות", en: "About" } },
  { key: "expertise", href: "/expertise", label: { he: "שירותים", en: "Expertise" } },
  { key: "clinic", href: "/clinic", label: { he: "הקליניקה", en: "Clinic" } },
  { key: "contact", href: "/contact", label: { he: "צור קשר", en: "Contact" } },
];

export const cta = {
  // The site runs a discreet inquiry flow — there is no public booking calendar.
  // Header/mobile CTA uses consultation language consistent with Home/Contact.
  consult: {
    he: "לפנייה לייעוץ",
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
    he: 'כל הזכויות שמורות',
    en: "All rights reserved",
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
