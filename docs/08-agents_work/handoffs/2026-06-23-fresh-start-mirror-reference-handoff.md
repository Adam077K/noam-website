# HANDOFF — Dr. Noam Kitrey Website: FRESH START (mirror the reference)

> **Status: START FRESH.** All prior design attempts are archived and abandoned. Do **not** build on them. This document is your brief.
> Written by CEO, 2026-06-23, at the founder's direction.

---

## 0. TL;DR

Build a **well-designed, premium personal website for Dr. Noam Kitrey** by **faithfully mirroring the layout, components, and visual design of the reference site**, populated with **Dr. Kitrey's own content** (his old website text — founder will provide). Prior attempts drifted into a **generic, AI-generated look** — that is the failure to avoid. Match the reference's craft exactly; do not improvise a "nice enough" approximation.

---

## 1. Why we are starting fresh

Two prior design directions were built and rejected:
1. **Muted "ref#3 clinic-minimal"** (ink/slate/mist palette) — read flat/grey/unfinished.
2. **Medical-blue + partial reference mirror** — got closer but still read **generic and AI-generated**, with placeholder feel and imprecise mirroring.

Both are archived (see §7). The founder's verdict: the output is not the quality bar for a website representing this doctor. We restart with a single, disciplined goal: **mirror the reference, faithfully.**

---

## 2. The ONE framing rule (non-negotiable)

**This is Dr. Noam Kitrey's PERSONAL website — about THE DOCTOR, not a clinic ("המרפאה").**
- Center everything on him: his authority, sub-specialty, credentials, story, approach. Personal-practitioner voice.
- Do **NOT** frame it as a clinic/practice/hospital ("our clinic", "our team", "המרפאה של…"). The brand of the site is **the doctor**.
- The clinic **address** still appears (contact/footer) because it's where he practices — but it is not the site's identity.

---

## 3. The method: MIRROR THE REFERENCE

**Reference site:** "Doctorate" medical template.
- Live: https://doctorate-template.webflow.io/
- In-repo screenshot: `docs/design-references/REFERENCE-doctorate-template.png`

**Mirror its design language AND structure** — layout grid, section sequence, component shapes, spacing rhythm, card/shadow style, button style, color system, typography hierarchy. The founder explicitly wants the **same components and same layouts** as the reference, adapted to a single urologist.

**Reference section sequence (mirror, adapt content to the doctor):**
1. Top utility bar (phone + socials) → main nav (logo + links + "Book Appointment" button)
2. Photo hero — eyebrow + headline + subtext + CTA + **doctor photo**
3. Overlapping 3-card status strip (icon + title + line + link)
4. About/Welcome block — **doctor photo** + heading + text + dark stats box + CTA
5. Services grid — 6 cards, icon + title + text + read-more
6. Appointment band (dark) — heading + **working contact form** + phone
7. Consult/Benefits — heading + benefit rows + photo/video cards
8. Testimonials — 3 cards (quote + avatar + name + stars)
9. Stats band (dark) — 3 big figures
10. Articles/blog — 3 cards (image + tag + title + meta)
11. Footer (dark) — 4 columns (brand, explore, contact, book)

**Tooling:** use the `/design-mirror` skill, and use **Playwright** to (a) study the live reference in detail and (b) verify your build across breakpoints + both locales as you go. Build → screenshot → compare to reference → fix. Do not declare done from code alone.

---

## 4. Content — use Dr. Kitrey's REAL text

- **Primary source: Dr. Kitrey's OLD website text** — *the founder will provide this* (old site copy / URL). Feed the real text into the mirrored structure. ⬅️ **BLOCKER until provided — ask the founder.**
- **Supporting facts already in-repo:**
  - `docs/design-references/DESIGN-BRIEF.md` — credentials, services inventory, contact facts.
  - `docs/05-marketing/COPY-DECK-V2.md` — existing copy deck.
  - `docs/04-features/REDESIGN-PRD.md` — product requirements.
- **Do not invent medical claims or testimonials.** Use real credentials; mark any placeholder testimonial clearly and keep it generic/anonymized (sensitive practice).

**Authority signals to feature prominently** (the moat): Head of Functional Urology & Andrology Unit + Director of SHSQ, Sheba Medical Center · Chair, EAU urological-trauma guidelines committee · MD Tel Aviv University. Sub-specialty: **male sexual dysfunction + functional urology**. Contact: 054-7181718 · Dr.Kitrey@gmail.com · Rasital Tower, 156 Begin Way, Tel Aviv, Floor 17.

---

## 5. Hard constraints

- **Bilingual:** Hebrew (RTL, **canonical** at `/he`) + English (`/en`). RTL via CSS logical properties; mirror the layout correctly. Hebrew is the highest-risk area — screenshot-verify it.
- **Color/visual:** mirror the reference's palette (medical-blue system) — this is the founder's current chosen direction. (Supersedes the old "muted palette" lock in DESIGN-BRIEF §4.)
- **Photos:** founder will supply real photos of Dr. Kitrey (hero portrait, in-context, intro video, clinic). Until then, use **tasteful free stock** in photo-ready slots (object-fit:cover, zero layout shift). Pexels/Unsplash CDN + randomuser.me (avatars) work from this environment; download via `node` (curl/wget are blocked).
- **Accessibility:** WCAG-AA (contrast ≥4.5:1 body, visible focus rings). Medical + bilingual = high bar.
- **Stack (keep the existing foundation — do NOT rebuild infra):** Next.js 16 App Router, React 19, TS strict, Tailwind v4 `@theme` tokens, typed `{he,en}` content modules, contact via Server Action + Zod + Resend, Vercel. App at `apps/web`.
- **Quality bar / anti-pattern:** **no generic AI-slop.** Faithful mirroring + real content + craft. Zero placeholder TODOs/stubs.

---

## 6. Where to start (clean base)

- Branch from **`main`** (current: the ref#3 version — keep the technical scaffolding: i18n routing, layout, contact backend, content-module pattern, UI primitives you can reuse/restyle).
- Create a new branch, e.g. `feat/website-mirror-v3`. Rebuild the **design + presentation** fresh against the reference; reuse working infra, do not reinvent it.
- Work in a git worktree. Founder reviews live before any merge to `main` (sacred QA gate applies).

---

## 7. What's archived (do not build on)

- Prior design attempts tag: **`archive/2026-06-23-design-attempts-blue-mirror`** (branch `feat/home-design-polish`, HEAD `e8f7639`) — muted polish → blue pivot → partial reference mirror. Retrievable for reference only.
- `main` currently holds the earlier **ref#3 muted** redesign + its scaffolding.
- Decisions log: `.claude/memory/DECISIONS.md` (palette pivot + section reorder entries).

---

## 8. What the next team needs from the founder (ask up front)

1. **Dr. Kitrey's old website text** (the content to feed the mirrored layout) — paste, file, or old-site URL. **This is the gating item.**
2. Confirm the reference (Doctorate) is the design to mirror, and the blue palette.
3. Real photos/video when available (hero portrait first — biggest upgrade).

---

> **Bar:** a website worthy of an elite, discreet, trustworthy doctor — faithfully mirrored from the reference, in his own words. Not generic. Not templated-feeling. Not AI-slop.
