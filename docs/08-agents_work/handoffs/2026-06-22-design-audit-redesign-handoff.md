# HANDOFF — Dr. Noam Kitrey Website: Ruthless Design Audit → Redesign → Polish (T5)

> **For the incoming team.** The founder is dissatisfied with the current design quality and wants a fresh, brutally critical T5 design pass that is **willing to change everything** — layout, typography, type sizes, spacing, color, motion, component design, page structure, and content/copy. Nothing in the current build is sacred except the **LOCKED constraints** in §5. Run it as **AUDIT → REDESIGN → POLISH**, iterate until a top-tier agency art director would sign off.

---

## 0. THE #1 RULE (non-negotiable, hard-won)
**You must judge the DESIGN by SEEING the rendered pixels — never by reading source code.** Every audit finding and every fix must be verified with Playwright: take a screenshot, then OPEN the PNG with the Read tool and evaluate what you actually see. Prior agents repeatedly self-scored their *code* as "8.5/10, award-grade" while the rendered page was generic slop. Do not repeat that. Verify by eye at real viewports, both locales, every time.

## 1. THE MANDATE
Be a ruthless senior art director from a top agency. **Settle for nothing.** Treat the current site as not good enough and elevate it dramatically. The result must read **Awwwards-grade, unmistakably professional, discreet + premium** for a sensitive, elite medical practice — never AI-slop, never a generic clinic template, never sparse/empty, never templated/same-y across pages.

Definition of done: the founder opens the **first screen of every page** and immediately thinks *"top doctor, top agency."* No empty voids, no below-the-fold-on-open critical content, no clipped text, no gimmicks that read as glitches.

## 2. WHAT THIS IS
Premium **bilingual (Hebrew-RTL primary + English secondary)** marketing site for **Dr. Noam Kitrey**, senior Tel Aviv urologist. Sensitive, stigmatized topics (male sexual dysfunction + functional urology) → the design must earn **trust + discretion first**, then convey **elite authority**. 5 pages: Home, About, Expertise, Clinic, Contact.

## 3. WHERE THE CODE IS / HOW TO RUN
- Branch: `feat/website-v2-editorial`. Worktree: `/Users/adamks/VibeCoding/noam-website/.worktrees/website-v2`. App: `apps/web` (Next.js 16, App Router, TS strict, Tailwind v4 `@theme`, content as typed `{he,en}` modules in `src/content/*.ts`).
- Run: `cd apps/web && npm install && npm run dev` → http://localhost:3000 (redirects to `/he`).
- Visual verify: install `playwright-core`; system Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. **Trigger IntersectionObserver reveals** by scrolling the full height before any `fullPage` shot (a naive shot leaves sections blank). Check the **first screen (non-fullPage) at 1440×820 AND 1366×768**, plus **390×844 mobile**, for **both `/he` and `/en`**.

## 4. CURRENT DESIGN LANGUAGE (the starting point — change freely)
A "Journal / Contents" editorial concept: warm bone `#faf7f1` / ink `#16140f`, blue `#1257cf` as a hairline accent only; **Frank Ruhl Libre** (HE) / **Fraunces** (EN) display serif + Heebo/Inter body + Geist mono numerals; running heads ("Vol. I — Functional Urology & Sexual Medicine"), folio numerals, marginalia credential notes, asymmetric grid, dot-leader table-of-contents, a modest portrait card, restrained reveal motion. Each page has its own composition (Home=cover/contents, About=profile, Expertise=contents, Clinic=field-note, Contact=correspondence).
**You may keep, evolve, or discard any of this.** If a different art direction serves the founder better (different type, different palette, different structure), propose and build it.

## 5. LOCKED CONSTRAINTS (do NOT violate)
1. **Hebrew is PRIMARY/canonical**, English secondary. RTL must be flawless: logical properties only (no physical left/right), `dir="ltr"` on phone/email/numbers, **no italics in Hebrew**, mirrored layouts/icons. (This is currently strong — keep it perfect.)
2. **Verified facts only** — never invent credentials, statistics, testimonials, or quotes. Facts in §7. Canonical Hebrew name: **נעם כתרי**.
3. **Discretion guarantee** on Contact is non-negotiable, both languages.
4. **[FOUNDER-REVIEW]** items (personal-voice bio/philosophy paragraphs; gender-affirmation wording = legal-sensitive; parking; languages spoken) stay marked, must not ship as confirmed fact.
5. **WCAG 2.2 AA + a11y** preserved or improved (single h1/page, focus-visible on every surface, labels, error handling, reduced-motion).
6. **Real portrait photo is NOT placed yet** (`apps/web/public/portraits/kitrey-1.png`, `kitrey-2.png`). The hero/portrait must look **complete and professional WITHOUT a photo**, and great when one lands. The single biggest past failure was a large empty portrait box reading as "broken/sparse." Either design an elegant modest portrait state, or a direction that doesn't depend on a photo.
7. **Keep the engineering intact:** the contact Server Action (`@/app/actions/contact` — Zod + Resend + Upstash, all 4 form states, honeypot, hidden locale, aria wiring) must keep working. Don't break i18n routing or the build.
8. De-cloned copy already exists in `docs/05-marketing/COPY-DECK-V2.md` (the old text was too similar to drkitrey.com). You may rewrite further, but keep verified facts and the journal-voice register; never re-clone the old site.

## 6. FOUNDER'S HISTORY OF COMPLAINTS (the failure modes to avoid)
- **v1 was generic AI-slop** (card grid + tiny blue icon circles + pale-blue wash bands + empty portrait box). Scrapped entirely.
- **The hero repeatedly read "empty / unbalanced / weird"** — caused by a large empty portrait placeholder, plus gimmicks (a watermark "01" numeral *behind* the headline that read as a stray number — removed).
- **"Too many familiar components"** — pages felt same-y/templated; each page now has a distinct composition, but push further.
- **Copy "too similar to drkitrey.com"** — de-cloned into COPY-DECK-V2.
- **"Not everything is in the viewer's eyes when the page opens"** — content fell below the fold; tightened, but sizing/hierarchy still needs work.
- **Latest signal: a felt "drop in design quality/technique."** Assume the whole thing needs to level up.

## 7. VERIFIED FACTS (use only these; do not invent)
- **Dr. Noam Kitrey** — senior urologist. Head of the Functional Urology & Andrology Unit, **Sheba Medical Center**; Director of **SHSQ** (Sexual Health Center), Sheba.
- Authority: **Chair, EAU (European Association of Urology) clinical-guidelines committee on urological trauma**; member of Israeli & European sexual-medicine associations (HILAM / ESSM); member, National Committee for Gender Affirmation (Ministry of Health); **MD, Tel Aviv University (1997)**; at Sheba since 2010.
- Services — **Male sexual dysfunction:** erectile dysfunction, premature ejaculation, Peyronie's disease, post-prostatectomy rehabilitation. **Functional urology:** urinary incontinence (M/F), overactive & neurogenic bladder, interstitial cystitis, chronic prostatitis, chronic pelvic pain, benign prostatic enlargement (BPH), intermittent catheterization. **Specialized:** gender-affirming urological care, urological trauma.
- Contact: **054-7181718** / 079-9698450 · **Dr.Kitrey@gmail.com** · Ayal Specialist Clinics, **Recital Tower, 156 Menachem Begin Rd, Tel Aviv, Floor 17**.
- Correct Hebrew condition terms (verify): הפרעות זקפה (ED), שפיכה מוקדמת (PE), מחלת פירוני (Peyronie's), חבלות אורולוגיות (urological trauma), אי־נקיטת שתן (incontinence).

## 8. HOW TO RUN IT (T5)
Run the **design** workflow (`.claude/workflows/design`) scoped to the whole site, structured as:
- **Round 1 — RUTHLESS AUDIT (parallel critics, must SEE the pixels):** fan out independent critics — one per page AND one per cross-cutting dimension (**typography, layout/grid/spacing, color/contrast, hierarchy, motion, RTL/Hebrew quality, mobile, content/voice, and "does this look like a $50k agency build or AI-slop?"**). Each screenshots via Playwright at 1440×820 + 1366×768 + 390×844, both locales, opens every PNG with Read, and returns a brutal, specific, prioritized findings list (P1/P2/P3) with screenshot references. **Adversarially verify** findings (no false positives) and **judge/dedupe** into one master list.
- **Round 2 — REDESIGN:** act on the audit with full license to change layout, type, sizes, color, motion, content, component structure. Build real Next.js/Tailwind. Re-verify every change by eye.
- **Round 3 — POLISH:** craft density, micro-interactions, spacing/type refinement, signature details, motion choreography — measured against an Awwwards bar. Loop critic → polish until it clears.
Then run the **qa** workflow (`.claude/workflows/qa`) — the binding gate (a11y/RTL/visual/security/build) — before any merge. **No merge without QA PASS + founder confirmation.**

## 9. DELIVERABLES
1. A written **critical design audit** (per page + per dimension, screenshot-referenced, honest and harsh).
2. The **redesigned + polished site** on `feat/website-v2-editorial` (or a clearly-named successor), **build + lint clean**, RTL + a11y + WCAG AA intact, the contact form still wired, **verified by eye at all breakpoints + both locales**.
3. A short **changelog** of what changed and why, and any remaining founder-gated items (photo, fees/קופות/hours, legal sign-off on gender-affirmation copy, verified Resend domain).

## 10. THE BAR
Discreet, premium, elite, trustworthy — for a sensitive single-practitioner practice. Every first screen must instantly signal a top specialist and a top agency. If any section reads sparse, templated, AI-generated, gimmicky, below-the-fold-on-open, or "fine," it is **not done** — change it.
