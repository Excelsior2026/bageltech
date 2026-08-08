import { createHash, createHmac } from "node:crypto";

export const CUSTOM_SITE_BLUEPRINT_VERSION = 1 as const;
export const FIELD_INTEGRATION_VERSION = 1 as const;
export const CUSTOM_SITE_PROMPT_VERSION =
  "contractor-site-blueprint-v1" as const;
export const MAX_CUSTOM_SITE_BRIEF_BYTES = 12 * 1024;

export const CUSTOM_SITE_SERVICE_KEYS = [
  "residential",
  "lighting",
  "panels-power",
  "commercial",
  "ev-generators",
  "emergency",
] as const;

export const CUSTOM_SITE_AUDIENCES = [
  "homeowners",
  "commercial",
  "mixed",
] as const;

export const CUSTOM_SITE_TONES = [
  "established",
  "modern",
  "neighborly",
  "premium",
  "direct",
] as const;

export const CUSTOM_SITE_CONVERSION_GOALS = [
  "request",
  "call",
  "balanced",
] as const;

export const CUSTOM_SITE_COMPOSITIONS = [
  "editorial-split",
  "precision-grid",
  "immersive-service",
  "conversion-stack",
] as const;

export const CUSTOM_SITE_DENSITIES = [
  "airy",
  "balanced",
  "compact",
] as const;

export const CUSTOM_SITE_HEADING_STYLES = [
  "editorial",
  "geometric",
  "humanist",
  "condensed",
] as const;

export const CUSTOM_SITE_CORNER_STYLES = [
  "square",
  "soft",
  "rounded",
] as const;

export const CUSTOM_SITE_REQUIRED_BINDINGS = [
  "organization-configuration",
  "deterministic-safety-triage",
  "service-request-v1",
  "private-photo-uploads",
  "customer-document-links",
  "staff-workspace",
] as const;

export type CustomSiteServiceKey =
  (typeof CUSTOM_SITE_SERVICE_KEYS)[number];
export type CustomSiteAudience = (typeof CUSTOM_SITE_AUDIENCES)[number];
export type CustomSiteTone = (typeof CUSTOM_SITE_TONES)[number];
export type CustomSiteConversionGoal =
  (typeof CUSTOM_SITE_CONVERSION_GOALS)[number];
export type CustomSiteComposition =
  (typeof CUSTOM_SITE_COMPOSITIONS)[number];
export type CustomSiteDensity = (typeof CUSTOM_SITE_DENSITIES)[number];
export type CustomSiteHeadingStyle =
  (typeof CUSTOM_SITE_HEADING_STYLES)[number];
export type CustomSiteCornerStyle =
  (typeof CUSTOM_SITE_CORNER_STYLES)[number];

export interface CustomSiteBrief {
  sessionId: string;
  companyName: string;
  serviceArea: string;
  services: CustomSiteServiceKey[];
  primaryColor: string;
  accentColor: string;
  audience: CustomSiteAudience;
  tone: CustomSiteTone;
  conversionGoal: CustomSiteConversionGoal;
  companyStory: string | null;
  differentiators: string | null;
  projectFocus: string | null;
  wordsToAvoid: string | null;
}

export interface CustomSiteProcessStep {
  title: string;
  body: string;
}

export interface CustomSiteBlueprintContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  servicesTitle: string;
  servicesLead: string;
  aboutTitle: string;
  aboutBody: string;
  processTitle: string;
  processSteps: [
    CustomSiteProcessStep,
    CustomSiteProcessStep,
    CustomSiteProcessStep,
  ];
  serviceAreaTitle: string;
  serviceAreaLead: string;
  requestTitle: string;
  requestLead: string;
}

export interface CustomSiteBlueprint {
  blueprintVersion: typeof CUSTOM_SITE_BLUEPRINT_VERSION;
  fieldIntegrationVersion: typeof FIELD_INTEGRATION_VERSION;
  design: {
    composition: CustomSiteComposition;
    tone: CustomSiteTone;
    density: CustomSiteDensity;
    headingStyle: CustomSiteHeadingStyle;
    cornerStyle: CustomSiteCornerStyle;
    primaryColor: string;
    accentColor: string;
    surfaceColor: string;
  };
  content: CustomSiteBlueprintContent;
  conversionGoal: CustomSiteConversionGoal;
  integration: {
    requiredBindings: typeof CUSTOM_SITE_REQUIRED_BINDINGS;
  };
  provenance: {
    generator: "ai-gateway" | "guided-fallback";
    modelId: string | null;
    promptVersion: typeof CUSTOM_SITE_PROMPT_VERSION;
    generatedAt: string;
    briefHash: string;
  };
}

export interface CustomSiteBlueprintResult {
  aiUsed: boolean;
  blueprint: CustomSiteBlueprint;
}

export interface CustomSiteAiDraft {
  design: {
    composition: CustomSiteComposition;
    density: CustomSiteDensity;
    headingStyle: CustomSiteHeadingStyle;
    cornerStyle: CustomSiteCornerStyle;
  };
  content: CustomSiteBlueprintContent;
}

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

const BRIEF_KEYS = new Set([
  "sessionId",
  "companyName",
  "serviceArea",
  "services",
  "primaryColor",
  "accentColor",
  "audience",
  "tone",
  "conversionGoal",
  "companyStory",
  "differentiators",
  "projectFocus",
  "wordsToAvoid",
]);
const RESULT_KEYS = new Set(["aiUsed", "blueprint"]);
const BLUEPRINT_KEYS = new Set([
  "blueprintVersion",
  "fieldIntegrationVersion",
  "design",
  "content",
  "conversionGoal",
  "integration",
  "provenance",
]);
const DESIGN_KEYS = new Set([
  "composition",
  "tone",
  "density",
  "headingStyle",
  "cornerStyle",
  "primaryColor",
  "accentColor",
  "surfaceColor",
]);
const AI_DESIGN_KEYS = new Set([
  "composition",
  "density",
  "headingStyle",
  "cornerStyle",
]);
const CONTENT_KEYS = new Set([
  "eyebrow",
  "headline",
  "subheadline",
  "servicesTitle",
  "servicesLead",
  "aboutTitle",
  "aboutBody",
  "processTitle",
  "processSteps",
  "serviceAreaTitle",
  "serviceAreaLead",
  "requestTitle",
  "requestLead",
]);
const PROCESS_STEP_KEYS = new Set(["title", "body"]);
const INTEGRATION_KEYS = new Set(["requiredBindings"]);
const PROVENANCE_KEYS = new Set([
  "generator",
  "modelId",
  "promptVersion",
  "generatedAt",
  "briefHash",
]);
const AI_DRAFT_KEYS = new Set(["design", "content"]);

const SERVICE_SET = new Set<string>(CUSTOM_SITE_SERVICE_KEYS);
const AUDIENCE_SET = new Set<string>(CUSTOM_SITE_AUDIENCES);
const TONE_SET = new Set<string>(CUSTOM_SITE_TONES);
const CONVERSION_GOAL_SET = new Set<string>(CUSTOM_SITE_CONVERSION_GOALS);
const COMPOSITION_SET = new Set<string>(CUSTOM_SITE_COMPOSITIONS);
const DENSITY_SET = new Set<string>(CUSTOM_SITE_DENSITIES);
const HEADING_STYLE_SET = new Set<string>(CUSTOM_SITE_HEADING_STYLES);
const CORNER_STYLE_SET = new Set<string>(CUSTOM_SITE_CORNER_STYLES);

const COPY_LIMITS = {
  eyebrow: 80,
  headline: 120,
  subheadline: 260,
  servicesTitle: 100,
  servicesLead: 260,
  aboutTitle: 100,
  aboutBody: 500,
  processTitle: 100,
  serviceAreaTitle: 100,
  serviceAreaLead: 260,
  requestTitle: 100,
  requestLead: 260,
} as const;

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const HEX_HASH_PATTERN = /^[0-9a-f]{64}$/;
const CONTROL_CHARACTER_PATTERN =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function rejectUnknownKeys(
  value: Record<string, unknown>,
  allowed: Set<string>,
  path: string,
  errors: string[],
) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) errors.push(`${path}.${key} is not allowed.`);
  }
}

function requireExactKeys(
  value: Record<string, unknown>,
  allowed: Set<string>,
  path: string,
  errors: string[],
) {
  rejectUnknownKeys(value, allowed, path, errors);
  for (const key of allowed) {
    if (!Object.hasOwn(value, key)) errors.push(`${path}.${key} is required.`);
  }
}

function readObject(
  value: unknown,
  keys: Set<string>,
  path: string,
  errors: string[],
) {
  if (!isRecord(value)) {
    errors.push(`${path} must be an object.`);
    return undefined;
  }
  requireExactKeys(value, keys, path, errors);
  return value;
}

function normalizePlainText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function containsUnsafeMarkupOrControls(value: string) {
  return (
    CONTROL_CHARACTER_PATTERN.test(value) ||
    value.includes("<") ||
    value.includes(">") ||
    /(?:java|vb)script\s*:/i.test(value)
  );
}

function readPlainText(
  value: unknown,
  path: string,
  errors: string[],
  min: number,
  max: number,
) {
  if (typeof value !== "string") {
    errors.push(`${path} must be a string.`);
    return undefined;
  }
  const normalized = normalizePlainText(value);
  if (
    normalized.length < min ||
    normalized.length > max ||
    containsUnsafeMarkupOrControls(normalized)
  ) {
    errors.push(
      `${path} must be plain text between ${min} and ${max} characters.`,
    );
    return undefined;
  }
  return normalized;
}

function readNullablePlainText(
  value: unknown,
  path: string,
  errors: string[],
  max: number,
) {
  if (value === null) return null;
  if (typeof value !== "string") {
    errors.push(`${path} must be a string or null.`);
    return undefined;
  }
  const normalized = normalizePlainText(value);
  if (!normalized) return null;
  if (
    normalized.length > max ||
    containsUnsafeMarkupOrControls(normalized)
  ) {
    errors.push(`${path} must be plain text no longer than ${max} characters.`);
    return undefined;
  }
  return normalized;
}

function readEnum<T extends string>(
  value: unknown,
  allowed: Set<string>,
  path: string,
  errors: string[],
) {
  if (typeof value !== "string" || !allowed.has(value)) {
    errors.push(`${path} is not supported.`);
    return undefined;
  }
  return value as T;
}

function readColor(value: unknown, path: string, errors: string[]) {
  if (typeof value !== "string" || !HEX_COLOR_PATTERN.test(value.trim())) {
    errors.push(`${path} must be a six-digit hexadecimal color.`);
    return undefined;
  }
  return value.trim().toUpperCase();
}

function readContent(
  value: unknown,
  path: string,
  errors: string[],
): CustomSiteBlueprintContent | undefined {
  const content = readObject(value, CONTENT_KEYS, path, errors);
  if (!content) return undefined;

  const fields = {} as Record<keyof typeof COPY_LIMITS, string | undefined>;
  for (const [key, max] of Object.entries(COPY_LIMITS) as Array<
    [keyof typeof COPY_LIMITS, number]
  >) {
    fields[key] = readPlainText(content[key], `${path}.${key}`, errors, 1, max);
  }

  const rawSteps = content.processSteps;
  const steps: CustomSiteProcessStep[] = [];
  if (!Array.isArray(rawSteps) || rawSteps.length !== 3) {
    errors.push(`${path}.processSteps must contain exactly three steps.`);
  } else {
    rawSteps.forEach((rawStep, index) => {
      const step = readObject(
        rawStep,
        PROCESS_STEP_KEYS,
        `${path}.processSteps[${index}]`,
        errors,
      );
      if (!step) return;
      const title = readPlainText(
        step.title,
        `${path}.processSteps[${index}].title`,
        errors,
        1,
        80,
      );
      const body = readPlainText(
        step.body,
        `${path}.processSteps[${index}].body`,
        errors,
        1,
        180,
      );
      if (title && body) steps.push({ title, body });
    });
  }

  if (
    Object.values(fields).some((field) => field === undefined) ||
    steps.length !== 3
  ) {
    return undefined;
  }

  return {
    eyebrow: fields.eyebrow!,
    headline: fields.headline!,
    subheadline: fields.subheadline!,
    servicesTitle: fields.servicesTitle!,
    servicesLead: fields.servicesLead!,
    aboutTitle: fields.aboutTitle!,
    aboutBody: fields.aboutBody!,
    processTitle: fields.processTitle!,
    processSteps: [steps[0], steps[1], steps[2]],
    serviceAreaTitle: fields.serviceAreaTitle!,
    serviceAreaLead: fields.serviceAreaLead!,
    requestTitle: fields.requestTitle!,
    requestLead: fields.requestLead!,
  };
}

export function parseCustomSiteBrief(value: unknown): ParseResult<CustomSiteBrief> {
  const errors: string[] = [];
  const brief = readObject(value, BRIEF_KEYS, "request", errors);
  if (!brief) return { ok: false, errors };

  let sessionId: string | undefined;
  if (
    typeof brief.sessionId !== "string" ||
    !UUID_V4_PATTERN.test(brief.sessionId.trim())
  ) {
    errors.push("request.sessionId must be a UUIDv4.");
  } else {
    sessionId = brief.sessionId.trim().toLowerCase();
  }

  const companyName = readPlainText(
    brief.companyName,
    "request.companyName",
    errors,
    2,
    80,
  );
  const serviceArea = readPlainText(
    brief.serviceArea,
    "request.serviceArea",
    errors,
    2,
    120,
  );

  const services: CustomSiteServiceKey[] = [];
  if (!Array.isArray(brief.services) || brief.services.length === 0) {
    errors.push("request.services must contain at least one service.");
  } else {
    const selected = new Set<string>();
    let invalid = false;
    for (const service of brief.services) {
      if (
        typeof service !== "string" ||
        !SERVICE_SET.has(service) ||
        selected.has(service)
      ) {
        invalid = true;
        break;
      }
      selected.add(service);
    }
    if (invalid) {
      errors.push(
        "request.services contains an unsupported or duplicate service key.",
      );
    } else {
      for (const service of CUSTOM_SITE_SERVICE_KEYS) {
        if (selected.has(service)) services.push(service);
      }
    }
  }

  const primaryColor = readColor(
    brief.primaryColor,
    "request.primaryColor",
    errors,
  );
  const accentColor = readColor(
    brief.accentColor,
    "request.accentColor",
    errors,
  );
  const audience = readEnum<CustomSiteAudience>(
    brief.audience,
    AUDIENCE_SET,
    "request.audience",
    errors,
  );
  const tone = readEnum<CustomSiteTone>(
    brief.tone,
    TONE_SET,
    "request.tone",
    errors,
  );
  const conversionGoal = readEnum<CustomSiteConversionGoal>(
    brief.conversionGoal,
    CONVERSION_GOAL_SET,
    "request.conversionGoal",
    errors,
  );
  const companyStory = readNullablePlainText(
    brief.companyStory,
    "request.companyStory",
    errors,
    500,
  );
  const differentiators = readNullablePlainText(
    brief.differentiators,
    "request.differentiators",
    errors,
    400,
  );
  const projectFocus = readNullablePlainText(
    brief.projectFocus,
    "request.projectFocus",
    errors,
    300,
  );
  const wordsToAvoid = readNullablePlainText(
    brief.wordsToAvoid,
    "request.wordsToAvoid",
    errors,
    200,
  );

  if (
    errors.length > 0 ||
    !sessionId ||
    !companyName ||
    !serviceArea ||
    !primaryColor ||
    !accentColor ||
    !audience ||
    !tone ||
    !conversionGoal ||
    companyStory === undefined ||
    differentiators === undefined ||
    projectFocus === undefined ||
    wordsToAvoid === undefined
  ) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      sessionId,
      companyName,
      serviceArea,
      services,
      primaryColor,
      accentColor,
      audience,
      tone,
      conversionGoal,
      companyStory,
      differentiators,
      projectFocus,
      wordsToAvoid,
    },
  };
}

export function parseCustomSiteAiDraft(
  value: unknown,
): ParseResult<CustomSiteAiDraft> {
  const errors: string[] = [];
  const draft = readObject(value, AI_DRAFT_KEYS, "draft", errors);
  if (!draft) return { ok: false, errors };
  const design = readObject(draft.design, AI_DESIGN_KEYS, "draft.design", errors);
  const content = readContent(draft.content, "draft.content", errors);
  if (!design) return { ok: false, errors };

  const composition = readEnum<CustomSiteComposition>(
    design.composition,
    COMPOSITION_SET,
    "draft.design.composition",
    errors,
  );
  const density = readEnum<CustomSiteDensity>(
    design.density,
    DENSITY_SET,
    "draft.design.density",
    errors,
  );
  const headingStyle = readEnum<CustomSiteHeadingStyle>(
    design.headingStyle,
    HEADING_STYLE_SET,
    "draft.design.headingStyle",
    errors,
  );
  const cornerStyle = readEnum<CustomSiteCornerStyle>(
    design.cornerStyle,
    CORNER_STYLE_SET,
    "draft.design.cornerStyle",
    errors,
  );

  if (
    errors.length > 0 ||
    !content ||
    !composition ||
    !density ||
    !headingStyle ||
    !cornerStyle
  ) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    value: {
      design: { composition, density, headingStyle, cornerStyle },
      content,
    },
  };
}

export function parseCustomSiteBlueprint(
  value: unknown,
): ParseResult<CustomSiteBlueprint> {
  const errors: string[] = [];
  const blueprint = readObject(value, BLUEPRINT_KEYS, "blueprint", errors);
  if (!blueprint) return { ok: false, errors };

  if (blueprint.blueprintVersion !== CUSTOM_SITE_BLUEPRINT_VERSION) {
    errors.push("blueprint.blueprintVersion is not supported.");
  }
  if (blueprint.fieldIntegrationVersion !== FIELD_INTEGRATION_VERSION) {
    errors.push("blueprint.fieldIntegrationVersion is not supported.");
  }

  const design = readObject(blueprint.design, DESIGN_KEYS, "blueprint.design", errors);
  const content = readContent(blueprint.content, "blueprint.content", errors);
  if (content && findProhibitedBlueprintClaim(content)) {
    errors.push(
      "blueprint.content contains an unsupported public claim or implementation detail.",
    );
  }
  const conversionGoal = readEnum<CustomSiteConversionGoal>(
    blueprint.conversionGoal,
    CONVERSION_GOAL_SET,
    "blueprint.conversionGoal",
    errors,
  );
  const integration = readObject(
    blueprint.integration,
    INTEGRATION_KEYS,
    "blueprint.integration",
    errors,
  );
  const provenance = readObject(
    blueprint.provenance,
    PROVENANCE_KEYS,
    "blueprint.provenance",
    errors,
  );

  let parsedDesign: CustomSiteBlueprint["design"] | undefined;
  if (design) {
    const composition = readEnum<CustomSiteComposition>(
      design.composition,
      COMPOSITION_SET,
      "blueprint.design.composition",
      errors,
    );
    const tone = readEnum<CustomSiteTone>(
      design.tone,
      TONE_SET,
      "blueprint.design.tone",
      errors,
    );
    const density = readEnum<CustomSiteDensity>(
      design.density,
      DENSITY_SET,
      "blueprint.design.density",
      errors,
    );
    const headingStyle = readEnum<CustomSiteHeadingStyle>(
      design.headingStyle,
      HEADING_STYLE_SET,
      "blueprint.design.headingStyle",
      errors,
    );
    const cornerStyle = readEnum<CustomSiteCornerStyle>(
      design.cornerStyle,
      CORNER_STYLE_SET,
      "blueprint.design.cornerStyle",
      errors,
    );
    const primaryColor = readColor(
      design.primaryColor,
      "blueprint.design.primaryColor",
      errors,
    );
    const accentColor = readColor(
      design.accentColor,
      "blueprint.design.accentColor",
      errors,
    );
    const surfaceColor = readColor(
      design.surfaceColor,
      "blueprint.design.surfaceColor",
      errors,
    );
    if (
      composition &&
      tone &&
      density &&
      headingStyle &&
      cornerStyle &&
      primaryColor &&
      accentColor &&
      surfaceColor
    ) {
      parsedDesign = {
        composition,
        tone,
        density,
        headingStyle,
        cornerStyle,
        primaryColor,
        accentColor,
        surfaceColor,
      };
    }
  }

  if (integration) {
    const bindings = integration.requiredBindings;
    if (
      !Array.isArray(bindings) ||
      bindings.length !== CUSTOM_SITE_REQUIRED_BINDINGS.length ||
      !CUSTOM_SITE_REQUIRED_BINDINGS.every(
        (binding, index) => bindings[index] === binding,
      )
    ) {
      errors.push(
        "blueprint.integration.requiredBindings must match the field integration contract.",
      );
    }
  }

  let parsedProvenance: CustomSiteBlueprint["provenance"] | undefined;
  if (provenance) {
    const generator = provenance.generator;
    if (generator !== "ai-gateway" && generator !== "guided-fallback") {
      errors.push("blueprint.provenance.generator is not supported.");
    }
    const modelId = provenance.modelId;
    if (
      modelId !== null &&
      (typeof modelId !== "string" ||
        modelId.length < 1 ||
        modelId.length > 120 ||
        /\s/.test(modelId))
    ) {
      errors.push("blueprint.provenance.modelId is invalid.");
    }
    if (
      (generator === "ai-gateway" && modelId === null) ||
      (generator === "guided-fallback" && modelId !== null)
    ) {
      errors.push(
        "blueprint.provenance.modelId does not match its generator.",
      );
    }
    if (provenance.promptVersion !== CUSTOM_SITE_PROMPT_VERSION) {
      errors.push("blueprint.provenance.promptVersion is not supported.");
    }
    const generatedAt = provenance.generatedAt;
    if (
      typeof generatedAt !== "string" ||
      Number.isNaN(Date.parse(generatedAt)) ||
      new Date(generatedAt).toISOString() !== generatedAt
    ) {
      errors.push("blueprint.provenance.generatedAt must be an ISO timestamp.");
    }
    const briefHash = provenance.briefHash;
    if (typeof briefHash !== "string" || !HEX_HASH_PATTERN.test(briefHash)) {
      errors.push("blueprint.provenance.briefHash is invalid.");
    }
    if (
      (generator === "ai-gateway" || generator === "guided-fallback") &&
      (modelId === null ||
        (typeof modelId === "string" && modelId.length <= 120)) &&
      provenance.promptVersion === CUSTOM_SITE_PROMPT_VERSION &&
      typeof generatedAt === "string" &&
      !Number.isNaN(Date.parse(generatedAt)) &&
      new Date(generatedAt).toISOString() === generatedAt &&
      typeof briefHash === "string" &&
      HEX_HASH_PATTERN.test(briefHash)
    ) {
      parsedProvenance = {
        generator,
        modelId,
        promptVersion: CUSTOM_SITE_PROMPT_VERSION,
        generatedAt,
        briefHash,
      };
    }
  }

  if (
    errors.length > 0 ||
    !parsedDesign ||
    !content ||
    !conversionGoal ||
    !integration ||
    !parsedProvenance
  ) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      blueprintVersion: CUSTOM_SITE_BLUEPRINT_VERSION,
      fieldIntegrationVersion: FIELD_INTEGRATION_VERSION,
      design: parsedDesign,
      content,
      conversionGoal,
      integration: { requiredBindings: CUSTOM_SITE_REQUIRED_BINDINGS },
      provenance: parsedProvenance,
    },
  };
}

export function parseCustomSiteBlueprintResult(
  value: unknown,
): ParseResult<CustomSiteBlueprintResult> {
  const errors: string[] = [];
  const result = readObject(value, RESULT_KEYS, "result", errors);
  if (!result) return { ok: false, errors };
  if (typeof result.aiUsed !== "boolean") {
    errors.push("result.aiUsed must be a boolean.");
  }
  const parsedBlueprint = parseCustomSiteBlueprint(result.blueprint);
  if (!parsedBlueprint.ok) errors.push(...parsedBlueprint.errors);
  if (
    parsedBlueprint.ok &&
    typeof result.aiUsed === "boolean" &&
    result.aiUsed !==
      (parsedBlueprint.value.provenance.generator === "ai-gateway")
  ) {
    errors.push("result.aiUsed does not match blueprint provenance.");
  }
  if (
    errors.length > 0 ||
    typeof result.aiUsed !== "boolean" ||
    !parsedBlueprint.ok
  ) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    value: { aiUsed: result.aiUsed, blueprint: parsedBlueprint.value },
  };
}

export function hashCustomSiteBrief(brief: CustomSiteBrief) {
  const canonical = JSON.stringify({
    sessionId: brief.sessionId,
    companyName: brief.companyName,
    serviceArea: brief.serviceArea,
    services: brief.services,
    primaryColor: brief.primaryColor,
    accentColor: brief.accentColor,
    audience: brief.audience,
    tone: brief.tone,
    conversionGoal: brief.conversionGoal,
    companyStory: brief.companyStory,
    differentiators: brief.differentiators,
    projectFocus: brief.projectFocus,
    wordsToAvoid: brief.wordsToAvoid,
  });
  return createHash("sha256").update(canonical).digest("hex");
}

export function normalizeFirstForwardedIp(value: string | null) {
  const first = value?.split(",", 1)[0]?.trim().toLowerCase();
  if (!first || first.length > 128 || CONTROL_CHARACTER_PATTERN.test(first)) {
    return "unknown";
  }
  return first;
}

export function deriveCustomSiteGatewayUser(
  secret: string,
  forwardedFor: string | null,
  sessionId: string,
) {
  if (secret.length < 32) return null;
  return createHmac("sha256", secret)
    .update(`${normalizeFirstForwardedIp(forwardedFor)}\n${sessionId}`)
    .digest("hex");
}

export function collectBlueprintCopy(content: CustomSiteBlueprintContent) {
  return [
    content.eyebrow,
    content.headline,
    content.subheadline,
    content.servicesTitle,
    content.servicesLead,
    content.aboutTitle,
    content.aboutBody,
    content.processTitle,
    ...content.processSteps.flatMap((step) => [step.title, step.body]),
    content.serviceAreaTitle,
    content.serviceAreaLead,
    content.requestTitle,
    content.requestLead,
  ].join("\n");
}

const PROHIBITED_CLAIM_PATTERNS: ReadonlyArray<RegExp> = [
  /\b(?:19|20)\d{2}\b/i,
  /\b(?:\d+\+?\s+years?|decades?)\b/i,
  /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty|thirty|forty|fifty|hundred)\+?\s+years?\b/i,
  /\b(?:years?|decades?)\s+of\s+experience\b/i,
  /\b(?:licensed?|licensing|insured|bonded|certified|master\s+electrician)\b/i,
  /\b(?:award(?:-winning|s)?|five[- ]star|5[- ]star|top[- ]rated|ratings?|#\s*1)\b/i,
  /\b(?:guarantees?|guaranteed|warrant(?:y|ies)|satisfaction\s+(?:promise|guarantee))\b/i,
  /\b(?:24\s*[\/-]\s*7|24x7|24[- ]hours?|around[- ]the[- ]clock|day\s+or\s+night)\b/i,
  /\b(?:emergency\s+(?:service|support|response|availability|electricians?|help|repairs?|calls?)|available\s+for\s+emergenc|on[- ]call|immediate\s+response)\b/i,
  /\b(?:same[- ]day|(?:fast|rapid|immediate|prompt)\s+(?:response|service|arrival|help|support|turnaround))\b/i,
  /\brespond\s+(?:in|within)\s+(?:under\s+)?\d+\s+(?:minutes?|hours?|days?)\b/i,
  /\b(?:backend|field\s+(?:application|system|tools?)|staff\s+workspace|integrations?|blueprint|platform\s+internals?|required\s+bindings?)\b/i,
  /\b(?:locally?[- ](?:owned|operated)|family[- ](?:owned|operated|run)|our\s+family\s+business)\b/i,
  /(?:\$\s*\d|\b(?:pricing|prices?|rates?|discounts?|financing|free\s+estimates?|affordable|no\s+hidden\s+fees)\b)/i,
];

export function findProhibitedBlueprintClaim(
  content: CustomSiteBlueprintContent,
) {
  return findProhibitedClaimInText(collectBlueprintCopy(content));
}

export function findProhibitedClaimInText(value: string) {
  return PROHIBITED_CLAIM_PATTERNS.find((pattern) => pattern.test(value)) ?? null;
}
