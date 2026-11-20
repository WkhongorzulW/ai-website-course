-- Туршилтын ангийн бүртгэлүүд
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (phone ~ '^[0-9]{8}$'),
  business_type text not null check (char_length(business_type) <= 50),
  business_name text check (char_length(business_name) <= 100),
  booking_method text check (char_length(booking_method) <= 60),
  message text check (char_length(message) <= 1000),
  status text not null default 'new' check (status in ('new','contacted','enrolled','declined'))
);

-- Багшийн самбарт нэвтрэх эрхтэй имэйлүүд
create table if not exists public.admins (
  email text primary key
);

alter table public.registrations enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where email = (auth.jwt() ->> 'email'));
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Хэн ч бүртгүүлж болно, гэхдээ төлөвийг өөрөө тохируулж чадахгүй
create policy "anyone can register" on public.registrations
  for insert to anon, authenticated
  with check (status = 'new');

-- Зөвхөн админ уншиж, төлөв өөрчилнө
create policy "admins read" on public.registrations
  for select to authenticated using (public.is_admin());
create policy "admins update" on public.registrations
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
