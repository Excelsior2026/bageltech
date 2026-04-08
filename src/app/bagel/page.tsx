"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Mood = "happy" | "sleepy" | "hungry" | "chaotic" | "confused";

interface Trick {
  id: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Impossible";
  emoji: string;
}

const tricks: Trick[] = [
  { id: "sit", name: "Sit", description: "Lowering the posterior to the ground. Temporary.", difficulty: "Easy", emoji: "🪑" },
  { id: "shake", name: "Shake", description: "Offering a paw in solidarity. Requires treat negotiation.", difficulty: "Easy", emoji: "🤝" },
  { id: "stay", name: "Stay", description: "Remaining in position despite strong urge to investigate that noise.", difficulty: "Medium", emoji: "⏱️" },
  { id: "down", name: "Down", description: "Horizontal position of submission. Usually followed by immediate roll-over.", difficulty: "Medium", emoji: "⬇️" },
  { id: "spin", name: "Spin", description: "360-degree rotation. Excellent cardio. Rarely executed on command.", difficulty: "Medium", emoji: "🌀" },
  { id: "leave-it", name: "Leave It", description: "Ignoring something interesting. Achieved zero times in practice.", difficulty: "Impossible", emoji: "🚫" },
  { id: "quiet", name: "Quiet", description: "Ceasing vocalization. Theoretical only.", difficulty: "Impossible", emoji: "🤫" },
  { id: "wait", name: "Wait", description: "Patience exhibited at doorways. Lasts approximately 0.3 seconds.", difficulty: "Impossible", emoji: "⏳" },
];

const snackRankings = [
  { name: "Cheese (any variety)", score: 10, notes: "Perfect texture. Adequate pungency." },
  { name: "Chicken (cooked, plain)", score: 9.5, notes: "Excellent protein. Good crumble potential." },
  { name: "Peanut butter (on anything)", score: 9, notes: "Sticky excellence. Requires licking." },
  { name: "Carrot (raw)", score: 2, notes: "Fibrous disappointment. Eating only to access cheese nearby." },
  { name: "Apple", score: 1, notes: "Crisp but soulless. Will eat around it." },
  { name: "Anything on your plate when you're not looking", score: 11, notes: "Higher than any known treat." },
];

const labNotes = [
  { title: "The Optimal Nap Position", content: "Studies indicate the center of the largest human is scientifically designated as the ideal nap surface." },
  { title: "Escalation Protocols", content: "When ignored, progression follows: soft whine → loud whine → dramatic sighing → sustained eye contact." },
  { title: "Sock Acquisition Theory", content: "The value of socks increases exponentially with the owner's emotional attachment to them." },
  { title: "The Doorbell Paradox", content: "Barking at visitors: does not prevent entry but does provide essential emotional processing." },
  { title: "Water Bowl Diplomacy", content: "Whisking water with paw before drinking: essential taste testing. Not related to splashing." },
  { title: "Zoomie Cycles", content: "Sudden burst of energy at 11pm: scientifically inexplicable. Do not make eye contact during events." },
];

const moods: Record<Mood, { emoji: string; description: string; actions: string[] }> = {
  happy: {
    emoji: "🐕",
    description: "Tail velocity: maximum. Tongue: deployed. Happiness level: indeterminate but high.",
    actions: ["Tail wagging detected", "Belly exposed voluntarily", "Play bow initiated"]
  },
  sleepy: {
    emoji: "😴",
    description: "Consciousness: reduced. Dreaming: probable. Response time to commands: infinite.",
    actions: ["Eyes closed (unresponsive)", "Deep breathing (ignore commands)", "Occasional paw twitch"]
  },
  hungry: {
    emoji: "🍖",
    description: "Motivation: overwhelming. Food focus: 100%. Distraction threshold: near zero.",
    actions: ["Staring (unrelenting)", "Following (closely)", "Whining (strategic)"]
  },
  chaotic: {
    emoji: "💨",
    description: "Energy: uncontainable. Direction: random. Duration: until collapse.",
    actions: ["Rapid room traversal", "Furniture contact", "Sudden directional changes"]
  },
  confused: {
    emoji: "😕",
    description: "Comprehension: uncertain. Command received: maybe. Response: tilted head.",
    actions: ["Head tilt (calculating)", "Ears asymmetric", "Relocation to different room"]
  }
};

export default function BagelPage() {
  const [currentMood, setCurrentMood] = useState<Mood>("happy");
  const [showSecret, setShowSecret] = useState(false);
  const [activeTab, setActiveTab] = useState<"tricks" | "snacks" | "lab">("tricks");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to main site</Link>
        <span className={styles.headerBadge}>Easter Egg Access</span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.avatar}>
            <span className={styles.avatarEmoji}>{moods[currentMood].emoji}</span>
            <div className={styles.avatarRing} />
          </div>
          <h1 className={styles.title}>Bagel Mischief Parris Vargas</h1>
          <p className={styles.subtitle}>Chief Mischief Officer · BagelTech HQ</p>
          <p className={styles.moodStatus}>{moods[currentMood].description}</p>
          
          <div className={styles.moodSelector}>
            {(Object.keys(moods) as Mood[]).map((mood) => (
              <button
                key={mood}
                className={`${styles.moodButton} ${currentMood === mood ? styles.moodActive : ""}`}
                onClick={() => setCurrentMood(mood)}
              >
                {moods[mood].emoji}
              </button>
            ))}
          </div>

          <div className={styles.moodIndicator}>
            {moods[currentMood].actions.map((action, i) => (
              <span key={i} className={styles.actionPill} style={{ animationDelay: `${i * 100}ms` }}>
                {action}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.navTabs}>
          {(["tricks", "snacks", "lab"] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "tricks" && "🎾 Tricks"}
              {tab === "snacks" && "🦴 Snack Rankings"}
              {tab === "lab" && "📓 Lab Notes"}
            </button>
          ))}
        </section>

        <section className={styles.content}>
          {activeTab === "tricks" && (
            <div className={styles.tricksGrid}>
              {tricks.map((trick) => (
                <div key={trick.id} className={styles.trickCard}>
                  <span className={styles.trickEmoji}>{trick.emoji}</span>
                  <h3>{trick.name}</h3>
                  <p>{trick.description}</p>
                  <span className={`${styles.difficulty} ${styles[trick.difficulty.toLowerCase()]}`}>
                    {trick.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "snacks" && (
            <div className={styles.snackList}>
              {snackRankings.map((snack, i) => (
                <div key={snack.name} className={styles.snackItem} style={{ animationDelay: `${i * 50}ms` }}>
                  <span className={styles.snackRank}>#{i + 1}</span>
                  <div className={styles.snackInfo}>
                    <h3>{snack.name}</h3>
                    <p>{snack.notes}</p>
                  </div>
                  <div className={styles.snackScore}>
                    <span>{snack.score}</span>
                    <small>/10</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "lab" && (
            <div className={styles.labNotes}>
              {labNotes.map((note, i) => (
                <div key={i} className={styles.labNote}>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.secret}>
          <button className={styles.secretTrigger} onClick={() => setShowSecret(!showSecret)}>
            {showSecret ? "Hide classified information" : "🔒 Access classified CMO files"}
          </button>
          {showSecret && (
            <div className={styles.secretContent}>
              <h3>Classified: Executive Decision Authority</h3>
              <p>
                The Chief Mischief Officer maintains veto authority over all decisions 
                involving: couch placement, blanket distribution, treat timing, and 
                strategic nap location selection.
              </p>
              <p>
                This authority supersedes all other governance frameworks including ELEANOR.
              </p>
              <p className={styles.classified}>
                Classification: CMO-PRIVILEGED
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
