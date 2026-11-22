# Release Readiness — Slice A

**Date:** 2026-11-18; design-restoration update 2026-11-22
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
| Metadata | Root `metadataBase`, per-route canonicals, absolute de-duplicated titles, noindex for private/placeholder surfaces. | `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts` |
| Discoverability | `/sitemap.xml` and `/robots.txt` exist locally; sitemap excludes noindex and draft routes. | Build output and smoke test |
| Visual design | Deployed `heroCopy`/`diagramWrap`/`triptych`/`productsStrip` homepage, original tokens, raw lockup and three-column footer restored; product cards still registry-driven. | `TEST_EVIDENCE.md` §1, `BASELINE_AUDIT.md` §2 |
| Tests | 44/44 pass; 12 new integrity tests plus restored-design signatures. | `TEST_EVIDENCE.md` |
| Lint/type/build | 0 lint errors (1 pre-existing warning), clean `tsc --noEmit`, production build succeeded. | `TEST_EVIDENCE.md` |
| Local smoke | 58/58 checks against `next start`, including live design signatures and corrected redirects. | `TEST_EVIDENCE.md` §2 |

## 2. What blocks release

1. **Critical deployment defect (D-1).** The `www.bageltech.net` alias is pinned to stale deployment `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` (source `2b1a952866db3903488eb72fe2a9ed0ebe3bb665`). Root cause is confirmed read-only; correction still requires explicit Vercel approval. See `BASELINE_AUDIT.md` §2 and `ADR-001`.
2. **Legal review (L-1).** Site-wide legal pages are placeholders with no substantive approved language and are intentionally `noindex`.
3. **Product claim approval (P-1).** Maturity labels, status wording, ELEANOR framing, ECHO/Sematik exclusion and evidence references require owner approval.
4. **Cross-model review (R-1).** DeepSeek V4.1 Flash Free reviewed old head `9a09c68f884dba4dd4f0b7ab8ff14a58435b8a06`. The final head after the design restoration is not yet committed/pushed and has not been reviewed; a fresh different-model review is required.
5. **Deployment approval (G-1).** No merge, deploy, DNS or production configuration change is authorized.
6. **Quality gaps.** No browser/a11y audit, Lighthouse baseline, CI enforcement or post-deploy marker yet. See `REMAINING_RISKS.md`.

## 3. Required approvals before go-live

- [ ] Human with Vercel access: approve and correct the domain→deployment alias; promote the intended deployment.
- [ ] Owner: confirm that the restored live design, not the newer `main` redesign, is the intended release target.
- [ ] Owner/legal counsel: approve substantive privacy, terms, security and accessibility language and indexing decision.
- [ ] Owner: approve product registry names, maturity labels, limitations and evidence.
- [ ] Owner: approve contact/delivery approach before any form integration.
- [ ] Reviewer model different from Big Pickle: complete a fresh cross-model review of the final PR head SHA and identify itself.
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

Slice A plus the live-design restoration is a **reviewable draft**, not an approved release. The branch has not been merged, pushed, deployed, or used to alter DNS or Vercel configuration. The D-1 investigation under `ADR-001` is complete; the remaining non-code actions are fresh cross-model review, owner/product/legal approvals, and explicitly authorized alias promotion.
