# Release Readiness — Slice A

**Date:** 2026-11-18
**Branch:** `improvement/site-ux-commercial-readiness`
**Base:** `main` @ `253050364c38ff2734924f4e54097a2715dafda3`
**Decision:** **NO-GO for deployment.** Code is locally verified; release is blocked by unresolved production, legal, claim and review items.

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. What is ready

| Area | State | Evidence |
| --- | --- | --- |
| Article metadata | Frontmatter is authoritative; 12 published articles derived; one draft explicitly excluded. | `src/lib/articles.ts`, `content/articles/`, `TEST_EVIDENCE.md` |
| Article routing | Canonical `/insights/<slug>` pages, 308 redirects for retired `/writing/*` and filename aliases, canonical links, Article JSON-LD. | Local smoke test in `TEST_EVIDENCE.md` |
| Legal destinations | Footer maps Privacy/Terms/Security/Accessibility to site-wide structural placeholders; misleading labels removed. | `src/components/Footer.tsx`, `LegalPlaceholder.tsx` |
| Product registry | Six controlled entries with stable ids, maturity, limitations, engagement and evidence fields. | `PRODUCT_CONTENT_INVENTORY.md` |
| Metadata | Root `metadataBase`, canonicals, de-duplicated titles, noindex for private/placeholder surfaces. | `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts` |
| Discoverability | `/sitemap.xml` and `/robots.txt` exist locally; sitemap excludes noindex and draft routes. | Build output and smoke test |
| Tests | 43/43 pass; 11 new integrity tests added. | `TEST_EVIDENCE.md` |
| Lint/build | 0 lint errors, 1 pre-existing warning; final production build succeeded. | `TEST_EVIDENCE.md` |

## 2. What blocks release

1. **Critical deployment defect (D-1).** The live domain still serves pre-revamp code. No fix on this branch can be observed until the Vercel alias/deployment mismatch is resolved. See `BASELINE_AUDIT.md` §2 and `ADR-001`.
2. **Legal review (L-1).** Site-wide legal pages are placeholders with no substantive approved language and are intentionally `noindex`.
3. **Product claim approval (P-1).** Maturity labels, status wording, ELEANOR framing, ECHO/Sematik exclusion and evidence references require owner approval.
4. **Cross-model review (R-1).** AI attribution policy requires a different model to review the final PR head SHA. No review is claimed.
5. **Deployment approval (G-1).** No merge, deploy, DNS or production configuration change is authorized.
6. **Quality gaps.** No browser/a11y audit, Lighthouse baseline, CI enforcement or post-deploy marker yet. See `REMAINING_RISKS.md`.

## 3. Required approvals before go-live

- [ ] Human with Vercel access: inspect and correct the domain→deployment alias; approve promotion.
- [ ] Owner/legal counsel: approve substantive privacy, terms, security and accessibility language and indexing decision.
- [ ] Owner: approve product registry names, maturity labels, limitations and evidence.
- [ ] Owner: approve contact/delivery approach before any form integration.
- [ ] Reviewer model: complete cross-model review of the final PR head SHA and identify itself.
- [ ] Owner: approve merge and deployment separately.

## 4. Rollback sequence

If this branch is merged or deployed without all approvals:

1. Revert the merge commit on `main`; do not rewrite shared history.
2. Confirm which commit the production domain actually serves before changing aliases.
3. Restore the last approved commit and re-run `npm ci`, `npm test`, `npm run lint`, `npm run build`.
4. Promote the approved deployment in Vercel if and only if authorized; do not use redirects to mask D-1.
5. Smoke-check `/`, `/insights`, `/insights/<slug>`, `/writing/<slug>`, `/sitemap.xml`, `/robots.txt`, `/privacy` and `/dashboard`.
6. Record the rollback commit, deployment ID, smoke output and timestamp here.

No rollback has been performed.

## 5. Final statement

Slice A is a **reviewable draft**, not an approved release. The branch has not been merged, pushed to production, deployed, or used to alter DNS or Vercel configuration. The first non-code action required is deployment investigation under `ADR-001`.
