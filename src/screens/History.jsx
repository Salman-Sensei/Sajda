import { useEffect, useState } from 'react'
import { fetchHistory } from '../lib/api'
import { PRAYERS } from '../data/mockData'
import StatusDot from '../components/StatusDot'

export default function History({ personId }) {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (!personId) return
    fetchHistory(personId).then((data) => {
      if (!cancelled) {
        // Ensure all 5 prayers show for each day, defaulting to unrecorded if not logged
        const enriched = data.map((day) => ({
          ...day,
          entries: Object.fromEntries(
            PRAYERS.map((p) => [p, day.entries[p] || 'unrecorded'])
          ),
        }))
        setDays(enriched)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [personId])

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 pb-28 md:pb-16 animate-fade-in">
      <h1 className="text-xl font-medium text-charcoal">History</h1>
      <p className="mt-1 text-sm text-ink">Your recent prayer records</p>

      {!loading && days.length === 0 ? (
        <p className="mt-10 text-sm text-ink">
          Nothing here yet. Start tracking today's prayers and your progress will appear here.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-line">
          {days.map((day) => (
            <div key={day.date} className="py-4">
              <p className="text-sm font-medium text-charcoal">{day.date}</p>
              <ul className="mt-2 space-y-1.5">
                {Object.entries(day.entries).map(([prayer, status]) => (
                  <li key={prayer} className="flex items-center justify-between text-sm text-ink">
                    <span>{prayer}</span>
                    <StatusDot status={status} showLabel />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
