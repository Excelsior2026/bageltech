import Link from "next/link";
import styles from "./CustomerPaths.module.css";

const REQUIRED_BINDINGS = [
  "Organization configuration",
  "Safety triage",
  "Service requests",
  "Private uploads",
  "Customer documents",
  "Staff workspace",
] as const;

export default function CustomerPaths() {
  return (
    <section className={styles.section} aria-labelledby="choose-a-path">
      <header className={styles.intro}>
        <p>Two ways to start</p>
        <h2 id="choose-a-path">Choose speed, or shape a site around your company.</h2>
        <span>
          Both paths lead to the same managed field application and the same launch
          review. The difference is how the public site begins.
        </span>
      </header>

      <div className={styles.paths}>
        <article className={styles.fastPath}>
          <div className={styles.pathNumber}>01</div>
          <div className={styles.pathCopy}>
            <p>Fast Start</p>
            <h3>Choose one of six proven directions.</h3>
            <span>
              Pick a presentation, add your company details and colors, and move
              directly into the managed setup request.
            </span>
            <Link href="#templates">
              Compare the templates <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <div className={styles.templateMotif} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </article>

        <article className={styles.customPath}>
          <div className={styles.pathNumber}>02</div>
          <div className={styles.pathCopy}>
            <p>Custom Studio</p>
            <h3>Answer a short brief. Generate your own structured direction.</h3>
            <span>
              Pick colors, services, audience, tone, and goals. The studio creates a
              review-ready custom blueprint built for the field backend.
            </span>
            <Link href="/get-started?path=custom">
              Open Custom Studio <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.blueprintMotif} aria-hidden="true">
            <div className={styles.blueprintFrame}>
              <span />
              <strong />
              <i />
              <i />
              <i />
            </div>
          </div>
        </article>
      </div>

      <div className={styles.sharedFoundation}>
        <p>Same field-ready foundation</p>
        <div>
          {REQUIRED_BINDINGS.map((binding) => (
            <span key={binding}>
              <i aria-hidden="true">✓</i>
              {binding}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
