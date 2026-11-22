# Remaining Risks and Unresolved Issues

**Date:** 2026-11-18; design-restoration update 2026-11-22
**Status:** Slice A code verified locally; release/deployment blocked.
**Scope:** All findings still open after Slice A.

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Blocking risks

| ID | Severity | Issue | Evidence | Required next action | Owner |
| --- | --- | --- | --- | --- | --- |
| D-1 | Critical | `www.bageltech.net` is aliased to stale deployment `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` (source `2b1a952866db3903488eb72fe2a9ed0ebe3bb665`); newer deployment `dpl_7rFNpCmUsc2xWhGsvG6HJJyLKi4x` has only Vercel app aliases. | `BASELINE_AUDIT.md` §2; read-only Vercel CLI/API deployment and alias metadata. | With explicit approval, promote/alias the intended deployment to `www.bageltech.net`, then run a commit-marker smoke check. No code or redirect can substitute. | Human with Vercel access |
| L-1 | High | Site-wide legal pages are structural placeholders only and are intentionally `noindex`. | `src/components/LegalPlaceholder.tsx`, `/privacy`, `/terms`, `/security`, `/accessibility`. | Human/legal review and approval of substantive text; decide when to remove `noindex`. | Owner + legal counsel |
| P-1 | High | Product maturity, status wording, ELEANOR framing, ECHO/Sematik inclusion and evidence references are not owner-approved. | `PRODUCT_CONTENT_INVENTORY.md`. | Approve or amend each entry before publication or product-detail pages. | Owner |
| R-1 | High | Old head `9a09c68` was reviewed by DeepSeek V4.1 Flash Free, but the final design-restoration head has not been reviewed. | PR #15 review `6010897735`; `AI_ATTRIBUTION.md` §2. | Push the final head, obtain a fresh review from a different model, record that exact SHA in PR fields and a GitHub review. | Owner / reviewer model |
| G-1 | High | No deployment or DNS change has been authorized. | Harness constraints and plan. | Explicit human approval after D-1 and review are resolved. | Owner |

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
| Q-3 | Medium | No CI job yet enforces the new integrity tests or the post-deploy marker. | E/ADR-001 | Tests pass locally; CI integration pending. |
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
- D-1 was investigated read-only with the authenticated Vercel CLI; no production configuration, DNS, alias, deployment or GitHub setting was changed.

---

## 4. Rollback sequence (if this branch is ever merged prematurely)

1. Revert the merge commit on `main` (do not force-push or rewrite shared history).
2. Restore `main` to the last approved production commit after confirming which commit the domain actually serves.
3. Re-run `npm ci`, `npm test`, `npm run lint`, `npm run build` on the restored commit.
4. If the stale-deployment defect persists, handle it through Vercel alias/deployment promotion per `ADR-001`; do not reintroduce redirects to mask it.
5. Confirm `/sitemap.xml`, `/robots.txt`, `/insights/<slug>`, `/writing/<slug>`, `/privacy` and `/dashboard` behavior with a post-deploy smoke check.
6. Record the rollback commit, deployment ID and observed results in `RELEASE_READINESS.md`.

No rollback has been performed.
