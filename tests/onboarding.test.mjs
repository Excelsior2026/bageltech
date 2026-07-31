import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import test from "node:test";

import {
  DOMAIN_MODES,
  MAX_ONBOARDING_BODY_BYTES,
  ONBOARDING_CONTRACT_VERSION,
  PRIVACY_VERSION,
  SERVICE_KEYS,
  TEMPLATE_CATALOG_VERSION,
  TEMPLATE_IDS,
  TERMS_VERSION,
  createForwardSignature,
  deriveOrganizationIdentity,
  deriveSourceRateLimitKey,
  normalizeFirstForwardedIp,
  parseOnboardingRequest,
} from "../src/lib/onboarding/schema.ts";

const validRequest = () => ({
  sourceRequestId: "6F6A85C0-468C-4BC3-8C1D-24F689597461",
  contractVersion: 1,
  template: {
    id: "modern-grid",
    catalogVersion: 1,
  },
  company: {
    displayName: "  Northline   Electric  ",
    legalName: " Northline Electric LLC ",
    phoneDisplay: " (619) 555-0184 ",
    publicEmail: " HELLO@Northline.Example ",
  },
  owner: {
    name: " Morgan Reyes ",
    email: " OWNER@Northline.Example ",
  },
  serviceArea: {
    label: " San Diego County ",
    region: " California ",
  },
  services: ["residential", "panels-power"],
  brand: {
    primaryColor: "#0a2b4c",
    accentColor: "#f5a623",
  },
  domain: {
    mode: "platform-subdomain",
    requestedHostname: "Northline-Electric.Contractors.BagelTech.net.",
  },
  launchGoal: " Launch a dependable customer intake experience. ",
  consent: {
    termsVersion: "contractor-platform-onboarding-v1",
    privacyVersion: "contractor-platform-privacy-v1",
    accepted: true,
    acceptedAt: "2026-07-30T12:34:56-07:00",
  },
  companyWebsite: "",
});

test("locks the v1 onboarding catalog and request size", () => {
  assert.equal(ONBOARDING_CONTRACT_VERSION, 1);
  assert.equal(TEMPLATE_CATALOG_VERSION, 1);
  assert.equal(MAX_ONBOARDING_BODY_BYTES, 32 * 1024);
  assert.deepEqual(TEMPLATE_IDS, [
    "heritage-craft",
    "modern-grid",
    "neighborly-warm",
    "industrial-pro",
    "premium-home",
    "direct-response",
  ]);
  assert.deepEqual(SERVICE_KEYS, [
    "residential",
    "lighting",
    "panels-power",
    "commercial",
    "ev-generators",
    "emergency",
  ]);
  assert.deepEqual(DOMAIN_MODES, [
    "platform-subdomain",
    "custom-domain",
    "decide-later",
  ]);
});

test("strictly parses and normalizes a valid browser request", () => {
  const result = parseOnboardingRequest(validRequest());
  assert.equal(result.ok, true);
  assert.equal(result.trapped, false);
  if (!result.ok || result.trapped) return;

  assert.deepEqual(result.value, {
    sourceRequestId: "6f6a85c0-468c-4bc3-8c1d-24f689597461",
    contractVersion: 1,
    catalogVersion: 1,
    templateId: "modern-grid",
    displayName: "Northline Electric",
    shortName: "Northline Electric",
    legalName: "Northline Electric LLC",
    phoneDisplay: "(619) 555-0184",
    phoneE164: "+16195550184",
    publicEmail: "hello@northline.example",
    ownerName: "Morgan Reyes",
    ownerEmail: "owner@northline.example",
    serviceAreaLabel: "San Diego County",
    stateRegion: "California",
    services: ["residential", "panels-power"],
    primaryColor: "#0A2B4C",
    accentColor: "#F5A623",
    domainChoice: "platform-subdomain",
    requestedHostname: "northline-electric.contractors.bageltech.net",
    launchGoal: "Launch a dependable customer intake experience.",
    organizationSlug: "northline-electric",
    organizationInitials: "NE",
    documentPrefix: "NE-",
    termsAccepted: true,
    termsVersion: TERMS_VERSION,
    privacyVersion: PRIVACY_VERSION,
    consentAcceptedAt: "2026-07-30T19:34:56.000Z",
  });
});

test("silently traps a populated honeypot before validating personal data", () => {
  assert.deepEqual(
    parseOnboardingRequest({
      owner: { email: "not-valid" },
      companyWebsite: "https://spam.example",
    }),
    { ok: true, trapped: true },
  );
});

test("rejects unsupported values, extra properties, and contract drift", () => {
  const cases = [
    {
      mutate: (body) => {
        body.template.id = "unregistered-template";
      },
      error: "template.id is not supported.",
    },
    {
      mutate: (body) => {
        body.services = ["residential", "plumbing"];
      },
      error: "services contains an unsupported or duplicate service key.",
    },
    {
      mutate: (body) => {
        body.debug = true;
      },
      error: "request.debug is not allowed.",
    },
    {
      mutate: (body) => {
        body.consent.accepted = false;
      },
      error: "consent.accepted must be true.",
    },
    {
      mutate: (body) => {
        body.domain.requestedHostname = "northline.example";
      },
      error:
        "domain.requestedHostname must use a bageltech.net subdomain.",
    },
    {
      mutate: (body) => {
        body.domain.requestedHostname = "somebody-else.contractors.bageltech.net";
      },
      error:
        "domain.requestedHostname must match the derived BagelTech platform hostname.",
    },
    {
      mutate: (body) => {
        delete body.companyWebsite;
      },
      error: "companyWebsite must be empty.",
    },
  ];

  for (const { mutate, error } of cases) {
    const body = validRequest();
    mutate(body);
    const result = parseOnboardingRequest(body);
    assert.equal(result.ok, false, error);
    if (result.ok) continue;
    assert.ok(result.errors.includes(error), JSON.stringify(result.errors));
  }
});

test("derives deterministic provisioning identifiers", () => {
  assert.deepEqual(deriveOrganizationIdentity("Élite Power & Light"), {
    organizationSlug: "elite-power-light",
    organizationInitials: "EPL",
    documentPrefix: "EPL-",
  });
  assert.deepEqual(deriveOrganizationIdentity("Q"), {
    organizationSlug: "q",
    organizationInitials: "Q",
    documentPrefix: "Q-",
  });
  assert.deepEqual(deriveOrganizationIdentity("電気"), {
    organizationSlug: "contractor-8f9d57f7",
    organizationInitials: "EC",
    documentPrefix: "EC-",
  });
});

test("signs the exact raw downstream body contract", async () => {
  const secret = "a".repeat(64);
  const timestamp = "1785446400";
  const idempotencyKey = "6f6a85c0-468c-4bc3-8c1d-24f689597461";
  const rawBody =
    '{"sourceRequestId":"6f6a85c0-468c-4bc3-8c1d-24f689597461","source":"bageltech.net"}';
  const bodyHash = createHash("sha256").update(rawBody).digest("hex");
  const canonical = `${timestamp}.${idempotencyKey}.${bodyHash}`;
  const expected = `v1=${createHmac("sha256", secret)
    .update(canonical)
    .digest("hex")}`;

  assert.equal(
    await createForwardSignature(
      secret,
      timestamp,
      idempotencyKey,
      rawBody,
    ),
    expected,
  );
});

test("derives a stable privacy-safe source rate-limit key", async () => {
  const secret = "b".repeat(64);
  const forwarded = " 203.0.113.9, 10.0.0.1 ";
  const expected = createHmac("sha256", secret)
    .update("203.0.113.9\nowner@example.com")
    .digest("hex");
  const actual = await deriveSourceRateLimitKey(
    secret,
    forwarded,
    " OWNER@Example.COM ",
  );

  assert.equal(normalizeFirstForwardedIp(forwarded), "203.0.113.9");
  assert.equal(actual, expected);
  assert.match(actual, /^[0-9a-f]{64}$/);
  assert.equal(actual.includes("203.0.113.9"), false);
  assert.equal(
    actual,
    await deriveSourceRateLimitKey(
      secret,
      "203.0.113.9",
      "owner@example.com",
    ),
  );
  assert.notEqual(
    actual,
    await deriveSourceRateLimitKey(
      secret,
      "203.0.113.10",
      "owner@example.com",
    ),
  );
});
