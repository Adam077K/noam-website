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
    he: 'תחומי טיפול — תפקוד מיני ואורולוגיה פונקציונלית · ד"ר נעם כתרי',
    en: "Areas of Care — Sexual & Functional Urology · Dr. Noam Kitrey",
  },
  description: {
    he: "הפרעות זקפה, שפיכה מוקדמת, מחלת פירוני, אי-נקיטת שתן, כאב אגני ועוד. אבחון מדויק וטיפול דיסקרטי אצל ד\"ר נעם כתרי, תל אביב.",
    en: "Erectile dysfunction, premature ejaculation, Peyronie's, incontinence, pelvic pain and more. Accurate diagnosis and discreet care with Dr. Noam Kitrey, Tel Aviv.",
  },
} as const satisfies Record<"title" | "description", LocalizedString>;

export const expertiseHeader = {
  eyebrow: {
    he: "תחומי טיפול",
    en: "Areas of care",
  },
  title: {
    he: "מצבים שדורשים גם דיוק רפואי וגם רגישות אישית.",
    en: "Conditions that demand both technical precision and personal sensitivity.",
  },
  intro: {
    he: 'התחומים שבהם ד"ר כתרי מתמחה הם מהרגישים ברפואה. כאן תמצאו הסבר ברור על כל אחד מהם, ומה אפשר לעשות. אין שאלה "מביכה" מדי — יש רק מה שאפשר לטפל בו.',
    en: "The fields Dr. Kitrey specializes in are among the most sensitive in medicine. Here you'll find a clear explanation of each one and what can be done about it. No question is too embarrassing — there's only what can be treated.",
  },
} as const satisfies Record<"eyebrow" | "title" | "intro", LocalizedString>;

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
    eyebrow: { he: "קבוצה ראשונה", en: "Group one" },
    title: {
      he: "תפקוד מיני של הגבר",
      en: "Male Sexual Function",
    },
    intro: {
      he: "בעיות בתפקוד המיני שכיחות הרבה יותר ממה שנדמה, והן כמעט תמיד ניתנות לטיפול. הצעד הקשה הוא לפנות; משם, יש דרך.",
      en: "Sexual-function problems are far more common than most people think, and they're nearly always treatable. The hard part is reaching out; from there, there's a path forward.",
    },
    reassurance: {
      he: "אתה לא לבד בזה, וזה נפוץ הרבה יותר ממה שחושבים.",
      en: "You are not alone in this — it's far more common than you'd think.",
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
          he: "קושי בהשגת זקפה או בשמירה עליה יכול לנבוע ממגוון סיבות — גופניות, הורמונליות, כלי-דם או נפשיות. הצעד הראשון הוא אבחון מדויק של הסיבה, ורק אז התאמת הטיפול. ברוב המקרים יש שיפור משמעותי. הטיפול נקבע יחד אתך, לפי מה שמתאים לך.",
          en: "Difficulty getting or keeping an erection can stem from many causes — physical, hormonal, vascular, or emotional. The first step is an accurate diagnosis of the cause, and only then a treatment matched to it. Most cases improve significantly. The plan is decided together with you, around what fits your life.",
        },
      },
      {
        anchor: "premature-ejaculation",
        icon: "timer",
        title: { he: "שפיכה מוקדמת", en: "Premature Ejaculation" },
        body: {
          he: "זו אחת התלונות השכיחות ביותר אצל גברים, ואחת הפתירות ביותר. הטיפול משלב הבנה של הגורם — גופני, התנהגותי או שילוב — עם מענה מותאם אישית. רוב הגברים מרגישים שיפור ממשי באיכות החיים ובביטחון.",
          en: "This is one of the most common complaints among men, and one of the most treatable. Care combines understanding the cause — physical, behavioral, or both — with a plan tailored to you. Most men feel a real improvement in quality of life and confidence.",
        },
      },
      {
        anchor: "peyronie",
        icon: "compass",
        title: { he: "מחלת פירוני", en: "Peyronie's Disease" },
        body: {
          he: "עיקול של איבר המין, לעיתים עם כאב, נגרם מרקמה צלקתית. ד\"ר כתרי מעריך את מידת העיקול ואת השלב של המחלה, ומכוון לטיפול המתאים — שמרני או ניתוחי — לפי המצב האישי. אבחון מוקדם משפר את אפשרויות הטיפול.",
          en: "A curve in the penis, sometimes with pain, caused by scar tissue. Dr. Kitrey assesses the degree of curvature and the stage of the condition, then guides you to the right treatment — conservative or surgical — based on your specific situation. Early assessment widens your options.",
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
          he: "לאחר ניתוח להסרת הערמונית, רבים מתמודדים עם פגיעה בתפקוד המיני או בשליטה על השתן. שיקום מקצועי ומובנה יכול להחזיר תפקוד במידה רבה. ככל שמתחילים מוקדם יותר, התוצאות טובות יותר.",
          en: "After surgery to remove the prostate, many men face changes in sexual function or urinary control. A structured rehabilitation program can restore a great deal of function. The earlier it begins, the better the outcomes.",
        },
      },
    ],
  },
  {
    anchor: "functional-urology",
    eyebrow: { he: "קבוצה שנייה", en: "Group two" },
    title: {
      he: "אורולוגיה פונקציונלית",
      en: "Functional Urology",
    },
    intro: {
      he: "בעיות בשליטה על השתן, בתכיפות או בכאב באגן פוגעות בשגרת היום ובביטחון — ולעיתים קרובות נסבלות בשתיקה. כמעט תמיד יש מה לעשות. הבירור מתחיל בהבנה מדויקת של מקור הבעיה.",
      en: "Problems with urinary control, frequency, or pelvic pain disrupt daily life and confidence — and are too often suffered in silence. There's almost always something that can be done. The workup starts with pinpointing the cause.",
    },
    reassurance: {
      he: "כמעט תמיד יש מה לעשות — גם כשבדיקות קודמות לא נתנו מענה.",
      en: "There's almost always something that can be done — even when earlier tests came back empty.",
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
          he: "דליפת שתן יכולה לנבוע מסיבות שונות אצל נשים ואצל גברים, ולכל סיבה יש טיפול אחר. אבחון נכון של סוג הדליפה הוא המפתח לפתרון יעיל — מטיפול שמרני ועד פתרונות מתקדמים.",
          en: "Urine leakage can have different causes in women and in men, and each cause has its own treatment. Correctly identifying the type of leakage is the key to an effective solution — from conservative care to advanced options.",
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
          he: "דחיפות פתאומית, תכיפות וקושי בשליטה יכולים לנבוע מפעילות-יתר של השלפוחית או מרקע נוירולוגי. ד\"ר כתרי מתמחה בשני המצבים, כולל מצבים מורכבים, ומתאים טיפול שמחזיר שליטה ושגרת חיים.",
          en: "Sudden urgency, frequency, and trouble with control can come from an overactive bladder or a neurological cause. Dr. Kitrey treats both, including complex cases, with a plan that restores control and routine.",
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
          he: "כאב אגני ממושך הוא מהמצבים שהכי קשה לאבחן, והכי מתסכל לחיות איתם בלי תשובות. ד\"ר כתרי עורך בירור יסודי כדי לזהות את המקור ולבנות תוכנית טיפול אמיתית, גם כשבדיקות קודמות לא נתנו מענה.",
          en: "Long-standing pelvic pain is among the hardest conditions to diagnose, and the most frustrating to live with without answers. Dr. Kitrey carries out a thorough workup to find the source and build a real treatment plan — even when earlier tests came back empty.",
        },
      },
      {
        anchor: "prostatitis",
        icon: "pulse",
        title: { he: "דלקת ערמונית כרונית", en: "Chronic Prostatitis" },
        body: {
          he: "דלקת או גירוי כרוני של הערמונית גורמים לכאב, לאי-נוחות ולתסמיני שתן שנמשכים זמן רב. הטיפול דורש סבלנות ואבחון מדויק, ויש דרכים ממשיות להקל ולשפר את איכות החיים.",
          en: "Chronic inflammation or irritation of the prostate causes pain, discomfort, and urinary symptoms that linger. Treatment takes patience and accurate diagnosis, and there are real ways to ease it and improve quality of life.",
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
          he: "הגדלה שפירה של הערמונית שכיחה עם הגיל וגורמת לתסמיני שתן מטרידים — זרם חלש, השתנה תכופה, יקיצות בלילה. יש מגוון פתרונות, מתרופות ועד טיפולים זעיר-פולשניים, שמותאמים למצב ולהעדפות שלך.",
          en: "An enlarged prostate is common with age and causes bothersome urinary symptoms — a weak stream, frequent urination, waking at night. A range of solutions exists, from medication to minimally invasive procedures, matched to your situation and your preferences.",
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
          he: "למי שמתקשה לרוקן את השלפוחית, צנתור עצמי לסירוגין הוא פתרון בטוח ושגרתי שמאפשר חיים מלאים. ד\"ר כתרי מלווה את ההדרכה וההתאמה האישית, בסבלנות ובלי לחץ.",
          en: "For those who can't fully empty the bladder, intermittent self-catheterization is a safe, routine solution that allows a full life. Dr. Kitrey guides the training and personal adjustment, patiently and without pressure.",
        },
      },
    ],
  },
  {
    anchor: "specialized",
    eyebrow: { he: "קבוצה שלישית", en: "Group three" },
    title: {
      he: "טיפול מתמחה",
      en: "Specialized Care",
    },
    intro: {
      he: "לצד תחומי הליבה, ד\"ר כתרי מביא מומחיות נדירה בתחומים שדורשים ניסיון מיוחד ורגישות.",
      en: "Alongside the core fields, Dr. Kitrey brings rare expertise in areas that call for special experience and sensitivity.",
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
          he: "ד\"ר כתרי חבר בוועדה הלאומית להתאמה מגדרית מטעם משרד הבריאות, ומספק ליווי אורולוגי מקצועי ומכבד כחלק מתהליך אישור מגדרי. הטיפול ניתן בדיסקרטיות מלאה ומתוך כבוד מלא לכל מטופל ומטופלת.",
          en: "Dr. Kitrey is a member of Israel's National Committee for Gender Affirmation (Ministry of Health) and provides professional, respectful urological care as part of the gender-affirmation process. Care is delivered with full discretion and full respect for every patient.",
        },
      },
      {
        anchor: "trauma",
        icon: "compass",
        title: { he: "חבלות אורולוגיות", en: "Urological Trauma" },
        body: {
          he: "ד\"ר כתרי הוא יו\"ר ועדת ההנחיות הקליניות של איגוד האורולוגיה האירופי בתחום החבלות האורולוגיות — סמכות מובילה בטיפול בפגיעות במערכת השתן ובאיברי המין. רמת מומחיות שמורגשת בכל מקרה, פשוט כמורכב.",
          en: "Dr. Kitrey chairs the European Urology Association's clinical-guidelines committee on urological trauma — a leading authority on injuries to the urinary tract and genitals. That depth of expertise shows in every case, simple or complex.",
        },
      },
    ],
  },
];
