// BagelTech.net — Homepage
// Next.js App Router + Tailwind

import Link from "next/link";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl">
      <div className="mb-3">
        <Badge>{kicker}</Badge>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
          {desc}
        </p>
      )}
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <div className="text-sm font-semibold">BagelTech</div>
          <div className="text-xs text-white/60">
            BagelSoft products • CogniScribe
          </div>
        </div>
        <nav className="flex gap-5 text-sm text-white/70">
          <Link href="#work" className="hover:text-white">
            What we do
          </Link>
          <Link href="#products" className="hover:text-white">
            Products
          </Link>
          <Link href="#about" className="hover:text-white">
            About
          </Link>
          <Link href="#contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="py-16 sm:py-20">
          <Badge>Company</Badge>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Human-centered systems for AI, data, and governance.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-white/70">
            We design and build technology that behaves correctly when decisions
            matter—especially under uncertainty, edge cases, and real-world
            pressure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black"
            >
              Explore the work
            </Link>
            <Link
              href="#contact"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <section id="work" className="py-14">
          <SectionTitle
            kicker="What we do"
            title="Systems that keep their composure"
            desc="We focus on the parts that usually break: ambiguity, escalation paths, and responsibility."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              title="AI Governance & Oversight"
              desc="Rights-aware, auditable systems built for accountability."
            />
            <Card
              title="Applied AI Systems"
              desc="Production-grade AI designed for real environments."
            />
            <Card
              title="Data & Decision Infrastructure"
              desc="Traceability, escalation, and human review by design."
            />
            <Card
              title="Advisory & Prototyping"
              desc="From concept to deployment with judgment engineered in."
            />
          </div>
        </section>

        <section id="products" className="py-14">
          <SectionTitle
            kicker="BagelSoft"
            title="Software products"
            desc="Practical tools that translate governance and systems thinking into deployable software."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Card
              title="CogniScribe"
              desc="Intelligent note-taking for medical and academic environments that respects uncertainty and preserves traceability."
            />
            <Card
              title="Coming soon"
              desc="Governance toolkit and applied AI utilities designed for operational accountability."
            />
          </div>
        </section>

        <section id="about" className="py-14">
          <SectionTitle kicker="About" title="Built for high-stakes environments" />
          <p className="max-w-3xl text-pretty text-lg text-white/70">
            BagelTech builds responsible AI systems, data platforms, and
            governance infrastructure where reliability and human oversight
            matter. BagelSoft is our product division, where these ideas become
            software.
          </p>
        </section>

        <section id="contact" className="py-14">
          <SectionTitle
            kicker="Contact"
            title="Selective engagements"
            desc="If it has to work when it counts, let’s talk."
          />
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:contact@bageltech.net"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black"
            >
              contact@bageltech.net
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              GitHub
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <footer className="py-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} BagelTech. BagelSoft is a product division
          of BagelTech.
        </footer>
      </main>
    </div>
  );
}

