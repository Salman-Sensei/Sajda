import { useState } from 'react'
import { PEOPLE } from '../data/mockData'

export default function PersonSelection({ onSelect }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleContinue = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter your name.')
      return
    }
    if (trimmed.length < 2) {
      setError('Name must be at least 2 characters.')
      return
    }
    setError('')
    onSelect(trimmed)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="w-full max-w-sm text-center">
        <p className="font-serif text-xl text-charcoal">Salah Diary</p>
        <p className="mt-1 text-sm text-ink">Keep track. Stay consistent.</p>

        <h2 className="mt-10 text-lg text-charcoal font-medium">What's your name?</h2>
        <p className="mt-2 text-sm text-ink">First time here, we'll set up your PIN next.</p>

        <div className="mt-6">
          <label htmlFor="name-input" className="sr-only">Enter your name</label>
          <input
            id="name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
            placeholder="Your name"
            autoFocus
            className="focus-ring w-full rounded-md border border-line bg-card px-4 py-3 text-sm text-charcoal placeholder:text-neutral2"
          />
          {error && (
            <p className="mt-2 text-sm text-rose animate-fade-in">{error}</p>
          )}
          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="focus-ring mt-4 w-full rounded-md bg-sage px-4 py-3 text-sm font-medium text-cream transition-opacity duration-150 disabled:opacity-40"
          >
            Continue
          </button>
        </div>

        <p className="mt-10 text-xs text-neutral2">Your progress, one prayer at a time.</p>
      </div>
    </div>
  )
}
