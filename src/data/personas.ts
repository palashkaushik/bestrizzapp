export interface Persona { id: string; name: string; mood: string; opener: string; }
export const PERSONAS: Persona[] = [
  { id: 'ava', name: 'Ava (friendly)', mood: 'Warm, gives hooks.', opener: 'Hey! Quick opinion — coffee or chai for a first meet?' },
  { id: 'mia', name: 'Mia (neutral)', mood: 'Short replies, tests frame.', opener: 'Hi. What do you want?' },
  { id: 'zoe', name: 'Zoe (hard)', mood: 'Distracted, shit-tests.', opener: 'Make it quick.' },
];
export function scoreReply(text: string) {
  const q = (text.match(/\?/g) ?? []).length;
  const words = text.trim().split(/\s+/).length;
  const specific = /you|your|coffee|book|gym|dog|trip|song/i.test(text) ? 25 : 12;
  const balance = words >= 8 && words <= 30 ? 25 : 14;
  return { q: Math.min(30, 15 + q * 7), balance, follow: specific, vibe: Math.min(25, 12 + Math.floor(words / 4)) };
}
