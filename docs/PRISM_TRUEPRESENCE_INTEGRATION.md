# PRISM + TruePresence Integration: Trust Boundaries and Configuration

**Status:** Draft prototype, not deployed or security-reviewed.
**Repositories:** Public site `Excelsior2026/bageltech`; proprietary TruePresence service `BDBLabs/TruePresenceESE`.
**Entry points:** `/prism`, `/api/prism/truepresence`.

## Distinct purposes

PRISM-12 is an experimental language/social-inference screener, not a clinical diagnosis. TruePresence is an interaction-authenticity service that summarizes aggregate behavioral timings and returns uncertain, probabilistic automation/human-presence signals. These are different questions.

**Never infer deception, feigning, comprehension, intelligence, identity, or clinical diagnosis from TruePresence's output.** A human may answer incorrectly; an automation tool may select valid answers; neither implies lying. There is no automated access restriction, result invalidation, or escalation from TruePresence in this pilot.

## Architecture

```text
PRISM client (all answers, explanations, self-rating local to browser)
   | on results: GET same-origin /api/prism/truepresence
   | separate optional consent + fixed non-sensitive phrase
   | derived timing only, no text, answers, item IDs or PRISM score
   v
BagelTech Next.js route /api/prism/truepresence
   | same-origin POST, strict 2 KiB body cap, exact field allowlist
   | server-generated ephemeral session ID, no local storage
   | observe-only; explicit external HTTPS endpoint
   v
TruePresence /api/v1/truepresence/evaluate-interaction
   | probabilistic interaction analysis; evidence may be persisted upstream
   v
BagelTech client receives only completion/status
```

## Deployment

Do **not** enable by default. Configure the server-only variables only after reviewing backend readiness, access, abuse controls, operator ownership, and retention:

- `TRUEPRESENCE_EVALUATION_URL`: full `https://...` URL with exact path `/api/v1/truepresence/evaluate-interaction`. HTTPS and exact path are enforced; credentials and query/fragment are rejected.
- `TRUEPRESENCE_TENANT_ID`: approved tenant identifier (defaults to `default` when unset).

Do not place internal admin or legacy REST service tokens in browser variables. The upstream TruePresence evaluation endpoint supports privacy-safe anonymous SDK requests with rate limiting; this BagelTech bridge uses the same API without legacy REST secrets. Ensure the upstream service implements appropriate public rate limits, resource quotas, tenant isolation, and evidence retention before enabling production traffic.

The website route returns `configured: false` until a suitable endpoint is set. A participant can always complete PRISM-12 without opting in or without network access to TruePresence. There is no background behavioral collection.

## Data contract

Only these aggregate feature keys are admitted:
- `typing.mean_inter_key_interval_ms`
- `typing.inter_key_interval_stddev_ms`
- `typing.characters_per_minute`
- `typing.correction_count`, `correction_rate`, `paste_count`
- `typing.focus_to_first_input_ms`
- `typing.prompt_render_to_first_input_ms`, `typing_duration_ms`
- `challenge.response_latency_ms`
- `challenge.expected_reading_time_ms`
- `challenge.submitted_exactly`

The server reconstructs the upstream payload with `surface: web`, `site_id: bageltech-prism`, `enforcement_mode: observe`, and a random ephemeral session ID. It rejects any unknown field, including content, answers, text, transcript, email, personal details, and score. No PRISM data is joined with TruePresence artifacts.

The browser only temporarily holds the fixed challenge phrase to check exact matching. No raw keystroke, typed phrase, assessment response, free-form explanation or score is sent to TruePresence. Response text is discarded after a successful check. The upstream TruePresence evidence store is a *separate* retention domain: privacy review must cover its handling before enabling this integration.

## Threat model and release gates

- Denial-of-service: server route has 2 KiB cap, but full production IP/tenant rate limiting is still needed. TruePresence backend rate limiting is not equivalent to a quota enforced at BagelTech edge.
- CSRF: POST checks same-origin and JSON content type. Revisit when migrating domains or proxies and test both `www` and apex deployments.
- False assurance: server returns only observe-mode status; it cannot gate assessment and must not claim to establish humanness.
- Untrusted backend: no automatic enforcement of recommended actions; server rejects unexpected recommended-action values.
- Privacy: no hidden telemetry or implicit consent. The TruePresence check is separate, optional, and appears only after PRISM results.
- External artifacts: obtain retention and deletion documentation, explicit user disclosure, and data-protection review before production enablement.
- Accessibility and equity: challenge keyboard/paste use may differ due to assistive technologies. Never count these differences as cheating or invalid cognition.
- Proprietary code boundary: the private TruePresence SDK source is *not* copied into the public BagelTech repo. This initial adapter speaks the documented backend API with a minimal derived-feature collector. For richer browser signals, distribute the reviewed SDK through an approved artifact channel and replace the minimal collector, maintaining opt-in and privacy guardrails.
- Must run tests, lint, build, cross-model final-head review, security and privacy assessment before merge or deployment.

## Orchestration / evidence

- Implementing model: GPT-6 via OpenAI ChatGPT.
- Initial code: BagelTech `feat/prism12-pilot`, draft PR #16.
- Backend code changes: none. This integration requires upstream runtime/deployment configuration but does not change the private repo.
- Cross-model review, CI, security assessment, privacy review, production deployment: pending, never claim complete without evidence.
