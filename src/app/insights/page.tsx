import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Insights | BagelTech",
  description: "Articles from BagelTech on governance, AI systems, and accountability.",
};

export default function InsightsPage() {
  const articles = getAllArticles();

  return (
    <MarketingLayout>
      <main className="section">
        <div className="container prose">
          <p className="kicker">BagelTech Insights</p>
          <h1>Governance ideas built for operational use.</h1>
          <p>Articles on governance, AI systems, accountability, and institutional delivery.</p>

          <div className="cardGrid">
            {articles.map((article) => (
              <article key={article.slug} className="card">
                <p className="articleMeta">{article.date} · {article.author}</p>
                <h2 className="articleTitle">
                  <Link href={`/insights/${article.slug}`}>{article.title}</Link>
                </h2>
                <p>{article.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
