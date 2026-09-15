import { createClient } from '@supabase/supabase-js'

// Add these to a local .env file (never commit real keys):
//   VITE_SUPABASE_URL=https://your-project.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Suggested schema:
//
// people
//   id uuid pk, name text, pin_hash text, created_at timestamptz
//
// prayer_logs
//   id uuid pk, person_id uuid fk -> people.id, prayer_date date,
//   prayer text check (prayer in ('Fajr','Zuhr','Asr','Maghrib','Isha')),
//   status text check (status in ('completed','missed','unrecorded')),
//   updated_at timestamptz
//
// Until this is connected, the app runs on src/data/mockData.js.
