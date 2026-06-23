import type { LocalizedString } from "./types";

/**
 * About page content, authored bilingually ({ he, en }) from COPY-DECK-V2.md
 * §"about.ts — PAGE 2 · The Physician". This is the DE-CLONED journal voice that
 * replaces the earlier drkitrey.com-derived text. Hebrew is canonical and native;
 * English is the parallel version, not a translation. Founder-review items
 * (personal voice, languages, legal-sensitive) are wired with the deck's strongest
 * draft as-is — they ship once the founder approves. No facts beyond the deck are
 * invented.
 */

/**
 * Journal running head for the profile — the same "Vol. I" device as Home, recast
 * for The Physician profile. Renders dir="ltr" in the masthead.
 */
export const folio = {
  he: "גיליון א׳ · הרופא",
  en: "Volume I · The Physician",
} satisfies LocalizedString;

/** Section 1 — Hero: eyebrow, headline, personal intro, in-context portrait. */
export const hero = {
  eyebrow: {
    he: "הרופא",
    en: "The physician",
  } satisfies LocalizedString,
  headline: {
    he: "מי שכותב את ההנחיות, יושב גם מולכם בחדר.",
    en: "The man who writes the guidelines also sits across from you in the room.",
  } satisfies LocalizedString,
  /** Personal intro, founder voice — pending founder approval, wired as-is. */
  intro: {
    he: "אני נעם כתרי. רוב חיי המקצועיים עברו על שני הקצוות של אותו תחום — לקבוע כיצד מטפלים במקרים הקשים בעולם, ולשבת עם אדם אחד שמתאר לי בקול נמוך משהו שדחה שנים. שני הקצוות האלה הם אותה רפואה. את שניהם אתם מקבלים כאן.",
    en: "I'm Noam Kitrey. Most of my working life has run along two ends of the same field — setting how the hardest cases are treated worldwide, and sitting with one person describing, quietly, something they put off for years. Those two ends are the same medicine. You get both of them here.",
  } satisfies LocalizedString,
  portraitCaption: {
    he: 'ד"ר נעם כתרי',
    en: "Dr. Noam Kitrey",
  } satisfies LocalizedString,
  portraitAlt: {
    he: 'ד"ר נעם כתרי — אורולוג בכיר, רפואה מינית ותפקודית, מרכז שיבא',
    en: "Dr. Noam Kitrey — Senior Urologist, Sexual & Functional Medicine, Sheba Medical Center",
  } satisfies LocalizedString,
} as const;

/** Section 2 — The Story / Philosophy: eyebrow, headline, three founder-voice paragraphs. */
export const story = {
  eyebrow: {
    he: "דבר הרופא",
    en: "Editor's note",
  } satisfies LocalizedString,
  headline: {
    he: "למה דווקא התחום הזה.",
    en: "Why this field, of all of them.",
  } satisfies LocalizedString,
  /** Three paragraphs, founder voice — pending founder approval, wired as-is. */
  paragraphs: [
    {
      he: "בחרתי בתחום שרוב הרופאים מעדיפים לחלוף לידו, מפני שראיתי כמה הוא מוזנח וכמה רחוק אפשר להחזיר אדם כשמתייחסים אליו ברצינות. מי שמגיע אליי לרוב כבר עבר רופא או שניים שמיהרו, או חיפש תשובות במסכים. הוא לא צריך עוד מישהו שממהר.",
      en: "I chose a field most physicians prefer to walk past, because I saw how neglected it is — and how far a person can be brought back when they're taken seriously. Most who reach me have already seen a doctor or two who rushed, or searched for answers on a screen. They don't need one more person in a hurry.",
    } satisfies LocalizedString,
    {
      he: "עבודה טובה כאן מתחילה באבחנה מדויקת ולא בניחוש. אני בודק עד שאני יודע, ולא מציע טיפול לפני שהבנתי מה הסיבה. רק אז אנחנו בונים יחד דרך — לפי המצב שלכם, הציפיות שלכם והקצב שלכם.",
      en: "Good work here begins with an exact diagnosis, not a guess. I examine until I know, and I don't propose a treatment before I understand the cause. Only then do we build a path together — around your situation, your expectations, your pace.",
    } satisfies LocalizedString,
    {
      he: "מאז 2010 אני בשיבא, ובמקביל יושב בראש ועדה אירופית שקובעת כיצד מטפלים בחבלות אורולוגיות. את אותה רמת אחריות אני מביא לכל פנייה במרפאה — פשוטה ככל שתהיה.",
      en: "I've been at Sheba since 2010, and at the same time I chair a European committee that decides how urological trauma is treated. I bring that same level of responsibility to every enquiry at the clinic — however simple it may be.",
    } satisfies LocalizedString,
  ] satisfies ReadonlyArray<LocalizedString>,
  /**
   * Marginalia — scholarly side-notes that annotate the prose (the asymmetric
   * margin column). Each is a label + a short clause drawn only from the verified
   * record; nothing invented. Renders as a hairline-led note, not a footnote ref.
   */
  marginalia: [
    {
      key: "practice-since",
      label: { he: "במרפאה הפרטית", en: "Private practice" } satisfies LocalizedString,
      note: {
        he: "טיפול דיסקרטי בתל אביב — מי שבודק אתכם הוא מי שמטפל בכם.",
        en: "Discreet care in Tel Aviv — the person who examines you is the one who treats you.",
      } satisfies LocalizedString,
    },
    {
      key: "sheba",
      label: { he: "מרכז שיבא", en: "Sheba Medical Center" } satisfies LocalizedString,
      note: {
        he: "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה והמרכז לבריאות מינית.",
        en: "Head of the Functional Urology & Andrology Unit and the Sexual Health Center.",
      } satisfies LocalizedString,
    },
    {
      key: "eau",
      label: { he: "איגוד האורולוגיה האירופי", en: "European Urology (EAU)" } satisfies LocalizedString,
      note: {
        he: "יו״ר ועדת ההנחיות הקליניות לחבלות אורולוגיות.",
        en: "Chair of the clinical guidelines committee for urological trauma.",
      } satisfies LocalizedString,
    },
  ],
} as const;

/**
 * A single credential row.
 * - `title`  — the role / position (primary, rendered in ink at display size)
 * - `institution` — the org / body (secondary, rendered in slate uppercase label)
 * - `year`   — optional right-aligned mono numeral
 * - `pending` — not yet displayed publicly
 */
type CredentialItem = {
  title: LocalizedString;
  institution?: LocalizedString;
  year?: string;
  pending?: boolean;
};
/** A grouped node on the credential timeline. */
type CredentialGroup = {
  key: string;
  icon: string;
  label: LocalizedString;
  items: ReadonlyArray<CredentialItem>;
};

/**
 * Section 3 — Credentials (detailed). The trust moat, rendered as a structured
 * timeline of grouped credentials. Years render `dir="ltr"`. Only facts from the
 * copy deck appear here; nothing is invented. The languages group is a
 * founder-to-confirm placeholder, surfaced honestly until the founder supplies it.
 */
export const credentials: {
  eyebrow: LocalizedString;
  standfirst: LocalizedString;
  groups: ReadonlyArray<CredentialGroup>;
} = {
  eyebrow: {
    he: "קורות מקצועיים",
    en: "Curriculum",
  } satisfies LocalizedString,
  standfirst: {
    he: "למי שמבקש לבדוק הכול לפני שהוא מרים טלפון.",
    en: "For anyone who wants to verify everything before lifting the phone.",
  } satisfies LocalizedString,
  groups: [
    {
      key: "clinical",
      icon: "shieldCheck",
      label: { he: "תפקידים קליניים", en: "Clinical roles" } satisfies LocalizedString,
      items: [
        {
          title: {
            he: "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה",
            en: "Head of Functional Urology & Andrology Unit",
          },
          institution: {
            he: "המרכז הרפואי שיבא",
            en: "Sheba Medical Center",
          },
        },
        {
          title: {
            he: "מנהל המרכז לבריאות מינית (SHSQ)",
            en: "Director, Sexual Health Center (SHSQ)",
          },
          institution: {
            he: "המרכז הרפואי שיבא",
            en: "Sheba Medical Center",
          },
        },
        {
          title: {
            he: "רופא בכיר",
            en: "Senior Physician",
          },
          institution: {
            he: "המרכז הרפואי שיבא",
            en: "Sheba Medical Center",
          },
          year: "2010",
        },
      ],
    },
    {
      key: "academic",
      icon: "compass",
      label: {
        he: "תפקידים אקדמיים וועדות",
        en: "Academic & committee roles",
      } satisfies LocalizedString,
      items: [
        {
          title: {
            he: 'יו"ר ועדת ההנחיות הקליניות — חבלות אורולוגיות',
            en: "Chair, Clinical Guidelines Committee — Urological Trauma",
          },
          institution: {
            he: "איגוד האורולוגיה האירופי (EAU)",
            en: "European Association of Urology (EAU)",
          },
        },
        {
          title: {
            he: "חבר",
            en: "Member",
          },
          institution: {
            he: 'האיגוד הישראלי לרפואה מינית (היל"ם) והאיגוד האירופי (ESSM)',
            en: "Israeli (HILAM) and European (ESSM) Sexual Medicine Associations",
          },
        },
        {
          // [FOUNDER-REVIEW: legal-sensitive] — wired as-is from the copy deck.
          title: {
            he: "חבר",
            en: "Member",
          },
          institution: {
            he: "הוועדה הלאומית להתאמה מגדרית, משרד הבריאות",
            en: "National Committee for Gender Affirmation, Ministry of Health",
          },
        },
      ],
    },
    {
      key: "education",
      icon: "spark",
      label: { he: "השכלה", en: "Education" } satisfies LocalizedString,
      items: [
        {
          title: {
            he: 'ד"ר לרפואה (M.D.)',
            en: "Doctor of Medicine (M.D.)",
          },
          institution: {
            he: "אוניברסיטת תל אביב",
            en: "Tel Aviv University",
          },
          year: "1997",
        },
      ],
    },
    // [FOUNDER-REVIEW] A Languages node is omitted until the founder supplies the
    // list — a live "to be confirmed" undercut the credibility section. Re-add a
    // group here (key: "languages", icon: "user") once the languages are known.
  ],
};

/** Section 4 — In-context portrait + pull-quote (founder voice, wired as-is). */
export const quote = {
  text: {
    he: "אדם שמרגיש שמקשיבים לו ולא שופטים אותו כבר עשה את החצי הקשה של הדרך.",
    en: "A person who feels heard, not judged, has already done the hard half of the journey.",
  } satisfies LocalizedString,
  attribution: {
    he: 'ד"ר נעם כתרי',
    en: "Dr. Noam Kitrey",
  } satisfies LocalizedString,
  portraitCaption: {
    he: "במרפאה — ייעוץ אישי ולא ממהר",
    en: "At the clinic — an unhurried, personal consultation",
  } satisfies LocalizedString,
  portraitAlt: {
    he: 'ד"ר נעם כתרי במרפאה — ייעוץ אישי ודיסקרטי',
    en: "Dr. Noam Kitrey at the clinic — a personal, discreet consultation",
  } satisfies LocalizedString,
} as const;

/** SEO — About. */
export const seo = {
  title: {
    he: 'הרופא — ד"ר נעם כתרי, אורולוג בכיר, מנהל יחידה בשיבא',
    en: "The Physician — Dr. Noam Kitrey, Senior Urologist, Head of Unit at Sheba",
  } satisfies LocalizedString,
  description: {
    he: 'ד"ר נעם כתרי — מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה בשיבא ויו"ר ועדת ההנחיות של ה־EAU. גישה מדויקת, אישית ודיסקרטית.',
    en: "Dr. Noam Kitrey — Head of Functional Urology & Andrology at Sheba and Chair of the EAU guidelines committee. A precise, personal, discreet approach.",
  } satisfies LocalizedString,
} as const;
