"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import {
  CONTRACTOR_TEMPLATES,
  contractorTemplate,
  isContractorTemplateId,
  type ContractorTemplateId,
} from "@/content/contractor-templates";
import styles from "./Onboarding.module.css";

const STEP_LABELS = ["Template", "Business", "Services", "Domain", "Review"] as const;

const SERVICE_OPTIONS = [
  ["residential", "Residential service", "Repairs, upgrades, and troubleshooting"],
  ["lighting", "Lighting", "Interior, exterior, and control systems"],
  ["panels-power", "Panels and power", "Panels, service changes, and electrical capacity"],
  ["commercial", "Commercial service", "Tenant, office, and facility work"],
  ["ev-generators", "EV chargers and generators", "Charging and backup-power systems"],
  ["emergency", "Emergency response", "Only choose if this is an active offered service"],
] as const;

type DomainMode = "platform-subdomain" | "custom-domain" | "decide-later";

type WizardState = {
  templateId: ContractorTemplateId;
  companyDisplayName: string;
  legalName: string;
  phoneDisplay: string;
  publicEmail: string;
  ownerName: string;
  ownerEmail: string;
  serviceAreaLabel: string;
  serviceAreaRegion: string;
  services: string[];
  primaryColor: string;
  accentColor: string;
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

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "your-company"
  );
}

function initials(value: string) {
  const words = value
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length > 1) {
    return words
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  return words[0]?.slice(0, 2).toUpperCase() || "YC";
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

function initialState(template: string): WizardState {
  return {
    templateId: isContractorTemplateId(template) ? template : "heritage-craft",
    companyDisplayName: "",
    legalName: "",
    phoneDisplay: "",
    publicEmail: "",
    ownerName: "",
    ownerEmail: "",
    serviceAreaLabel: "",
    serviceAreaRegion: "",
    services: [],
    primaryColor: "#17324d",
    accentColor: "#d9a441",
    domainMode: "platform-subdomain",
    customDomain: "",
    launchGoal: "",
    consent: false,
    companyWebsite: "",
  };
}

export default function OnboardingWizard({ initialTemplate }: { initialTemplate: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WizardState>(() => initialState(initialTemplate));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const payloadRef = useRef<Record<string, unknown> | null>(null);

  const selectedTemplate = contractorTemplate(form.templateId);
  const companySlug = slugify(form.companyDisplayName);
  const companyInitials = initials(form.companyDisplayName);
  const documentPrefix = `${companyInitials.replace(/[^A-Z0-9]/g, "").slice(0, 4) || "YC"}-`;
  const requestedHostname =
    form.domainMode === "platform-subdomain"
      ? `${companySlug}.contractors.bageltech.net`
      : form.domainMode === "custom-domain"
        ? form.customDomain.trim().toLowerCase()
        : null;

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    requestIdRef.current = null;
    payloadRef.current = null;
  }

  function onTextChange(key: keyof WizardState) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, event.target.value as never);
  }

  function toggleService(service: string) {
    update(
      "services",
      form.services.includes(service)
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    );
  }

  function validateStep(currentStep: number) {
    if (currentStep === 0 && !isContractorTemplateId(form.templateId)) {
      return "Choose one of the six public-site templates.";
    }
    if (currentStep === 1) {
      if (
        !form.companyDisplayName.trim() ||
        !form.legalName.trim() ||
        !form.phoneDisplay.trim() ||
        !form.ownerName.trim() ||
        !form.serviceAreaLabel.trim() ||
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
    }
    if (currentStep === 2 && form.services.length === 0) {
      return "Choose at least one service the business actively offers.";
    }
    if (
      currentStep === 2 &&
      (!validColor(form.primaryColor) || !validColor(form.accentColor))
    ) {
      return "Enter both brand colors as six-digit hex values, such as #17324d.";
    }
    if (
      currentStep === 3 &&
      form.domainMode === "custom-domain" &&
      !validHostname(form.customDomain)
    ) {
      return "Enter a complete hostname, such as www.exampleelectric.com.";
    }
    if (currentStep === 4 && !form.consent) {
      return "Confirm the request terms and privacy notice before submitting.";
    }
    return "";
  }

  function next() {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, STEP_LABELS.length - 1));
  }

  async function submit() {
    const validationError = validateStep(4);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      if (!requestIdRef.current) {
        requestIdRef.current = crypto.randomUUID();
      }
      if (!payloadRef.current) {
        payloadRef.current = {
          sourceRequestId: requestIdRef.current,
          contractVersion: 1,
          template: {
            id: form.templateId,
            catalogVersion: 1,
          },
          company: {
            displayName: form.companyDisplayName.trim(),
            legalName: form.legalName.trim(),
            phoneDisplay: form.phoneDisplay.trim(),
            publicEmail: form.publicEmail.trim().toLowerCase(),
          },
          owner: {
            name: form.ownerName.trim(),
            email: form.ownerEmail.trim().toLowerCase(),
          },
          serviceArea: {
            label: form.serviceAreaLabel.trim(),
            region: form.serviceAreaRegion.trim(),
          },
          services: form.services,
          brand: {
            primaryColor: form.primaryColor.toLowerCase(),
            accentColor: form.accentColor.toLowerCase(),
          },
          domain: {
            mode: form.domainMode,
            requestedHostname,
          },
          launchGoal: form.launchGoal.trim() || null,
          consent: {
            termsVersion: "contractor-platform-onboarding-v1",
            privacyVersion: "contractor-platform-privacy-v1",
            accepted: true,
            acceptedAt: new Date().toISOString(),
          },
          companyWebsite: form.companyWebsite,
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
      <div className={styles.wizardWorkspace}>
        <section className={styles.successState} aria-live="polite">
          <div className={styles.successMark} aria-hidden="true">
            ✓
          </div>
          <p className={styles.wizardEyebrow}>Request received</p>
          <h2>Your setup request is in the review queue.</h2>
          <p className={styles.wizardIntro}>
            This receipt confirms submission only. No account, infrastructure, domain,
            subscription, or launch has been activated.
          </p>
          {receiptNumber ? <p className={styles.receipt}>Receipt: {receiptNumber}</p> : null}
          <ol className={styles.successSteps}>
            <li>BagelTech reviews the company, template, services, and requested address.</li>
            <li>An operator contacts the owner to confirm fit, scope, and commercial terms.</li>
            <li>Provisioning begins only after acceptance, with every launch gate tracked.</li>
          </ol>
          <Link className={styles.wizardNext} href="/contractors">
            Return to the contractor platform
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.wizardShell}>
      <aside className={styles.wizardRail}>
        <Link href="/contractors">← Contractor platform</Link>
        <h1>Build the setup brief.</h1>
        <p>
          Five guided steps create a reviewable request for a dedicated, managed
          electrical-contractor deployment.
        </p>
        <div className={styles.wizardSteps} aria-label="Setup progress">
          {STEP_LABELS.map((label, index) => (
            <span
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
              <b>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</b>
              {label}
            </span>
          ))}
        </div>
        <div className={styles.wizardProgress} aria-hidden="true">
          <i style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }} />
        </div>
      </aside>

      <div className={styles.wizardWorkspace}>
        <section className={styles.wizardStep} key={step}>
          {step === 0 ? (
            <>
              <p className={styles.wizardEyebrow}>Step 1 · Public presentation</p>
              <h2>Choose the starting direction.</h2>
              <p className={styles.wizardIntro}>
                The template can be changed during review. All six use the same
                structured content, safety triage, and intake workflow.
              </p>
              <div className={styles.wizardTemplateGrid}>
                {CONTRACTOR_TEMPLATES.map((template) => (
                  <button
                    type="button"
                    key={template.id}
                    aria-pressed={form.templateId === template.id}
                    className={
                      form.templateId === template.id ? styles.wizardTemplateActive : undefined
                    }
                    onClick={() => update("templateId", template.id)}
                  >
                    <span
                      className={styles.templateSwatch}
                      style={
                        {
                          "--swatch-paper": template.paper,
                          "--swatch-ink": template.ink,
                          "--swatch-accent": template.accent,
                        } as CSSProperties
                      }
                    >
                      <i />
                      <i />
                    </span>
                    <strong>{template.name}</strong>
                    <small>{template.character}</small>
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <p className={styles.wizardEyebrow}>Step 2 · Business and owner</p>
              <h2>Give the deployment a real identity.</h2>
              <p className={styles.wizardIntro}>
                Owner contact details are for setup coordination. Public contact details
                are the ones intended for the customer-facing site.
              </p>
              <div className={styles.wizardFields}>
                <label>
                  Display name *
                  <input
                    value={form.companyDisplayName}
                    onChange={onTextChange("companyDisplayName")}
                    autoComplete="organization"
                    maxLength={80}
                  />
                </label>
                <label>
                  Legal business name *
                  <input
                    value={form.legalName}
                    onChange={onTextChange("legalName")}
                    autoComplete="organization"
                    maxLength={160}
                  />
                </label>
                <label>
                  Public phone *
                  <input
                    type="tel"
                    value={form.phoneDisplay}
                    onChange={onTextChange("phoneDisplay")}
                    autoComplete="tel"
                    placeholder="(555) 010-2026"
                    maxLength={32}
                  />
                </label>
                <label>
                  Public email *
                  <input
                    type="email"
                    value={form.publicEmail}
                    onChange={onTextChange("publicEmail")}
                    autoComplete="email"
                    maxLength={254}
                  />
                </label>
                <label>
                  Initial owner name *
                  <input
                    value={form.ownerName}
                    onChange={onTextChange("ownerName")}
                    autoComplete="name"
                    maxLength={80}
                  />
                </label>
                <label>
                  Owner email *
                  <input
                    type="email"
                    value={form.ownerEmail}
                    onChange={onTextChange("ownerEmail")}
                    autoComplete="email"
                    maxLength={254}
                  />
                </label>
                <label>
                  Service-area label *
                  <input
                    value={form.serviceAreaLabel}
                    onChange={onTextChange("serviceAreaLabel")}
                    placeholder="Cedar County and nearby communities"
                    maxLength={160}
                  />
                </label>
                <label>
                  State or region *
                  <input
                    value={form.serviceAreaRegion}
                    onChange={onTextChange("serviceAreaRegion")}
                    placeholder="California"
                    autoComplete="address-level1"
                    maxLength={80}
                  />
                </label>
              </div>
              <div className={styles.derivedPreview} aria-label="Derived deployment labels">
                <div>
                  <span>Workspace slug</span>
                  <strong>{companySlug}</strong>
                </div>
                <div>
                  <span>Company initials</span>
                  <strong>{companyInitials}</strong>
                </div>
                <div>
                  <span>Document prefix</span>
                  <strong>{documentPrefix}</strong>
                </div>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <p className={styles.wizardEyebrow}>Step 3 · Services and brand</p>
              <h2>Describe what customers can request.</h2>
              <p className={styles.wizardIntro}>
                Choose only active services. Emergency language is shown only when
                emergency response is selected and later approved in configuration.
              </p>
              <div className={styles.serviceChoices}>
                {SERVICE_OPTIONS.map(([id, label, note]) => (
                  <label key={id}>
                    <input
                      type="checkbox"
                      checked={form.services.includes(id)}
                      onChange={() => toggleService(id)}
                    />
                    <span>
                      <strong>{label}</strong>
                      <small>{note}</small>
                    </span>
                  </label>
                ))}
              </div>
              <div className={styles.brandFields}>
                <label className={styles.colorField}>
                  Primary color
                  <div>
                    <input
                      type="color"
                      value={form.primaryColor}
                      onChange={(event) => update("primaryColor", event.target.value)}
                    />
                    <input
                      type="text"
                      value={form.primaryColor}
                      onChange={onTextChange("primaryColor")}
                      pattern="^#[0-9A-Fa-f]{6}$"
                      maxLength={7}
                    />
                  </div>
                </label>
                <label className={styles.colorField}>
                  Accent color
                  <div>
                    <input
                      type="color"
                      value={form.accentColor}
                      onChange={(event) => update("accentColor", event.target.value)}
                    />
                    <input
                      type="text"
                      value={form.accentColor}
                      onChange={onTextChange("accentColor")}
                      pattern="^#[0-9A-Fa-f]{6}$"
                      maxLength={7}
                    />
                  </div>
                </label>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <p className={styles.wizardEyebrow}>Step 4 · Address and launch goal</p>
              <h2>Choose how customers should find you.</h2>
              <p className={styles.wizardIntro}>
                An address shown here is requested, not reserved or verified. Domain
                ownership and DNS remain explicit setup gates.
              </p>
              <div className={styles.domainChoices}>
                <label>
                  <input
                    type="radio"
                    name="domain-mode"
                    checked={form.domainMode === "platform-subdomain"}
                    onChange={() => update("domainMode", "platform-subdomain")}
                  />
                  <span>
                    <strong>BagelTech platform address</strong>
                    <small>{companySlug}.contractors.bageltech.net · requested, subject to review</small>
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="domain-mode"
                    checked={form.domainMode === "custom-domain"}
                    onChange={() => update("domainMode", "custom-domain")}
                  />
                  <span>
                    <strong>Existing custom domain</strong>
                    <small>Provide the hostname you control; verification happens later.</small>
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="domain-mode"
                    checked={form.domainMode === "decide-later"}
                    onChange={() => update("domainMode", "decide-later")}
                  />
                  <span>
                    <strong>Decide during review</strong>
                    <small>Leave the requested address open until the setup conversation.</small>
                  </span>
                </label>
              </div>
              <div className={styles.wizardFields}>
                {form.domainMode === "custom-domain" ? (
                  <label className={styles.wide}>
                    Custom hostname *
                    <input
                      value={form.customDomain}
                      onChange={onTextChange("customDomain")}
                      placeholder="www.exampleelectric.com"
                      inputMode="url"
                      autoCapitalize="none"
                      maxLength={253}
                    />
                  </label>
                ) : null}
                <label className={styles.wide}>
                  What would make this launch successful? (optional)
                  <textarea
                    value={form.launchGoal}
                    onChange={onTextChange("launchGoal")}
                    maxLength={400}
                    placeholder="Share the operational goal, timing context, or migration concern BagelTech should review."
                  />
                </label>
              </div>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <p className={styles.wizardEyebrow}>Step 5 · Review and submit</p>
              <h2>Confirm the setup brief.</h2>
              <p className={styles.wizardIntro}>
                Submission records an immutable review request. It does not automatically
                create a customer, subscription, deployment, domain, or user account.
              </p>
              <dl className={styles.reviewList}>
                <div>
                  <dt>Template</dt>
                  <dd>{selectedTemplate.name}</dd>
                </div>
                <div>
                  <dt>Company</dt>
                  <dd>
                    {form.companyDisplayName}
                    <br />
                    {form.legalName}
                  </dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>
                    {form.ownerName}
                    <br />
                    {form.ownerEmail}
                  </dd>
                </div>
                <div>
                  <dt>Public contact</dt>
                  <dd>
                    {form.phoneDisplay}
                    <br />
                    {form.publicEmail}
                  </dd>
                </div>
                <div>
                  <dt>Service area</dt>
                  <dd>
                    {form.serviceAreaLabel}
                    <br />
                    {form.serviceAreaRegion}
                  </dd>
                </div>
                <div>
                  <dt>Active services</dt>
                  <dd>{form.services.join(", ")}</dd>
                </div>
                <div>
                  <dt>Requested address</dt>
                  <dd>{requestedHostname || "Decide during review"}</dd>
                </div>
                <div>
                  <dt>Derived labels</dt>
                  <dd>
                    {companySlug} · {companyInitials} · {documentPrefix}
                  </dd>
                </div>
              </dl>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                />
                <span>
                  I am authorized to submit this request and accept the{" "}
                  <Link href="/contractors/terms" target="_blank">
                    setup request terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/contractors/privacy" target="_blank">
                    privacy notice
                  </Link>
                  . I understand that submission is a request for review, not a purchase,
                  domain reservation, or automatic launch.
                </span>
              </label>
              <label
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px" }}
              >
                Company website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.companyWebsite}
                  onChange={onTextChange("companyWebsite")}
                />
              </label>
            </>
          ) : null}

          {error ? (
            <p className={styles.wizardError} role="alert">
              {error}
            </p>
          ) : null}

          <div className={styles.wizardActions}>
            {step > 0 ? (
              <button
                type="button"
                className={styles.wizardBack}
                onClick={() => {
                  setError("");
                  setStep((current) => current - 1);
                }}
              >
                ← Back
              </button>
            ) : null}
            {step < STEP_LABELS.length - 1 ? (
              <button type="button" className={styles.wizardNext} onClick={next}>
                Continue to {STEP_LABELS[step + 1]} →
              </button>
            ) : (
              <button
                type="button"
                className={styles.wizardNext}
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? "Recording request…" : "Submit for managed review →"}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
