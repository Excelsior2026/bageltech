import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import {
  CUSTOM_SITE_REQUIRED_BINDINGS,
  MAX_CUSTOM_SITE_BRIEF_BYTES,
  deriveCustomSiteGatewayUser,
  findProhibitedBlueprintClaim,
  parseCustomSiteBlueprint,
  parseCustomSiteBrief,
} from "../src/lib/custom-site/contract.ts";
import {
  CUSTOM_SITE_AI_TAGS,
  CUSTOM_SITE_AI_RATE_LIMIT_MAX_GENERATIONS,
  CUSTOM_SITE_AI_RATE_LIMIT_WINDOW_MS,
  CUSTOM_SITE_AI_TIMEOUT_MS,
  createCustomSiteAiRateLimiter,
  createGuidedFallbackBlueprint,
  generateCustomSiteBlueprint,
  resolveCustomSiteAiConfiguration,
} from "../src/lib/custom-site/generator.ts";
import { createCustomSiteBlueprintPost } from "../src/app/api/custom-site-blueprints/route.ts";

const SESSION_ID = "6f6a85c0-468c-4bc3-8c1d-24f689597461";
const GENERATED_AT = "2026-08-07T12:00:00.000Z";

const validBrief = () => ({
  sessionId: SESSION_ID.toUpperCase(),
  companyName: "  Northline   Electric  ",
  serviceArea: " San Diego County ",
  services: ["lighting", "residential"],
  primaryColor: "#0a2b4c",
  accentColor: "#f5a623",
  audience: "homeowners",
  tone: "modern",
  conversionGoal: "balanced",
  companyStory: null,
  differentiators: " Clear project communication ",
  projectFocus: " Older-home panel and lighting projects ",
  wordsToAvoid: null,
});

function normalizedBrief() {
  const parsed = parseCustomSiteBrief(validBrief());
  assert.equal(parsed.ok, true);
  if (!parsed.ok) throw new Error("Expected valid brief.");
  return parsed.value;
}

function aiDraft() {
  const fallback = createGuidedFallbackBlueprint(
    normalizedBrief(),
    GENERATED_AT,
  ).blueprint;
  return {
    design: {
      composition: "precision-grid",
      density: "airy",
      headingStyle: "geometric",
      cornerStyle: "soft",
    },
    content: structuredClone(fallback.content),
  };
}

function enabledEnvironment(overrides = {}) {
  return {
    CUSTOM_SITE_AI_ENABLED: "true",
    CUSTOM_SITE_AI_MODEL: "provider/current-general-model",
    CUSTOM_SITE_AI_RATE_LIMIT_SECRET: "r".repeat(48),
    AI_GATEWAY_API_KEY: "gateway-test-credential",
    ...overrides,
  };
}

function browserRequest(body, headers = {}) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("https://www.bageltech.net/api/custom-site-blueprints", {
    method: "POST",
    headers: {
      origin: "https://www.bageltech.net",
      "sec-fetch-site": "same-origin",
      "content-type": "application/json",
      "content-length": String(new TextEncoder().encode(raw).byteLength),
      "x-forwarded-for": "203.0.113.9, 10.0.0.2",
      ...headers,
    },
    body: raw,
  });
}

test("locks the custom-site v1 input and integration contracts", () => {
  assert.equal(MAX_CUSTOM_SITE_BRIEF_BYTES, 12 * 1024);
  assert.equal(CUSTOM_SITE_AI_TIMEOUT_MS, 15_000);
  assert.equal(CUSTOM_SITE_AI_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1_000);
  assert.equal(CUSTOM_SITE_AI_RATE_LIMIT_MAX_GENERATIONS, 5);
  assert.deepEqual(CUSTOM_SITE_AI_TAGS, [
    "contractor-custom-studio",
    "blueprint-v1",
  ]);
  assert.deepEqual(CUSTOM_SITE_REQUIRED_BINDINGS, [
    "organization-configuration",
    "deterministic-safety-triage",
    "service-request-v1",
    "private-photo-uploads",
    "customer-document-links",
    "staff-workspace",
  ]);
});

test("strictly parses, normalizes, and orders a valid brief", () => {
  const parsed = parseCustomSiteBrief(validBrief());
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.deepEqual(parsed.value, {
    sessionId: SESSION_ID,
    companyName: "Northline Electric",
    serviceArea: "San Diego County",
    services: ["residential", "lighting"],
    primaryColor: "#0A2B4C",
    accentColor: "#F5A623",
    audience: "homeowners",
    tone: "modern",
    conversionGoal: "balanced",
    companyStory: null,
    differentiators: "Clear project communication",
    projectFocus: "Older-home panel and lighting projects",
    wordsToAvoid: null,
  });
});

test("rejects contract drift, duplicate services, unsafe copy, and non-v4 IDs", () => {
  const cases = [
    {
      mutate: (brief) => {
        brief.debug = true;
      },
      error: "request.debug is not allowed.",
    },
    {
      mutate: (brief) => {
        delete brief.companyStory;
      },
      error: "request.companyStory is required.",
    },
    {
      mutate: (brief) => {
        brief.services = ["lighting", "lighting"];
      },
      error:
        "request.services contains an unsupported or duplicate service key.",
    },
    {
      mutate: (brief) => {
        brief.sessionId = "6f6a85c0-468c-1bc3-8c1d-24f689597461";
      },
      error: "request.sessionId must be a UUIDv4.",
    },
    {
      mutate: (brief) => {
        brief.companyStory = "<script>alert(1)</script>";
      },
      error:
        "request.companyStory must be plain text no longer than 500 characters.",
    },
  ];

  for (const { mutate, error } of cases) {
    const brief = validBrief();
    mutate(brief);
    const parsed = parseCustomSiteBrief(brief);
    assert.equal(parsed.ok, false, error);
    if (parsed.ok) continue;
    assert.ok(parsed.errors.includes(error), JSON.stringify(parsed.errors));
  }
});

test("builds a deterministic, fully bound guided fallback", () => {
  const brief = normalizedBrief();
  const first = createGuidedFallbackBlueprint(brief, GENERATED_AT);
  const second = createGuidedFallbackBlueprint(brief, GENERATED_AT);
  assert.deepEqual(first, second);
  assert.equal(first.aiUsed, false);
  assert.equal(first.blueprint.blueprintVersion, 1);
  assert.equal(first.blueprint.fieldIntegrationVersion, 1);
  assert.equal(first.blueprint.design.primaryColor, brief.primaryColor);
  assert.equal(first.blueprint.design.accentColor, brief.accentColor);
  assert.equal(first.blueprint.provenance.generator, "guided-fallback");
  assert.equal(first.blueprint.provenance.modelId, null);
  assert.match(first.blueprint.provenance.briefHash, /^[0-9a-f]{64}$/);
  assert.equal(first.blueprint.content.processSteps.length, 3);
  assert.deepEqual(
    first.blueprint.integration.requiredBindings,
    CUSTOM_SITE_REQUIRED_BINDINGS,
  );
  assert.equal(findProhibitedBlueprintClaim(first.blueprint.content), null);
  assert.equal(parseCustomSiteBlueprint(first.blueprint).ok, true);
});

test("AI configuration fails closed unless every explicit gate is present", () => {
  const configurations = [
    {},
    enabledEnvironment({ CUSTOM_SITE_AI_ENABLED: "false" }),
    enabledEnvironment({ CUSTOM_SITE_AI_MODEL: "" }),
    enabledEnvironment({ CUSTOM_SITE_AI_MODEL: "not-a-gateway-model" }),
    enabledEnvironment({ CUSTOM_SITE_AI_RATE_LIMIT_SECRET: "short" }),
    enabledEnvironment({ AI_GATEWAY_API_KEY: "", VERCEL_OIDC_TOKEN: "" }),
  ];
  for (const environment of configurations) {
    assert.equal(resolveCustomSiteAiConfiguration(environment), null);
  }
  assert.deepEqual(
    resolveCustomSiteAiConfiguration(enabledEnvironment()),
    { modelId: "provider/current-general-model" },
  );
  assert.deepEqual(
    resolveCustomSiteAiConfiguration(
      enabledEnvironment({
        AI_GATEWAY_API_KEY: "",
        VERCEL_OIDC_TOKEN: "oidc-test-token",
      }),
    ),
    { modelId: "provider/current-general-model" },
  );
});

test("uses an environment-selected Gateway model and wrapper-owned fields", async () => {
  const calls = [];
  const brief = normalizedBrief();
  const result = await generateCustomSiteBlueprint(
    brief,
    { privacyUser: "f".repeat(64) },
    {
      environment: enabledEnvironment(),
      now: () => new Date(GENERATED_AT),
      async generateDraft(input) {
        calls.push(input);
        return aiDraft();
      },
    },
  );

  assert.equal(result.aiUsed, true);
  assert.equal(result.blueprint.provenance.generator, "ai-gateway");
  assert.equal(
    result.blueprint.provenance.modelId,
    "provider/current-general-model",
  );
  assert.equal(result.blueprint.design.primaryColor, brief.primaryColor);
  assert.equal(result.blueprint.design.accentColor, brief.accentColor);
  assert.equal(result.blueprint.design.tone, brief.tone);
  assert.deepEqual(
    result.blueprint.integration.requiredBindings,
    CUSTOM_SITE_REQUIRED_BINDINGS,
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].modelId, "provider/current-general-model");
  assert.equal(calls[0].privacyUser, "f".repeat(64));
  assert.equal(calls[0].prompt.includes(SESSION_ID), false);
  assert.match(calls[0].prompt, /Do not invent or imply years in business/);
});

test("falls back on missing config, provider failure, invalid output, or prohibited claims", async () => {
  const brief = normalizedBrief();
  let calls = 0;
  const missingConfiguration = await generateCustomSiteBlueprint(
    brief,
    { privacyUser: "f".repeat(64) },
    {
      environment: {},
      now: () => new Date(GENERATED_AT),
      async generateDraft() {
        calls += 1;
        return aiDraft();
      },
    },
  );
  assert.equal(missingConfiguration.aiUsed, false);
  assert.equal(calls, 0);

  const failureCases = [
    async () => {
      throw new Error("provider unavailable");
    },
    async () => ({ design: {}, content: {} }),
    async () => {
      const draft = aiDraft();
      draft.content.headline = "Licensed and insured service, guaranteed";
      return draft;
    },
  ];
  for (const generateDraft of failureCases) {
    const result = await generateCustomSiteBlueprint(
      brief,
      { privacyUser: "f".repeat(64) },
      {
        environment: enabledEnvironment(),
        now: () => new Date(GENERATED_AT),
        generateDraft,
      },
    );
    assert.equal(result.aiUsed, false);
    assert.equal(result.blueprint.provenance.generator, "guided-fallback");
    assert.equal(findProhibitedBlueprintClaim(result.blueprint.content), null);
  }
});

test("rejects spelled-out experience and response-time promises", () => {
  const content = aiDraft().content;
  content.aboutBody = "Twenty years of experience for every project.";
  assert.ok(findProhibitedBlueprintClaim(content));

  content.aboutBody = "A practical process for each project.";
  content.requestLead = "Expect a same-day response from the team.";
  assert.ok(findProhibitedBlueprintClaim(content));

  content.requestLead = "The team provides prompt service after each request.";
  assert.ok(findProhibitedBlueprintClaim(content));

  content.requestLead = "Your request moves into the staff workspace.";
  assert.ok(findProhibitedBlueprintClaim(content));

  const blueprint = createGuidedFallbackBlueprint(
    normalizedBrief(),
    GENERATED_AT,
  ).blueprint;
  blueprint.content.headline = "Same-day electrical service";
  const parsed = parseCustomSiteBlueprint(blueprint);
  assert.equal(parsed.ok, false);
  if (!parsed.ok) {
    assert.ok(
      parsed.errors.includes(
        "blueprint.content contains an unsupported public claim or implementation detail.",
      ),
    );
  }
});

test("bounds AI generation per privacy-safe user and falls back after the limit", async () => {
  const brief = normalizedBrief();
  const rateLimiter = createCustomSiteAiRateLimiter({
    maxGenerations: 2,
    windowMs: 60_000,
    maxIdentities: 8,
  });
  let providerCalls = 0;
  const dependencies = {
    environment: enabledEnvironment(),
    now: () => new Date(GENERATED_AT),
    rateLimiter,
    async generateDraft() {
      providerCalls += 1;
      return aiDraft();
    },
  };

  const first = await generateCustomSiteBlueprint(
    brief,
    { privacyUser: "a".repeat(64) },
    dependencies,
  );
  const second = await generateCustomSiteBlueprint(
    brief,
    { privacyUser: "a".repeat(64) },
    dependencies,
  );
  const limited = await generateCustomSiteBlueprint(
    brief,
    { privacyUser: "a".repeat(64) },
    dependencies,
  );
  const otherUser = await generateCustomSiteBlueprint(
    brief,
    { privacyUser: "b".repeat(64) },
    dependencies,
  );

  assert.equal(first.aiUsed, true);
  assert.equal(second.aiUsed, true);
  assert.equal(limited.aiUsed, false);
  assert.equal(otherUser.aiUsed, true);
  assert.equal(providerCalls, 3);
});

test("derives a privacy-safe Gateway user from first IP and session", () => {
  const secret = "s".repeat(48);
  const expected = createHmac("sha256", secret)
    .update(`203.0.113.9\n${SESSION_ID}`)
    .digest("hex");
  const actual = deriveCustomSiteGatewayUser(
    secret,
    " 203.0.113.9, 10.0.0.2 ",
    SESSION_ID,
  );
  assert.equal(actual, expected);
  assert.match(actual, /^[0-9a-f]{64}$/);
  assert.equal(actual.includes("203.0.113.9"), false);
  assert.equal(deriveCustomSiteGatewayUser("short", null, SESSION_ID), null);
});

test("route rejects cross-origin, non-JSON, oversized, and invalid briefs before generation", async () => {
  let calls = 0;
  const post = createCustomSiteBlueprintPost(async () => {
    calls += 1;
    return createGuidedFallbackBlueprint(normalizedBrief(), GENERATED_AT);
  });

  const crossOrigin = await post(
    browserRequest(validBrief(), { origin: "https://attacker.example" }),
  );
  assert.equal(crossOrigin.status, 403);

  const wrongType = await post(
    browserRequest(validBrief(), { "content-type": "text/plain" }),
  );
  assert.equal(wrongType.status, 415);

  const tooLarge = await post(
    browserRequest(validBrief(), {
      "content-length": String(MAX_CUSTOM_SITE_BRIEF_BYTES + 1),
    }),
  );
  assert.equal(tooLarge.status, 413);

  const understatedLength = await post(
    browserRequest("x".repeat(MAX_CUSTOM_SITE_BRIEF_BYTES + 1), {
      "content-length": "1",
    }),
  );
  assert.equal(understatedLength.status, 413);

  const invalid = validBrief();
  invalid.unexpected = "value";
  const invalidResponse = await post(browserRequest(invalid));
  assert.equal(invalidResponse.status, 422);
  assert.equal(calls, 0);
  for (const response of [
    crossOrigin,
    wrongType,
    tooLarge,
    understatedLength,
    invalidResponse,
  ]) {
    assert.match(response.headers.get("cache-control"), /no-store/);
  }
});

test("route calls the mocked generator with only a privacy-safe identity", async () => {
  const contexts = [];
  const secret = "z".repeat(48);
  const post = createCustomSiteBlueprintPost(
    async (brief, context) => {
      contexts.push({ brief, context });
      return createGuidedFallbackBlueprint(brief, GENERATED_AT);
    },
    { CUSTOM_SITE_AI_RATE_LIMIT_SECRET: secret },
  );
  const response = await post(browserRequest(validBrief()));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.equal(contexts.length, 1);
  assert.deepEqual(contexts[0].context, {
    privacyUser: createHmac("sha256", secret)
      .update(`203.0.113.9\n${SESSION_ID}`)
      .digest("hex"),
  });
  assert.equal(JSON.stringify(contexts[0].context).includes("203.0.113.9"), false);
  const body = await response.json();
  assert.equal(body.aiUsed, false);
  assert.equal(body.blueprint.provenance.generator, "guided-fallback");
});

test("route replaces a thrown or invalid generator result with a valid fallback", async () => {
  const generators = [
    async () => {
      throw new Error("budget exhausted");
    },
    async () => ({ aiUsed: true, blueprint: { unexpected: true } }),
  ];
  for (const generator of generators) {
    const response = await createCustomSiteBlueprintPost(generator)(
      browserRequest(validBrief()),
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.aiUsed, false);
    assert.equal(body.blueprint.provenance.generator, "guided-fallback");
    assert.equal(parseCustomSiteBlueprint(body.blueprint).ok, true);
  }
});
