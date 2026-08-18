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
            <div className={styles.heroCopy}>
              <BrandMark brand="bageltech" variant="light" size="hero" className={styles.heroMark} priority />
              <span className={styles.eyebrow}>Independent practice</span>
              <h1>
                Make consequential systems <em>answerable.</em>
              </h1>
              <p className={styles.lede}>
                BagelTech helps institutions put evidence, authority, and escalation into the systems they depend on.
              </p>
              <div className={styles.heroActions}>
                <SmartLink className={styles.btnPrimary} href="/research">
                  Explore the research <span className={styles.arrow}>&#8599;</span>
                </SmartLink>
                <SmartLink className={styles.btnSecondary} href="/contact">
                  Start a conversation <span className={styles.arrow}>&#8599;</span>
                </SmartLink>
              </div>
            </div>

            <aside className={styles.heroStatement}>
              <span className={styles.statementLabel}>A practical standard</span>
              <p>
                Important decisions should make clear what is known, what remains uncertain, and who is responsible
                for the next step.
              </p>
            </aside>
          </div>
        </section>

        <section className={styles.thesis}>
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>The work</span>
            <p>
              AI and modernization fail in a familiar way: the decision path becomes opaque just when its
              consequences become real. The work here makes that path visible—through durable evidence, explicit
              authority, and uncertainty that escalates rather than disappears.
            </p>
          </div>
        </section>

        <section className={styles.practices} id="practice">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>One practice, three applications</span>
              <h2>A single standard, applied through research, systems, and advisory.</h2>
            </div>
            <div className={styles.practiceGrid}>
              {practices.map((practice, index) => (
                <SmartLink key={practice.name} href={practice.href} className={styles.practice}>
                  <span className={styles.practiceNumber}>0{index + 1}</span>
                  <span className={styles.practiceLabel}>{practice.label}</span>
                  <h3>{practice.name}</h3>
                  <p>{practice.description}</p>
                  <span className={styles.practiceDetail}>
                    {practice.detail} <span className={styles.arrow}>&#8594;</span>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.work}>
          <div className={styles.wrap}>
            <div className={styles.workHead}>
              <div>
                <span className={styles.eyebrow}>Selected research</span>
                <h2>A public record, not a sales deck.</h2>
              </div>
              <SmartLink className={styles.textLink} href="/research">
                View all research <span className={styles.arrow}>&#8594;</span>
              </SmartLink>
            </div>

            <div className={styles.publications}>
              {selectedWork.map((publication) => (
                <SmartLink className={styles.publication} href={publication.sourceUrl} key={publication.slug}>
                  <span className={styles.publicationMeta}>
                    {formatDate(publication.publishedAt)}
                    <br />
                    {publication.source}
                  </span>
                  <div>
                    <h3>{publication.title}</h3>
                    <p>{publication.summary}</p>
                  </div>
                  <span className={styles.publicationAction}>
                    Read <span className={styles.arrow}>&#8599;</span>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.record}>
          <div className={styles.wrap}>
            <div className={styles.recordHead}>
              <span className={styles.eyebrow}>The record</span>
              <h2>Rigorous enough to review. Practical enough to run.</h2>
            </div>
            <div className={styles.recordGrid}>
              <div>
                <span className={styles.recordValue}>25+ years</span>
                <span className={styles.recordLabel}>public-sector technology and operational leadership</span>
              </div>
              <div>
                <span className={styles.recordValue}>$15M+</span>
                <span className={styles.recordLabel}>enterprise ERP programs directed</span>
              </div>
              <div>
                <span className={styles.recordValue}>PMP · CSM · DASSM</span>
                <span className={styles.recordLabel}>delivery and agile leadership credentials</span>
              </div>
              <div>
                <span className={styles.recordValue}>ORCID</span>
                <a className={styles.recordLink} href={ORCID_URL} target="_blank" rel="noopener noreferrer">
                  Review the public research record <span className={styles.arrow}>&#8599;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Start with context</span>
            <h2>Bring the system, program, or decision that needs a clearer path.</h2>
            <p>We can begin with the evidence, authority, and operating conditions already on the table.</p>
            <SmartLink className={styles.btnPrimary} href="/contact">
              Contact BagelTech <span className={styles.arrow}>&#8599;</span>
            </SmartLink>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
