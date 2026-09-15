import { supabase } from './supabaseClient'
import {
  PRAYERS,
  todayStatus as mockTodayStatus,
  historyDays as mockHistoryDays,
  weeklyProgress as mockWeeklyProgress,
  groupProgress as mockGroupProgress,
} from '../data/mockData'

export const isLive = Boolean(supabase)

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

// Returns { id } on success, or { error: 'wrong-pin' } / { error: 'other' }.
export async function verifyOrCreatePin(name, pin) {
  if (!supabase) {
    // Dev fallback with no Supabase configured yet: any PIN works.
    return { id: 'mock-person-id' }
  }
  const { data, error } = await supabase.rpc('verify_or_create_pin', {
    p_name: name,
    p_pin: pin,
  })
  if (error) {
    console.error('verify_or_create_pin failed:', error)
    return { error: 'other' }
  }
  const row = Array.isArray(data) ? data[0] : data
  if (!row || !row.id) return { error: 'wrong-pin' }
  return { id: row.id }
}

export async function fetchTodayStatuses(personId) {
  if (!supabase) return { ...mockTodayStatus }
  const { data, error } = await supabase
    .from('prayer_logs')
    .select('prayer, status')
    .eq('person_id', personId)
    .eq('prayer_date', todayISO())
  if (error || !data) return Object.fromEntries(PRAYERS.map((p) => [p, 'unrecorded']))
  const statuses = Object.fromEntries(PRAYERS.map((p) => [p, 'unrecorded']))
  for (const row of data) statuses[row.prayer] = row.status
  return statuses
}

export async function setPrayerStatus(personId, prayer, status) {
  if (!supabase) return { ok: true }
  const { error } = await supabase.from('prayer_logs').upsert(
    {
      person_id: personId,
      prayer_date: todayISO(),
      prayer,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'person_id,prayer_date,prayer' }
  )
  return { ok: !error }
}

export async function fetchHistory(personId, days = 14) {
  if (!supabase) return mockHistoryDays
  const since = new Date()
  since.setDate(since.getDate() - days)
  const { data, error } = await supabase
    .from('prayer_logs')
    .select('prayer_date, prayer, status')
    .eq('person_id', personId)
    .gte('prayer_date', since.toISOString().slice(0, 10))
    .order('prayer_date', { ascending: false })
  if (error || !data) return []

  const byDate = new Map()
  for (const row of data) {
    if (!byDate.has(row.prayer_date)) byDate.set(row.prayer_date, {})
    byDate.get(row.prayer_date)[row.prayer] = row.status
  }
  return Array.from(byDate.entries()).map(([date, entries]) => ({
    date: new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
    entries,
  }))
}

export async function fetchWeeklyProgress(personId) {
  if (!supabase) return mockWeeklyProgress
  const since = new Date()
  since.setDate(since.getDate() - 6)
  const { data, error } = await supabase
    .from('prayer_logs')
    .select('prayer, status, prayer_date')
    .eq('person_id', personId)
    .gte('prayer_date', since.toISOString().slice(0, 10))
  if (error || !data) return { totalCompleted: 0, totalPossible: 0, streak: 0, perPrayer: {} }

  const perPrayer = Object.fromEntries(PRAYERS.map((p) => [p, { done: 0, total: 0 }]))
  let totalCompleted = 0
  for (const row of data) {
    perPrayer[row.prayer].total += 1
    if (row.status === 'completed') {
      perPrayer[row.prayer].done += 1
      totalCompleted += 1
    }
  }
  const totalPossible = data.length

  return { totalCompleted, totalPossible, streak: 0, perPrayer }
}

export async function fetchGroupProgress() {
  if (!supabase) return mockGroupProgress
  const since = new Date()
  since.setDate(since.getDate() - 6)
  const { data, error } = await supabase
    .from('prayer_logs')
    .select('person_id, status, people(name)')
    .gte('prayer_date', since.toISOString().slice(0, 10))
  if (error || !data) return []

  const byPerson = new Map()
  for (const row of data) {
    const name = row.people?.name
    // Skip rows with null or empty names
    if (!name || name.trim() === '') continue
    if (!byPerson.has(name)) byPerson.set(name, { done: 0, total: 0 })
    const entry = byPerson.get(name)
    entry.total += 1
    if (row.status === 'completed') entry.done += 1
  }
  return Array.from(byPerson.entries()).map(([name, { done, total }]) => ({
    name,
    done,
    total,
    note: noteFor(done, total),
  }))
}

function noteFor(done, total) {
  if (total === 0) return 'Just getting started'
  const pct = done / total
  if (pct >= 0.9) return 'Great consistency'
  if (pct >= 0.7) return 'Strong week'
  if (pct >= 0.5) return 'Keep going'
  return 'Build your streak'
}
