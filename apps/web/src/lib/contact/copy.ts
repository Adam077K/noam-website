import type { Locale } from "@/i18n/config";
import type { LocalizedString } from "@/content/types";
import type {
  AreaOfInterest,
  ContactFieldErrorKey,
  PreferredContact,
} from "./schema";

/**
 * Bilingual copy for the contact backend: field-error messages (resolved by
 * the UI from the keys the action returns) and the human-readable labels used
 * inside the notification email. Strings come verbatim from COPY-DECK.md §5.
 */

/** Field-error key → bilingual message. */
export const fieldErrorCopy: Record<ContactFieldErrorKey, LocalizedString> = {
  name_too_short: {
    he: "נא להזין שם מלא (לפחות 2 תווים).",
    en: "Please enter your full name (at least 2 characters).",
  },
  name_too_long: {
    he: "השם ארוך מדי (עד 80 תווים).",
    en: "Name is too long (max 80 characters).",
  },
  phone_invalid: {
    he: "נא להזין מספר נייד ישראלי תקין, למשל 0547181718.",
    en: "Please enter a valid Israeli mobile number, e.g. 0547181718.",
  },
  email_invalid: {
    he: "כתובת הדוא״ל אינה תקינה.",
    en: "That email address doesn't look valid.",
  },
  preferred_contact_required: {
    he: "נא לבחור איך עדיף ליצור אתך קשר.",
    en: "Please choose how you'd prefer we reach you.",
  },
  message_too_long: {
    he: "ההודעה ארוכה מדי (עד 500 תווים).",
    en: "Message is too long (max 500 characters).",
  },
  privacy_required: {
    he: "יש לאשר שהפנייה תטופל בסודיות מלאה.",
    en: "Please confirm your inquiry will be handled in full confidence.",
  },
};

/** Top-level result messages (success / send failure / rate limit). */
export const resultCopy = {
  success: {
    he: "תודה. הפנייה התקבלה והיא תטופל בדיסקרטיות מלאה. נחזור אליכם בהקדם.",
    en: "Thank you. Your inquiry has been received and will be handled in full confidence. We'll be in touch soon.",
  },
  send: {
    he: "משהו השתבש בשליחה. אפשר לנסות שוב, או פשוט להתקשר אלינו: 054-7181718.",
    en: "Something went wrong sending your message. Please try again, or just call us: 054-7181718.",
  },
  rate_limit: {
    he: "התקבלו כמה פניות ברצף. אפשר לנסות שוב עוד מעט, או להתקשר ישירות: 054-7181718.",
    en: "We've received a few inquiries in a row. Please try again shortly, or call us directly: 054-7181718.",
  },
  server: {
    he: "אירעה שגיאה בלתי צפויה. אפשר לנסות שוב, או להתקשר אלינו: 054-7181718.",
    en: "An unexpected error occurred. Please try again, or call us: 054-7181718.",
  },
} satisfies Record<string, LocalizedString>;

/** Human-readable area-of-interest label for the notification email. */
export const areaOfInterestLabel: Record<AreaOfInterest, LocalizedString> = {
  male_sexual_function: { he: "תפקוד מיני של הגבר", en: "Male sexual function" },
  functional_urology: { he: "אורולוגיה פונקציונלית", en: "Functional urology" },
  specialized_care: { he: "טיפול מתמחה", en: "Specialized care" },
  other: { he: "אחר", en: "Other" },
  prefer_not_to_say: { he: "מעדיף/ה לא לפרט", en: "Prefer not to say" },
};

/** Human-readable preferred-contact label for the notification email. */
export const preferredContactLabel: Record<PreferredContact, LocalizedString> = {
  phone: { he: "בטלפון", en: "By phone" },
  email: { he: "במייל", en: "By email" },
};

/** Auto-reply body sent to the submitter (COPY-DECK §5). */
export const autoReplyCopy: Record<Locale, { subject: string; body: string }> = {
  he: {
    subject: "תודה על פנייתך — המרפאה של ד״ר כתרי",
    body: "תודה על פנייתך. המרפאה של ד״ר כתרי תיצור אתך קשר בהקדם. הפנייה נשמרת בסודיות מלאה.",
  },
  en: {
    subject: "Thank you for your inquiry — Dr. Kitrey's office",
    body: "Thank you for your inquiry. Dr. Kitrey's office will be in touch soon. Your message is kept in full confidence.",
  },
};
