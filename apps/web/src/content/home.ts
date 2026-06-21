import type { LocalizedString } from "./types";

/**
 * Home page content, authored bilingually ({ he, en }) from COPY-DECK.md §"PAGE 1 — Home".
 * Hebrew is canonical; English is the parallel version, not a translation.
 * Founder-review items (personal voice, legal-sensitive) are wired with the
 * strongest draft from the copy deck — they ship once the founder approves.
 */

/** Hero — eyebrow, headline, subhead (Tier-1 credential), dual CTA, portrait caption. */
export const hero = {
  eyebrow: {
    he: "אורולוג בכיר · רפואה מינית ותפקודית",
    en: "Senior urologist · Sexual & functional medicine",
  } satisfies LocalizedString,
  headline: {
    he: "טיפול מקצועי, בדיסקרטיות מלאה, במצבים שקשה לדבר עליהם.",
    en: "Expert, discreet care for the conditions that are hardest to talk about.",
  } satisfies LocalizedString,
  subhead: {
    he: 'ד"ר נעם כתרי — מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה במרכז הרפואי שיבא, ומנהל המרכז לבריאות מינית (SHSQ).',
    en: "Dr. Noam Kitrey — Head of Functional Urology & Andrology at Sheba Medical Center, and Director of the Sexual Health Center (SHSQ).",
  } satisfies LocalizedString,
  primaryCta: {
    he: "לפנייה לייעוץ",
    en: "Request a Consultation",
  } satisfies LocalizedString,
  secondaryCta: {
    he: "על ד\"ר כתרי",
    en: "About Dr. Kitrey",
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

/** Credentials bar — the trust moat. Four authority items. */
export const credentials = {
  eyebrow: {
    he: "רקע מקצועי",
    en: "Background",
  } satisfies LocalizedString,
  items: [
    {
      key: "sheba",
      institution: { he: "המרכז הרפואי שיבא", en: "Sheba Medical Center" },
      title: {
        he: "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה",
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
      institution: { he: "איגודים מקצועיים", en: "Professional associations" },
      title: {
        he: "חבר באיגודים הישראלי והאירופי לרפואה מינית",
        en: "Member, Israeli & European Sexual Medicine Associations",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    institution: LocalizedString;
    title: LocalizedString;
  }>,
} as const;

/** Service overview — eyebrow, title, intro, four teaser cards, CTA to Areas of Care. */
export const services = {
  eyebrow: {
    he: "תחומי הטיפול",
    en: "What we treat",
  } satisfies LocalizedString,
  title: {
    he: "תחום אחד של מומחיות, מענה רחב.",
    en: "One field of expertise, a wide range of care.",
  } satisfies LocalizedString,
  intro: {
    he: 'ד"ר כתרי מתמחה בתפקוד מיני של הגבר ובאורולוגיה פונקציונלית — שני תחומים שבהם נדרשים גם דיוק רפואי וגם רגישות אישית. כל פנייה מטופלת באותה רצינות ובאותה דיסקרטיות.',
    en: "Dr. Kitrey specializes in male sexual function and functional urology — two fields that call for both technical precision and personal sensitivity. Every inquiry is treated with the same seriousness and the same discretion.",
  } satisfies LocalizedString,
  cta: {
    he: "לכל תחומי הטיפול",
    en: "See All Areas of Care",
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
        he: "אבחון מדויק וטיפול מותאם אישית, בכל גיל.",
        en: "Accurate diagnosis and treatment tailored to you, at any age.",
      },
    },
    {
      key: "pe",
      anchor: "/expertise#premature-ejaculation",
      icon: "timer",
      title: { he: "שפיכה מוקדמת", en: "Premature Ejaculation" },
      blurb: {
        he: "בעיה שכיחה ופתירה — עם הגישה הנכונה.",
        en: "A common, treatable issue — with the right approach.",
      },
    },
    {
      key: "incontinence",
      anchor: "/expertise#incontinence",
      icon: "drop",
      title: { he: "אי-נקיטת שתן", en: "Urinary Incontinence" },
      blurb: {
        he: "פתרונות לנשים ולגברים, מותאמים למקור הבעיה.",
        en: "Solutions for women and men, matched to the cause.",
      },
    },
    {
      key: "trauma",
      anchor: "/expertise#trauma",
      icon: "compass",
      title: { he: "חבלות אורולוגיות", en: "Urological Trauma" },
      blurb: {
        he: "מומחיות מובילה בטיפול בפגיעות אורולוגיות.",
        en: "Leading expertise in urological injury.",
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

/** Video / intro — eyebrow, headline, pull-quote (founder voice), placeholder subtitle. */
export const video = {
  eyebrow: {
    he: "היכרות",
    en: "Introduction",
  } satisfies LocalizedString,
  headline: {
    he: 'כמה מילים מד"ר כתרי.',
    en: "A few words from Dr. Kitrey.",
  } satisfies LocalizedString,
  quote: {
    he: "אנשים מגיעים אליי אחרי שנים של היסוס. התפקיד שלי הוא לקבל אותם בלי שיפוטיות, להגיע לאבחנה הנכונה, ולהחזיר להם את השליטה.",
    en: "People come to me after years of hesitation. My job is to meet them without judgment, reach the right diagnosis, and help them get their lives back.",
  } satisfies LocalizedString,
  quoteAttribution: {
    he: 'ד"ר נעם כתרי',
    en: "Dr. Noam Kitrey",
  } satisfies LocalizedString,
  placeholderSubtitle: {
    he: "בקרוב — סרטון היכרות קצר עם ד\"ר כתרי.",
    en: "Coming soon — a short introduction from Dr. Kitrey.",
  } satisfies LocalizedString,
} as const;

/** Trust / "why me" band (dark ink section) — drawn from the About philosophy voice. */
export const trust = {
  eyebrow: {
    he: "הגישה שלי",
    en: "My approach",
  } satisfies LocalizedString,
  headline: {
    he: "רפואה מדויקת, יחס אנושי, ובלי למהר.",
    en: "Precise medicine, a human ear, and no rush.",
  } satisfies LocalizedString,
  body: {
    he: "רפואה טובה כאן היא שילוב של שני דברים: דיוק וביטחון מקצועי מצד אחד, ואוזן קשבת מצד שני. אני שואל, מקשיב, ומסביר עד שהדברים ברורים — אתם יוצאים מהמרפאה כשאתם מבינים מה קורה לכם ומה הצעדים הבאים.",
    en: "Good medicine here is two things at once: precision and clinical confidence on one side, and a genuine ear on the other. I ask, I listen, and I explain until it's clear — you leave understanding what's happening and what the next steps are.",
  } satisfies LocalizedString,
  /** Three discreet pillars distilled from the practice's positioning. */
  pillars: [
    {
      key: "discretion",
      title: { he: "דיסקרטיות מלאה", en: "Full discretion" },
      blurb: {
        he: "כל פנייה נשמרת בסודיות מוחלטת — בין המטופל לרופא בלבד.",
        en: "Every inquiry is kept in complete confidence — between patient and doctor alone.",
      },
    },
    {
      key: "personal",
      title: { he: "אתם פוגשים אותי", en: "You meet me, not a system" },
      blurb: {
        he: "במרפאה אתם פוגשים את ד\"ר כתרי עצמו, לא תור במערכת.",
        en: "At the clinic you meet Dr. Kitrey himself, not a number in a system.",
      },
    },
    {
      key: "authority",
      title: { he: "מומחיות מהחזית", en: "Front-line expertise" },
      blurb: {
        he: "אותה רמת מקצועיות שמלווה את המקרים המורכבים בשיבא ובוועדות באירופה.",
        en: "The same standard that guides the most complex cases at Sheba and on Europe's clinical committees.",
      },
    },
  ] satisfies ReadonlyArray<{
    key: string;
    title: LocalizedString;
    blurb: LocalizedString;
  }>,
} as const;

/** Shared Contact CTA block, reused at the foot of Home / About / Expertise / Clinic. */
export const contactCta = {
  eyebrow: {
    he: "מוכנים לצעד הראשון?",
    en: "Ready for the first step?",
  } satisfies LocalizedString,
  headline: {
    he: "ייעוץ דיסקרטי, בקצב שמתאים לך.",
    en: "A discreet consultation, at the pace that's right for you.",
  } satisfies LocalizedString,
  body: {
    he: "פנייה אחת היא ההתחלה של מענה אמיתי. כל פרט נשמר בסודיות מלאה.",
    en: "One message is the start of a real answer. Every detail is kept in full confidence.",
  } satisfies LocalizedString,
  primaryCta: {
    he: "לפנייה לייעוץ",
    en: "Request a Consultation",
  } satisfies LocalizedString,
  callPrefix: {
    he: "או חייגו:",
    en: "Or call:",
  } satisfies LocalizedString,
} as const;
