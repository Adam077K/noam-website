import type { LocalizedString } from "./types";
import type {
  AreaOfInterest,
  PreferredContact,
} from "@/lib/contact/schema";

/**
 * Contact page content, authored bilingually ({ he, en }) from COPY-DECK.md
 * §"PAGE 5 — Contact". Hebrew is canonical; English is the parallel version.
 *
 * Field-error and result-state strings already live in `@/lib/contact/copy`
 * (the action returns stable keys the form resolves there) — this module owns
 * only the *page-facing* copy: contact options, the discretion guarantee, and
 * the form's labels / placeholders / options / static states.
 */

/** Non-mirrored contact facts (phone/email render inside <span dir="ltr">). */
export const contactFacts = {
  /** Primary line, kept in sync with the shared `contact.phone` in site.ts. */
  phonePrimary: "054-7181718",
  /** Secondary clinic line (COPY-DECK §1). */
  phoneSecondary: "079-9698450",
  email: "Dr.Kitrey@gmail.com",
  address: {
    he: "מרפאות איל, מגדל רסיטל, דרך מנחם בגין 156, תל אביב, קומה 17",
    en: "Ayal Specialist Clinics, Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17",
  } satisfies LocalizedString,
} as const;

/** Section 1 — contact options (the phone-primary header). */
export const contactIntro = {
  eyebrow: { he: "פנייה", en: "Enquiries" } satisfies LocalizedString,
  /** Small-caps section running-head for the journal masthead. */
  sectionTitle: {
    he: "התכתבות",
    en: "Correspondence",
  } satisfies LocalizedString,
  headline: {
    he: "השורה הראשונה היא הקשה. אחריה זה פשוט.",
    en: "The first line is the hard one. After it, it's simple.",
  } satisfies LocalizedString,
  intro: {
    he: "בטלפון, בכתב, או דרך הטופס. כל פנייה נענית אישית ובסודיות מלאה.",
    en: "By phone, in writing, or through the form. Every enquiry is answered personally and in full confidence.",
  } satisfies LocalizedString,
  /** Serif call-to-action word set at editorial scale (phone-primary). */
  callWord: { he: "להתקשר", en: "Call" } satisfies LocalizedString,
  phoneLabel: { he: "טלפון", en: "Phone" } satisfies LocalizedString,
  phoneSecondaryLabel: {
    he: "קו נוסף",
    en: "Second line",
  } satisfies LocalizedString,
  phoneHint: {
    he: "מענה אישי — אפשר פשוט להתקשר.",
    en: "Answered personally — you can simply call.",
  } satisfies LocalizedString,
  emailLabel: { he: 'דוא"ל', en: "Email" } satisfies LocalizedString,
  addressLabel: { he: "כתובת", en: "Address" } satisfies LocalizedString,
} as const;

/** Section 2 — discretion guarantee (NON-NEGOTIABLE, rendered above the form). */
export const discretionGuarantee = {
  eyebrow: {
    he: "סודיות מלאה",
    en: "Complete confidence",
  } satisfies LocalizedString,
  /** Small-caps section running-head for the journal section rule. */
  sectionTitle: {
    he: "התחייבות לדיסקרטיות",
    en: "Our Guarantee",
  } satisfies LocalizedString,
  /** Lead, emphasised. */
  lead: {
    he: "הפנייה שלך נשמרת בסודיות מלאה.",
    en: "Your enquiry is kept in complete confidence.",
  } satisfies LocalizedString,
  /** Body that follows the lead, same paragraph. */
  body: {
    he: "הפרטים שתמסרו מגיעים ישירות לד\"ר כתרי בלבד, ואינם נמסרים לעולם לאף גורם אחר. אין כאן תיק גלוי, אין רשימות, ואין שיתוף עם צד שלישי — רק שיחה דיסקרטית בינך לבין הרופא.",
    en: "The details you share go directly to Dr. Kitrey alone, and are never passed to anyone else. There is no open file, no list, no sharing with any third party — only a discreet conversation between you and the physician.",
  } satisfies LocalizedString,
  /** Short form, used as the caption under the submit button. */
  short: {
    he: "פנייתך מטופלת בסודיות מלאה. פרטיך אינם נמסרים לאיש.",
    en: "Your enquiry is handled in complete confidence. Your details are shared with no one.",
  } satisfies LocalizedString,
} as const;

/** Section 3 — the form: heading, subhead, per-field copy, and static states. */
export const contactForm = {
  /** Small-caps section running-head for the journal section rule. */
  sectionTitle: {
    he: "כתבו אלינו",
    en: "Write to Us",
  } satisfies LocalizedString,
  heading: {
    he: "השארת פנייה",
    en: "Leave an enquiry",
  } satisfies LocalizedString,
  subhead: {
    he: "כמה פרטים, ונחזור אליכם בהקדם — בסודיות מלאה.",
    en: "A few details, and we'll get back to you soon — in full confidence.",
  } satisfies LocalizedString,

  name: {
    label: { he: "שם מלא", en: "Full name" } satisfies LocalizedString,
    placeholder: { he: "השם שלך", en: "Your name" } satisfies LocalizedString,
  },
  phone: {
    label: { he: "טלפון", en: "Phone number" } satisfies LocalizedString,
    placeholder: { he: "05X-XXXXXXX", en: "05X-XXXXXXX" } satisfies LocalizedString,
  },
  email: {
    label: { he: 'דוא"ל (לא חובה)', en: "Email (optional)" } satisfies LocalizedString,
    placeholder: {
      he: "name@example.com",
      en: "name@example.com",
    } satisfies LocalizedString,
  },
  area: {
    label: { he: "נושא הפנייה", en: "Area of interest" } satisfies LocalizedString,
    /** Placeholder option shown first (maps to no selection). */
    placeholder: {
      he: "בחירת נושא (לא חובה)",
      en: "Choose a topic (optional)",
    } satisfies LocalizedString,
  },
  preferredContact: {
    label: {
      he: "איך עדיף שניצור קשר?",
      en: "How would you prefer we reach you?",
    } satisfies LocalizedString,
  },
  message: {
    label: { he: "הודעה (לא חובה)", en: "Message (optional)" } satisfies LocalizedString,
    placeholder: {
      he: "כל מה שתרצו לשתף — לשיקול דעתכם בלבד.",
      en: "Anything you'd like to share — entirely up to you.",
    } satisfies LocalizedString,
    /** Char counter; `{n}` is replaced with the live count. Max is 500. */
    counter: {
      he: "{n}/500 תווים",
      en: "{n}/500 characters",
    } satisfies LocalizedString,
  },
  privacy: {
    label: {
      he: "קראתי ואני מאשר/ת שהפנייה תטופל בסודיות מלאה.",
      en: "I have read and agree my enquiry will be handled in full confidence.",
    } satisfies LocalizedString,
  },

  submit: {
    he: "שליחת הפנייה",
    en: "Send enquiry",
  } satisfies LocalizedString,
  submitting: {
    he: "שולח…",
    en: "Sending…",
  } satisfies LocalizedString,

  /** Title shown alongside the success result message (from resultCopy). */
  successTitle: {
    he: "הפנייה נשלחה",
    en: "Your enquiry was sent",
  } satisfies LocalizedString,
  /** Auto-reply note shown in the success panel when an email was provided. */
  autoReplyNote: {
    he: "אם השארתם דוא\"ל, נשלח אישור קבלה אוטומטי.",
    en: "If you left an email, a confirmation has been sent.",
  } satisfies LocalizedString,
  /** Generic title above any error result message. */
  errorTitle: {
    he: "השליחה לא הושלמה",
    en: "We couldn't send that",
  } satisfies LocalizedString,
  /** Summary shown above the form when one or more fields need fixing. */
  validationSummary: {
    he: "יש לתקן את השדות המסומנים למטה ולשלוח שוב.",
    en: "Please fix the highlighted fields below and submit again.",
  } satisfies LocalizedString,
  /** Required-field marker, read out by screen readers. */
  requiredLabel: {
    he: "שדה חובה",
    en: "required",
  } satisfies LocalizedString,
} as const;

/** Area-of-interest options for the select, in deck order. */
export const areaOfInterestOptions: ReadonlyArray<{
  value: AreaOfInterest;
  label: LocalizedString;
}> = [
  {
    value: "male_sexual_function",
    label: { he: "תפקוד מיני של הגבר", en: "Male sexual function" },
  },
  {
    value: "functional_urology",
    label: { he: "אורולוגיה תפקודית", en: "Functional urology" },
  },
  {
    value: "specialized_care",
    label: { he: "טיפול מתמחה", en: "Specialized care" },
  },
  { value: "other", label: { he: "אחר", en: "Other" } },
  {
    value: "prefer_not_to_say",
    label: { he: "מעדיף/ה לא לפרט", en: "Prefer not to say" },
  },
];

/** Preferred-contact radio options. */
export const preferredContactOptions: ReadonlyArray<{
  value: PreferredContact;
  label: LocalizedString;
}> = [
  { value: "phone", label: { he: "בטלפון", en: "By phone" } },
  { value: "email", label: { he: "במייל", en: "By email" } },
];
