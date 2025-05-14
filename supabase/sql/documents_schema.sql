-- documents_schema.sql
create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  file_name text,
  file_path text,
  type text,
  size int,
  created_at timestamp default now()
);

alter table documents enable row level security;

create policy "Allow authenticated access"
  on documents for all
  using (auth.role() = 'authenticated');
