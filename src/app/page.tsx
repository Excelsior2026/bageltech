import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import { PUBLICATIONS } from "@/content/publications";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Governance for Consequential Systems",
  description:
    "BagelTech is an independent research, systems, and advisory practice for consequential systems. Founded and led by Bill Parris.",
  openGraph: {
    title: "BagelTech | Governance for Consequential Systems",
    description:
      "Independent research, systems, and advisory for institutions working through consequential change.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const ORCID_URL = "https://orcid.org/0009-0001-6994-6828";

const practices = [
  {
    name: "BDB Labs",
    label: "Research",
    description:
      "Research and working frameworks for governable intelligence, institutional memory, and reviewable decision systems.",
    detail: "Publications, frameworks, and prototypes",
    href: "/research",
  },
  {
    name: "BagelTech",
    label: "Systems",
    description:
      "Products and operating patterns that give consequential workflows clear evidence, boundaries, and escalation paths.",
    detail: "Products, pilots, and implementation",
    href: "/products",
  },
  {
    name: "Bagelle Parris Vargas",
    label: "Advisory",
    description:
      "Executive support for modernization, delivery governance, and institutions that need change to land responsibly.",
    detail: "Modernization, ERP/PMO, and workshops",
    href: "/advisory",
  },
];

const selectedWork = PUBLICATIONS.filter((publication) => publication.featured).slice(0, 3);

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

export default function HomePage() {
  return (
    <MarketingLayout>
      <main className={styles.home}>
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroInner}>
              <div className={styles.heroCopy}>
                <BrandMark brand="bageltech" variant="light" size="hero" className={styles.heroMark} priority />
                <span className={styles.eyebrow}>Independent Practice</span>
                <h1>
                  Make consequential systems <em className={styles.italic}>answerable.</em>
                </h1>
                <p className={styles.lede}>
                  BagelTech provides the research, systems, and advisory necessary to embed evidence, authority, and escalation into the critical infrastructure of modern institutions.
                </p>
                <div className={styles.heroActions}>
                  <SmartLink className={styles.btnPrimary} href="/bdb-labs">
                    Explore Research
                  </SmartLink>
                  <SmartLink className={styles.btnSecondary} href="/contact">
                    Start a Conversation
                  </SmartLink>
                </div>
              </div>

              <aside className={styles.heroStatement}>
                <span className={styles.statementLabel}>The Standard</span>
                <p>
                  Important decisions should make clear what is known, what remains uncertain, and who is responsible for the next step.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.architecture}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Organizational Logic</span>
              <h2>A unified standard, three applications.</h2>
            </div>
            <div className={styles.archGrid}>
              <SmartLink href="/bdb-labs" className={styles.archCard}>
                <span className={styles.archRole}>Research & Development</span>
                <h3>BDB Labs</h3>
                <p className={styles.archDesc}>Developing the frameworks for governable intelligence and institutional memory.</p>
              </SmartLink>
              <SmartLink href="/products" className={styles.archCard}>
                <span className={styles.archRole}>Systems & Platforms</span>
                <h3>BagelTech</h3>
                <p className={styles.archDesc}>Commercial platforms that translate governance into operating reality.</p>
              </SmartLink>
              <SmartLink href="/bpv" className={styles.archCard}>
                <span className={styles.archRole}>Services & Delivery</span>
                <h3>Bagelle Parris Vargas</h3>
                <p className={styles.archDesc}>Executive advisory for modernization, delivery risk, and transformation oversight.</p>
              </SmartLink>
            </div>
          </div>
        </section>

        <section className={styles.evidence}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>What We Build</span>
              <h2>Evidence of capability.</h2>
            </div>
            <div className={styles.evidenceGrid}>
              <div className={styles.pillar}>
                <h4>AI Governance & Alignment</h4>
                <div className={styles.projectList}>
                  <SmartLink href="/bdb-labs/research" className={styles.projectItem}>
                    <span>ELEANOR Governance Engine</span>
                  </SmartLink>
                  <SmartLink href="/bdb-labs/publications" className={styles.projectItem}>
                    <span>Constitutional AI Frameworks</span>
                  </SmartLink>
                </div>
              </div>
              <div className={styles.pillar}>
                <h4>AI Safety & Evaluation</h4>
                <div className={styles.projectList}>
                  <SmartLink href="/bdb-labs/publications" className={styles.projectItem}>
                    <span>AIRA: AI-Induced Risk Audit</span>
                  </SmartLink>
                  <SmartLink href="/bdb-labs/publications" className={styles.projectItem}>
                    <span>Semantic Reward Collapse Research</span>
                  </SmartLink>
                </div>
              </div>
              <div className={styles.pillar}>
                <h4>Enterprise Systems</h4>
                <div className={styles.projectList}>
                  <SmartLink href="/products/contractors" className={styles.projectItem}>
                    <span>Electrical Contractor Platform</span>
                  </SmartLink>
                  <SmartLink href="/products" className={styles.projectItem}>
                    <span>Contract Management Intelligence</span>
                  </SmartLink>
                </div>
              </div>
              <div className={styles.pillar}>
                <h4>Modernization & Delivery</h4>
                <div className={styles.projectList}>
                  <SmartLink href="/bpv/advisory" className={styles.projectItem}>
                    <span>ERP/PMO Governance Review</span>
                  </SmartLink>
                  <SmartLink href="/bpv/case-studies" className={styles.projectItem}>
                    <span>Transformation Oversight</span>
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.writing}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Intellectual Output</span>
              <h2>Writing and Research.</h2>
            </div>
            <div className={styles.writingList}>
              {PUBLICATIONS.filter(p => p.featured).slice(0, 4).map(pub => (
                <SmartLink key={pub.slug} href={pub.sourceUrl} className={styles.writingRow}>
                  <span className={styles.wDate}>{pub.publishedAt.split('-')[0]}</span>
                  <span className={styles.wCat}>{pub.category}</span>
                  <span className={styles.wTitle}>{pub.title}</span>
                  <span className={styles.wArrow}>&#8594;</span>
                </SmartLink>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <SmartLink href="/insights" className={styles.btnSecondary}>
                View the Full Archive
              </SmartLink>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Next Steps</span>
            <h2>Bring the system, program, or decision that needs a clearer path.</h2>
            <SmartLink href="/contact" className={styles.btnPrimary}>
              Contact BagelTech
            </SmartLink>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
