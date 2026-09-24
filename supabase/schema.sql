-- Best Rizz App — Supabase Free schema (run in Supabase SQL Editor)
-- 9 tables + RLS + profile auto-create + seed (3 lessons, 5 missions, 2 cases)

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  handle text unique, level text default 'Beginner',
  rizz_score int default 0, streak int default 0, xp int default 0,
  is_admin boolean default false, created_at timestamptz default now()
);
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  title text not null, video_url text, transcript text,
  duration_s int default 120, level text default 'Beginner', "order" int default 0
);
create table if not exists lesson_choices (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  label text not null, is_best boolean default false,
  outcome_text text, outcome_stats jsonb default '{}'
);
create table if not exists lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  choice_id uuid, finished boolean default false,
  xp_earned int default 0, created_at timestamptz default now(),
  unique(user_id, lesson_id)
);
create table if not exists missions (
  id uuid primary key default gen_random_uuid(), title text not null,
  brief text, week int default 1, xp int default 20, required_level text default 'Beginner'
);
create table if not exists mission_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  mission_id uuid references missions(id) on delete cascade,
  result text check (result in ('success','rejection','skip')),
  note text, xp_earned int default 0, created_at timestamptz default now()
);
create table if not exists cases (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  title text not null, context text, video_url text, stats jsonb default '{}', lesson_text text
);
create table if not exists practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  persona text, score_q int default 0, score_balance int default 0,
  score_followup int default 0, score_vibe int default 0,
  transcript jsonb default '[]', created_at timestamptz default now()
);
create table if not exists dimension_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  dim text not null, value int default 20, updated_at timestamptz default now(),
  unique(user_id, dim)
);

alter table profiles enable row level security;
alter table lesson_progress enable row level security;
alter table mission_logs enable row level security;
alter table practice_sessions enable row level security;
alter table dimension_scores enable row level security;
alter table lessons enable row level security;
alter table lesson_choices enable row level security;
alter table missions enable row level security;
alter table cases enable row level security;

drop policy if exists "public read lessons" on lessons;
create policy "public read lessons" on lessons for select using (true);
drop policy if exists "public read choices" on lesson_choices;
create policy "public read choices" on lesson_choices for select using (true);
drop policy if exists "public read missions" on missions;
create policy "public read missions" on missions for select using (true);
drop policy if exists "public read cases" on cases;
create policy "public read cases" on cases for select using (true);

drop policy if exists "own profile" on profiles;
create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "own lesson_progress" on lesson_progress;
create policy "own lesson_progress" on lesson_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own mission_logs" on mission_logs;
create policy "own mission_logs" on mission_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own practice" on practice_sessions;
create policy "own practice" on practice_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own dims" on dimension_scores;
create policy "own dims" on dimension_scores for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function handle_new_user() returns trigger as $$
begin
  insert into profiles (id) values (new.id) on conflict (id) do nothing;
  insert into dimension_scores (user_id, dim, value)
  select new.id, d, 20 from (values ('approach'),('presence'),('opener'),('calibration'),('flow'),('humor'),('listening'),('pressure'),('escalation'),('reflection')) v(d)
  on conflict do nothing;
  return new;
end; $$ language plpgsql security definer;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- Seed (run once)
insert into lessons (slug, title, video_url, transcript, duration_s, level, "order") values
 ('first-60-seconds','The First 60 Seconds','https://www.youtube.com/embed/dQw4w9WgXcQ','Context: you lock eyes across a coffee shop. Constraints: 60 seconds before she leaves. Stakes: one opener.',150,'Beginner',1),
 ('rejection-fuel','Rejection Is Fuel','https://www.youtube.com/embed/dQw4w9WgXcQ','Context: you get a hard no. Constraints: ego bruised. Stakes: log it in 10s for 2x XP.',130,'Beginner',2),
 ('intent-in-5','State Intent by Minute 5','https://www.youtube.com/embed/dQw4w9WgXcQ','Context: good vibe but drifting platonic. Constraints: minute 5. Stakes: suggest next step.',160,'Intermediate',3)
on conflict (slug) do nothing;
insert into missions (title, brief, week, xp) values
 ('Ask for the time','Voice shakes is fine. Survive. Log it.',1,10),
 ('Opinion opener','Ask: quick opinion on X. 30 seconds.',1,15),
 ('Compliment + go','One genuine compliment, exit clean.',4,25),
 ('5-min hold','Hold 5 min, ask 2 follow-ups.',4,40),
 ('Direct intent','State intent + suggest next step.',12,60)
on conflict do nothing;
insert into cases (slug, title, context, lesson_text) values
 ('coffee-shop-eye-contact','Coffee Shop Eye Contact','She holds eye contact 2s. Friends nearby.','You opened in 3s. Groups reward speed + warmth.'),
 ('group-test-handled','Group Test Handled','Her friend tests you: who are you?', 'Pause 2s, smile, introduce. Tests = interest.')
on conflict (slug) do nothing;
