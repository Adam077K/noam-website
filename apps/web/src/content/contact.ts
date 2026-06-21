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
  eyebrow: { he: "יצירת קשר", en: "Contact" } satisfies LocalizedString,
  headline: {
    he: "הצעד הראשון קל יותר ממה שנדמה.",
    en: "The first step is easier than it seems.",
  } satisfies LocalizedString,
  intro: {
    he: "אפשר לפנות בטלפון, במייל, או דרך הטופס שבהמשך. כל פנייה נענית באופן אישי ובדיסקרטיות מלאה.",
    en: "You can reach us by phone, by email, or through the form below. Every inquiry is answered personally and in full confidence.",
  } satisfies LocalizedString,
  phoneLabel: { he: "טלפון", en: "Phone" } satisfies LocalizedString,
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
  /** Lead, emphasised. */
  lead: {
    he: "הפנייה שלך נשמרת בסודיות מלאה.",
    en: "Your inquiry is kept in complete confidence.",
  } satisfies LocalizedString,
  /** Body that follows the lead, same paragraph. */
  body: {
    he: "הפרטים שתמסרו מגיעים ישירות לד\"ר כתרי בלבד, ולא יועברו לעולם לאף גורם אחר. אין כאן תיק גלוי, אין רשימות, ואין שיתוף עם צד שלישי — רק שיחה דיסקרטית בינך לבין הרופא.",
    en: "The details you share go directly to Dr. Kitrey alone, and are never passed to anyone else. There's no open file, no list, no sharing with any third party — only a discreet conversation between you and the doctor.",
  } satisfies LocalizedString,
  /** Short form, used as the caption under the submit button. */
  short: {
    he: "פנייתך מטופלת בסודיות מלאה. פרטיך לא יועברו לגורם שלישי.",
    en: "Your inquiry is handled with complete discretion. Your details are never shared with any third party.",
  } satisfies LocalizedString,
} as const;

/** Section 3 — the form: heading, subhead, per-field copy, and static states. */
export const contactForm = {
  heading: {
    he: "השאירו פנייה",
    en: "Send an inquiry",
  } satisfies LocalizedString,
  subhead: {
    he: "מלאו את הפרטים ונחזור אליכם בהקדם, בדיסקרטיות מלאה.",
    en: "Fill in your details and we'll get back to you soon, in full confidence.",
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
      he: "איך עדיף ליצור אתך קשר?",
      en: "How would you prefer we reach you?",
    } satisfies LocalizedString,
  },
  message: {
    label: { he: "הודעה (לא חובה)", en: "Message (optional)" } satisfies LocalizedString,
    placeholder: {
      he: "כל פרט שתרצו לשתף — לשיקול דעתכם בלבד.",
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
      en: "I have read and agree that my inquiry will be handled in full confidence.",
    } satisfies LocalizedString,
  },

  submit: {
    he: "שליחת הפנייה",
    en: "Send inquiry",
  } satisfies LocalizedString,
  submitting: {
    he: "שולח…",
    en: "Sending…",
  } satisfies LocalizedString,

  /** Title shown alongside the success result message (from resultCopy). */
  successTitle: {
    he: "הפנייה נשלחה",
    en: "Your inquiry was sent",
  } satisfies LocalizedString,
  /** Auto-reply note shown in the success panel when an email was provided. */
  autoReplyNote: {
    he: "אם השארתם דוא\"ל, נשלח אליכם אישור קבלה אוטומטי.",
    en: "If you left an email, a confirmation has been sent to your inbox.",
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
    label: { he: "אורולוגיה פונקציונלית", en: "Functional urology" },
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
