# Dr. Noam Kitrey Website — Full Redesign PRD
Status: DRAFT
Date: 2026-06-06
Owner: CPO

---

## 1. Goal + Positioning

**One-line goal:** Replace the current drkitrey.com with a bilingual (Hebrew-primary, English-toggle), premium, trust-first digital presence that converts anonymous visitors — who may be embarrassed to search — into clinic inquiries.

**Positioning statement (build team reference — not final copy):**
Dr. Kitrey is not a clinic directory listing. He is the most credentialed functional urology and sexual-medicine specialist in Israel — Head of Functional Urology at Sheba, Chair of the EAU trauma-guidelines committee — practicing in a discreet private setting at Rasikal Tower, Tel Aviv. The site must make a patient who searched "erectile dysfunction doctor Israel" feel: *this is the right expert, I am safe here, I know exactly how to reach him.*

**Design spirit:** ref `03-ref-clinic-minimal.jpg` restraint + the locked muted palette (`ink / slate / mist / paper`). NOT the loud saturated blue of ref `02-ref-nova-hospital.jpg`. Single-practitioner premium, not big-hospital impersonal.

**Trust-first, then expertise, then action.** In that order on every page.

---

## 2. Information Architecture

### 2.1 IA Decision: Single "Areas of Expertise" page in v1 (no per-condition pages)

**Rationale:** Per-condition pages (e.g., `/erectile-dysfunction`, `/peyronie`) are the right long-term SEO play, but they require Dr. Kitrey to approve medically precise Hebrew copy per condition — that review cycle is outside the build window. A single consolidated page with named condition anchors delivers the full service inventory, supports in-page navigation, and gives CMO/SEO a clear upgrade path in v2. Building the content model now with `condition` objects means per-condition pages in v2 require zero structural rework — just routing.

### 2.2 Page list (v1)

| Page | URL slug | Notes |
|------|----------|-------|
| Home | `/he` (default) · `/en` | RTL default, LTR toggle |
| About | `/he/about` · `/en/about` | Single doctor focus |
| Areas of Expertise | `/he/expertise` · `/en/expertise` | All conditions + named anchors |
| The Clinic | `/he/clinic` · `/en/clinic` | Location, atmosphere, logistics |
| Contact | `/he/contact` · `/en/contact` | Form + phone CTA |

**URL implementation note for CTO:** Use a single Next.js `[lang]` dynamic segment at root (`/[lang]/...`) with `he` as default (redirect `/` to `/he`). This keeps routing symmetrical and avoids hardcoded Hebrew slugs in the file system.

---

## 3. Per-Page Section Outlines

### 3.1 Home (`/[lang]`)

#### Section 1 — Nav
- **Purpose:** Orient, language toggle, phone CTA always visible.
- **Elements:** Logo (name + title in chosen language), nav links (About / Expertise / Clinic / Contact), Language toggle (HE | EN), Phone number pill (`054-7181718`) sticky on mobile.
- **Asset slots:** None.
- **CTA:** Phone number in nav bar.

#### Section 2 — Hero
- **Purpose:** Immediate trust signal. Patient should feel "I found the right specialist."
- **Elements:**
  - Headline: "[Placeholder: Expert Care for Sensitive Conditions]" — warm, not clinical.
  - Subhead: 1-2 lines — Dr. Kitrey's primary role + Sheba affiliation.
  - Primary CTA button: "Request a Consultation" links to Contact page.
  - Secondary link: "About Dr. Kitrey" links to About page.
- **Asset slots:**
  - `[HERO_PORTRAIT]` — half-panel doctor portrait, right side (LTR layout) / left side (RTL layout), on soft `mist`-tinted organic background shape. No stock photography. The portrait IS the hero.
- **Design notes:** Organic background shape behind portrait uses `mist` (#AFC8CB) at ~30% opacity. Layout flips cleanly on `dir` change via `rtl:flex-row-reverse`.

#### Section 3 — Credentials Bar (trust anchor)
- **Purpose:** Immediately counter "is this real?" anxiety for a sensitive-category search. Must appear within the first scroll.
- **Elements:** Horizontal strip, 4 credential items separated by `slate` dividers:
  1. Head of Functional Urology & Andrology Unit — Sheba Medical Center
  2. Chair, EAU Clinical Guidelines — Urological Trauma
  3. Director, Sexual Health Center (SHSQ) — Sheba
  4. Member, Israeli & European Sexual Medicine Associations
- **Design:** `slate` text, muted `paper` or very light `mist` background. Understated — no badge icons, no loud color.
- **Asset slots:** None.
- **CTA:** None.

#### Section 4 — Service Overview (teaser grid)
- **Purpose:** Show scope without overwhelming. Each card links to the relevant anchor on the Expertise page.
- **Elements:** Section title + 2-line description. Card grid (2 columns mobile, 3-4 columns desktop). Each card: condition category name + 1-sentence description. Minimal line-art icon in `mist` tint.
- **Content categories:**
  1. Erectile Dysfunction
  2. Premature Ejaculation
  3. Peyronie's Disease
  4. Post-Prostatectomy Rehabilitation
  5. Urinary Incontinence
  6. Overactive Bladder / Neurogenic Bladder
  7. Chronic Pelvic Pain / Interstitial Cystitis
  8. Benign Prostate Enlargement
  9. Gender Affirmation Support (label wording TBD with founder)
  10. Urological Trauma
- **Asset slots:** None (icons only, no photos in this section).
- **CTA:** "See All Areas of Expertise" button links to `/[lang]/expertise`.

#### Section 5 — Video / Intro
- **Purpose:** Human connection. A 60-90 second intro video converts better than a wall of credentials for a sensitive category.
- **Elements:** Section headline "[Placeholder: A Word from Dr. Kitrey]". Video embed (YouTube or self-hosted — founder decides). Brief pull-quote beside or below video.
- **Asset slots:**
  - `[INTRO_VIDEO]` — 16:9 slot, styled with `mist` border/shadow treatment. If no video supplied at launch, show a designed placeholder with portrait and a subtitle: "Coming soon — an introduction from Dr. Kitrey."
- **CTA:** None in this section. Contact CTA follows immediately after.

#### Section 6 — CTA Band
- **Purpose:** Convert the now-warmed visitor.
- **Elements:** Short headline "[Placeholder: Discreet, expert care — at your pace.]" + two actions: primary button "Contact the Clinic" links to Contact page; secondary text link "Call Now: 054-7181718".
- **Asset slots:** None.
- **Design:** `ink` background, `paper` text, `mist` CTA button.

#### Section 7 — Footer
- **Purpose:** Utility + legal.
- **Elements:** Address (Rasikal Tower, 156 Begin Way, Tel Aviv, Floor 17), phone (click-to-call), email (mailto link, not plaintext), language toggle, privacy note ("All inquiries are handled with full discretion — your details are never shared."), copyright.
- **Asset slots:** None.

---

### 3.2 About (`/[lang]/about`)

#### Section 1 — Doctor Portrait + Headline
- **Purpose:** Human and authoritative. Not a CV dump.
- **Elements:** Large portrait. Name, title, 2-3 sentence personal intro in the doctor's voice (founder drafts). NOT a list of degrees — credentials section follows below.
- **Asset slots:**
  - `[ABOUT_PORTRAIT_PRIMARY]` — editorial quality, warm background. Not white-coat-on-white-wall.

#### Section 2 — The Story / Philosophy
- **Purpose:** Why he chose this specialty. Builds emotional connection before credentials.
- **Elements:** 2-3 paragraphs. Placeholder: "[Dr. Kitrey's practice philosophy — empathy, expertise, discretion. Founder drafts.]"
- **Asset slots:**
  - `[ABOUT_PORTRAIT_SECONDARY]` — optional in-context shot (clinic, consultation setting).

#### Section 3 — Credentials (detailed)
- **Purpose:** For the patient who wants to verify everything.
- **Elements:** Structured vertical list with `ink` dividers:
  - Clinical roles (current)
  - Clinical roles (past, if relevant)
  - Academic / committee roles (EAU, associations)
  - Education
  - Languages spoken (founder to confirm)
- **Design:** Clean text list. NOT a table. No logos unless founder supplies official EAU/Sheba SVG assets. Text-only is cleaner.
- **Asset slots:** None.

#### Section 4 — In-context Portrait + Quote
- **Purpose:** Warmth counterpoint to the credentials list.
- **Elements:** In-context photo + large pull-quote from Dr. Kitrey.
- **Asset slots:**
  - `[ABOUT_PORTRAIT_CONTEXT]` — consultation room, natural light preferred.

#### Section 5 — CTA
- "Request a Consultation" links to Contact page. Phone number text link.

---

### 3.3 Areas of Expertise (`/[lang]/expertise`)

#### Section 1 — Page header
- Short paragraph: "Dr. Kitrey specializes in conditions that require both technical precision and personal sensitivity."
- **Asset slots:** None.

#### Section 2 — Group: Male Sexual Dysfunction
Anchor: `#sexual-dysfunction`
- **Per condition card:** Condition name (H3), 2-4 sentence description, discrete reassurance line (placeholder: "You are not alone in experiencing this."), "Request a Consultation" micro-CTA.
- **Conditions:** Erectile Dysfunction · Premature Ejaculation · Peyronie's Disease · Post-Prostatectomy Rehabilitation.

#### Section 3 — Group: Functional Urology
Anchor: `#functional-urology`
- **Conditions:** Urinary Incontinence (M/F) · Neurogenic Bladder · Overactive Bladder · Chronic Pelvic Pain · Interstitial Cystitis · Benign Prostate Enlargement.

#### Section 4 — Group: Specialized Care
Anchor: `#specialized`
- **Conditions:** Gender Affirmation / Transition Support · Urological Trauma · Intermittent Catheterization.
- **Note for build team:** Label and description copy for gender-affirmation support must be reviewed and approved by founder before any page goes live. Use a generic placeholder and flag in handoff.

#### Section 5 — CTA Band
- Same pattern as Home Section 6.

---

### 3.4 The Clinic (`/[lang]/clinic`)

#### Section 1 — Atmosphere intro
- **Purpose:** Reduce pre-visit anxiety.
- **Elements:** Headline + 2-3 sentences. "[Placeholder: You will not feel like a number. The clinic is private, calm, and designed for your comfort.]"
- **Asset slots:** Optional `[CLINIC_PHOTO_1]` — waiting area or consultation room. If not supplied at launch, `mist`-tinted placeholder.

#### Section 2 — Location + Map
- **Elements:** Address (Rasikal Tower, 156 Begin Way, Tel Aviv, Floor 17, Floor 17), embedded Google Maps iframe, parking/transit notes (founder to supply).
- **Asset slots:** Map iframe only.

#### Section 3 — What to expect (process)
- **Elements:** 3-4 steps: "First contact → First consultation → Treatment plan → Ongoing care." Icon + 2-sentence description each.
- **Asset slots:** None.

#### Section 4 — CTA
- "Request a Consultation" + phone.

---

### 3.5 Contact (`/[lang]/contact`)

#### Section 1 — Contact options
- **Elements:** Phone number (primary, large, click-to-call `<a href="tel:+972547181718">`), email (secondary), address. Discretion note (see Section 5.2 below).
- **Asset slots:** None.

#### Section 2 — Request Consultation Form
Full spec in Section 5 below.

---

## 4. Bilingual Content Model

### 4.1 Key architecture

Content is stored as **key: { he: string, en: string }** objects. The `[lang]` route parameter drives which string is rendered. No separate CMS needed for v1 — a TypeScript content module at `src/content/[page].ts` per page is sufficient.

```typescript
// Pattern example — src/content/home.ts
export const home = {
  hero: {
    headline: {
      he: "[Final Hebrew headline — founder approves]",
      en: "Expert Care for Sensitive Conditions",
    },
    subhead: {
      he: "[Final Hebrew subhead]",
      en: "Head of Functional Urology & Andrology, Sheba Medical Center",
    },
  },
}
```

### 4.2 Shared vs localized content

| Content type | Shared | Localized |
|---|---|---|
| Phone number | Yes — `054-7181718` same string | — |
| Address | Partial — street number same | Street name translatable |
| Doctor name display | — | `ד"ר נועם קיטרי` (he) / `Dr. Noam Kitrey` (en) |
| Condition medical terms | — | Fully localized per lang |
| Credential role titles | — | Fully localized |
| Form field labels | — | Fully localized |
| Privacy/discretion note | — | Fully localized |
| Footer legal / copyright | — | Fully localized |
| Asset URLs (photos, video) | Yes — same media file for both langs | — |

### 4.3 RTL/LTR implications for CTO

- `<html lang="he" dir="rtl">` for Hebrew; switch to `lang="en" dir="ltr"` on English routes.
- **Tailwind:** Enable `rtl:` variant in `tailwind.config.ts`. Use logical margin/padding utilities (`ms-`, `me-`, `ps-`, `pe-`) everywhere. Zero hardcoded `ml-`/`mr-` values in layout components.
- **Hero portrait layout:** Use `flex-row rtl:flex-row-reverse` on the hero split. Portrait must appear on the visually "outer" side in both directions.
- **Nav item order:** Flex row auto-reverses with `dir`. Verify language toggle lands at the outer end in both directions.
- **Font stacks:** Hebrew body uses `Rubik` or `Assistant` (Google Fonts, RTL-optimized). English body uses `Inter`. Load both via `next/font/google`; apply via CSS variable scoped to `[lang="he"]` and `[lang="en"]` selectors.
- **Text alignment:** Do not use `text-left` or `text-right` — use `text-start` throughout so alignment flips automatically with `dir`.
- **Numbers and phone:** LTR-embed phone numbers inside RTL text using `dir="ltr"` on the phone element so digits don't mirror.

### 4.4 Language switching

Language toggle is a **client-side route navigation** (`/he/[page]` to `/en/[page]`), not a `useState` toggle within a single page. This keeps pages server-renderable, avoids hydration flash, and means each language URL is independently indexable. Recommend `next-intl` for App Router — CTO decides implementation approach.

---

## 5. Contact Form Spec

### 5.1 Fields

| Field | Type | Required | Validation |
|---|---|---|---|
| Full Name | text input | Yes | Min 2 chars, max 80 chars |
| Phone Number | tel input | Yes | Israeli mobile: `^05[0-9]{8}$` validated client + server |
| Email Address | email input | No | RFC email format if provided |
| Area of Interest | select | No | Options: Male Sexual Dysfunction / Functional Urology / Specialized Care / Other / Prefer not to say |
| Preferred Contact Method | radio | Yes | "By phone" / "By email" |
| Message / Notes | textarea | No | Max 500 chars, show live char count |
| Privacy acknowledgment | checkbox | Yes | Must be checked to enable submit button |

### 5.2 Discretion note (above form, non-negotiable)

Display in the active language, visually prominent but not alarming — use `slate` text, not a red warning box:

> **[He]** "פנייתך מטופלת בסודיות מלאה. פרטייך לא יועברו לגורם שלישי."
> **[En]** "Your inquiry is handled with complete discretion. Your details are never shared with any third party."

This note must appear above the form fields, not buried in fine print.

### 5.3 Submission flow

1. Client-side: Validate all required fields + Israeli phone regex. Disable submit button until all required fields pass.
2. On submit: POST to `/api/contact` with JSON payload.
3. API route (`/app/api/contact/route.ts`): Zod schema validates the payload (same rules as client). Return 400 with field-level errors on validation failure.
4. On valid payload:
   a. Send email to `Dr.Kitrey@gmail.com` via Resend. Subject: `[Website Inquiry] {areaOfInterest} — {name}`. HTML body: all fields in a clean table.
   b. If submitter provided email: send auto-reply via Resend: "Thank you — Dr. Kitrey's office will be in touch within [founder to specify] business days."
5. Return `{ success: true }` — show inline success message in active language. Form fields clear.
6. On Resend error: return `{ success: false }` — show inline error with phone number as fallback: "Please call us directly at 054-7181718."

### 5.4 Rate limiting

`/api/contact` must rate-limit by IP: max 3 submissions per 10-minute window. Use `@upstash/ratelimit` + `@upstash/redis` (env vars `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`). If Upstash is not yet provisioned, a simple in-memory Map with TTL is acceptable as a v1 fallback (note: resets on cold start — acceptable for MVP). On rate-limit hit: return 429 + message "[He] ניסית להגיש את הטופס יותר מדי פעמים. אנא נסה שוב מאוחר יותר. / [En] Too many submissions. Please try again later or call us directly."

### 5.5 No real scheduling

This form does NOT integrate with any calendar or booking system. It is an inquiry/request form only. All CTA labels must say "Request a Consultation" — NOT "Book Now" or "Schedule" — to set correct expectations.

---

## 6. Trust / Credibility Module

### 6.1 Design principle

Credentials must be scannable in 5 seconds and verifiable on demand. The goal is not to list everything — it is to establish "this is the leading specialist in Israel for this." One or two anchoring credentials outperform a full CV list on first impression.

### 6.2 Credential hierarchy

**Tier 1 — Primary (appears on Home hero subhead and nav sub-title):**
- "Head of Functional Urology & Andrology Unit, Sheba Medical Center"

**Tier 2 — Supporting (Home credentials bar, 4 items max):**
- "Chair, EAU Clinical Guidelines — Urological Trauma"
- "Director, Sexual Health Center (SHSQ) — Sheba"
- "Member, Israeli & European Sexual Medicine Associations"
- "MD, Tel Aviv University"

**Tier 3 — Full detail (About page credentials section only):**
- All of the above plus year (1997), full association names, past roles.

### 6.3 No credential logos in v1

Do not use EAU, Sheba, or university logos unless founder supplies official SVG assets. Text-only is cleaner and eliminates broken-image / licensing risk. Flag as open question for founder.

### 6.4 Social proof (deferred — v2)

Patient testimonials are the obvious social proof but raise privacy concerns under Israel's Privacy Protection Law (5741-1981) for medical practices. Defer entirely to v2 after founder confirms legal position with counsel.

---

## 7. v1 vs Later

### Ships in v1
- All 5 pages: Home, About, Expertise, Clinic, Contact
- Bilingual He/En with `[lang]` routing and correct RTL/LTR
- Contact form with Resend delivery and IP rate limiting
- Credentials bar + trust module on Home and About
- Responsive (mobile-first, 375px baseline)
- All asset slots: designed placeholders (correct aspect ratio, `mist` fill, `data-slot` label) for portrait, video, and clinic photo
- Video embed slot on Home (placeholder until founder supplies video — does not block launch)
- Google Maps iframe on Clinic page
- Lighthouse performance >= 90, accessibility >= 95

### Deferred to v2
- Per-condition SEO pages with full medical copy
- Patient testimonials (pending legal review)
- Blog / educational content hub
- Online booking / real calendar integration
- WhatsApp CTA integration (founder to confirm desire)
- Contentlayer or Sanity CMS migration (v1 uses TypeScript content files)
- Analytics dashboard / conversion tracking (Plausible or GA4)

---

## Acceptance Criteria (Definition of Done)

- [ ] Given a Hebrew-default visitor, when any page loads, then `<html dir="rtl" lang="he">` is set and all layout is correctly mirrored (flex order, padding, text alignment — no `ml-`/`mr-` violations).
- [ ] Given an English toggle click, when language switches, then URL changes to `/en/[page]`, `dir="ltr"`, all visible copy is in English, and no Hebrew strings are visible.
- [ ] Given a visitor on mobile (375px viewport), when Home loads, then hero portrait, credentials bar, service cards, video slot, and CTA band are all readable without horizontal scroll.
- [ ] Given a visitor submits the contact form with valid data, when the API route processes it, then an email arrives at Dr.Kitrey@gmail.com within 60 seconds with subject format `[Website Inquiry] {area} — {name}`.
- [ ] Given a visitor submits the form 4 times within 10 minutes from the same IP, when the 4th attempt fires, then the API returns 429 and the form shows the rate-limit message in the active language.
- [ ] Given no founder photos have been supplied, when any asset slot renders, then a styled placeholder (correct aspect ratio, `mist` background, `data-slot` label) is shown — no broken image icons.
- [ ] Given Lighthouse CI runs against the deployed URL, when the audit completes, then Performance >= 90, Accessibility >= 95, Best Practices >= 95 on both desktop and mobile profiles.

---

## Tech Notes for CTO

- **Stack:** Next.js 16 App Router, TypeScript strict, Tailwind CSS (RTL variant enabled), Shadcn/UI, Zod on all API route inputs.
- **Bilingual routing:** `app/[lang]/` directory with a `generateStaticParams` returning `['he', 'en']`. Root `/` redirects to `/he`. Recommend `next-intl` — handles RTL font class switching well with App Router.
- **Fonts:** `next/font/google` — load `Rubik` (weights 400, 500, 600) for Hebrew and `Inter` (weights 400, 500, 600) for English. Apply via CSS variable switched per `lang` attribute on `<html>`.
- **Tailwind RTL config:** Add `plugins: [require('tailwindcss-rtl')]` OR use built-in `rtl:` variant with `dir` HTML attribute. Use `ms-`/`me-`/`ps-`/`pe-` logical utilities throughout. Enforce via ESLint plugin or code-reviewer check.
- **Contact form email:** `@resend/resend` package. Env var `RESEND_API_KEY`. Recommend also persisting to a `contact_submissions` Supabase table (id, created_at, name, phone, email, area_of_interest, preferred_contact, message, lang, ip_hash) — provides audit trail and enables founder to review inquiries. If added, this is a DB migration (Irreversible tier QA gate applies).
- **Rate limiting:** `@upstash/ratelimit` + `@upstash/redis`. Env vars `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`.
- **No auth, no payments, no Paddle** — this is a pure marketing + contact site.
- **Google Maps:** Standard iframe embed. No Maps JS API key required for basic embed. Rasikal Tower, 156 Begin Way, Tel Aviv.
- **Asset placeholders:** `next/image` with `fill` prop inside a fixed-aspect-ratio div. Background `bg-[#AFC8CB]`. Add `data-slot="HERO_PORTRAIT"` (etc.) attribute so founder can identify each slot in the browser.
- **No CMS for v1** — copy lives in `src/content/[page].ts` TypeScript modules. Fast to build, easy for CMO to PR in v1. Upgrade path to Sanity/Contentlayer is a v2 decision.
- **SEO:** `generateMetadata` per page per lang. Hebrew pages: `<meta name="robots" content="index,follow">` + `<link rel="alternate" hreflang="he" href="/he/[page]">` + `<link rel="alternate" hreflang="en" href="/en/[page]">`.
