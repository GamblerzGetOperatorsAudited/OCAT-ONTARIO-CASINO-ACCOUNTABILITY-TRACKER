// Shared OCAT constants used by both client and server

export const CASINO_LIST = [
  "BetMGM Ontario",
  "FanDuel Ontario",
  "DraftKings Ontario",
  "Northstar Gaming",
  "Bet365 Ontario",
  "888 Casino Ontario",
  "PointsBet Ontario",
  "LeoVegas Ontario",
  "Caesars Ontario",
  "Unibet Ontario",
];

export const CATEGORIES = [
  "Standard 4.10 — Game Malfunctions",
  "Standard 5.01 — Asset Protection",
  "Standard 2.01 — Responsible Gambling",
  "Standard 3.01 — Account Management",
  "Standard 6.01 — Advertising Compliance",
  "Standard 7.01 — Data Privacy",
];

export const QUESTION_GROUPS = [
  {
    id: "technical",
    title: "Step 2: Technical / Legal Audit",
    questions: [
      { id: "q1", text: "Did the malfunction occur at a point of potential payout?" },
      { id: "q2", text: "Was a Round ID or Game ID visible/provided?" },
      { id: "q3", text: "Did you formally request Server-Side Game Logs?" },
      { id: "q4", text: "Was that request for logs denied by the casino?" },
      { id: "q5", text: "Did the T&Cs provided match the game's actual behavior?" },
    ],
  },
  {
    id: "process",
    title: "Step 3: Process & Paper Trail",
    questions: [
      { id: "q6", text: "Did a human (not a bot) respond within 24 hours?" },
      { id: "q7", text: "Were you provided an Internal Dispute ID number?" },
      { id: "q8", text: "Did the agent provide their 'Escalation Manager' info?" },
      { id: "q9", text: "Was the interaction transcript shared with you?" },
      { id: "q10", text: "Did they inform you of your right to contact iGO/AGCO?" },
    ],
  },
  {
    id: "retaliation",
    title: "Step 4: Retaliation & Ethics",
    questions: [
      { id: "q11", text: "Was your account locked after you questioned them?" },
      { id: "q12", text: "Are withdrawal delays happening alongside this dispute?" },
      { id: "q13", text: "Did they offer a 'Goodwill Bonus' to drop the claim?" },
      { id: "q14", text: "Did they ask you to sign a non-disclosure/waiver?" },
      { id: "q15", text: "Did they blame your local internet/hardware?" },
    ],
  },
  {
    id: "impact",
    title: "Step 5: Impact & Health",
    questions: [
      { id: "q16", text: "Is this incident causing financial or emotional distress?" },
      { id: "q17", text: "Did you mention distress to the operator?" },
      { id: "q18", text: "Did they offer RG tools after you showed distress?" },
      { id: "q19", text: "Is this a recurring issue with this license holder?" },
      { id: "q20", text: "Do you believe this is a systemic technical flaw?" },
      { id: "q21", text: "Did the incident result in a financial loss exceeding $500?" },
      { id: "q22", text: "Have you filed a complaint with AGCO or iGO previously?" },
      { id: "q23", text: "Did the operator's response worsen your mental health?" },
      { id: "q24", text: "Are other players known to have experienced the same issue?" },
      { id: "q25", text: "Do you have documentary evidence (screenshots, emails, logs)?" },
    ],
  },
];

export const STANDARDS = [
  {
    id: "Standard 4.10",
    title: "Game Malfunctions",
    desc: "Operators must have clear policies for handling technical glitches and ensuring fair outcomes. All malfunctions must be logged and disclosed to players.",
    agco: "AGCO iGaming Standard 4.10",
  },
  {
    id: "Standard 5.01",
    title: "Asset Protection",
    desc: "Ensures that player funds and promised prizes (like extra spins) are accurately handled and protected. Operators cannot void legitimate winnings without documented cause.",
    agco: "AGCO iGaming Standard 5.01",
  },
  {
    id: "Standard 2.01",
    title: "Responsible Gambling",
    desc: "Mandates that players are provided with tools to limit play and access support. Operators must proactively offer RG resources when distress signals are detected.",
    agco: "AGCO iGaming Standard 2.01",
  },
  {
    id: "Standard 3.01",
    title: "Account Management",
    desc: "Operators must maintain accurate account records and cannot lock accounts without documented justification. Players must be notified of any account actions.",
    agco: "AGCO iGaming Standard 3.01",
  },
  {
    id: "Standard 6.01",
    title: "Advertising Compliance",
    desc: "All promotional material must be accurate, not misleading, and clearly state terms and conditions. Bonus offers must be honored as advertised.",
    agco: "AGCO iGaming Standard 6.01",
  },
  {
    id: "Standard 7.01",
    title: "Data Privacy",
    desc: "Operators must protect player data in compliance with PIPEDA and Ontario privacy laws. Players have the right to request their data and dispute inaccuracies.",
    agco: "AGCO iGaming Standard 7.01",
  },
];

export const PILLARS = [
  {
    id: "no_malice",
    title: "No Malice",
    subtitle: "Anti-Defamation",
    text: "I agree to provide information without embellishment or willful misleading statements. OCAT is not associated with members who abuse the platform for defamation.",
  },
  {
    id: "honest",
    title: "Honest & Truthful",
    subtitle: "Certified Accuracy",
    text: "I certify that every statement is the absolute truth of my personal experiences. False reporting leads to immediate ban and potential legal action.",
  },
  {
    id: "proof",
    title: "Proof of Breach",
    subtitle: "Evidence Required",
    text: "I agree to provide evidence of implications regarding AGCO Registrar breaches when requested by the platform or regulatory authorities.",
  },
  {
    id: "respectful",
    title: "Respectful Community",
    subtitle: "Civil Discourse",
    text: "No harassing, bullying, or targeted arguing with other platform members. Violations result in immediate account suspension.",
  },
];

export function getSeverityLabel(score: number): string {
  if (score >= 75) return "CRITICAL";
  if (score >= 50) return "HIGH";
  if (score >= 25) return "MEDIUM";
  return "LOW";
}

export function getSeverityStyle(score: number): { color: string; bg: string } {
  if (score >= 75) return { color: "text-red-700", bg: "bg-red-50" };
  if (score >= 50) return { color: "text-orange-700", bg: "bg-orange-50" };
  if (score >= 25) return { color: "text-yellow-700", bg: "bg-yellow-50" };
  return { color: "text-green-700", bg: "bg-green-50" };
}
