# Product Content Inventory — Slice A

**Date:** 2026-11-18
**Source of truth:** `src/content/site.ts` → `PRODUCTS`
**Rule:** `content/articles/*.md` owns article metadata; `PRODUCTS` owns public product names, maturity and boundaries. No other file may introduce a competing product name or status.

> AI-Model: Big Pickle (`big-pickle`; exact build version not exposed by this runtime)
> AI-Provider: OpenCode (`opencode`)
> AI-Tool: OpenCode
> AI-Role: Drafted

---

## 1. Published registry entries

| Product | Stable id | Maturity | Public status label | Destination | Disclosed boundary | Evidence on site | Approval state |
| --- | --- | --- | --- | --- | --- | --- | --- |
| J-Box | `j-box` | `limited-availability` | Managed setup requests open | `/contractors` | Managed setup required; a request does not activate or deploy a site. | Managed setup workflow (`/contractors`) | Draft — owner should approve availability wording |
| ELEANOR | `eleanor` | `research` | Research framework | Zenodo DOI | Described as a published research framework, not a separately marketed commercial product; no support, certification or production-readiness claim. | `https://doi.org/10.5281/zenodo.17605176` | Draft — do not reframe as a commercial product without human approval |
| CogniScribe | `cogniscribe` | `active-development` | Active development — early access enquiries | `mailto:bill@bageltech.net?subject=Product or platform inquiry` | Early access by enquiry only; no general availability and no published performance results. | None published | Draft — claims and early-access wording require approval |
| Contract Management Intelligence | `contract-management-intelligence` | `pilot` | Pilot | Scoped pilot enquiry mailto | Pilot availability depends on scope; no automated legal advice or compliance certification claimed. | None published | Draft — pilot claim and scope require approval |
| TrueTraining | `truetraining` | `active-development` | In development | Inquiry mailto | No public demonstration or production deployment asserted; integration scope per engagement. | None published | Draft — development status requires approval |
| TruePresence | `truepresence` | `active-development` | In development | Inquiry mailto | No accuracy, identity-assurance or compliance claim; internal admin tooling is not a public product demonstration. | None published | Draft — development status and boundary require approval |

All six entries are rendered on `/products`. The homepage renders the featured subset `j-box`, `eleanor`, `truetraining`, `truepresence` from the same registry.

---

## 2. Controlled vocabulary

`ProductMaturity` is the only allowed maturity vocabulary:

```text
research | prototype | active-development | pilot | limited-availability | commercially-available
```

No entry currently uses `commercially-available`. This is deliberate: no public evidence in the repository supports a general-availability claim.

Each entry declares:

- stable `id` (never change once published);
- canonical `name`, `slug`, `statusLabel` and `maturity`;
- `category`, `summary`, `audience`, `problem`, `approach`;
- explicit `limitations`;
- `engagement.action` / `engagement.href`;
- `evidence` links (empty where no approved reference exists);
- `href` as the primary legacy destination.

---

## 3. Removed or withheld content

| Item | Decision | Reason |
| --- | --- | --- |
| `Intelligent Contract Management` | Removed as a public product name | Stale production string; canonical registry name is `Contract Management Intelligence`. |
| ECHO | Not added to `PRODUCTS` | Requires explicit human approval and evidence before publication. |
| Sematik | Not added to `PRODUCTS` | Requires explicit human approval and evidence before publication. |
| ELEANOR as `Governance engine` / commercial offering | Not published | Research documents and the Zenodo DOI support a research framework, not a commercial product claim. |
| `governance-at-execution.md` | `status: "draft"`; excluded from index, article route and sitemap | Previously orphaned short draft with no canonical slug; no approval to publish. |
| Site-wide privacy/terms/security/accessibility text | Structural placeholders, `noindex` | Substantive language requires human/legal review. |
| Product detail pages | Deferred to Slice C | Would need approved descriptions, evidence and maturity labels. |

---

## 4. Claim boundaries for reviewers

- Do not add certifications, compliance statements, customer names, measured outcomes, performance numbers or production-deployment claims without a source the owner has approved.
- Do not describe internal dashboards as public product demonstrations.
- Do not treat `mailto:` links as a delivery integration; contact handling remains email-only (Slice E).
- Do not index legal placeholders until substantive approved language exists.
- Any change to `statusLabel` or `maturity` is a material claim change and requires owner approval.

---

## 5. Verification

`tests/site-integrity.test.mjs` asserts six unique ids/slugs/names, six status labels and maturity values, the controlled vocabulary, ELEANOR's research framing, the stale-name removal, featured-id validity and that consumers render `statusLabel`, `limitations` and `engagement.href`.
