// Charisma dimensions — mirrors docs/BACKEND_SCHEMA.md `dimension_scores.dim`
// Supabase shape: { user_id: uuid, dim: string, value: 0-100 }
// v1 demo uses localStorage fallback; swap loader for Supabase query later.
export interface CharismaDimension {
  key: string;
  label: string;
  short: string;
  tip: string;
}

export const DIMENSIONS: CharismaDimension[] = [
  { key: 'approach', label: 'Approach Initiation', short: 'Approach', tip: 'Open within 3 seconds. Ask for time → opinion → direct.' },
  { key: 'presence', label: 'Eye Contact & Presence', short: 'Presence', tip: 'Hold eye contact 70%. Feet planted, shoulders back.' },
  { key: 'opener', label: 'Opener Originality', short: 'Opener', tip: 'Specific > generic. Reference one real detail.' },
  { key: 'calibration', label: 'Emotional Calibration', short: 'Calib.', tip: 'Match energy first, then lead +10%.' },
  { key: 'flow', label: 'Conversation Flow', short: 'Flow', tip: 'Statement → question → callback. No interview mode.' },
  { key: 'humor', label: 'Humor & Playfulness', short: 'Humor', tip: 'One playful tease per 3 min. Smile when it lands.' },
  { key: 'listening', label: 'Active Listening', short: 'Listen', tip: 'Repeat last 3 words. Follow up, don’t pivot.' },
  { key: 'pressure', label: 'Confidence Under Pressure', short: 'Composure', tip: 'Pause 2s on tests. Slow voice = status.' },
  { key: 'escalation', label: 'Intent Escalation', short: 'Escalate', tip: 'State intent early. Suggest the next step by min 5.' },
  { key: 'reflection', label: 'Reflection & Consistency', short: 'Reflect', tip: 'Log every rep in 10s. Streak > motivation.' },
];

// Demo scores — Highest: Emotional Calibration, Focus: Intent Escalation
export const DEMO_SCORES: Record<string, number> = {
  approach: 58,
  presence: 64,
  opener: 52,
  calibration: 86,
  flow: 71,
  humor: 67,
  listening: 74,
  pressure: 49,
  escalation: 34,
  reflection: 61,
};

export function rankDims(scores: Record<string, number>) {
  const rows = DIMENSIONS.map((d) => ({ ...d, value: scores[d.key] ?? 0 }));
  const sorted = [...rows].sort((a, b) => b.value - a.value);
  return {
    rows,
    strengths: sorted.slice(0, 2),
    growth: sorted.slice(-2).reverse(),
    average: Math.round(rows.reduce((s, r) => s + r.value, 0) / rows.length),
  };
}
