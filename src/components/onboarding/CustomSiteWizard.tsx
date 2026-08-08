"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from "react";
import type {
  CustomSiteAudience,
  CustomSiteBlueprint,
  CustomSiteBlueprintResult,
  CustomSiteBrief,
  CustomSiteConversionGoal,
  CustomSiteServiceKey,
  CustomSiteTone,
} from "@/lib/custom-site/contract";
import styles from "./CustomSiteWizard.module.css";

const STEPS = [
  "Direction",
  "Short brief",
  "Blueprint",
  "Business",
  "Launch",
  "Review",
] as const;

const SERVICE_OPTIONS: readonly [CustomSiteServiceKey, string, string][] = [
  ["residential", "Residential service", "Repairs, upgrades, and troubleshooting"],
  ["lighting", "Lighting", "Interior, exterior, and control systems"],
  ["panels-power", "Panels and power", "Panels, service changes, and capacity"],
  ["commercial", "Commercial service", "Tenant, office, and facility work"],
  ["ev-generators", "EV chargers and generators", "Charging and backup power"],
  ["emergency", "Emergency response", "Choose only if this is an active service"],
];

const AUDIENCE_OPTIONS: readonly [CustomSiteAudience, string, string][] = [
  ["homeowners", "Homeowners", "Residential customers and property owners"],
  ["commercial", "Commercial", "Facilities, offices, builders, and property teams"],
  ["mixed", "Mixed", "A deliberate balance of residential and commercial work"],
];

const TONE_OPTIONS: readonly [CustomSiteTone, string][] = [
  ["established", "Established"],
  ["modern", "Modern"],
  ["neighborly", "Neighborly"],
  ["premium", "Premium"],
  ["direct", "Direct"],
];

const CONVERSION_OPTIONS: readonly [CustomSiteConversionGoal, string, string][] = [
  ["request", "Request first", "Lead with the guided service request"],
  ["call", "Call first", "Make the public phone action most visible"],
  ["balanced", "Balanced", "Give calls and structured requests equal weight"],
];

const COMPOSITIONS = [
  "editorial-split",
  "precision-grid",
  "immersive-service",
  "conversion-stack",
] as const;

const REQUIRED_BINDINGS = [
  ["organization-configuration", "Organization configuration", "Brand, services, contact, and policy"],
  ["deterministic-safety-triage", "Deterministic safety triage", "Safety routing before routine intake"],
  ["service-request-v1", "Service request v1", "Structured lead and service-request fields"],
  ["private-photo-uploads", "Private photo uploads", "Protected customer attachments"],
  ["customer-document-links", "Customer document links", "Scoped estimates and invoice views"],
  ["staff-workspace", "Staff workspace", "Customers, estimates, jobs, and invoices"],
] as const;

const SERVICE_LABELS = Object.fromEntries(
  SERVICE_OPTIONS.map(([id, label]) => [id, label]),
) as Record<CustomSiteServiceKey, string>;

const TONE_TEMPLATE: Record<CustomSiteTone, string> = {
  established: "heritage-craft",
  modern: "modern-grid",
  neighborly: "neighborly-warm",
  premium: "premium-home",
  direct: "direct-response",
};

type DomainMode = "platform-subdomain" | "custom-domain" | "decide-later";

type StudioState = {
  companyName: string;
  serviceArea: string;
  services: CustomSiteServiceKey[];
  primaryColor: string;
  accentColor: string;
  audience: CustomSiteAudience;
  tone: CustomSiteTone;
  conversionGoal: CustomSiteConversionGoal;
  companyStory: string;
  differentiators: string;
  projectFocus: string;
  wordsToAvoid: string;
  legalName: string;
  phoneDisplay: string;
  publicEmail: string;
  ownerName: string;
  ownerEmail: string;
  serviceAreaRegion: string;
  domainMode: DomainMode;
  customDomain: string;
  launchGoal: string;
  consent: boolean;
  companyWebsite: string;
};

type SubmissionReceipt = {
  requestId?: string;
  receiptId?: string;
  status?: string;
};

const INITIAL_STATE: StudioState = {
  companyName: "",
  serviceArea: "",
  services: [],
  primaryColor: "#15354A",
  accentColor: "#D8A33E",
  audience: "homeowners",
  tone: "established",
  conversionGoal: "balanced",
  companyStory: "",
  differentiators: "",
  projectFocus: "",
  wordsToAvoid: "",
  legalName: "",
  phoneDisplay: "",
  publicEmail: "",
  ownerName: "",
  ownerEmail: "",
  serviceAreaRegion: "",
  domainMode: "platform-subdomain",
  customDomain: "",
  launchGoal: "",
  consent: false,
  companyWebsite: "",
};

function stableFallbackToken(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function deriveOrganizationIdentity(displayName: string) {
  const ascii = displayName.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
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

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validHostname(value: string) {
  return /^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
    value.trim(),
  );
}

function validPhone(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return (
    (trimmed.startsWith("+") && digits.length >= 8 && digits.length <= 15) ||
    digits.length === 10 ||
    (digits.length === 11 && digits.startsWith("1"))
  );
}

function validColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value.trim());
}

function safePlainText(value: string) {
  return (
    !/[<>\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value) &&
    !/(?:java|vb)script\s*:/i.test(value)
  );
}

function isBlueprintResult(value: unknown): value is CustomSiteBlueprintResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<CustomSiteBlueprintResult>;
  if (typeof result.aiUsed !== "boolean" || !result.blueprint) return false;
  const blueprint = result.blueprint as Partial<CustomSiteBlueprint>;
  return (
    blueprint.blueprintVersion === 1 &&
    blueprint.fieldIntegrationVersion === 1 &&
    Boolean(blueprint.design) &&
    COMPOSITIONS.includes(
      blueprint.design?.composition as (typeof COMPOSITIONS)[number],
    ) &&
    typeof blueprint.content?.headline === "string" &&
    Array.isArray(blueprint.content?.processSteps) &&
    blueprint.content.processSteps.length === 3 &&
    Array.isArray(blueprint.integration?.requiredBindings) &&
    blueprint.integration.requiredBindings.length === 6 &&
    Boolean(blueprint.provenance)
  );
}

function nullable(value: string) {
  const normalized = value.trim();
  return normalized ? normalized : null;
}

function PreviewAction({ goal }: { goal: CustomSiteConversionGoal }) {
  return (
    <div className={styles.previewActions}>
      {goal !== "call" ? <strong>Start a service request</strong> : null}
      {goal !== "request" ? <span>Call the office</span> : null}
    </div>
  );
}

function BlueprintPreview({
  blueprint,
  companyName,
  serviceArea,
  services,
}: {
  blueprint: CustomSiteBlueprint;
  companyName: string;
  serviceArea: string;
  services: CustomSiteServiceKey[];
}) {
  const { design, content } = blueprint;
  const { organizationInitials } = deriveOrganizationIdentity(companyName);
  const previewStyle = {
    "--preview-primary": design.primaryColor,
    "--preview-accent": design.accentColor,
    "--preview-surface": design.surfaceColor,
  } as CSSProperties;

  return (
    <div className={styles.previewViewport} style={previewStyle}>
      <div className={styles.previewChrome} aria-hidden="true">
        <span><i /><i /><i /></span>
        <b>Responsive public-site draft</b>
        <em>Review ready · not live</em>
      </div>
      <article
        className={styles.previewCanvas}
        data-composition={design.composition}
        data-density={design.density}
        data-heading={design.headingStyle}
        data-corners={design.cornerStyle}
        aria-label={`${companyName} custom website draft in the ${design.composition} composition`}
      >
        <header className={styles.previewNav}>
          <span className={styles.previewBrandMark}>{organizationInitials}</span>
          <strong>{companyName}</strong>
          <div className={styles.previewLinks} aria-hidden="true">
            <span>Services</span>
            <span>About</span>
            <span>Request service</span>
          </div>
        </header>

        <section className={styles.previewHero}>
          <div className={styles.previewHeroImage}>
            <Image
              src="/contractor-electrician.png"
              alt=""
              fill
              sizes="(max-width: 800px) 100vw, 760px"
            />
          </div>
          <div className={styles.previewHeroCopy}>
            <span>{content.eyebrow}</span>
            <h3>{content.headline}</h3>
            <p>{content.subheadline}</p>
            <PreviewAction goal={blueprint.conversionGoal} />
          </div>
        </section>

        <section className={styles.previewServices}>
          <header>
            <span>01 / Services</span>
            <h4>{content.servicesTitle}</h4>
            <p>{content.servicesLead}</p>
          </header>
          <div>
            {services.map((service, index) => (
              <span key={service}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {SERVICE_LABELS[service]}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.previewStory}>
          <div>
            <span>02 / Company</span>
            <h4>{content.aboutTitle}</h4>
            <p>{content.aboutBody}</p>
          </div>
          <div className={styles.previewArea}>
            <span>Service area</span>
            <h4>{content.serviceAreaTitle}</h4>
            <p>{content.serviceAreaLead || serviceArea}</p>
          </div>
        </section>

        <section className={styles.previewProcess}>
          <header>
            <span>03 / Process</span>
            <h4>{content.processTitle}</h4>
          </header>
          <ol>
            {content.processSteps.map((processStep, index) => (
              <li key={`${processStep.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{processStep.title}</strong>
                <p>{processStep.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.previewRequest}>
          <span>Structured intake</span>
          <h4>{content.requestTitle}</h4>
          <p>{content.requestLead}</p>
          <PreviewAction goal={blueprint.conversionGoal} />
        </section>
      </article>
    </div>
  );
}

function DraftCompass({ form }: { form: StudioState }) {
  const { organizationInitials } = deriveOrganizationIdentity(form.companyName);
  return (
    <aside
      className={styles.draftCompass}
      style={
        {
          "--compass-primary": form.primaryColor,
          "--compass-accent": form.accentColor,
        } as CSSProperties
      }
      aria-label="Live brief direction"
    >
      <div className={styles.compassGraphic} aria-hidden="true">
        <span />
        <i />
        <i />
        <strong>{organizationInitials}</strong>
      </div>
      <p>Live direction</p>
      <h3>{form.companyName.trim() || "Your electrical company"}</h3>
      <dl>
        <div><dt>Audience</dt><dd>{form.audience}</dd></div>
        <div><dt>Tone</dt><dd>{form.tone}</dd></div>
        <div><dt>Primary action</dt><dd>{form.conversionGoal}</dd></div>
        <div><dt>Services</dt><dd>{form.services.length || "—"}</dd></div>
      </dl>
      <small>
        This palette and brief become structured inputs. The studio never generates
        arbitrary HTML or scripts.
      </small>
    </aside>
  );
}

function CompatibilityChecklist({ blueprint }: { blueprint: CustomSiteBlueprint }) {
  return (
    <section className={styles.compatibility} aria-labelledby="compatibility-title">
      <header>
        <div>
          <p>Field application contract</p>
          <h3 id="compatibility-title">Six required bindings are declared.</h3>
        </div>
        <span>Blueprint contract v{blueprint.fieldIntegrationVersion}</span>
      </header>
      <p className={styles.compatibilityNote}>
        These are required handoff targets in the draft—not proof that infrastructure is
        connected. BagelTech verifies every binding during managed setup.
      </p>
      <div className={styles.bindingList}>
        {REQUIRED_BINDINGS.map(([id, label, note]) => {
          const included = blueprint.integration.requiredBindings.includes(id);
          return (
            <div key={id}>
              <span aria-hidden="true">{included ? "✓" : "!"}</span>
              <strong>{label}</strong>
              <small>{note}</small>
              <em>{included ? "Required in draft" : "Missing from draft"}</em>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function CustomSiteWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<StudioState>(INITIAL_STATE);
  const [blueprintResult, setBlueprintResult] =
    useState<CustomSiteBlueprintResult | null>(null);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const requestIdRef = useRef<string | null>(null);
  const payloadRef = useRef<Record<string, unknown> | null>(null);

  const {
    organizationSlug: companySlug,
    organizationInitials: companyInitials,
    documentPrefix,
  } = deriveOrganizationIdentity(form.companyName);
  const requestedHostname =
    form.domainMode === "platform-subdomain"
      ? `${companySlug}.contractors.bageltech.net`
      : form.domainMode === "custom-domain"
        ? form.customDomain.trim().toLowerCase()
        : null;
  const fallbackTemplateId = TONE_TEMPLATE[form.tone];

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function clearSubmissionCache() {
    requestIdRef.current = null;
    payloadRef.current = null;
  }

  function update<K extends keyof StudioState>(key: K, value: StudioState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    clearSubmissionCache();
  }

  function updateBrief<K extends keyof StudioState>(key: K, value: StudioState[K]) {
    update(key, value);
    if (blueprintResult) setBlueprintResult(null);
  }

  function onTextChange(key: keyof StudioState, briefField = false) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (briefField) updateBrief(key, event.target.value as never);
      else update(key, event.target.value as never);
    };
  }

  function toggleService(service: CustomSiteServiceKey) {
    updateBrief(
      "services",
      form.services.includes(service)
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    );
  }

  function validateDirection() {
    if (form.companyName.trim().length < 2) return "Enter the company’s public name.";
    if (form.serviceArea.trim().length < 2) return "Describe the company’s service area.";
    if (!safePlainText(form.companyName) || !safePlainText(form.serviceArea)) {
      return "Use plain text only for the company name and service area.";
    }
    if (form.services.length === 0) return "Choose at least one active electrical service.";
    if (!validColor(form.primaryColor) || !validColor(form.accentColor)) {
      return "Enter both colors as six-digit hex values, such as #15354A.";
    }
    return "";
  }

  function validateBrief() {
    const limits: readonly [keyof StudioState, number, string][] = [
      ["companyStory", 500, "company story"],
      ["differentiators", 400, "differentiators"],
      ["projectFocus", 300, "project focus"],
      ["wordsToAvoid", 200, "words to avoid"],
    ];
    for (const [key, max, label] of limits) {
      const value = String(form[key]);
      if (value.length > max) return `Keep the ${label} to ${max} characters or fewer.`;
      if (value && !safePlainText(value)) return `Use plain text only in the ${label}.`;
    }
    return "";
  }

  function validateBusiness() {
    if (
      !form.legalName.trim() ||
      !form.phoneDisplay.trim() ||
      !form.publicEmail.trim() ||
      !form.ownerName.trim() ||
      !form.ownerEmail.trim() ||
      !form.serviceAreaRegion.trim()
    ) {
      return "Complete every required business and owner field.";
    }
    if (!validEmail(form.publicEmail) || !validEmail(form.ownerEmail)) {
      return "Enter valid public and owner email addresses.";
    }
    if (!validPhone(form.phoneDisplay)) {
      return "Enter a valid U.S. phone number or an international number beginning with +.";
    }
    return "";
  }

  function validateLaunch() {
    if (form.domainMode === "custom-domain" && !validHostname(form.customDomain)) {
      return "Enter a complete hostname, such as www.exampleelectric.com.";
    }
    if (form.launchGoal.length > 400 || !safePlainText(form.launchGoal)) {
      return "Keep the launch goal to 400 plain-text characters or fewer.";
    }
    return "";
  }

  function next() {
    const validationError =
      step === 0
        ? validateDirection()
        : step === 2 && !blueprintResult
          ? "Generate a structured blueprint before continuing."
          : step === 3
            ? validateBusiness()
            : step === 4
              ? validateLaunch()
              : "";
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  async function generateBlueprint() {
    const validationError = validateDirection() || validateBrief();
    if (validationError) {
      setError(validationError);
      return;
    }

    const brief: CustomSiteBrief = {
      sessionId: crypto.randomUUID(),
      companyName: form.companyName.trim(),
      serviceArea: form.serviceArea.trim(),
      services: form.services,
      primaryColor: form.primaryColor.toUpperCase(),
      accentColor: form.accentColor.toUpperCase(),
      audience: form.audience,
      tone: form.tone,
      conversionGoal: form.conversionGoal,
      companyStory: nullable(form.companyStory),
      differentiators: nullable(form.differentiators),
      projectFocus: nullable(form.projectFocus),
      wordsToAvoid: nullable(form.wordsToAvoid),
    };

    setGenerating(true);
    setError("");
    try {
      const response = await fetch("/api/custom-site-blueprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      const result: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          result && typeof result === "object" && "error" in result && typeof result.error === "string"
            ? result.error
            : "The custom-site draft could not be generated.";
        throw new Error(message);
      }
      if (!isBlueprintResult(result)) {
        throw new Error("The studio returned an invalid blueprint. Nothing was saved.");
      }
      setBlueprintResult(result);
      clearSubmissionCache();
      setStep(2);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The custom-site draft could not be generated. Please try again.",
      );
    } finally {
      setGenerating(false);
    }
  }

  async function submit() {
    if (!blueprintResult) {
      setError("Generate a structured blueprint before submitting.");
      return;
    }
    const validationError =
      validateDirection() || validateBrief() || validateBusiness() || validateLaunch();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!form.consent) {
      setError("Confirm the request terms and privacy notice before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      if (!requestIdRef.current) requestIdRef.current = crypto.randomUUID();
      if (!payloadRef.current) {
        payloadRef.current = {
          sourceRequestId: requestIdRef.current,
          contractVersion: 1,
          template: { id: fallbackTemplateId, catalogVersion: 1 },
          company: {
            displayName: form.companyName.trim(),
            legalName: form.legalName.trim(),
            phoneDisplay: form.phoneDisplay.trim(),
            publicEmail: form.publicEmail.trim().toLowerCase(),
          },
          owner: {
            name: form.ownerName.trim(),
            email: form.ownerEmail.trim().toLowerCase(),
          },
          serviceArea: {
            label: form.serviceArea.trim(),
            region: form.serviceAreaRegion.trim(),
          },
          services: form.services,
          brand: {
            primaryColor: form.primaryColor.toLowerCase(),
            accentColor: form.accentColor.toLowerCase(),
          },
          domain: { mode: form.domainMode, requestedHostname },
          launchGoal: nullable(form.launchGoal),
          consent: {
            termsVersion: "contractor-platform-onboarding-v1",
            privacyVersion: "contractor-platform-privacy-v1",
            accepted: true,
            acceptedAt: new Date().toISOString(),
          },
          companyWebsite: form.companyWebsite,
          siteBlueprint: blueprintResult.blueprint,
        };
      }

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadRef.current),
      });
      const result = (await response.json().catch(() => ({}))) as SubmissionReceipt & {
        error?: string;
        message?: string;
      };
      if (!response.ok) {
        throw new Error(result.error || result.message || "The request could not be recorded.");
      }
      setReceipt({
        requestId: result.requestId || requestIdRef.current,
        receiptId: result.receiptId,
        status: result.status || "received",
      });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The request could not be recorded. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    const receiptNumber = receipt.receiptId || receipt.requestId;
    return (
      <div className={styles.pageRoot}>
        <section className={styles.successState} aria-live="polite">
          <span className={styles.successMark} aria-hidden="true">✓</span>
          <p>Custom Studio · Request received</p>
          <h1>Your blueprint is attached to the managed-review queue.</h1>
          <p>
            The custom site remains a review-ready draft. No account, infrastructure,
            field binding, domain, subscription, or launch has been activated.
          </p>
          {receiptNumber ? <strong className={styles.receipt}>Receipt: {receiptNumber}</strong> : null}
          <ol>
            <li>BagelTech reviews the blueprint, business scope, and requested address.</li>
            <li>The owner confirms commercial scope, identity, and domain requirements.</li>
            <li>Provisioning and field-application verification begin only after acceptance.</li>
          </ol>
          <Link href="/contractors">Return to the contractor platform</Link>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.studioShell}>
        <aside className={styles.studioRail}>
          <Link href="/contractors">← Contractor platform</Link>
          <span className={styles.railEyebrow}>Custom Studio</span>
          <h1>Shape the site around the field product.</h1>
          <p>
            A short brief becomes a structured, review-ready website blueprint that
            carries the field application contract with it.
          </p>
          <ol aria-label="Custom-site setup progress">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={
                  index === step
                    ? styles.stepActive
                    : index < step
                      ? styles.stepComplete
                      : undefined
                }
                aria-current={index === step ? "step" : undefined}
              >
                <span>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</span>
                {label}
              </li>
            ))}
          </ol>
          <div className={styles.progress} aria-hidden="true">
            <i style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
          <small>Draft generation does not provision or publish a website.</small>
        </aside>

        <section className={styles.workspace} key={step}>
          {step === 0 ? (
            <div className={styles.splitWorkspace}>
              <div>
                <p className={styles.stepEyebrow}>Step 1 · Direction</p>
                <h2 ref={headingRef} tabIndex={-1}>Set the visual signal and service scope.</h2>
                <p className={styles.stepIntro}>
                  Start with what customers should recognize immediately. Only list
                  services the company actively offers.
                </p>
                <div className={styles.fieldGrid}>
                  <label className={styles.wide}>
                    Public company name *
                    <input
                      value={form.companyName}
                      onChange={onTextChange("companyName", true)}
                      autoComplete="organization"
                      maxLength={80}
                      placeholder="Northline Electric"
                    />
                  </label>
                  <label className={styles.wide}>
                    Service area *
                    <input
                      value={form.serviceArea}
                      onChange={onTextChange("serviceArea", true)}
                      maxLength={120}
                      placeholder="Cedar County and nearby communities"
                    />
                  </label>
                </div>
                <fieldset className={styles.choiceFieldset}>
                  <legend>Active services *</legend>
                  <div className={styles.serviceGrid}>
                    {SERVICE_OPTIONS.map(([id, label, note]) => (
                      <label key={id}>
                        <input
                          type="checkbox"
                          checked={form.services.includes(id)}
                          onChange={() => toggleService(id)}
                        />
                        <span><strong>{label}</strong><small>{note}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className={styles.choiceFieldset}>
                  <legend>Company colors *</legend>
                  <div className={styles.colorGrid}>
                    <label>
                      Primary
                      <span>
                        <input
                          type="color"
                          value={form.primaryColor}
                          onChange={(event) => updateBrief("primaryColor", event.target.value)}
                          aria-label="Choose primary color"
                        />
                        <input
                          value={form.primaryColor}
                          onChange={onTextChange("primaryColor", true)}
                          maxLength={7}
                          pattern="^#[0-9A-Fa-f]{6}$"
                          aria-label="Primary color hex value"
                        />
                      </span>
                    </label>
                    <label>
                      Accent
                      <span>
                        <input
                          type="color"
                          value={form.accentColor}
                          onChange={(event) => updateBrief("accentColor", event.target.value)}
                          aria-label="Choose accent color"
                        />
                        <input
                          value={form.accentColor}
                          onChange={onTextChange("accentColor", true)}
                          maxLength={7}
                          pattern="^#[0-9A-Fa-f]{6}$"
                          aria-label="Accent color hex value"
                        />
                      </span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <DraftCompass form={form} />
            </div>
          ) : null}

          {step === 1 ? (
            <div className={styles.splitWorkspace}>
              <div>
                <p className={styles.stepEyebrow}>Step 2 · Short brief</p>
                <h2 ref={headingRef} tabIndex={-1}>Give the studio a point of view.</h2>
                <p className={styles.stepIntro}>
                  A few controlled choices guide the composition and copy. Leave optional
                  prompts blank rather than inventing claims.
                </p>
                <p className={styles.briefDisclosure}>
                  Do not include customer records or sensitive personal data. When AI
                  assistance is available, this bounded business brief is processed by
                  our managed model provider; otherwise the studio uses its built-in
                  guided fallback. See the{" "}
                  <Link href="/contractors/privacy" target="_blank" rel="noreferrer">
                    privacy notice
                  </Link>
                  .
                </p>
                <fieldset className={styles.choiceFieldset}>
                  <legend>Primary audience</legend>
                  <div className={styles.radioRows}>
                    {AUDIENCE_OPTIONS.map(([id, label, note]) => (
                      <label key={id}>
                        <input
                          type="radio"
                          name="custom-audience"
                          checked={form.audience === id}
                          onChange={() => updateBrief("audience", id)}
                        />
                        <span><strong>{label}</strong><small>{note}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className={styles.choiceFieldset}>
                  <legend>Brand tone</legend>
                  <div className={styles.segmentedChoices}>
                    {TONE_OPTIONS.map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={form.tone === id}
                        onClick={() => updateBrief("tone", id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className={styles.choiceFieldset}>
                  <legend>Primary customer action</legend>
                  <div className={styles.radioRows}>
                    {CONVERSION_OPTIONS.map(([id, label, note]) => (
                      <label key={id}>
                        <input
                          type="radio"
                          name="custom-conversion"
                          checked={form.conversionGoal === id}
                          onChange={() => updateBrief("conversionGoal", id)}
                        />
                        <span><strong>{label}</strong><small>{note}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className={styles.textareaGrid}>
                  <label>
                    Company story (optional)
                    <textarea
                      value={form.companyStory}
                      onChange={onTextChange("companyStory", true)}
                      maxLength={500}
                      placeholder="Share verifiable history, approach, or context."
                    />
                    <small>{form.companyStory.length}/500</small>
                  </label>
                  <label>
                    Real differentiators (optional)
                    <textarea
                      value={form.differentiators}
                      onChange={onTextChange("differentiators", true)}
                      maxLength={400}
                      placeholder="Only include facts the company can support."
                    />
                    <small>{form.differentiators.length}/400</small>
                  </label>
                  <label>
                    Project focus (optional)
                    <textarea
                      value={form.projectFocus}
                      onChange={onTextChange("projectFocus", true)}
                      maxLength={300}
                      placeholder="Examples: panel upgrades, custom lighting, facility service."
                    />
                    <small>{form.projectFocus.length}/300</small>
                  </label>
                  <label>
                    Words or claims to avoid (optional)
                    <textarea
                      value={form.wordsToAvoid}
                      onChange={onTextChange("wordsToAvoid", true)}
                      maxLength={200}
                      placeholder="Examples: best, 24/7, same-day."
                    />
                    <small>{form.wordsToAvoid.length}/200</small>
                  </label>
                </div>
              </div>
              <DraftCompass form={form} />
            </div>
          ) : null}

          {step === 2 && blueprintResult ? (
            <div>
              <p className={styles.stepEyebrow}>Step 3 · Structured blueprint</p>
              <h2 ref={headingRef} tabIndex={-1}>Review the generated direction.</h2>
              <div
                className={blueprintResult.aiUsed ? styles.aiStatus : styles.fallbackStatus}
                role="status"
              >
                <strong>
                  {blueprintResult.aiUsed ? "AI-assisted draft" : "Guided fallback draft"}
                </strong>
                <span>
                  {blueprintResult.aiUsed
                    ? "AI assistance shaped this structured blueprint from your brief."
                    : "AI assistance was unavailable, so the studio used its built-in guided fallback."}
                </span>
                <em>Review ready · not live</em>
              </div>
              <BlueprintPreview
                blueprint={blueprintResult.blueprint}
                companyName={form.companyName}
                serviceArea={form.serviceArea}
                services={form.services}
              />
              <CompatibilityChecklist blueprint={blueprintResult.blueprint} />
              <button
                type="button"
                className={styles.textButton}
                onClick={() => {
                  setBlueprintResult(null);
                  setStep(1);
                }}
              >
                ← Revise the brief and generate a new draft
              </button>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <p className={styles.stepEyebrow}>Step 4 · Business and owner</p>
              <h2 ref={headingRef} tabIndex={-1}>Add the details needed for managed setup.</h2>
              <p className={styles.stepIntro}>
                Owner details are for setup coordination. Public contact details are
                intended for the customer-facing site.
              </p>
              <div className={styles.fieldGrid}>
                <label>
                  Legal business name *
                  <input value={form.legalName} onChange={onTextChange("legalName")} autoComplete="organization" maxLength={160} />
                </label>
                <label>
                  State or region *
                  <input value={form.serviceAreaRegion} onChange={onTextChange("serviceAreaRegion")} autoComplete="address-level1" maxLength={80} />
                </label>
                <label>
                  Public phone *
                  <input type="tel" value={form.phoneDisplay} onChange={onTextChange("phoneDisplay")} autoComplete="tel" maxLength={32} placeholder="(555) 010-2026" />
                </label>
                <label>
                  Public email *
                  <input type="email" value={form.publicEmail} onChange={onTextChange("publicEmail")} autoComplete="email" maxLength={254} />
                </label>
                <label>
                  Initial owner name *
                  <input value={form.ownerName} onChange={onTextChange("ownerName")} autoComplete="name" maxLength={80} />
                </label>
                <label>
                  Owner email *
                  <input type="email" value={form.ownerEmail} onChange={onTextChange("ownerEmail")} autoComplete="email" maxLength={254} />
                </label>
              </div>
              <div className={styles.derivedLabels} aria-label="Derived deployment labels">
                <div><span>Workspace slug</span><strong>{companySlug}</strong></div>
                <div><span>Company initials</span><strong>{companyInitials}</strong></div>
                <div><span>Document prefix</span><strong>{documentPrefix}</strong></div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <p className={styles.stepEyebrow}>Step 5 · Address and launch goal</p>
              <h2 ref={headingRef} tabIndex={-1}>Choose how customers should find the site.</h2>
              <p className={styles.stepIntro}>
                Every address shown here is requested—not reserved or verified. Domain
                ownership and DNS remain explicit managed-launch gates.
              </p>
              <fieldset className={styles.choiceFieldset}>
                <legend>Requested address</legend>
                <div className={styles.radioRows}>
                  <label>
                    <input type="radio" name="custom-domain-mode" checked={form.domainMode === "platform-subdomain"} onChange={() => update("domainMode", "platform-subdomain")} />
                    <span><strong>BagelTech platform address</strong><small>{companySlug}.contractors.bageltech.net · subject to review</small></span>
                  </label>
                  <label>
                    <input type="radio" name="custom-domain-mode" checked={form.domainMode === "custom-domain"} onChange={() => update("domainMode", "custom-domain")} />
                    <span><strong>Existing custom domain</strong><small>Provide a hostname you control; verification happens later.</small></span>
                  </label>
                  <label>
                    <input type="radio" name="custom-domain-mode" checked={form.domainMode === "decide-later"} onChange={() => update("domainMode", "decide-later")} />
                    <span><strong>Decide during review</strong><small>Leave the requested address open for the setup conversation.</small></span>
                  </label>
                </div>
              </fieldset>
              <div className={styles.fieldGrid}>
                {form.domainMode === "custom-domain" ? (
                  <label className={styles.wide}>
                    Custom hostname *
                    <input value={form.customDomain} onChange={onTextChange("customDomain")} inputMode="url" autoCapitalize="none" maxLength={253} placeholder="www.exampleelectric.com" />
                  </label>
                ) : null}
                <label className={styles.wide}>
                  What would make this launch successful? (optional)
                  <textarea value={form.launchGoal} onChange={onTextChange("launchGoal")} maxLength={400} placeholder="Share the operating goal, timing context, or migration concern." />
                </label>
              </div>
            </div>
          ) : null}

          {step === 5 && blueprintResult ? (
            <div>
              <p className={styles.stepEyebrow}>Step 6 · Review and submit</p>
              <h2 ref={headingRef} tabIndex={-1}>Confirm the blueprint and setup brief.</h2>
              <p className={styles.stepIntro}>
                Submission records an immutable request with the structured blueprint.
                It does not create a subscription, deployment, domain, user, or live site.
              </p>
              <div className={styles.reviewDraftStatus}>
                <span>{blueprintResult.aiUsed ? "AI-assisted" : "Guided fallback"}</span>
                <strong>{blueprintResult.blueprint.design.composition.replaceAll("-", " ")}</strong>
                <small>Review-ready draft · Blueprint v{blueprintResult.blueprint.blueprintVersion}</small>
              </div>
              <dl className={styles.reviewList}>
                <div><dt>Company</dt><dd>{form.companyName}<br />{form.legalName}</dd></div>
                <div><dt>Audience and tone</dt><dd>{form.audience} · {form.tone}<br />{form.conversionGoal} conversion</dd></div>
                <div><dt>Public contact</dt><dd>{form.phoneDisplay}<br />{form.publicEmail}</dd></div>
                <div><dt>Owner</dt><dd>{form.ownerName}<br />{form.ownerEmail}</dd></div>
                <div><dt>Service area</dt><dd>{form.serviceArea}<br />{form.serviceAreaRegion}</dd></div>
                <div><dt>Active services</dt><dd>{form.services.map((service) => SERVICE_LABELS[service]).join(", ")}</dd></div>
                <div><dt>Requested address</dt><dd>{requestedHostname || "Decide during review"}</dd></div>
                <div><dt>Fallback presentation</dt><dd>{fallbackTemplateId}<br /><small>Used only if the custom blueprint cannot be applied.</small></dd></div>
              </dl>
              <CompatibilityChecklist blueprint={blueprintResult.blueprint} />
              <label className={styles.consent}>
                <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} />
                <span>
                  I am authorized to submit this request and accept the{" "}
                  <Link href="/contractors/terms" target="_blank" rel="noreferrer">setup request terms</Link>{" "}
                  and{" "}<Link href="/contractors/privacy" target="_blank" rel="noreferrer">privacy notice</Link>.
                  I understand the blueprint is a review-ready draft, not a purchase,
                  domain reservation, completed integration, or automatic launch.
                </span>
              </label>
              <label className={styles.honeypot} aria-hidden="true">
                Company website
                <input tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={onTextChange("companyWebsite")} />
              </label>
            </div>
          ) : null}

          {error ? <p className={styles.error} role="alert">{error}</p> : null}

          <div className={styles.actions}>
            {step > 0 ? (
              <button
                type="button"
                className={styles.backButton}
                onClick={() => {
                  setError("");
                  setStep((current) => current - 1);
                }}
              >
                ← Back
              </button>
            ) : null}
            {step === 1 ? (
              <button type="button" className={styles.primaryButton} onClick={generateBlueprint} disabled={generating}>
                {generating ? "Building structured draft…" : "Generate review-ready draft →"}
              </button>
            ) : step < STEPS.length - 1 ? (
              <button type="button" className={styles.primaryButton} onClick={next}>
                Continue to {STEPS[step + 1]} →
              </button>
            ) : (
              <button type="button" className={styles.primaryButton} onClick={submit} disabled={submitting}>
                {submitting ? "Recording request…" : "Submit blueprint for managed review →"}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
