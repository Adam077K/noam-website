import type { LocalizedString } from "./types";
import type { IconName } from "@/components/ui";

/**
 * Areas of Care content (COPY-DECK §PAGE 3, verbatim). Three grouped sections —
 * Male Sexual Function · Functional Urology · Specialized Care — each carrying a
 * group intro and (for the first two) a shared reassurance line + micro-CTA, plus
 * a flat list of conditions. Every condition owns a stable `anchor` id so the Home
 * service preview and external deep links land on the right card. Anchors match the
 * Home `services.cards[].anchor` set (#erectile-dysfunction, #premature-ejaculation,
 * #incontinence, #trauma) so those previews resolve.
 *
 * NOTE: the gender-affirming-care condition copy is a [FOUNDER-REVIEW: legal-sensitive]
 * draft — wording, scope, and terminology require founder + counsel sign-off before
 * publish. It is wired verbatim from the deck and flagged via `founderReview`.
 */

export type Condition = {
  /** Stable anchor id (no leading "#") — used for in-page + deep links. */
  anchor: string;
  icon: IconName;
  title: LocalizedString;
  body: LocalizedString;
  /** Marks copy pending founder + legal sign-off (rendered as a quiet note). */
  founderReview?: boolean;
};

export type ExpertiseGroup = {
  anchor: string;
  eyebrow: LocalizedString;
  title: LocalizedString;
  intro: LocalizedString;
  /** Shown once per group as a reassuring framing line (core groups only). */
  reassurance?: LocalizedString;
  /** Micro-CTA label closing the group (core groups only). */
  microCta?: LocalizedString;
  conditions: ReadonlyArray<Condition>;
};

export const expertiseSeo = {
  title: {
    he: 'תחומי הטיפול — תפקוד מיני ואורולוגיה תפקודית · ד"ר נעם כתרי',
    en: "Subjects of Care — Sexual & Functional Urology · Dr. Noam Kitrey",
  },
  description: {
    he: "הפרעות זקפה, שפיכה מוקדמת, מחלת פירוני, אי־נקיטת שתן, כאב אגני ועוד — מוסברים לעומק. אבחון מדויק וטיפול דיסקרטי, תל אביב.",
    en: "Erectile dysfunction, premature ejaculation, Peyronie's, incontinence, pelvic pain and more — explained in depth. Accurate diagnosis and discreet care, Tel Aviv.",
  },
} as const satisfies Record<"title" | "description", LocalizedString>;

export const expertiseHeader = {
  /** Journal volume line (running-head masthead device — matches Home's hero.folio). */
  folio: {
    he: "גיליון א׳ · תוכן העניינים המלא",
    en: "Volume I · The Complete Contents",
  },
  eyebrow: {
    he: "תחומי הטיפול",
    en: "Subjects of care",
  },
  /** Small-caps running head for the contents section. */
  sectionLabel: {
    he: "תוכן העניינים",
    en: "Table of Contents",
  },
  title: {
    he: "מה מטפלים כאן — ובאיזו רצינות.",
    en: "What is treated here — and with what seriousness.",
  },
  /** Journal standfirst (replaces the generic intro) — the physician's own voice. */
  intro: {
    he: 'כל נושא למטה נכתב כפי שהייתי מסביר אותו לעמית: מה זה, מאיפה זה בא, ומה באמת אפשר לעשות. בלי הבטחות, בלי הפחדה. ואין כאן שאלה "מביכה" — יש רק מה שאפשר לטפל בו.',
    en: 'Each subject below is written the way I\'d explain it to a colleague: what it is, where it comes from, and what can genuinely be done. No promises, no scare. And there is no "embarrassing" question here — only what can be treated.',
  },
} as const satisfies Record<
  "folio" | "eyebrow" | "sectionLabel" | "title" | "intro",
  LocalizedString
>;

/**
 * Per-group running-head folios for the contents (matches Home SectionHead's
 * "01 · 02 · 03" device). Distinct from the per-entry numbering, which restarts
 * within each group.
 */
export const expertiseGroupFolios = ["01", "02", "03"] as const;

/** Shared micro-CTA destination (the consultation request lives on /contact). */
export const expertiseCtaHref = "/contact";

/** Quiet note shown on condition cards whose copy is `founderReview`. */
export const founderReviewNote = {
  he: "ניסוח בבדיקת מייסד ויועץ משפטי",
  en: "Wording under founder & legal review",
} as const satisfies LocalizedString;

export const expertiseGroups: ReadonlyArray<ExpertiseGroup> = [
  {
    anchor: "sexual-dysfunction",
    eyebrow: { he: "נושא ראשון", en: "Subject one" },
    title: {
      he: "תפקוד מיני של הגבר",
      en: "Male Sexual Function",
    },
    intro: {
      he: "שכיח הרבה מעבר למה שמדברים עליו, ופתיר הרבה מעבר למה שחושבים. הקושי האמיתי הוא להרים טלפון; משם והלאה יש דרך.",
      en: "Far more common than it's spoken of, and far more treatable than people assume. The real difficulty is the phone call; past it, there is a path.",
    },
    reassurance: {
      he: "אינך היחיד — זה נפוץ הרבה יותר ממה שנדמה.",
      en: "You are not the only one — it's far more common than it seems.",
    },
    microCta: {
      he: "לפנייה לייעוץ",
      en: "Request a Consultation",
    },
    conditions: [
      {
        anchor: "erectile-dysfunction",
        icon: "pulse",
        title: { he: "הפרעות זקפה", en: "Erectile Dysfunction" },
        body: {
          he: "זקפה היא אירוע של כלי דם, עצבים, הורמונים וראש — וכשמשהו באחד מהם משתבש, היא מושפעת. לכן הצעד הראשון אינו מרשם אלא אבחנה: לאתר את הסיבה במדויק. כשהיא ידועה, ברוב המקרים יש שיפור ממשי, והטיפול נבחר יחד אתכם.",
          en: "An erection is an event of blood vessels, nerves, hormones, and mind — when something in one of them falters, it shows. So the first step isn't a prescription but a diagnosis: to find the cause precisely. Once it's known, most cases improve markedly, and the treatment is chosen with you.",
        },
      },
      {
        anchor: "premature-ejaculation",
        icon: "timer",
        title: { he: "שפיכה מוקדמת", en: "Premature Ejaculation" },
        body: {
          he: "מהתלונות השכיחות ביותר, ומהמתסכלות ביותר לשאת בשתיקה — וגם מהפתירות ביותר. הטיפול מתחיל בהבנת המקור, גופני או נרכש, וממשיך במענה מותאם. השיפור מורגש לרוב לא רק במיטה אלא בביטחון הכללי.",
          en: "One of the most common complaints, one of the most frustrating to bear in silence — and one of the most solvable. Care starts by understanding the source, physical or learned, and continues with a tailored response. The improvement usually shows not only in bed but in overall confidence.",
        },
      },
      {
        anchor: "peyronie",
        icon: "compass",
        title: { he: "מחלת פירוני", en: "Peyronie's Disease" },
        body: {
          he: "רקמה צלקתית שגורמת לעיקול, לעיתים עם כאב. השלב והמידה קובעים את הטיפול — שמרני או ניתוחי — ולכן הערכה מוקדמת חשובה: היא פותחת יותר אפשרויות. זהו תחום שבו הניסיון הניתוחי קובע, ולא רק המרשם.",
          en: "Scar tissue that creates a curve, sometimes with pain. Stage and degree decide the treatment — conservative or surgical — which is why early assessment matters: it keeps more options open. This is a field where surgical experience, not just the prescription, makes the difference.",
        },
      },
      {
        anchor: "post-prostatectomy",
        icon: "shieldCheck",
        title: {
          he: "שיקום לאחר כריתת ערמונית",
          en: "Post-Prostatectomy Rehabilitation",
        },
        body: {
          he: "אחרי הסרת הערמונית, רבים מאבדים תפקוד מיני או שליטה בשתן — לרוב באופן שניתן לשקם. שיקום מובנה, שמתחיל מוקדם, מחזיר חלק ניכר מהתפקוד. כאן זמן הוא גורם: ככל שמתחילים מוקדם יותר, התוצאה טובה יותר.",
          en: "After the prostate is removed, many lose sexual function or urinary control — usually in ways that can be rehabilitated. A structured program, started early, restores a substantial share of function. Timing matters: the earlier it begins, the better the outcome.",
        },
      },
    ],
  },
  {
    anchor: "functional-urology",
    eyebrow: { he: "נושא שני", en: "Subject two" },
    title: {
      he: "אורולוגיה תפקודית",
      en: "Functional Urology",
    },
    intro: {
      he: 'שליטה, תכיפות, כאב — דברים שאנשים נושאים בשקט שנים, מתוך הנחה ש"ככה זה". לרוב זה לא ככה, ולרוב יש מה לעשות. הכול מתחיל בזיהוי מדויק של המקור.',
      en: 'Control, frequency, pain — things people carry quietly for years, assuming "that\'s just how it is." Usually it isn\'t, and usually something can be done. It all starts with pinpointing the source.',
    },
    reassurance: {
      he: "כמעט תמיד יש מה לעשות — גם אם בדיקות קודמות לא נתנו תשובה.",
      en: "There's almost always something to do — even when earlier tests gave no answer.",
    },
    microCta: {
      he: "לפנייה לייעוץ",
      en: "Request a Consultation",
    },
    conditions: [
      {
        anchor: "incontinence",
        icon: "drop",
        title: {
          he: "אי-נקיטת שתן (נשים וגברים)",
          en: "Urinary Incontinence (Women & Men)",
        },
        body: {
          he: "דליפה אינה אבחנה אחת אלא כמה — ולכל סוג טיפול אחר. המפתח הוא לקבוע במדויק איזה סוג, ורק אז לבחור פתרון, משמרני ועד מתקדם. אצל נשים וגברים זה נראה אחרת, ונבדק אחרת.",
          en: "Leakage isn't one diagnosis but several — each with its own treatment. The key is to determine exactly which type, and only then choose a solution, from conservative to advanced. In women and men it looks different, and is examined differently.",
        },
      },
      {
        anchor: "overactive-bladder",
        icon: "waves",
        title: {
          he: "שלפוחית רגיזה ושלפוחית נוירוגנית",
          en: "Overactive & Neurogenic Bladder",
        },
        body: {
          he: "דחיפות פתאומית ותכיפות יכולות לנבוע מפעילות־יתר של השלפוחית או מרקע נוירולוגי — שתי בעיות שונות שדורשות בירור שונה. זהו תחום שבו ד\"ר כתרי מטפל גם במקרים המורכבים, ולא רק בשגרתיים.",
          en: "Sudden urgency and frequency can arise from an overactive bladder or a neurological cause — two different problems that need different workups. This is an area where Dr. Kitrey handles the complex cases, not just the routine ones.",
        },
      },
      {
        anchor: "pelvic-pain",
        icon: "shield",
        title: {
          he: "כאב אגני כרוני ודלקת שלפוחית אינטרסטיציאלית",
          en: "Chronic Pelvic Pain & Interstitial Cystitis",
        },
        body: {
          he: "מהמצבים הקשים ביותר לאבחון, ומהמתישים ביותר לחיות איתם בלי שם ובלי תשובה. הגישה כאן היא בירור יסודי שמסרב לוותר — לזהות מקור ולבנות תוכנית אמיתית, גם אחרי שמסלולים קודמים נכשלו.",
          en: "Among the hardest conditions to diagnose, and the most wearing to live with — nameless, unanswered. The approach here is a thorough workup that refuses to give up: to find a source and build a real plan, even after earlier routes failed.",
        },
      },
      {
        anchor: "prostatitis",
        icon: "pulse",
        title: { he: "דלקת ערמונית כרונית", en: "Chronic Prostatitis" },
        body: {
          he: "דלקת או גירוי כרוני של הערמונית שמביא כאב, אי־נוחות ותסמיני שתן שאינם חולפים. זה דורש סבלנות ואבחנה מדויקת — ויש דרכים ממשיות להקל ולהחזיר איכות חיים.",
          en: "Chronic inflammation or irritation of the prostate, bringing pain, discomfort, and urinary symptoms that won't pass. It takes patience and an exact diagnosis — and there are real ways to ease it and return quality of life.",
        },
      },
      {
        anchor: "bph",
        icon: "spark",
        title: {
          he: "הגדלה שפירה של הערמונית (BPH)",
          en: "Benign Prostate Enlargement (BPH)",
        },
        body: {
          he: "שכיחה עם הגיל, ומטרידה את שגרת היום: זרם חלש, השתנה תכופה, יקיצות בלילה. הטיפול נע מתרופות ועד פתרונות זעיר־פולשניים, ונבחר לפי המצב וההעדפות שלכם — לא לפי נוסחה אחת.",
          en: "Common with age, and a disruptor of daily life: a weak stream, frequent urination, waking at night. Treatment ranges from medication to minimally invasive options, chosen by your situation and preferences — not by a single formula.",
        },
      },
      {
        anchor: "catheterization",
        icon: "user",
        title: {
          he: "צנתור עצמי לסירוגין",
          en: "Intermittent Catheterization",
        },
        body: {
          he: "למי שאינו מצליח לרוקן את השלפוחית, צנתור עצמי לסירוגין הוא פתרון בטוח ושגרתי שמחזיר חיים מלאים. ההדרכה נעשית בסבלנות, עד שזה הופך לפשוט.",
          en: "For those who can't fully empty the bladder, intermittent self-catheterization is a safe, routine solution that gives life back. The training is done patiently, until it becomes simple.",
        },
      },
    ],
  },
  {
    anchor: "specialized",
    eyebrow: { he: "נושא שלישי", en: "Subject three" },
    title: {
      he: "טיפול מתמחה",
      en: "Specialized Care",
    },
    intro: {
      he: "לצד שני התחומים המרכזיים, שני נושאים שדורשים ניסיון נדיר ויד עדינה.",
      en: "Alongside the two central fields, two subjects that demand rare experience and a gentle hand.",
    },
    conditions: [
      {
        anchor: "gender-affirming",
        icon: "shieldCheck",
        founderReview: true,
        title: {
          he: "ליווי אורולוגי בתהליך אישור מגדרי",
          en: "Gender-Affirming Urological Care",
        },
        body: {
          he: "ד\"ר כתרי חבר בוועדה הלאומית להתאמה מגדרית מטעם משרד הבריאות, ומלווה את ההיבט האורולוגי בתהליך — במקצועיות, בכבוד מלא ובסודיות מלאה לכל מטופל ומטופלת.",
          en: "Dr. Kitrey is a member of Israel's National Committee for Gender Affirmation (Ministry of Health) and attends the urological aspect of the process — with professionalism, full respect, and full confidence for every patient.",
        },
      },
      {
        anchor: "trauma",
        icon: "compass",
        title: { he: "חבלות אורולוגיות", en: "Urological Trauma" },
        body: {
          he: "זהו התחום שבו ד\"ר כתרי אינו רק מטפל אלא כותב את הכללים: יו\"ר ועדת ההנחיות של איגוד האורולוגיה האירופי לחבלות. פגיעות במערכת השתן ובאיברי המין מטופלות כאן ברמה שמכריעה מקרים בכל אירופה.",
          en: "This is the field where Dr. Kitrey doesn't just treat but writes the rules: Chair of the EAU's trauma-guidelines committee. Injuries to the urinary tract and genitals are treated here at the level that settles cases across Europe.",
        },
      },
    ],
  },
];
