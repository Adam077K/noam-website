import type { Locale } from './i18n';

/* ----------------------------------------------------------------------------
   Dr. Noam Kitrey — site content (source of truth)
   HE = primary/canonical (verbatim from drkitrey.com where marked). EN = parallel.
   No invented medical claims, statistics, or testimonials. Reviews are real
   (MedReviews, 4.7 / 46). Videos are his real YouTube uploads.
---------------------------------------------------------------------------- */

export interface NavItem { label: string; href: string }
export interface RailItem { kicker: string; label: string }
export interface StatusCard { id: string; title: string; line: string; icon: IconName }
export interface Stat { n: string; label: string }
export interface Service { id: string; title: string; body: string; icon: IconName }
export interface Benefit { title: string; body: string; icon: IconName }
export interface RecognitionCard { org: string; detail: string }
export interface Review { quote: string; name: string; meta: string; stars: number }
export interface VideoCard { id: string; title: string; kicker: string }

export type IconName =
  | 'heart' | 'droplet' | 'transition' | 'rehab' | 'prostate' | 'shield'
  | 'discretion' | 'globe' | 'expertise' | 'play';

export interface SiteContent {
  htmlLang: string;
  meta: { title: string; description: string };
  skip: string;
  utility: { phone: string; phoneHref: string; email: string; emailHref: string };
  nav: { brand: string; brandSub: string; items: NavItem[]; cta: string };
  langSwitch: { current: string; other: string; otherHref: string };
  hero: {
    eyebrow: string; name: string; lead: string;
    ctaPrimary: string; ctaSecondary: string; rail: RailItem[]; photoAlt: string;
  };
  status: { items: StatusCard[]; link: string };
  about: {
    eyebrow: string; heading: string; body: string[]; cta: string;
    stats: Stat[]; photoAlt: string;
  };
  services: { eyebrow: string; heading: string; intro: string; items: Service[]; readMore: string };
  appointment: {
    eyebrow: string; heading: string; sub: string;
    fields: { name: string; email: string; phone: string; message: string };
    submit: string; sending: string; success: string; error: string;
    phoneLabel: string; phone: string; phoneHref: string; consent: string;
  };
  consult: { eyebrow: string; heading: string; benefits: Benefit[]; featured: VideoCard; watch: string };
  recognition: { eyebrow: string; heading: string; cards: RecognitionCard[] };
  statsBand: Stat[];
  reviews: {
    eyebrow: string; heading: string; rating: string; count: string;
    reviewCount: number; verified: string; seeAll: string; asOf: string; onSource: string;
    items: Review[]; sourceLabel: string; sourceHref: string;
  };
  resources: { eyebrow: string; heading: string; intro: string; videos: VideoCard[]; watch: string };
  footer: {
    brandLine: string; tagline: string;
    exploreTitle: string; explore: NavItem[];
    contactTitle: string; clinic: string; address: string;
    bookTitle: string; bookBody: string; book: string;
    rights: string; disclaimer: string;
  };
}

const PHONE = '054-7181718';
const PHONE_HREF = 'tel:+972547181718';
const EMAIL = 'Dr.Kitrey@gmail.com';
const EMAIL_HREF = 'mailto:Dr.Kitrey@gmail.com';
const MEDREVIEWS = 'https://www.medreviews.co.il/provider/dr-kitrey-noam';

const he: SiteContent = {
  htmlLang: 'he',
  meta: {
    title: 'ד״ר נעם כתרי — מומחה בכירורגיה אורולוגית | תפקוד מיני ואורולוגיה תפקודית',
    description:
      'ד״ר נעם כתרי, מומחה בכירורגיה אורולוגית, מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה בשיבא. אבחון וטיפול אישי ודיסקרטי בהפרעות בתפקוד המיני ובהטלת השתן.',
  },
  skip: 'דילוג לתוכן',
  utility: { phone: PHONE, phoneHref: PHONE_HREF, email: EMAIL, emailHref: EMAIL_HREF },
  nav: {
    brand: 'ד״ר נעם כתרי',
    brandSub: 'מומחה בכירורגיה אורולוגית',
    items: [
      { label: 'בית', href: '#top' },
      { label: 'אודות', href: '#about' },
      { label: 'תחומי התמחות', href: '#services' },
      { label: 'המרפאה', href: '#clinic' },
      { label: 'צור קשר', href: '#contact' },
    ],
    cta: 'קביעת תור',
  },
  langSwitch: { current: 'עב', other: 'EN', otherHref: '/en' },
  hero: {
    eyebrow: 'מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה · המרכז הרפואי שיבא',
    name: 'ד״ר נעם כתרי',
    lead:
      'מומחה בכירורגיה אורולוגית, בהפרעות בתפקוד המיני ובהטלת השתן. ליווי אישי ודיסקרטי, מבוסס על למעלה מ-25 שנות ניסיון קליני, ניתוחי ומחקרי.',
    ctaPrimary: 'קביעת תור',
    ctaSecondary: 'צרו קשר',
    rail: [
      { kicker: 'שיבא', label: 'מנהל יחידה' },
      { kicker: 'EAU', label: 'יו״ר ועדת הנחיות' },
      { kicker: 'ESSM · היל״ם', label: 'חבר איגוד' },
      { kicker: 'אונ׳ ת״א 1997', label: 'בוגר סאקלר' },
    ],
    photoAlt: 'דיוקן של ד״ר נעם כתרי',
  },
  status: {
    items: [
      { id: 'sexual', icon: 'heart', title: 'הפרעות בתפקוד המיני', line: 'אבחון וטיפול מקיף לגבר, בדיסקרטיות מלאה.' },
      { id: 'functional', icon: 'droplet', title: 'אורולוגיה תפקודית', line: 'הפרעות בהטלת השתן בנשים ובגברים.' },
      { id: 'gender', icon: 'transition', title: 'התאמה מגדרית', line: 'ליווי אורולוגי בכל שלבי התהליך.' },
    ],
    link: 'לפרטים',
  },
  about: {
    eyebrow: 'אודות',
    heading: 'אורולוגיה תפקודית ורפואת מין — באופן אישי',
    body: [
      'ד״ר נעם כתרי הוא מומחה בכירורגיה אורולוגית, המתמחה בהפרעות בתפקוד המיני ובהטלת השתן. הוא מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה ומנהל שסק — המרכז לבריאות מינית, במרכז הרפואי שיבא, תל השומר.',
      'לאורך למעלה משני עשורים מלווה ד״ר כתרי גברים ונשים בבעיות רפואיות רגישות, מתוך מחויבות לטיפול מקצועי, דיסקרטי ומכבד. הוא משלב ניסיון קליני עשיר עם פעילות מחקרית ובין-לאומית, וכיהן כיו״ר ועדת ההנחיות הקליניות של האיגוד האורולוגי האירופי (EAU) בנושא טראומה אורולוגית.',
    ],
    cta: 'קביעת תור',
    stats: [
      { n: '25+', label: 'שנות ניסיון קליני' },
      { n: 'שיבא', label: 'מנהל יחידה ומנהל שסק' },
      { n: 'EAU', label: 'יו״ר ועדת הנחיות' },
      { n: '4.7★', label: '46 חוות דעת מטופלים' },
    ],
    photoAlt: 'ד״ר נעם כתרי',
  },
  services: {
    eyebrow: 'תחומי התמחות',
    heading: 'תחומי הטיפול',
    intro: 'אבחון וטיפול אישי במגוון תחומי האורולוגיה התפקודית ורפואת המין — בגישה מקצועית, מבוססת-ניסיון ודיסקרטית.',
    readMore: 'לפרטים',
    items: [
      { id: 'ed', icon: 'heart', title: 'הפרעות בזקפה (אין-אונות)', body: 'אבחון וטיפול בהפרעות במנגנון הזקפה, בהתאמה אישית לכל מטופל.' },
      { id: 'pe', icon: 'shield', title: 'שפיכה מהירה ומחלת פֵּירוֹני', body: 'טיפול בשפיכה מוקדמת ובעקמת הפין (מחלת פירוני).' },
      { id: 'rehab', icon: 'rehab', title: 'שיקום לאחר כריתת ערמונית', body: 'שיקום התפקוד המיני לאחר כריתת ערמונית רדיקלית.' },
      { id: 'urinary', icon: 'droplet', title: 'הפרעות בהטלת השתן', body: 'טיפול באי-נקיטת שתן, שלפוחית רגיזה ושלפוחית נוירוגנית בנשים ובגברים.' },
      { id: 'bpe', icon: 'prostate', title: 'ערמונית מוגדלת שפירה (BPE)', body: 'אבחון וטיפול בהגדלה שפירה של הערמונית ובתסמיני דרכי השתן התחתונות.' },
      { id: 'gender', icon: 'transition', title: 'התאמה מגדרית', body: 'ליווי וטיפול אורולוגי לטרנסג׳נדרים בכל שלבי תהליך ההתאמה.' },
    ],
  },
  appointment: {
    eyebrow: 'קביעת תור',
    heading: 'קביעת תור וייעוץ',
    sub: 'השאירו פרטים ואחזור אליכם בהקדם — בדיסקרטיות מלאה.',
    fields: { name: 'שם מלא', email: 'אימייל', phone: 'טלפון', message: 'הודעה' },
    submit: 'שליחת פנייה',
    sending: 'שולח…',
    success: 'הפנייה נשלחה. אחזור אליכם בהקדם, בדיסקרטיות מלאה.',
    error: 'אירעה תקלה בשליחה. ניתן להתקשר ישירות: ' + PHONE,
    phoneLabel: 'או בטלפון',
    phone: PHONE,
    phoneHref: PHONE_HREF,
    consent: 'הפרטים נשלחים לד״ר כתרי בלבד וישמשו ליצירת קשר בלבד.',
  },
  consult: {
    eyebrow: 'הליווי שלי',
    heading: 'למה לבחור בליווי של ד״ר כתרי',
    watch: 'צפייה בסרטון',
    benefits: [
      { icon: 'expertise', title: 'מומחיות-על בתחום ייחודי', body: 'התמחות ממוקדת בתפקוד מיני ובאורולוגיה תפקודית, לצד ניסיון ניתוחי וקליני רב-שנים.' },
      { icon: 'discretion', title: 'דיסקרטיות ופרטיות מלאה', body: 'מרחב מכבד ומוגן לשיחה על נושאים אישיים ורגישים — בגובה העיניים.' },
      { icon: 'globe', title: 'ניסיון בין-לאומי ומחקרי', body: 'יו״ר ועדת ההנחיות של האיגוד האורולוגי האירופי (EAU) ופעילות מחקרית בארץ ובעולם.' },
    ],
    featured: { id: 'cQez-hgDyZQ', kicker: 'סרטון הסבר', title: 'בואו נרגיע: טיפול תרופתי בשלפוחית רגיזה' },
  },
  recognition: {
    eyebrow: 'הכרה והשתייכות מקצועית',
    heading: 'מוסדות ואיגודים',
    cards: [
      { org: 'המרכז הרפואי שיבא', detail: 'מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה ומנהל שסק — המרכז לבריאות מינית.' },
      { org: 'האיגוד האורולוגי האירופי (EAU)', detail: 'יו״ר ועדת ההנחיות הקליניות בנושא טראומה אורולוגית.' },
      { org: 'היל״ם · ESSM', detail: 'חבר האיגוד הישראלי והאירופי לרפואה מינית.' },
    ],
  },
  statsBand: [
    { n: '25+', label: 'שנות ניסיון קליני' },
    { n: '1997', label: 'בוגר ביה״ס לרפואה ע״ש סאקלר, אונ׳ ת״א' },
    { n: 'EAU', label: 'יו״ר ועדת ההנחיות הקליניות — טראומה אורולוגית' },
  ],
  reviews: {
    eyebrow: 'מה אומרים המטופלים',
    heading: 'חוות דעת מטופלים',
    rating: '4.7',
    count: 'מתוך 47 חוות דעת',
    reviewCount: 47,
    verified: 'מאומת ב-MedReviews',
    seeAll: 'לכל 47 הביקורות ב-MedReviews',
    asOf: 'נכון ליוני 2026',
    onSource: 'ב-MedReviews',
    sourceLabel: 'מקור: MedReviews',
    sourceHref: MEDREVIEWS,
    items: [
      { stars: 5, name: 'ח.א., תל אביב', meta: 'הפרעות בתפקוד המיני', quote: 'מקצוען, אדיב, לא מחפש „לדחוף” פרוצדורות מיותרות. רופא מצוין.' },
      { stars: 5, name: 'ישי ק., אור יהודה', meta: 'הפרעות בתפקוד המיני', quote: 'המקצוענות. האנושיות. בגובה העיניים, מפשט מצבים מורכבים ומציע פתרונות בשקיפות מלאה.' },
      { stars: 5, name: 'א. א., חדרה', meta: 'טיפול לאחר ניתוח', quote: 'יודע להרגיע ולהסביר. היה אנושי ומסביר פנים. הגענו די נסערים בעקבות המצב — ויצאנו מעודדים ועם תקווה.' },
    ],
  },
  resources: {
    eyebrow: 'סרטוני הסבר',
    heading: 'הרצאות וסרטוני הסבר',
    intro: 'הסברים והרצאות של ד״ר כתרי בנושאי אורולוגיה תפקודית ותפקוד מיני.',
    watch: 'צפייה',
    videos: [
      { id: '0t6xVI3ad-w', kicker: 'הרצאה', title: 'הרצאה לרופאי משפחה על שלפוחית רגיזה' },
      { id: 'W9WgUB0mzoU', kicker: 'פאנל', title: 'פאנל לרופאי משפחה על שלפוחית רגיזה' },
      { id: 'D9L3EqO4SBE', kicker: 'הסבר', title: 'צנתור עצמי לסירוגין (CIC)' },
    ],
  },
  footer: {
    brandLine: 'ד״ר נעם כתרי',
    tagline: 'מומחה בכירורגיה אורולוגית · המרכז הרפואי שיבא',
    exploreTitle: 'ניווט',
    explore: [
      { label: 'אודות', href: '#about' },
      { label: 'תחומי התמחות', href: '#services' },
      { label: 'חוות דעת', href: '#reviews' },
      { label: 'המרפאה', href: '#clinic' },
      { label: 'צור קשר', href: '#contact' },
    ],
    contactTitle: 'יצירת קשר',
    clinic: 'אייל מרפאות מומחים',
    address: 'מגדל רסיטל, דרך מנחם בגין 156, תל אביב, קומה 17',
    bookTitle: 'קביעת תור',
    bookBody: 'לקביעת תור ולפרטים נוספים — השאירו פנייה ואחזור אליכם בהקדם.',
    book: 'קביעת תור',
    rights: 'כל הזכויות שמורות',
    disclaimer: 'המידע באתר הוא כללי ואינו מהווה ייעוץ רפואי או תחליף לבדיקה ולאבחון אישיים.',
  },
};

const en: SiteContent = {
  htmlLang: 'en',
  meta: {
    title: 'Dr. Noam Kitrey — Urological Surgeon | Sexual & Functional Urology',
    description:
      'Dr. Noam Kitrey, specialist in urological surgery and Head of the Functional Urology & Andrology Unit at Sheba. Personal, discreet care for male sexual dysfunction and urinary disorders.',
  },
  skip: 'Skip to content',
  utility: { phone: PHONE, phoneHref: PHONE_HREF, email: EMAIL, emailHref: EMAIL_HREF },
  nav: {
    brand: 'Dr. Noam Kitrey',
    brandSub: 'Urological Surgery',
    items: [
      { label: 'Home', href: '#top' },
      { label: 'About', href: '#about' },
      { label: 'Expertise', href: '#services' },
      { label: 'Clinic', href: '#clinic' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Book Appointment',
  },
  langSwitch: { current: 'EN', other: 'עב', otherHref: '/he' },
  hero: {
    eyebrow: 'Head of the Functional Urology & Andrology Unit · Sheba Medical Center',
    name: 'Dr. Noam Kitrey',
    lead:
      'Specialist in urological surgery, focusing on male sexual dysfunction and urinary disorders. Personal, discreet care built on 25+ years of clinical, surgical and research experience.',
    ctaPrimary: 'Book Appointment',
    ctaSecondary: 'Get in touch',
    rail: [
      { kicker: 'SHEBA', label: 'Unit Director' },
      { kicker: 'EAU', label: 'Guidelines Chair' },
      { kicker: 'ESSM', label: 'Society Member' },
      { kicker: 'TAU 1997', label: 'Sackler, MD' },
    ],
    photoAlt: 'Portrait of Dr. Noam Kitrey',
  },
  status: {
    items: [
      { id: 'sexual', icon: 'heart', title: 'Male sexual dysfunction', line: 'Comprehensive diagnosis and care, in full confidence.' },
      { id: 'functional', icon: 'droplet', title: 'Functional urology', line: 'Urinary disorders in women and men.' },
      { id: 'gender', icon: 'transition', title: 'Gender affirmation', line: 'Urological support at every stage.' },
    ],
    link: 'Learn more',
  },
  about: {
    eyebrow: 'About',
    heading: 'Functional urology & sexual medicine — made personal',
    body: [
      'Dr. Noam Kitrey is a specialist in urological surgery, focusing on male sexual dysfunction and urinary disorders. He heads the Functional Urology & Andrology Unit and directs SHSQ — the Center for Sexual Health — at Sheba Medical Center, Tel HaShomer.',
      'For over two decades he has cared for men and women with sensitive medical conditions, with a commitment to professional, discreet and respectful treatment. He combines deep clinical experience with research and international work, and chaired the European Association of Urology (EAU) clinical-guidelines committee on urological trauma.',
    ],
    cta: 'Book Appointment',
    stats: [
      { n: '25+', label: 'Years of clinical experience' },
      { n: 'Sheba', label: 'Unit Director & SHSQ Director' },
      { n: 'EAU', label: 'Guidelines committee chair' },
      { n: '4.7★', label: '46 patient reviews' },
    ],
    photoAlt: 'Dr. Noam Kitrey',
  },
  services: {
    eyebrow: 'Expertise',
    heading: 'Areas of care',
    intro: 'Personal diagnosis and treatment across functional urology and sexual medicine — professional, experienced and discreet.',
    readMore: 'Learn more',
    items: [
      { id: 'ed', icon: 'heart', title: 'Erectile dysfunction', body: 'Diagnosis and treatment of erectile dysfunction, tailored to each patient.' },
      { id: 'pe', icon: 'shield', title: 'Rapid ejaculation & Peyronie’s', body: 'Treatment of premature ejaculation and penile curvature (Peyronie’s disease).' },
      { id: 'rehab', icon: 'rehab', title: 'Post-prostatectomy rehabilitation', body: 'Sexual rehabilitation following radical prostatectomy.' },
      { id: 'urinary', icon: 'droplet', title: 'Urinary disorders', body: 'Incontinence, overactive bladder and neurogenic bladder in women and men.' },
      { id: 'bpe', icon: 'prostate', title: 'Benign prostatic enlargement (BPE)', body: 'Diagnosis and treatment of BPE and lower urinary tract symptoms.' },
      { id: 'gender', icon: 'transition', title: 'Gender-affirmation urology', body: 'Urological support and care for transgender patients at every stage of transition.' },
    ],
  },
  appointment: {
    eyebrow: 'Appointments',
    heading: 'Book a consultation',
    sub: 'Leave your details and I’ll get back to you shortly — in full confidence.',
    fields: { name: 'Full name', email: 'Email', phone: 'Phone', message: 'Message' },
    submit: 'Send request',
    sending: 'Sending…',
    success: 'Your request has been sent. I’ll get back to you shortly, in full confidence.',
    error: 'Something went wrong. You can call directly: ' + PHONE,
    phoneLabel: 'Or by phone',
    phone: PHONE,
    phoneHref: PHONE_HREF,
    consent: 'Your details are sent to Dr. Kitrey only, and used solely to get back to you.',
  },
  consult: {
    eyebrow: 'The care I offer',
    heading: 'Why choose Dr. Kitrey',
    watch: 'Watch',
    benefits: [
      { icon: 'expertise', title: 'Deep sub-specialty expertise', body: 'Focused expertise in sexual function and functional urology, alongside years of surgical and clinical experience.' },
      { icon: 'discretion', title: 'Full discretion and privacy', body: 'A respectful, protected space to discuss personal and sensitive matters — eye to eye.' },
      { icon: 'globe', title: 'International & research experience', body: 'Chair of the EAU clinical-guidelines committee, with research activity in Israel and abroad.' },
    ],
    featured: { id: 'cQez-hgDyZQ', kicker: 'Explainer', title: 'Treating overactive bladder — a calm guide' },
  },
  recognition: {
    eyebrow: 'Recognition & affiliations',
    heading: 'Institutions & societies',
    cards: [
      { org: 'Sheba Medical Center', detail: 'Head of the Functional Urology & Andrology Unit and Director of SHSQ — the Center for Sexual Health.' },
      { org: 'European Association of Urology (EAU)', detail: 'Chair of the clinical-guidelines committee on urological trauma.' },
      { org: 'ESSM · ILSSM', detail: 'Member of the Israeli and European societies for sexual medicine.' },
    ],
  },
  statsBand: [
    { n: '25+', label: 'Years of clinical experience' },
    { n: '1997', label: 'Sackler School of Medicine, Tel Aviv University' },
    { n: 'EAU', label: 'Chair, clinical-guidelines committee — urological trauma' },
  ],
  reviews: {
    eyebrow: 'What patients say',
    heading: 'Patient reviews',
    rating: '4.7',
    count: 'from 47 reviews',
    reviewCount: 47,
    verified: 'Verified on MedReviews',
    seeAll: 'See all 47 reviews on MedReviews',
    asOf: 'As of June 2026',
    onSource: 'on MedReviews',
    sourceLabel: 'Source: MedReviews',
    sourceHref: MEDREVIEWS,
    items: [
      { stars: 5, name: 'H.A., Tel Aviv', meta: 'Sexual dysfunction', quote: 'Professional, courteous, doesn’t look to push unnecessary procedures. An excellent doctor.' },
      { stars: 5, name: 'Yishai K., Or Yehuda', meta: 'Sexual dysfunction', quote: 'The professionalism. The humanity. Treats you as an equal — simplifies complex situations and offers solutions in full transparency.' },
      { stars: 5, name: 'A.A., Hadera', meta: 'Post-surgical care', quote: 'Knows how to reassure and explain. Human and welcoming. We arrived quite distressed — and left encouraged, with hope.' },
    ],
  },
  resources: {
    eyebrow: 'Explainer videos',
    heading: 'Talks & explainers',
    intro: 'Talks and explainers by Dr. Kitrey on functional urology and sexual function.',
    watch: 'Watch',
    videos: [
      { id: '0t6xVI3ad-w', kicker: 'Lecture', title: 'Lecture to family physicians on overactive bladder' },
      { id: 'W9WgUB0mzoU', kicker: 'Panel', title: 'Panel for family physicians on overactive bladder' },
      { id: 'D9L3EqO4SBE', kicker: 'Explainer', title: 'Clean intermittent catheterization (CIC)' },
    ],
  },
  footer: {
    brandLine: 'Dr. Noam Kitrey',
    tagline: 'Urological surgery · Sheba Medical Center',
    exploreTitle: 'Explore',
    explore: [
      { label: 'About', href: '#about' },
      { label: 'Expertise', href: '#services' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'Clinic', href: '#clinic' },
      { label: 'Contact', href: '#contact' },
    ],
    contactTitle: 'Contact',
    clinic: 'Ayal Specialist Clinics',
    address: 'Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17',
    bookTitle: 'Book',
    bookBody: 'To book an appointment or for more information — leave a message and I’ll get back to you shortly.',
    book: 'Book Appointment',
    rights: 'All rights reserved',
    disclaimer: 'Information on this site is general and does not constitute medical advice or a substitute for personal examination and diagnosis.',
  },
};

export const content: Record<Locale, SiteContent> = { he, en };
export const getContent = (locale: Locale): SiteContent => content[locale];
