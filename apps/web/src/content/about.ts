import type { LocalizedString } from "./types";

/**
 * About page content, authored bilingually ({ he, en }) from COPY-DECK.md
 * §"PAGE 2 — About". Hebrew is canonical; English is the parallel version, not a
 * translation. Founder-review items (personal voice, languages, legal-sensitive)
 * are wired with the copy deck's strongest draft as-is — they ship once the
 * founder approves. No facts beyond the copy deck are invented.
 */

/**
 * Journal running head for the profile — the same "Vol. I" device as Home, recast
 * for The Physician profile. Renders dir="ltr" in the masthead.
 */
export const folio = {
  he: "גיליון א׳ · פרופיל · הרופא",
  en: "Volume I · Profile · The Physician",
} satisfies LocalizedString;

/** Section 1 — Hero: eyebrow, headline, personal intro, in-context portrait. */
export const hero = {
  eyebrow: {
    he: "אודות",
    en: "About",
  } satisfies LocalizedString,
  headline: {
    he: "מומחיות שנבנתה בחזית הרפואה — בשירות אדם אחד בכל פעם.",
    en: "Expertise built at the front of medicine — in the service of one person at a time.",
  } satisfies LocalizedString,
  /** Personal intro, founder voice — pending founder approval, wired as-is. */
  intro: {
    he: 'אני ד"ר נעם כתרי, אורולוג בכיר העוסק בתפקוד מיני של הגבר ובאורולוגיה פונקציונלית. אני מאמין שהתחומים האלה, דווקא משום שקשה לדבר עליהם, מחייבים את הרפואה הטובה ביותר ואת היחס האנושי ביותר. במרפאה אתם פוגשים אותי, לא תור במערכת.',
    en: "I'm Dr. Noam Kitrey, a senior urologist focused on male sexual function and functional urology. I believe these fields — precisely because they're so hard to talk about — demand both the best medicine and the most human care. At the clinic you meet me, not a number in a system.",
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
    he: "הגישה שלי",
    en: "My approach",
  } satisfies LocalizedString,
  headline: {
    he: "למה בחרתי בתחום הזה.",
    en: "Why I chose this field.",
  } satisfies LocalizedString,
  /** Three paragraphs, founder voice — pending founder approval, wired as-is. */
  paragraphs: [
    {
      he: "הרבה מהמטופלים שלי הגיעו אחרי שנים שבהן סבלו בשקט. הם ניסו להתעלם, חיפשו תשובות באינטרנט, או נבדקו ולא קיבלו מענה אמיתי. אני בחרתי בתחום הזה כי ראיתי כמה רחוק אפשר להחזיר אנשים — כשמתייחסים אליהם ברצינות ובכבוד.",
      en: "Many of my patients arrive after years of suffering quietly. They tried to ignore it, searched online for answers, or were examined and never got a real one. I chose this field because I saw how far people can be brought back — when they're taken seriously and treated with respect.",
    } satisfies LocalizedString,
    {
      he: "רפואה טובה כאן היא שילוב של שני דברים: דיוק וביטחון מקצועי מצד אחד, ואוזן קשבת מצד שני. אני לא ממהר. אני שואל, מקשיב, ומסביר עד שהדברים ברורים. אתם יוצאים מהמרפאה כשאתם מבינים מה קורה לכם ומה הצעדים הבאים.",
      en: "Good medicine here is two things at once: precision and clinical confidence on one side, and a genuine ear on the other. I don't rush. I ask, I listen, and I explain until it's clear. You leave understanding what's happening and what the next steps are.",
    } satisfies LocalizedString,
    {
      he: "לאורך השנים ליוויתי גם את המקרים המורכבים ביותר — בשיבא, בוועדות הקליניות באירופה, ובמרפאה הפרטית. אותה רמת מקצועיות מלווה כל מי שמגיע אליי, ולא משנה כמה פשוטה או מורכבת הפנייה.",
      en: "Over the years I've handled the most complex cases — at Sheba, on the European clinical committees, and in private practice. That same standard follows everyone who comes to me, no matter how simple or complicated the reason for the visit.",
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
        he: "טיפול דיסקרטי בתל אביב — אדם אחד בכל פעם, בלי תור במערכת.",
        en: "Discreet care in Tel Aviv — one person at a time, never a queue.",
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

/** A single credential row. `year` and `pending` are optional per-item. */
type CredentialItem = { title: LocalizedString; year?: string; pending?: boolean };
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
  headline: LocalizedString;
  groups: ReadonlyArray<CredentialGroup>;
} = {
  eyebrow: {
    he: "רקע מקצועי",
    en: "Credentials",
  } satisfies LocalizedString,
  headline: {
    he: "למי שרוצה לבדוק לעומק.",
    en: "For those who want to verify everything.",
  } satisfies LocalizedString,
  groups: [
    {
      key: "clinical",
      icon: "shieldCheck",
      label: { he: "תפקידים קליניים", en: "Clinical roles" } satisfies LocalizedString,
      items: [
        {
          title: {
            he: "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה, המרכז הרפואי שיבא",
            en: "Head of Functional Urology & Andrology Unit, Sheba Medical Center",
          },
        },
        {
          title: {
            he: "מנהל המרכז לבריאות מינית (SHSQ), שיבא",
            en: "Director, Sexual Health Center (SHSQ), Sheba",
          },
        },
        {
          title: {
            he: "רופא במרכז הרפואי שיבא",
            en: "At Sheba Medical Center",
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
            he: 'יו"ר ועדת ההנחיות הקליניות של איגוד האורולוגיה האירופי (EAU) — חבלות אורולוגיות',
            en: "Chair, EAU Clinical Guidelines Committee — Urological Trauma",
          },
        },
        {
          title: {
            he: "חבר באיגוד הישראלי לרפואה מינית (היל\"ם) ובאיגוד האירופי (ESSM)",
            en: "Member, Israeli (HILAM) and European (ESSM) Sexual Medicine Associations",
          },
        },
        {
          // [FOUNDER-REVIEW: legal-sensitive] — wired as-is from the copy deck.
          title: {
            he: "חבר בוועדה הלאומית להתאמה מגדרית, משרד הבריאות",
            en: "Member, National Committee for Gender Affirmation, Ministry of Health",
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
            he: 'ד"ר לרפואה (M.D.), אוניברסיטת תל אביב',
            en: "M.D., Tel Aviv University",
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
    he: "מטופל שמרגיש שמקשיבים לו ולא שופטים אותו — כבר עשה חצי מהדרך להחלמה.",
    en: "A patient who feels heard and not judged is already halfway to getting better.",
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
    he: 'אודות ד"ר נעם כתרי — אורולוג בכיר, מנהל יחידה בשיבא',
    en: "About Dr. Noam Kitrey — Senior Urologist, Head of Unit at Sheba",
  } satisfies LocalizedString,
  description: {
    he: 'ד"ר נעם כתרי, מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה בשיבא ויו"ר ועדת ההנחיות של ה-EAU לחבלות. גישה אישית ודיסקרטית.',
    en: "Dr. Noam Kitrey, Head of Functional Urology & Andrology at Sheba and Chair of the EAU trauma-guidelines committee. A personal, discreet approach.",
  } satisfies LocalizedString,
} as const;
