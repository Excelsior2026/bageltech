import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = readFileSync(path.join(here, "../src/app/prism/items.ts"), "utf8");
const client = readFileSync(path.join(here, "../src/app/prism/PrismClient.tsx"), "utf8");
const page = readFileSync(path.join(here, "../src/app/prism/page.tsx"), "utf8");

test("PRISM-12 bank contains exactly 12 distinct items and keys", () => {
  const ids = [...src.matchAll(/id: "(P12-\d{2})"/g)].map((m) => m[1]);
  assert.equal(ids.length, 12);
  assert.equal(new Set(ids).size, 12);
  const keys = [...src.matchAll(/correct: ([0-3]), rationale:/g)];
  assert.equal(keys.length, 12);
  const optionLists = [...src.matchAll(/options: \[([^\n]+)\],/g)];
  assert.equal(optionLists.length, 12);
  assert.match(src, /intent: "ambiguous"/);
  assert.match(src, /intent: "sincere"/);
  assert.match(src, /intent: "sarcasm"/);
  assert.match(src, /intent: "mixed"/);
  assert.match(src, /intent: "indirect"/);
});

test("PRISM route is explicitly marked as an experimental noindex pilot", () => {
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.match(page, /MarketingLayout/);
  assert.match(client, /not a validated clinical/);
  assert.match(client, /No deception finding/);
  assert.match(client, /server-side response storage/);
});

test("PRISM interface includes consent, optional skip and a separate results phase", () => {
  assert.match(client, /checked=\{consent\}/);
  assert.match(client, /value="-1"/);
  assert.match(client, /phase === "results"/);
  assert.match(client, /speechSynthesis/);
  assert.match(client, /not used to assess vocal sarcasm/);
});

test("TruePresence check is separately opted in and stays out of PRISM scoring", () => {
  const flow = readFileSync(path.join(here, "../src/app/prism/TruePresenceCheck.tsx"), "utf8");
  const route = readFileSync(path.join(here, "../src/app/api/prism/truepresence/route.ts"), "utf8");
  assert.match(client, /<TruePresenceCheck \/>/);
  assert.match(flow, /setOptIn/);
  assert.match(flow, /checked=\{consent\}/);
  assert.match(flow, /if \(!consent \|\| !configured/);
  assert.match(flow, /body: JSON\.stringify\(payload\)/);
  assert.match(route, /enforcement_mode: "observe"/);
  assert.match(route, /validateTruePresenceFeatures\(JSON\.parse\(data\)\)/);
  assert.match(route, /function sameOrigin/);
  assert.match(route, /MAX_BODY_BYTES = 2048/);
  assert.doesNotMatch(route, /PRISM12_ITEMS|selfRating|explanation|question\.options/);
  assert.doesNotMatch(flow, /body: JSON\.stringify\(\{.*entry/);
});
