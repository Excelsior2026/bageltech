import type { PrismItem } from "./items";

export type PrismResponse = {
  choice: number | null;
  confidence: number;
  explanation: string;
};

const DOMAINS = [
  { id: "context", label: "Contextual inference" },
  { id: "social-intent", label: "Social intention" },
  { id: "uncertainty", label: "Uncertainty recognition" },
] as const;

export function scorePrism12(items: readonly PrismItem[], responses: readonly PrismResponse[]) {
  if (items.length !== 12 || responses.length !== items.length) {
    throw new RangeError("PRISM-12 scoring requires exactly twelve items and responses");
  }
  const keys = new Set(items.map((item) => item.id));
  if (keys.size !== items.length) throw new Error("Duplicated PRISM item ID");
  for (const response of responses) {
    if (
      response.choice !== null &&
      response.choice !== -1 &&
      (!Number.isInteger(response.choice) || response.choice < 0 || response.choice > 3)
    ) throw new RangeError("Invalid response option");
    if (!Number.isInteger(response.confidence) || response.confidence < 1 || response.confidence > 5) {
      throw new RangeError("Invalid confidence rating");
    }
  }

  const correct = items.reduce(
    (sum, item, idx) => sum + Number(responses[idx].choice === item.correct), 0
  );
  const skipped = responses.filter((response) => response.choice === -1).length;
  const unanswered = responses.filter((response) => response.choice === null).length;
  const answered = items.length - skipped - unanswered;
  const ratings = responses.filter((response) => response.choice !== null && response.choice !== -1);
  const confidence = ratings.length
    ? ratings.reduce((sum, response) => sum + response.confidence, 0) / ratings.length
    : null;

  const domains = DOMAINS.map((category) => {
    const indices = items.map((item, idx) => item.domain === category.id ? idx : -1)
      .filter((idx) => idx !== -1);
    return {
      id: category.id,
      label: category.label,
      total: indices.length,
      correct: indices.filter((idx) => responses[idx].choice === items[idx].correct).length,
      skipped: indices.filter((idx) => responses[idx].choice === -1).length,
    };
  });

  return {
    correct,
    total: items.length,
    answered,
    skipped,
    unanswered,
    confidence,
    domains,
  };
}
