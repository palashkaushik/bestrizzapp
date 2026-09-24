# Document 03 — App Flow (Navigation & User Journey)

- Pages List
  - `/` landing, `/app` dashboard, `/lessons` library, `/lessons/[slug]` interactive video lesson player, `/missions` ladder, `/missions/[id]` log screen, `/practice` AI personas, `/cases` library, `/cases/[slug]` decision case, `/profile` confidence profile + Rizz Score, `/auth/signin`, `/auth/callback`

- Navigation Type
  - Top nav (desktop) + bottom tab bar (mobile, Suggested default): Lessons, Missions, Practice, Cases, Profile. Persistent XP/streak pill.

- First Screen
  - `/` hero: Turn Rejection Into Currency + Start Training CTA + 60-sec demo lesson embed. Logged-in → redirect `/app`.

- Auth Flow
  - Sign in with Google (one-click, Suggested default) + email magic link fallback via Supabase Auth. `/auth/callback` exchanges code, creates `profiles` row, redirects `/app?onboarding=1`. 7-day session (Free default). No password v1.

- Core User Journey 1
  - Video lesson loop (Empirio-style): enter real situation → watch 1-3 min video → see constraints → make call (A/B/C) → see what happened + numbers/second-order → get pattern point → XP + next lesson. Finish rate tracked.

- Core User Journey 2
  - IRL mission loop: pick mission (e.g. ask time) → do IRL → log in 10s (success/rejection + note) → rejection = 2x XP → streak++ → profile dimensions update → unlock next mission. Week 1/4/12 gating.

- Empty States
  - No missions logged: “No reps yet. Your first rep: ask for time. 30 seconds.” + CTA. No lessons finished: show starter pack 3. No practice: “Talk to Ava (friendly) first.”

- Error States
  - Video fails: show transcript + retry + “continue without video”. Offline log: queue in localStorage, sync on reconnect. Auth expired: silent refresh, else redirect signin with `next=` param.

- Redirects
  - `/` if authed → `/app`. Protected `/app/*`, `/missions/*`, `/profile` → `/auth/signin?next=...` if anon. `/auth/callback` error → `/auth/signin?error=1`.
