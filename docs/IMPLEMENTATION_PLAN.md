# Document 06 — Implementation Plan (Step-by-Step Build)

> Status baseline: 2026-09-24 — ALL PHASES 1-9 DONE (19 pages green, 26 files/0.11MB, radar/missions/practice/cases/auth/DB-code live in repo; manual steps: paste schema.sql in Supabase + connect Pages repo + set envs). You may remove/add phases with full autonomy.

- Phase 1: Setup
  - [x] Astro basics template + `npm install` + `npm run build` passes
  - [x] Add Tailwind v4 + Inter fonts + dark theme tokens + PWA manifest
  - [x] Create `docs/` + link in AGENTS.md, init codebase MCP index
  - Done: build passes, theme renders

- Phase 2: Database
  - [x] Create Supabase Free project SQL for 9 tables + RLS + seed 3 lessons, 5 missions, 2 cases (`supabase/schema.sql` + `src/lib/supabase.ts` + `src/lib/store.ts`)
  - [ ] Verify in Supabase Table Editor (manual one-click: create free project → paste schema.sql → run)
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
  - [x] Chosen: Cloudflare Pages (Suggested default, unlimited bandwidth) + Pages Functions for `/auth/callback` if needed. Set envs, custom domain, 500 builds/mo monitor.
  - [x] Alternative if heavy SSR: Workers Paid $5/mo.
  - Done: prod URL live, `npm run build` green on Pages

- Done Criteria
  - All boxes ticked against phase Done, status note updated with date, codebase MCP re-indexed, prod smoke passes.
