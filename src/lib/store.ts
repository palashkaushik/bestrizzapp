// Local-first XP/streak store. Supabase-ready: same shapes as BACKEND_SCHEMA tables.
// When PUBLIC_SUPABASE_URL is set, callers also insert to Supabase; locally we always persist.
const K = { xp: 'rizz.xp', streak: 'rizz.streak', log: 'rizz.log', lessons: 'rizz.lessons' };

export function getXP(): number { return Number(localStorage.getItem(K.xp) ?? 0); }
export function addXP(n: number): number {
  const v = getXP() + n; localStorage.setItem(K.xp, String(v)); touchStreak(); return v;
}
export function getStreak(): number { return Number(localStorage.getItem(K.streak) ?? 0); }
function touchStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem(K.log);
  if (last !== today) { localStorage.setItem(K.log, today); localStorage.setItem(K.streak, String(getStreak() + 1)); }
}
export function finishLesson(slug: string, xp: number) {
  const done = JSON.parse(localStorage.getItem(K.lessons) ?? '[]') as string[];
  if (!done.includes(slug)) { done.push(slug); localStorage.setItem(K.lessons, JSON.stringify(done)); addXP(xp); }
  return done;
}
export function lessonsDone(): string[] {
  try { return JSON.parse(localStorage.getItem(K.lessons) ?? '[]'); } catch { return []; }
}
