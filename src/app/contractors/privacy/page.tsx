import type { Metadata } from "next";
import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import styles from "@/components/onboarding/Onboarding.module.css";

export const metadata: Metadata = {
  title: "Contractor Setup Privacy Notice | BagelTech",
  robots: { index: false, follow: true },
};

export default function ContractorPrivacyPage() {
  return (
    <MarketingLayout>
      <main className={styles.noticePage}>
        <article className={styles.noticeInner}>
          <p className={styles.wizardEyebrow}>contractor-platform-privacy-v1</p>
          <h1>Contractor setup privacy notice</h1>
          <p>Effective July 30, 2026; clarified August 7, 2026.</p>
          <p>
            This notice covers the information submitted through BagelTech&apos;s
            electrical-contractor setup request. It does not replace any later agreement
            or privacy notice for an activated customer deployment.
          </p>

          <h2>Information the request collects</h2>
          <p>
            The form collects company and owner contact information, service area,
            services, brand choices, requested domain information, template or custom-site
            selection, launch context, consent versions, and submission time. A Custom
            Studio brief can also include audience, tone, conversion goal, company story,
            differentiators, project focus, and words to avoid. The receiving service also
            uses request metadata to prevent abuse. A keyed, opaque rate-limit value is
            derived from network and owner-email context; the raw network address is not
            included in the onboarding record.
          </p>

          <h2>AI-assisted blueprint processing</h2>
          <p>
            When AI assistance is configured and available, the Custom Studio sends the
            bounded business brief to BagelTech&apos;s managed model provider to propose a
            structured website blueprint. The brief does not request customer records,
            payment information, passwords, secret keys, or sensitive personal data, and
            you should not enter any of those items. If AI assistance is unavailable, the
            same structured inputs use a built-in guided fallback instead. The result
            records whether AI assistance or the built-in fallback was used.
          </p>
          <p>
            Optional story, differentiator, project-focus, and words-to-avoid text is
            processed while the draft is generated. If you later submit the managed
            onboarding request, its signed payload carries the resulting structured
            blueprint and a cryptographic brief hash—not those raw optional brief fields.
          </p>

          <h2>How the information is used</h2>
          <p>
            BagelTech uses the information to review the request, communicate with the
            proposed owner, assess setup requirements, protect the intake service, and—if
            the request is separately accepted—prepare a managed deployment. The public
            form cannot activate infrastructure or accounts.
          </p>

          <h2>Where the information goes</h2>
          <p>
            The BagelTech website sends a signed request to the contractor platform&apos;s
            private control service. Authorized platform operators can review the record.
            Service providers that host or secure those systems may process the data for
            those purposes. When the Custom Studio uses AI assistance, the managed model
            provider processes the bounded business brief for blueprint generation before
            any final onboarding request is submitted.
          </p>

          <h2>Retention and requests</h2>
          <p>
            Request records and security events are retained as needed to evaluate setup,
            preserve an audit trail, prevent abuse, and meet operational or legal
            obligations. To ask about, correct, or request deletion of submitted
            information, email{" "}
            <a href="mailto:bill@bageltech.net?subject=Contractor setup privacy request">
              bill@bageltech.net
            </a>
            . Some records may need to be retained for security, audit, or legal reasons.
          </p>

          <p>
            <Link href="/contractors">Return to the contractor platform</Link>
          </p>
        </article>
      </main>
    </MarketingLayout>
  );
}
