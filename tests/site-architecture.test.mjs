import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const exists = (path) => existsSync(join(root, path));

test("implements the required public route structure", () => {
  [
    "src/app/page.tsx",
    "src/app/bageltech/page.tsx",
    "src/app/bdb-labs/page.tsx",
    "src/app/bagelle-parris-vargas/page.tsx",
    "src/app/publications/page.tsx",
    "src/app/insights/page.tsx",
    "src/app/about/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/bmo/page.tsx",
  ].forEach((path) => {
    assert.equal(exists(path), true, `${path} should exist`);
  });
});

test("keeps the legacy Bagel URL as a redirect to BMO", () => {
  assert.equal(exists("src/app/bagel/page.tsx"), true, "legacy /bagel route should exist");

  const legacyRoute = read("src/app/bagel/page.tsx");
  assert.match(legacyRoute, /redirect\(["']\/bmo["']\)/, "/bagel should redirect to /bmo");
});

test("separates publications and insights into distinct curated content sources", () => {
  assert.equal(exists("src/content/publications.ts"), true, "publications content should exist");
  assert.equal(exists("src/content/insights.ts"), true, "insights content should exist");

  const publications = read("src/content/publications.ts");
  const insights = read("src/content/insights.ts");

  assert.match(publications, /export const PUBLICATIONS/, "publications should export PUBLICATIONS");
  assert.match(insights, /export const INSIGHTS/, "insights should export INSIGHTS");
  assert.doesNotMatch(publications, /export const INSIGHTS/, "publications should not export insights");
  assert.doesNotMatch(insights, /export const PUBLICATIONS/, "insights should not export publications");
});

test("homepage is a router for the three workstreams", () => {
  const homepage = read("src/app/page.tsx");

  ["BagelTech", "BDB Labs", "Bagelle Parris Vargas"].forEach((label) => {
    assert.match(homepage, new RegExp(label), `homepage should route visitors to ${label}`);
  });
});

test("implements the shared brand family system", () => {
  [
    "public/brand/bageltech/icon.svg",
    "public/brand/bageltech/lockup-light.svg",
    "public/brand/bageltech/lockup-dark.svg",
    "public/brand/bdb-labs/icon.svg",
    "public/brand/bdb-labs/lockup-light.svg",
    "public/brand/bdb-labs/lockup-dark.svg",
    "public/brand/bpv/icon.svg",
    "public/brand/bpv/lockup-light.svg",
    "public/brand/bpv/lockup-dark.svg",
    "src/content/brand-tokens.ts",
    "src/components/BrandMark.tsx",
  ].forEach((path) => {
    assert.equal(exists(path), true, `${path} should exist`);
  });

  const tokens = read("src/content/brand-tokens.ts");
  [
    "#081426",
    "#D4A94D",
    "#25D6C8",
    "#A06BFF",
    "#4D7CFF",
    "#C9A45A",
  ].forEach((value) => {
    assert.match(tokens, new RegExp(value), `brand token ${value} should be exported`);
  });

  const homepage = read("src/app/page.tsx");
  assert.match(homepage, /BrandMark/, "homepage should use shared brand marks");

  const header = read("src/components/Header.tsx");
  assert.match(header, /BrandMark/, "header should use the BagelTech lockup");
});
