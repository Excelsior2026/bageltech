"use client";

import { useEffect, useMemo, useState } from "react";
import { PRISM12_ITEMS } from "./items";
import { scorePrism12, type PrismResponse } from "./scoring";
import TruePresenceCheck from "./TruePresenceCheck";
import PrismMedia from "./PrismMedia";
import { APPROVED_PRISM12_MEDIA } from "./media";
import styles from "./prism.module.css";

type Phase = "welcome" | "assessment" | "results";
const emptyResponses = (): PrismResponse[] =>
  PRISM12_ITEMS.map(() => ({ choice: null, confidence: 3, explanation: "" }));

export default function PrismClient() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [consent, setConsent] = useState(false);
  const [selfRating, setSelfRating] = useState("");
  const [responses, setResponses] = useState<PrismResponse[]>(emptyResponses);
  const [index, setIndex] = useState(0);
  const [showKey, setShowKey] = useState(false);
  const [audioStatus, setAudioStatus] = useState("");
  const item = PRISM12_ITEMS[index];
  const current = responses[index];
  const completed = responses.filter((answer) => answer.choice !== null).length;

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [index]);

  const scores = useMemo(() => scorePrism12(PRISM12_ITEMS, responses), [responses]);

  function patchResponse(patch: Partial<PrismResponse>) {
    setResponses((previous) =>
      previous.map((response, idx) => idx === index ? { ...response, ...patch } : response)
    );
  }
  function start() {
    if (!consent || !selfRating) return;
    setResponses(emptyResponses());
    setIndex(0);
    setShowKey(false);
    setPhase("assessment");
  }
  function next() {
    if (current.choice === null) return;
    if (index === PRISM12_ITEMS.length - 1) setPhase("results");
    else setIndex((value) => value + 1);
  }
  function playPreview() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioStatus("Synthetic speech is unavailable in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.line);
    utterance.rate = 0.93;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    setAudioStatus("Synthetic voice preview playing. This does not reproduce controlled sarcastic intonation.");
  }
  function restart() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPhase("welcome");
    setIndex(0);
    setResponses(emptyResponses());
    setConsent(false);
    setSelfRating("");
    setShowKey(false);
    setAudioStatus("");
  }
  const label = "PRISM-12 experimental screening pilot";
  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
        <header className={styles.heading}>
          <div className={styles.overline}>BagelTech Research · PRISM / 12</div>
          <h1>Understanding what people really mean.</h1>
          <p>
            Explore sarcasm, sincerity, indirect requests, and the clues that help
            distinguish spoken words from intended meaning.
          </p>
          <div className={styles.stageRow} aria-label="Assessment stages">
            <span className={styles.activeStage}>01 · PRISM-12 screener</span>
            <span>02 · PRISM-48 expanded assessment (in development)</span>
          </div>
        </header>

        {phase === "welcome" && (
          <section className={styles.panel} aria-labelledby="intro-title">
            <p className={styles.eyebrow}>Research prototype · 12 scenarios</p>
            <h2 id="intro-title">Before you begin</h2>
            <p>
              This is an exploratory educational pilot, not a validated clinical
              assessment. It cannot diagnose a condition or determine whether
              anyone is pretending not to understand. Your answers are scored
              locally in this browser and are not sent to BagelTech.
            </p>
            <div className={styles.notice}>
              <strong>Media status:</strong> The visual storyboards and optional
              synthesized voice are demonstration materials, not validated filmed
              performances. Vocal tone and facial-expression recognition cannot
              yet be assessed reliably. Filmed and recorded scenarios are planned.
            </div>
            <p>
              Choose the most defensible interpretation given the evidence. Some
              statements are sincere, and some deliberately have insufficient
              context. You may skip an item rather than guess.
            </p>
            <label className={styles.fieldLabel} htmlFor="self-rating">
              How often do you find other people&apos;s sarcasm difficult to understand?
            </label>
            <select id="self-rating" className={styles.select} value={selfRating}
              onChange={(event) => setSelfRating(event.target.value)}>
              <option value="">Choose an answer</option>
              <option value="never">Never or almost never</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very-often">Very often</option>
              <option value="unsure">I am not sure</option>
            </select>
            <label className={styles.consentRow}>
              <input type="checkbox" checked={consent}
                onChange={(event) => setConsent(event.target.checked)} />
              <span>I understand this is an unvalidated demonstration and agree
                to proceed. My answers will stay in this browser session.</span>
            </label>
            <button className={styles.primary} type="button" disabled={!consent || !selfRating} onClick={start}>
              Begin the 12 scenarios
            </button>
          </section>
        )}

        {phase === "assessment" && (
          <section className={styles.panel} aria-label={"Scenario " + (index + 1)}>
            <div className={styles.progressLine}>
              <strong>Scenario {index + 1} of {PRISM12_ITEMS.length}</strong>
              <span>{completed} answered or skipped</span>
            </div>
            <div className={styles.track} role="progressbar"
              aria-valuemin={0} aria-valuemax={PRISM12_ITEMS.length}
              aria-valuenow={index + 1} aria-label="Scenario progress">
              <div style={{ width: ((index + 1) / PRISM12_ITEMS.length * 100) + "%" }} />
            </div>
            <h2>{item.title}</h2>
            <div className={styles.scene}>
              <PrismMedia item={item} />
              <div>
                <p className={styles.sceneLabel}>Situation</p>
                <p>{item.setting}</p>
                <p className={styles.sceneLabel}>Visual storyboard</p>
                <p>{item.visual}</p>
                <p className={styles.sceneLabel}>Spoken line</p>
                <blockquote><strong>{item.speaker}:</strong> &ldquo;{item.line}&rdquo;</blockquote>
                {!APPROVED_PRISM12_MEDIA[item.id] && (
                  <>
                    <button className={styles.secondary} type="button" onClick={playPreview}>
                      ▶ Play synthetic voice
                    </button>
                    <p className={styles.audioNote} aria-live="polite">
                      {audioStatus || "Speech synthesis is optional and not used to assess vocal sarcasm."}
                    </p>
                  </>
                )}
              </div>
            </div>
            <fieldset className={styles.answers}>
              <legend>What does the speaker most likely intend?</legend>
              {item.options.map((answer, choice) => (
                <label className={current.choice === choice ? styles.selectedOption : styles.option} key={choice}>
                  <input type="radio" name={"answer-" + item.id} value={choice}
                    checked={current.choice === choice}
                    onChange={() => patchResponse({ choice })} />
                  <span>{answer}</span>
                </label>
              ))}
              <label className={current.choice === -1 ? styles.selectedOption : styles.option}>
                <input type="radio" name={"answer-" + item.id} value="-1"
                  checked={current.choice === -1}
                  onChange={() => patchResponse({ choice: -1 })} />
                <span>Skip: I cannot determine an answer.</span>
              </label>
            </fieldset>
            <div className={styles.extra}>
              <label htmlFor="confidence">How confident are you? ({current.confidence} of 5)</label>
              <input id="confidence" type="range" min="1" max="5" step="1"
                value={current.confidence}
                onChange={(event) => patchResponse({ confidence: Number(event.target.value) })} />
              <label htmlFor="explanation">Why did you interpret it that way? (optional)</label>
              <textarea id="explanation" maxLength={350} rows={3}
                placeholder="Which words, events, or cues influenced you?"
                value={current.explanation}
                onChange={(event) => patchResponse({ explanation: event.target.value })} />
            </div>
            <div className={styles.navigation}>
              <button className={styles.secondary} type="button"
                disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>
                Previous
              </button>
              <button className={styles.primary} type="button"
                disabled={current.choice === null} onClick={next}>
                {index === PRISM12_ITEMS.length - 1 ? "View pilot results" : "Next scenario"}
              </button>
            </div>
          </section>
        )}

        {phase === "results" && (
          <section className={styles.panel} aria-labelledby="results-title">
            <p className={styles.eyebrow}>Your experimental pilot summary</p>
            <h2 id="results-title">Your results</h2>
            <div className={styles.score}>
              <strong>{scores.correct}<span> / {scores.total}</span></strong>
              <p>Best-supported interpretations identified</p>
            </div>
            <div className={styles.breakdown}>
              {scores.domains.map((domain) => (
                <div className={styles.domain} key={domain.id}>
                  <span>{domain.label}</span>
                  <strong>{domain.correct} / {domain.total}</strong>
                </div>
              ))}
            </div>
            <p>
              Your average confidence selection was {scores.confidence === null ? "not available" : scores.confidence.toFixed(1)}
              /5. You skipped {scores.skipped} scenario{scores.skipped === 1 ? "" : "s"}. Your initial self-report was &ldquo;{selfRating.replaceAll("-", " ")}&rdquo;.
              These observations describe answers to this small set of scenarios,
              not underlying ability, motivation, or truthfulness.
            </p>
            <div className={styles.notice}>
              <strong>No deception finding:</strong> Differences between reported
              difficulty and this score do not demonstrate willful misunderstanding.
              Further comparison requires valid recorded stimuli, independent
              norming, and professional interpretation. There is no evidence-based
              cutoff for automatically advancing to PRISM-48.
            </div>
            <TruePresenceCheck />
            <button type="button" className={styles.secondary} onClick={() => setShowKey(!showKey)}
              aria-expanded={showKey}>
              {showKey ? "Hide" : "Review"} explanations
            </button>
            {showKey && (
              <ol className={styles.review}>
                {PRISM12_ITEMS.map((question, idx) => (
                  <li key={question.id}>
                    <strong>{question.title}</strong>
                    <p>Your answer: {responses[idx].choice === -1 ? "Skipped" :
                      responses[idx].choice === null ? "Unanswered" :
                        question.options[responses[idx].choice]}</p>
                    <p>Best-supported interpretation: {question.options[question.correct]}</p>
                    <p>{question.rationale}</p>
                  </li>
                ))}
              </ol>
            )}
            <div className={styles.navigation}>
              <button className={styles.primary} type="button" onClick={restart}>
                Start over (clear responses)
              </button>
            </div>
            <p className={styles.audioNote}>
              PRISM-48 is planned as a more comprehensive follow-up stage. It
              is not yet implemented or validated; this pilot does not make an
              automatic referral or eligibility determination.
            </p>
          </section>
        )}
        <footer className={styles.footerNote}>
          PRISM-12 v0.1 · BagelTech · Experimental use only · PRISM answers
          remain in the browser. The separate, optional TruePresence check
          may retain timing-feature evidence at its provider.
        </footer>
      </div>
    </main>
  );
}
