import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const here = path.dirname(fileURLToPath(import.meta.url));
const validation = readFileSync(
  path.join(here, "../src/lib/prism/truepresence-validation.ts"), "utf8"
);
const compiled = ts.transpileModule(validation, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
const { validateTruePresenceFeatures } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);

function valid() {
  return {
    typing: {
      mean_inter_key_interval_ms: 177,
      inter_key_interval_stddev_ms: 49.2,
      correction_count: 1,
      correction_rate: 0.04,
      paste_count: 0,
      focus_to_first_input_ms: 410,
    },
    challenge: {
      response_latency_ms: 3500,
      expected_reading_time_ms: 1500,
      submitted_exactly: true,
    },
  };
}

test("accepts a permitted packet while adding only a server-chosen challenge type", () => {
  const output = validateTruePresenceFeatures(valid());
  assert.equal(output.challenge.challenge_type, "typing_cadence");
  assert.equal(output.typing.mean_inter_key_interval_ms, 177);
  assert.equal(output.challenge.submitted_exactly, true);
  assert.equal(Object.keys(output).sort().join(","), "challenge,typing");
});

test("rejects all accidental or intentional PRISM content attachment", () => {
  for (const forbidden of ["answers", "score", "item_id", "selfRating", "name", "email", "message", "raw_text"]) {
    assert.throws(() => validateTruePresenceFeatures({ ...valid(), [forbidden]: "secret" }), /unsupported_field/);
    assert.throws(() => validateTruePresenceFeatures({ ...valid(), typing: { ...valid().typing, [forbidden]: "secret" } }), /unsupported_field/);
    assert.throws(() => validateTruePresenceFeatures({ ...valid(), challenge: { ...valid().challenge, [forbidden]: "secret" } }), /unsupported_field/);
  }
});

test("rejects malformed and missing challenge features", () => {
  assert.throws(() => validateTruePresenceFeatures(null), /invalid_packet/);
  assert.throws(() => validateTruePresenceFeatures([]), /invalid_packet/);
  assert.throws(() => validateTruePresenceFeatures({ ...valid(), challenge: null }), /invalid_packet/);
  assert.throws(() => validateTruePresenceFeatures({ ...valid(), challenge: { submitted_exactly: true } }), /invalid_metric/);
  assert.throws(() => validateTruePresenceFeatures({ ...valid(), challenge: { ...valid().challenge, submitted_exactly: "true" } }), /invalid_challenge/);
  assert.throws(() => validateTruePresenceFeatures({ ...valid(), typing: {} }), /missing_metrics/);
  assert.throws(() => validateTruePresenceFeatures({ ...valid(), challenge: { ...valid().challenge, challenge_type: "trust_me" } }), /unsupported_field/);
});

test("rejects invalid numeric values, fractional counts and unreasonable timing", () => {
  const badValues = [
    ["correction_rate", 1.01], ["paste_count", 0.5], ["correction_count", -1],
    ["mean_inter_key_interval_ms", "100"], ["characters_per_minute", Infinity],
    ["typing_duration_ms", 3600001], ["focus_to_first_input_ms", -0.01]
  ];
  for (const [key, value] of badValues) {
    assert.throws(
      () => validateTruePresenceFeatures({ ...valid(), typing: { ...valid().typing, [key]: value } }),
      /invalid_metric/, key
    );
  }
  assert.throws(() => validateTruePresenceFeatures({
    ...valid(), challenge: { ...valid().challenge, expected_reading_time_ms: -2 }
  }), /invalid_metric/);
});

test("never accepts an embedded answer despite JSON nesting", () => {
  assert.throws(() => validateTruePresenceFeatures({
    typing: { correction_count: 1, metadata: { answer: "A" } },
    challenge: valid().challenge
  }), /unsupported_field/);
});
