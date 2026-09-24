# Document 05 — Backend Schema (Data Model & Auth)

- Tables (with columns, types, PK/FK)
  - `profiles` (pk id uuid FK auth.users, handle text unique, level text default 'Beginner', rizz_score int default 0, streak int default 0, xp int default 0, created_at timestamptz)
  - `lessons` (pk id uuid, slug text unique, title text, video_url text (YouTube unlisted v1), transcript text, duration_s int, level text, order int)
  - `lesson_choices` (pk id uuid, fk lesson_id → lessons.id, label text, is_best boolean, outcome_text text, outcome_stats jsonb)
  - `lesson_progress` (pk id uuid, fk user_id → profiles.id, fk lesson_id → lessons.id, choice_id uuid nullable, finished boolean default false, xp_earned int, created_at timestamptz, unique(user_id, lesson_id))
  - `missions` (pk id uuid, title text, brief text, week int (1/4/12 ladder), xp int, required_level text)
  - `mission_logs` (pk id uuid, fk user_id → profiles.id, fk mission_id → missions.id, result text check in ('success','rejection','skip'), note text nullable, xp_earned int, created_at timestamptz)
  - `cases` (pk id uuid, slug text unique, title text, context text, video_url text nullable, stats jsonb, lesson_text text)
  - `practice_sessions` (pk id uuid, fk user_id → profiles.id, persona text, score_q int, score_balance int, score_followup int, score_vibe int, transcript jsonb, created_at timestamptz)
  - `dimension_scores` (pk id uuid, fk user_id → profiles.id, dim text (10 Rizz dims), value int 0-100, updated_at timestamptz, unique(user_id, dim))

- Relationships
  - profiles 1—* lesson_progress, mission_logs, practice_sessions, dimension_scores. lessons 1—* lesson_choices, lesson_progress. missions 1—* mission_logs.

- Auth Provider
  - Supabase Auth (Suggested default): Google OAuth + magic link. `auth.users` → trigger creates `profiles` row + 10 `dimension_scores` rows at 20.

- Row Level Security / Permissions
  - Enable RLS all user tables. `lessons, missions, cases, lesson_choices` read: anon + authenticated. `lesson_progress, mission_logs, practice_sessions, dimension_scores, profiles`: select/insert/update where `auth.uid() = user_id` (or id). Service_role bypass server only for seeding.

- User Roles
  - `user` default, `admin` via `profiles.is_admin boolean` (Suggested default, check in Edge Function for seeding). No orgs v1.

- File Storage
  - Supabase Storage Free 1 GB (Suggested default): buckets `avatars` (public read, 2 MB limit), `thumbnails` (public). Videos stay on YouTube unlisted v1, migrate to Bunny Stream later. No user video uploads v1.

- Sensitive Fields
  - Never expose `service_role`, Resend key, OAuth secrets client-side. PII: email in auth only, not in profiles. Notes in mission_logs user-private via RLS. Delete-account = delete auth user (cascade).
