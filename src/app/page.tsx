import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Technology & Intelligence",
  description:
    "BagelTech develops intelligent systems, explores what comes next, and helps organizations put technology to work in the real world.",
  openGraph: {
    title: "BagelTech | Technology & Intelligence",
    description:
      "Technology built to make complex things more understandable, governable, and useful.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

export default function HomePage() {
  return (
    <MarketingLayout>
      <main className={styles.home}>
        {/* ——— HERO + DIAGRAM ——— */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 className={styles.heroTitle}>
                  Technology built to make complex things more understandable, governable, and <em>useful.</em>
                </h1>
                <hr className={styles.rule} />
                <p className={styles.lede}>
                  BagelTech develops intelligent systems, explores what comes next, and helps organizations put technology to work in the real world.
                </p>
              </div>

              <div className={styles.diagramWrap} aria-hidden="true">
                <div className={styles.diagramInner}>
                  {/* Arcs */}
                  <svg className={styles.diagramSvg} viewBox="0 0 560 260" preserveAspectRatio="none">
                    {/* outer arc over top */}
                    <path d="M 92 136 A 210 210 0 0 1 468 136" fill="none" stroke="#C9C2B5" strokeWidth="1.2" />
                    <circle cx="92" cy="136" r="3.5" fill="#C9C2B5" />
                    <circle cx="468" cy="136" r="3.5" fill="#C9C2B5" />
                    {/* inner arc below top */}
                    <path d="M 148 172 A 190 85 0 0 0 412 172" fill="none" stroke="#C9C2B5" strokeWidth="1" />
                    <circle cx="280" cy="142" r="3" fill="#FFFEF7" stroke="#C9C2B5" strokeWidth="1.2" />
                  </svg>

                  <div className={`${styles.logoPos} ${styles.posTop}`}>
                    <img src="/brand/bageltech/icon.svg" alt="" width={118} height={118} />
                    <div className={styles.posTopLabel}>
                      <strong>BagelTech</strong>
                      <span>THE COMPANY</span>
                    </div>
                  </div>

                  <div className={`${styles.logoPos} ${styles.posLeft}`}>
                    <img src="/brand/bdb-labs/icon.svg" alt="" width={132} height={132} />
                  </div>

                  <div className={`${styles.logoPos} ${styles.posRight}`}>
                    <img src="/brand/bpv/icon.svg" alt="" width={160} height={160} />
                  </div>

                  <p className={styles.diagramCaption}>
                    Research creates new possibilities. Experience turns them into impact. Together, we build what matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ——— TRIPTYCH ——— */}
        <section className={styles.triptych} aria-label="Three pillars">
          <SmartLink href="/products" className={`${styles.panel} ${styles.panelNavy}`}>
            <p className={styles.kicker}>Build</p>
            <h2 className={styles.panelTitle}>Products</h2>
            <div className={styles.panelRule} />
            <p className={styles.panelText}>Software solutions designed to solve real operational problems and improve how work gets done.</p>
            <span className={styles.panelCta}>EXPLORE PRODUCTS →</span>
            <svg className={styles.panelIcon} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M32 10 L54 20 L32 30 L10 20 Z" /><path d="M10 20 V40 L32 50 L54 40 V20" /><path d="M32 30 V50" />
            </svg>
          </SmartLink>

          <SmartLink href="/bdb-labs/research" className={`${styles.panel} ${styles.panelNavy}`}>
            <p className={styles.kicker}>Explore</p>
            <h2 className={styles.panelTitle}>BDB Labs</h2>
            <div className={styles.panelRule} />
            <p className={styles.panelText}>Pushing the boundaries of intelligence, governance, reasoning, and trustworthy systems through research and development.</p>
            <span className={styles.panelCta}>EXPLORE RESEARCH →</span>
            <svg className={styles.panelIcon} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="14" /><circle cx="32" cy="32" r="6" />
              <path d="M32 4 V60 M4 32 H60" />
            </svg>
          </SmartLink>

          <SmartLink href="/bpv/advisory" className={`${styles.panel} ${styles.panelGarnet}`}>
            <p className={styles.kicker}>Deliver</p>
            <h2 className={styles.panelTitle}>Bagelle Parris Vargas</h2>
            <div className={styles.panelRule} />
            <p className={styles.panelText}>Advisory and professional services that help organizations navigate complexity, adopt technology responsibly, and achieve results.</p>
            <span className={styles.panelCta}>EXPLORE SERVICES →</span>
            <svg className={`${styles.panelIcon} ${styles.panelIconGarnet}`} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <circle cx="32" cy="18" r="8" /><circle cx="16" cy="40" r="7" /><circle cx="48" cy="40" r="7" />
              <path d="M12 56 C12 44 20 38 32 38 C44 38 52 44 52 56" />
            </svg>
          </SmartLink>
        </section>

        {/* ——— PRODUCTS + INSIGHTS ——— */}
        <section className={styles.productsStrip}>
          <div className={styles.wrap}>
            <div className={styles.stripGrid}>
              <div className={styles.sideHead}>
                <p className={styles.sideKicker}>OUR PRODUCTS</p>
                <h2 className={styles.sideTitle}>Systems that help teams work better every day.</h2>
                <SmartLink href="/products" className={styles.sideLink}>VIEW ALL PRODUCTS →</SmartLink>
              </div>

              <div className={styles.cardsGrid}>
                <SmartLink href="/contractors" className={styles.productCard}>
                  <span className={`${styles.cardIcon} ${styles.cardIconJ}`}>J</span>
                  <h3 className={styles.cardTitle}>J-Box</h3>
                  <p className={styles.cardDesc}>The operating platform for small trade contractors.</p>
                  <span className={styles.cardCta}>LEARN MORE →</span>
                </SmartLink>

                <SmartLink href="/products" className={styles.productCard}>
                  <span className={`${styles.cardIcon} ${styles.cardIconShield}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2L4 5v6c0 5 3.4 9.1 8 10 4.6-.9 8-5 8-10V5L12 2zm-1 14H8v-2h3V9h2v5h3v2h-3v1h-2v-1z"/></svg>
                  </span>
                  <h3 className={styles.cardTitle}>Intelligent Contract Management</h3>
                  <p className={styles.cardDesc}>Contract intelligence, obligations, compliance, and operational oversight.</p>
                  <span className={styles.cardCta}>LEARN MORE →</span>
                </SmartLink>

                <SmartLink href="/products" className={styles.productCard}>
                  <span className={`${styles.cardIcon} ${styles.cardIconCap}`}>
                    <svg width="26" height="22" viewBox="0 0 24 20" fill="currentColor" aria-hidden="true"><path d="M12 3L1 9l11 6 9-4.9V16h2V9L12 3zM5 11.2l7 3.8 7-3.8-7-3.8-7 3.8z"/></svg>
                  </span>
                  <h3 className={styles.cardTitle}>TrueTraining</h3>
                  <p className={styles.cardDesc}>Adaptive institutional intelligence infrastructure.</p>
                  <span className={styles.cardCta}>LEARN MORE →</span>
                </SmartLink>

                <SmartLink href="/products" className={styles.productCard}>
                  <span className={`${styles.cardIcon} ${styles.cardIconPrint}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3a7 7 0 0 1 7 7v5M12 3a7 7 0 0 0-7 7v5M12 7a3 3 0 0 1 3 3v5M12 7a3 3 0 0 0-3 3v5"/><path d="M9 18c0-1 .7-1.5 1.5-1.5h3c.8 0 1.5.5 1.5 1.5v2H9z"/></svg>
                  </span>
                  <h3 className={styles.cardTitle}>TruePresence</h3>
                  <p className={styles.cardDesc}>Privacy-preserving interaction authenticity and risk signals.</p>
                  <span className={styles.cardCta}>LEARN MORE →</span>
                </SmartLink>
              </div>

              <div className={styles.insightsSide}>
                <p className={styles.sideKicker}>IDEAS &amp; INSIGHTS</p>
                <h2 className={styles.insightsTitle}>Thoughts on technology, society, and intelligence.</h2>
                <p className={styles.insightsDesc}>Articles, essays, research notes, and perspectives from across BagelTech.</p>
                <SmartLink href="/insights" className={styles.sideLink}>READ THE LATEST →</SmartLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
