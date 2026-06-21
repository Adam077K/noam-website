# Skills Playbook — Dr. Noam Kitrey Website (Fresh Build)

*Assembled by CEO, 2026-06-21. Companion to [DESIGN-BRIEF.md](./DESIGN-BRIEF.md).*

This maps the repo's relevant skills to each role/phase so every agent loads **only** the 2–5 skills it needs (per CLAUDE.md context budget) instead of scanning the whole manifest.

**Load a skill:** `READ .claude/skills/<skill-name>/SKILL.md`
**Source of truth:** `.claude/skills/MANIFEST.json` (154 skills total; 129 relevant to this project).

---

## Project shape (drives every pick)

- **Bilingual EN + HE** — Hebrew is **RTL**. Trust-first, premium, discreet (sensitive urology practice).
- **Marketing / practice site**, not a SaaS app. Pages: home, about, expertise, clinic, contact.
- **Backend is light:** a contact form (Server Action + Zod + Resend). **No auth / patient portal in v1** → Supabase-auth/RLS skills are *deferred*.
- **Locked palette:** `ink #202A2C` / `slate #828C8D` / `mist #AFC8CB` (only accent) / `paper #FFFFFF`. Founder supplies photos/videos → design needs composed slots.

---

## ⭐ Top-10 must-load for THIS project

| # | Skill | Why |
|---|-------|-----|
| 1 | `nextjs-app-router-patterns` | Next.js 16 App Router foundation (Server Components, routing, i18n layout) |
| 2 | `design-taste-frontend` | Enforce premium, non-generic visual craft — the trust moat |
| 3 | `high-end-visual-design` | Agency-grade fonts/spacing/shadows; blocks cheap AI defaults |
| 4 | `tailwind-design-system` | Encode the locked palette as tokens + scalable component system |
| 5 | `wcag-audit-patterns` | Medical + bilingual RTL = high accessibility bar |
| 6 | `copywriting` | Trustworthy, discreet copy for stigmatized topics |
| 7 | `seo-content-writer` | Local + condition-intent search visibility |
| 8 | `email-systems` | Contact-form delivery via Resend, anti-spam |
| 9 | `emilkowal-animations` | Restrained micro-interactions = premium feel |
| 10 | `playwright-skill` | Visual + form regression across EN/HE, desktop/mobile |

---

## Per-role / per-phase mapping

### 🎨 Design — Design-Lead · product-designer · design-critic
`design-taste-frontend` · `high-end-visual-design` · `frontend-design` · `minimalist-ui` · `emilkowal-animations` · `vercel-react-view-transitions` · `web-design-guidelines` · `ui-visual-validator` · `core-components`
> Direction = reference #3's restraint + locked muted palette + heavyweight credentials. Borrow #2's *structure* (hero+blob, stats row, service icon grid) — never its saturated blue.

### 💻 Frontend — frontend-engineer
`nextjs-app-router-patterns` · `nextjs-best-practices` · `react-patterns` · `frontend-dev-guidelines` · `tailwind-design-system` · `tailwind-patterns` · `radix-ui-design-system` · `react-ui-patterns` · `vercel-react-best-practices` · `cc-skill-coding-standards` · `error-handling-patterns`

### 🔧 Backend / data — backend-engineer (light)
`email-systems` (Resend contact form) · `api-design-principles` · `nodejs-backend-patterns` · `error-handling-patterns` · `gdpr-data-handling`
> **Deferred unless a portal/booking system is added:** `nextjs-supabase-auth` · `supabase-rls-conventions` · `database-design` · `postgresql`

### ✍️ Content & copy — CMO · technical-writer
`copywriting` · `seo-content-writer` · `humanizer` · `marketing-psychology` · `page-cro` · `form-cro`

### 🔍 SEO / GEO — clinic = local intent
`seo-content-writer` · `nextjs-best-practices` (SSR/perf signals) · `vercel-deployment` · `page-cro`
> **Note:** dedicated SEO **agents** are richer than the SEO *skills* — route real SEO work to `seo-technical`, `seo-schema`, `seo-sitemap`, `seo-local`, `seo-geo`, `seo-performance`.

### ♿ Accessibility — bilingual RTL medical site (high bar)
`wcag-audit-patterns` · `web-design-guidelines` · `radix-ui-design-system`

### 🚀 Deploy / DevOps — devops-engineer
`deploy-to-vercel` · `vercel-deployment` · `vercel-cli-with-tokens` · `github-actions-templates` · `deployment-procedures` · `secrets-management` · `commit` · `create-pr`

### ✅ QA / testing / review — QA-Lead · test-engineer · code-reviewer · security-engineer
`playwright-skill` · `e2e-testing` · `e2e-testing-patterns` · `testing-patterns` · `unit-testing-test-generate` · `code-review-excellence` · `find-bugs` · `web-security-testing` · `cc-skill-security-review` · `ui-visual-validator` · `screenshots`

### 🧭 Orchestration — CEO / C-suite reference
`worktree-isolation-pattern` · `using-git-worktrees` · `qa-gate-protocol` · `linear-mvp-recipe` · `war-room-orchestration`

---

## ⚠️ Gaps to handle manually (no skill covers these)

1. **RTL / Hebrew** — no skill exists. The team must handle `dir="rtl"`, CSS **logical properties** (`margin-inline`, `padding-inline`, `start/end`), mirrored layouts/icons, and a Hebrew-capable type stack by hand. Highest-risk area for this build.
2. **Appointment / booking system** — no skill, and out of scope for v1 (contact form only). Revisit if a real booking flow is added.

---

## Appendix — Full categorized inventory (129 relevant skills)

### 1. Design & UI/UX
design-taste-frontend · high-end-visual-design · frontend-design · minimalist-ui · emilkowal-animations · core-components · radix-ui-design-system · tailwind-design-system · tailwind-patterns · stitch-design-taste · redesign-existing-projects · vercel-react-view-transitions · vercel-react-best-practices · react-ui-patterns · ui-visual-validator · web-design-guidelines · frontend-dev-guidelines

### 2. Frontend code
nextjs-app-router-patterns · nextjs-best-practices · react-patterns · cc-skill-coding-standards · error-handling-patterns · vercel-composition-patterns · sharp-edges

### 3. Backend / data
nextjs-supabase-auth · supabase-rls-conventions · database · database-design · postgresql · prisma-expert · api-design-principles · api-documentation · api-documentation-generator · nodejs-backend-patterns · auth-implementation-patterns · email-systems · inngest · pgvector-rag-conventions · stripe-integration · paddle-integration · sql-optimization-patterns · vector-database-engineer · gdpr-data-handling

### 4. Content & copy
copywriting · seo-content-writer · humanizer · marketing-psychology · page-cro · form-cro · onboarding-cro · data-storytelling · social-content · launch-strategy · product-manager-toolkit

### 5. SEO / growth / GEO
seo-content-writer · nextjs-best-practices · vercel-deployment · page-cro · social-content
*(plus SEO agents: seo-technical, seo-schema, seo-sitemap, seo-local, seo-geo, seo-performance, seo-visual, seo-maps, seo-backlinks, seo-google, seo-content, seo-dataforseo, seo-image-gen)*

### 6. Accessibility
wcag-audit-patterns · web-design-guidelines · radix-ui-design-system

### 7. Deployment & DevOps
deploy-to-vercel · vercel-deployment · vercel-cli-with-tokens · github-actions-templates · deployment-procedures · secrets-management · cloud-devops · commit · create-pr · git-pr-workflows-git-workflow

### 8. QA / testing / review
playwright-skill · e2e-testing · e2e-testing-patterns · testing-patterns · unit-testing-test-generate · tdd-workflow · code-review-excellence · code-reviewer · find-bugs · security-audit · web-security-testing · cc-skill-security-review · broken-authentication · xss-html-injection · api-security-testing · production-code-audit · requesting-code-review · screenshots · ui-visual-validator · debugging-strategies · systematic-debugging

### 9. Workflow / orchestration
linear-mvp-recipe · anthropic-routines · board-meeting-protocol · war-room-orchestration · trust-spec-contracts · worktree-isolation-pattern · multi-agent-patterns · multi-agent-brainstorming · dispatching-parallel-agents · parallel-agents · using-git-worktrees · ai-agents-architect · agent-evaluation · agent-memory-systems · agent-tool-builder · mem0-patterns · qa-gate-protocol
