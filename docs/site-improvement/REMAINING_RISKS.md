# Remaining Risks and Unresolved Issues

**Date:** 2026-11-18; post-merge update 2026-11-22
**Status:** PR #15 merged and public alias corrected; legal, product, deployment-status and separate-draft decisions remain open.
**Scope:** All findings still open after Slice A and the PR #15 post-merge update.

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Current release status and blocking risks

| ID | Severity | Issue | Evidence | Required next action | Owner |
| --- | --- | --- | --- | --- | --- |
| D-1 | Resolved, residual Medium | `www.bageltech.net` and `bageltech.net` were re-aliased from stale `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` to `dpl_3tWEx7iXM76N1yrVicvznAqTdyqU`, the READY build of PR #15 head `6c2df56734c638180525e344e9264102b7307677`. Public verification passed 29/29. The public domain still serves a preview-target deployment. | `BASELINE_AUDIT.md` §2–3; `TEST_EVIDENCE.md` §3; public HTTP deployment marker. | If desired, approve and perform a separate durable production-target promotion, then re-run the marker and route smoke. No DNS change is required. | Human with Vercel access |
| L-1 | High | Site-wide legal pages are structural placeholders only and are intentionally `noindex`. | `src/components/LegalPlaceholder.tsx`, `/privacy`, `/terms`, `/security`, `/accessibility`. | Human/legal review and approval of substantive text; decide when to remove `noindex`. | Owner + legal counsel |
| P-1 | High | Product maturity, status wording, ELEANOR framing, ECHO/Sematik inclusion and evidence references are not owner-approved. | `PRODUCT_CONTENT_INVENTORY.md`. | Approve or amend each entry before publication or product-detail pages. | Owner |
| R-1 | Resolved | PR #15 final head `6c2df56…` was reviewed by a different model after the earlier review of `9a09c68…`. | GPT-6.1 Sol (`gpt-6.1-sol`, Codex CLI 0.167.2), review `6012578547`, verdict `APPROVE_WITH_COMMENTS`, no blocking findings; `TEST_EVIDENCE.md` §4. | None for this release. Three low, nonblocking findings were left open by owner decision; no new commit was created. | Completed |
| G-1 | High | Merge and the specific alias correction were explicitly authorized and completed. No new production-target deployment, promotion, DNS change or public release announcement is authorized. | PR #15 merge commit `0373fd8b0875db9d5f41102a0ec91c05793c865d`; Vercel alias correction; `RELEASE_READINESS.md`. | Obtain separate owner approval before any further deployment, promotion, DNS or release-announcement action. | Owner |
| R-2 | Medium | Other AI-drafted PRs are outside this release. PR #10, #11 and #12 have blocking review findings; PR #13, #14, #16, #19 and #20 were not reviewed because the reviewer account reached its usage cap. | Reviews `6013006427` and `6013006507`; PR #12 reviewer output preserved locally but not posted; reviewer cap error. | Keep unmerged. Complete fixes and fresh different-model reviews after the cap resets; do not merge on the basis of stale or incomplete reviews. | Owner / reviewer model |

---

## 2. Deferred quality work

| ID | Severity | Issue | Slice | Notes |
| --- | --- | --- | --- | --- |
| A-1 | High | `ScrollReveal` emits SSR `opacity: 0`; content can be hidden without JavaScript. | B/E | Fix by revealing by default and animating only after hydration, or add a `<noscript>` override. |
| C-1 | Medium | Contact is email-only; no validated form, privacy disclosure or server-side delivery. | E | Do not add a paid/third-party provider without approval. |
| Q-2 | Low | Lint warning at `src/components/BrandMark.tsx:46` (`<img>`); generic Next/Vercel starter SVGs remain in `public/`. | E | Logos are small SVGs; decide explicit exception or migrate to `next/image`. |
| S-1 | Medium | No Lighthouse lab or field performance baseline. | E | Distinguish lab from field data before optimization. |
| A-2 | Medium | No browser-level keyboard, focus-order, axe/WCAG 2.2 AA or responsive test suite. | E | Slice A tests are source/metadata checks only. |
| V-1 | Low | No before/after screenshots were captured. | E | No browser automation is configured in this repository; visual evidence remains outstanding. |
| Q-3 | Medium | No CI job yet enforces the new integrity tests or a dedicated commit-specific post-deploy marker. | E/ADR-001 | Tests pass locally; current public verification used the observed Vercel deployment marker, not a dedicated commit marker. |
| F-1 | Low | Insights article bodies use unstyled `.prose`, `.articleWrap` and `.articleBody` classes, so headings, lists and spacing fall back to browser defaults. | E | Dedicated typography/layout-only PR planned after merges settle; no article-text changes. |
| N-3 | Medium | Footer links to legal placeholders that are `noindex` and contain no substantive policy. | E/L-1 | Intentional interim state; revisit once L-1 is approved. |
| M-3 | Low | Sitemap static `lastModified` values use build time rather than content-modified dates. | E | Acceptable for now; refine from content metadata if needed. |
| P-2 | Medium | No product detail pages; `/products` is a catalog with limitations but no per-product evidence view. | C | Requires approved product content. |
| D-2 | Medium | Publication taxonomy, DOI/author/date reconciliation and evidence-backed case studies are not implemented. | D | `case-studies.ts` contains illustrative patterns, not client results. |
| O-1 | Low | `unrs-resolver@1.11.1` postinstall is blocked by npm allow-scripts. | E | No observed impact; document if install behavior changes. |

---

## 3. Risk accepted for Slice A

- The draft article `content/articles/governance-at-execution.md` remains in the repository with `status: "draft"` and is excluded from indexes, routes and sitemap. No content was invented or rewritten.
- Legal placeholders deliberately contain no substantive policy language. They are linked so visitors can see the structure, but are not represented as approved policies.
- The product registry contains no `commercially-available` entries and no unsupported certifications, clients, results, performance figures or compliance claims.
- The deployed visual design is intentionally preserved from `2b1a952`; the newer `main` redesign is not used. Misleading live footer links and the `X → https://x.com` social link are not reintroduced.
- The D-1 investigation began read-only with the authenticated Vercel CLI. The alias correction and PR #15 merge were performed only after explicit owner authorization, are recorded in `RELEASE_READINESS.md`, and did not change DNS or project settings.
- Lower-severity review comments on PR #15 remain open by owner decision; they were nonblocking and did not justify invalidating the reviewed head.

---

## 4. Rollback sequence (if required after the PR #15 merge)

1. Confirm which commit and deployment the public domain actually serves before changing anything.
2. If code rollback is required, revert merge commit `0373fd8b0875db9d5f41102a0ec91c05793c865d` on `main` (do not force-push or rewrite shared history).
3. If domain rollback is explicitly authorized, restore `www.bageltech.net` and `bageltech.net` to `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`; this is the known stale artifact and should be an emergency target only. Do not change DNS.
4. Re-run `npm ci`, `npm test`, `npm run lint`, `npm run build` on the restored commit.
5. Confirm `/sitemap.xml`, `/robots.txt`, `/insights/<slug>`, `/writing/<slug>`, `/privacy` and `/dashboard` behavior with a post-deploy smoke check.
6. Record the rollback commit, deployment ID, smoke output and observed results in `RELEASE_READINESS.md`.

No rollback has been performed.
