import {
  MAX_ONBOARDING_BODY_BYTES,
  createForwardSignature,
  deriveSourceRateLimitKey,
  parseOnboardingRequest,
} from "@/lib/onboarding/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECEIPT_MESSAGE =
  "Request received. This confirms receipt only; your site is not live yet.";
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};
const FORWARD_TIMEOUT_MS = 8_000;
const MAX_DOWNSTREAM_RESPONSE_BYTES = 8 * 1024;

function jsonResponse(
  body: unknown,
  status: number,
  additionalHeaders?: HeadersInit,
) {
  return Response.json(body, {
    status,
    headers: {
      ...RESPONSE_HEADERS,
      ...additionalHeaders,
    },
  });
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    if (new URL(origin).origin !== new URL(request.url).origin) return false;
  } catch {
    return false;
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

function parseContentLength(value: string | null) {
  if (value === null) return null;
  if (!/^\d+$/.test(value)) return undefined;
  const length = Number(value);
  return Number.isSafeInteger(length) ? length : undefined;
}

function resolveForwardConfiguration() {
  const rawUrl = process.env.CONTRACTOR_PLATFORM_INTAKE_URL?.trim();
  const keyId = process.env.CONTRACTOR_PLATFORM_INTAKE_KEY_ID?.trim();
  const secret = process.env.CONTRACTOR_PLATFORM_INTAKE_SECRET;

  if (
    !rawUrl ||
    !keyId ||
    !secret ||
    secret.length < 32 ||
    !/^[A-Za-z0-9._-]{1,80}$/.test(keyId)
  ) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const isLocalDevelopmentUrl =
    process.env.NODE_ENV !== "production" &&
    url.protocol === "http:" &&
    ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !isLocalDevelopmentUrl) ||
    url.username ||
    url.password ||
    url.hash
  ) {
    return null;
  }

  return { url: url.toString(), keyId, secret };
}

function normalizeRetryAfter(value: string | null) {
  if (!value || !/^\d{1,6}$/.test(value)) return null;
  const seconds = Number(value);
  return Number.isInteger(seconds) && seconds >= 1 && seconds <= 86_400
    ? seconds
    : null;
}

async function readReceiptCode(
  response: Response,
  expectedRequestId: string,
) {
  const contentLength = parseContentLength(
    response.headers.get("content-length"),
  );
  if (
    contentLength === undefined ||
    (contentLength !== null &&
      contentLength > MAX_DOWNSTREAM_RESPONSE_BYTES)
  ) {
    return null;
  }

  let rawBody: string;
  try {
    rawBody = await response.text();
  } catch {
    return null;
  }
  if (
    new TextEncoder().encode(rawBody).byteLength >
    MAX_DOWNSTREAM_RESPONSE_BYTES
  ) {
    return null;
  }

  try {
    const body: unknown = JSON.parse(rawBody);
    if (
      typeof body === "object" &&
      body !== null &&
      "accepted" in body &&
      body.accepted === true &&
      "requestId" in body &&
      body.requestId === expectedRequestId &&
      "status" in body &&
      body.status === "received" &&
      "receiptCode" in body &&
      typeof body.receiptCode === "string" &&
      /^BT-[A-F0-9]{20}$/.test(body.receiptCode)
    ) {
      return body.receiptCode;
    }
  } catch {
    // A receipt code is optional; the source request ID remains the fallback.
  }

  return null;
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return jsonResponse(
      { ok: false, error: "This request must come from this website." },
      403,
    );
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return jsonResponse(
      { ok: false, error: "Content-Type must be application/json." },
      415,
    );
  }

  const contentLength = parseContentLength(
    request.headers.get("content-length"),
  );
  if (contentLength === undefined) {
    return jsonResponse(
      { ok: false, error: "Content-Length is invalid." },
      400,
    );
  }
  if (contentLength !== null && contentLength > MAX_ONBOARDING_BODY_BYTES) {
    return jsonResponse(
      { ok: false, error: "Request body is too large." },
      413,
    );
  }

  let rawRequestBody: string;
  try {
    rawRequestBody = await request.text();
  } catch {
    return jsonResponse(
      { ok: false, error: "Request body could not be read." },
      400,
    );
  }
  if (
    new TextEncoder().encode(rawRequestBody).byteLength >
    MAX_ONBOARDING_BODY_BYTES
  ) {
    return jsonResponse(
      { ok: false, error: "Request body is too large." },
      413,
    );
  }

  let input: unknown;
  try {
    input = JSON.parse(rawRequestBody);
  } catch {
    return jsonResponse(
      { ok: false, error: "Request body must be valid JSON." },
      400,
    );
  }

  const parsed = parseOnboardingRequest(input);
  if (parsed.ok && parsed.trapped) {
    return jsonResponse(
      { ok: true, status: "received", message: RECEIPT_MESSAGE },
      202,
    );
  }
  if (!parsed.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "Please correct the onboarding request.",
        details: parsed.errors,
      },
      422,
    );
  }

  const configuration = resolveForwardConfiguration();
  if (!configuration) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Online onboarding is not configured. Your request was not sent.",
      },
      503,
    );
  }

  const value = parsed.value;
  const receivedAt = new Date().toISOString();
  const forwardedFor =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip");
  const sourceRateLimitKey = await deriveSourceRateLimitKey(
    configuration.secret,
    forwardedFor,
    value.ownerEmail,
  );
  const signedBody = {
    sourceRequestId: value.sourceRequestId,
    sourceRateLimitKey,
    source: "bageltech.net" as const,
    receivedAt,
    deploymentProfile: "dedicated" as const,
    shortName: value.shortName,
    phoneE164: value.phoneE164,
    organizationSlug: value.organizationSlug,
    organizationInitials: value.organizationInitials,
    documentPrefix: value.documentPrefix,
    contractVersion: value.contractVersion,
    template: {
      id: value.templateId,
      catalogVersion: value.catalogVersion,
    },
    company: {
      displayName: value.displayName,
      legalName: value.legalName,
      phoneDisplay: value.phoneDisplay,
      publicEmail: value.publicEmail,
    },
    owner: {
      name: value.ownerName,
      email: value.ownerEmail,
    },
    serviceArea: {
      label: value.serviceAreaLabel,
      region: value.stateRegion,
    },
    services: value.services,
    brand: {
      primaryColor: value.primaryColor,
      accentColor: value.accentColor,
    },
    domain: {
      mode: value.domainChoice,
      requestedHostname: value.requestedHostname,
    },
    launchGoal: value.launchGoal,
    consent: {
      termsVersion: value.termsVersion,
      privacyVersion: value.privacyVersion,
      accepted: value.termsAccepted,
      acceptedAt: value.consentAcceptedAt,
    },
    ...(value.siteBlueprint
      ? { siteBlueprint: value.siteBlueprint }
      : {}),
    companyWebsite: "",
  };
  const rawBody = JSON.stringify(signedBody);
  const timestamp = Math.floor(Date.now() / 1_000).toString();
  const signature = await createForwardSignature(
    configuration.secret,
    timestamp,
    value.sourceRequestId,
    rawBody,
  );

  let downstreamResponse: Response;
  try {
    downstreamResponse = await fetch(configuration.url, {
      method: "POST",
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Idempotency-Key": value.sourceRequestId,
        "X-BagelTech-Key-Id": configuration.keyId,
        "X-BagelTech-Timestamp": timestamp,
        "X-BagelTech-Signature": signature,
      },
      body: rawBody,
    });
  } catch {
    return jsonResponse(
      {
        ok: false,
        error:
          "The onboarding service could not be reached. Your request was not received.",
      },
      502,
    );
  }

  if (!downstreamResponse.ok) {
    if (downstreamResponse.status === 429) {
      const retryAfterSeconds = normalizeRetryAfter(
        downstreamResponse.headers.get("retry-after"),
      );
      return jsonResponse(
        {
          ok: false,
          error:
            "Too many onboarding requests were submitted. Please wait and try again.",
          ...(retryAfterSeconds === null ? {} : { retryAfterSeconds }),
        },
        429,
        retryAfterSeconds === null
          ? undefined
          : { "Retry-After": retryAfterSeconds.toString() },
      );
    }

    return jsonResponse(
      {
        ok: false,
        error:
          "The onboarding service did not accept the request. Your request was not received.",
      },
      502,
    );
  }

  const receiptId =
    (await readReceiptCode(downstreamResponse, value.sourceRequestId)) ??
    value.sourceRequestId;
  return jsonResponse(
    {
      ok: true,
      status: "received",
      receiptId,
      sourceRequestId: value.sourceRequestId,
      message: RECEIPT_MESSAGE,
    },
    202,
  );
}
