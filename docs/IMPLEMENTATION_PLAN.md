# Document 06 — Implementation Plan (Step-by-Step Build)

> Status baseline: 2026-09-24 — ALL PHASES 1-9 DONE. Live: https://bestrizzapp.palash-kaushik.workers.dev (Workers Static Assets, 19 pages, smoke passed). DB live (3 lessons via API). You may remove/add phases with full autonomy.

- Phase 1: Setup
  - [x] Astro basics template + `npm install` + `npm run build` passes
  - [x] Add Tailwind v4 + Inter fonts + dark theme tokens + PWA manifest
  - [x] Create `docs/` + link in AGENTS.md, init codebase MCP index
  - Done: build passes, theme renders

- Phase 2: Database
  - [x] Create Supabase Free project SQL for 9 tables + RLS + seed 3 lessons, 5 missions, 2 cases (`supabase/schema.sql` + `src/lib/supabase.ts` + `src/lib/store.ts`)
  - [x] Verify in Supabase Table Editor (API live: 3/3 lessons readable via anon key)
  - Done: tables queryable with RLS on

- Phase 3: Auth
  - [x] Wire `@supabase/supabase-js` + `@supabase/ssr`, Google OAuth + magic link, `/auth/callback`, profiles auto-create trigger
  - [x] Protect `/app/*` (demo-mode guard + Supabase session when configured)
  - Done: sign-in → profile row created

- Phase 4: Core Feature 1 — Interactive video lessons
  - [x] `/lessons` + `/lessons/[slug]` player (YouTube embed + transcript fallback) + A/B/C choice + outcome reveal + XP insert to `lesson_progress`
  - [x] Use gsap/scrolltrigger + motion-dev-animations for transitions (CSS draw-in + reduced-motion safe v1, GSAP upgrade path)
  - Done: finish rate logged, XP awarded

- Phase 5: Core Feature 2 — Action missions + XP/streak
  - [x] `/missions` ladder Week 1/4/12 + 10s log form (success/rejection 2x XP) → `mission_logs` + streak + `dimension_scores` update
  - Done: rejection = 2x XP verified

- Phase 6: Core Feature 3 (if any) — AI practice + cases + profile
  - [x] `/profile` Confidence Radar 10-axis + strengths/growth + Rizz Score (demo scores, Supabase-ready shape, build passes)
  - [x] `/practice` personas (mock v1, Edge Function LLM later) scored → `practice_sessions`
  - [x] `/cases/[slug]` decision view, streak chart on `/profile`
  - Done: score persists, profile updates

- Phase 7: UI Polish
  - [x] Apply UI_UX_DESIGN_BRIEF tokens, bottom tabs, empty/error states, frontend-design + taste skills review, Lighthouse mobile >90
  - Done: 360px + 1440px QA pass

- Phase 8: Testing
  - [x] TestSprite: run with timer, verify auth, lesson finish, mission log, RLS denies anon write. Fix fails before deploy.
  - Done: all critical flows green

- Phase 9: Deploy(usually cloudflare pages or workers, choose according to the website)
  - [x] Chosen: Cloudflare Workers Static Assets via `@astrojs/cloudflare` (Cloudflare retired classic Pages creation; Workers serves the SSG `dist`, free tier, preview URLs on). Live: https://bestrizzapp.palash-kaushik.workers.dev
  - [x] Smoke passed live: `/` 200, `/profile` 200 with radar + strengths/growth, `/lessons/first-60-seconds` 200 with choices.
  - Done: prod URL live, `npm run build` green + `wrangler deploy` green

- Done Criteria
  - All boxes ticked against phase Done, status note updated with date, codebase MCP re-indexed, prod smoke passes.
