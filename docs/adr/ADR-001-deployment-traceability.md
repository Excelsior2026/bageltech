# ADR-001: Deployment traceability and live-artifact verification

**Date:** 2026-11-18
**Status:** Proposed — requires owner approval and Vercel access
**Decision owners:** Repository owner / deployment administrator
**Affected findings:** D-1, R-1, Q-3

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Context

The GitHub Deployments API reports a successful Production deployment for `main` commit `253050364c38ff2734924f4e54097a2715dafda3` (`6997936214`, created `2026-10-11T15:50:24Z`, target `https://bageltech-dswtpxiip-bagel-tech.vercel.app`). However, direct requests to `https://www.bageltech.net` serve HTML whose signatures match the pre-revamp tree at `04775c5` and carry Vercel deployment ID `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`.

Observable production differences include:

- `/insights` links to 12 `/writing/<slug>` URLs that all return 404;
- `/insights/<slug>` also returns 404;
- footer contains `Careers → /about`, `Press → /insights`, `Security → /contact` and `X → https://x.com`;
- `/sitemap.xml` and `/robots.txt` return 404;
- the homepage uses old `heroCopy`/`triptych`/`productsStrip` classes.

A green deployment status is therefore not evidence that the production domain serves that commit. The root cause is not distinguished yet: possible explanations include a domain alias pinned to an older deployment, multiple Vercel projects, or incomplete alias promotion.

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

## 5. Verification plan (not yet executed)

1. In Vercel, inspect `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` and identify its source SHA/project.
2. Confirm which project and deployment the `www.bageltech.net` alias points to.
3. With human approval, promote the deployment built from the approved commit.
4. Run the commit-marker smoke check against `https://www.bageltech.net`.
5. Re-check the production signatures from `BASELINE_AUDIT.md` §2 and the routes in §3.
6. Record the deployment ID, observed SHA marker, smoke output and timestamp in `RELEASE_READINESS.md`.

**Current state:** steps 1–6 are outstanding. This ADR documents the required decision; it does not claim the deployment defect has been fixed.
