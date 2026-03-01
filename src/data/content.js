// Situation types and their TRUCE scripts
export const SITUATIONS = [
  { id: 'criticism', label: 'Criticism', emoji: '🎯' },
  { id: 'disrespect', label: 'Disrespect', emoji: '😤' },
  { id: 'money', label: 'Money', emoji: '💸' },
  { id: 'parenting', label: 'Parenting', emoji: '👨‍👩‍👧' },
  { id: 'jealousy', label: 'Jealousy', emoji: '💚' },
  { id: 'boundaries', label: 'Boundaries', emoji: '🚧' },
  { id: 'misunderstanding', label: 'Misunderstanding', emoji: '🤷' },
  { id: 'work', label: 'Work Stress', emoji: '💼' },
];

export const SCRIPTS = {
  criticism: [
    "I'm getting worked up. I want to fix this, not win it. Can we pause for 10 and come back?",
    "I hear what you're saying. I need a moment to respond in a way I won't regret.",
    "That landed hard. I'm not ready to respond well yet — can I have a minute?",
  ],
  disrespect: [
    "I need you to know that the way this is being said is making it hard for me to hear the message.",
    "I'm feeling disrespected right now. I want to keep talking, but I need a reset first.",
    "I hear you. I'm not ready to respond well yet. I need a minute.",
  ],
  money: [
    "Money stress is real for both of us. Can we slow down and talk about this without scoring points?",
    "I want to solve this together, not argue about it. Can we take a breath and come back to this?",
    "I'm feeling defensive right now. Let me take 90 seconds and come back so we can actually solve this.",
  ],
  parenting: [
    "We both want what's best for them. Can we step back and align before we say anything in front of the kids?",
    "I'm getting heated on this. Let's pause — I don't want our kids to see us like this.",
    "I hear your concern. I have a different view and I want to share it calmly. Give me a moment.",
  ],
  jealousy: [
    "I'm feeling insecure right now and I don't want to say something I'll regret. Can I have 90 seconds?",
    "This is hard for me to admit, but I'm feeling jealous. I want to talk about it without it turning into a fight.",
    "I'm noticing some big feelings. Let me reset so I can talk about this from a calmer place.",
  ],
  boundaries: [
    "I need to be honest — that crossed a line for me. I'm not angry, but I need you to hear this.",
    "I care about us, and I also need to set a boundary here. Can we talk about it without it escalating?",
    "This isn't okay for me. I want to explain why without it turning into a fight.",
  ],
  misunderstanding: [
    "I think we're talking past each other. Can I try to explain what I actually meant?",
    "I don't think you heard what I was trying to say — and I probably didn't hear you either. Can we reset?",
    "I think there's a miscommunication here. Can we slow down and make sure we're understanding each other?",
  ],
  work: [
    "I'm carrying a lot right now and I don't want to take it out on you. Give me 90 seconds.",
    "Work stress is bleeding into this. Let me take a breath so I can be fair to you.",
    "I'm overwhelmed and it's affecting how I'm showing up. Can we pause so I can reset?",
  ],
};

export const NEXT_MOVES = [
  { id: 'clarify', label: 'Ask a clarifying question', emoji: '❓' },
  { id: 'own', label: 'Own your part', emoji: '🤝' },
  { id: 'boundary', label: 'Set a boundary', emoji: '🚧' },
  { id: 'repair', label: 'Repair attempt', emoji: '🩹' },
  { id: 'schedule', label: 'Schedule a redo', emoji: '📅' },
];

export const HOT_WORDS = [
  'always', 'never', 'everyone', 'nobody', 'hate', 'stupid', 'idiot',
  'useless', 'pathetic', 'worst', 'terrible', 'awful', 'disgusting',
  'obviously', 'clearly', 'you never', 'you always', "you're so",
];

// Generates a calm rewrite of a message
export function analyzeText(text) {
  const lower = text.toLowerCase();
  const flagged = HOT_WORDS.filter(w => lower.includes(w));

  const calmRewrite = text
    .replace(/\balways\b/gi, 'sometimes')
    .replace(/\bnever\b/gi, 'rarely')
    .replace(/\beveryone\b/gi, 'many people')
    .replace(/\bnobody\b/gi, 'few people')
    .replace(/\bhate\b/gi, "really don't like")
    .replace(/\bstupid\b/gi, 'frustrating')
    .replace(/\bidiot\b/gi, 'frustrating')
    .replace(/\buseless\b/gi, 'not helpful right now')
    .replace(/\bpathetic\b/gi, 'hard to deal with')
    .replace(/\bobviously\b/gi, 'it seems to me')
    .replace(/\bclearly\b/gi, 'from my perspective');

  // Boundary version – direct and firm
  const boundaryVersion =
    "I need to be clear: " +
    calmRewrite.replace(/^I |^You /i, match => match) +
    " That's a firm boundary for me.";

  // Short version – first sentence only, cleaned up
  const firstSentence = calmRewrite.split(/[.!?]/)[0].trim();
  const shortVersion = firstSentence.length > 10
    ? firstSentence + "."
    : calmRewrite;

  return { flagged, calmRewrite, boundaryVersion, shortVersion };
}
