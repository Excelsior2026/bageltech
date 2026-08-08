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
    "src/app/repository/page.tsx",
    "src/app/publications/page.tsx",
    "src/app/insights/page.tsx",
    "src/app/about/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/bmo/page.tsx",
    "src/app/contractors/page.tsx",
    "src/app/get-started/page.tsx",
    "src/app/contractors/privacy/page.tsx",
    "src/app/contractors/terms/page.tsx",
  ].forEach((path) => {
    assert.equal(exists(path), true, `${path} should exist`);
  });
});

test("publishes the contractor template gallery and request-only onboarding path", () => {
  const catalog = read("src/content/contractor-templates.ts");
  const gallery = read("src/components/onboarding/TemplateGallery.tsx");
  const wizard = read("src/components/onboarding/OnboardingWizard.tsx");

  [
    "heritage-craft",
    "modern-grid",
    "neighborly-warm",
    "industrial-pro",
    "premium-home",
    "direct-response",
  ].forEach((templateId) => {
    assert.match(catalog, new RegExp(templateId), `catalog should include ${templateId}`);
  });

  assert.match(gallery, /Choose \{selected\.name\}/, "gallery should route the selected template into setup");
  assert.match(wizard, /does not automatically/, "wizard should disclose the request-only boundary");
  assert.match(
    wizard,
    /contractor-platform-onboarding-v1/,
    "wizard should bind consent to the published terms version",
  );
});

test("offers a structured custom-site path without bypassing managed onboarding", () => {
  [
    "src/components/onboarding/CustomerPaths.tsx",
    "src/components/onboarding/CustomSiteWizard.tsx",
    "src/components/onboarding/CustomSiteWizard.module.css",
    "src/app/api/custom-site-blueprints/route.ts",
  ].forEach((path) => {
    assert.equal(exists(path), true, `${path} should exist`);
  });

  const contractors = read("src/app/contractors/page.tsx");
  const getStarted = read("src/app/get-started/page.tsx");
  const studio = read("src/components/onboarding/CustomSiteWizard.tsx");
  const studioStyles = read("src/components/onboarding/CustomSiteWizard.module.css");

  assert.match(contractors, /CustomerPaths/, "contractor page should explain both starting paths");
  assert.match(getStarted, /path === ["']custom["']/, "custom query should select the studio");
  assert.match(getStarted, /initialTemplate=\{template/, "template query should remain supported");
  assert.match(studio, /POST|method: ["']POST["']/, "studio should generate through a POST request");
  assert.match(studio, /siteBlueprint:/, "managed onboarding should carry the structured blueprint");
  assert.match(studio, /Review ready · not live/, "draft readiness should be explicit");
  assert.match(studio, /Guided fallback draft/, "fallback provenance should be visible");
  [
    "organization-configuration",
    "deterministic-safety-triage",
    "service-request-v1",
    "private-photo-uploads",
    "customer-document-links",
    "staff-workspace",
  ].forEach((binding) => {
    assert.match(studio, new RegExp(binding), `studio should declare ${binding}`);
  });
  [
    "editorial-split",
    "precision-grid",
    "immersive-service",
    "conversion-stack",
  ].forEach((composition) => {
    assert.match(studioStyles, new RegExp(composition), `preview should style ${composition}`);
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

test("homepage orients visitors to the three workstreams", () => {
  const homepage = read("src/app/page.tsx");

  ["BagelTech", "BDB Labs", "Bagelle Parris Vargas"].forEach((label) => {
    assert.match(homepage, new RegExp(label), `homepage should route visitors to ${label}`);
  });
});

test("implements a document repository surface", () => {
  [
    "src/content/document-repository.ts",
    "src/lib/repository-storage.ts",
    "src/components/repository/RepositoryBrowser.tsx",
    "src/components/dashboard/RepositoryManager.tsx",
    "src/app/dashboard/(protected)/layout.tsx",
    "src/app/dashboard/(protected)/repository/page.tsx",
  ].forEach((path) => {
    assert.equal(exists(path), true, `${path} should exist`);
  });

  const repository = read("src/content/document-repository.ts");
  assert.match(repository, /CURATED_REPOSITORY_DOCUMENTS/, "repository content should expose curated documents");
  assert.match(repository, /DOCUMENT_KIND_OPTIONS/, "repository content should expose document kinds");
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
