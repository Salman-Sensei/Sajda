# Salah Diary (Sajda)

A minimal, private prayer-tracking app for a small group of friends to log
their five daily prayers and review progress together.

## Stack

- React + Vite + Tailwind CSS
- Supabase (PostgreSQL) — schema suggestion in `src/lib/supabaseClient.js`
- Vercel for hosting

## Getting started

```bash
npm install
npm run dev
```

The app currently runs on mock data in `src/data/mockData.js` so the UI
is fully browsable without a database. To connect Supabase:

1. Copy `.env.example` to `.env` and fill in your project URL and anon key.
2. Create the `people` and `prayer_logs` tables (see comments in
   `src/lib/supabaseClient.js`).
3. Replace the mock-data reads in `src/screens/*.jsx` with Supabase queries.

## Screens

Splash → Person selection → PIN entry → Dashboard (today's prayers),
with History, My Progress, and Group Progress reachable from the nav
(bottom nav on mobile, top nav on desktop).

## Design notes

Warm cream background, charcoal text, muted sage-green accent for
completed prayers, muted rose for missed, neutral gray for unrecorded.
No emojis, no heavy shadows, motion kept to 150–400ms fades and slides.
