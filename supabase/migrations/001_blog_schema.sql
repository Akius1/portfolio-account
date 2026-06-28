-- ═══════════════════════════════════════════
-- BLOG SCHEMA MIGRATION
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- ── 1. Profiles (extends auth.users) ──────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   text unique,
  avatar_url text,
  role       text not null default 'reader' check (role in ('reader', 'admin')),
  created_at timestamptz default now()
);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 2. Posts ──────────────────────────────
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  subtitle      text,
  cover_url     text,
  content       jsonb not null default '{}',
  content_html  text,
  excerpt       text,
  tags          text[] default '{}',
  reading_time  int,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  author_id     uuid references public.profiles(id) on delete set null,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists posts_slug_idx on public.posts(slug);
create index if not exists posts_status_idx on public.posts(status, published_at desc);

-- ── 3. Comments ───────────────────────────
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.posts(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  parent_id   uuid references public.comments(id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 2000),
  is_approved boolean default false,
  created_at  timestamptz default now()
);

create index if not exists comments_post_id_idx on public.comments(post_id);

-- ── 4. Likes ──────────────────────────────
create table if not exists public.likes (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid not null references public.posts(id) on delete cascade,
  user_id      uuid references auth.users(id) on delete set null,
  fingerprint  text,
  created_at   timestamptz default now(),
  unique nulls not distinct (post_id, user_id),
  unique nulls not distinct (post_id, fingerprint)
);

create index if not exists likes_post_id_idx on public.likes(post_id);

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════

alter table public.profiles  enable row level security;
alter table public.posts      enable row level security;
alter table public.comments   enable row level security;
alter table public.likes      enable row level security;

-- Profiles
create policy "Public read profiles" on public.profiles
  for select using (true);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Posts
create policy "Public read published posts" on public.posts
  for select using (status = 'published');
create policy "Admin full access to posts" on public.posts
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Comments
create policy "Public read approved comments" on public.comments
  for select using (is_approved = true);
create policy "Authenticated users insert comments" on public.comments
  for insert with check (auth.uid() is not null and auth.uid() = author_id);
create policy "Admin full access to comments" on public.comments
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Likes
create policy "Public read likes" on public.likes
  for select using (true);
create policy "Public insert likes" on public.likes
  for insert with check (true);

-- ═══════════════════════════════════════════
-- REALTIME
-- ═══════════════════════════════════════════
alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.likes;
