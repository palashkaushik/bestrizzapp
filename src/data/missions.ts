export interface Mission { id: string; title: string; brief: string; week: 1 | 4 | 12; xp: number; }
export const MISSIONS: Mission[] = [
  { id: 'ask-time', title: 'Ask for the time', brief: 'Voice shakes is fine. Survive. Log it.', week: 1, xp: 10 },
  { id: 'opinion', title: 'Opinion opener', brief: 'Ask a quick opinion. 30 seconds.', week: 1, xp: 15 },
  { id: 'compliment-go', title: 'Compliment + go', brief: 'One genuine compliment, exit clean.', week: 4, xp: 25 },
  { id: 'hold-5', title: '5-minute hold', brief: 'Hold 5 min, ask 2 follow-ups.', week: 4, xp: 40 },
  { id: 'direct-intent', title: 'Direct intent', brief: 'State intent + suggest next step.', week: 12, xp: 60 },
];
