import { useEffect, useState } from 'react'
import { fetchWeeklyProgress } from '../lib/api'

export default function MyProgress({ personId }) {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (!personId) return
    fetchWeeklyProgress(personId).then((data) => {
      if (!cancelled) setProgress(data)
    })
    return () => {
      cancelled = true
    }
  }, [personId])

  const hasData = progress && progress.totalPossible > 0

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 pb-28 md:pb-16 animate-fade-in">
      <h1 className="text-xl font-medium text-charcoal">My Progress</h1>

      {!hasData ? (
        <p className="mt-10 text-sm text-ink">
          Your weekly progress will appear here once you start tracking.
        </p>
      ) : (
        <>
          <div className="mt-6 rounded-md border border-line bg-card px-4 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-charcoal">This week</span>
              <span className="text-sm text-ink">
                {progress.totalCompleted} / {progress.totalPossible} prayers
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutrallight">
              <div
                className="h-full bg-sage transition-all duration-250 ease-out"
                style={{ width: `${(progress.totalCompleted / progress.totalPossible) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-neutral2">
              {Math.round((progress.totalCompleted / progress.totalPossible) * 100)}% completed
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {Object.entries(progress.perPrayer).map(([prayer, { done, total }]) => (
              <div key={prayer}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-charcoal">{prayer}</span>
                  <span className="text-ink">{done} / {total || 0}</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-neutrallight">
                  <div
                    className="h-full bg-sage transition-all duration-250 ease-out"
                    style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
