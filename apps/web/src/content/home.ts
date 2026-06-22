import type { LocalizedString } from "./types";

/**
 * Home page content, authored bilingually ({ he, en }) from COPY-DECK.md §"PAGE 1 — Home".
 * Hebrew is canonical; English is the parallel version, not a translation.
 * Founder-review items (personal voice, legal-sensitive) are wired with the
 * strongest draft from the copy deck — they ship once the founder approves.
 */

/** Hero — folio, eyebrow, headline, subhead (standfirst), dual CTA, portrait caption. */
export const hero = {
  /** Journal volume line (running head device). */
  folio: {
    he: "גיליון א׳ · אורולוגיה תפקודית ורפואה מינית",
    en: "Volume I · Functional Urology & Sexual Medicine",
  } satisfies LocalizedString,
  eyebrow: {
    he: 'מן המרפאה של ד"ר נעם כתרי',
    en: "From the practice of Dr. Noam Kitrey",
  } satisfies LocalizedString,
  headline: {
    he: "יש מצבים שלוקח שנים לומר עליהם מילה. כאן אומרים אותם פעם אחת, ומטפלים.",
    en: "Some conditions take years to say aloud. Here you say them once — and they are treated.",
  } satisfies LocalizedString,
  subhead: {
    he: 'ד"ר נעם כתרי מנהל את היחידה לאורולוגיה תפקודית ואנדרולוגיה במרכז שיבא ואת המרכז לבריאות מינית (SHSQ). את אותה רמת רפואה הוא מביא אל המרפאה הפרטית — לאדם אחד בכל פעם.',
    en: "Dr. Noam Kitrey heads the Functional Urology & Andrology Unit at Sheba and directs its Sexual Health Center (SHSQ). He brings that same standard of medicine to private practice — for one person at a time.",
  } satisfies LocalizedString,
  primaryCta: {
    he: "לבקשת ייעוץ",
    en: "Request a Consultation",
  } satisfies LocalizedString,
  secondaryCta: {
    he: "על הרופא",
    en: "About the physician",
  } satisfies LocalizedString,
  portraitCaption: {
    he: 'ד"ר נעם כתרי',
    en: "Dr. Noam Kitrey",
  } satisfies LocalizedString,
  portraitAlt: {
    he: 'ד"ר נעם כתרי — אורולוג בכיר, רפואה מינית ותפקודית, מרכז שיבא',
    en: "Dr. Noam Kitrey — Senior Urologist, Sexual & Functional Medicine, Sheba Medical Center",
  } satisfies LocalizedString,
  /** Credential micro-row — three quiet authority chips below the CTAs. */
  microRow: [
    { he: "מרכז שיבא", en: "Sheba Medical Center" },
    { he: 'יו"ר ועדת EAU', en: "EAU Committee Chair" },
    { he: "מנהל SHSQ", en: "SHSQ Director" },
  ] satisfies LocalizedString[],
} as const;

/** Credentials — "Appointments". The trust moat as a journal register. */
export const credentials = {
  eyebrow: {
    he: "רשימת המינויים",
    en: "Appointments",
  } satisfies LocalizedString,
  /** Journal standfirst under the heading — frames the list, not a CV dump. */
  standfirst: {
    he: "לא רשימת תארים — אלא היכן מוכרעות ההחלטות הקשות בתחום.",
    en: "Not a list of titles — but where the field's hardest calls are decided.",
  } satisfies LocalizedString,
  items: [
    {
      key: "sheba",
      institution: { he: "המרכז הרפואי שיבא", en: "Sheba Medical Center" },
      title: {
        he: "מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה",
        en: "Head of Functional Urology & Andrology Unit",
      },
    },
    {
      key: "eau",
      institution: { he: "איגוד האורולוגיה האירופי (EAU)", en: "European Association of Urology (EAU)" },
      title: {
        he: "יו\"ר ועדת ההנחיות הקליניות — חבלות אורולוגיות",
        en: "Chair, Clinical Guidelines Committee — Urological Trauma",
      },
    },
    {
      key: "shsq",
      institution: { he: "המרכז לבריאות מינית (SHSQ) — שיבא", en: "Sexual Health Center (SHSQ) — Sheba" },
      title: {
        he: "מנהל המרכז לבריאות מינית",
        en: "Director, Sexual Health Center",
      },
    },
    {
      key: "associations",
      institution: {
        he: "איגודי הרפואה המינית — היל\"ם ו־ESSM",
        en: "Sexual Medicine Associations — HILAM & ESSM",
      },
      title: {
        he: "חבר באיגודים הישראלי (היל\"ם) והאירופי (ESSM)",
        en: "Member, Israeli (HILAM) & European (ESSM) Associations",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    institution: LocalizedString;
    title: LocalizedString;
  }>,
} as const;

/** Service overview — "Table of contents". Eyebrow, title, standfirst, cards, CTA. */
export const services = {
  eyebrow: {
    he: "תוכן העניינים",
    en: "Table of contents",
  } satisfies LocalizedString,
  title: {
    he: "שני תחומים. כל אחד מהם, לעומק.",
    en: "Two fields. Each one, in depth.",
  } satisfies LocalizedString,
  /** Journal standfirst (replaces the generic intro). */
  standfirst: {
    he: "התמחות צרה, מכוונת — לא מרפאה שעושה הכול. תפקוד מיני של הגבר, ואורולוגיה תפקודית: שני נושאים שדורשים גם יד בוטחת וגם אוזן סבלנית.",
    en: "A narrow, deliberate specialty — not a clinic that does everything. Male sexual function, and functional urology: two subjects that ask for both a sure hand and a patient ear.",
  } satisfies LocalizedString,
  cta: {
    he: "לכל תחומי הטיפול",
    en: "Read all subjects of care",
  } satisfies LocalizedString,
  /**
   * The four strongest teaser cards (the home subset) in a calm 2×2 preview; the
   * full catalogue lives on Expertise so the "See all areas of care" CTA has a real
   * job. `anchor` links to each section on the Expertise page.
   */
  cards: [
    {
      key: "ed",
      anchor: "/expertise#erectile-dysfunction",
      icon: "pulse",
      title: { he: "הפרעות זקפה", en: "Erectile Dysfunction" },
      blurb: {
        he: "כמעט תמיד יש סיבה שאפשר לזהות, וכמעט תמיד יש מה לעשות איתה.",
        en: "There is almost always a cause that can be found — and almost always something to do about it.",
      },
    },
    {
      key: "pe",
      anchor: "/expertise#premature-ejaculation",
      icon: "timer",
      title: { he: "שפיכה מוקדמת", en: "Premature Ejaculation" },
      blurb: {
        he: "מהתלונות השכיחות אצל גברים, ומהפתירות שבהן.",
        en: "Among the most common complaints in men, and among the most solvable.",
      },
    },
    {
      key: "incontinence",
      anchor: "/expertise#incontinence",
      icon: "drop",
      title: { he: "אי־נקיטת שתן", en: "Urinary Incontinence" },
      blurb: {
        he: "לנשים ולגברים — האבחנה של סוג הדליפה היא חצי מהפתרון.",
        en: "For women and men — naming the type of leakage is half the answer.",
      },
    },
    {
      key: "trauma",
      anchor: "/expertise#trauma",
      icon: "compass",
      title: { he: "חבלות אורולוגיות", en: "Urological Trauma" },
      blurb: {
        he: 'התחום שבו ד"ר כתרי כותב את ההנחיות לרופאי אירופה.',
        en: "The field in which Dr. Kitrey writes the guidelines for Europe's physicians.",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    anchor: string;
    icon: string;
    title: LocalizedString;
    blurb: LocalizedString;
  }>,
} as const;

/** Video / intro — "A note from the physician" (editor's-note framing). */
export const video = {
  eyebrow: {
    he: "דבר הרופא",
    en: "A note from the physician",
  } satisfies LocalizedString,
  headline: {
    he: "למה בכלל לטרוח לבוא.",
    en: "Why it's worth coming in at all.",
  } satisfies LocalizedString,
  // [FOUNDER-REVIEW: personal voice] — strongest draft, ships on founder approval.
  quote: {
    he: "רוב מי שמגיע אליי דחה את זה שנים. אני לא שופט את זה — אני רק רוצה שזו תהיה הפעם האחרונה שהם נושאים את זה לבד.",
    en: "Most people who come to me put it off for years. I don't judge that — I just want it to be the last time they carry it alone.",
  } satisfies LocalizedString,
  quoteAttribution: {
    he: 'ד"ר נעם כתרי',
    en: "Dr. Noam Kitrey",
  } satisfies LocalizedString,
  placeholderSubtitle: {
    he: 'בקרוב — דבר קצר מד"ר כתרי.',
    en: "Coming soon — a short note from Dr. Kitrey.",
  } satisfies LocalizedString,
} as const;

/** Trust / approach band — "On method". */
export const trust = {
  eyebrow: {
    he: "על השיטה",
    en: "On method",
  } satisfies LocalizedString,
  headline: {
    he: "רפואה מדויקת, נמסרת לאט.",
    en: "Exact medicine, delivered slowly.",
  } satisfies LocalizedString,
  // [FOUNDER-REVIEW: personal voice] — strongest draft, ships on founder approval.
  body: {
    he: "שני דברים נפגשים כאן: דיוק קליני שאינו מתפשר, ושיחה שאינה ממהרת. אני שואל, מקשיב, ומסביר עד שברור — ואתם יוצאים ביודעים מה קורה ומה הצעד הבא. זה לא מותרות; זו הדרך שבה רפואה טובה נראית.",
    en: "Two things meet here: clinical precision that won't compromise, and a conversation that won't rush. I ask, I listen, and I explain until it's clear — and you leave knowing what's happening and what comes next. That isn't a luxury; it's what good medicine looks like.",
  } satisfies LocalizedString,
  /** Three discreet pillars distilled from the practice's positioning. */
  pillars: [
    {
      key: "discretion",
      title: { he: "סודיות מלאה", en: "Full confidence" },
      blurb: {
        he: "בין המטופל לרופא בלבד — בלי תיק גלוי ובלי רשימות.",
        en: "Between patient and physician alone — no open file, no lists.",
      },
    },
    {
      key: "personal",
      title: { he: "הרופא, לא מערכת", en: "The physician, not a system" },
      blurb: {
        he: 'מי שבודק אתכם הוא מי שמטפל בכם — ד"ר כתרי עצמו.',
        en: "The person who examines you is the person who treats you — Dr. Kitrey himself.",
      },
    },
    {
      key: "authority",
      title: { he: "מן החזית", en: "From the front" },
      blurb: {
        he: "אותה רמה שמכריעה את המקרים הקשים בשיבא ובוועדות באירופה.",
        en: "The same standard that settles the hard cases at Sheba and on Europe's committees.",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    title: LocalizedString;
    blurb: LocalizedString;
  }>,
} as const;

/** Shared Contact CTA block — "Correspondence". Foot of Home / About / Expertise / Clinic. */
export const contactCta = {
  eyebrow: {
    he: "פנייה",
    en: "Correspondence",
  } satisfies LocalizedString,
  headline: {
    he: "שורה אחת, ומתחיל מענה אמיתי.",
    en: "One line, and a real answer begins.",
  } satisfies LocalizedString,
  body: {
    he: "אפשר בטלפון ואפשר בכתב. כל פרט נשמר בסודיות מלאה.",
    en: "By phone or in writing. Every detail is kept in full confidence.",
  } satisfies LocalizedString,
  primaryCta: {
    he: "לבקשת ייעוץ",
    en: "Request a Consultation",
  } satisfies LocalizedString,
  callPrefix: {
    he: "או חייגו:",
    en: "Or call:",
  } satisfies LocalizedString,
} as const;
