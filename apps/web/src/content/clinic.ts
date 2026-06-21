import type { LocalizedString } from "./types";

/**
 * The Clinic page content, authored bilingually ({ he, en }) from COPY-DECK.md
 * §"PAGE 4 — The Clinic". Hebrew is canonical; English is the parallel version,
 * not a translation. Founder-review items (parking/transit) carry the strongest
 * placeholder draft and ship once the founder supplies specifics.
 */

/** Atmosphere hero — eyebrow, calm headline, anxiety-reducing intro, photo caption. */
export const atmosphere = {
  eyebrow: {
    he: "המרפאה",
    en: "The clinic",
  } satisfies LocalizedString,
  headline: {
    he: "מקום פרטי, שקט, שנבנה כדי שתרגישו בנוח.",
    en: "A private, quiet space, built so you feel at ease.",
  } satisfies LocalizedString,
  body: {
    he: "אצלנו לא תרגישו כמו עוד תור בתור. המרפאה פרטית ושקטה, הקבלה דיסקרטית, והזמן שלכם הוא שלכם. אנחנו יודעים שכבר הגעתם עד לכאן — נשתדל שזה יהיה הצעד הקל בתהליך.",
    en: "Here you won't feel like one more name on a list. The clinic is private and quiet, the reception is discreet, and your time is your own. We know it took something to get here — we'll make this the easy part.",
  } satisfies LocalizedString,
  photoCaption: {
    he: "המרפאה — מגדל רסיטל, תל אביב",
    en: "The clinic — Recital Tower, Tel Aviv",
  } satisfies LocalizedString,
  photoAlt: {
    he: "המרפאה של ד\"ר נעם כתרי — מגדל רסיטל, תל אביב",
    en: "Dr. Noam Kitrey's clinic — Recital Tower, Tel Aviv",
  } satisfies LocalizedString,
} as const;

/** Location + map — eyebrow, headline, address, parking note, a11y map title. */
export const location = {
  eyebrow: {
    he: "מיקום",
    en: "Location",
  } satisfies LocalizedString,
  headline: {
    he: "איך מגיעים.",
    en: "Getting here.",
  } satisfies LocalizedString,
  addressLabel: {
    he: "כתובת",
    en: "Address",
  } satisfies LocalizedString,
  /** Address rendered dir="ltr" for the street-number + floor ordering. */
  address: {
    he: "מרפאות איל, מגדל רסיטל, דרך מנחם בגין 156, תל אביב, קומה 17",
    en: "Ayal Specialist Clinics, Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17",
  } satisfies LocalizedString,
  parkingLabel: {
    he: "חניה ותחבורה ציבורית",
    en: "Parking & public transit",
  } satisfies LocalizedString,
  /** [FOUNDER-REVIEW: parking/transit] — placeholder until the founder supplies specifics. */
  parkingNote: {
    he: "פרטי החניה והתחבורה הציבורית יתווספו בקרוב. בינתיים נשמח לכוון אתכם טלפונית.",
    en: "Parking and public-transit details are coming soon. In the meantime we're glad to guide you by phone.",
  } satisfies LocalizedString,
  /** a11y title for the embedded map iframe / placeholder link. */
  mapTitle: {
    he: "מפה — מיקום המרפאה במגדל רסיטל, תל אביב",
    en: "Map — clinic location at Recital Tower, Tel Aviv",
  } satisfies LocalizedString,
  /** Directions CTA shown over the styled placeholder + as a link beside the map. */
  directionsCta: {
    he: "לניווט ב-Google Maps",
    en: "Open in Google Maps",
  } satisfies LocalizedString,
} as const;

/**
 * The map query string — a single source of truth for both the iframe `src`
 * (when an API key is present) and the directions-link fallback. Plain address
 * so the link degrades gracefully with no key.
 */
export const MAP_QUERY = "Ayal Specialist Clinics, Recital Tower, 156 Menachem Begin Rd, Tel Aviv";

/** What to expect — eyebrow, headline, four calm process steps (anxiety reduction). */
export const expect = {
  eyebrow: {
    he: "מה צפוי",
    en: "What to expect",
  } satisfies LocalizedString,
  headline: {
    he: "מהפנייה הראשונה ועד הליווי המתמשך.",
    en: "From your first message to ongoing care.",
  } satisfies LocalizedString,
  steps: [
    {
      key: "first-contact",
      title: { he: "פנייה ראשונה", en: "First contact" },
      blurb: {
        he: "פונים בטלפון או דרך הטופס. הצוות חוזר אליכם בדיסקרטיות ומתאם מועד שנוח לכם.",
        en: "You reach out by phone or through the form. The office gets back to you discreetly and arranges a time that works for you.",
      },
    },
    {
      key: "first-consultation",
      title: { he: "הייעוץ הראשון", en: "First consultation" },
      blurb: {
        he: "פגישה רגועה ולא ממהרת עם ד\"ר כתרי. מקשיבים, בודקים, ומסבירים בשפה ברורה מה קורה ומה האפשרויות.",
        en: "An unhurried, relaxed meeting with Dr. Kitrey. He listens, examines, and explains in plain language what's going on and what the options are.",
      },
    },
    {
      key: "treatment-plan",
      title: { he: "תוכנית טיפול", en: "Treatment plan" },
      blurb: {
        he: "בונים יחד תוכנית שמתאימה לכם — למצב, לציפיות ולקצב שלכם. אתם מחליטים מתוך הבנה מלאה.",
        en: "Together you build a plan that fits you — your condition, your expectations, your pace. You decide with full understanding.",
      },
    },
    {
      key: "ongoing-care",
      title: { he: "ליווי מתמשך", en: "Ongoing care" },
      blurb: {
        he: "ד\"ר כתרי מלווה את התהליך לאורך זמן, עוקב אחר ההתקדמות ומתאים את הטיפול לפי הצורך.",
        en: "Dr. Kitrey stays with the process over time, follows your progress, and adjusts the treatment as needed.",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    title: LocalizedString;
    blurb: LocalizedString;
  }>,
} as const;

/** SEO — title + meta description from COPY-DECK.md §"SEO block — The Clinic". */
export const seo = {
  title: {
    he: "המרפאה — ד\"ר נעם כתרי · מגדל רסיטל, תל אביב",
    en: "The Clinic — Dr. Noam Kitrey · Recital Tower, Tel Aviv",
  } satisfies LocalizedString,
  description: {
    he: "מרפאה פרטית ודיסקרטית בדרך מנחם בגין 156, תל אביב. מה צפוי בפנייה ובייעוץ הראשון אצל ד\"ר נעם כתרי, ואיך מגיעים.",
    en: "A private, discreet clinic at 156 Menachem Begin Rd, Tel Aviv. What to expect at your first consultation with Dr. Noam Kitrey, and how to get here.",
  } satisfies LocalizedString,
} as const;
