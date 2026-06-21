# Dr. Noam Kitrey — Art Direction V2 (LOCKED)
*Design-Lead, 2026-06-21. Supersedes the palette + font sections of `DESIGN-SYSTEM.md`. Everything else in that 924-line spec is carried forward unchanged (see Section C).*

> **What changed from V1:** (1) The muted `mist #AFC8CB` accent is **retired**. New direction = soft cool-white base + a **confident bright medical blue** accent, matching the energy of reference `03-ref-clinic-minimal.jpg`. (2) Bilingual fonts are locked **Hebrew-first**: the prior serif-vs-sans conflict is resolved decisively in favour of a single premium **sans** pairing that renders consistently in both scripts.
>
> **What stayed:** spacing grid, radii, shadow recipes, easing, motion philosophy, RTL rules, component anatomy, per-page layout skeletons. Frontend reads V1 for structure, V2 for tokens + type.

---

## A) Locked Color Tokens

### Concept
A **soft, cool, near-white canvas** (not stark `#FFFFFF` everywhere — paper white for surfaces, a faint cool-blue wash for hero/section tints) carrying **one confident accent: `#1463E6`** — a bright, saturated-but-tasteful medical blue. It reads as *competence and clarity* (the blue every patient associates with medicine) while the generous whitespace and cool-charcoal ink keep it **premium and discreet**, never garish or "big-hospital loud". The accent is used sparingly — CTAs, key highlights, icon circles, links — so its brightness signals importance rather than shouting everywhere.

This deliberately **overrides** the `design-taste-frontend` "electric-blue-is-AI-slop" caution: in a medical context a confident blue is category-correct, not cliché. We tame it with restraint (1 accent only, < 80% saturation pull on washes, ink for body text) per the skill's "Max 1 Accent" rule.

### A.1 Token table (name · hex · role)

| Token | Hex | Role |
|-------|-----|------|
| `paper` | `#FFFFFF` | Pure white — cards, surfaces, default page base |
| `canvas` | `#FBFCFE` | Faint cool off-white — alternative page background (warmer than washes) |
| `wash` | `#EAF1FE` | Soft cool-blue section/hero wash tint (the pastel hero feel from ref #3) |
| `wash-deep` | `#DCE9FF` | Stronger blue wash — nested panels, hero portrait backdrop |
| `surface` | `#F5F8FD` | Input backgrounds, hover surfaces, subtle card fills |
| `accent` | `#1463E6` | **Primary bright medical blue** — CTAs, primary buttons, active states, links |
| `accent-hover` | `#0E4FBF` | Accent pressed/hover — deeper blue (also AA-safe for white text, 7.27:1) |
| `accent-light` | `#5B92F0` | Lighter accent — accents on the dark `ink` section, hover glints |
| `soft-blue` | `#BBD5FA` | Pale blue — badge backgrounds, icon-circle fills, decorative blobs on light bg |
| `soft-blue-tint` | `#D6E6FC` | Even paler blue — large organic hero blob behind portrait |
| `ring` | `#9DC0F7` | Focus-ring blue — visible on both white and ink |
| `ink` | `#14202E` | Cool charcoal (blue-undertone) — primary text, dark sections, headings |
| `ink-80` | `#2C3D4F` | Ink lightened — dark-section sub-headings, secondary dark-on-light heads |
| `ink-10` | `#E7ECF1` | Ink at ~10% — hairline surface tint on paper |
| `slate` | `#5A6B7B` | Cool slate — secondary/body-muted text (AA on white: 5.49:1) |
| `slate-strong` | `#44535F` | Darker slate — secondary text needing AAA-ish weight (7.93:1) |
| `slate-60` | `#9AA7B2` | Disabled text, inactive UI |
| `border` | `#D5DDE6` | Cool-grey hairline borders, dividers |
| `border-accent` | `#BBD5FA` | Accent-tinted border on hover / active cards (= `soft-blue`) |
| `success` | `#2E7D52` | Desaturated green — form success (5.03:1 on white) |
| `error` | `#C2403D` | Desaturated red — form errors (5.13:1 on white) |

### A.2 WCAG AA verification (verified, not estimated)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `ink #14202E` | `paper #FFFFFF` | **16.46:1** | AAA |
| `slate #5A6B7B` | `paper #FFFFFF` | **5.49:1** | AA (normal text) |
| `slate-strong #44535F` | `paper` | **7.93:1** | AAA-tier secondary |
| **`accent #1463E6`** | **`paper`** | **5.31:1** | **AA — usable as link/text on white** |
| **`paper`** | **`accent #1463E6`** | **5.31:1** | **AA — white CTA text on blue button** |
| `paper` | `accent-hover #0E4FBF` | **7.27:1** | AAA — hovered button text |
| `ink #14202E` | `wash #EAF1FE` | **14.51:1** | AAA — body on hero wash |
| `slate #5A6B7B` | `wash #EAF1FE` | **4.84:1** | AA |
| `accent #1463E6` | `wash #EAF1FE` | **4.68:1** | AA (large/UI text + non-text contrast) |
| `ink #14202E` | `surface #F5F8FD` | **15.46:1** | AAA — inputs |
| `slate #5A6B7B` | `surface #F5F8FD` | **5.16:1** | AA |
| `ink #14202E` | `soft-blue #BBD5FA` | **10.98:1** | AAA — text inside badges/icon circles |
| `paper` | `ink #14202E` | **16.46:1** | AAA — dark section |
| `accent-light #5B92F0` | `ink #14202E` | **5.34:1** | AA — accent text on dark section |
| `soft-blue #9DC0F7` | `ink` | **8.87:1** | AAA — accent borders/glow on dark |

**KEY WIN over V1:** the old `mist` failed AA on white (2.8:1) and could never be a text colour. The new `accent #1463E6` **passes AA both directions** (text-on-white *and* white-on-accent = 5.31:1), so the blue can carry links, button text, and emphasis — far more flexible while staying premium.

**One guardrail:** `accent #1463E6` on `ink` dark section = 3.10:1 (large-text/UI only). On dark sections use `accent-light #5B92F0` for any small accent text; reserve `#1463E6`/`soft-blue` for borders, fills, and the dark-section CTA (which uses white text on the blue, 5.31:1, fine).

### A.3 CSS custom properties (`globals.css`)

```css
:root {
  /* ---- Base / canvas ---- */
  --color-paper:        #FFFFFF;
  --color-canvas:       #FBFCFE;
  --color-wash:         #EAF1FE;
  --color-wash-deep:    #DCE9FF;
  --color-surface:      #F5F8FD;

  /* ---- Accent (bright medical blue) ---- */
  --color-accent:       #1463E6;
  --color-accent-hover: #0E4FBF;
  --color-accent-light: #5B92F0;
  --color-soft-blue:      #BBD5FA;
  --color-soft-blue-tint: #D6E6FC;
  --color-ring:         #9DC0F7;

  /* ---- Ink / text ---- */
  --color-ink:          #14202E;
  --color-ink-80:       #2C3D4F;
  --color-ink-10:       #E7ECF1;
  --color-slate:        #5A6B7B;
  --color-slate-strong: #44535F;
  --color-slate-60:     #9AA7B2;

  /* ---- Lines / semantic ---- */
  --color-border:        #D5DDE6;
  --color-border-accent: #BBD5FA;
  --color-success:       #2E7D52;
  --color-error:         #C2403D;

  /* ---- Semantic roles ---- */
  --bg-page:         var(--color-paper);
  --bg-tinted:       var(--color-wash);
  --bg-dark-section: var(--color-ink);
  --surface:         var(--color-surface);
  --text-primary:    var(--color-ink);
  --text-secondary:  var(--color-slate);
  --text-inverse:    var(--color-paper);
  --border-subtle:   var(--color-border);
  --border-hover:    var(--color-border-accent);
  --accent:          var(--color-accent);
  --accent-hover:    var(--color-accent-hover);
  --focus-ring:      var(--color-ring);
}
```

### A.4 Tailwind theme `extend` snippet

```ts
// tailwind.config.ts → theme.extend.colors (replaces the V1 ink/slate/mist block)
colors: {
  paper:  '#FFFFFF',
  canvas: '#FBFCFE',
  wash:   { DEFAULT: '#EAF1FE', deep: '#DCE9FF' },
  surface:'#F5F8FD',
  accent: {
    DEFAULT: '#1463E6',
    hover:   '#0E4FBF',
    light:   '#5B92F0',
    soft:    '#BBD5FA',
    tint:    '#D6E6FC',
  },
  ring:   '#9DC0F7',
  ink: {
    DEFAULT: '#14202E',
    80:      '#2C3D4F',
    10:      '#E7ECF1',
  },
  slate: {
    DEFAULT: '#5A6B7B',
    strong:  '#44535F',
    60:      '#9AA7B2',
  },
  border:  { DEFAULT: '#D5DDE6', accent: '#BBD5FA' },
  success: '#2E7D52',
  error:   '#C2403D',
},
```

> Token-mapping cheat for porting V1 components: `mist → accent.soft` (fills/borders/badges), `mist` CTA bg → `accent` (white text now), `mist-08 / mist-15 → wash`, `slate-20 → border`, `ink` stays `ink`.

---

## B) Locked Typography — Hebrew-First Bilingual

### B.1 Decision & rationale
The V1 serif pairing (Noto Serif Hebrew + Cormorant Garamond) is **retired**. Reason: Hebrew has no true italics and few premium serifs that render with the crispness Latin serifs get; pairing a Latin display serif with a Hebrew serif produced two different "voices" and an inconsistent bilingual feel. A **single, premium geometric-humanist sans** that ships excellent Hebrew *and* Latin gives one consistent voice across scripts — and reads as modern, clean, trustworthy (exactly the ref #3 vibe), which suits a sensitive practice better than an ornate serif.

| Role | Font | Source | Why |
|------|------|--------|-----|
| **Hebrew (primary) — headings + body** | **Heebo** | Google Fonts, self-host | Israel's most-trusted UI Hebrew face (derived from Roboto's metrics), full niqqud + Hebrew block, ships weights 300–800. Clean, confident, legible at all sizes. |
| **Latin (secondary) — headings + body** | **Inter** | Google Fonts, self-host | Pairs metric-cleanly with Heebo (shared geometric-humanist DNA → consistent rhythm when toggling locales). Workhorse legibility. |
| **Numbers / phone / data** | **Geist Mono** | Google Fonts, self-host | Tabular figures for `054-7181718`, stat counters, structured data. |

> **Skill note:** `design-taste-frontend` discourages Inter for "creative" vibes. We accept it here intentionally — this is a **trust-first medical site**, where Inter's neutral clarity is an asset, and its metric kinship with Heebo is the deciding factor for bilingual consistency. The brand voice comes from **layout, blue accent, and whitespace**, not a flashy display face. (If the founder later wants more Latin character, `Geist Sans` is the pre-approved drop-in for Inter — same metrics family — with **no Hebrew change**.)

### B.2 `next/font` import note

```ts
// src/lib/fonts.ts — all self-hosted via next/font/google
import { Heebo, Inter } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'

export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
})
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
// In <html>: className={`${heebo.variable} ${inter.variable} ${geistMono.variable}`}
```

### B.3 Per-`lang` assignment rules

```css
/* Hebrew is primary/canonical → Heebo drives both heading + body in RTL */
html[lang="he"] { font-family: var(--font-heebo), 'Arial Hebrew', sans-serif; }
html[lang="he"] * { letter-spacing: 0 !important; }   /* NEVER track Hebrew */

/* English secondary → Inter */
html[lang="en"] { font-family: var(--font-inter), system-ui, sans-serif; }

/* Numbers / phone / email regardless of locale */
.font-mono, [dir="ltr"].tabular { font-family: var(--font-mono), monospace; font-variant-numeric: tabular-nums; }
```

Tailwind `fontFamily`:
```ts
fontFamily: {
  heebo: ['var(--font-heebo)', 'Arial Hebrew', 'sans-serif'],
  inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono:  ['var(--font-mono)', 'monospace'],
  // convenience aliases used by components:
  display: ['var(--font-inter)', 'system-ui', 'sans-serif'], // EN headings
  sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'], // EN body
}
```
> Component rule: apply `font-heebo` at the `html[lang=he]` root and let body inherit; in LTR, `display`/`sans` both resolve to Inter so heading vs body differentiate by **weight + size**, not family — this is what keeps the two locales visually consistent.

### B.4 Type scale (carried forward from V1 — clamp() unchanged, weights re-tuned for sans)

| Token | Size (clamp) | Line-height | Letter-spacing (LTR) | Weight | Use |
|---|---|---|---|---|---|
| `display-xl` | `clamp(2.5rem, 5vw, 4rem)` | 1.05 | -0.02em | 700 | Hero H1 |
| `display-lg` | `clamp(2rem, 4vw, 3rem)` | 1.10 | -0.02em | 600 | Section H2 |
| `display-md` | `clamp(1.5rem, 3vw, 2.25rem)` | 1.15 | -0.01em | 500–600 | Sub-section H3 |
| `body-lg` | `1.125rem` | 1.70 | 0 | 400 | Intro paragraphs |
| `body-base` | `1rem` | 1.65 | 0 | 400 | Body copy |
| `body-sm` | `0.875rem` | 1.60 | 0 | 400 | Secondary, captions |
| `caption` | `0.75rem` | 1.50 | 0.05em (LTR only) | 400 | Image captions, meta |
| `eyebrow` | `0.6875rem` | 1.40 | 0.14em (LTR only) | 600 | Section labels (UPPERCASE in LTR; normal case in HE) |

> RTL overrides: `eyebrow`/`caption` tracking → `0`; eyebrow is **not** uppercased in Hebrew (Hebrew has no case) — render as small-tracked normal text instead.

---

## C) Reused From V1 `DESIGN-SYSTEM.md` — Confirmed Carried Forward Unchanged

These values are **not** re-specified here; cite V1 Section numbers. Frontend uses them verbatim.

| What | Value | V1 ref |
|------|-------|--------|
| **Spacing grid** | 8px base; `1=8 2=16 3=24 4=32 5=40 6=48 7=56 8=64 10=80 12=96 16=128 20=160 24=192 32=256` | §1.2 |
| **Radii** | `xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · pill 9999` | §1.2 |
| **Shadows** | `card: 0 2px 12px rgba(20,32,46,.06)` · `card-hover: 0 4px 24px rgba(20,32,46,.10)` · `focus: 0 0 0 3px rgba(20,99,230,.45)` *(re-tinted to new accent)* | §1.2 |
| **Easing** | `premium: cubic-bezier(0.16, 1, 0.3, 1)` | §1.2 / §6 |
| **Motion philosophy** | MOTION_INTENSITY 3; CSS + IntersectionObserver only; no Framer/GSAP; `transform`+`opacity` only; `prefers-reduced-motion` block | §0, §6 |
| **Fade-in-up** | `translateY(16px)→0`, opacity, 600ms premium ease, 80ms stagger, threshold 80–100px, once | §6.1 |
| **Component anatomy** | Buttons / cards / nav / footer / form inputs / image+video slots / section wrapper — structure unchanged; only colour tokens remap (see B cheat-sheet) | §3 |
| **RTL/LTR rules** | `dir` on `<html>`, `text-align: start`, `<span dir="ltr">` for phone/email/numbers, mirrored arrows, sticky sidebar side-swap | §5 |
| **Per-page layout skeletons** | Home / About / Services / Contact section orders + grids | §4 |
| **A11y contracts** | 44px tap targets, label-for on inputs, alt text, language-toggle aria-label, focus management | §7 |
| **Dispatch packet** | Tasks 1–9 build order | §8 |

> **Two token re-tints to apply when porting V1:** shadow `focus`/`mist-glow` and the form-input focus ring now use `rgba(20,99,230,.45)` (new accent), not the old mist rgba. The dark-section credential-badge "glow" border becomes `soft-blue #9DC0F7` (8.87:1 on ink).

---

## D) Art-Direction Note (the concept, in words)

Imagine a **well-lit private consultation room with a window** — soft daylight, calm, exact. That is the feeling: a near-white space that breathes, organised with quiet precision, lifted by **one confident stroke of medical blue** wherever the patient needs to act or trust. The blue is the visual handshake of medicine — but used *sparingly and at full confidence* (a bright `#1463E6` CTA, a blue icon circle, a single accent line) against generous whitespace, it reads **expert and reassuring**, never the saturated "big-hospital" wall of blue we explicitly reject. Soft-blue washes (`#EAF1FE`) tint the hero and alternating sections so the page has *depth without imagery noise*; pale-blue organic **blobs** (`#D6E6FC`, asymmetric `border-radius`) sit behind the doctor's portrait and icon circles to add warmth and a human, hand-placed feel — the opposite of a sterile grid.

**Hero treatment:** asymmetric split (text-start / portrait-end), `wash` background, a large soft-blue blob floating behind the 3:4 portrait slot, no background photo, no scroll cue — the portrait + blue wash carry the depth. **Motion philosophy:** restrained per Emil Kowalski — every animation has a purpose, none is decorative. `ease-out` / the `premium` cubic-bezier, all motion under ~600ms scroll-reveal and 200–250ms on interaction, `transform`+`opacity` only, full `prefers-reduced-motion` honour. **Imagery/slots:** founder-supplied portrait + explainer video live in clearly composed slots (3:4 hero, 4:5 in-context, 16:9 video) with blob-behind treatment and descriptive bilingual placeholders until assets arrive. Reference `03-ref-clinic-minimal.jpg` is the **mood** — its soft pastel hero, single-doctor focus, clean cards — **not** a layout to clone; our credential heavyweight, RTL-Hebrew-first structure, and disciplined single-accent system make it Dr. Kitrey's own.

---

## E) Per-Page Composition Direction

- **Home** — Asymmetric `wash` hero (text-start, portrait-end + soft-blue blob); thin white stats "belt" (4 credentials); 2-column service preview (calmer than 3-col) with `accent.soft` icon circles; `wash` video section; **`ink` dark credentials section** with `accent-light`/`soft-blue` accents; shared contact CTA. Accent appears only at: primary CTA, icon circles, the dark-section CTA, link hovers.
- **About** — Compact `wash` hero (H1 + one line); bio split (text-start / 4:5 in-context portrait + blob); pull-quote rendered in `ink-80` Inter/Heebo weight-500 (no italic — Hebrew has none); 2-col credential-badge grid (`soft-blue` bordered); flat ruled publications list (no cards, `border` dividers); shared contact CTA.
- **Expertise / Services** — Paper hero (no portrait); two-column sticky index (sidebar start-side, mirrors in RTL) with `accent` active-item indicator; each service = H2 + `body-lg` + `accent` text-link CTA; mobile collapses to anchor-jump stack; shared contact CTA.
- **Clinic** *(Contact)* — Split: form 55% (`surface` inputs, `accent` focus ring + submit) / location 45% (`wash` panel: address, `dir="ltr"` phone `054-7181718` + email, Google-Maps iframe with `title`); stacks on mobile, map full-width. 4 form states (default/loading/success/error) using `success`/`error` tokens.
- **Contact CTA (shared)** — Centered `max-w-xl`, paper bg, eyebrow + H2 + one discreet line on private consultations, primary `accent` CTA. Reused at the foot of Home / About / Expertise for one consistent conversion close.

---

*End ART-DIRECTION-V2.md — palette + fonts LOCKED. All structural spec inherited from `DESIGN-SYSTEM.md`.*
