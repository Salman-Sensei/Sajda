import { useEffect, useMemo, useState } from 'react'
import { PRAYERS } from '../data/mockData'
import { statusLabels } from '../components/StatusDot'
import { fetchTodayStatuses, setPrayerStatus } from '../lib/api'

const CYCLE = ['unrecorded', 'completed', 'missed']

const ROW_STYLES = {
  completed: 'border-sage/40 bg-sagelight',
  missed: 'border-rose/40 bg-roselight',
  unrecorded: 'border-line bg-card',
}

export default function Dashboard({ name, personId }) {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(PRAYERS.map((p) => [p, 'unrecorded']))
  )
  const [loading, setLoading] = useState(true)
  const [savedTick, setSavedTick] = useState(0)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (!personId) return
    fetchTodayStatuses(personId).then((data) => {
      if (!cancelled) {
        // Merge fetched data with defaults so all 5 prayers always show
        const merged = Object.fromEntries(PRAYERS.map((p) => [p, data[p] || 'unrecorded']))
        setStatuses(merged)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [personId])

  const cycle = async (prayer) => {
    const current = statuses[prayer]
    const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length]
    setStatuses((prev) => ({ ...prev, [prayer]: next }))

    const { ok } = await setPrayerStatus(personId, prayer, next)
    if (ok) {
      setSaveError(false)
      setSavedTick((t) => t + 1)
    } else {
      setSaveError(true)
    }
  }

  const completedCount = useMemo(
    () => Object.values(statuses).filter((s) => s === 'completed').length,
    [statuses]
  )
  const missedCount = useMemo(
    () => Object.values(statuses).filter((s) => s === 'missed').length,
    [statuses]
  )
  const remaining = PRAYERS.length - completedCount - missedCount

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 pb-28 md:pb-16 animate-fade-in">
      <div>
        <h1 className="text-xl font-medium text-charcoal">Assalamu Alaikum, {name}</h1>
        <p className="mt-1 text-sm text-ink">{today}</p>
      </div>

      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-medium text-charcoal">Today's prayers</h2>
          <span className="text-sm text-ink">{completedCount} / {PRAYERS.length} completed</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutrallight">
          <div
            className="h-full bg-sage transition-all duration-250 ease-out"
            style={{ width: `${(completedCount / PRAYERS.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {loading ? (
          PRAYERS.map((prayer) => (
            <li key={prayer} className="h-11 rounded-md border border-line bg-neutrallight animate-pulse" />
          ))
        ) : (
          PRAYERS.map((prayer) => {
            const status = statuses[prayer]
            return (
              <li key={prayer}>
                <button
                  onClick={() => cycle(prayer)}
                  disabled={loading}
                  className={`focus-ring flex w-full items-center justify-between rounded-md border px-4 py-3 min-h-[44px] transition-all duration-150 active:-translate-y-px disabled:opacity-60 ${ROW_STYLES[status]}`}
                >
                  <span className="text-sm font-medium text-charcoal">{prayer}</span>
                  <span className="text-sm text-ink">{statusLabels[status]}</span>
                </button>
              </li>
            )
          })
        )}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-md border border-line bg-card px-4 py-3 text-sm text-ink">
        <span>Prayed: {completedCount}</span>
        <span>Missed: {missedCount}</span>
        <span>Remaining: {remaining}</span>
      </div>

      {saveError && (
        <p className="mt-3 text-xs text-rose animate-fade-in">Couldn't save that. Try again.</p>
      )}
      {!saveError && savedTick > 0 && (
        <p key={savedTick} className="mt-3 text-xs text-neutral2 animate-fade-in">Saved</p>
      )}
    </div>
  )
}
