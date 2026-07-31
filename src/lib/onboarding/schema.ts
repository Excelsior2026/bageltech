export const ONBOARDING_CONTRACT_VERSION = 1 as const;
export const TEMPLATE_CATALOG_VERSION = 1 as const;
export const MAX_ONBOARDING_BODY_BYTES = 32 * 1024;

export const TERMS_VERSION = "contractor-platform-onboarding-v1" as const;
export const PRIVACY_VERSION = "contractor-platform-privacy-v1" as const;

export const TEMPLATE_IDS = [
  "heritage-craft",
  "modern-grid",
  "neighborly-warm",
  "industrial-pro",
  "premium-home",
  "direct-response",
] as const;

export const SERVICE_KEYS = [
  "residential",
  "lighting",
  "panels-power",
  "commercial",
  "ev-generators",
  "emergency",
] as const;

export const DOMAIN_MODES = [
  "platform-subdomain",
  "custom-domain",
  "decide-later",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];
export type ServiceKey = (typeof SERVICE_KEYS)[number];
export type DomainMode = (typeof DOMAIN_MODES)[number];

export interface NormalizedOnboardingInput {
  sourceRequestId: string;
  contractVersion: typeof ONBOARDING_CONTRACT_VERSION;
  catalogVersion: typeof TEMPLATE_CATALOG_VERSION;
  templateId: TemplateId;
  displayName: string;
  shortName: string;
  legalName: string;
  phoneDisplay: string;
  phoneE164: string;
  publicEmail: string;
  ownerName: string;
  ownerEmail: string;
  serviceAreaLabel: string;
  stateRegion: string;
  services: ServiceKey[];
  primaryColor: string;
  accentColor: string;
  domainChoice: DomainMode;
  requestedHostname: string | null;
  launchGoal: string | null;
  organizationSlug: string;
  organizationInitials: string;
  documentPrefix: string;
  termsAccepted: true;
  termsVersion: typeof TERMS_VERSION;
  privacyVersion: typeof PRIVACY_VERSION;
  consentAcceptedAt: string;
}

export type OnboardingParseResult =
  | { ok: true; trapped: true }
  | { ok: true; trapped: false; value: NormalizedOnboardingInput }
  | { ok: false; errors: string[] };

const ROOT_KEYS = new Set([
  "sourceRequestId",
  "contractVersion",
  "template",
  "company",
  "owner",
  "serviceArea",
  "services",
  "brand",
  "domain",
  "launchGoal",
  "consent",
  "companyWebsite",
]);

const TEMPLATE_KEYS = new Set(["id", "catalogVersion"]);
const COMPANY_KEYS = new Set([
  "displayName",
  "legalName",
  "phoneDisplay",
  "publicEmail",
]);
const OWNER_KEYS = new Set(["name", "email"]);
const SERVICE_AREA_KEYS = new Set(["label", "region"]);
const BRAND_KEYS = new Set(["primaryColor", "accentColor"]);
const DOMAIN_KEYS = new Set(["mode", "requestedHostname"]);
const CONSENT_KEYS = new Set([
  "termsVersion",
  "privacyVersion",
  "accepted",
  "acceptedAt",
]);

const TEMPLATE_ID_SET = new Set<string>(TEMPLATE_IDS);
const SERVICE_KEY_SET = new Set<string>(SERVICE_KEYS);
const DOMAIN_MODE_SET = new Set<string>(DOMAIN_MODES);

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
    if (!allowed.has(key)) {
      errors.push(`${path}.${key} is not allowed.`);
    }
  }
}

function readObject(
  value: unknown,
  path: string,
  allowed: Set<string>,
  errors: string[],
) {
  if (!isRecord(value)) {
    errors.push(`${path} must be an object.`);
    return undefined;
  }

  rejectUnknownKeys(value, allowed, path, errors);
  return value;
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function readString(
  value: unknown,
  path: string,
  errors: string[],
  options: { min: number; max: number },
) {
  if (typeof value !== "string") {
    errors.push(`${path} must be a string.`);
    return undefined;
  }

  const normalized = normalizeText(value);
  if (
    normalized.length < options.min ||
    normalized.length > options.max ||
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(normalized)
  ) {
    errors.push(
      `${path} must be between ${options.min} and ${options.max} characters.`,
    );
    return undefined;
  }

  return normalized;
}

function readNullableString(
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

  const normalized = normalizeText(value);
  if (!normalized) return null;
  if (
    normalized.length > max ||
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(normalized)
  ) {
    errors.push(`${path} must not exceed ${max} characters.`);
    return undefined;
  }

  return normalized;
}

function normalizeEmail(
  value: unknown,
  path: string,
  errors: string[],
) {
  if (typeof value !== "string") {
    errors.push(`${path} must be an email address.`);
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (
    normalized.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  ) {
    errors.push(`${path} must be a valid email address.`);
    return undefined;
  }

  return normalized;
}

export function normalizePhoneToE164(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+") && digits.length >= 8 && digits.length <= 15) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return null;
}

function readPhone(
  value: unknown,
  path: string,
  errors: string[],
) {
  const display = readString(value, path, errors, { min: 7, max: 32 });
  if (!display) return undefined;

  const e164 = normalizePhoneToE164(display);
  if (!e164) {
    errors.push(
      `${path} must be a U.S. number or an international number in E.164 format.`,
    );
    return undefined;
  }

  return { display, e164 };
}

function readColor(
  value: unknown,
  path: string,
  errors: string[],
) {
  if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value.trim())) {
    errors.push(`${path} must be a six-digit hexadecimal color.`);
    return undefined;
  }

  return value.trim().toUpperCase();
}

function readIsoDate(
  value: unknown,
  path: string,
  errors: string[],
) {
  if (typeof value !== "string") {
    errors.push(`${path} must be an ISO timestamp.`);
    return undefined;
  }

  const milliseconds = Date.parse(value);
  if (!Number.isFinite(milliseconds)) {
    errors.push(`${path} must be an ISO timestamp.`);
    return undefined;
  }

  return new Date(milliseconds).toISOString();
}

function normalizeHostname(
  value: unknown,
  path: string,
  errors: string[],
) {
  if (typeof value !== "string") {
    errors.push(`${path} must be a hostname.`);
    return undefined;
  }

  const hostname = value.trim().toLowerCase().replace(/\.$/, "");
  const labels = hostname.split(".");
  const valid =
    hostname.length <= 253 &&
    labels.length >= 2 &&
    labels.every(
      (label) =>
        label.length >= 1 &&
        label.length <= 63 &&
        /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label),
    );

  if (!valid) {
    errors.push(`${path} must be a valid hostname without a URL path.`);
    return undefined;
  }

  return hostname;
}

function stableFallbackToken(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function deriveOrganizationIdentity(displayName: string) {
  const ascii = displayName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const words = ascii.match(/[a-z0-9]+/gi) ?? [];
  const slugBase = words.join("-").toLowerCase().slice(0, 48);
  const organizationSlug =
    slugBase.replace(/^-+|-+$/g, "") ||
    `contractor-${stableFallbackToken(displayName)}`;

  let organizationInitials = words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (organizationInitials.length < 2 && words[0]) {
    organizationInitials = words[0].slice(0, 2).toUpperCase();
  }
  if (!organizationInitials) organizationInitials = "EC";

  return {
    organizationSlug,
    organizationInitials,
    documentPrefix: `${organizationInitials}-`,
  };
}

function readServices(value: unknown, errors: string[]) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 8) {
    errors.push("services must contain between 1 and 8 service keys.");
    return undefined;
  }

  const services: ServiceKey[] = [];
  const seen = new Set<string>();
  for (const candidate of value) {
    if (
      typeof candidate !== "string" ||
      !SERVICE_KEY_SET.has(candidate) ||
      seen.has(candidate)
    ) {
      errors.push("services contains an unsupported or duplicate service key.");
      return undefined;
    }
    seen.add(candidate);
    services.push(candidate as ServiceKey);
  }

  return services;
}

export function parseOnboardingRequest(input: unknown): OnboardingParseResult {
  const errors: string[] = [];
  if (!isRecord(input)) {
    return { ok: false, errors: ["Request body must be an object."] };
  }

  const honeypot = input.companyWebsite;
  if (
    (typeof honeypot === "string" && honeypot.trim().length > 0) ||
    (honeypot !== undefined &&
      honeypot !== null &&
      typeof honeypot !== "string")
  ) {
    return { ok: true, trapped: true };
  }
  if (honeypot !== "") {
    errors.push("companyWebsite must be empty.");
  }

  rejectUnknownKeys(input, ROOT_KEYS, "request", errors);

  const template = readObject(
    input.template,
    "template",
    TEMPLATE_KEYS,
    errors,
  );
  const company = readObject(input.company, "company", COMPANY_KEYS, errors);
  const owner = readObject(input.owner, "owner", OWNER_KEYS, errors);
  const serviceArea = readObject(
    input.serviceArea,
    "serviceArea",
    SERVICE_AREA_KEYS,
    errors,
  );
  const brand = readObject(input.brand, "brand", BRAND_KEYS, errors);
  const domain = readObject(input.domain, "domain", DOMAIN_KEYS, errors);
  const consent = readObject(input.consent, "consent", CONSENT_KEYS, errors);

  const sourceRequestId =
    typeof input.sourceRequestId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      input.sourceRequestId,
    )
      ? input.sourceRequestId.toLowerCase()
      : undefined;
  if (!sourceRequestId) {
    errors.push("sourceRequestId must be a UUIDv4.");
  }

  if (input.contractVersion !== ONBOARDING_CONTRACT_VERSION) {
    errors.push(
      `contractVersion must be ${ONBOARDING_CONTRACT_VERSION}.`,
    );
  }

  let templateId: TemplateId | undefined;
  if (
    template &&
    typeof template.id === "string" &&
    TEMPLATE_ID_SET.has(template.id)
  ) {
    templateId = template.id as TemplateId;
  } else {
    errors.push("template.id is not supported.");
  }
  if (
    template &&
    template.catalogVersion !== TEMPLATE_CATALOG_VERSION
  ) {
    errors.push(
      `template.catalogVersion must be ${TEMPLATE_CATALOG_VERSION}.`,
    );
  }

  const displayName = company
    ? readString(company.displayName, "company.displayName", errors, {
        min: 2,
        max: 80,
      })
    : undefined;
  const legalName = company
    ? readString(company.legalName, "company.legalName", errors, {
        min: 2,
        max: 160,
      })
    : undefined;
  const phone = company
    ? readPhone(company.phoneDisplay, "company.phoneDisplay", errors)
    : undefined;
  const publicEmail = company
    ? normalizeEmail(company.publicEmail, "company.publicEmail", errors)
    : undefined;

  const ownerName = owner
    ? readString(owner.name, "owner.name", errors, { min: 2, max: 80 })
    : undefined;
  const ownerEmail = owner
    ? normalizeEmail(owner.email, "owner.email", errors)
    : undefined;

  const serviceAreaLabel = serviceArea
    ? readString(serviceArea.label, "serviceArea.label", errors, {
        min: 2,
        max: 160,
      })
    : undefined;
  const stateRegion = serviceArea
    ? readString(serviceArea.region, "serviceArea.region", errors, {
        min: 2,
        max: 80,
      })
    : undefined;
  const services = readServices(input.services, errors);

  const primaryColor = brand
    ? readColor(brand.primaryColor, "brand.primaryColor", errors)
    : undefined;
  const accentColor = brand
    ? readColor(brand.accentColor, "brand.accentColor", errors)
    : undefined;

  let domainChoice: DomainMode | undefined;
  if (
    domain &&
    typeof domain.mode === "string" &&
    DOMAIN_MODE_SET.has(domain.mode)
  ) {
    domainChoice = domain.mode as DomainMode;
  } else {
    errors.push("domain.mode is not supported.");
  }

  let requestedHostname: string | null | undefined;
  if (domain) {
    if (domain.requestedHostname === null) {
      requestedHostname = null;
    } else {
      requestedHostname = normalizeHostname(
        domain.requestedHostname,
        "domain.requestedHostname",
        errors,
      );
    }
  }

  if (
    domainChoice === "platform-subdomain" &&
    requestedHostname &&
    !requestedHostname.endsWith(".bageltech.net")
  ) {
    errors.push(
      "domain.requestedHostname must use a bageltech.net subdomain.",
    );
  }
  if (
    (domainChoice === "platform-subdomain" ||
      domainChoice === "custom-domain") &&
    !requestedHostname
  ) {
    errors.push(
      "domain.requestedHostname is required for the selected domain mode.",
    );
  }
  if (domainChoice === "decide-later" && requestedHostname !== null) {
    errors.push(
      "domain.requestedHostname must be null when deciding later.",
    );
  }

  const launchGoal = readNullableString(
    input.launchGoal,
    "launchGoal",
    errors,
    400,
  );
  const identity = displayName
    ? deriveOrganizationIdentity(displayName)
    : undefined;
  if (
    domainChoice === "platform-subdomain" &&
    requestedHostname &&
    identity &&
    requestedHostname !==
      `${identity.organizationSlug}.contractors.bageltech.net`
  ) {
    errors.push(
      "domain.requestedHostname must match the derived BagelTech platform hostname.",
    );
  }

  let termsAccepted: true | undefined;
  let termsVersion: typeof TERMS_VERSION | undefined;
  let privacyVersion: typeof PRIVACY_VERSION | undefined;
  const consentAcceptedAt = consent
    ? readIsoDate(consent.acceptedAt, "consent.acceptedAt", errors)
    : undefined;

  if (consent?.accepted === true) {
    termsAccepted = true;
  } else {
    errors.push("consent.accepted must be true.");
  }
  if (consent?.termsVersion === TERMS_VERSION) {
    termsVersion = TERMS_VERSION;
  } else {
    errors.push(`consent.termsVersion must be ${TERMS_VERSION}.`);
  }
  if (consent?.privacyVersion === PRIVACY_VERSION) {
    privacyVersion = PRIVACY_VERSION;
  } else {
    errors.push(`consent.privacyVersion must be ${PRIVACY_VERSION}.`);
  }

  if (
    errors.length > 0 ||
    !sourceRequestId ||
    !templateId ||
    !displayName ||
    !legalName ||
    !phone ||
    !publicEmail ||
    !ownerName ||
    !ownerEmail ||
    !serviceAreaLabel ||
    !stateRegion ||
    !services ||
    !primaryColor ||
    !accentColor ||
    !domainChoice ||
    requestedHostname === undefined ||
    launchGoal === undefined ||
    !termsAccepted ||
    !termsVersion ||
    !privacyVersion ||
    !consentAcceptedAt ||
    !identity
  ) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    trapped: false,
    value: {
      sourceRequestId,
      contractVersion: ONBOARDING_CONTRACT_VERSION,
      catalogVersion: TEMPLATE_CATALOG_VERSION,
      templateId,
      displayName,
      shortName: displayName,
      legalName,
      phoneDisplay: phone.display,
      phoneE164: phone.e164,
      publicEmail,
      ownerName,
      ownerEmail,
      serviceAreaLabel,
      stateRegion,
      services,
      primaryColor,
      accentColor,
      domainChoice,
      requestedHostname,
      launchGoal,
      ...identity,
      termsAccepted,
      termsVersion,
      privacyVersion,
      consentAcceptedAt,
    },
  };
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function sha256Hex(value: string) {
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return bytesToHex(digest);
}

export async function hmacSha256Hex(secret: string, value: string) {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return bytesToHex(signature);
}

export async function createForwardSignature(
  secret: string,
  timestamp: string,
  idempotencyKey: string,
  rawBody: string,
) {
  const bodyHash = await sha256Hex(rawBody);
  const canonical = `${timestamp}.${idempotencyKey}.${bodyHash}`;
  return `v1=${await hmacSha256Hex(secret, canonical)}`;
}

export function normalizeFirstForwardedIp(value: string | null) {
  if (!value) return "unknown";
  const first = value.split(",", 1)[0]?.trim().toLowerCase() ?? "";
  const unwrapped =
    first.startsWith("[") && first.endsWith("]") ? first.slice(1, -1) : first;

  if (
    unwrapped.length >= 3 &&
    unwrapped.length <= 64 &&
    /^[0-9a-f:.]+$/.test(unwrapped)
  ) {
    return unwrapped;
  }

  return "unknown";
}

export async function deriveSourceRateLimitKey(
  secret: string,
  forwardedFor: string | null,
  ownerEmail: string,
) {
  const normalizedIp = normalizeFirstForwardedIp(forwardedFor);
  const normalizedEmail = ownerEmail.trim().toLowerCase();
  return hmacSha256Hex(secret, `${normalizedIp}\n${normalizedEmail}`);
}
