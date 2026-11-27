/**
 * Strict, content-free TruePresence data contract for the optional PRISM
 * interaction check. This module must never accept test answers, typed
 * text, participant identity, PRISM scores, question IDs, or raw events.
 */
const TYPING_LIMITS = {
  mean_inter_key_interval_ms: 120000,
  inter_key_interval_stddev_ms: 120000,
  characters_per_minute: 20000,
  correction_count: 1000,
  correction_rate: 1,
  paste_count: 1000,
  focus_to_first_input_ms: 3600000,
  typing_duration_ms: 3600000,
  prompt_render_to_first_input_ms: 3600000,
} as const;

const INTEGER_METRICS = new Set<string>(["correction_count", "paste_count"]);

type SafeTyping = Partial<Record<keyof typeof TYPING_LIMITS, number>>;
export type SafeTruePresenceFeatures = {
  typing: SafeTyping;
  challenge: {
    challenge_type: "typing_cadence";
    response_latency_ms: number;
    expected_reading_time_ms: number;
    submitted_exactly: boolean;
  };
};

function record(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("invalid_packet");
  }
  return value as Record<string, unknown>;
}

function allowedOnly(value: Record<string, unknown>, keys: readonly string[]): void {
  if (Object.keys(value).some((key) => !keys.includes(key))) {
    throw new TypeError("unsupported_field");
  }
}

function nonnegativeNumber(
  value: unknown,
  maximum: number,
  integer = false
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > maximum ||
    (integer && !Number.isInteger(value))
  ) {
    throw new TypeError("invalid_metric");
  }
  return value;
}

export function validateTruePresenceFeatures(raw: unknown): SafeTruePresenceFeatures {
  const packet = record(raw);
  allowedOnly(packet, ["typing", "challenge"]);
  const typing = record(packet.typing);
  const challenge = record(packet.challenge);
  allowedOnly(typing, Object.keys(TYPING_LIMITS));
  allowedOnly(challenge, [
    "response_latency_ms",
    "expected_reading_time_ms",
    "submitted_exactly",
  ]);

  const cleanTyping: SafeTyping = {};
  for (const key of Object.keys(TYPING_LIMITS) as Array<keyof typeof TYPING_LIMITS>) {
    const supplied = typing[key];
    if (supplied === undefined) continue;
    cleanTyping[key] = nonnegativeNumber(
      supplied,
      TYPING_LIMITS[key],
      INTEGER_METRICS.has(key)
    );
  }
  if (!Object.keys(cleanTyping).length) throw new TypeError("missing_metrics");

  if (typeof challenge.submitted_exactly !== "boolean") {
    throw new TypeError("invalid_challenge");
  }

  return {
    typing: cleanTyping,
    challenge: {
      challenge_type: "typing_cadence",
      response_latency_ms: nonnegativeNumber(challenge.response_latency_ms, 3600000),
      expected_reading_time_ms: nonnegativeNumber(challenge.expected_reading_time_ms, 120000),
      submitted_exactly: challenge.submitted_exactly,
    },
  };
}
