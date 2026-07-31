import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import { PUBLICATIONS } from "@/content/publications";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Governance for Consequential Systems",
  description:
    "BagelTech is an independent research and engineering practice for the governance of consequential systems — AI that escalates instead of guessing, and public institutions that modernize without losing their memory. Founded and led by Bill Parris.",
  openGraph: {
    title: "BagelTech | Governance for Consequential Systems",
    description:
      "Independent research and engineering on the governance of consequential systems — AI and public-sector modernization. Founded and led by Bill Parris.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const ORCID_URL = "https://orcid.org/0009-0001-6994-6828";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

const selectedWork = PUBLICATIONS.filter((p) => p.featured).slice(0, 5);

export default function HomePage() {
  return (
    <MarketingLayout>
      <main className={styles.home}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <BrandMark brand="bageltech" variant="light" size="hero" className={styles.heroMark} priority />
            <span className={styles.eyebrow}>Governance for consequential systems</span>
            <h1>
              Consequential systems should be able to <em>show their work.</em>
            </h1>
            <p className={styles.lede}>
              BagelTech is an independent research and engineering practice working on the governance of
              consequential systems — <b>AI that escalates instead of guessing, and public institutions that
              modernize without losing their memory.</b> Founded and led by Bill Parris.
            </p>
            <div className={styles.heroActions}>
              <SmartLink className={`${styles.btn} ${styles.btnPrimary}`} href="/research">
                Explore the research <span className={styles.arrow}>&#8599;</span>
              </SmartLink>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#modes">
                How the work moves
              </a>
            </div>
            <p className={styles.proofline}>
              Peer-reviewed and preprinted on <b>arXiv &middot; Zenodo &middot; ORCID</b> — every reference
              resolves to a permanent source.
            </p>
          </div>
        </section>

        {/* THESIS */}
        <section className={styles.thesis}>
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>The through-line</span>
            <p>
              Across AI and public institutions, the same failure repeats: consequential decisions made by
              systems no one can fully review. The answer isn&apos;t more trust — it&apos;s <b>structure</b>.
              Visible authority, durable evidence, and uncertainty that escalates instead of hiding.
            </p>
          </div>
        </section>

        <section className={styles.contractorCallout}>
          <div className={styles.wrap}>
            <div className={styles.contractorCalloutLabel}>
              <span className={styles.eyebrow}>Managed setup requests open</span>
              <span>Contractor operations</span>
            </div>
            <div className={styles.contractorCalloutCopy}>
              <h2>A working platform for electrical contractors—not another disconnected brochure site.</h2>
              <p>
                Compare six customer-facing templates, then build a reviewable setup brief for service intake,
                customers, estimates, jobs, invoices, and manual receipt records.
              </p>
            </div>
            <SmartLink className={styles.contractorCalloutLink} href="/contractors">
              Explore the contractor platform <span className={styles.arrow}>&#8594;</span>
            </SmartLink>
          </div>
        </section>

        {/* THREE MODES */}
        <section className={styles.modes} id="modes">
          <div className={styles.wrap}>
            <div className={styles.modesHead}>
              <span className={styles.eyebrow}>One practice, three modes</span>
              <h2>
                Three names, one body of work. Research develops the frameworks; engineering turns them into
                systems institutions can run; advisory carries both into modernization work where the stakes are
                real.
              </h2>
            </div>
            <div className={styles.modesGrid}>
              <div className={styles.mode}>
                <span className={styles.tag}>BDB Labs</span>
                <h3>Research &amp; frameworks</h3>
                <p>
                  Constitutional and jurisprudential approaches to governing AI — the ELEANOR engine, the AIRA
                  inspection method, and the doctrine of intelligence pluralism.
                </p>
                <span className={styles.metaLine}>arXiv &middot; Zenodo &middot; peer review</span>
              </div>
              <div className={styles.mode}>
                <span className={styles.tag}>BagelTech Systems</span>
                <h3>Products &amp; platforms</h3>
                <p>
                  The frameworks turned into tools institutions can run — including the AIRA code-risk scanner and
                  constitutional runtime tooling for governable AI.
                </p>
                <span className={styles.metaLine}>aira.bageltech.net</span>
              </div>
              <div className={styles.mode}>
                <span className={styles.tag}>Bagelle Parris Vargas</span>
                <h3>Advisory &amp; modernization</h3>
                <p>
                  Continuity-centered modernization, ERP and PMO oversight, and transformation work for
                  public-sector institutions — with 25 years of delivery behind it.
                </p>
                <span className={styles.metaLine}>public sector &middot; governance &middot; PMO</span>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section className={styles.work} id="work">
          <div className={styles.wrap}>
            <div className={styles.workHead}>
              <div className={styles.htext}>
                <span className={styles.eyebrow}>Selected work</span>
                <h2>A public record, not a pitch.</h2>
                <p>A sample of the research behind the practice. The full record lives on the research page.</p>
              </div>
              <SmartLink className={styles.seeall} href="/research">
                All research &amp; publications <span className={styles.arrow}>&#8594;</span>
              </SmartLink>
            </div>
            <div>
              {selectedWork.map((p) => (
                <SmartLink className={styles.pub} href={p.sourceUrl} key={p.slug}>
                  <div className={styles.pubMeta}>
                    {formatDate(p.publishedAt)}
                    <br />
                    <span className={styles.venue}>{p.source}</span>
                  </div>
                  <div className={styles.pubBody}>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                  </div>
                  <span className={styles.pubLink}>
                    Read <span className={styles.arrow}>&#8599;</span>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        {/* RECORD STRIP */}
        <section className={styles.record}>
          <div className={styles.wrap}>
            <div className={styles.recordGrid}>
              <div>
                <span className={styles.recN}>25+ yrs</span>
                <span className={styles.recL}>public-sector technology &amp; operational leadership</span>
              </div>
              <div>
                <span className={styles.recN}>$15M+</span>
                <span className={styles.recL}>enterprise ERP programs directed</span>
              </div>
              <div>
                <span className={styles.recN}>PMP &middot; CSM &middot; DASSM</span>
                <span className={styles.recL}>delivery &amp; agile leadership credentials</span>
              </div>
              <div>
                <span className={styles.recN}>12 works</span>
                <span className={styles.recL}>
                  on the public{" "}
                  <a href={ORCID_URL} target="_blank" rel="noopener noreferrer">
                    ORCID record
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP TEASER */}
        <section className={styles.lead} id="leadership">
          <div className={styles.wrap}>
            <div>
              <span className={styles.eyebrow}>Leadership</span>
              <h2>The work is led by a practitioner who turned the operating problem into a research program.</h2>
            </div>
            <div className={styles.leadBody}>
              <p>
                Bill Parris spent more than two decades leading technology in government — most recently as
                Director of Business Information &amp; Technology Services at SANDAG, and before that in senior
                roles at Riverside University Health System.
              </p>
              <p>
                The same problem kept recurring: consequential decisions made by systems no one could fully
                review. BagelTech is the research and practice built around solving it — bringing the discipline
                of governance, evidence, and accountability to both AI and the institutions modernizing around
                it.
              </p>
              <SmartLink className={styles.seeall} href="/about">
                More on the leadership &amp; the record <span className={styles.arrow}>&#8594;</span>
              </SmartLink>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta} id="contact">
          <div className={styles.wrap}>
            <span className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>Start a conversation</span>
            <h2>Modernization, governance, and AI work begins with the right context.</h2>
            <div className={styles.heroActions}>
              <SmartLink className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Get in touch <span className={styles.arrow}>&#8599;</span>
              </SmartLink>
              <a
                className={`${styles.btn} ${styles.btnGhost}`}
                href={ORCID_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the ORCID record
              </a>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
