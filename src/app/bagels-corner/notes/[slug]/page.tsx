import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBagelNotes, getBagelNoteBySlug } from "@/lib/bagelNotes";

export function generateStaticParams() {
  return getAllBagelNotes().map((note) => ({ slug: note.slug }));
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

export default async function BagelNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getBagelNoteBySlug(slug);

  if (!note) notFound();

  return (
    <main className="section">
      <article className="container prose articleWrap">
        <Link href="/bagels-corner" className="articleMeta">
          ← Back to Bagel&apos;s Corner
        </Link>
        <h1>{note.title}</h1>
        <p className="lede">{note.summary}</p>
        <div className="articleBody">{renderMarkdown(note.content)}</div>
      </article>
    </main>
  );
}
