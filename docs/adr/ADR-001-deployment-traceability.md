# ADR-001: Deployment traceability and live-artifact verification

**Date:** 2026-11-18; root-cause and correction update 2026-11-22
**Status:** Proposed policy; root cause confirmed; owner-authorized alias correction executed and publicly verified; durable production promotion still requires explicit owner approval
**Decision owners:** Repository owner / deployment administrator
**Affected findings:** D-1, R-1, Q-3

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Context

Direct requests to `https://www.bageltech.net` served HTML carrying Vercel deployment ID `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`. A read-only Vercel CLI/API query on 2026-11-22 confirmed that deployment's `gitSource.sha` is `2b1a952866db3903488eb72fe2a9ed0ebe3bb665` (`ref: main`, subject `Mark repository as BagelTech-owned (LICENSE/README/package.json)`) and that `www.bageltech.net`, `bageltech.net` and `bageltech-sage.vercel.app` were among its aliases. The newer production deployment `dpl_7rFNpCmUsc2xWhGsvG6HJJyLKi4x`, built from `253050364c38ff2734924f4e54097a2715dafda3`, had only `bageltech-bagel-tech.vercel.app` and `bageltech-git-main-bagel-tech.vercel.app` aliases — it was never given the `www` alias.

Observable production differences included:

- `/insights` linked to 12 `/writing/<slug>` URLs that all returned 404;
- `/insights/<slug>` also returned 404;
- footer contained `Careers → /about`, `Press → /insights`, `Security → /contact` and `X → https://x.com`;
- `/sitemap.xml` and `/robots.txt` returned 404;
- the homepage used old `heroCopy`/`triptych`/`productsStrip` classes.

A green deployment status is therefore not evidence that the production domain serves that commit. The root cause was confirmed: the domain alias was pinned to the older deployment. `04775c5` is an ancestor of `2b1a952`, and the homepage, home CSS, header, footer, footer CSS and global CSS files are byte-identical between them, which explains the observed design. The Vercel investigation began read-only under the authenticated identity `billparris-1374`. After the owner explicitly authorized the correction, `www.bageltech.net` and `bageltech.net` were re-aliased to the reviewed build recorded in §5; DNS and project settings were not changed.

## 2. Decision

Deployment success must be defined as **the intended commit being observable on the intended domain**, not merely a successful build record.

1. Every production release must record the exact commit SHA, Vercel deployment ID and domain alias in release evidence.
2. A commit-specific, non-secret marker must be included in the build and asserted by a post-deploy HTTP smoke check against the public domain.
3. If the marker does not match, the release is failed and the deployment is not promoted or announced, even if the platform reports success.
4. Legacy redirects may preserve inbound links, but must never be used to mask a stale production artifact.
5. No deployment, alias change or DNS change may be performed by an AI agent without explicit human approval.

The marker can be a build-time environment value derived from the commit SHA and exposed in a harmless HTML `meta` tag or a dedicated health endpoint. The exact implementation should be decided with the deployment owner so no secret or internal path is exposed.

## 3. Consequences

### Positive

- Detects the current class of stale-alias defect automatically.
- Makes release evidence auditable against an exact commit and deployment.
- Prevents redirects from hiding a false "deployed" status.
- Gives reviewers a clear go/no-go signal.

### Negative / costs

- Requires Vercel account access and possibly a CI environment variable or small build script.
- Adds one post-deploy HTTP check to the release pipeline.
- Requires the owner to decide where the marker is exposed and how failures alert the team.

## 4. Alternatives considered

| Alternative | Rejected because |
| --- | --- |
| Trust the GitHub/Vercel "success" status | Demonstrably false for the stale production alias. |
| Add redirects for `/writing/*` only | Would leave every other content fix invisible and mask the stale artifact. |
| Purge CDN cache | No evidence the cause is caching; does not establish source-SHA traceability. |
| Rebuild and redeploy without verifying alias | Repeats the same unverified release condition. |

## 5. Verification and correction record (executed 2026-11-22)

1. [x] Inspect `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` and identify its source SHA/project — confirmed `2b1a952866db3903488eb72fe2a9ed0ebe3bb665`, project `bageltech` (`prj_5XHbukySyRJjD93sfS9uA6Mz7OC7`).
2. [x] Confirm which deployment the `www.bageltech.net` alias pointed to — confirmed the stale `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`; newer `dpl_7rFNpCmUsc2xWhGsvG6HJJyLKi4x` had no `www` alias.
3. [x] With explicit owner approval, re-alias `www.bageltech.net` and `bageltech.net` from `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` to `dpl_3tWEx7iXM76N1yrVicvznAqTdyqU`, a READY build of PR #15 head `6c2df56734c638180525e344e9264102b7307677`.
4. [ ] Implement and verify a dedicated commit-specific marker. Public HTML currently carries the observed deployment marker `dpl_3tWEx7iXM76N1yrVicvznAqTdyqU`; this proves deployment identity and maps to the reviewed `gitSource.sha`, but is not a purpose-built commit marker.
5. [x] Re-check the live design signatures and routes from `BASELINE_AUDIT.md` §§2–3 — 29/29 anonymous public checks passed on `www.bageltech.net`; apex redirects to `www` and serves the same build.
6. [x] Record the deployment ID, observed marker, smoke result and date in `BASELINE_AUDIT.md`, `TEST_EVIDENCE.md` and `RELEASE_READINESS.md`.
7. [ ] If the owner chooses a production-target release, promote a production deployment built from the approved commit and repeat the public verification. No promotion or public release announcement is authorized by this ADR.

**Current state:** root cause is confirmed and the owner-authorized alias correction is complete and publicly verified. PR #15 was merged into `main` as `0373fd8b0875db9d5f41102a0ec91c05793c865d`. The dedicated commit marker and a durable production-target promotion remain outstanding. The public domain serves a preview-target deployment whose `gitSource.sha` matches the reviewed PR head; rollback alias is `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`. No DNS change was made.
