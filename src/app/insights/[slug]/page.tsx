import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import MarketingLayout from "@/components/MarketingLayout";
import { getAllArticles, getArticleBySlug, getCanonicalSlug } from "@/lib/articles";

const SITE_URL = "https://www.bageltech.net";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const canonical = `/insights/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical },
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: canonical,
      publishedTime: article.date,
      authors: [article.author],
      siteName: "BagelTech",
    },
  };
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\n\n+/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("## ")) return <h2 key={index}>{block.replace(/^##\s+/, "")}</h2>;
    if (block.startsWith("# ")) return <h1 key={index}>{block.replace(/^#\s+/, "")}</h1>;

    if (block.startsWith("- ")) {
      const items = block.split("\n").map((item) => item.replace(/^-\s+/, ""));
      return (
        <ul key={index}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{block}</p>;
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = getCanonicalSlug(slug);
  if (!canonical) notFound();
  if (canonical !== slug) permanentRedirect(`/insights/${canonical}`);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
    publisher: { "@type": "Organization", name: "BagelTech" },
  };

  return (
    <MarketingLayout>
      <main className="section">
        <article className="container prose articleWrap insightsArticle">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <p className="articleMeta">
            <time dateTime={article.date}>{article.date}</time> · {article.author} · {article.category}
          </p>
          <h1>{article.title}</h1>
          <p className="lede">{article.summary}</p>
          <div className="articleBody">{renderMarkdown(article.content)}</div>
        </article>
      </main>
    </MarketingLayout>
  );
}
