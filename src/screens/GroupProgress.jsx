import { useEffect, useState } from 'react'
import { fetchGroupProgress } from '../lib/api'

export default function GroupProgress() {
  const [group, setGroup] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGroupProgress().then((data) => {
      setGroup(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 pb-28 md:pb-16 animate-fade-in">
      <h1 className="text-xl font-medium text-charcoal">Our Group</h1>
      <p className="mt-1 text-sm text-ink">A little consistency goes a long way.</p>

      {!loading && group.length === 0 ? (
        <p className="mt-10 text-sm text-ink">
          Group progress will appear here once everyone starts tracking.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {group.map(({ name, done, total, note }) => (
            <li key={name} className="rounded-md border border-line bg-card px-4 py-3">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-charcoal">{name}</span>
                <span className="text-ink">{done} / {total}</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutrallight">
                <div
                  className="h-full bg-sage transition-all duration-250 ease-out"
                  style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-neutral2">{note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
