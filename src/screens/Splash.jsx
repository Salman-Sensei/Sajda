import { useEffect } from 'react'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1100)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="animate-fade-up text-center">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mx-auto mb-4" aria-hidden="true">
          <path
            d="M14 3C14 3 8 8.5 8 14.5C8 19 10.5 22 14 22C17.5 22 20 19 20 14.5C20 8.5 14 3 14 3Z"
            stroke="#5B7A5B"
            strokeWidth="1.4"
          />
          <path d="M6 24H22" stroke="#5B7A5B" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <h1 className="font-serif text-3xl text-charcoal">Salah Diary</h1>
        <p className="mt-2 text-sm text-ink">Keep track. Stay consistent.</p>
      </div>
    </div>
  )
}
