# Document 02 — TRD (Technical Requirements Document)

- Frontend
  - Astro 7.3.4 SSG + islands (Suggested default, already installed). TypeScript strict. Tailwind CSS v4 for styling (use tailwind-4-docs skill). No UI framework v1 except Preact islands for interactive lesson player and XP toasts where needed.

- Backend
  - Supabase Free: Postgres + Edge Functions (Deno) + Realtime + Storage in one free project (Suggested default). Alternative superior pure-DB: Neon Free (100 projects, scale-to-zero, branching) if you outgrow Supabase pausing. No custom server v1.

- Database
  - Supabase Postgres Free: 500 MB DB, 5 GB egress, 50k MAU auth included, 1 GB storage, 500k Edge invocations, 2 projects, pauses after 7d inactivity (mitigate with weekly cron ping). (Suggested default)

- Auth
  - Supabase Auth email + OAuth Google (Suggested default, $0 extra, RLS-native, SSR via @supabase/ssr). Alternatives: Better Auth (free OSS, own DB, no per-user fees, best for ownership) or Clerk Hobby 50k MRU free (best drop-in UI, but users live outside DB). WorkOS 1M MAU noted but overkill v1.

- Hosting
  - Cloudflare Workers Static Assets via `@astrojs/cloudflare` (live: https://bestrizzapp.palash-kaushik.workers.dev). Cloudflare retired classic Pages creation mid-build, so Workers serves the SSG output — free tier, preview URLs on. Deploy: `npm run build && wrangler deploy`. (Was: Pages; switched per owner decision B.)

- Third-party APIs
  - Video v1: YouTube unlisted embeds, 100% free unlimited (Suggested default). Upgrade path: Bunny Stream (encoding FREE, storage $0.01/GB, CDN $0.005/GB, free player) when revenue. Avoid Mux/Cloudflare Stream v1 (pay per minute).
  - Email v1: Resend Free 100/day (Suggested default) for magic links fallback + streak nudges. None else v1.

- Key Libraries
  - `@supabase/supabase-js`, `@supabase/ssr`, `tailwindcss@4`, `@astrojs/cloudflare`, `wrangler` (dev, deploy only), `gsap` (gsap-core/scrolltrigger skills for lesson transitions), `motion` (motion-dev-animations skill for 60fps micro-interactions), `zod` for validation. Player: native `<video>` + YouTube IFrame API v1.

- Environment Variables
  - `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `PUBLIC_SITE_URL`, `RESEND_API_KEY` (optional v1). All in `.env`, never commit service_role.

- Constraints
  - $0/mo hard cap v1. Web-only responsive (no native). No copying Empirio code/assets (inspiration-only clean-room). Video lessons must work on 3G mobile browser. RLS on for all user tables. Build must stay <25 MB, <20k files for Pages Free.
