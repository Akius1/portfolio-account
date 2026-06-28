-- ═══════════════════════════════════════════
-- STORAGE: blog-images bucket
-- ═══════════════════════════════════════════

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,  -- 5MB
  array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do nothing;

-- Public read
create policy "Public read blog images" on storage.objects
  for select using (bucket_id = 'blog-images');

-- Admin upload
create policy "Admin upload blog images" on storage.objects
  for insert with check (
    bucket_id = 'blog-images' and
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Admin delete
create policy "Admin delete blog images" on storage.objects
  for delete using (
    bucket_id = 'blog-images' and
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
