import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import { getAllBagelNotes } from "@/lib/bagelNotes";

const projects = [
  {
    title: "ZoomReset.app",
    description: "The app that refuses to let Zoom Error 1132 win.",
    cta: "Read more",
  },
  {
    title: "Protect, My Crown Kit",
    description: "Legal armor for the die-hard developer with style.",
    cta: "Download",
  },
  {
    title: "Constitutional AI Field Guide",
    description: "Because AI needs a bill of rights, too.",
    cta: "Download",
  },
];

export const metadata = {
  title: "Bagel's Corner | BagelTech",
  description:
    "The playful side of BagelTech: stories, experiments, and Bagel Paris Vargas-approved mischief.",
};

export default function BagelsCornerPage() {
  const notes = getAllBagelNotes();

  return (
    <MarketingLayout>
      <main className="bagelCorner">
      <section className="bagelHero section">
        <div className="container bagelHeroGrid">
          <div>
            <p className="kicker">Bagel&apos;s Corner</p>
            <h1>The Mischief Manifesto</h1>
            <p className="lede">
              Bagel&apos;s Corner is where serious IT strategy and AI governance collide with humor,
              resilience, and the world&apos;s most determined dog.
            </p>
            <div className="ctaRow">
              <Link href="/bagels-corner/notes/ai-moral-blind-spot" className="btn btnPrimary">
                Read lab notes
              </Link>
              <Link href="/" className="btn btnGhost">
                Back to serious mode
              </Link>
            </div>
          </div>
          <div className="bagelAvatar" aria-hidden="true">
            <div className="dogCircle">🐶</div>
            <p>Bagel Paris Vargas, Chief Mischief Officer</p>
          </div>
        </div>
      </section>

      <section className="section bagelProjects">
        <div className="container prose">
          <h2>Featured Projects</h2>
          <div className="cardGrid">
            {projects.map((project) => (
              <article className="card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="btn btnGhost" type="button">
                  {project.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionAlt">
        <div className="container bagelNotesGrid">
          <div className="prose">
            <h2>Bagel&apos;s Lab Notes</h2>
            <div className="bagelNotesList">
              {notes.map((note) => (
                <Link key={note.slug} className="bagelNoteItem" href={`/bagels-corner/notes/${note.slug}`}>
                  <span>{note.title}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="card bagelSidebar">
            <h3>Daily USB Scoreboard</h3>
            <p className="usbScore">3</p>
            <p>Today&apos;s cables rescued from imminent doom.</p>
            <h3>About Bagel</h3>
            <p>
              Born with vengeance, trained in compliance theater, and emotionally committed to chewing
              complexity so your team can focus.
            </p>
          </aside>
        </div>
      </section>
      </main>
    </MarketingLayout>
  );
}
