"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import styles from "./prism.module.css";

// The prompt is public and contains no private knowledge.
// The text remains in the browser; only aggregate timing metrics are submitted.
const PHRASE = "Curiosity makes room for better questions";

type Clock = {
  displayedAt: number;
  focusedAt: number | null;
  firstInputAt: number | null;
  latestAt: number | null;
  keys: number;
  corrections: number;
  pastes: number;
  times: number[];
};
function newClock(): Clock {
  return {
    displayedAt: performance.now(),
    focusedAt: null,
    firstInputAt: null,
    latestAt: null,
    keys: 0,
    corrections: 0,
    pastes: 0,
    times: []
  };
}
function summarize(clock: Clock, now: number, exact: boolean) {
  const intervals = clock.times;
  const mean = intervals.length ? intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
  const variance = intervals.length ?
    intervals.reduce((sum, value) => sum + (value - mean) ** 2, 0) / intervals.length : 0;
  const duration = Math.max(1, now - (clock.firstInputAt ?? now));
  return {
    typing: {
      mean_inter_key_interval_ms: Math.max(0, mean),
      inter_key_interval_stddev_ms: Math.sqrt(variance),
      characters_per_minute: Math.min(20000, clock.keys * 60000 / duration),
      correction_count: clock.corrections,
      correction_rate: clock.keys ? Math.min(1, clock.corrections / clock.keys) : 0,
      paste_count: clock.pastes,
      focus_to_first_input_ms: Math.max(0, (clock.firstInputAt ?? now) - (clock.focusedAt ?? now)),
      prompt_render_to_first_input_ms: Math.max(0, (clock.firstInputAt ?? now) - clock.displayedAt),
      typing_duration_ms: duration
    },
    challenge: {
      response_latency_ms: Math.max(0, now - clock.displayedAt),
      expected_reading_time_ms: 1500,
      submitted_exactly: exact
    }
  };
}

export default function TruePresenceCheck() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [consent, setConsent] = useState(false);
  const [entry, setEntry] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "complete" | "error">("idle");
  const [message, setMessage] = useState("");
  const clock = useRef<Clock | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/prism/truepresence", { cache: "no-store" })
      .then(response => response.json())
      .then(data => { if (active) setConfigured(Boolean(data.configured)); })
      .catch(() => { if (active) setConfigured(false); });
    return () => { active = false; };
  }, []);

  function setOptIn(next: boolean) {
    setConsent(next);
    setEntry("");
    setStatus("idle");
    setMessage("");
    clock.current = next ? newClock() : null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!clock.current) return;
    const isCorrection = event.key === "Backspace" || event.key === "Delete";
    const isPrintable = event.key.length === 1;
    if (!isCorrection && !isPrintable) return;
    const now = performance.now();
    const record = clock.current;
    if (record.firstInputAt === null) record.firstInputAt = now;
    if (record.latestAt !== null) record.times.push(Math.max(0, now - record.latestAt));
    record.latestAt = now;
    record.keys += 1;
    if (isCorrection) record.corrections += 1;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || !configured || !clock.current || status === "sending") return;
    setStatus("sending");
    setMessage("");
    const payload = summarize(clock.current, performance.now(), entry.trim() === PHRASE);
    try {
      const response = await fetch("/api/prism/truepresence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        credentials: "same-origin"
      });
      if (!response.ok) throw new Error("The interaction-check service is not available.");
      const result = await response.json();
      if (!result.ok) throw new Error("The check could not be completed.");
      setStatus("complete");
      setEntry("");
      clock.current = null;
      setMessage(
        "TruePresence received aggregate interaction features in observe-only mode. " +
        "This is not a human-identity verdict and does not affect your PRISM score."
      );
    } catch {
      setStatus("error");
      setMessage("The optional TruePresence check did not complete. Your PRISM result is unchanged.");
    }
  }

  return (
    <section className={styles.integrity} aria-labelledby="presence-title">
      <p className={styles.eyebrow}>Separate optional research signal</p>
      <h3 id="presence-title">TruePresence interaction check</h3>
      <p>
        TruePresence evaluates whether interaction timing is more consistent with
        manual or automated operation. It does not establish who you are,
        whether you understood sarcasm, or whether you answered truthfully.
      </p>
      {configured === null ? (
        <p role="status">Checking service availability…</p>
      ) : !configured ? (
        <p role="status">
          TruePresence evaluation is not configured for this pilot.
          No behavioral data is collected or transmitted.
        </p>
      ) : (
        <>
          <p>
            If enabled, this optional check sends aggregate typing rhythm, correction
            and paste counts, and response timing to the separate TruePresence
            evaluation service. It does not send the phrase, answers, explanations,
            raw keystrokes, or other PRISM results. The TruePresence backend may
            retain an evidence packet according to its own retention policy.
            Skipping this step has no effect on your assessment.
          </p>
          <label className={styles.consentRow}>
            <input type="checkbox" checked={consent}
              onChange={event => setOptIn(event.target.checked)} />
            <span>I separately opt in to the TruePresence behavioral interaction check.</span>
          </label>
          {consent && status !== "complete" && (
            <form onSubmit={onSubmit} className={styles.presenceForm}>
              <label htmlFor="presence-challenge">
                Type the displayed phrase (do not enter personal information):
              </label>
              <div className={styles.phrase}>{PHRASE}</div>
              <input type="text" id="presence-challenge"
                value={entry} autoComplete="off" spellCheck={false}
                onChange={event => setEntry(event.target.value)}
                onFocus={() => {
                  if (clock.current && clock.current.focusedAt === null)
                    clock.current.focusedAt = performance.now();
                }}
                onKeyDown={onKeyDown}
                onPaste={() => {
                  if (!clock.current) return;
                  clock.current.pastes += 1;
                  if (clock.current.firstInputAt === null)
                    clock.current.firstInputAt = performance.now();
                }}
                placeholder="Enter phrase here" maxLength={100} />
              <button className={styles.secondary} type="submit" disabled={status === "sending" || !entry}>
                {status === "sending" ? "Checking…" : "Run optional interaction check"}
              </button>
            </form>
          )}
          {message && <p role="status" aria-live="polite">{message}</p>}
        </>
      )}
    </section>
  );
}
