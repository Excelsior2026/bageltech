"use client";

import { startTransition, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Mood = "happy" | "sleepy" | "hungry" | "chaotic" | "confused";
type Station = "translator" | "intel" | "tribunal";

interface MoodProfile {
  emoji: string;
  title: string;
  description: string;
  signals: string[];
}

interface BarkScenario {
  id: string;
  label: string;
  bark: string;
  translation: string;
  policy: string;
  humanAction: string;
}

interface ScentSource {
  id: string;
  label: string;
  clue: string;
  directive: string;
  reward: string;
  intensity: number;
}

interface SnackCase {
  id: string;
  name: string;
  emoji: string;
  score: number;
  notes: string;
  ruling: string;
  condition: string;
  threshold: number;
}

interface MissionBrief {
  codename: string;
  objective: string;
  theater: string;
  reward: string;
}

interface TelemetryCard {
  label: string;
  value: number;
  note: string;
}

const operationName = "Operation Dennis";

const moodProfiles: Record<Mood, MoodProfile> = {
  happy: {
    emoji: "🐶",
    title: "Hug patrol",
    description:
      "Tail online. Morale high. Chin-tuck protocol armed. If Dennis changes rooms, Bagel treats it as an escorted movement.",
    signals: ["chin tuck incoming", "Dennis shadow active", "belly available"],
  },
  sleepy: {
    emoji: "😴",
    title: "Blanket jurisdiction",
    description:
      "Consciousness reduced to the bare minimum required to hear car keys, a cheese wrapper, or Dennis standing up.",
    signals: ["couch burrito secured", "one eye on Dennis", "hearing tuned to car keys"],
  },
  hungry: {
    emoji: "🧀",
    title: "Snack escalation",
    description:
      "Every sound is a food event until proven otherwise. Dennis remains favorite person, but cheese is mounting a serious campaign.",
    signals: ["counter surveillance", "whine diplomacy", "treat leverage maximized"],
  },
  chaotic: {
    emoji: "💨",
    title: "Ride rumor emergency",
    description:
      "Velocity exceeds judgment. Hallway turns are theoretical. If the car seems possible, Bagel becomes a siren with ears.",
    signals: ["door launch pending", "blanket turbulence", "ride-along insistence"],
  },
  confused: {
    emoji: "🕵️",
    title: "Investigative tilt",
    description:
      "The head tilt has deployed. Meaning remains uncertain. Why is Dennis moving without him and why has no one explained the itinerary?",
    signals: ["left ear inquiry", "Dennis location scan", "highly suspicious silence"],
  },
};

const barkScenarios: BarkScenario[] = [
  {
    id: "doorbell",
    label: "Doorbell event",
    bark: "WOOF. WOOF-WOOF. WOOF-WOOF-WOOF.",
    translation: "An unscheduled visitor has touched the perimeter and I refuse to let this become a casual matter.",
    policy: "Launch to foyer. Demand visual confirmation. Accept pats only after the threat profile softens.",
    humanAction: "Open door slowly and thank Bagel for securing the republic.",
  },
  {
    id: "keys",
    label: "Car keys detected",
    bark: "WOOF-WOOF-WOOF-WOOF.",
    translation: "A transport opportunity is developing and I need immediate confirmation that I am included.",
    policy: "Rush the door, pace in a tight oval, and maintain direct eye contact with Dennis.",
    humanAction: "State the destination clearly and open the car before morale drops.",
  },
  {
    id: "dennis",
    label: "Dennis leaves the room",
    bark: "ruff? WOOF.",
    translation: "Excuse me. My person has changed sectors and I was not copied on the movement plan.",
    policy: "Re-establish side-by-side formation with maximum urgency and minimal dignity.",
    humanAction: "Allow Bagel to escort Dennis immediately. Resistance is pointless.",
  },
  {
    id: "fridge",
    label: "Fridge door opened",
    bark: "rrr-woof? ... WOOF.",
    translation: "I heard refrigeration and require a written explanation for why I was not consulted.",
    policy: "Deploy to kitchen immediately and stare upward with deep constitutional sorrow.",
    humanAction: "Produce one shred of cheese or prepare for an appeal.",
  },
  {
    id: "squirrel",
    label: "Squirrel outside",
    bark: "YAP-YAP-YAP-YAP-YAP!",
    translation: "Known repeat offender sighted near the fence line. I recommend immediate sanctions.",
    policy: "Full-window enforcement. Tail support optional. Bark volume non-negotiable.",
    humanAction: "Acknowledge the intelligence briefing and pretend this is useful.",
  },
  {
    id: "laptop",
    label: "Laptop opened",
    bark: "huff... woof.",
    translation: "You appear busy, which means now is the morally correct time for me to place my face directly under your chin.",
    policy: "Initiate cuddle supervision. Escalate to upward snout insertion if ignored.",
    humanAction: "Lower your chin, accept the hug, and resume work only after tribute scratches.",
  },
];

const scentSources: ScentSource[] = [
  {
    id: "cheese",
    label: "Cheese wrapper",
    clue: "Detected from an absurd distance with zero supporting evidence.",
    directive: "Proceed to kitchen at once. Ignore all attempts to call this coincidence.",
    reward: "Sharp cheddar fragments",
    intensity: 78,
  },
  {
    id: "dennis",
    label: "Dennis hoodie detected",
    clue: "Primary person signal located. Loyalty response rising faster than reason.",
    directive: "Follow Dennis room-to-room until contact, lap access, or confirmed cuddle adjacency is restored.",
    reward: "Approved under-chin hug deployment",
    intensity: 94,
  },
  {
    id: "mail",
    label: "Mail carrier aura",
    clue: "Perimeter disturbance plus faint paperwork energy.",
    directive: "Guard front window and issue formal objections in a loud voice.",
    reward: "Post-bark victory lap",
    intensity: 64,
  },
  {
    id: "keys",
    label: "Car keys jingle",
    clue: "Tiny metal symphony indicating a possible ride event with Dennis.",
    directive: "Sprint to the door, make yourself emotionally unforgettable, and demand boarding rights.",
    reward: "Window seat reconnaissance with Dennis nearby",
    intensity: 97,
  },
];

const snackCases: SnackCase[] = [
  {
    id: "cheese",
    name: "Cheese",
    emoji: "🧀",
    score: 10,
    notes: "An ethical necessity, not a luxury item.",
    ruling: "Approved immediately.",
    condition: "No condition. This is infrastructure.",
    threshold: 22,
  },
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    score: 9.6,
    notes: "Professional-grade protein with excellent aroma compliance.",
    ruling: "Approved with enthusiasm.",
    condition: "Surrender briskly and keep fingers clear.",
    threshold: 30,
  },
  {
    id: "peanut-butter",
    name: "Peanut butter",
    emoji: "🥜",
    score: 9.1,
    notes: "Messy, chaotic, glorious. A diplomatic triumph.",
    ruling: "Approved after ceremonial licking.",
    condition: "Must be served in a form that maximizes drama.",
    threshold: 38,
  },
  {
    id: "fry",
    name: "Drive-thru fry",
    emoji: "🍟",
    score: 9.8,
    notes: "Vehicle-adjacent potato. Smells like adventure, Dennis, and ethically gray excellence.",
    ruling: "Approved if Bagel participated in the ride.",
    condition: "Must cool to non-chaotic temperature before transfer.",
    threshold: 34,
  },
  {
    id: "carrot",
    name: "Carrot",
    emoji: "🥕",
    score: 2.4,
    notes: "Crunch without purpose. Acceptable only during budget cuts.",
    ruling: "Denied in spirit.",
    condition: "Will consume if cheese is promised later in writing.",
    threshold: 74,
  },
];

const missionObjectives = [
  "maintain uninterrupted visual contact with Dennis during household transit",
  "deploy a surprise under-chin hug to restore morale in the nearest seated human",
  "audit the front door for signs of an unscheduled car ride",
  "perform a floor-level search for dropped snack evidence near Dennis",
  "patrol the couch for blanket conditions suitable for joint cuddling",
];

const missionTheaters = [
  "living room sector",
  "Dennis escort corridor",
  "passenger-seat staging lane",
  "bedroom blanket zone",
  "front-door checkpoint",
];

const missionRewards = [
  "one heroic cube of cheddar",
  "thirty seconds of uninterrupted under-chin cuddle lock",
  "official permission to supervise Dennis from touching distance",
  "a ceremonial car ride around the block",
  "full ceremonial ear-scratch honors",
];

const initialMission: MissionBrief = {
  codename: operationName,
  objective: "maintain uninterrupted visual contact with Dennis during household transit",
  theater: "living room sector",
  reward: "a ceremonial car ride around the block",
};

const certifiedSkills = [
  { name: "Sit", verdict: "still available if properly bribed" },
  { name: "Under-chin hug", verdict: "elite cuddle placement with zero hesitation" },
  { name: "Dennis tracking", verdict: "satellite-grade loyalty lock" },
  { name: "Car ride boarding", verdict: "responds before the invitation is complete" },
  { name: "Stay", verdict: "under active litigation" },
];

const incidentLog = [
  "07:58: Dennis stood up. Escort formation activated before step two.",
  "09:12: Chin inserted under human jaw with extraordinary confidence.",
  "12:03: Cheese detected before package entered kitchen airspace.",
  "16:09: Car keys jingled. Bagel arrived at the door before the humans processed the audio.",
];

const beagleLaws = [
  "No snack shall go unreviewed.",
  "Dennis shall not cross a room without official beagle accompaniment.",
  "Every cuddle is improved by a face tucked directly under the nearest chin.",
  "If car keys make noise, Bagel is presumed included.",
  "A nap is not idleness. It is strategic restoration.",
];

const telemetryProfiles: Record<Mood, TelemetryCard[]> = {
  happy: [
    { label: "Dennis lock", value: 98, note: "Maintaining premium side-by-side coverage." },
    { label: "Chin-tuck probability", value: 92, note: "A hug may occur before you finish sitting down." },
    { label: "Car ride optimism", value: 84, note: "Open one door and morale spikes immediately." },
  ],
  sleepy: [
    { label: "Dennis lock", value: 88, note: "Tracking remains active despite visible drowsiness." },
    { label: "Chin-tuck probability", value: 81, note: "Sleepy hugs are slower but more adhesive." },
    { label: "Car ride optimism", value: 63, note: "Low until keys appear, then instantly unreasonable." },
  ],
  hungry: [
    { label: "Dennis lock", value: 86, note: "Still loyal, though snack lobbying is intense." },
    { label: "Chin-tuck probability", value: 72, note: "Hugs possible after pantry reconnaissance." },
    { label: "Car ride optimism", value: 58, note: "Vehicle appeal rises if fries are rumored." },
  ],
  chaotic: [
    { label: "Dennis lock", value: 95, note: "High-speed companionship with compromised steering." },
    { label: "Chin-tuck probability", value: 69, note: "Affection remains sincere, though physically ambitious." },
    { label: "Car ride optimism", value: 99, note: "Operational assumption: every key noise means go time." },
  ],
  confused: [
    { label: "Dennis lock", value: 93, note: "Seeking clarification by staying directly underfoot." },
    { label: "Chin-tuck probability", value: 84, note: "Comfort protocol deployed while questions remain open." },
    { label: "Car ride optimism", value: 87, note: "Unclear plans are still treated as possible ride plans." },
  ],
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createMission(): MissionBrief {
  return {
    codename: operationName,
    objective: pickRandom(missionObjectives),
    theater: pickRandom(missionTheaters),
    reward: pickRandom(missionRewards),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function BagelPage() {
  const [currentMood, setCurrentMood] = useState<Mood>("happy");
  const [activeStation, setActiveStation] = useState<Station>("translator");
  const [selectedScenario, setSelectedScenario] = useState<string>("keys");
  const [selectedScent, setSelectedScent] = useState<string>("dennis");
  const [selectedSnack, setSelectedSnack] = useState<string>("fry");
  const [treatLeverage, setTreatLeverage] = useState(58);
  const [appealPower, setAppealPower] = useState(44);
  const [showSecret, setShowSecret] = useState(false);
  const [mission, setMission] = useState<MissionBrief>(initialMission);

  const activeMood = moodProfiles[currentMood];
  const activeScenario = barkScenarios.find((item) => item.id === selectedScenario) ?? barkScenarios[0];
  const activeScent = scentSources.find((item) => item.id === selectedScent) ?? scentSources[0];
  const activeSnack = snackCases.find((item) => item.id === selectedSnack) ?? snackCases[0];
  const activeTelemetry = telemetryProfiles[currentMood];

  const moodAdjustments: Record<Mood, number> = {
    happy: 4,
    sleepy: -10,
    hungry: 18,
    chaotic: 11,
    confused: 2,
  };

  const scentScore = clamp(activeScent.intensity + Math.round(treatLeverage / 3) + moodAdjustments[currentMood], 6, 99);
  const scentAssessment =
    scentScore > 85
      ? "Object confirmed. Deploy paws immediately."
      : scentScore > 68
        ? "Strong lead. Proceed with dramatic suspicion."
        : scentScore > 48
          ? "Partial scent lock. Continue circling."
          : "Evidence weak. Bark anyway to be safe.";

  const snackAppealScore = activeSnack.score * 10 + appealPower + (currentMood === "hungry" ? 16 : 0);
  const snackVerdict =
    snackAppealScore >= activeSnack.threshold * 3
      ? "Appeal granted under beagle precedent."
      : snackAppealScore >= activeSnack.threshold * 2
        ? "Conditional approval. Continue staring."
        : "Denied. Escalate to sad eyes and floor collapse.";

  const rerollMission = () => {
    startTransition(() => {
      setMission(createMission());
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} />

      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Return to BagelTech
        </Link>
        <div className={styles.headerBadges}>
          <span className={styles.headerBadge}>Operation Dennis live</span>
          <span className={styles.headerBadgeMuted}>Dennis escort division</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>BagelTech loyalty protocol</p>
            <h1 className={styles.title}>{operationName}</h1>
            <p className={styles.nameplate}>Filed by Bagel Mischief Parris Vargas</p>
            <p className={styles.subtitle}>{activeMood.title}</p>
            <p className={styles.moodStatus}>{activeMood.description}</p>

            <div className={styles.moodSelector} aria-label="Bagel mood selector">
              {(Object.keys(moodProfiles) as Mood[]).map((mood) => (
                <button
                  key={mood}
                  type="button"
                  aria-pressed={currentMood === mood}
                  className={`${styles.moodButton} ${currentMood === mood ? styles.moodActive : ""}`}
                  onClick={() => setCurrentMood(mood)}
                >
                  <span className={styles.moodEmoji}>{moodProfiles[mood].emoji}</span>
                  <span className={styles.moodLabel}>{mood}</span>
                </button>
              ))}
            </div>

            <div className={styles.signalStrip}>
              {activeMood.signals.map((signal) => (
                <span className={styles.signalPill} key={signal}>
                  {signal}
                </span>
              ))}
            </div>

            <div className={styles.telemetryGrid}>
              {activeTelemetry.map((metric) => (
                <article className={styles.telemetryCard} key={metric.label}>
                  <div className={styles.telemetryHeader}>
                    <span className={styles.infoLabel}>{metric.label}</span>
                    <strong className={styles.telemetryValue}>{metric.value}%</strong>
                  </div>
                  <div className={styles.telemetryTrack}>
                    <span className={styles.telemetryFill} style={{ width: `${metric.value}%` }} />
                  </div>
                  <p className={styles.telemetryNote}>{metric.note}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.avatarWell} aria-hidden="true">
              <div className={styles.avatarOrbit} />
              <div className={styles.avatarEmoji}>{activeMood.emoji}</div>
              <div className={styles.avatarLabel}>Bagel online</div>
            </div>

            <div className={styles.missionCard}>
              <p className={styles.cardTag}>Current operation brief</p>
              <h2>{mission.codename}</h2>
              <ul className={styles.missionList}>
                <li>{mission.objective}</li>
                <li>theater: {mission.theater}</li>
                <li>reward: {mission.reward}</li>
              </ul>
              <button type="button" className={styles.missionButton} onClick={rerollMission}>
                Issue new beagle assignment
              </button>
            </div>
          </aside>
        </section>

        <section className={styles.deck}>
          <div className={styles.stationTabs}>
            <button
              type="button"
              className={`${styles.stationButton} ${activeStation === "translator" ? styles.stationActive : ""}`}
              onClick={() => setActiveStation("translator")}
            >
              Bark translator
            </button>
            <button
              type="button"
              className={`${styles.stationButton} ${activeStation === "intel" ? styles.stationActive : ""}`}
              onClick={() => setActiveStation("intel")}
            >
              Sniff intelligence
            </button>
            <button
              type="button"
              className={`${styles.stationButton} ${activeStation === "tribunal" ? styles.stationActive : ""}`}
              onClick={() => setActiveStation("tribunal")}
            >
              Treat tribunal
            </button>
          </div>

          <div className={styles.stationSurface}>
            {activeStation === "translator" && (
              <>
                <div className={styles.optionRail}>
                  {barkScenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      type="button"
                      className={`${styles.optionButton} ${scenario.id === activeScenario.id ? styles.optionActive : ""}`}
                      onClick={() => setSelectedScenario(scenario.id)}
                    >
                      {scenario.label}
                    </button>
                  ))}
                </div>

                <div className={styles.stationMain}>
                  <p className={styles.cardTag}>Audio interpretation</p>
                  <h2>{activeScenario.label}</h2>
                  <p className={styles.barkLine}>{activeScenario.bark}</p>

                  <div className={styles.infoGrid}>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Human translation</p>
                      <p>{activeScenario.translation}</p>
                    </article>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Bagel policy</p>
                      <p>{activeScenario.policy}</p>
                    </article>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Recommended handler action</p>
                      <p>{activeScenario.humanAction}</p>
                    </article>
                  </div>
                </div>
              </>
            )}

            {activeStation === "intel" && (
              <>
                <div className={styles.optionRail}>
                  {scentSources.map((source) => (
                    <button
                      key={source.id}
                      type="button"
                      className={`${styles.optionButton} ${source.id === activeScent.id ? styles.optionActive : ""}`}
                      onClick={() => setSelectedScent(source.id)}
                    >
                      {source.label}
                    </button>
                  ))}

                  <label className={styles.sliderCard}>
                    <span className={styles.infoLabel}>Treat leverage</span>
                    <input
                      className={styles.slider}
                      type="range"
                      min="0"
                      max="100"
                      value={treatLeverage}
                      onChange={(event) => setTreatLeverage(Number(event.target.value))}
                    />
                    <span className={styles.sliderValue}>{treatLeverage}% persuasive cheese energy</span>
                  </label>
                </div>

                <div className={styles.stationMain}>
                  <p className={styles.cardTag}>Scent board</p>
                  <h2>{activeScent.label}</h2>
                  <p className={styles.stationLead}>{activeScent.clue}</p>

                  <div className={styles.meterCard}>
                    <div className={styles.meterHeader}>
                      <span>Sniff certainty</span>
                      <strong>{scentScore}%</strong>
                    </div>
                    <div className={styles.meterTrack}>
                      <span className={styles.meterFill} style={{ width: `${scentScore}%` }} />
                    </div>
                    <p className={styles.meterVerdict}>{scentAssessment}</p>
                  </div>

                  <div className={styles.infoGrid}>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Directive</p>
                      <p>{activeScent.directive}</p>
                    </article>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Expected reward</p>
                      <p>{activeScent.reward}</p>
                    </article>
                  </div>
                </div>
              </>
            )}

            {activeStation === "tribunal" && (
              <>
                <div className={styles.optionRail}>
                  {snackCases.map((snack) => (
                    <button
                      key={snack.id}
                      type="button"
                      className={`${styles.optionButton} ${snack.id === activeSnack.id ? styles.optionActive : ""}`}
                      onClick={() => setSelectedSnack(snack.id)}
                    >
                      {snack.emoji} {snack.name}
                    </button>
                  ))}

                  <label className={styles.sliderCard}>
                    <span className={styles.infoLabel}>Pleading intensity</span>
                    <input
                      className={styles.slider}
                      type="range"
                      min="0"
                      max="100"
                      value={appealPower}
                      onChange={(event) => setAppealPower(Number(event.target.value))}
                    />
                    <span className={styles.sliderValue}>{appealPower}% sad-eye pressure</span>
                  </label>
                </div>

                <div className={styles.stationMain}>
                  <p className={styles.cardTag}>Tribunal ruling</p>
                  <h2>
                    {activeSnack.emoji} {activeSnack.name}
                  </h2>
                  <p className={styles.stationLead}>{activeSnack.notes}</p>

                  <div className={styles.infoGrid}>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Merit score</p>
                      <p>{activeSnack.score}/10 by the Office of Bagel Affairs</p>
                    </article>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Standing ruling</p>
                      <p>{activeSnack.ruling}</p>
                    </article>
                    <article className={styles.infoCard}>
                      <p className={styles.infoLabel}>Required conditions</p>
                      <p>{activeSnack.condition}</p>
                    </article>
                  </div>

                  <div className={styles.verdictCard}>
                    <p className={styles.infoLabel}>Live appeal status</p>
                    <h3>{snackVerdict}</h3>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className={styles.fieldGrid}>
          <article className={styles.fieldCard}>
            <p className={styles.cardTag}>Recent incidents</p>
            <ul className={styles.list}>
              {incidentLog.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.fieldCard}>
            <p className={styles.cardTag}>Certified specialties</p>
            <div className={styles.skillGrid}>
              {certifiedSkills.map((skill) => (
                <div className={styles.skillCard} key={skill.name}>
                  <h3>{skill.name}</h3>
                  <p>{skill.verdict}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.fieldCard}>
            <p className={styles.cardTag}>Beagle law</p>
            <ul className={styles.list}>
              {beagleLaws.map((law) => (
                <li key={law}>{law}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.secret}>
          <button type="button" className={styles.secretTrigger} onClick={() => setShowSecret((current) => !current)}>
            {showSecret ? "Seal the file again" : "Open classified Operation Dennis file"}
          </button>

          {showSecret && (
            <div className={styles.secretContent}>
              <p className={styles.cardTag}>Classified addendum</p>
              <h2>Executive override: Dennis may not depart without Bagel.</h2>
              <p>
                The Chief Hug Officer retains final authority over blanket placement, snack allocation, chin-tuck
                timing, lap occupancy, and any vehicle that appears even vaguely road-trip capable.
              </p>
              <p>
                If Dennis approaches a door, hallway, or car without Bagel, emergency cuddle law immediately applies.
                Resolution requires cheese-backed diplomacy and full escort reinstatement within one business nap.
              </p>
              <p className={styles.classified}>clearance level: beagle-priority</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
