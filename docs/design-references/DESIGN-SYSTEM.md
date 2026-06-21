# Dr. Noam Kitrey — Design System
*Produced by Design-Lead, 2026-06-06. Source of truth for frontend-engineer.*

---

## 0. Design Philosophy

**Atmosphere:** Restrained clinical elegance. The mist–ink palette communicates calm authority — the feeling of a well-lit private consultation room, not a hospital corridor. Every design decision prioritises trust and discretion first, expertise second. Nothing shouts. Nothing is generic.

**Dials (design-taste-frontend reference):**
- DESIGN_VARIANCE: 6 — offset asymmetric. Not artsy-chaotic; premium editorial.
- MOTION_INTENSITY: 3 — static-restrained. CSS `:hover` + subtle fade-ins only. No choreography.
- VISUAL_DENSITY: 3 — art-gallery airy. Sections breathe. Content is given space to be trusted.

**RTL Primary / LTR Secondary.** Hebrew is the primary rendering direction. The site must feel native to Israeli patients while remaining fully functional for English-reading international visitors. Language is toggled by a single persistent switch in the nav.

---

## 1. Design Tokens

### 1.1 Color Palette — LOCKED

```css
/* globals.css */
:root {
  --color-ink:     #202A2C;   /* near-black charcoal — primary text, dark sections */
  --color-slate:   #828C8D;   /* mid-grey — secondary text, placeholders, muted UI */
  --color-mist:    #AFC8CB;   /* soft blue-grey — SOLE accent (CTAs, highlights, tints) */
  --color-paper:   #FFFFFF;   /* white — base background */

  /* Derived scale — generated from 4 locked anchors */
  --color-ink-90:  #2D3E41;   /* ink lightened 10% — dark section sub-headings */
  --color-ink-80:  #3A5257;   /* ink lightened 20% — dark section body text */
  --color-ink-10:  #EEF0F0;   /* ink at 10% opacity — very subtle surface tint on paper bg */
  --color-ink-05:  #F6F7F7;   /* ink at 5% opacity — warm off-white page background alternative */

  --color-slate-60: #A8AFAF;  /* slate lightened — disabled text, inactive UI */
  --color-slate-20: #E8EAEA;  /* slate at 20% — borders, dividers */
  --color-slate-10: #F3F5F5;  /* slate at 10% — hover surface, input backgrounds */

  --color-mist-70:  #C4D8DA;  /* mist lightened — hover state of mist elements */
  --color-mist-40:  #D9E8E9;  /* mist at 40% — section wash tints, card accent-borders */
  --color-mist-15:  #EEF4F5;  /* mist at 15% — hero section tinted background panels */
  --color-mist-08:  #F6FAFA;  /* mist at 8%  — page background on hero/stat sections */

  /* Semantic roles */
  --bg-page:         var(--color-paper);
  --bg-tinted:       var(--color-mist-08);
  --bg-dark-section: var(--color-ink);
  --text-primary:    var(--color-ink);
  --text-secondary:  var(--color-slate);
  --text-inverse:    var(--color-paper);
  --border-subtle:   var(--color-slate-20);
  --border-accent:   var(--color-mist-40);
  --accent:          var(--color-mist);
  --accent-hover:    var(--color-mist-70);
  --focus-ring:      var(--color-mist);
}
```

### 1.2 Tailwind Config Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#202A2C',
          90:      '#2D3E41',
          80:      '#3A5257',
          10:      '#EEF0F0',
          5:       '#F6F7F7',
        },
        slate: {
          DEFAULT: '#828C8D',
          60:      '#A8AFAF',
          20:      '#E8EAEA',
          10:      '#F3F5F5',
        },
        mist: {
          DEFAULT: '#AFC8CB',
          70:      '#C4D8DA',
          40:      '#D9E8E9',
          15:      '#EEF4F5',
          8:       '#F6FAFA',
        },
        paper:   '#FFFFFF',
      },
      fontFamily: {
        // Hebrew RTL — headline + body
        hebrew:   ['Noto Serif Hebrew', 'David Libre', 'Frank Ruhl Libre', 'serif'],
        // Latin — headline display
        display:  ['Cormorant Garamond', 'serif'],
        // Latin — UI body + nav
        sans:     ['DM Sans', 'system-ui', 'sans-serif'],
        // Code / timestamps / phone
        mono:     ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)',    { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem,  4vw, 3rem)',     { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'body-lg':    ['1.125rem',                    { lineHeight: '1.7' }],
        'body-base':  ['1rem',                        { lineHeight: '1.65' }],
        'body-sm':    ['0.875rem',                    { lineHeight: '1.6' }],
        'caption':    ['0.75rem',                     { lineHeight: '1.5', letterSpacing: '0.06em' }],
        'eyebrow':    ['0.6875rem',                   { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },
      spacing: {
        // 8px base grid — override Tailwind default scale
        '1':  '8px',   '2':  '16px',  '3':  '24px',  '4':  '32px',
        '5':  '40px',  '6':  '48px',  '7':  '56px',  '8':  '64px',
        '10': '80px',  '12': '96px',  '16': '128px', '20': '160px',
        '24': '192px', '32': '256px',
      },
      borderRadius: {
        'xs':   '4px',
        'sm':   '8px',
        'md':   '12px',
        'lg':   '16px',
        'xl':   '24px',
        '2xl':  '32px',
        'pill': '9999px',
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(32, 42, 44, 0.06)',
        'card-hover': '0 4px 24px rgba(32, 42, 44, 0.10)',
        'mist-glow':  '0 0 0 3px rgba(175, 200, 203, 0.35)',
        'focus':      '0 0 0 3px rgba(175, 200, 203, 0.5)',
        'none':       'none',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 2. Typography

### 2.1 Font Selection — Rationale

**Hebrew display + body: Noto Serif Hebrew (Google Fonts, free, self-hostable)**

Rationale: The serif weight and refined letterforms communicate seniority and established authority — appropriate for a professor-level practitioner. Noto Serif Hebrew has excellent RTL rendering, covers the full Unicode Hebrew block, and pairs elegantly with the muted ink palette. Hebrew sans-serifs (Assistant, Rubik) read too "app-like" for a premium private practice; a serif signals permanence and trust.

Fallback stack: `'Noto Serif Hebrew', 'David Libre', 'Frank Ruhl Libre', serif`
Weights loaded: 300, 400, 600, 700

**Latin display: Cormorant Garamond (Google Fonts, free, self-hostable)**

Rationale: Refined editorial serif for large English headings. Its high-contrast strokes and long descenders signal expertise and stature — analogous to typographic choices made by prestigious European medical institutions and Harley Street-tier practices. At large sizes it is visually distinctive and premium; at body sizes DM Sans takes over.

Weights loaded: 300italic (accent pullquotes), 400, 600

**Latin UI body: DM Sans (Google Fonts, free, self-hostable)**

Rationale: Geometric humanist sans with excellent legibility at small sizes. Neutral, modern, pairs well with Cormorant without competing. Avoids the Inter/Roboto "startup template" feel that would undermine the premium positioning.

Weights loaded: 300, 400, 500

**Mono: JetBrains Mono**

Use only for phone numbers in structured data contexts, and any code snippets.

### 2.2 Type Scale

| Token | Size | Line-height | Letter-spacing | Weight | Use |
|---|---|---|---|---|---|
| `display-xl` | clamp(2.5rem → 4rem) | 1.05 | -0.02em | 600 | Hero H1 |
| `display-lg` | clamp(2rem → 3rem) | 1.10 | -0.02em | 600 | Section H2 |
| `display-md` | clamp(1.5rem → 2.25rem) | 1.15 | -0.01em | 400–600 | Sub-section H3 |
| `body-lg` | 1.125rem | 1.70 | 0 | 300–400 | Intro paragraphs |
| `body-base` | 1rem | 1.65 | 0 | 400 | Body copy |
| `body-sm` | 0.875rem | 1.60 | 0 | 400 | Secondary content, captions |
| `eyebrow` | 0.6875rem | 1.40 | 0.14em | 500 | Section labels (UPPERCASE) |
| `caption` | 0.75rem | 1.50 | 0.06em | 400 | Image captions, meta |

### 2.3 RTL / LTR Typography Rules

- In RTL mode (Hebrew), `font-family` for body and headings uses `hebrew` (Noto Serif Hebrew).
- In LTR mode (English), headings use `display` (Cormorant Garamond), body uses `sans` (DM Sans).
- `letter-spacing` values set to `0` in RTL — Hebrew spacing is governed by font metrics, not tracked artificially.
- Line-height stays consistent across both directions.
- Implement via `dir="rtl"` on `<html>` with `lang="he"` / `lang="en"` toggled by the language switcher.
- `text-align: start` everywhere — never `text-align: left` or `right` — logical property handles RTL automatically.

---

## 3. Core Components

All components are built on Shadcn/UI primitives with the token overrides below. No component ships in Shadcn's default visual state.

### 3.1 Buttons

**Primary (CTA)**
- Background: `mist` (#AFC8CB)
- Text: `ink` (#202A2C)
- Radius: `pill` (9999px)
- Padding: `px-6 py-3`
- Font: DM Sans 500 / Noto Serif Hebrew 500 (RTL)
- Hover: background `mist-70`, `translateY(-1px)`, shadow `card`
- Active: `scale(0.98)`, `translateY(0)`
- Focus: `focus` ring (3px mist at 50% opacity)
- Disabled: background `slate-20`, text `slate-60`, cursor `not-allowed`
- Use for: primary appointment CTA, contact form submit

**Ghost / Outline**
- Background: transparent
- Border: 1px `slate-20`
- Text: `ink`
- Radius: `pill`
- Hover: background `slate-10`, border `mist-40`
- Use for: secondary actions, language toggle

**Text Link**
- No background, no border
- Text: `ink` at rest, `slate` on hover
- Underline: none at rest; 1px `mist` underline on hover (CSS `::after` scaleX transition)
- Use for: navigation anchors, inline body links

**Icon Button (circular)**
- 40px × 40px, `radius-pill`
- Background: `slate-10` at rest, `mist-15` on hover
- Icon: `slate` → `ink` on hover
- Use for: close modals, social links in footer

### 3.2 Cards

**Service Card**
- Background: `paper`
- Border: 1px `slate-20`
- Radius: `lg` (16px)
- Shadow: `card` at rest, `card-hover` on hover
- Padding: 32px
- Structure: icon (48px circle, `mist-15` background, 24px Phosphor icon in ink) → service name (`display-md`, weight 600) → one-line description (`body-sm`, slate)
- Hover: shadow upgrades to `card-hover`, border transitions to `mist-40`
- No transform on hover — medical cards should not pop or float

**Credential / Trust Badge**
- Background: `mist-15`
- Border: 1px `mist-40`
- Radius: `md` (12px)
- Padding: `px-4 py-3`
- Structure: institution name (`eyebrow`, `ink-90`, uppercase) → credential title (`body-sm`, weight 500, `ink`) → year or role (`body-sm`, `slate`)
- No shadow — flat trust signals, not elevated interactive elements

**Testimonial / Quote Block (optional)**
- Background: `ink` (dark)
- Text: `paper`
- Radius: `xl` (24px)
- Accent: large `"` character in `mist`, 3rem, top-start corner

**Stat Counter**
- Layout: number (`display-lg`, ink, weight 600) + label (`eyebrow`, slate, below)
- No card border — sits on `bg-tinted` (mist-08) section, separated by negative space
- Vertical dividers between stats: 1px `slate-20`
- Numbers in `dir="ltr"` spans (see RTL notes)

### 3.3 Navigation / Header

Desktop layout (RTL — Hebrew primary):
```
┌─────────────────────────────────────────────────────────┐
│  [קבע תור ↗]  [צור קשר] [אודות] [שירותים] [ראשי]  | שם הרופא  │
└─────────────────────────────────────────────────────────┘
```

Desktop layout (LTR — English):
```
┌─────────────────────────────────────────────────────────┐
│  Dr. Noam Kitrey |  Home  Services  About  Contact  [Book Appointment ↗]  │
└─────────────────────────────────────────────────────────┘
```

- Position: `sticky top-0`, `z-40`
- Background: `paper` at 92% opacity, `backdrop-blur-sm` — very subtle blur only
- Border-bottom: 1px `slate-20` — appears after 40px scroll (JS class toggle `.scrolled`)
- Height: 72px desktop, 60px mobile
- Logo text: "ד"ר נעם קיטרי" (he) / "Dr. Noam Kitrey" (en) — ink, weight 500, no graphic mark
- Nav links: `body-sm`, ink, hover: `mist` underline via `::after` scaleX
- Language toggle: `[HE | EN]` — ghost button, pill. Active: ink weight 600; inactive: slate weight 400
- CTA: Primary pill button "קבע תור" / "Book Appointment"
- Mobile (<768px): hamburger → full-screen overlay, nav links stagger-fade (translateY 12px → 0, 200ms delays, 60ms stagger between items)

### 3.4 Footer

3-column layout on desktop, stacked on mobile:
```
┌──────────────────────────────────────────────────┐
│  Dr. Noam Kitrey  │  Navigation     │  Contact   │
│  ראש היחידה       │  ראשי           │  טלפון     │
│  לאורולוגיה,      │  שירותים        │  דוא"ל     │
│  מרכז שיבא        │  אודות          │  כתובת     │
│                   │  צור קשר        │            │
├──────────────────────────────────────────────────┤
│  © 2024 ד"ר נעם קיטרי  |  Privacy  |  [HE | EN] │
└──────────────────────────────────────────────────┘
```

- Background: `ink` (dark section)
- Text: `paper` (primary), `slate-60` (secondary)
- Mist accent: hover underlines on links only (`mist-40`)
- Top divider: 1px `ink-80` from the preceding section

### 3.5 Form Inputs

- Label: `eyebrow` token, `ink`, position above input (always above, never floating)
- Input: background `slate-10`, border 1px `slate-20`, radius `md` (12px), height 48px, `body-base`
- Focus: border `mist`, box-shadow `focus`, background `paper`
- Error: border `#B94040` (desaturated red), error text `body-sm` below input in `#B94040`
- Placeholder: `slate-60`
- Helper text: `body-sm`, `slate`, below input
- Select: same as input, chevron icon (Phosphor `CaretDown`) in slate; chevron rotates on open
- Textarea: same treatment, min-height 120px, resize vertical only

### 3.6 Section Wrapper

Standard container component used by all page sections:

```tsx
// Props: tinted?: boolean (adds mist-08 bg), dark?: boolean (adds ink bg)
<section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
  <div className="max-w-6xl mx-auto">
    {children}
  </div>
</section>
```

- Max-width: `max-w-6xl` (1152px) for content; `max-w-7xl` (1280px) for hero / full-bleed treatments
- Vertical padding: `py-20` mobile → `py-28` tablet → `py-32` desktop
- Tinted variant: `bg-mist-8` — used on alternating sections (not every section, to avoid a "striped" feel)
- Dark variant: `bg-ink` — used for credentials section and footer

### 3.7 Doctor Photo / Video Slots

**Hero Portrait Slot**
- Aspect ratio: 3:4 (portrait, vertical)
- Desktop: 420px wide, `radius-xl` (24px)
- Mobile: full-width, `radius-lg`
- Treatment: photo floats without a border. Mist-15 soft blob behind (CSS `::before`, `border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%`, 500px × 480px, `z-index: -1`, `position: absolute`)
- Placeholder (before photo supplied): `bg-mist-15` with a centered SVG silhouette outline in `slate-20`
- Required `alt` attribute: "ד"ר נעם קיטרי — אורולוג בכיר, מרכז שיבא" (RTL) / "Dr. Noam Kitrey, Senior Urologist, Sheba Medical Center" (LTR)

**Intro / Explainer Video Slot**
- Aspect ratio: 16:9
- Placeholder: `bg-ink`, centered play button (60px circle, `bg-mist`, white arrow icon at 24px)
- Caption below: `body-sm`, `slate`, italic — e.g. "ד"ר קיטרי מסביר על גישתו הטיפולית"
- Radius: `lg` (16px)
- No autoplay. Controls appear on hover. Click: `opacity: 0` on placeholder, `opacity: 1` on iframe.

**In-Context Portrait (About / Credentials section)**
- Aspect ratio: 4:5
- Desktop: 360px wide, `radius-xl`, floats beside credential text block
- Same blob-behind treatment (optional, smaller scale)
- Placeholder: `bg-mist-15`, slate silhouette

### 3.8 Eyebrow Label

```tsx
<span className="inline-block text-eyebrow font-sans font-medium uppercase tracking-[0.14em] text-slate mb-3">
  {label}
</span>
```

Used above every major section heading. Never styled with a background — pure text only.

---

## 4. Layout Direction per Page

### 4.1 Homepage

#### Hero (above fold)

```
Desktop (dir=rtl):
┌──────────────────────────────────────────────────────────┐
│  mist-08 background (full-width section tint)            │
│  max-w-7xl centered, py-32                               │
│                                                          │
│  col-start text (55%)            col-end portrait (45%) │
│  ─────────────────                ────────────────────   │
│  eyebrow: "מומחה בבריאות גברים"                         │
│  H1: "ד"ר נעם קיטרי"              [HERO PORTRAIT SLOT   │
│  (display-xl, ink, hebrew font)    3:4 aspect ratio      │
│                                    radius-xl             │
│  display-md (weight 400):          mist blob behind]     │
│  "ראש היחידה לאורולוגיה                                  │
│  תפקודית ואנדרולוגיה,                                   │
│  מרכז שיבא"                                             │
│                                                          │
│  body-lg (slate): one sentence on                        │
│  discretion and approach.                                │
│                                                          │
│  [קבע תור ↗]  [אודותי  →]                               │
│  (primary pill) (text link)                              │
└──────────────────────────────────────────────────────────┘
```

Key rules:
- NOT centered text. Split two-column layout. Text column has significant top padding advantage.
- No background image, no gradient overlay — the mist-08 tint and the portrait together create depth.
- No "scroll down" indicator.
- Mobile: portrait above text, single column, portrait first (visual hook before credentials).

#### Stats Row

```
┌──────────────────────────────────────────────────────────┐
│  bg: paper  |  border-top + border-bottom: 1px slate-20  │
│  py-10 (not a full section — a "belt" element)           │
│                                                          │
│  [27 שנות ניסיון] | [ראש יחידה – שיבא] | [יו"ר ועדת EAU] | [MD – ת"א]  │
│                                                          │
│  Each stat: number (display-lg, ink, weight 600)         │
│  Label below (eyebrow, slate)                            │
│  Vertical 1px slate-20 dividers between stats            │
└──────────────────────────────────────────────────────────┘
```

- 4 items on desktop, 2×2 grid on mobile
- No background tint — the white stripe between hero and services creates a pause

#### Services Preview

```
┌──────────────────────────────────────────────────────────┐
│  bg: paper  |  py-32                                     │
│                                                          │
│  eyebrow: "תחומי מומחיות"                                │
│  H2: "שירותים" (display-lg, ink)                         │
│  optional one-sentence intro (body-lg, slate)            │
│                                                          │
│  2-column grid, gap-4:                                   │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │ [mist circle icon] │  │ [mist circle icon] │         │
│  │ כשל זיקפה          │  │ דלקת בלוטת הערמונית│         │
│  │ one-line desc      │  │ one-line desc      │         │
│  └────────────────────┘  └────────────────────┘         │
│  (6 cards — 3 rows of 2)                                 │
│                                                          │
│  [← לכל השירותים]  ghost button, centered below grid    │
└──────────────────────────────────────────────────────────┘
```

- 2-column grid — NOT 3-column. Deliberate: 2 columns read calmer.
- Cards fade-in-up on scroll with 80ms stagger.

#### Video / Intro Section

```
┌──────────────────────────────────────────────────────────┐
│  bg: mist-08 (tinted)  |  py-32                          │
│                                                          │
│  [col-end text (50%)]           [col-start video (50%)] │
│  eyebrow: "מפגש עם ד"ר קיטרי"                           │
│  H2: "גישה אישית ומקצועית"     [VIDEO SLOT              │
│  body-lg: 2–3 sentences.        16:9 ratio               │
│  Personal approach, philosophy. radius-lg                │
│                                 ink background           │
│  [← קרא עוד אודותי]            with mist play btn]      │
└──────────────────────────────────────────────────────────┘
```

- Mobile: stacked (video first, text below)

#### Credentials Section

```
┌──────────────────────────────────────────────────────────┐
│  bg: ink (dark)  |  py-32  |  text: paper               │
│                                                          │
│  [col-start text (55%)]       [col-end portrait (45%)]  │
│  eyebrow (slate-60): "כישורים ומינויים"                  │
│  H2 (paper): "ניסיון ומינויים"                          │
│                                                          │
│  [IN-CONTEXT PORTRAIT SLOT                               │
│  Credential badge 1:           4:5 ratio                 │
│  ┌────────────────────────┐   radius-xl                 │
│  │ SHEBA MEDICAL CENTER   │   subtle mist blob]         │
│  │ ראש היחידה לאורולוגיה  │                             │
│  │ תפקודית ואנדרולוגיה    │                             │
│  └────────────────────────┘                             │
│  Credential badge 2: SHSQ Director                      │
│  Credential badge 3: EAU Committee Chair                │
│  Credential badge 4: Tel Aviv University MD, 1997       │
└──────────────────────────────────────────────────────────┘
```

- Dark section creates visual gravitas and breaks the page rhythm.
- Credential badge borders use `mist-40` — the mist on dark creates a faint, elegant glow.
- No mist text on dark background (contrast check: mist on ink = 3.2:1, passes AA for large text only — use mist only as borders/accents here).

#### Contact / Appointment Section

```
┌──────────────────────────────────────────────────────────┐
│  bg: paper  |  py-32                                     │
│  Centered, max-w-xl:                                     │
│                                                          │
│  eyebrow: "צור קשר"                                      │
│  H2: "קביעת תור"                                         │
│  body-lg (slate): discreet, private consultations.       │
│                                                          │
│  Form (2-column on desktop, 1-column mobile):            │
│  [שם] (text)           [טלפון] (tel)                    │
│  [סיבת הפנייה] (textarea, full width)                    │
│  [קבע תור ↗] (primary CTA, full width on mobile)        │
│                                                          │
│  Below: phone + email as text links (dir="ltr" on data)  │
└──────────────────────────────────────────────────────────┘
```

---

### 4.2 About Page

```
Section 1 — Compact hero:
  Centered, mist-08 background, H1 + short sentence only. py-24.

Section 2 — Doctor bio split:
  [text 55% | in-context portrait 45%]
  Body: personal approach, treatment philosophy, MD background.
  Quote pullout: Cormorant Garamond 300italic, display-md, ink-80.

Section 3 — Credentials grid:
  Paper background. 2-column grid of credential badges. py-32.
  Each badge: institution, role, year range.

Section 4 — Publications / Research (conditional, if provided):
  Flat ruled list. body-sm, ink. Divided by 1px slate-20 lines.
  No card boxing — pure typographic list.

Section 5 — Contact strip:
  Same shared ContactCTASection component as homepage bottom.
```

---

### 4.3 Services Page

```
Section 1 — Hero:
  eyebrow + H1 + 2-line description. Paper bg. No portrait.

Section 2 — Two-column service index (desktop):
  ┌──────────────────────┬──────────────────────────────┐
  │ Sticky sidebar       │ Service detail content       │
  │ (lg+ only):          │ (scrollable):                │
  │                      │                              │
  │ • כשל זיקפה          │ H2: service name             │
  │ • שפיכה מוקדמת       │ body-lg: description         │
  │ • מחלת פיירוני        │ body-base: approach          │
  │ • שיקום לאחר כריתה   │                              │
  │   ערמונית            │ text-link: "קבע תור לייעוץ"  │
  │ • אי-שליטה על שתן    │ (bottom of each service)     │
  │ ...                  │                              │
  └──────────────────────┴──────────────────────────────┘

  Mobile: Full-width stacked sections with jump-to anchor links at top.

Section 3 — Contact strip (shared component).
```

- Sticky sidebar: `position: sticky`, `top: 88px` (clears nav height), visible at `lg+` only
- In RTL: sticky sidebar is on the right side of the layout

---

### 4.4 Contact Page

```
Section 1 — Split contact:
  ┌─────────────────────────────┬──────────────────────────┐
  │ Form (55%)                  │ Location info (45%)      │
  │                             │                          │
  │ Name (text)                 │ eyebrow: "קליניקה"       │
  │ Phone (tel)                 │ Address: מגדל רסיקל,     │
  │ Service area (select)       │ 156 דרך בגין, ת"א, קומה 17│
  │ Message (textarea)          │                          │
  │ [שלח הודעה] CTA             │ Phone: 054-7181718       │
  │                             │ Email: Dr.Kitrey@gmail.com│
  │                             │                          │
  │                             │ Google Maps iframe below  │
  └─────────────────────────────┴──────────────────────────┘

  Mobile: stacked (form first, location below). Map full width.
```

---

## 5. RTL / LTR Notes

### What mirrors in RTL
- Navigation: logo on right, CTA on left
- Hero split: text column on right, portrait on left
- All flex/grid layouts: `dir="rtl"` on `<html>` triggers automatic CSS logical property mirroring
- Back/forward arrows: `←` ↔ `→` swap meaning; use `→` for "read more" in LTR, `←` in RTL (pointing into the text direction)
- Form field text: `text-align: start` (logical)
- Button icon position: icon on right of text in LTR; icon on left of text in RTL (Tailwind `rtl:` variant)
- Sticky sidebar: on right in RTL, on left in LTR

### What does NOT mirror
- **Logo text**: rendered as authored, not flipped
- **Phone number** `054-7181718`: wrap in `<span dir="ltr">`
- **Email address** `Dr.Kitrey@gmail.com`: wrap in `<span dir="ltr">`
- **Stat numbers**: wrap in `<span dir="ltr">` to prevent digit reordering
- **Video player controls**: browser-native, not mirrored
- **Social media icons**: not mirrored
- **Map iframe**: not mirrored

### Implementation

```tsx
// app/layout.tsx
<html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>

// Mixed-direction inline content:
<span dir="ltr" className="font-mono">054-7181718</span>
<span dir="ltr">Dr.Kitrey@gmail.com</span>

// Tailwind RTL variants:
// Arrow that points correctly in each direction:
<span className="inline-block ltr:ml-2 rtl:mr-2 rtl:rotate-180">→</span>
```

---

## 6. Motion / Interaction

MOTION_INTENSITY = 3. Invisible polish — no showcase. Every animation must serve function.

### 6.1 Scroll-entry fade-in (universal)

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- Trigger: IntersectionObserver, threshold = 80px into viewport, `once: true`
- Grid children stagger: `transition-delay: calc(var(--index) * 80ms)`, set via inline style
- Implementation: plain CSS + IntersectionObserver — no Framer Motion, no GSAP for this site

### 6.2 Button interactions

```css
.btn-primary {
  transition: background-color 200ms ease-out,
              transform 200ms ease-out,
              box-shadow 200ms ease-out;
}
.btn-primary:hover  { transform: translateY(-1px); }
.btn-primary:active { transform: scale(0.98) translateY(0); }
```

No magnetic hover. No particle effects on click.

### 6.3 Nav scroll behaviour

```js
// Add .scrolled class when window.scrollY > 40
// CSS: .scrolled { border-bottom: 1px solid var(--color-slate-20); }
// transition: border-color 200ms ease-out
```

Nav link hover underline: CSS `::after` pseudo-element, `scaleX(0 → 1)`, 200ms premium ease, `transform-origin: end` (RTL-aware).

### 6.4 Card hover

```css
.service-card {
  transition: box-shadow 250ms ease-out, border-color 250ms ease-out;
}
.service-card:hover {
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-mist-40);
}
```

No `transform` on cards — medical context, no popping or floating.

### 6.5 Video slot

- Play button on hover: `scale(1.08)` on circle, 200ms ease-out
- On click: `opacity: 0` on placeholder (300ms), then replace with iframe at `opacity: 1` (300ms)
- No autoplay, no sound on page load

### 6.6 Stat counters (optional)

If count-up is used:
- `requestAnimationFrame` loop, ease-out curve, 1200ms
- Triggers once on first scroll-into-view (IntersectionObserver `once: true`)
- `prefers-reduced-motion`: skip animation, show final value immediately

### 6.7 Mobile nav overlay

- Hamburger → X: two bars `rotate(45deg)` and `rotate(-45deg)` using absolute positioning, 300ms `cubic-bezier(0.16, 1, 0.3, 1)`
- Overlay: `opacity: 0 → 1`, 250ms, `bg-paper/96 backdrop-blur-sm`
- Nav links: `translateY(12px) opacity(0) → translateY(0) opacity(1)`, 200ms each, 60ms stagger per item

### 6.8 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    transition: opacity 150ms ease-out;
    transform: none;
  }
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 100ms !important;
  }
}
```

---

## 7. Accessibility Contracts

### Contrast ratios (WCAG AA minimum = 4.5:1 normal text, 3:1 large text)

| Foreground | Background | Ratio | Pass level |
|---|---|---|---|
| ink (#202A2C) | paper (#FFFFFF) | 15.8:1 | AAA |
| slate (#828C8D) | paper (#FFFFFF) | 4.7:1 | AA |
| ink (#202A2C) | mist-15 (#EEF4F5) | 13.2:1 | AAA |
| ink (#202A2C) | mist (#AFC8CB) | 5.0:1 | AA |
| paper (#FFFFFF) | ink (#202A2C) | 15.8:1 | AAA |
| mist (#AFC8CB) | ink (#202A2C) | 3.2:1 | AA large text only |

**CRITICAL WARNING:** Mist (#AFC8CB) on paper (#FFFFFF) = 2.8:1 — FAILS AA. **Mist must never be used as text colour on a white background.** Mist is used only as: background tints, borders, icon container backgrounds, and primary button background (where the text is ink, not paper).

### Other requirements
- All interactive elements: minimum 44px tap target
- All images: meaningful `alt` attributes required at build time (placeholders have descriptive alts)
- Video slot: requires closed captions (founder responsibility for video content)
- Form: all inputs have associated `<label for>`, not just placeholder text
- Language toggle: `aria-label="שנה שפה / Switch language"`, `lang` attribute updates on switch
- Focus management: modal open shifts focus to first interactive element; close returns focus to trigger

---

## 8. Dispatch Packet

Build tasks for frontend-engineer, in dependency order. One worktree per task.

---

### TASK 1 — Foundation: Tokens + Global Styles
**Branch:** `feat/design-tokens`
**Files:**
- `tailwind.config.ts` — full token extension from Section 1.2
- `src/app/globals.css` — CSS custom properties (Section 1.1) + RTL/LTR base rules
- `src/lib/fonts.ts` — next/font self-host: Noto Serif Hebrew (300,400,600,700), Cormorant Garamond (300i,400,600), DM Sans (300,400,500)
**Acceptance criteria:**
- `npx tailwindcss` compiles without errors
- All CSS variables resolve in browser devtools
- Fonts render: inspect `document.fonts` in browser — 3 families loaded
- `<html dir="rtl">` → layout flips correctly on a test page
- `<html dir="ltr">` → layout standard LTR

---

### TASK 2 — Core UI Components
**Branch:** `feat/design-components`
**Depends on:** Task 1
**Files in `src/components/ui/`:**
- `button.tsx` — variants: primary, ghost, text-link, icon-button. All states (default/hover/active/disabled/focus). RTL icon position via `rtl:` Tailwind variant.
- `card.tsx` — variants: service-card, credential-badge, stat-counter
- `eyebrow.tsx` — styled span (uppercase, tracked, slate)
- `image-slot.tsx` — aspect-ratio wrapper with placeholder. Props: `ratio: "3/4" | "4/5" | "16/9"`, `alt: string`, `src?: string`
- `video-slot.tsx` — 16:9, ink placeholder with mist play button, caption below. Props: `videoId?: string`, `caption?: string`
- `section-wrapper.tsx` — padding/max-width container. Props: `tinted?: boolean`, `dark?: boolean`
**Acceptance criteria:**
- All 4 button states implemented and visible
- `image-slot` renders correct aspect ratio and placeholder in both RTL and LTR
- No Shadcn component ships in default (unthemed) state
- Zero emojis in any component

---

### TASK 3 — Navigation + Footer
**Branch:** `feat/design-nav-footer`
**Depends on:** Task 2
**Files:**
- `src/components/layout/navbar.tsx` — sticky, scroll-triggered border, mobile hamburger overlay, language toggle, primary CTA
- `src/components/layout/footer.tsx` — dark 3-column (ink bg), RTL/LTR responsive
- `src/components/layout/language-toggle.tsx` — ghost pill pair, updates `html[dir]` + `html[lang]`, persists to `localStorage`
**Acceptance criteria:**
- Language toggle correctly updates `dir` and `lang` on `<html>`
- Phone and email in footer wrapped in `<span dir="ltr">`
- Nav border appears after 40px scroll
- Mobile overlay: hamburger → X animation works; nav links stagger in
- Footer renders correctly in both RTL and LTR

---

### TASK 4 — Homepage
**Branch:** `feat/page-home`
**Depends on:** Tasks 1–3
**Files:**
- `src/app/page.tsx`
- `src/components/sections/home/HeroSection.tsx`
- `src/components/sections/home/StatsRow.tsx`
- `src/components/sections/home/ServicesPreview.tsx`
- `src/components/sections/home/VideoSection.tsx`
- `src/components/sections/home/CredentialsSection.tsx`
- `src/components/sections/shared/ContactCTASection.tsx` (shared across pages)
**Acceptance criteria:**
- Hero: split layout (text/portrait), mist-08 bg, portrait slot clearly visible as placeholder
- Stats: 4-item row on desktop, 2×2 on mobile
- Services: 2-column grid (not 3-column), 6 service cards with Phosphor icons
- Video section: mist-08 bg, video slot with play button placeholder
- Credentials: ink dark bg, portrait slot, 4 credential badges
- Form: all 4 states (default/loading/success/error)
- Scroll-reveal (fade-in-up) on all sections
- Full responsive: sm / md / lg / xl breakpoints
- RTL + LTR switch: test both directions, no layout breaks

---

### TASK 5 — About Page
**Branch:** `feat/page-about`
**Depends on:** Tasks 1–3
**Files:**
- `src/app/about/page.tsx`
- `src/components/sections/about/HeroCompact.tsx`
- `src/components/sections/about/DoctorBioSection.tsx`
- `src/components/sections/about/CredentialsGrid.tsx`
- `src/components/sections/about/PublicationsList.tsx`
**Acceptance criteria:**
- Bio split: text + portrait slot side by side on desktop, stacked on mobile
- Credential badges: 2-column grid on desktop
- Publications: flat ruled list (NOT cards), 1px slate-20 dividers
- Shared `ContactCTASection` at bottom
- RTL + LTR correct

---

### TASK 6 — Services Page
**Branch:** `feat/page-services`
**Depends on:** Tasks 1–3
**Files:**
- `src/app/services/page.tsx`
- `src/components/sections/services/ServiceIndex.tsx` (two-column sticky layout)
**Services to include (all from brief):**
- Male sexual dysfunction: ED, premature ejaculation, Peyronie's, post-prostatectomy rehab
- Functional urology: incontinence, neurogenic bladder, overactive bladder, chronic pelvic pain, interstitial cystitis, BPH
- Specialised: gender-affirmation support, urological trauma, intermittent catheterisation
**Acceptance criteria:**
- Sticky sidebar visible on `lg+` only, collapses on mobile
- Each service: H2, description (body-lg), text-link CTA at bottom
- Anchor links from sidebar to sections work correctly
- In RTL: sticky sidebar on right side of layout
- Mobile: jump-to anchor links at top, then stacked sections

---

### TASK 7 — Contact Page
**Branch:** `feat/page-contact`
**Depends on:** Tasks 1–3
**Files:**
- `src/app/contact/page.tsx`
**Acceptance criteria:**
- Split layout: form (55%) + location block (45%) on desktop; stacked on mobile
- Phone `054-7181718` and email `Dr.Kitrey@gmail.com` wrapped in `<span dir="ltr">`
- Google Maps iframe has `title` attribute, responsive
- Form: 4 states (default/loading/success/error). Action can be `console.log` stub — backend is a separate task.
- `tel:` link on phone number, `mailto:` on email

---

### TASK 8 — i18n Wiring
**Branch:** `feat/i18n`
**Depends on:** Tasks 4–7
**Implementation:** Use `next-intl` (preferred) or plain context + JSON files
- `src/messages/he.json` — all Hebrew strings
- `src/messages/en.json` — all English strings
- Default locale: Hebrew (`/`); English at `/en` or via client-side toggle
**Acceptance criteria:**
- Zero hardcoded strings in any component
- Language toggle switches all visible text
- `<html dir>` and `<html lang>` update correctly
- No layout breaks on language switch (test especially: hero, services page, footer)

---

### TASK 9 — QA + Accessibility Audit
**Branch:** `feat/qa-a11y`
**Depends on:** Tasks 4–8
**Checks:**
- axe-core: zero critical violations
- Lighthouse a11y: score ≥ 90
- Manual: `mist` never appears as body text on white (grep for `text-mist` in tsx)
- Manual: all `<input>` elements have associated `<label for>`
- Manual: all phone/email strings have `dir="ltr"` wrappers
- Manual: `prefers-reduced-motion` CSS block is present and tested
- Manual: all interactive elements ≥ 44px tap target (test on mobile viewport)
**Acceptance criteria:** QA-Lead PASS with no critical or high-severity violations.

---

*End of DESIGN-SYSTEM.md — Design-Lead, 2026-06-06*
