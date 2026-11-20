import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PATH = "/api/v1/truepresence/evaluate-interaction";
const MAX_BODY_BYTES = 2048;

function endpoint(): string | null {
  const value = process.env.TRUEPRESENCE_EVALUATION_URL;
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.pathname !== PATH ||
        parsed.username || parsed.password || parsed.search || parsed.hash) return null;
    return parsed.href;
  } catch { return null; }
}

function fail(status: number, reason: string) {
  return NextResponse.json({ ok: false, reason }, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    const url = new URL(origin);
    return url.host.toLowerCase() === host.toLowerCase() &&
      (url.protocol === "https:" || (url.protocol === "http:" && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(url.host)));
  } catch { return false; }
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid_packet");
  return value as Record<string, unknown>;
}

function onlyKeys(value: Record<string, unknown>, allowed: readonly string[]) {
  if (Object.keys(value).some(key => !allowed.includes(key))) throw new Error("unsupported_field");
}

function metric(source: Record<string, unknown>, name: string, maximum: number) {
  const value = source[name];
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > maximum)
    throw new Error("invalid_metric");
  return value;
}

function validateFeatures(raw: unknown) {
  const outer = record(raw);
  onlyKeys(outer, ["typing", "challenge"]);
  const typing = record(outer.typing);
  const challenge = record(outer.challenge);
  const typingKeys = [
    "mean_inter_key_interval_ms", "inter_key_interval_stddev_ms",
    "characters_per_minute", "correction_count", "correction_rate",
    "paste_count", "focus_to_first_input_ms", "typing_duration_ms",
    "prompt_render_to_first_input_ms"
  ];
  onlyKeys(typing, typingKeys);
  onlyKeys(challenge, ["response_latency_ms", "expected_reading_time_ms", "submitted_exactly"]);
  const numericTyping = Object.fromEntries(typingKeys.map(key => {
    const max = key === "correction_rate" ? 1 : key.endsWith("_count") ? 1000 : 3600000;
    return [key, metric(typing, key, max)];
  }).filter(([, value]) => value !== undefined));
  if (!Object.keys(numericTyping).length) throw new Error("missing_metrics");
  const exact = challenge.submitted_exactly;
  if (typeof exact !== "boolean") throw new Error("invalid_challenge");
  const responseTime = metric(challenge, "response_latency_ms", 3600000);
  const readingTime = metric(challenge, "expected_reading_time_ms", 120000);
  if (responseTime === undefined || readingTime === undefined) throw new Error("missing_challenge_metrics");
  return {
    typing: numericTyping,
    challenge: {
      challenge_type: "typing_cadence",
      response_latency_ms: responseTime,
      expected_reading_time_ms: readingTime,
      submitted_exactly: exact
    }
  };
}

export async function GET() {
  return NextResponse.json({ configured: Boolean(endpoint()) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const target = endpoint();
  if (!target) return fail(503, "not_configured");
  if (!sameOrigin(request)) return fail(403, "same_origin_required");
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return fail(415, "json_required");
  if (Number(request.headers.get("content-length") || "0") > MAX_BODY_BYTES)
    return fail(413, "body_too_large");

  let data = "";
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400, "empty_body");
    const decoder = new TextDecoder();
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) return fail(413, "body_too_large");
      data += decoder.decode(value, { stream: true });
    }
    data += decoder.decode();
    const validated = validateFeatures(JSON.parse(data));
    const sessionId = "prism_" + randomUUID();
    const tenantId = process.env.TRUEPRESENCE_TENANT_ID || "default";
    const body = {
      session_id: sessionId,
      tenant_id: tenantId,
      enforcement_mode: "observe",
      feature_packet: {
        surface: "web",
        site_id: "bageltech-prism",
        tenant_id: tenantId,
        session_id: sessionId,
        ...validated
      }
    };
    const upstream = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      signal: AbortSignal.timeout(7000)
    });
    if (!upstream.ok) return fail(502, "service_unavailable");
    const answer = await upstream.json() as Record<string, unknown>;
    const action = typeof answer.recommended_action === "string" ? answer.recommended_action : "observe";
    if (!["allow", "observe", "soft_challenge", "step_up_auth", "manual_review"].includes(action))
      return fail(502, "invalid_service_response");
    return NextResponse.json({
      ok: true,
      observed: true,
      // Signals are for session-authenticity research only, never PRISM scoring.
      recommended_action: action,
      note: "Observational interaction signal only, not evidence of honesty or comprehension."
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError || (error instanceof Error && /^(invalid_|unsupported_|missing_)/.test(error.message)))
      return fail(400, "invalid_feature_packet");
    return fail(502, "service_unavailable");
  }
}
