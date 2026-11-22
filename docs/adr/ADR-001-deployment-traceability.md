# ADR-001: Deployment traceability and live-artifact verification

**Date:** 2026-11-18; root-cause update 2026-11-22
**Status:** Proposed — root cause confirmed; promotion pending explicit owner approval
**Decision owners:** Repository owner / deployment administrator
**Affected findings:** D-1, R-1, Q-3

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Context

Direct requests to `https://www.bageltech.net` serve HTML carrying Vercel deployment ID `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`. A read-only Vercel CLI/API query on 2026-11-22 confirmed that deployment's `gitSource.sha` is `2b1a952866db3903488eb72fe2a9ed0ebe3bb665` (`ref: main`, subject `Mark repository as BagelTech-owned (LICENSE/README/package.json)`) and that `www.bageltech.net`, `bageltech.net` and `bageltech-sage.vercel.app` are among its aliases. The newer production deployment `dpl_7rFNpCmUsc2xWhGsvG6HJJyLKi4x`, built from `253050364c38ff2734924f4e54097a2715dafda3`, has only `bageltech-bagel-tech.vercel.app` and `bageltech-git-main-bagel-tech.vercel.app` aliases — it was never given the `www` alias.

Observable production differences include:

- `/insights` links to 12 `/writing/<slug>` URLs that all return 404;
- `/insights/<slug>` also returns 404;
- footer contains `Careers → /about`, `Press → /insights`, `Security → /contact` and `X → https://x.com`;
- `/sitemap.xml` and `/robots.txt` return 404;
- the homepage uses old `heroCopy`/`triptych`/`productsStrip` classes.

A green deployment status is therefore not evidence that the production domain serves that commit. The root cause is confirmed: the domain alias is pinned to the older deployment. `04775c5` is an ancestor of `2b1a952`, and the homepage, home CSS, header, footer, footer CSS and global CSS files are byte-identical between them, which explains the observed design. All Vercel investigation was read-only under the authenticated identity `billparris-1374`; no alias, deployment, DNS or project setting was changed.

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
| Trust the GitHub/Vercel "success" status | Demonstrably false for the current production domain. |
| Add redirects for `/writing/*` only | Would leave every other content fix invisible and mask the stale artifact. |
| Purge CDN cache | No evidence the cause is caching; does not establish source-SHA traceability. |
| Rebuild and redeploy without verifying alias | Repeats the same unverified release condition. |

## 5. Verification plan (partially executed 2026-11-22)

1. [x] Inspect `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` and identify its source SHA/project — confirmed `2b1a952866db3903488eb72fe2a9ed0ebe3bb665`, project `bageltech` (`prj_5XHbukySyRJjD93sfS9uA6Mz7OC7`).
2. [x] Confirm which deployment the `www.bageltech.net` alias points to — confirmed the stale `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`; newer `dpl_7rFNpCmUsc2xWhGsvG6HJJyLKi4x` has no `www` alias.
3. [ ] With explicit human approval, promote or alias the deployment built from the reviewed, approved commit.
4. [ ] Implement/verify a commit-specific marker and assert it against `https://www.bageltech.net`.
5. [ ] Re-check the production signatures from `BASELINE_AUDIT.md` §2 and the routes in §3.
6. [ ] Record the deployment ID, observed SHA marker, smoke output and timestamp in `RELEASE_READINESS.md`.

**Current state:** steps 1–2 are complete read-only; steps 3–6 remain outstanding. The owner wants the currently deployed visual design preserved, so the branch restored that design from `2b1a952` while retaining the Slice A correctness fixes. This ADR documents the required decision; it does not claim the deployment defect has been fixed.
