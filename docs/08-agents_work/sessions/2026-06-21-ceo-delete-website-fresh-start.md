---
date: 2026-06-21
role: ceo
task: delete-website-fresh-start
tier: irreversible
qa_verdict: PASS
status: COMPLETE
---

# CEO Session — Delete Existing Website, Start Fresh

## Mission
Founder (Adam) rejected the current Noam website. Delete all existing website code and return to a clean slate to rebuild from scratch.

## Key discovery
The Noam website (bilingual EN/HE Next.js app under `apps/web/` — home, about, clinic, expertise, contact) was **never merged to `main`**. It existed only across 16 unmerged feature branches + their worktrees. `main` is the **agent system / GSA Startup Kit** (`.claude/`, `CLAUDE.md`, `AGENTS.md`, skills, workflows) plus the war-room monitoring dashboard — that is infrastructure, NOT the website, and was left untouched.

## Founder decisions (AskUserQuestion)
1. **Recoverability:** Archive then delete (tag every site branch first).
2. **Fresh start:** Clean slate only — no scaffold; new site to be designed later.
3. **Scope:** Delete all `apps/web` website branches; KEEP agent system; KEEP war-room dashboard. Bilingual copy NOT salvaged (full fresh start on content).

## Actions taken (irreversible — git ops, run by CEO directly)
1. **Archived** all 16 website branches as recoverable tags `archive/<branch>` (commits pinned, survive branch deletion).
2. **Removed** 15 website worktrees via `git worktree remove --force`.
3. **Deleted** all 16 website branches via `git branch -D`.

### Deleted website branches (all recoverable via `archive/<name>`)
ceo-1-1780754344 · deploy/final · deploy/preview · devops/scaffold-web · feat/about · feat/app-shell · feat/clinic · feat/contact-form · feat/expertise · feat/page-contact-v2 · feat/page-home · feat/redesign-v2 · feat/shadcn-home · feat/wire-photos · fix/a11y-contrast · fix/scroll-reveal

### Kept (untouched)
`main` (agent system) · all `ceo-*` session branches · `worktree-agent-*` · `feat/page-contact` (no `apps/web`) · war-room / war-room-dashboard · `.claude/`, skills, workflows, docs.

## Verification
- No live branch contains `apps/web/` (clean).
- No `apps/` directory on disk in main repo.
- `main` HEAD unchanged: `e87a10a`.
- 16 `archive/*` tags present.
- origin (github.com/Adam077K/noam-website) has no website branches.

## Recovery
To restore any old work: `git checkout -b <name> archive/<branch>` (e.g. `git checkout -b restore archive/deploy/final`). To permanently purge later: `git tag -d archive/<branch>`.

## Next step
Clean slate confirmed. Awaiting founder direction on the new website — recommend a fresh design/brief session (CPO + Design-Lead) before any code.
