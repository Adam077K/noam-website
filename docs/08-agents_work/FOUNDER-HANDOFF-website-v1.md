# Founder Handoff — Dr. Noam Kitrey Website v1

*From CEO, 2026-06-21. The site is built, QA-passed, board-approved (8.6/10), and merged to `main`. Run it locally with `cd apps/web && npm run dev` → http://localhost:3000 (redirects to `/he`).*

The site ships credibly **as a staging preview** today. The items below gate a **public launch**, not your review. The two you asked me to prioritize are marked ⭐.

---

## ⭐ 1. Photos & video — the #1 conversion lever
The board quantified **~25–40% abandon risk** at the contact CTA for the most anxious patients until a real portrait lands. Every slot is already in code with a `data-slot` label — drop-in wiring, no rebuild.

| Asset | Slot | Spec |
|-------|------|------|
| Hero portrait | `data-slot=hero-portrait` (Home) | 3:4 portrait, warm + professional, cool-toned to match the palette |
| About portrait + in-context shot | About page | 4:5, one formal + one warmth/consultation shot |
| Clinic interior | `data-slot` (Clinic) | 4:5, the "private, quiet place" the copy promises |
| Intro video | `data-slot=intro-video` (Home) | 16:9, 60–90s talking-head — big trust multiplier |

→ Send me the files (or paths) and I'll wire + art-direct them in one pass.

## ⭐ 2. Fees / קופות חולים / hours / languages
High-intent patients look for this and competitors show it. Currently absent. Please confirm:
- Private-pay vs HMO (which קופות, if any) / consult price band
- Clinic hours
- Languages you consult in (Hebrew/English/Russian/…) — the "Languages" credential row was removed rather than ship a "to be confirmed" placeholder; I'll re-add it once you confirm.

---

## Other pre-public-launch items (FYI — handle when ready)
- **Verified email domain (Resend):** the contact form currently uses a sandbox sender and will **not** deliver to Dr.Kitrey@gmail.com in production. Needs a verified clinic domain (DNS/SPF/DKIM). Until then the form works in the UI but doesn't send.
- **Copy sign-offs:** personal-voice bio/philosophy paragraphs, and the **gender-affirmation wording** (flagged legal-sensitive in 3 places) — these need your + counsel approval before public launch. They're visibly marked in-product so they can't ship unreviewed by accident.
- **Security hardening (devops ticket):** rate-limit currently trusts `x-forwarded-for` (use Vercel platform IP); add CSP/security headers.
- **OG share image:** text metadata is wired; a branded OG image is a fast-follow so WhatsApp/iMessage shares look polished.

---

## What's done & verified
5 bilingual pages · HE-RTL-primary + EN · `#1463E6` design system · WCAG 2.2 AA PASS · RTL "exemplary" · contact form (validation/honeypot/rate-limit/4 states) · canonical name `נעם כתרי` · full hreflang/canonical metadata · clean Next 16 build (10 SSG routes).
