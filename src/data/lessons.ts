export interface LessonChoice { label: string; outcome: string; best?: boolean; }
export interface Lesson {
  slug: string; title: string; level: string; minutes: number; xp: number;
  video: string; context: string; transcript: string; choices: LessonChoice[];
}
export const LESSONS: Lesson[] = [
  {
    slug: 'first-60-seconds', title: 'The First 60 Seconds', level: 'Beginner', minutes: 3, xp: 20,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    context: 'Coffee shop. She holds eye contact 2s. 60 seconds before she leaves.',
    transcript: 'Open in 3s. Specific opener beats generic. Smile, state, exit or hook.',
    choices: [
      { label: 'Open in 3s with a specific observation', outcome: 'Hook rate 3x. You get 2 min. +20 XP.', best: true },
      { label: 'Wait 10 min for the perfect line', outcome: 'Window closes. Lesson: speed > perfection.' },
      { label: 'Stare and never open', outcome: 'Creepy, not confident. Rep missed.' },
    ],
  },
  {
    slug: 'rejection-fuel', title: 'Rejection Is Fuel', level: 'Beginner', minutes: 2, xp: 20,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    context: 'Hard no incoming. Ego bruised. Log in 10s for 2x XP.',
    transcript: 'Rejection logged fast rewires fear. Double XP for nos.',
    choices: [
      { label: 'Thank them, log rejection in 10s', outcome: '2x XP. Fear drops. Streak lives.', best: true },
      { label: 'Argue or freeze', outcome: '0 XP. Repair next rep.' },
      { label: 'Hide and skip logging', outcome: 'No data, no growth.' },
    ],
  },
  {
    slug: 'intent-in-5', title: 'State Intent by Minute 5', level: 'Intermediate', minutes: 3, xp: 30,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    context: 'Good vibe drifting platonic at minute 4.',
    transcript: 'Intent early avoids friend-zone. Suggest one concrete next step.',
    choices: [
      { label: 'State intent + suggest coffee Thursday', outcome: 'Date or clean no. Both win.', best: true },
      { label: 'Keep small talk 20 more min', outcome: 'Fizzle. Energy leaks.' },
      { label: 'Ask for socials with no intent', outcome: 'Ghost risk high.' },
    ],
  },
];
