# Test Evidence — Slice A

**Date:** 2026-11-18; design-restoration verification 2026-11-22
**Branch:** `improvement/site-ux-commercial-readiness`
**Base:** `main` @ `253050364c38ff2734924f4e54097a2715dafda3`
**Scope:** Article routing/metadata, legal placeholders, product registry, canonical metadata, sitemap/robots, integrity tests, and preservation of the deployed visual design.
**Deployment:** no deploy/promotion performed. Local checks plus read-only Vercel queries for the D-1 root cause; after the owner-authorized alias correction, anonymous public HTTP verification was also run against `www.bageltech.net` and `bageltech.net`.

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Commands and results

| Check | Command | Result |
| --- | --- | --- |
| Install (baseline) | `npm ci --no-audit --no-fund` | Success, 369 packages. `unrs-resolver@1.11.1` postinstall blocked by npm allow-scripts; no observed impact. |
| Tests (baseline) | `npm test` | 32/32 pass, 0 fail. |
| Tests (Slice A) | `npm test` | **43/43 pass, 0 fail** (~0.85–1.27 s). Two pre-existing `MODULE_TYPELESS_PACKAGE_JSON` notices remain. |
| Lint (baseline) | `npm run lint` | 0 errors, 1 warning. |
| Lint (Slice A) | `npm run lint` | **0 errors, 1 warning** — `@next/next/no-img-element` at `src/components/BrandMark.tsx:46`. Unchanged from baseline. |
| Build (baseline) | `npm run build` | Success, Next.js 16.3.0, 48 static pages. |
| Build (Slice A) | `npm run build` | **Success**, Next.js 16.3.0/Turbopack, TypeScript OK, 53 static pages, 12 insight articles and 3 Bagel notes prerendered, `/sitemap.xml` and `/robots.txt` generated. |
| Tests (design restoration) | `npm test` | **44/44 pass, 0 fail** (~0.68 s). Two pre-existing `MODULE_TYPELESS_PACKAGE_JSON` notices remain. |
| Type check | `npx tsc --noEmit` | Clean, no diagnostics. |
| Lint (design restoration) | `npm run lint` | **0 errors, 1 warning** — the same pre-existing `BrandMark.tsx:46` warning. The three raw brand SVG `<img>` uses carry file-local eslint exceptions. |
| Build (design restoration) | `npm run build` | **Success**, Next.js 16.3.0/Turbopack, TypeScript OK, 53 static pages, `/sitemap.xml` and `/robots.txt` generated. |
| Local production smoke | Node `fetch` against `npm start` | **58/58 checks passed**; see §2. |

### Build correction recorded during verification

The first Slice A build failed type checking:

```text
src/app/insights/page.tsx(21,17): error TS2367:
This comparison appears to be unintentional because the types '"insight"' and '"case-study"' have no overlap.
```

Cause: `WritingItem.type` had been narrowed to the literal `"insight"` while the archive card still supports legacy `"case-study"`/`"publication"` types. The union was restored in `src/content/writing.ts`; the derived registry still emits only `insight`. The final build above succeeded.

### Design restoration verification (2026-11-22)

The live design was recovered from deployment `dpl_Fdxa9u9XGmTaRhqevUcDEVuLurAK`, whose `gitSource.sha` is `2b1a952866db3903488eb72fe2a9ed0ebe3bb665`. The following were restored byte-for-byte where visual fidelity required it:

- `src/app/page.tsx` / `src/app/home.module.css`: `heroCopy`, `diagramWrap`, `triptych`, `productsStrip`, `cardsGrid`, `insightsSide`.
- `src/app/globals.css`: original color tokens (`--background: #FFFEF7`, `--accent: #8A1E33`, original navy/garnet/stone values).
- `src/components/Header.tsx` / `Header.module.css`: raw `/brand/bageltech/lockup-light.svg` lockup with `.logoImg`.
- `src/components/Footer.tsx` / `Footer.module.css`: deployed five-column grid (brand + three link columns + legal/social right rail).

Correctness fixes were retained rather than copied from the stale deployment:

- Product cards are registry-driven by stable `id` from `FEATURED_PRODUCTS`; a missing id throws at module load. Destinations use `product.engagement.href`.
- The misleading live footer links are not restored: `Careers → /about`, `Press → /insights`, `Security → /contact`, `X → https://x.com`. Legal links point to structural placeholders and ORCID replaces X.
- Metadata uses absolute branded titles so the root template cannot double-brand them; division `openGraph.title` values match the rendered titles.
- Root canonical was removed; each indexable route declares its own canonical. `robots.txt` disallows exact `/dashboard` but lets search engines read the `noindex` on footer-linked legal placeholders.
- Legacy redirects now go directly to `/insights`, `/bdb-labs/research` or `/bpv/advisory`.

### Final build tail (abridged)

```text
✓ Compiled successfully in 5.8s
  Running TypeScript ...
  Finished TypeScript in 5.9s ...
✓ Generating static pages using 3 workers (53/53) in 937ms
...
├ ○ /insights
├   /insights/[slug]
│ ├ ● /insights/authority-without-audit
│ ├ ● /insights/failure-truthfulness-is-a-governance-requirement
│ ├ ● /insights/leadership-is-decision-design
│ └ ● [+9 more paths]
├ ○ /robots.txt
├ ○ /sitemap.xml
```

---

## 2. Local production smoke test

Started the final build with `npm start -- -p 3187` and issued requests with `fetch({ redirect: "manual" })`. The server was stopped after the checks. No production service was touched. **58/58 checks passed.**

| Path | Status | Result |
| --- | --- | --- |
| `/` | 200 | Restored `heroCopy`, `diagramWrap`, `triptych`, `productsStrip`, `cardsGrid`, `insightsSide`; shared brand SVGs; registry products J-Box/ELEANOR/TrueTraining/TruePresence; absolute title; canonical `https://www.bageltech.net`; no Careers/Press/X links. |
| `/bdb-labs/research` | 200 | Absolute title and matching `og:title`; canonical `https://www.bageltech.net/bdb-labs/research`. |
| `/bdb-labs/publications` | 200 | Absolute title and matching `og:title`; canonical `https://www.bageltech.net/bdb-labs/publications`. |
| `/bpv/advisory` | 200 | Absolute title and matching `og:title`; canonical `https://www.bageltech.net/bpv/advisory`. |
| `/sitemap.xml` | 200 | 12 article entries; no site-wide legal, `/dashboard` or `/get-started` URLs. |
| `/robots.txt` | 200 | Declares `Sitemap: https://www.bageltech.net/sitemap.xml`; disallows exact `/dashboard`; legal placeholders remain crawlable for their `noindex`. |
| `/insights/confidence-is-not-governance` | 200 | Canonical emitted as `https://www.bageltech.net/insights/confidence-is-not-governance`. |
| `/privacy` | 200 | Emits `<meta name="robots" content="noindex, follow">` and the review-required notice. |
| `/insights/governance-at-execution` | 404 | Explicitly excluded draft article. |
| `/writing/confidence-is-not-governance` | 308 | `Location: /insights/confidence-is-not-governance`. |
| `/insights/01_confidence_is_not_governance` | 308 | `Location: /insights/confidence-is-not-governance`. |
| `/repository` | 308 | `Location: /insights`. |
| `/case-studies` | 308 | `Location: /bpv/advisory`. |
| `/dashboard` | 307 | `Location: /dashboard/login`. |

Raw-header inspection confirmed a single `Location` header for the tested 308 redirects.

### Public verification after alias correction (2026-11-22)

After PR #15 was reviewed and before merge, the owner authorized correcting D-1. Both `www.bageltech.net` and `bageltech.net` were re-aliased to `dpl_3tWEx7iXM76N1yrVicvznAqTdyqU` (reviewed head `6c2df56734c638180525e344e9264102b7307677`). Anonymous public checks then passed **29/29** on `www.bageltech.net`: deployment marker, restored design signatures, registry products, absolute/OG titles, canonicals, sitemap/robots, article and noindex legal routes, and legacy 308 redirects. The apex domain redirects to `www` and serves the same build. See `BASELINE_AUDIT.md` §3 for the route table. PR #15 was merged after this verification as `0373fd8b0875db9d5f41102a0ec91c05793c865d`.

---

## 3. What the new tests lock down

`tests/site-integrity.test.mjs` adds 12 source-level integrity tests:

1. One frontmatter registry drives exactly 12 published articles; one draft is explicitly excluded.
2. Alias slugs and retired `/writing/*` URLs are permanently redirected to canonical frontmatter slugs.
3. Every literal internal link and redirect target resolves to a real App Router page or route handler, including route groups and dynamic segments.
4. Legacy redirect stubs point directly at canonical destinations.
5. Sitemap contains only indexable public routes and is generated from the article/note registries.
6. Robots excludes private/draft surfaces and advertises the sitemap.
7. Indexable routes declare canonical URLs; absolute titles prevent root-template double branding, and division `og:title` values match.
8. Dashboard, onboarding, contractor notices and legal placeholders are `noindex`.
9. Footer legal labels map to the intended site-wide destinations and no misleading Careers/Press/X/Contractor-policy links remain.
10. Product registry has six controlled entries with stable ids, unique slugs/names, maturity vocabulary and disclosed limitations.
11. Proxy matcher covers every legacy redirect path.
12. Homepage and shared chrome keep the deployed visual signatures, color tokens, SVG paths and footer grid while excluding the superseded design classes.

`tests/site-architecture.test.mjs` was updated where it assumed the old duplicated `INSIGHTS` array and literal `sourceUrl` strings. It now checks the derived alias and frontmatter-derived slugs. Its workstream and brand-family tests were also updated to lock the restored static triptych and shared SVG assets rather than the discarded `BrandMark`-driven homepage.

---

## 4. Coverage gaps (not claimed as passing)

- No browser-level/keyboard or axe/WCAG 2.2 AA audit yet (Slice E).
- No before/after screenshots were captured; no browser automation is configured in the repository (Slice E).
- No Lighthouse lab or field performance data yet (Slice E).
- No dedicated commit-specific post-deploy marker is implemented. Public verification used the observed Vercel deployment marker and the deployment's `gitSource.sha`; a purpose-built release marker remains outstanding.
- The previous head `9a09c68f884dba4dd4f0b7ab8ff14a58435b8a06` was reviewed by DeepSeek V4.1 Flash Free (review `6010897735`). The final head `6c2df56734c638180525e344e9264102b7307677` was then reviewed by GPT-6.1 Sol (`gpt-6.1-sol`, Codex CLI 0.167.2) with verdict `APPROVE_WITH_COMMENTS` (review `6012578547`). PR #15 was merged as `0373fd8b0875db9d5f41102a0ec91c05793c865d` after all checks passed. The reviewer could not reproduce `npm run build` inside its sandbox (`EPERM` on `.next/trace`); the coordinator's build succeeded.

These gaps are tracked in `REMAINING_RISKS.md` and are why a **new durable production promotion or release announcement** remains blocked. PR #15 and the owner-authorized alias correction are complete and publicly verified.
