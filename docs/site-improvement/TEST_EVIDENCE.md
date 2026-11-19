# Test Evidence — Slice A

**Date:** 2026-11-18
**Branch:** `improvement/site-ux-commercial-readiness`
**Base:** `main` @ `253050364c38ff2734924f4e54097a2715dafda3`
**Scope:** Article routing/metadata, legal placeholders, product registry, canonical metadata, sitemap/robots, integrity tests.
**Deployment:** none. All checks below are local.

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

### Build correction recorded during verification

The first Slice A build failed type checking:

```text
src/app/insights/page.tsx(21,17): error TS2367:
This comparison appears to be unintentional because the types '"insight"' and '"case-study"' have no overlap.
```

Cause: `WritingItem.type` had been narrowed to the literal `"insight"` while the archive card still supports legacy `"case-study"`/`"publication"` types. The union was restored in `src/content/writing.ts`; the derived registry still emits only `insight`. The final build above succeeded.

### Final build tail (abridged)

```text
✓ Compiled successfully in 1316ms
  Running TypeScript ...
  Finished TypeScript in 3.9s ...
✓ Generating static pages using 3 workers (53/53) in 1259ms
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

Started the final build with `npm start -- -p 3100` and issued requests with `fetch({ redirect: "manual" })`. The server was stopped after the checks. No production service was touched.

| Path | Status | Result |
| --- | --- | --- |
| `/sitemap.xml` | 200 | 12 article entries; no site-wide legal placeholder URLs. |
| `/robots.txt` | 200 | Declares `Sitemap: https://www.bageltech.net/sitemap.xml`; disallows `/api/`, `/dashboard/`, `/get-started`, contractor notices and legal placeholders. |
| `/insights/confidence-is-not-governance` | 200 | Canonical emitted as `https://www.bageltech.net/insights/confidence-is-not-governance`. |
| `/privacy` | 200 | Emits `<meta name="robots" content="noindex, follow">` and the review-required notice. |
| `/insights/governance-at-execution` | 404 | Explicitly excluded draft article. |
| `/writing/confidence-is-not-governance` | 308 | `Location: /insights/confidence-is-not-governance`. |
| `/insights/01_confidence_is_not_governance` | 308 | `Location: /insights/confidence-is-not-governance`. |
| `/dashboard` | 307 | `Location: /dashboard/login`. |

Raw-header check confirmed a single `Location` header for both 308 redirects.

---

## 3. What the new tests lock down

`tests/site-integrity.test.mjs` adds 11 source-level integrity tests:

1. One frontmatter registry drives exactly 12 published articles; one draft is explicitly excluded.
2. Alias slugs and retired `/writing/*` URLs are permanently redirected to canonical frontmatter slugs.
3. Every literal internal link and redirect target resolves to a real App Router page or route handler, including route groups and dynamic segments.
4. Legacy redirect stubs point directly at canonical destinations.
5. Sitemap contains only indexable public routes and is generated from the article/note registries.
6. Robots excludes private/draft surfaces and advertises the sitemap.
7. Indexable routes declare canonical URLs; no metadata title is double-branded.
8. Dashboard, onboarding, contractor notices and legal placeholders are `noindex`.
9. Footer legal labels map to the intended site-wide destinations and no misleading Careers/Press/X/Contractor-policy links remain.
10. Product registry has six controlled entries with stable ids, unique slugs/names, maturity vocabulary and disclosed limitations.
11. Proxy matcher covers every legacy redirect path.

`tests/site-architecture.test.mjs` was updated where it assumed the old duplicated `INSIGHTS` array and literal `sourceUrl` strings. It now checks the derived alias and frontmatter-derived slugs.

---

## 4. Coverage gaps (not claimed as passing)

- No browser-level/keyboard or axe/WCAG 2.2 AA audit yet (Slice E).
- No before/after screenshots were captured; no browser automation is configured in the repository (Slice E).
- No Lighthouse lab or field performance data yet (Slice E).
- No production-build smoke against `www.bageltech.net`; the critical deployment mismatch remains unresolved.
- No cross-model review of the final PR head has been completed.

These gaps are tracked in `REMAINING_RISKS.md` and are why this slice is **not release-ready for deployment**.
