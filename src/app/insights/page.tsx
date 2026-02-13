import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Insights | BagelTech",
  description: "Articles from BagelTech on governance, AI systems, and accountability.",
};

export default function InsightsPage() {
  const articles = getAllArticles();

  return (
    <main className="section">
      <div className="container prose">
        <h1>Insights</h1>
        <p>Publish by adding a markdown file in <code>content/articles</code> with frontmatter.</p>

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
  );
}
