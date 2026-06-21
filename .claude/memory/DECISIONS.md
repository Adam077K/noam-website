# Architecture & Strategy Decisions
*Append-only. 50-entry cap — archive to `DECISIONS_ARCHIVE.md` when full.*

> Empty template. Every C-suite agent appends one entry per significant decision
> using the format below. Workers do not write here.

---

## Format

```markdown
## YYYY-MM-DD — [Decision title]

**Context:** Why this came up.
**Options considered:** A / B / C with one-line trade-offs.
**Decision:** What we chose.
**Rationale:** Why this option won.
**Reversibility:** reversible | hard-to-reverse | irreversible
**Owner:** [agent name]
**Affects:** [list of agents / domains downstream]
```

---

<!-- Entries below this line, most-recent first. -->

## 2026-06-21 — Website v1: bright medical-blue palette (overrides locked mist)

**Context:** Founder requested an Awwwards-grade site "with highlighted blue like the reference image"; the prior DESIGN-BRIEF had locked a muted `mist #AFC8CB` accent and explicitly forbade bright medical blue.
**Options considered:** Muted mist (discreet, but failed AA at 2.8:1) / brighter reference blue / restrained hybrid.
**Decision:** Brighter medical blue — `accent #1463E6` on soft white, ink `#14202E` text, with full token set in `ART-DIRECTION-V2.md`. Founder ratified the override this session.
**Rationale:** Matches the reference the founder supplied; #1463E6 passes WCAG AA both as link text and button text (5.31:1) where mist could not. Single-accent discipline keeps it premium, not "big-hospital loud."
**Reversibility:** hard-to-reverse (theme tokens thread through every component)
**Owner:** CEO + Design-Lead
**Affects:** all design/frontend work

## 2026-06-21 — Hebrew-first bilingual; canonical name spelling נעם כתרי

**Context:** Tel Aviv practice; founder chose Hebrew as the primary/canonical locale. A name-spelling drift (נועם קיטרי) appeared across the build.
**Decision:** HE (RTL) canonical at `/he`, EN (LTR) secondary at `/en`. Canonical name standardized site-wide to **נעם כתרי** (matching the founder's established old-site spelling) — 38 occurrences swept.
**Rationale:** Founder-confirmed spelling; consistency is non-negotiable on a trust-first medical site.
**Reversibility:** reversible
**Owner:** CEO
**Affects:** all content, SEO metadata, header/footer

## 2026-06-21 — Stack + scope for website v1

**Context:** Fresh build after the June-21 clean-slate wipe.
**Decision:** Next.js 16 App Router (TS strict) · Tailwind v4 `@theme` tokens · typed `{he,en}` content modules (no CMS) · contact via Server Action + Zod + Resend + Upstash rate-limit · Vercel. Five pages: Home, About, Expertise, Clinic, Contact. Booking deferred — inquiry form only.
**Rationale:** Matches REDESIGN-PRD; light backend fits a practice site; founder media handled via on-brand placeholder slots.
**Reversibility:** hard-to-reverse
**Owner:** CEO + CTO
**Affects:** all engineering

## 2026-06-21 — Website v1 merged to main after QA PASS + board APPROVE

**Context:** Binding QA gate (code/security/E2E/WCAG) + 4-seat board meeting on the finished site.
**Decision:** Merged `feat/website-v1` → `main` (`82d20b5`) with founder sign-off. Not yet public — gated on founder assets/decisions.
**Rationale:** All four QA dimensions PASS (WCAG BLOCK cleared); board 8.6/10 design, SHIP-TO-STAGING. Deploy deferred per founder.
**Reversibility:** reversible (revertable merge; pre-public)
**Owner:** CEO
**Affects:** launch readiness — see `docs/08-agents_work/FOUNDER-HANDOFF-website-v1.md`
