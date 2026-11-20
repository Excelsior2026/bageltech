export type PrismIntent = "sarcasm" | "sincere" | "mixed" | "indirect" | "ambiguous";
export type PrismItem = {
  id: string;
  domain: "context" | "prosody" | "social-intent" | "uncertainty";
  intent: PrismIntent;
  title: string;
  setting: string;
  line: string;
  speaker: string;
  visual: string;
  illustration: string;
  options: readonly [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  rationale: string;
};

// Original demonstration stimuli. These are not validated psychometric items.
// Real audiovisual versions require independently rated, consented actor performances.
export const PRISM12_ITEMS: readonly PrismItem[] = [
  {
    id: "P12-01", domain: "context", intent: "sarcasm", title: "Fourth jam",
    setting: "The office printer jams for the fourth time this morning. Mara looks at the error light and exhales.",
    line: "What a dependable machine.", speaker: "Mara",
    visual: "Printer error light, crumpled paper and a tired expression.", illustration: "🖨️",
    options: ["Mara trusts the printer.", "Mara is criticizing repeated failures.", "Mara is praising its age.", "Mara wants a different paper size."],
    correct: 1, rationale: "Praise of reliability conflicts with four jams; the strongest interpretation is criticism."
  },
  {
    id: "P12-02", domain: "context", intent: "sincere", title: "Ahead of schedule",
    setting: "A complete, accurate report arrives two days early. The supervisor smiles while reviewing it.",
    line: "Excellent work. You made this easy.", speaker: "Supervisor",
    visual: "Clean report, positive feedback, relaxed smile.", illustration: "📋",
    options: ["The supervisor is sincerely pleased.", "The supervisor feels mocked.", "The work must be redone.", "The supervisor is upset about the deadline."],
    correct: 0, rationale: "The positive words match the outcome and visual cues, supporting sincerity."
  },
  {
    id: "P12-03", domain: "social-intent", intent: "sarcasm", title: "Freshly cleaned",
    setting: "Jordan has just mopped the floor. Alex tracks muddy footprints through the kitchen.",
    line: "Oh, wonderful.", speaker: "Jordan",
    visual: "Visible muddy prints across the freshly cleaned floor.", illustration: "👢",
    options: ["Jordan is praising the boots.", "Jordan wants Alex to clean later.", "Jordan is displeased about the mess.", "Jordan enjoys cleaning again."],
    correct: 2, rationale: "The positive reaction follows an unwanted mess; sarcastic displeasure is strongly supported."
  },
  {
    id: "P12-04", domain: "uncertainty", intent: "ambiguous", title: "Short message",
    setting: "You see a message from Kim to Pat. Their earlier conversation and the outcome of Pat's work are unknown.",
    line: "Nice job.", speaker: "Kim",
    visual: "A message displayed without any surrounding conversation.", illustration: "💬",
    options: ["Kim is definitely congratulating Pat.", "Kim is definitely mocking Pat.", "Kim is threatening Pat.", "There is not enough context to tell."],
    correct: 3, rationale: "The same words can be sincere or sarcastic; no disambiguating evidence was supplied."
  },
  {
    id: "P12-05", domain: "social-intent", intent: "indirect", title: "Open window",
    setting: "Two friends are sitting by an open window. Cold air is blowing in. One looks toward the window while the other sits beside it.",
    line: "It's getting cold in here.", speaker: "First friend",
    visual: "An open window and a person visibly shivering.", illustration: "🪟",
    options: ["An indirect request to close the window is plausible.", "The speaker is praising the weather.", "The speaker is pretending the room is warm.", "The speaker wants to leave immediately."],
    correct: 0, rationale: "The remark can function as both a literal observation and an indirect request; the context supports a request, but does not prove it."
  },
  {
    id: "P12-06", domain: "social-intent", intent: "mixed", title: "Moving day",
    setting: "Riley arrives after the heavy furniture has been moved upstairs, bringing coffee for the helpers. Sam grins.",
    line: "Perfect timing. Thanks for the coffee.", speaker: "Sam",
    visual: "Furniture already upstairs; Riley carrying a coffee tray.", illustration: "☕",
    options: ["Both clauses are sincere praise.", "The timing is teased while the thanks may be genuine.", "Sam rejects the coffee.", "Both clauses are insults."],
    correct: 1, rationale: "A single utterance can contain ironic teasing about lateness and sincere gratitude."
  },
  {
    id: "P12-07", domain: "context", intent: "sarcasm", title: "Fourth announcement",
    setting: "Management announces its fourth last-minute schedule change this month. An employee shakes their head.",
    line: "I love how early we always hear about these changes.", speaker: "Employee",
    visual: "An abrupt schedule-update notice arriving at the last moment.", illustration: "🗓️",
    options: ["The employee objects to calendars.", "The employee admires punctual notices.", "The employee criticizes lack of advance notice.", "The employee wants fewer team members."],
    correct: 2, rationale: "The praise of early notice conflicts with repeated last-minute communication."
  },
  {
    id: "P12-08", domain: "context", intent: "sincere", title: "Small kindness",
    setting: "An exhausted runner finishes a long race. A friend hands them water. The runner drinks and smiles.",
    line: "You're a lifesaver.", speaker: "Runner",
    visual: "Runner happily accepting a water bottle after the race.", illustration: "🏃",
    options: ["An accusation that the friend endangered them.", "A complaint about the water.", "A sarcastic criticism of late help.", "A figurative expression of genuine appreciation."],
    correct: 3, rationale: "This is nonliteral language, but it is appreciative rather than sarcastic."
  },
  {
    id: "P12-09", domain: "uncertainty", intent: "ambiguous", title: "A neutral voice",
    setting: "You hear a neutral-sounding recording saying one sentence. No earlier dialogue, facial expression, or event is provided.",
    line: "That's interesting.", speaker: "Unknown speaker",
    visual: "Audio waveform with no contextual scene.", illustration: "🎧",
    options: ["The words prove a sincere interest.", "Both sincere and sarcastic meanings remain possible.", "The words prove annoyance.", "The words prove disbelief."],
    correct: 1, rationale: "Without meaningful context or reliable vocal cues, certainty is not justified."
  },
  {
    id: "P12-10", domain: "social-intent", intent: "sarcasm", title: "Late arrival",
    setting: "After everyone has waited forty minutes, Devon finally arrives. Quinn points at the clock.",
    line: "How considerate of you.", speaker: "Quinn",
    visual: "A clock showing a lengthy delay, the group still waiting.", illustration: "⏰",
    options: ["Quinn criticizes Devon for keeping everyone waiting.", "Quinn sincerely celebrates Devon's punctuality.", "Quinn wants to know the exact time.", "Quinn is asking for a gift."],
    correct: 0, rationale: "The courteous phrase contrasts with inconsiderate lateness, indicating sarcastic criticism."
  },
  {
    id: "P12-11", domain: "context", intent: "sincere", title: "Successful repair",
    setting: "An engineer finally repairs the failed server. The service comes back online, and colleagues applaud.",
    line: "Well, that was worth the effort.", speaker: "Engineer",
    visual: "Healthy service dashboard and relieved colleagues.", illustration: "🛠️",
    options: ["The engineer resents the successful result.", "The engineer doubts the server is fixed.", "The engineer sincerely values the successful repair.", "The engineer is mocking a colleague."],
    correct: 2, rationale: "The outcome and positive reaction support the speaker's literal meaning."
  },
  {
    id: "P12-12", domain: "social-intent", intent: "sarcasm", title: "Concert review",
    setting: "After an excellent concert with sustained applause, two friends leave smiling. One is eager to buy tickets again.",
    line: "Absolutely terrible. We should go again tomorrow.", speaker: "Friend",
    visual: "Smiling concertgoers after an enthusiastic performance.", illustration: "🎶",
    options: ["The friend genuinely disliked the concert.", "The friend thinks the band should quit.", "The friend is angry at the audience.", "The negative description is playful irony expressing enjoyment."],
    correct: 3, rationale: "The enthusiasm and desire to return make the negative judgment playful rather than literal."
  }
] as const;
