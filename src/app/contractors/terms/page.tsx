import type { Metadata } from "next";
import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import styles from "@/components/onboarding/Onboarding.module.css";

export const metadata: Metadata = {
  title: "Contractor Setup Request Terms | BagelTech",
  robots: { index: false, follow: true },
};

export default function ContractorTermsPage() {
  return (
    <MarketingLayout>
      <main className={styles.noticePage}>
        <article className={styles.noticeInner}>
          <p className={styles.wizardEyebrow}>contractor-platform-onboarding-v1</p>
          <h1>Contractor setup request terms</h1>
          <p>Effective July 30, 2026; clarified August 7, 2026.</p>
          <p>
            These terms govern submission of the BagelTech electrical-contractor setup
            request. By submitting, you confirm that you are authorized to provide the
            information for the named business and that it is accurate to the best of
            your knowledge.
          </p>

          <h2>A submission is a request, not an activation</h2>
          <p>
            Submitting the form places a request in a managed review queue. It does not
            create a customer account, reserve or verify a domain, establish a
            subscription, provision infrastructure, promise a launch date, or guarantee
            acceptance.
          </p>

          <h2>Review and follow-up</h2>
          <p>
            BagelTech may contact the proposed owner to validate the request, clarify
            requirements, confirm authority, and discuss scope or commercial terms.
            Provisioning can begin only after BagelTech separately accepts the request.
          </p>

          <h2>Templates, custom drafts, and submitted material</h2>
          <p>
            A template selection is a starting direction and may be changed during
            review. A Custom Studio blueprint is also a draft: AI assistance may propose
            its structured presentation and copy, or a guided fallback may produce it
            when AI assistance is unavailable. Every draft requires human review and does
            not publish a site, connect field-application resources, or verify a technical
            integration. You are responsible for confirming that business descriptions,
            qualifications, availability, service claims, and other factual statements
            are accurate and supportable before launch.
          </p>
          <p>
            You confirm that BagelTech may use the submitted business information,
            service descriptions, colors, brief, generated blueprint, and requested
            domain details to evaluate and prepare the proposed setup. Do not submit
            confidential customer records, sensitive personal data, payment information,
            passwords, or secret keys.
          </p>

          <h2>No emergency-service promise</h2>
          <p>
            Selecting emergency response describes a service the contractor proposes to
            offer. It does not itself publish availability or create a BagelTech emergency
            response obligation. Customer-facing safety and availability language remains
            subject to configuration and launch review.
          </p>

          <h2>Questions</h2>
          <p>
            Contact{" "}
            <a href="mailto:bill@bageltech.net?subject=Contractor setup terms">
              bill@bageltech.net
            </a>{" "}
            with questions about the request process.
          </p>

          <p>
            <Link href="/contractors">Return to the contractor platform</Link>
          </p>
        </article>
      </main>
    </MarketingLayout>
  );
}
