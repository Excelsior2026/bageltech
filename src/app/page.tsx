import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import { CASE_STUDIES } from "@/content/case-studies";
import { PUBLICATIONS } from "@/content/publications";
import { ADVISORY_OFFERS, EXTERNAL_LINKS, PROOF_POINTS } from "@/content/site";
import { getAllArticles } from "@/lib/articles";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Bagelle Parris Vargas & BDB Labs",
  description:
    "BagelTech is the home of Bagelle Parris Vargas, an executive advisory firm for modernization and delivery risk, and BDB Labs, a research lab for governable AI and decision systems.",
  openGraph: {
    title: "BagelTech | Advisory that lands. Research that holds up.",
    description:
      "Bagelle Parris Vargas advises leadership teams through modernization. BDB Labs publishes the governance research behind it.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const PRODUCTS = [
  { title: "J-Box", body: "The operating platform for small trade contractors.", href: "/contractors" },
  {
    title: "Intelligent Contract Management",
    body: "Contract intelligence, obligations, compliance, and operational oversight.",
    href: "/products",
  },
  { title: "TrueTraining", body: "Adaptive institutional intelligence infrastructure.", href: "/products" },
  { title: "TruePresence", body: "Privacy-preserving interaction authenticity and risk signals.", href: "/products" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export default function HomePage() {
  const labsPublications = PUBLICATIONS.filter((item) => item.workstream === "BDB Labs");
  const featuredResearch = labsPublications
    .filter((item) => item.featured)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);
  const latestWriting = getAllArticles().slice(0, 3);

  return (
    <MarketingLayout>
      <main className={styles.home}>
        {/* ——— HERO: the two practices ——— */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>BagelTech · Advisory &amp; Research</p>
            <h1 className={styles.heroTitle}>
              Advisory that <em>lands.</em>
              <br />
              Research that <em>holds&nbsp;up.</em>
            </h1>
            <div className={styles.heroFoot}>
              <p className={styles.heroLede}>
                BagelTech is home to two practices. Bagelle Parris Vargas guides leadership teams through
                modernization and delivery risk. BDB Labs builds and publishes the governance research that the
                advisory work stands on.
              </p>
              <SmartLink href="/about" className={styles.heroLink}>
                About the founder <span aria-hidden="true">→</span>
              </SmartLink>
            </div>
          </div>

          <div className={`${styles.wrap} ${styles.doors}`}>
            <SmartLink href="/bpv/advisory" className={styles.door}>
              <div className={styles.doorHead}>
                <span aria-hidden="true">
                  <BrandMark brand="bpv" variant="icon-dark" size="hero" priority />
                </span>
                <span className={styles.doorIndex}>01</span>
              </div>
              <p className={styles.doorRole}>Advisory &amp; professional services</p>
              <h2 className={styles.doorTitle}>Bagelle Parris Vargas</h2>
              <p className={styles.doorText}>
                Executive advisory for leadership teams navigating modernization, ERP and PMO oversight, AI
                governance, and delivery risk.
              </p>
              <ul className={styles.doorList}>
                {ADVISORY_OFFERS.map((offer) => (
                  <li key={offer.slug}>{offer.title}</li>
                ))}
              </ul>
              <span className={styles.doorCta}>
                Engage the firm <span aria-hidden="true">→</span>
              </span>
            </SmartLink>

            <SmartLink href="/bdb-labs/research" className={styles.door}>
              <div className={styles.doorHead}>
                <span aria-hidden="true">
                  <BrandMark brand="bdb-labs" variant="icon-dark" size="hero" priority />
                </span>
                <span className={styles.doorIndex}>02</span>
              </div>
              <p className={styles.doorRole}>Research &amp; incubation</p>
              <h2 className={styles.doorTitle}>BDB Labs</h2>
              <p className={styles.doorText}>
                Governance methods, risk audits, and decision frameworks — developed as prototypes and published on
                Zenodo and arXiv.
              </p>
              <ul className={styles.doorList}>
                <li>ELEANOR runtime governance</li>
                <li>AIRA: AI-Induced Risk Audit</li>
                <li>{labsPublications.length} papers, frameworks, and specifications</li>
              </ul>
              <span className={styles.doorCta}>
                Enter the lab <span aria-hidden="true">→</span>
              </span>
            </SmartLink>
          </div>

          <div className={`${styles.wrap} ${styles.proof}`}>
            {PROOF_POINTS.map((point) => (
              <div key={point.value} className={styles.proofItem}>
                <p className={styles.proofValue}>{point.value}</p>
                <p className={styles.proofLabel}>{point.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ——— BAGELLE PARRIS VARGAS ——— */}
        <section className={styles.bpv} id="advisory" aria-labelledby="bpv-title">
          <div className={`${styles.wrap} ${styles.split}`}>
            <div className={styles.splitAside}>
              <span aria-hidden="true">
                <BrandMark brand="bpv" variant="icon" size="hero" />
              </span>
              <p className={styles.sectionKicker}>Executive advisory</p>
              <h2 id="bpv-title" className={styles.sectionTitle}>
                Bagelle Parris Vargas
              </h2>
              <p className={styles.statement}>
                Modernization that has to <em>land.</em>
              </p>
              <p className={styles.sectionLede}>
                For executives, public-sector leaders, and delivery sponsors who need experienced counsel when
                technology, procurement, and adoption risk meet one accountable operating model.
              </p>
              <div className={styles.actions}>
                <SmartLink href={EXTERNAL_LINKS.advisory} className={styles.buttonDark}>
                  Start an advisory inquiry
                </SmartLink>
                <SmartLink href="/bpv/case-studies" className={styles.buttonGhost}>
                  Case studies
                </SmartLink>
              </div>
            </div>

            <ol className={styles.offers}>
              {ADVISORY_OFFERS.map((offer, index) => (
                <li key={offer.slug} className={styles.offer}>
                  <span className={styles.offerIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.offerTitle}>{offer.title}</h3>
                    <p className={styles.offerText}>{offer.summary}</p>
                    <p className={styles.offerAudience}>{offer.audience}</p>
                    <ul className={styles.outcomes} aria-label="Outcomes">
                      {offer.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${styles.wrap} ${styles.applies}`}>
            <p className={styles.appliesLabel}>Where the work applies</p>
            <ul className={styles.appliesList}>
              {CASE_STUDIES.map((study) => (
                <li key={study.title}>
                  <SmartLink href="/bpv/case-studies">{study.title}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— BDB LABS ——— */}
        <section className={styles.labs} id="labs" aria-labelledby="labs-title">
          <div className={`${styles.wrap} ${styles.labsHead}`}>
            <div>
              <span aria-hidden="true">
                <BrandMark brand="bdb-labs" variant="icon-dark" size="hero" />
              </span>
              <p className={styles.sectionKickerDark}>Research &amp; incubation</p>
              <h2 id="labs-title" className={styles.sectionTitleDark}>
                BDB Labs
              </h2>
              <p className={styles.statementDark}>
                Governance research, <em>published in the open.</em>
              </p>
            </div>
            <div>
              <p className={styles.sectionLedeDark}>
                BDB Labs develops and tests the ideas behind BagelTech: runtime governance, ensemble reasoning, risk
                audits, and decision infrastructure. Every paper has a permanent public record.
              </p>
              <div className={styles.actions}>
                <SmartLink href="/bdb-labs/research" className={styles.buttonRose}>
                  Explore the research
                </SmartLink>
                <SmartLink href="/bdb-labs/repository" className={styles.buttonGhostDark}>
                  Document repository
                </SmartLink>
              </div>
            </div>
          </div>

          <div className={styles.wrap}>
            <ol className={styles.ledger}>
              {featuredResearch.map((item) => (
                <li key={item.slug}>
                  <SmartLink href={item.sourceUrl} className={styles.ledgerRow}>
                    <span className={styles.ledgerMeta}>
                      {formatDate(item.publishedAt)}
                      <span>
                        {item.category} · {item.source}
                      </span>
                    </span>
                    <span className={styles.ledgerBody}>
                      <span className={styles.ledgerTitle}>{item.title}</span>
                      <span className={styles.ledgerText}>{item.summary}</span>
                    </span>
                    <span className={styles.ledgerArrow} aria-hidden="true">
                      ↗
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ol>
            <p className={styles.ledgerFoot}>
              <SmartLink href="/bdb-labs/research">All {labsPublications.length} publications</SmartLink> · Full
              record on <SmartLink href={EXTERNAL_LINKS.orcid}>ORCID</SmartLink>
            </p>
          </div>
        </section>

        {/* ——— BAGELTECH PRODUCTS ——— */}
        <section className={styles.products} aria-labelledby="products-title">
          <div className={`${styles.wrap} ${styles.productsHead}`}>
            <p className={styles.sectionKicker}>Built by BagelTech</p>
            <h2 id="products-title" className={styles.productsTitle}>
              Where the advice and the research become software.
            </h2>
            <SmartLink href="/products" className={styles.textLink}>
              All products →
            </SmartLink>
          </div>
          <div className={`${styles.wrap} ${styles.productGrid}`}>
            {PRODUCTS.map((product) => (
              <SmartLink key={product.title} href={product.href} className={styles.productCard}>
                <h3>{product.title}</h3>
                <p>{product.body}</p>
                <span aria-hidden="true">→</span>
              </SmartLink>
            ))}
          </div>
        </section>

        {/* ——— WRITING ——— */}
        {latestWriting.length > 0 && (
          <section className={styles.writing} aria-labelledby="writing-title">
            <div className={`${styles.wrap} ${styles.productsHead}`}>
              <p className={styles.sectionKicker}>Writing</p>
              <h2 id="writing-title" className={styles.productsTitle}>
                Notes on governance, leadership, and delivery.
              </h2>
              <SmartLink href="/insights" className={styles.textLink}>
                All writing →
              </SmartLink>
            </div>
            <div className={`${styles.wrap} ${styles.writingGrid}`}>
              {latestWriting.map((article) => (
                <SmartLink key={article.slug} href={`/insights/${article.slug}`} className={styles.writingCard}>
                  <span className={styles.writingDate}>{formatDate(article.date)}</span>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </SmartLink>
              ))}
            </div>
          </section>
        )}

        {/* ——— CLOSING: two ways in ——— */}
        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.wrap}>
            <h2 id="closing-title" className={styles.closingTitle}>
              Two ways <em>in.</em>
            </h2>
            <div className={styles.closingGrid}>
              <SmartLink href={EXTERNAL_LINKS.advisory} className={styles.closingCard}>
                <span className={styles.closingRole}>Bagelle Parris Vargas</span>
                <span className={styles.closingText}>
                  Advisory, modernization oversight, workshops, or speaking.
                </span>
                <span className={styles.closingCta}>Request advisory support →</span>
              </SmartLink>
              <SmartLink href={EXTERNAL_LINKS.research} className={styles.closingCard}>
                <span className={styles.closingRole}>BDB Labs</span>
                <span className={styles.closingText}>Research collaboration, frameworks, papers, or prototypes.</span>
                <span className={styles.closingCta}>Propose a collaboration →</span>
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
