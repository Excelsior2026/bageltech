# Implementation Plan — BagelTech.net Site Improvement

**Base:** `main` @ `253050364c38ff2734924f4e54097a2715dafda3`
**Working branch:** `improvement/site-ux-commercial-readiness`
**Owner/contributor:** OpenCode agent — Big Pickle (`big-pickle`), acting as lead implementation engineer.
**Status:** Slice A implemented and locally verified; awaiting review. No changes merged or deployed.

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## Principles

- Preserve existing architecture, identity, content and working behaviour.
- One authoritative source per fact; no duplicated metadata.
- No invented capabilities, certifications, compliance claims, clients or outcomes.
- No merge, deploy, DNS or production configuration change without explicit human approval.
- Every slice: scoped diff, tests, evidence, documentation, independent review before acceptance.
- Legal language, product claims, privacy integrations, material operating costs and brand positioning are escalated, not decided unilaterally.

---

## Slice A — Foundation and correctness

**Scope:** article routing and metadata, footer/legal destinations, canonical product registry fields, metadata/canonical/sitemap/robots, automated link/route tests, deployment-traceability ADR.

**Work items**
1. Make `content/articles/*.md` frontmatter authoritative for title/date/summary/author/slug and taxonomy; derive `/insights` and homepage from it; remove `writing.ts` duplicate metadata.
2. Add permanent redirects for retired `/writing/<slug>` (already in proxy) and alias article slugs → canonical; add `alternates.canonical`.
3. Decide inclusion of `governance-at-execution.md` explicitly; no orphaned public content.
4. Footer: correct labels/destinations; add `/privacy`, `/terms`, `/security`, `/accessibility` structures marked for legal review; remove misleading Careers/Press/Security mappings.
5. Extend `PRODUCTS` with stable id, controlled maturity, limitations, engagement action, evidence references; keep names/statuses consistent in every consumer.
6. Metadata: `metadataBase`, de-duplicated titles, canonicals, OG image, article JSON-LD, noindex for private surfaces; add `sitemap.ts` and `robots.ts`.
7. Tests: route/link integrity, article/slug consistency, product registry consistency, metadata invariants, proxy redirect table.
8. ADR-001: deployment traceability and live-artifact verification.

**Acceptance:** all public internal links resolve; articles load; old URLs redirect; footer labels match destinations; product names/statuses consistent; metadata correct; baseline tests still green.

**Evidence:** `TEST_EVIDENCE.md`.

---

## Slice B — Core UX and homepage

Hero with the approved copy direction, clear audience paths, three-division hierarchy (BagelTech / BDB Labs / Bagelle Parris Vargas), recommended primary navigation, active-page indicators, keyboard/mobile improvements, restrained persistent contact action. Fix `ScrollReveal` so content is visible without JS.

**Human input required:** final approval of headline and brand-positioning copy.

---

## Slice C — Product commercialization

Reusable accessible product-detail template using the canonical registry. Overview, problem, audience, capabilities, approach, evidence, maturity, engagement. Approved products only. ELEANOR research framework / governance kernel / commercial offering distinguished. ECHO and Sematik remain unpublished pending explicit approval.

**Human input required:** product descriptions, maturity labels, disclosure boundaries, approved evidence.

---

## Slice D — Research and proof

Publication taxonomy (paper, preprint, proposal, experiment, validated implementation, commercial product), consistent dates/DOIs/authors, reconciliation of conflicting measurements with source material, filters/search, evidence-backed advisory case-study components. No invented clients or results.

---

## Slice E — Conversion and quality

Accessible inquiry form with server-side validation, abuse protection, privacy disclosure and error handling; email fallback retained; activation gated if no approved delivery integration exists. WCAG 2.2 AA audit, responsive/browser tests, security review, performance baselines (lab vs field), production-build smoke tests, release readiness.

**Human input required:** delivery infrastructure and privacy approval; production deployment approval.

---

## Governance and evidence records

- `BASELINE_AUDIT.md` — verified baseline and deployment mismatch.
- `UX_DESIGN_DECISIONS.md` — design rationale (Slice B onward).
- `PRODUCT_CONTENT_INVENTORY.md` — approved/unapproved product content and claim boundaries.
- `TEST_EVIDENCE.md` — commands and results per slice.
- `RELEASE_READINESS.md` — go/no-go assessment; never claims deployment.
- `REMAINING_RISKS.md` — unresolved issues and deferred work.
- `docs/adr/ADR-001-deployment-traceability.md` — release verification decision.

---

## Pull-request strategy

One PR per slice, opened as a draft, with honest AI attribution fields. Per `AI_ATTRIBUTION.md`, AI-drafted PRs require independent review by a **different** model before merge; the reviewer model and reviewed head SHA must be recorded. Until a reviewer model is assigned, PRs remain drafts and `Cross-Model-Review` is recorded as `not-complete` rather than falsely claiming `completed`.
