import {
  MAX_CUSTOM_SITE_BRIEF_BYTES,
  type CustomSiteBlueprintResult,
  type CustomSiteBrief,
  deriveCustomSiteGatewayUser,
  parseCustomSiteBlueprintResult,
  parseCustomSiteBrief,
} from "../../../lib/custom-site/contract.ts";
import {
  createGuidedFallbackBlueprint,
  generateCustomSiteBlueprint,
  type CustomSiteGenerationContext,
} from "../../../lib/custom-site/generator.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

export type CustomSiteBlueprintGenerator = (
  brief: CustomSiteBrief,
  context: CustomSiteGenerationContext,
) => Promise<CustomSiteBlueprintResult>;

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, { status, headers: RESPONSE_HEADERS });
}

function isSameOriginBrowserRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return false;
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
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

async function readBoundedUtf8Body(request: Request, maxBytes: number) {
  if (!request.body) return { ok: true as const, value: "" };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false as const, tooLarge: true as const };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false as const, tooLarge: false as const };
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return {
      ok: true as const,
      value: new TextDecoder("utf-8", { fatal: true }).decode(body),
    };
  } catch {
    return { ok: false as const, tooLarge: false as const };
  }
}

export function createCustomSiteBlueprintPost(
  generator: CustomSiteBlueprintGenerator = generateCustomSiteBlueprint,
  environment: NodeJS.ProcessEnv = process.env,
) {
  return async function post(request: Request) {
    if (!isSameOriginBrowserRequest(request)) {
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
    if (
      contentLength !== null &&
      contentLength > MAX_CUSTOM_SITE_BRIEF_BYTES
    ) {
      return jsonResponse(
        { ok: false, error: "Request body is too large." },
        413,
      );
    }

    const bodyResult = await readBoundedUtf8Body(
      request,
      MAX_CUSTOM_SITE_BRIEF_BYTES,
    );
    if (!bodyResult.ok) {
      return jsonResponse(
        {
          ok: false,
          error: bodyResult.tooLarge
            ? "Request body is too large."
            : "Request body could not be read.",
        },
        bodyResult.tooLarge ? 413 : 400,
      );
    }
    const rawBody = bodyResult.value;

    let input: unknown;
    try {
      input = JSON.parse(rawBody);
    } catch {
      return jsonResponse(
        { ok: false, error: "Request body must be valid JSON." },
        400,
      );
    }

    const parsedBrief = parseCustomSiteBrief(input);
    if (!parsedBrief.ok) {
      return jsonResponse(
        {
          ok: false,
          error: "Please correct the custom-site brief.",
          details: parsedBrief.errors,
        },
        422,
      );
    }

    const secret = environment.CUSTOM_SITE_AI_RATE_LIMIT_SECRET ?? "";
    const forwardedFor =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip");
    const privacyUser = deriveCustomSiteGatewayUser(
      secret,
      forwardedFor,
      parsedBrief.value.sessionId,
    );

    let result: CustomSiteBlueprintResult;
    try {
      const candidate = await generator(parsedBrief.value, { privacyUser });
      const parsedResult = parseCustomSiteBlueprintResult(candidate);
      result = parsedResult.ok
        ? parsedResult.value
        : createGuidedFallbackBlueprint(parsedBrief.value);
    } catch {
      result = createGuidedFallbackBlueprint(parsedBrief.value);
    }

    return jsonResponse(result, 200);
  };
}

export const POST = createCustomSiteBlueprintPost();
