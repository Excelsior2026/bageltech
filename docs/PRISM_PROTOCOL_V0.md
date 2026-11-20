# PRISM: Social Meaning and Intent Assessment

**Status:** Experimental prototype, NOT clinically validated
**Owner:** BagelTech / BDB Labs
**Implementation:** `/prism` in this Next.js repository
**Stage:** PRISM-12 pilot. PRISM-48 is only a proposed subsequent phase.

## Purpose and limits

PRISM explores interpretation of sarcasm, sincerity, nonliteral phrasing, indirect requests, mixed messages, and appropriate uncertainty. It is not a diagnosis, a measure of honesty, an assessment of malingering, or a measure of intentional misrepresentation. Performance discrepancies are never sufficient to infer willful misunderstanding.

The PHQ-2 to PHQ-9 model informs only the design pattern: shorter screening followed by a longer optional evaluation when warranted. PRISM has no validated diagnostic thresholds, sensitivity, specificity, reliability coefficients, reference norms, or established progression cutoff. Do not use clinical screening labels such as "positive" or "negative" for its results.

## Current prototype implementation

- Twelve original scenarios administered individually, with four candidate interpretations each and an optional skip choice.
- User-selectable confidence (1–5) and a free-text evidence explanation.
- Initial self-report on perceived sarcasm difficulty, separate from observed item performance.
- Local browser-only answers; no participant identity, login, database storage, analytics event submission, video capture, or microphone capture is implemented.
- A locally computed descriptive summary showing total and content-domain raw scores plus optional explanation review.
- Illustration and browser speech synthesis are *demonstration materials*. They are **not** validated audiovisual performances; they do not support inference about visual social-cue processing or vocal prosody.
- Automatic referral to PRISM-48 is disabled until validated decision criteria exist.
- Route uses noindex because its scoring and media are research prototypes.

## Required work before public screening or validation claims

1. Write paired scripts for all 12 scenarios. Each script must define the context, literal utterance, intended interpretation, nonliteral clues, competing plausible interpretations, performance directions, and alternate versions.
2. Record consented human-actor video and audio using controlled camera framing, volume, timing and pronunciation. Avoid synthetic vocal prosody for scored trials.
3. Generate modality variants (audio-only, silent video, audiovisual) with counterbalanced assignment. Repetition of identical scripts in a single session may itself reveal the intended answer.
4. Conduct blinded multi-rater item reviews and discard or revise items with ambiguous keys or weak agreement.
5. Implement an asset manifest with checksums, versioned scoring key, locked content after completion, accessible transcripts, and an accessibility plan that records conditions without penalizing accommodations.
6. Include controls for literal comprehension, vision, hearing, language and attention where relevant.
7. Conduct pilot cognitive interviews and representative-user testing before testing reliability, validity, differential item functioning, and false-positive rates.
8. Introduce ethics and privacy review, consent procedures, and data retention/deletion policies before any server-side response collection or recruitment.
9. For any potential credibility/reported-difficulty discrepancy, use multiple independent performance-validity approaches reviewed by qualified researchers. Never classify individuals as faking or lying from PRISM.
10. Commission an independent cross-model review of the final PR head and record the review before merge, per `AI_ATTRIBUTION.md`.

## Proposed PRISM-48 second stage

PRISM-48 is a future multimodal evaluation with 48 independent trials: literal comprehension, vocal inference, visual inference, integrated meaning, ambiguity, and transfer/consistency. Progression from PRISM-12 should be optional or professionally determined during research. Automated referral thresholds may be considered only after prospective validation against an appropriate external standard.

## Acceptance checks for prototype

- Exactly 12 unique scenario IDs, each with four distinct options and one predefined key.
- A participant cannot submit an unanswered scenario without explicitly selecting Skip.
- No rationales or keys appear before completion.
- Consent and a self-report response are required to begin.
- Browser replay is optional and clearly labeled synthetic; absence of TTS does not block the test.
- Results provide descriptive raw accuracy and disclaim clinical/deception interpretation.
- No network requests from the PRISM UI, no hidden participant collection.
- Mobile, keyboard, and screen-reader interaction tested manually.
- `npm test`, `npm run lint`, and `npm run build` pass before publication.

## Orchestration / evidence register

- **Approach:** Small, separately reviewable PR for the Next.js route and original stimuli. No deployment on this branch.
- **Authoring model:** GPT-6 (OpenAI / ChatGPT).
- **Implementation location:** `src/app/prism`.
- **Media status:** Actor videos and recorded audio are not yet produced.
- **Independent review:** Pending; this record is not evidence of acceptance.
- **PR / CI / deployment:** To be recorded with verified URLs, commit IDs and outcomes when available.
- **Known risks:** Incomplete audiovisual validity, unnormed content, self-report interpretation, cultural variability, prototype scoring uncertainty.
