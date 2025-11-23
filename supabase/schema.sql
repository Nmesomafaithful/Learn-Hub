-- Users/profiles table (link to Auth users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  role text default 'user',
  theme text default 'dark',
  created_at timestamptz default now()
);

-- Courses
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  teacher_id uuid references profiles(id) not null,
  created_at timestamptz default now()
);

-- Classes (scheduled sessions)
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) not null,
  teacher_id uuid references profiles(id) not null,
  scheduled_at timestamptz,
  duration_minutes int,
  mode text check (mode in ('group','one-on-one')) default 'group',
  capacity int default 0,
  created_at timestamptz default now()
);

-- One-on-one slots
create table if not exists one_on_one_slots (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references profiles(id) not null,
  class_id uuid references classes(id),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text check (status in ('open','requested','approved','booked')) default 'open',
  created_at timestamptz default now()
);

-- Enrollments
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) not null,
  student_id uuid references profiles(id) not null,
  status text check (status in ('requested','enrolled','cancelled')) default 'requested',
  created_at timestamptz default now()
);

-- Quizzes
create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) not null,
  teacher_id uuid references profiles(id) not null,
  title text not null,
  questions jsonb,
  due_at timestamptz,
  created_at timestamptz default now()
);

-- Practicals / resources
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) not null,
  teacher_id uuid references profiles(id) not null,
  title text,
  type text check (type in ('file','link','video')) default 'file',
  url text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Discussions and posts
create table if not exists discussions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) not null,
  title text,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  discussion_id uuid references discussions(id) not null,
  author_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamptz default now()
);

-- Attendance
create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) not null,
  student_id uuid references profiles(id) not null,
  present boolean default false,
  marked_by uuid references profiles(id),
  marked_at timestamptz default now()
);

-- Simple example RLS policy snippets (enable and adjust in Supabase)
-- ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Teachers can manage their classes" ON classes FOR ALL USING (auth.uid() = teacher_id);
