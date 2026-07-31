import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import TemplateGallery from "@/components/onboarding/TemplateGallery";
import styles from "@/components/onboarding/Onboarding.module.css";

export const metadata: Metadata = {
  title: "Electrical Contractor Platform | BagelTech",
  description:
    "Choose a public-site template and request a managed BagelTech setup for electrical service intake, customers, estimates, jobs, invoices, and receipts.",
  alternates: {
    canonical: "https://www.bageltech.net/contractors",
  },
  openGraph: {
    title: "A managed operating platform for electrical contractors",
    description:
      "Six customer-facing templates, one safety-first intake and office workflow, and a guided path to managed setup.",
    url: "https://www.bageltech.net/contractors",
    type: "website",
  },
};

const workflow = [
  {
    title: "Choose a direction",
    body: "Compare six distinct public-site compositions. Your selection changes presentation, not the underlying service and safety controls.",
  },
  {
    title: "Describe the business",
    body: "Provide company, owner, service-area, service, brand, and requested-domain details through the guided setup form.",
  },
  {
    title: "Complete managed setup",
    body: "BagelTech reviews the request, confirms the commercial scope, and works through identity, domain, sender, data, and backup gates.",
  },
  {
    title: "Verify before launch",
    body: "The site and staff workflow are smoke-tested before the requested address is connected and the contractor is marked ready.",
  },
];

const gates = [
  ["01", "Request review", "BagelTech confirms fit and scope"],
  ["02", "Owner and identity", "Invitation and access setup"],
  ["03", "Domain and sender", "Verification requires customer action"],
  ["04", "Data and backup", "Migrations and restore checks"],
  ["05", "Launch review", "Smoke test before activation"],
];

export default function ContractorsPage() {
  return (
    <MarketingLayout>
      <main className={styles.platformPage}>
        <section className={styles.launchHero}>
          <Image
            src="/contractor-electrician.png"
            alt="An electrician working carefully inside a residential electrical panel."
            fill
            priority
            sizes="100vw"
            className={styles.launchHeroImage}
          />
          <div className={styles.launchHeroShade} />
          <div className={styles.launchHeroInner}>
            <p className={styles.launchEyebrow}>Managed contractor platform</p>
            <h1 className={styles.launchTitle}>
              Your company.
              <br />
              One <em>working system.</em>
            </h1>
            <p className={styles.launchLede}>
              A customer-ready public site and private office workflow for electrical
              contractors—from safety-first service requests through estimates, jobs,
              invoices, and manually recorded receipts.
            </p>
            <div className={styles.launchActions}>
              <Link className={styles.launchPrimary} href="#templates">
                Compare six templates <span aria-hidden="true">↓</span>
              </Link>
              <Link className={styles.launchSecondary} href="/get-started">
                Start the setup request <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className={styles.launchProof} aria-label="Included workflow">
            <span>Public site</span>
            <span>Service intake</span>
            <span>Estimates</span>
            <span>Jobs</span>
            <span>Invoices</span>
          </div>
        </section>

        <section className={styles.platformSection} id="templates">
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Six public-site directions</p>
              <h2>A real choice of character, without six different products.</h2>
            </div>
            <p>
              Each direction uses the same structured company information and the same
              deterministic safety and intake workflow. Switch the presentation without
              forking the operating system behind it.
            </p>
          </header>
          <TemplateGallery />
        </section>

        <section className={styles.workflowSection}>
          <div className={styles.workflowInner}>
            <header className={styles.workflowIntro}>
              <div>
                <p className={styles.sectionEyebrow}>From choice to launch</p>
                <h2>A guided request, followed by a managed handoff.</h2>
              </div>
              <p>
                The wizard captures what BagelTech needs to begin. Submission records a
                request; it does not create accounts, reserve a domain, or declare the
                business live.
              </p>
            </header>
            <div className={styles.workflow}>
              {workflow.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.transparencyInner}>
          <div className={styles.transparencyCopy}>
            <p className={styles.sectionEyebrow}>What “get running” means</p>
            <h2>Every launch gate stays visible.</h2>
            <p>
              Managed setup includes human review and explicit verification. Domain,
              sender, identity, backup, and launch checks cannot be skipped by the public
              form. Paris Electric is the current dedicated canary and can be viewed at{" "}
              <a href="https://pariselectric.bageltech.net">pariselectric.bageltech.net</a>.
            </p>
          </div>
          <div className={styles.gateList}>
            {gates.map(([number, title, note]) => (
              <div key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <p className={styles.sectionEyebrow}>Setup requests are open</p>
          <h2>Pick a direction. Give us the operating context.</h2>
          <p>
            The guided request takes a few minutes. BagelTech will review it before any
            infrastructure or commercial commitment is created.
          </p>
          <Link className={styles.finalAction} href="/get-started">
            Start the guided request <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    </MarketingLayout>
  );
}
