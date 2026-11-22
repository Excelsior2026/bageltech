# Baseline Audit — BagelTech.net Site Improvement

**Status:** Baseline verified against production and repository on 2026-11-18; D-1 root cause confirmed read-only on 2026-11-22.
**Branch:** `improvement/site-ux-commercial-readiness` (created from `main` at `253050364c38ff2734924f4e54097a2715dafda3`).
**Base commit:** `253050364c38ff2734924f4e54097a2715dafda3` (`Collapse: commit pending changes on main`).
**Working tree at audit:** clean before changes.
**Production:** https://www.bageltech.net (Vercel, `server: Vercel`, deployment ID `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` visible in HTML).

> AI-Model: Big Pickle (`big-pickle`; exact build version is not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Method

1. Read `AGENTS.md`, `CLAUDE.md`, `AI_ATTRIBUTION.md`, `DEVELOPMENT_EVIDENCE_RETENTION.md`, `.github/workflows/*`.
2. Inventoried all routes, navigation, content sources, product registry, metadata and API routes in the repository.
3. Fetched production HTML and HTTP headers directly (homepage, `/insights`, article paths, `/products`, legacy paths, `/sitemap.xml`, `/robots.txt`).
4. Compared production HTML signatures with a clean local production build of `main`.
5. Queried the GitHub Deployments and commit APIs for release traceability.
6. Ran baseline `npm ci`, `npm test`, `npm run lint`, `npm run build`.
7. On 2026-11-22, queried Vercel CLI/API with the existing authenticated identity (`billparris-1374`) for deployment metadata, aliases and project configuration. All Vercel calls were read-only.

No production configuration, DNS, deployment or GitHub setting was changed.

---

## 2. Deployment reconciliation — **CRITICAL**

### Verified facts

| Item | Value |
| --- | --- |
| `main` HEAD | `253050364c38ff2734924f4e54097a2715dafda3` |
| Latest GitHub **Production** deployment | `6997936214`, ref/SHA `253050364c38…`, created `2026-10-11T15:50:24Z`, status `success` |
| Its Vercel target | `https://bageltech-dswtpxiip-bagel-tech.vercel.app` |
| Production domain served HTML | Vercel deployment `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` |
| Older Production deployment | `6990264679`, SHA `7a1921bfc9ac…`, `2026-10-11T03:11:42Z`, status `success` |
| Fix commit present on `main` | `885ce64 Revamp site: repair all broken links, unify products, redesign homepage` (merged via `7a1921b`) |

### Evidence that production is **not** serving `main`

| Signal | Production HTML | Local clean build of `2530503` |
| --- | --- | --- |
| Homepage CSS module class set | `heroCopy`, `triptych`, `productsStrip` | `heroActions`, `divisionsSection`, `proofRow` |
| Homepage hero CTA | none | `Explore our work`, `Start a conversation` |
| Homepage product card name | `Intelligent Contract Management` | `Contract Management Intelligence` (from canonical registry) |
| Footer Company column | `About BagelTech`, **`Careers → /about`**, `Contact` | `About BagelTech`, `Products`, `Contact` |
| Footer Resources column | `Writing → /insights`, `Research`, **`Press → /insights`** | `Writing`, `Publications`, `Contractor Platform` |
| Footer Legal column | `Privacy Policy → /contractors/privacy`, `Terms of Service → /contractors/terms`, **`Security → /contact`** | `Privacy Policy → /contractors/privacy`, `Terms of Service → /contractors/terms` |
| Footer social | LinkedIn, GitHub, **`X → https://x.com`** | LinkedIn, GitHub, **ORCID**; plus a Bagel `/bmo` row |
| `/insights` article links | **`/writing/<slug>`** (12 links) | `/insights/<slug>` (12 links) |
| Homepage title | `BagelTech \| Technology & Intelligence` | same string (see metadata finding M-2 for template behaviour) |

`git log -S`/`git show` confirm the production signature belongs to the pre-revamp code at `04775c5`:

- `04775c5:src/content/writing.ts` contains all 12 `/writing/<slug>` links.
- `04775c5:src/components/Footer.tsx` contains `Careers`, `Press`, `Security`, `https://x.com`.
- `04775c5:src/app/page.tsx` contains `heroCopy`, `triptych`, `productsStrip`.
- All three were changed by `885ce64`, which is an ancestor of `main`.

The local build of `2530503` contains `heroActions`/`divisionsSection` and **no** `productsStrip`/`triptych`.

### Confirmed root cause (2026-11-22)

| Item | Value |
| --- | --- |
| Domain alias | `www.bageltech.net` is aliased to Vercel deployment `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK` |
| Live deployment | `bageltech-k2j3il2mo-bagel-tech.vercel.app`, `target: production`, `readyState: READY` |
| `gitSource.sha` | `2b1a952866db3903488eb72fe2a9ed0ebe3bb665` (`ref: main`) |
| Commit subject | `Mark repository as BagelTech-owned (LICENSE/README/package.json)` |
| Design lineage | `04775c5` is an ancestor of `2b1a952`; the homepage, home CSS, header, footer, footer CSS and global CSS files are byte-identical between them |
| Newer production deployment | `dpl_7rFNpCmUsc2xWhGsvG6HJJyLKi4x` from `253050364c38ff2734924f4e54097a2715dafda3` |
| Newer deployment aliases | `bageltech-bagel-tech.vercel.app`, `bageltech-git-main-bagel-tech.vercel.app` — **no `www.bageltech.net`** |
| Vercel identity | `billparris-1374`; all CLI/API calls were read-only |

The alias is pinned to the older production deployment. This is not a caching problem, a missing redirect, or a failed GitHub deployment record. The newer production deployment exists but was never given the `www` alias.

### Design decision

The older deployment is the design the owner wants preserved. Its `heroCopy`/`diagramWrap`/`triptych`/`productsStrip` homepage, raw SVG lockup, original color tokens and three-column footer were restored onto this branch from `2b1a952`. The newer `main` redesign (`heroActions`/`divisionsSection`/`proofRow`) is deliberately **not** the target design. The restoration keeps the Slice A correctness, metadata, legal and product fixes and does not reintroduce the misleading live links (`Careers → /about`, `Press → /insights`, `Security → /contact`, `X → https://x.com`).

**Remedy (requires explicit human/Vercel approval):** after review of the final PR head, promote or alias the intended deployment to `www.bageltech.net`, then verify the commit-specific marker and route smoke. No redirect, cache purge or code change should be used to mask the stale alias.

**Severity: Critical until corrected.** No Slice A fix is observable on the public domain while the alias remains pinned to `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`.

---

## 3. Production route smoke results

| Path | Status | Note |
| --- | --- | --- |
| `/` | 200 | Old homepage |
| `/insights` | 200 | Links to `/writing/<slug>` |
| `/writing` | **404** | No redirect in deployed build |
| `/writing/confidence-is-not-governance` | **404** | All 12 published article links on `/insights` are broken |
| `/insights/confidence-is-not-governance` | **404** | Canonical article route also broken in deployed build |
| `/products` | 200 | |
| `/sitemap.xml` | **404** | No sitemap exists in repo either |
| `/robots.txt` | **404** | No robots file exists in repo either |

The previous review's `/writing/...` observation is accurate **for production**, but the repository had already migrated to `/insights/...` in `885ce64`. The underlying problem is the stale deployment, not merely a missing redirect.

---

## 4. Baseline quality results (local, clean `main`)

| Check | Command | Result |
| --- | --- | --- |
| Install | `npm ci --no-audit --no-fund` | success, 369 packages. Note: `unrs-resolver@1.11.1` postinstall blocked by npm allow-scripts (no observed impact). |
| Tests | `npm test` | **32/32 pass** (0 fail), 783 ms |
| Lint | `npm run lint` | 0 errors, **1 warning** — `@next/next/no-img-element` in `src/components/BrandMark.tsx:46` |
| Build | `npm run build` | success — Next.js 16.3.0/Turbopack, TypeScript OK, 48 static pages, 13 insight articles prerendered |

Pre-existing failures (not introduced by this initiative): production 404s above; the lint warning; missing sitemap/robots; duplicate metadata titles; empty redirect stubs. All are recorded below and will be tracked separately from regressions.

---

## 5. Repository inventory

### 5.1 Public routes (`src/app`)

Static pages: `/`, `/about`, `/products`, `/insights`, `/insights/[slug]`, `/contact`, `/bdb-labs/research`, `/bdb-labs/publications`, `/bdb-labs/repository` (redirect stub), `/bpv/advisory`, `/bpv/case-studies` (redirect stub), `/bagels-corner`, `/bagels-corner/notes/[slug]`, `/bmo`, `/contractors`, `/contractors/privacy`, `/contractors/terms`, `/get-started` (dynamic), `/dashboard/login`.

Redirect-only pages: `/bagel`→`/bmo`, `/bageltech`→`/products`, `/bagelle-parris-vargas`→`/bpv/advisory`, `/bdb-labs`→`/bdb-labs/research`, `/bpv`→`/bpv/advisory`, `/publications`→`/bdb-labs/publications`, `/repository`→`/bdb-labs/repository`.

Protected dynamic routes: `/dashboard`, `/dashboard/reviews`, `/dashboard/repository`, `/dashboard/config`, `/dashboard/users`.

Proxy-only legacy redirects (`src/proxy.ts`): `/research`, `/publications`, `/repository`, `/advisory`, `/case-studies`, `/writing`, `/writing/:path*`.

### 5.2 Navigation

Header (`src/components/Header.tsx`): Products `/products`; BDB Labs `/bdb-labs/research`; Services `/bpv/advisory`; Writing `/insights`; About `/about`; Contact `/contact`. Desktop and mobile share the same list. Escape-to-close and body scroll lock are implemented. No active-page indicator, no persistent contact CTA.

Footer (`src/components/Footer.tsx`) on the audited `main` build: Company (About, Products, Contact); Divisions (BDB Labs, Advisory, Repository); Resources (Writing, Publications, Contractor Platform); Legal (Privacy Policy → `/contractors/privacy`, Terms of Service → `/contractors/terms`); social LinkedIn/GitHub/ORCID; Bagel `/bmo` row. The current branch restores the deployed three-column layout and keeps only corrected legal/social destinations (§2 design decision).

### 5.3 APIs

- `POST /api/onboarding` — contractor setup request intake; strict schema, 32 KB limit, honeypot, HMAC-signed forwarding, 202 receipt; request receipt explicitly separated from activation.
- `POST /api/custom-site-blueprints` — AI-guided blueprint generator with deterministic fallback, strict brief parsing, rate limiting, privacy-safe user key.
- `/api/auth/[...nextauth]` — NextAuth v5 credentials handler for the dashboard.

### 5.4 Content

- 13 Markdown articles in `content/articles/`; 12 have explicit `slug`, one (`governance-at-execution.md`) does not and is absent from every index.
- `src/content/writing.ts` duplicates title/date/excerpt for the same 12 articles; **all 12 dates conflict** with frontmatter and ordering is effectively inverted.
- `src/content/insights.ts` duplicates 6 of the same items as LinkedIn-sourced/external; no consumer imports it.
- `src/content/site.ts` is the single product registry: 6 products with free-text statuses.
- Research/publication registries: `src/content/publications.ts`, `research.ts`, `case-studies.ts`, `document-repository.ts`.
- Bagel notes: 3 Markdown files with a separate loader.

### 5.5 Assets

Brand families under `public/brand/{bageltech,bdb-labs,bpv}` (icons, light/dark lockups, banners). Generic Next.js starter SVGs remain in `public/` (`next.svg`, `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`). `HERO_IMAGE` points to Unsplash; `images.remotePatterns` permits `images.unsplash.com`.

---

## 6. Verified findings

Severity: **C** critical, **H** high, **M** medium, **L** low.

### D-1 (C) — Deployed artifact does not match repository
See §2. Affected: all routes. Evidence: production HTML signatures vs local build; GitHub deployments API. Remedy: Vercel alias/deployment verification and promotion with a commit-marker smoke test; document release traceability.

### R-1 (C) — All published article links are broken in production
Affected: `/insights` and all 12 `/writing/<slug>` links; also `/insights/<slug>`. Evidence: curl status codes §3; production HTML link inventory. Remedy: resolve D-1 first; keep canonical `/insights/<slug>` routes; add permanent redirects for retired `/writing/<slug>`; add automated link/route tests. Do **not** treat redirects alone as the fix.

### R-2 (H) — Article metadata has two competing sources
Affected: `/insights`, `/insights/[slug]`, homepage. Evidence: 12/12 title-case and date conflicts between `writing.ts` and frontmatter; differing index excerpts vs detail summaries; `INSIGHTS` dead duplicate. Remedy: make Markdown frontmatter authoritative; derive indexes and homepage from it; remove duplicated title/date/excerpt fields; delete or clearly deprecate unused `INSIGHTS`.

### R-3 (M) — Alias article URLs and orphaned article
Affected: `/insights/[slug]`. `resolveSource()` serves canonical, filename-derived and legacy-filename slugs with no canonical link (duplicate content). `governance-at-execution.md` is reachable but unindexed. Remedy: 308 alias→canonical redirects, `alternates.canonical`, and explicit inclusion/exclusion of the orphaned article.

### R-4 (M) — Redirect stubs depend on the proxy layer
`/bdb-labs/repository` and `/bpv/case-studies` redirect to `/writing`, which only resolves through `src/proxy.ts`. Remedy: target canonical destinations directly; keep proxy redirects for external inbound links.

### N-1 (H) — Footer labels do not match destinations
Affected: site-wide. `Privacy Policy → /contractors/privacy` is a contractor-setup notice; `Terms of Service → /contractors/terms` is contractor setup request terms. Both are `noindex`. Production additionally shows `Careers → /about`, `Press → /insights`, `Security → /contact`, and `X → https://x.com`. Remedy: add site-wide `/privacy`, `/terms`, `/security` (and accessibility) structures with explicit "requires legal/human review" notices; remove misleading links; keep contractor notices linked only from contractor flows; do not invent legal commitments.

### N-2 (M) — Repository link promises a surface that does not exist
Footer `Repository → /bdb-labs/repository` ends at `/insights` after two redirects, although `RepositoryBrowser.tsx` and `CURATED_REPOSITORY_DOCUMENTS` exist. Remedy: either build the public repository surface or relabel/remove the link.

### P-1 (H) — Product information is inconsistent across deployments and surfaces
Affected: homepage, `/products`. Production shows `Intelligent Contract Management`; registry says `Contract Management Intelligence`. `ELEANOR` is labelled a commercial "Governance engine" in `PRODUCTS` while research documents treat it as a framework; no product detail pages exist, so maturity/status cannot be explained. Statuses are free text. Remedy: one authoritative registry with stable id, canonical name, controlled maturity enum, limitations, engagement action and evidence references; approved detail pages.

### M-1 (H) — Duplicate page-title branding
Affected: nearly every page. Root title template `"%s | BagelTech"` combined with child titles already ending `| BagelTech` yields e.g. `Writing | BagelTech | BagelTech` (confirmed in production HTML). Remedy: keep the template, remove brand suffix from child titles (or use `absolute` deliberately); add tests.

### M-2 (M) — Metadata infrastructure incomplete
Only `/contractors` declares a canonical. No `metadataBase`, sitemap, robots.txt, site-wide OG image, or article JSON-LD. Dashboard routes are not `noindex` via metadata. Remedy: add `metadataBase`, per-route canonicals, `sitemap.ts`, `robots.ts`, OG image asset, article structured data, and noindex for private surfaces.

### A-1 (H) — `ScrollReveal` can hide essential content without JavaScript
Affected: seven pages (`about`, `bpv/advisory`, `bdb-labs/publications`, `bdb-labs/research`, `contact`, `insights`, `products`). Server snapshot hard-codes reduced-motion `false`, so SSR emits `opacity: 0` inline styles; reveal requires hydration + IntersectionObserver; no `<noscript>` fallback. Remedy: render content visible by default and apply animation only after hydration via a CSS class, or provide a `<noscript>` style override; preserve reduced-motion support.

### C-1 (M) — Contact is email-only
Affected: `/contact`. Four `mailto:` cards; page copy says "A fuller form can come later if volume requires it." No short inquiry form, validation, confirmation, privacy disclosure or server-side handling. Remedy: gated accessible form using existing approved infrastructure; no new third-party provider without review; keep email fallback.

### Q-1 (M) — No browser-level or metadata/link-integrity tests
Existing 32 tests cover architecture strings, onboarding schema and blueprint generation, but not Header/Footer link inventories, metadata duplication, proxy redirects, sitemap/robots, article date consistency, product consistency, keyboard/a11y or production-build smoke. Remedy: expand suite and add CI checks.

### Q-2 (L) — Lint warning and starter assets
`BrandMark.tsx:46` uses `<img>`; generic Next/Vercel starter SVGs remain public. Remedy: evaluate `next/image` for the brand mark (logos are small SVGs; may be an explicit exception) and remove unused starter assets.

### S-1 (M) — No measured performance baseline
No Lighthouse/field data collected. Must be measured before optimisation; distinguish lab from field data.

---

## 7. Pre-existing vs introduced

All findings in §6 are **pre-existing**. No code was changed during the audit. Baseline test/lint/build results in §4 are the reference point for detecting regressions introduced by this initiative.

---

## 8. Human decisions and access required

1. **Vercel access and approval** to promote/alias the intended deployment to `www.bageltech.net` (D-1). The root cause is confirmed; only the authorized correction remains. No code change can substitute.
2. **Legal/human review** of any substantive site-wide privacy, terms, security or accessibility language. Placeholders will be structurally prepared but not represented as approved policy.
3. **Product claim approval** for ELEANOR framing, maturity labels, ECHO/Sematik inclusion, and any screenshots/demonstrations.
4. **Contact delivery integration** decision: no credentials or paid provider will be added without approval; form activation will remain gated until an approved destination exists.
5. **Cross-model PR review** — the repository's AI attribution policy requires a different model to review each AI-drafted PR head. The exact reviewer model must be selected by the owner; this audit does not claim review by another model.

---

## 9. Proposed remedies mapped to slices

| Slice | Findings addressed |
| --- | --- |
| A — Foundation and correctness | D-1 (investigation/ADR), R-1…R-4, N-1, N-2, P-1, M-1, M-2, Q-1 |
| B — Core UX and homepage | Navigation IA, hero, brand hierarchy, responsive behaviour, A-1 |
| C — Product commercialization | P-1 detail pages, maturity, engagement paths |
| D — Research and proof | Publication taxonomy, evidence/case-study components |
| E — Conversion and quality | C-1, A-1 completion, Q-1 browser tests, S-1, security review |

Detailed scope is in `IMPLEMENTATION_PLAN.md`.
