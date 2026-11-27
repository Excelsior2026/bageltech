import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const here = path.dirname(fileURLToPath(import.meta.url));
const scoringSource = readFileSync(path.join(here, "../src/app/prism/scoring.ts"), "utf8");
const compiled = ts.transpileModule(scoringSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
const { scorePrism12 } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const items = Array.from({ length: 12 }, (_, index) => ({
  id: "P12-" + String(index + 1).padStart(2, "0"),
  domain: index < 4 ? "context" : index < 8 ? "social-intent" : "uncertainty",
  correct: index % 4
}));
const answer = (choice, confidence = 4) => ({ choice, confidence, explanation: "" });

test("scoring returns exactly 12 correct responses when all match", () => {
  const responses = items.map((item) => answer(item.correct));
  const score = scorePrism12(items, responses);
  assert.equal(score.correct, 12);
  assert.equal(score.answered, 12);
  assert.equal(score.skipped, 0);
  assert.equal(score.unanswered, 0);
  assert.equal(score.confidence, 4);
  assert.deepEqual(score.domains.map((d) => d.correct), [4, 4, 4]);
});

test("skip is not interpreted as a wrong chosen answer or a low confidence rating", () => {
  const responses = items.map((item) => answer(item.correct, 5));
  responses[0] = answer(-1, 1);
  responses[4] = answer(-1, 1);
  const score = scorePrism12(items, responses);
  assert.equal(score.correct, 10);
  assert.equal(score.answered, 10);
  assert.equal(score.skipped, 2);
  assert.equal(score.confidence, 5);
  assert.equal(score.domains[0].skipped, 1);
  assert.equal(score.domains[1].skipped, 1);
});

test("unanswered items are identified separately and all skipped means no confidence average", () => {
  const responses = items.map(() => answer(-1, 3));
  responses[0] = answer(null, 3);
  const score = scorePrism12(items, responses);
  assert.equal(score.unanswered, 1);
  assert.equal(score.skipped, 11);
  assert.equal(score.correct, 0);
  assert.equal(score.confidence, null);
});

test("invalid responses and duplicate item IDs are rejected", () => {
  const responses = items.map((item) => answer(item.correct));
  assert.throws(() => scorePrism12(items.slice(1), responses), RangeError);
  assert.throws(() => scorePrism12(items, responses.slice(1)), RangeError);
  const brokenChoice = [...responses];
  brokenChoice[3] = answer(99);
  assert.throws(() => scorePrism12(items, brokenChoice), RangeError);
  const brokenConfidence = [...responses];
  brokenConfidence[1] = answer(0, 99);
  assert.throws(() => scorePrism12(items, brokenConfidence), RangeError);
  const duplicate = items.map((item, idx) => idx ? item : { ...item, id: items[1].id });
  assert.throws(() => scorePrism12(duplicate, responses), /Duplicated PRISM/);
});
