# Copy Deck V2 — Dr. Noam Kitrey (de-cloned, medical-journal register)

*Author: CMO. Date: 2026-06-22. Status: DRAFT for founder review.*
*Supersedes COPY-DECK.md. Trigger: founder felt the v1 site text read too close to the old drkitrey.com — derived, not original.*
*Hebrew is primary (canonical, native medical Hebrew). English is the parallel version, not a translation.*

---

## (A) Overlap with the old site — what the founder noticed

I fetched the live old site (`https://www.drkitrey.com/`). It is a Wix single-page app, so the deep subpage URLs 404 on direct fetch; the homepage render carries the real signal — the nav, the credential phrasing, the area labels. Here is what it actually says, and where our v1 copy tracked it.

### What the old site actually wrote (verbatim from the live homepage)

| Old-site line (verbatim) | English gloss |
|---|---|
| הפרעות בתפקוד המיני ובהטלת השתן | "Sexual dysfunction and urinary disorders" — its master framing |
| מומחה בכירורגיה אורולוגית | "Expert in urological surgery" |
| מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה | "Director of the functional urology & andrology unit" |
| מנהל שסק — המרכז לבריאות מינית | "Director of SHSQ — the sexual health center" |
| Nav: בית · אודות · תחומי עניין · המרפאה · צור קשר | Home · About · Areas of Interest · Clinic · Contact |
| Areas: הפרעות בתפקוד מיני של גבר · טראומה אורולוגית · הפרעות בהטלת שתן · התאמה מגדרית | the four old service labels |
| Credentials prose: "Graduate of Tel Aviv University's Sackler School (1997); member of HILAM, ESSM; training in neuro-urology in Paris and Haifa." | the old bio sentence |

### Where our v1 copy echoed it too closely (this is what he felt)

1. **Service framing mirrors the old taxonomy almost 1:1.** Old: "תפקוד מיני של גבר / הפרעות בהטלת שתן / טראומה / התאמה מגדרית." Ours: "תפקוד מיני של הגבר / אורולוגיה פונקציונלית / חבלות אורולוגיות / ליווי אורולוגי בתהליך אישור מגדרי." Same buckets, same order, lightly reworded. Reads as a paraphrase of his old menu.
2. **Credential lines are near-identical strings.** "מנהל היחידה לאורולוגיה פונקציונלית ואנדרולוגיה" and "מנהל המרכז לבריאות מינית (SHSQ)" appear on both sites in essentially the same words. (These are *facts* — we keep them — but in v1 they were also doing the headline/positioning work, so the whole page inherited the old site's voice.)
3. **The condition write-ups follow the generic clinic template** the old site uses: "[condition] can stem from many causes… the first step is accurate diagnosis… most cases improve." Competent, but it's the same explanatory cadence any urology site uses, including his old one. Nothing in the *voice* says "this is a different, more serious place."
4. **Headlines are generic-reassuring, not distinctive.** "טיפול מקצועי, בדיסקרטיות מלאה" / "Expert, discreet care" is exactly the register the old site occupies. It's fine, but it's interchangeable with any private clinic — which is precisely the "feels cloned" complaint.

### The fix (V2 creative direction)

Keep every **fact** (credentials, services, contact — unchanged). Change the **register**: rebuild the copy as a **scholarly-luxury medical journal** — the site reads like the *Contents* and *front matter* of a serious clinical periodical edited by one authority. That gives us a voice the old site never had and can't be confused with:

- **Running-head / masthead lines** instead of taglines.
- **Section numerals + journal-style standfirsts** (a short italic-register lead under each heading) instead of generic intros.
- **Conditions written as précis** — clinical, exact, unhurried, the way a specialist would summarise a topic for a colleague, then turn to reassure the patient — not as marketing blurbs.
- **A first-person editorial voice** for the doctor (his "editor's note"), which the old CV-style site never used.
- Native medical Hebrew throughout; English authored in parallel.

### Verified-facts guardrail (unchanged from v1, restated)

Sheba — Head of Functional Urology & Andrology Unit · Director, SHSQ (Sexual Health Center) · at Sheba since 2010 · Chair, EAU Clinical Guidelines Committee (urological trauma) · Member, HILAM & ESSM · Member, National Committee for Gender Affirmation (MoH) · M.D., Tel Aviv University, 1997. Conditions exactly as listed. Phone 054-7181718 / 079-9698450 · Dr.Kitrey@gmail.com · Ayal Specialist Clinics, Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17. **No invented stats, testimonials, quotes, or claims.** `USER-INSIGHTS.md` remains empty — no captured patient language; recommend a research sprint before any A/B testing.

---

## (B) Rewritten bilingual copy — keyed for `content/*.ts`

> Keys map to the existing modules so this drops in. Where v2 adds a field the current module lacks (e.g. `standfirst`, `runningHead`, `folio`), it's marked **[NEW FIELD]** so the build team knows to add it.

### `site.ts` — masthead & chrome

**`brand.name`** (unchanged — fact)
- he: ד"ר נעם כתרי
- en: Dr. Noam Kitrey

**`brand.role`** — recast as a masthead credential line (was a plain title)
- he: אורולוגיה תפקודית ורפואה מינית · מרכז רפואי שיבא
- en: Functional Urology & Sexual Medicine · Sheba Medical Center

**`brand.masthead`** **[NEW FIELD]** — the journal running-head, sits in the header beside the name
- he: כתב־עת קליני · גיליון המרפאה
- en: A Clinical Record · The Practice Edition

**Nav** — journal "contents" labels (distinct from the old בית/אודות/תחומי עניין; numerals belong to the design layer)
| key | he | en |
|---|---|---|
| home | המרפאה | The Practice |
| about | הרופא | The Physician |
| expertise | תחומי הטיפול | Subjects of Care |
| clinic | הביקור | The Visit |
| contact | פנייה | Enquiries |

**`cta.consult`** (consultation language, no booking)
- he: לבקשת ייעוץ
- en: Request a Consultation

**Footer**
- `footer.rights` he: כל הזכויות שמורות · ד"ר נעם כתרי / en: All rights reserved · Dr. Noam Kitrey
- `footer.privacyNote` **[NEW FIELD]** he: כל פנייה נשמרת בסודיות מלאה. פרטיכם אינם נמסרים לאיש. / en: Every enquiry is kept in full confidence. Your details are shared with no one.
- `footer.colophon` **[NEW FIELD]** (journal colophon line) he: נערך ומטופל על ידי ד"ר נעם כתרי, תל אביב. / en: Edited and attended by Dr. Noam Kitrey, Tel Aviv.

---

### `home.ts` — PAGE 1 · The Practice

**`hero.folio`** **[NEW FIELD]** (journal volume line)
- he: גיליון א׳ · אורולוגיה תפקודית ורפואה מינית
- en: Volume I · Functional Urology & Sexual Medicine

**`hero.eyebrow`**
- he: מן המרפאה של ד"ר נעם כתרי
- en: From the practice of Dr. Noam Kitrey

**`hero.headline`** (distinctive — names the patient's real situation without the generic "expert discreet care" line)
- he: יש מצבים שלוקח שנים לומר עליהם מילה. כאן אומרים אותם פעם אחת, ומטפלים.
- en: Some conditions take years to say aloud. Here you say them once — and they are treated.

*Headline alternatives (founder pick):*
- he alt A: הרפואה השקטה של הדברים שקשה להגיד.
- he alt B: מרפאה אחת, לכל מה שדחיתם לשאול.
- en alt A: The quiet medicine of the things that are hard to say.
- en alt B: One practice for everything you've put off asking.

**`hero.subhead`** (Tier-1 credential; recast as a standfirst, not a CV line)
- he: ד"ר נעם כתרי מנהל את היחידה לאורולוגיה תפקודית ואנדרולוגיה במרכז שיבא ואת המרכז לבריאות מינית (SHSQ). את אותה רמת רפואה הוא מביא אל המרפאה הפרטית — לאדם אחד בכל פעם.
- en: Dr. Noam Kitrey heads the Functional Urology & Andrology Unit at Sheba and directs its Sexual Health Center (SHSQ). He brings that same standard of medicine to private practice — for one person at a time.

**`hero.primaryCta`** he: לבקשת ייעוץ / en: Request a Consultation
**`hero.secondaryCta`** he: על הרופא / en: About the physician

**`hero.microRow`** (quiet authority chips — facts)
- { he: "שיבא", en: "Sheba" } · { he: 'יו"ר ועדת EAU', en: "EAU Committee Chair" } · { he: "מנהל SHSQ", en: "SHSQ Director" }

#### Credentials bar (`credentials`)
**`credentials.eyebrow`** he: רשימת המינויים / en: Appointments
**`credentials.standfirst`** **[NEW FIELD]**
- he: לא רשימת תארים — אלא היכן מוכרעות ההחלטות הקשות בתחום.
- en: Not a list of titles — but where the field's hardest calls are decided.

**Items** (facts unchanged; institution + title pairs)
1. מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה — המרכז הרפואי שיבא / Head of Functional Urology & Andrology Unit — Sheba Medical Center
2. יו"ר ועדת ההנחיות הקליניות, איגוד האורולוגיה האירופי (EAU) — חבלות אורולוגיות / Chair, Clinical Guidelines Committee, EAU — Urological Trauma
3. מנהל המרכז לבריאות מינית (SHSQ) — שיבא / Director, Sexual Health Center (SHSQ) — Sheba
4. חבר באיגודים הישראלי (היל"ם) והאירופי (ESSM) לרפואה מינית / Member, Israeli (HILAM) & European (ESSM) Sexual Medicine Associations

#### Service overview (`services`)
**`services.eyebrow`** he: תוכן העניינים / en: Table of contents
**`services.title`**
- he: שני תחומים. כל אחד מהם, לעומק.
- en: Two fields. Each one, in depth.
**`services.standfirst`** (replaces generic intro)
- he: התמחות צרה, מכוונת — לא מרפאה שעושה הכול. תפקוד מיני של הגבר, ואורולוגיה תפקודית: שני נושאים שדורשים גם יד בוטחת וגם אוזן סבלנית.
- en: A narrow, deliberate specialty — not a clinic that does everything. Male sexual function, and functional urology: two subjects that ask for both a sure hand and a patient ear.
**`services.cta`** he: לכל תחומי הטיפול / en: Read all subjects of care

**Cards** (the four home teasers; précis register, not blurbs)
| key / anchor | he title | en title | he blurb | en blurb |
|---|---|---|---|---|
| ed · #erectile-dysfunction | הפרעות זקפה | Erectile Dysfunction | כמעט תמיד יש סיבה שאפשר לזהות, וכמעט תמיד יש מה לעשות איתה. | There is almost always a cause that can be found — and almost always something to do about it. |
| pe · #premature-ejaculation | שפיכה מוקדמת | Premature Ejaculation | מהתלונות השכיחות אצל גברים, ומהפתירות שבהן. | Among the most common complaints in men, and among the most solvable. |
| incontinence · #incontinence | אי־נקיטת שתן | Urinary Incontinence | לנשים ולגברים — האבחנה של סוג הדליפה היא חצי מהפתרון. | For women and men — naming the type of leakage is half the answer. |
| trauma · #trauma | חבלות אורולוגיות | Urological Trauma | התחום שבו ד"ר כתרי כותב את ההנחיות לרופאי אירופה. | The field in which Dr. Kitrey writes the guidelines for Europe's physicians. |

#### Video / intro (`video`) — "Editor's note" framing
**`video.eyebrow`** he: דבר הרופא / en: A note from the physician
**`video.headline`** he: למה בכלל לטרוח לבוא. / en: Why it's worth coming in at all.
**`video.quote`** `[FOUNDER-REVIEW: personal voice]`
- he: "רוב מי שמגיע אליי דחה את זה שנים. אני לא שופט את זה — אני רק רוצה שזו תהיה הפעם האחרונה שהם נושאים את זה לבד."
- en: "Most people who come to me put it off for years. I don't judge that — I just want it to be the last time they carry it alone."
**`video.placeholderSubtitle`** he: בקרוב — דבר קצר מד"ר כתרי. / en: Coming soon — a short note from Dr. Kitrey.

#### Trust band (`trust`) — "On method"
**`trust.eyebrow`** he: על השיטה / en: On method
**`trust.headline`** he: רפואה מדויקת, נמסרת לאט. / en: Exact medicine, delivered slowly.
**`trust.body`** `[FOUNDER-REVIEW: personal voice]`
- he: שני דברים נפגשים כאן: דיוק קליני שאינו מתפשר, ושיחה שאינה ממהרת. אני שואל, מקשיב, ומסביר עד שברור — ואתם יוצאים ביודעים מה קורה ומה הצעד הבא. זה לא מותרות; זו הדרך שבה רפואה טובה נראית.
- en: Two things meet here: clinical precision that won't compromise, and a conversation that won't rush. I ask, I listen, and I explain until it's clear — and you leave knowing what's happening and what comes next. That isn't a luxury; it's what good medicine looks like.

**Pillars** (facts/positioning)
- discretion · he: סודיות מלאה / en: Full confidence · he: בין המטופל לרופא בלבד — בלי תיק גלוי ובלי רשימות. / en: Between patient and physician alone — no open file, no lists.
- personal · he: הרופא, לא מערכת / en: The physician, not a system · he: מי שבודק אתכם הוא מי שמטפל בכם — ד"ר כתרי עצמו. / en: The person who examines you is the person who treats you — Dr. Kitrey himself.
- authority · he: מן החזית / en: From the front · he: אותה רמה שמכריעה את המקרים הקשים בשיבא ובוועדות באירופה. / en: The same standard that settles the hard cases at Sheba and on Europe's committees.

#### Shared Contact CTA (`contactCta`) — "Correspondence"
**`contactCta.eyebrow`** he: פנייה / en: Correspondence
**`contactCta.headline`** he: שורה אחת, ומתחיל מענה אמיתי. / en: One line, and a real answer begins.
**`contactCta.body`** he: אפשר בטלפון ואפשר בכתב. כל פרט נשמר בסודיות מלאה. / en: By phone or in writing. Every detail is kept in full confidence.
**`contactCta.primaryCta`** he: לבקשת ייעוץ / en: Request a Consultation
**`contactCta.callPrefix`** he: או חייגו: / en: Or call:

#### SEO — Home
- title he: ד"ר נעם כתרי — אורולוגיה תפקודית ורפואה מינית · תל אביב / en: Dr. Noam Kitrey — Functional Urology & Sexual Medicine · Tel Aviv
- description he: מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה בשיבא ומנהל SHSQ. מרפאה פרטית ודיסקרטית בתל אביב, לאדם אחד בכל פעם. / en: Head of Functional Urology & Andrology at Sheba and Director of SHSQ. A private, discreet Tel Aviv practice — for one person at a time.

---

### `about.ts` — PAGE 2 · The Physician

**`hero.folio`** **[NEW FIELD]** he: גיליון א׳ · הרופא / en: Volume I · The Physician
**`hero.eyebrow`** he: הרופא / en: The physician
**`hero.headline`**
- he: מי שכותב את ההנחיות, יושב גם מולכם בחדר.
- en: The man who writes the guidelines also sits across from you in the room.
**`hero.intro`** `[FOUNDER-REVIEW: personal voice]`
- he: אני נעם כתרי. רוב חיי המקצועיים עברו על שני הקצוות של אותו תחום — לקבוע כיצד מטפלים במקרים הקשים בעולם, ולשבת עם אדם אחד שמתאר לי בקול נמוך משהו שדחה שנים. שני הקצוות האלה הם אותה רפואה. את שניהם אתם מקבלים כאן.
- en: I'm Noam Kitrey. Most of my working life has run along two ends of the same field — setting how the hardest cases are treated worldwide, and sitting with one person describing, quietly, something they put off for years. Those two ends are the same medicine. You get both of them here.

#### Story / philosophy (`story`)
**`story.eyebrow`** he: דבר הרופא / en: Editor's note
**`story.headline`** he: למה דווקא התחום הזה. / en: Why this field, of all of them.
**`story.paragraphs`** `[FOUNDER-REVIEW: personal voice]`
- he ¶1: בחרתי בתחום שרוב הרופאים מעדיפים לחלוף לידו, מפני שראיתי כמה הוא מוזנח וכמה רחוק אפשר להחזיר אדם כשמתייחסים אליו ברצינות. מי שמגיע אליי לרוב כבר עבר רופא או שניים שמיהרו, או חיפש תשובות במסכים. הוא לא צריך עוד מישהו שממהר.
- en ¶1: I chose a field most physicians prefer to walk past, because I saw how neglected it is — and how far a person can be brought back when they're taken seriously. Most who reach me have already seen a doctor or two who rushed, or searched for answers on a screen. They don't need one more person in a hurry.
- he ¶2: עבודה טובה כאן מתחילה באבחנה מדויקת ולא בניחוש. אני בודק עד שאני יודע, ולא מציע טיפול לפני שהבנתי מה הסיבה. רק אז אנחנו בונים יחד דרך — לפי המצב שלכם, הציפיות שלכם והקצב שלכם.
- en ¶2: Good work here begins with an exact diagnosis, not a guess. I examine until I know, and I don't propose a treatment before I understand the cause. Only then do we build a path together — around your situation, your expectations, your pace.
- he ¶3: מאז 2010 אני בשיבא, ובמקביל יושב בראש ועדה אירופית שקובעת כיצד מטפלים בחבלות אורולוגיות. את אותה רמת אחריות אני מביא לכל פנייה במרפאה — פשוטה ככל שתהיה.
- en ¶3: I've been at Sheba since 2010, and at the same time I chair a European committee that decides how urological trauma is treated. I bring that same level of responsibility to every enquiry at the clinic — however simple it may be.

#### Credentials (`credentials`) — "Curriculum"
**`credentials.eyebrow`** he: קורות מקצועיים / en: Curriculum
**`credentials.standfirst`** **[NEW FIELD]** he: למי שמבקש לבדוק הכול לפני שהוא מרים טלפון. / en: For anyone who wants to verify everything before lifting the phone.

Groups (facts unchanged from current module):
- **Clinical** (תפקידים קליניים / Clinical roles): Head of Functional Urology & Andrology Unit, Sheba · Director, SHSQ, Sheba · At Sheba since 2010
- **Academic & committees** (תפקידים אקדמיים וועדות / Academic & committee roles): Chair, EAU Clinical Guidelines Committee — Urological Trauma · Member, HILAM & ESSM · Member, National Committee for Gender Affirmation, Ministry of Health `[FOUNDER-REVIEW: legal-sensitive]`
- **Education** (השכלה / Education): M.D., Tel Aviv University, 1997
- **Languages** — omit until the founder supplies the list. `[FOUNDER-REVIEW: founder to confirm languages]`

#### In-context pull-quote (`quote`) `[FOUNDER-REVIEW: personal voice]`
- text he: "אדם שמרגיש שמקשיבים לו ולא שופטים אותו כבר עשה את החצי הקשה של הדרך." / en: "A person who feels heard, not judged, has already done the hard half of the journey."
- attribution he: ד"ר נעם כתרי / en: Dr. Noam Kitrey
- portraitCaption he: במרפאה — ייעוץ אישי ולא ממהר / en: At the clinic — an unhurried, personal consultation

#### SEO — About
- title he: הרופא — ד"ר נעם כתרי, אורולוג בכיר, מנהל יחידה בשיבא / en: The Physician — Dr. Noam Kitrey, Senior Urologist, Head of Unit at Sheba
- description he: ד"ר נעם כתרי — מנהל היחידה לאורולוגיה תפקודית ואנדרולוגיה בשיבא ויו"ר ועדת ההנחיות של ה־EAU. גישה מדויקת, אישית ודיסקרטית. / en: Dr. Noam Kitrey — Head of Functional Urology & Andrology at Sheba and Chair of the EAU guidelines committee. A precise, personal, discreet approach.

---

### `expertise.ts` — PAGE 3 · Subjects of Care

**`expertiseHeader.eyebrow`** he: תחומי הטיפול / en: Subjects of care
**`expertiseHeader.title`**
- he: מה מטפלים כאן — ובאיזו רצינות.
- en: What is treated here — and with what seriousness.
**`expertiseHeader.standfirst`** **[NEW FIELD]** (replaces the generic intro)
- he: כל נושא למטה נכתב כפי שהייתי מסביר אותו לעמית: מה זה, מאיפה זה בא, ומה באמת אפשר לעשות. בלי הבטחות, בלי הפחדה. ואין כאן שאלה "מביכה" — יש רק מה שאפשר לטפל בו.
- en: Each subject below is written the way I'd explain it to a colleague: what it is, where it comes from, and what can genuinely be done. No promises, no scare. And there is no "embarrassing" question here — only what can be treated.

> Each **group** gets a standfirst; each **condition** is a *précis* — clinical first sentence, then the patient turn. Reassurance + micro-CTA per core group as today.

#### Group 1 — Male Sexual Function (`sexual-dysfunction`)
- eyebrow he: נושא ראשון / en: Subject one
- title he: תפקוד מיני של הגבר / en: Male Sexual Function
- standfirst he: שכיח הרבה מעבר למה שמדברים עליו, ופתיר הרבה מעבר למה שחושבים. הקושי האמיתי הוא להרים טלפון; משם והלאה יש דרך. / en: Far more common than it's spoken of, and far more treatable than people assume. The real difficulty is the phone call; past it, there is a path.
- reassurance he: אינך היחיד — זה נפוץ הרבה יותר ממה שנדמה. / en: You are not the only one — it's far more common than it seems.
- microCta he: לבקשת ייעוץ / en: Request a Consultation

Conditions (précis register):
- **Erectile Dysfunction** (`#erectile-dysfunction`) · הפרעות זקפה
  - he: זקפה היא אירוע של כלי דם, עצבים, הורמונים וראש — וכשמשהו באחד מהם משתבש, היא מושפעת. לכן הצעד הראשון אינו מרשם אלא אבחנה: לאתר את הסיבה במדויק. כשהיא ידועה, ברוב המקרים יש שיפור ממשי, והטיפול נבחר יחד אתכם.
  - en: An erection is an event of blood vessels, nerves, hormones, and mind — when something in one of them falters, it shows. So the first step isn't a prescription but a diagnosis: to find the cause precisely. Once it's known, most cases improve markedly, and the treatment is chosen with you.
- **Premature Ejaculation** (`#premature-ejaculation`) · שפיכה מוקדמת
  - he: מהתלונות השכיחות ביותר, ומהמתסכלות ביותר לשאת בשתיקה — וגם מהפתירות ביותר. הטיפול מתחיל בהבנת המקור, גופני או נרכש, וממשיך במענה מותאם. השיפור מורגש לרוב לא רק במיטה אלא בביטחון הכללי.
  - en: One of the most common complaints, one of the most frustrating to bear in silence — and one of the most solvable. Care starts by understanding the source, physical or learned, and continues with a tailored response. The improvement usually shows not only in bed but in overall confidence.
- **Peyronie's Disease** (`#peyronie`) · מחלת פירוני
  - he: רקמה צלקתית שגורמת לעיקול, לעיתים עם כאב. השלב והמידה קובעים את הטיפול — שמרני או ניתוחי — ולכן הערכה מוקדמת חשובה: היא פותחת יותר אפשרויות. זהו תחום שבו הניסיון הניתוחי קובע, ולא רק המרשם.
  - en: Scar tissue that creates a curve, sometimes with pain. Stage and degree decide the treatment — conservative or surgical — which is why early assessment matters: it keeps more options open. This is a field where surgical experience, not just the prescription, makes the difference.
- **Post-Prostatectomy Rehabilitation** (`#post-prostatectomy`) · שיקום לאחר כריתת ערמונית
  - he: אחרי הסרת הערמונית, רבים מאבדים תפקוד מיני או שליטה בשתן — לרוב באופן שניתן לשקם. שיקום מובנה, שמתחיל מוקדם, מחזיר חלק ניכר מהתפקוד. כאן זמן הוא גורם: ככל שמתחילים מוקדם יותר, התוצאה טובה יותר.
  - en: After the prostate is removed, many lose sexual function or urinary control — usually in ways that can be rehabilitated. A structured program, started early, restores a substantial share of function. Timing matters: the earlier it begins, the better the outcome.

#### Group 2 — Functional Urology (`functional-urology`)
- eyebrow he: נושא שני / en: Subject two
- title he: אורולוגיה תפקודית / en: Functional Urology
- standfirst he: שליטה, תכיפות, כאב — דברים שאנשים נושאים בשקט שנים, מתוך הנחה ש"ככה זה". לרוב זה לא ככה, ולרוב יש מה לעשות. הכול מתחיל בזיהוי מדויק של המקור. / en: Control, frequency, pain — things people carry quietly for years, assuming "that's just how it is." Usually it isn't, and usually something can be done. It all starts with pinpointing the source.
- reassurance he: כמעט תמיד יש מה לעשות — גם אם בדיקות קודמות לא נתנו תשובה. / en: There's almost always something to do — even when earlier tests gave no answer.
- microCta he: לבקשת ייעוץ / en: Request a Consultation

Conditions:
- **Urinary Incontinence (M/F)** (`#incontinence`) · אי־נקיטת שתן (נשים וגברים)
  - he: דליפה אינה אבחנה אחת אלא כמה — ולכל סוג טיפול אחר. המפתח הוא לקבוע במדויק איזה סוג, ורק אז לבחור פתרון, משמרני ועד מתקדם. אצל נשים וגברים זה נראה אחרת, ונבדק אחרת.
  - en: Leakage isn't one diagnosis but several — each with its own treatment. The key is to determine exactly which type, and only then choose a solution, from conservative to advanced. In women and men it looks different, and is examined differently.
- **Overactive & Neurogenic Bladder** (`#overactive-bladder`) · שלפוחית רגיזה ושלפוחית נוירוגנית
  - he: דחיפות פתאומית ותכיפות יכולות לנבוע מפעילות־יתר של השלפוחית או מרקע נוירולוגי — שתי בעיות שונות שדורשות בירור שונה. זהו תחום שבו ד"ר כתרי מטפל גם במקרים המורכבים, ולא רק בשגרתיים.
  - en: Sudden urgency and frequency can arise from an overactive bladder or a neurological cause — two different problems that need different workups. This is an area where Dr. Kitrey handles the complex cases, not just the routine ones.
- **Chronic Pelvic Pain & Interstitial Cystitis** (`#pelvic-pain`) · כאב אגני כרוני ודלקת שלפוחית אינטרסטיציאלית
  - he: מהמצבים הקשים ביותר לאבחון, ומהמתישים ביותר לחיות איתם בלי שם ובלי תשובה. הגישה כאן היא בירור יסודי שמסרב לוותר — לזהות מקור ולבנות תוכנית אמיתית, גם אחרי שמסלולים קודמים נכשלו.
  - en: Among the hardest conditions to diagnose, and the most wearing to live with — nameless, unanswered. The approach here is a thorough workup that refuses to give up: to find a source and build a real plan, even after earlier routes failed.
- **Chronic Prostatitis** (`#prostatitis`) · דלקת ערמונית כרונית
  - he: דלקת או גירוי כרוני של הערמונית שמביא כאב, אי־נוחות ותסמיני שתן שאינם חולפים. זה דורש סבלנות ואבחנה מדויקת — ויש דרכים ממשיות להקל ולהחזיר איכות חיים.
  - en: Chronic inflammation or irritation of the prostate, bringing pain, discomfort, and urinary symptoms that won't pass. It takes patience and an exact diagnosis — and there are real ways to ease it and return quality of life.
- **Benign Prostate Enlargement (BPH)** (`#bph`) · הגדלה שפירה של הערמונית
  - he: שכיחה עם הגיל, ומטרידה את שגרת היום: זרם חלש, השתנה תכופה, יקיצות בלילה. הטיפול נע מתרופות ועד פתרונות זעיר־פולשניים, ונבחר לפי המצב וההעדפות שלכם — לא לפי נוסחה אחת.
  - en: Common with age, and a disruptor of daily life: a weak stream, frequent urination, waking at night. Treatment ranges from medication to minimally invasive options, chosen by your situation and preferences — not by a single formula.
- **Intermittent Catheterization** (`#catheterization`) · צנתור עצמי לסירוגין
  - he: למי שאינו מצליח לרוקן את השלפוחית, צנתור עצמי לסירוגין הוא פתרון בטוח ושגרתי שמחזיר חיים מלאים. ההדרכה נעשית בסבלנות, עד שזה הופך לפשוט.
  - en: For those who can't fully empty the bladder, intermittent self-catheterization is a safe, routine solution that gives life back. The training is done patiently, until it becomes simple.

#### Group 3 — Specialized Care (`specialized`)
- eyebrow he: נושא שלישי / en: Subject three
- title he: טיפול מתמחה / en: Specialized Care
- standfirst he: לצד שני התחומים המרכזיים, שני נושאים שדורשים ניסיון נדיר ויד עדינה. / en: Alongside the two central fields, two subjects that demand rare experience and a gentle hand.

Conditions:
- **Gender-Affirming Urological Care** (`#gender-affirming`) `[FOUNDER-REVIEW: legal-sensitive]` · ליווי אורולוגי בתהליך אישור מגדרי
  - he: ד"ר כתרי חבר בוועדה הלאומית להתאמה מגדרית מטעם משרד הבריאות, ומלווה את ההיבט האורולוגי בתהליך — במקצועיות, בכבוד מלא ובסודיות מלאה לכל מטופל ומטופלת. `[FOUNDER-REVIEW: legal-sensitive — ניסוח, היקף ומינוח לאישור מייסד + יועץ משפטי]`
  - en: Dr. Kitrey is a member of Israel's National Committee for Gender Affirmation (Ministry of Health) and attends the urological aspect of the process — with professionalism, full respect, and full confidence for every patient. `[FOUNDER-REVIEW: legal-sensitive — wording, scope, terminology need founder + counsel sign-off]`
- **Urological Trauma** (`#trauma`) · חבלות אורולוגיות
  - he: זהו התחום שבו ד"ר כתרי אינו רק מטפל אלא כותב את הכללים: יו"ר ועדת ההנחיות של איגוד האורולוגיה האירופי לחבלות. פגיעות במערכת השתן ובאיברי המין מטופלות כאן ברמה שמכריעה מקרים בכל אירופה.
  - en: This is the field where Dr. Kitrey doesn't just treat but writes the rules: Chair of the EAU's trauma-guidelines committee. Injuries to the urinary tract and genitals are treated here at the level that settles cases across Europe.

#### SEO — Expertise
- title he: תחומי הטיפול — תפקוד מיני ואורולוגיה תפקודית · ד"ר נעם כתרי / en: Subjects of Care — Sexual & Functional Urology · Dr. Noam Kitrey
- description he: הפרעות זקפה, שפיכה מוקדמת, מחלת פירוני, אי־נקיטת שתן, כאב אגני ועוד — מוסברים לעומק. אבחון מדויק וטיפול דיסקרטי, תל אביב. / en: Erectile dysfunction, premature ejaculation, Peyronie's, incontinence, pelvic pain and more — explained in depth. Accurate diagnosis and discreet care, Tel Aviv.

---

### `clinic.ts` — PAGE 4 · The Visit

#### Atmosphere (`atmosphere`)
- eyebrow he: הביקור / en: The visit
- headline he: חדר אחד, שקט, שבו יש לכם זמן. / en: One quiet room, where the time is yours.
- standfirst **[NEW FIELD]** he: לא אולם המתנה עמוס ולא תור שנקרא בשם. מרפאה פרטית, קבלה דיסקרטית, ושיחה שלא ממהרת. הגעתם עד לכאן — את החלק הזה נעשה קל. / en: No crowded waiting hall, no name called across a queue. A private clinic, a discreet reception, and a conversation that won't rush. You made it this far — this part we'll make easy.
- photoCaption he: המרפאה — מגדל רסיטל, תל אביב / en: The clinic — Recital Tower, Tel Aviv

#### Location (`location`)
- eyebrow he: מיקום / en: Location
- headline he: איך מגיעים. / en: Getting here.
- address (fact, unchanged) he: מרפאות איל, מגדל רסיטל, דרך מנחם בגין 156, תל אביב, קומה 17 / en: Ayal Specialist Clinics, Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17
- parkingNote `[FOUNDER-REVIEW: founder to supply parking/transit]` he: פרטי חניה ותחבורה יתווספו בקרוב; בינתיים נשמח לכוון טלפונית. / en: Parking and transit details are coming soon; in the meantime we're glad to guide you by phone.

#### What to expect (`expect`) — "The course of a visit"
- eyebrow he: מהלך הביקור / en: The course of a visit
- headline he: מהשורה הראשונה ועד הליווי שאחרי. / en: From the first line to the care that follows.
- Steps (numerals belong to design; précis tone):
  1. פנייה / First contact — he: שורה בטלפון או בכתב. חוזרים אליכם בדיסקרטיות ומתאמים מועד נוח. / en: A line by phone or in writing. We reply discreetly and arrange a time that suits you.
  2. הייעוץ הראשון / First consultation — he: פגישה שאינה ממהרת. מקשיבים, בודקים, ומסבירים בשפה ברורה מה קורה ומה האפשרויות. / en: An unhurried meeting. We listen, examine, and explain in plain language what's happening and what the options are.
  3. תוכנית טיפול / The plan — he: בונים יחד דרך שמתאימה למצב, לציפיות ולקצב שלכם. אתם מחליטים מתוך הבנה מלאה. / en: Together we build a path that fits your situation, expectations, and pace. You decide with full understanding.
  4. ליווי מתמשך / Ongoing care — he: ד"ר כתרי נשאר אתכם לאורך הדרך, עוקב ומתאים את הטיפול לפי הצורך. / en: Dr. Kitrey stays with you along the way, following progress and adjusting as needed.

#### SEO — Clinic
- title he: הביקור — המרפאה של ד"ר נעם כתרי · מגדל רסיטל, תל אביב / en: The Visit — Dr. Noam Kitrey's Clinic · Recital Tower, Tel Aviv
- description he: מרפאה פרטית ודיסקרטית, דרך מנחם בגין 156, תל אביב. מה צפוי בביקור הראשון אצל ד"ר נעם כתרי, ואיך מגיעים. / en: A private, discreet clinic at 156 Menachem Begin Rd, Tel Aviv. What to expect at your first visit with Dr. Noam Kitrey, and how to get here.

---

### `contact.ts` — PAGE 5 · Enquiries

#### Intro (`contactIntro`)
- eyebrow he: פנייה / en: Enquiries
- headline he: השורה הראשונה היא הקשה. אחריה זה פשוט. / en: The first line is the hard one. After it, it's simple.
- intro he: בטלפון, בכתב, או דרך הטופס. כל פנייה נענית אישית ובסודיות מלאה. / en: By phone, in writing, or through the form. Every enquiry is answered personally and in full confidence.
- phoneHint he: מענה אישי — אפשר פשוט להתקשר. / en: Answered personally — you can simply call.

#### Discretion guarantee (`discretionGuarantee`) — NON-NEGOTIABLE, above the form
- eyebrow he: סודיות מלאה / en: Complete confidence
- **lead** he: הפנייה שלך נשמרת בסודיות מלאה. / en: Your enquiry is kept in complete confidence.
- **body** he: הפרטים שתמסרו מגיעים ישירות לד"ר כתרי בלבד, ואינם נמסרים לעולם לאף גורם אחר. אין כאן תיק גלוי, אין רשימות, ואין שיתוף עם צד שלישי — רק שיחה דיסקרטית בינך לבין הרופא. / en: The details you share go directly to Dr. Kitrey alone, and are never passed to anyone else. There is no open file, no list, no sharing with any third party — only a discreet conversation between you and the physician.
- **short** (caption under submit) he: פנייתך מטופלת בסודיות מלאה. פרטיך אינם נמסרים לאיש. / en: Your enquiry is handled in complete confidence. Your details are shared with no one.

#### Form (`contactForm`) — labels/options/states (functional copy; lightly elevated)
- heading he: השארת פנייה / en: Leave an enquiry
- subhead he: כמה פרטים, ונחזור אליכם בהקדם — בסודיות מלאה. / en: A few details, and we'll get back to you soon — in full confidence.
- name label he: שם מלא / en: Full name · placeholder he: השם שלך / en: Your name
- phone label he: טלפון / en: Phone number · placeholder 05X-XXXXXXX
- email label he: דוא"ל (לא חובה) / en: Email (optional) · placeholder name@example.com
- area label he: נושא הפנייה / en: Area of interest · placeholder he: בחירת נושא (לא חובה) / en: Choose a topic (optional)
  - options: תפקוד מיני של הגבר / Male sexual function · אורולוגיה תפקודית / Functional urology · טיפול מתמחה / Specialized care · אחר / Other · מעדיף/ה לא לפרט / Prefer not to say
- preferredContact label he: איך עדיף שניצור קשר? / en: How would you prefer we reach you? · options: בטלפון / By phone · במייל / By email
- message label he: הודעה (לא חובה) / en: Message (optional) · placeholder he: כל מה שתרצו לשתף — לשיקול דעתכם בלבד. / en: Anything you'd like to share — entirely up to you. · counter {n}/500 תווים | {n}/500 characters
- privacy he: קראתי ואני מאשר/ת שהפנייה תטופל בסודיות מלאה. / en: I have read and agree my enquiry will be handled in full confidence.
- submit he: שליחת הפנייה / en: Send enquiry · submitting he: שולח… / en: Sending…
- successTitle he: הפנייה נשלחה / en: Your enquiry was sent
- autoReplyNote he: אם השארתם דוא"ל, נשלח אישור קבלה אוטומטי. / en: If you left an email, a confirmation has been sent.
- errorTitle he: השליחה לא הושלמה / en: We couldn't send that
- (error/rate-limit body strings already keyed in `@/lib/contact/copy` — keep, but fold in the fallback phone line) he: אפשר לנסות שוב, או פשוט להתקשר: 054-7181718. / en: Please try again, or just call: 054-7181718.

#### SEO — Contact
- title he: פנייה — ד"ר נעם כתרי · אורולוגיה ורפואה מינית, תל אביב / en: Enquiries — Dr. Noam Kitrey · Urology & Sexual Medicine, Tel Aviv
- description he: פנייה דיסקרטית לד"ר נעם כתרי: 054-7181718, דוא"ל, או טופס. כל פנייה בסודיות מלאה. מרפאה פרטית בתל אביב. / en: Reach Dr. Noam Kitrey discreetly: 054-7181718, email, or form. Every enquiry in full confidence. Private clinic in Tel Aviv.

---

## (C) Notes for build + QA

- **New fields to add** (design layer already moving toward a journal identity, so these fit): `brand.masthead`, `footer.privacyNote`, `footer.colophon`, `hero.folio` (home + about), `credentials.standfirst` (home + about), `services.standfirst`, `expertiseHeader.standfirst`, group `standfirst` on each expertise group, `atmosphere.standfirst`. All are `LocalizedString`. If the build team prefers to fold a standfirst into the existing `intro` field rather than add a key, that's fine — the copy is what matters.
- **Voice/compliance:** no buzzwords, no emojis, no AI labels, no invented data. Hebrew is native medical Hebrew, not translated. Numerals/phone/email render `dir="ltr"` (strings written so digits aren't mirrored).
- **Gendered Hebrew:** masculine default for the male-dysfunction sections (primary ICP); mixed/neutral (`מאשר/ת`, `לכל מטופל ומטופלת`) where both genders are addressed. Founder may adjust.
- **`USER-INSIGHTS.md` is empty** — copy is grounded in verified facts only. Recommend a Research-Lead sprint before any A/B testing or v2 per-condition pages.

## (D) FOUNDER-REVIEW items — full list

1. [personal voice] Home — `video.quote`
2. [personal voice] Home — `trust.body`
3. [personal voice] About — `hero.intro`
4. [personal voice] About — `story.paragraphs` (3)
5. [personal voice] About — `quote.text`
6. [legal-sensitive] About — National Committee for Gender Affirmation credential line
7. [legal-sensitive] Expertise — Gender-Affirming Urological Care block (wording/scope/terminology — founder + counsel)
8. [founder to confirm] About — languages spoken (group omitted until supplied)
9. [founder to confirm] Clinic — parking / transit details
