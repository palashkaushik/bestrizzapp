export interface CaseItem { slug: string; title: string; context: string; lesson: string; stats: string; }
export const CASES: CaseItem[] = [
  { slug: 'coffee-shop-eye-contact', title: 'Coffee Shop Eye Contact', context: 'She holds eye contact 2s. Friends nearby. 60 seconds.', lesson: 'Opened in 3s with a specific line. Groups reward speed + warmth.', stats: 'Hook 68% · Number 22% · +20 XP' },
  { slug: 'group-test-handled', title: 'Group Test Handled', context: 'Her friend: who are you? Pressure on.', lesson: 'Paused 2s, smiled, introduced. Tests = interest. Pass = status.', stats: 'Pass 74% · Blowout 9% · +25 XP' },
];
