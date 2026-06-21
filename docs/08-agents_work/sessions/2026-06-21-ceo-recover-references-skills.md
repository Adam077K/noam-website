---
date: 2026-06-21
role: ceo
task: recover-references-skills
tier: lite
qa_verdict: PASS
status: COMPLETE
---

# CEO Session — Recover Reference Assets & Assemble Skills Playbook

## Mission
Before the new Noam-website build: (1) find the reference website images used for the (deleted) old site, and (2) inventory all repo skills relevant to building/designing/writing the new site — packaged for the next team.

## Findings
**Reference website** — recovered from archived tag `archive/feat/redesign-v2:docs/design-references/`:
- `03-ref-clinic-minimal.jpg` — **primary target.** Soft pastel gradient hero, single-doctor focus + organic blob, 2×2 service-card grid, practitioner row, appointment form. Confirmed by viewing the image.
- `02-ref-nova-hospital.jpg` — secondary. Borrow structure (hero+blob, stats row 4500+/200/500+/20+, service icon grid, service cards); **reject** its saturated medical blue (too "big-hospital").
- `DESIGN-BRIEF.md` — locked palette (ink/slate/mist/paper), full services list, credentials, contact facts.
- ⚠️ **No source URL was ever recorded** for the two screenshots. Current real site = drkitrey.com (brief: do NOT clone — full rethink).

**Skills** — 129 of 154 manifest skills relevant; categorized into a per-role playbook.

## Actions
1. Restored 3 design inputs from the archive into `docs/design-references/` via `git checkout archive/feat/redesign-v2 -- <paths>` (byte-exact). Deliberately did NOT restore the old DESIGN-SYSTEM v1/v2 token docs or the rejected build's `review-shots/` (clean design start).
2. Viewed both reference images to confirm intact restore + capture visual target.
3. Wrote `docs/design-references/SKILLS-FOR-WEBSITE.md` — curated per-role build playbook (design/frontend/backend/content/SEO/a11y/deploy/QA/orchestration) + top-10 must-load + full 129-skill appendix.

## Deliverables
- `docs/design-references/DESIGN-BRIEF.md` (restored)
- `docs/design-references/03-ref-clinic-minimal.jpg` (restored)
- `docs/design-references/02-ref-nova-hospital.jpg` (restored)
- `docs/design-references/SKILLS-FOR-WEBSITE.md` (new)

## Verification
- `docs/design-references/` contains exactly the 4 intended files (no v1/v2 docs, no review-shots).
- Both `.jpg`s render correctly.
- 6/6 spot-checked skill `.claude/skills/<name>/SKILL.md` paths exist.
- 16 `archive/*` tags intact — archive undisturbed.

## Flagged for the build team
- **RTL/Hebrew has NO skill** — handle `dir="rtl"`, CSS logical properties, bidi typography manually (highest-risk area).
- No booking-system skill — v1 is contact-form-only.

## Open item (optional)
Reference screenshots have no recorded source URL. A reverse-image-search follow-up can identify the live sites if the founder wants it.

## Next step
Inputs + skills map are staged. Recommend a fresh design brief/kickoff (CPO + Design-Lead) anchored on reference #3 + the locked palette before any code.
