import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingLayout from "@/components/MarketingLayout";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
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
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <MarketingLayout>
      <main className="section">
        <article className="container prose articleWrap">
          <p className="articleMeta">
            {article.date} · {article.author}
          </p>
          <h1>{article.title}</h1>
          <p className="lede">{article.summary}</p>
          <div className="articleBody">{renderMarkdown(article.content)}</div>
        </article>
      </main>
    </MarketingLayout>
  );
}
