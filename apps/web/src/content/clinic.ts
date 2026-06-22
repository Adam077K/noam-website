import type { LocalizedString } from "./types";

/**
 * The Clinic page content, authored bilingually ({ he, en }) from
 * COPY-DECK-V2.md §"clinic.ts — PAGE 4 · The Visit" (de-cloned journal voice).
 * Hebrew is canonical and native; English is the parallel version, not a
 * translation. Founder-review items (parking/transit) carry the strongest
 * placeholder draft and ship once the founder supplies specifics.
 */

/** Atmosphere hero — eyebrow, calm headline, anxiety-reducing standfirst, photo caption. */
export const atmosphere = {
  eyebrow: {
    he: "הביקור",
    en: "The visit",
  } satisfies LocalizedString,
  headline: {
    he: "חדר אחד, שקט, שבו יש לכם זמן.",
    en: "One quiet room, where the time is yours.",
  } satisfies LocalizedString,
  body: {
    he: "לא אולם המתנה עמוס ולא תור שנקרא בשם. מרפאה פרטית, קבלה דיסקרטית, ושיחה שלא ממהרת. הגעתם עד לכאן — את החלק הזה נעשה קל.",
    en: "No crowded waiting hall, no name called across a queue. A private clinic, a discreet reception, and a conversation that won't rush. You made it this far — this part we'll make easy.",
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
  /** Dateline standfirst — a short orienting line under the headline. */
  standfirst: {
    he: "קומה 17 במגדל רסיטל, על דרך מנחם בגין. הנה הכתובת המלאה והדרך אליה.",
    en: "The 17th floor of Recital Tower, on Menachem Begin Road. Here is the full address, and the way there.",
  } satisfies LocalizedString,
  addressLabel: {
    he: "כתובת",
    en: "Address",
  } satisfies LocalizedString,
  /** Clean caption beneath the map plate (no "Fig." affectation). */
  mapCaption: {
    he: "מפה — מגדל רסיטל, דרך מנחם בגין 156, תל אביב",
    en: "Map — Recital Tower, 156 Menachem Begin Rd, Tel Aviv",
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
    he: "פרטי חניה ותחבורה יתווספו בקרוב; בינתיים נשמח לכוון טלפונית.",
    en: "Parking and transit details are coming soon; in the meantime we're glad to guide you by phone.",
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

/** What to expect — "The course of a visit": eyebrow, headline, four calm steps. */
export const expect = {
  eyebrow: {
    he: "מהלך הביקור",
    en: "The course of a visit",
  } satisfies LocalizedString,
  headline: {
    he: "מהשורה הראשונה ועד הליווי שאחרי.",
    en: "From the first line to the care that follows.",
  } satisfies LocalizedString,
  /** Itinerary preamble — a calm field-note standfirst before the four steps. */
  standfirst: {
    he: "ארבעה שלבים, בלי הפתעות. כך נראה הביקור — מהשורה הראשונה שתכתבו ועד הליווי שאחרי.",
    en: "Four stages, no surprises. Here is the visit — from the first line you write to the care that follows.",
  } satisfies LocalizedString,
  steps: [
    {
      key: "first-contact",
      title: { he: "פנייה", en: "First contact" },
      blurb: {
        he: "שורה בטלפון או בכתב. חוזרים אליכם בדיסקרטיות ומתאמים מועד נוח.",
        en: "A line by phone or in writing. We reply discreetly and arrange a time that suits you.",
      },
    },
    {
      key: "first-consultation",
      title: { he: "הייעוץ הראשון", en: "First consultation" },
      blurb: {
        he: "פגישה שאינה ממהרת. מקשיבים, בודקים, ומסבירים בשפה ברורה מה קורה ומה האפשרויות.",
        en: "An unhurried meeting. We listen, examine, and explain in plain language what's happening and what the options are.",
      },
    },
    {
      key: "treatment-plan",
      title: { he: "תוכנית טיפול", en: "The plan" },
      blurb: {
        he: "בונים יחד דרך שמתאימה למצב, לציפיות ולקצב שלכם. אתם מחליטים מתוך הבנה מלאה.",
        en: "Together we build a path that fits your situation, expectations, and pace. You decide with full understanding.",
      },
    },
    {
      key: "ongoing-care",
      title: { he: "ליווי מתמשך", en: "Ongoing care" },
      blurb: {
        he: "ד\"ר כתרי נשאר אתכם לאורך הדרך, עוקב ומתאים את הטיפול לפי הצורך.",
        en: "Dr. Kitrey stays with you along the way, following progress and adjusting as needed.",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    title: LocalizedString;
    blurb: LocalizedString;
  }>,
} as const;

/** SEO — title + meta description from COPY-DECK-V2.md §"SEO — Clinic". */
export const seo = {
  title: {
    he: "הביקור — המרפאה של ד\"ר נעם כתרי · מגדל רסיטל, תל אביב",
    en: "The Visit — Dr. Noam Kitrey's Clinic · Recital Tower, Tel Aviv",
  } satisfies LocalizedString,
  description: {
    he: "מרפאה פרטית ודיסקרטית, דרך מנחם בגין 156, תל אביב. מה צפוי בביקור הראשון אצל ד\"ר נעם כתרי, ואיך מגיעים.",
    en: "A private, discreet clinic at 156 Menachem Begin Rd, Tel Aviv. What to expect at your first visit with Dr. Noam Kitrey, and how to get here.",
  } satisfies LocalizedString,
} as const;
