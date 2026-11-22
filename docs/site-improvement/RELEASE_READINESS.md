# Release Readiness — Slice A

**Date:** 2026-11-18; design-restoration, post-merge and draft-review update 2026-11-22
**Release branch / PR:** `improvement/site-ux-commercial-readiness` / PR #15, merged to `main` as `0373fd8b0875db9d5f41102a0ec91c05793c865d`
**Original base:** `main` @ `253050364c38ff2734924f4e54097a2715dafda3`
**Decision:** **NO-GO for a new durable production promotion or public release announcement.** PR #15 was cross-model reviewed and merged, and the owner-authorized domain alias correction now serves that reviewed build; legal text, product wording and a separately approved production-target promotion remain open.

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
| Public verification | 29/29 anonymous public checks passed on `www.bageltech.net` after the owner-authorized alias correction; apex redirects to `www` and serves the same build. | `BASELINE_AUDIT.md` §3, `TEST_EVIDENCE.md` §3 |

## 2. Current status and remaining blockers

1. **D-1 alias defect corrected, with a residual deployment-status risk.** `www.bageltech.net` and `bageltech.net` were re-aliased from stale `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` to `dpl_3tWEx7iXM76N1yrVicvznAqTdyqU`, a READY build of PR #15 head `6c2df56734c638180525e344e9264102b7307677`. Public verification passed 29/29. The public domain still serves a preview-target deployment; a production-target promotion is a separate owner decision. See `BASELINE_AUDIT.md` §2–3 and `ADR-001`.
2. **Legal review (L-1).** Site-wide legal pages are placeholders with no substantive approved language and are intentionally `noindex`.
3. **Product claim approval (P-1).** Maturity labels, status wording, ELEANOR framing, ECHO/Sematik exclusion and evidence references require owner approval.
4. **Cross-model review (R-1) completed for this release.** DeepSeek V4.1 Flash Free reviewed old head `9a09c68f884dba4dd4f0b7ab8ff14a58435b8a06` (review `6010897735`). Final head `6c2df56734c638180525e344e9264102b7307677` was reviewed by GPT-6.1 Sol (`gpt-6.1-sol`, Codex CLI 0.167.2) with verdict `APPROVE_WITH_COMMENTS` (review `6012578547`); there were no blocking findings. Three low, nonblocking findings were left open by owner decision and no new commit was created. The reviewer could not reproduce `npm run build` inside its sandbox (`EPERM` on `.next/trace`); the coordinator's build succeeded.
5. **Deployment approval (G-1) partially resolved.** The owner explicitly authorized the PR #15 merge and the specific alias correction. DNS was not changed. No new production-target deployment, promotion, DNS change or public release announcement is authorized.
6. **Other draft PRs are not part of this release.** All eight remaining drafts were independently reviewed at their current heads by GPT-6.1 Sol or GPT-5.6 Terra under Codex CLI 0.167.2, and the review metadata was recorded in each PR body. PR #10, #11 and #12 have blocking findings; PR #13, #14, #16, #19 and #20 received APPROVE verdicts. Approval is a review result, not merge authorization; all remain drafts pending owner decisions and any required fixes.
7. **Quality gaps.** No browser/a11y audit, Lighthouse baseline, CI enforcement or dedicated commit-specific post-deploy marker yet. See `REMAINING_RISKS.md`.

## 3. Required approvals before go-live

- [x] Human with Vercel access: correct the domain→deployment alias to the reviewed build.
- [x] Owner: confirm that the restored live design, not the newer `main` redesign, is the intended release target (recorded in the authorized PR #15 scope).
- [ ] Owner/legal counsel: approve substantive privacy, terms, security and accessibility language and indexing decision.
- [ ] Owner: approve product registry names, maturity labels, limitations and evidence.
- [ ] Owner: approve contact/delivery approach before any form integration.
- [x] Reviewer model different from Big Pickle: complete a fresh cross-model review of the final PR head SHA and identify itself.
- [x] Owner: approve and complete the PR #15 merge.
- [ ] Owner: separately approve a durable production-target promotion or public release announcement.

## 4. Rollback sequence

If a rollback is required after the PR #15 merge or alias correction:

1. Confirm which deployment the public domain actually serves before changing anything.
2. If code rollback is required, revert merge commit `0373fd8b0875db9d5f41102a0ec91c05793c865d` on `main`; do not rewrite shared history.
3. If domain rollback is explicitly authorized, restore `www.bageltech.net` and `bageltech.net` to `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`. That deployment is the known stale artifact and should be used only as an emergency rollback target; do not change DNS.
4. Restore and verify an approved deployment if one is available, then re-run `npm ci`, `npm test`, `npm run lint`, `npm run build`.
5. Smoke-check `/`, `/insights`, `/insights/<slug>`, `/writing/<slug>`, `/sitemap.xml`, `/robots.txt`, `/privacy` and `/dashboard`.
6. Record the rollback commit, deployment ID, smoke output and timestamp here.

No rollback has been performed.

## 5. Final statement

Slice A plus the live-design restoration was reviewed, merged and made observable on the public domain through an owner-authorized alias correction. This is not a durable production promotion or an approved public release: legal text, product wording, quality work and a separately authorized production-target promotion remain open. Other draft PRs are outside this release; all have now received independent cross-model reviews, and their blocking findings or owner approval decisions remain separate.
