// Placeholder data shaped like the future Supabase tables (people, prayer_logs).
// Swap these for real Supabase queries once the project is connected —
// see src/lib/supabaseClient.js.

export const PRAYERS = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha']

// Keep empty — everyone registers via "Other" / custom name entry.
// This way new members always go through the flow and get properly saved.
export const PEOPLE = []

// status: 'completed' | 'missed' | 'unrecorded'
export const todayStatus = {
  Fajr: 'completed',
  Zuhr: 'completed',
  Asr: 'completed',
  Maghrib: 'completed',
  Isha: 'unrecorded',
}

export const historyDays = [
  {
    date: 'September 13',
    entries: { Fajr: 'completed', Zuhr: 'completed', Asr: 'missed', Maghrib: 'completed', Isha: 'completed' },
  },
  {
    date: 'September 12',
    entries: { Fajr: 'completed', Zuhr: 'completed', Asr: 'completed', Maghrib: 'completed', Isha: 'completed' },
  },
  {
    date: 'September 11',
    entries: { Fajr: 'missed', Zuhr: 'completed', Asr: 'completed', Maghrib: 'completed', Isha: 'completed' },
  },
]

export const weeklyProgress = {
  totalCompleted: 31,
  totalPossible: 35,
  streak: 5,
  perPrayer: {
    Fajr: { done: 6, total: 7 },
    Zuhr: { done: 7, total: 7 },
    Asr: { done: 5, total: 7 },
    Maghrib: { done: 7, total: 7 },
    Isha: { done: 6, total: 7 },
  },
}

export const groupProgress = [
  { name: 'Salman', done: 31, total: 35, note: 'Strong week' },
  { name: 'Ahmed', done: 29, total: 35, note: 'Keep going' },
  { name: 'Ali', done: 34, total: 35, note: 'Great consistency' },
  { name: 'Hamza', done: 27, total: 35, note: 'Build your streak' },
]
