import { useState } from 'react'
import { verifyOrCreatePin } from '../lib/api'

export default function PinEntry({ name, onBack, onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  const submit = async () => {
    if (pin.length < 4) {
      setError('Enter all 4 digits.')
      return
    }
    setChecking(true)
    const result = await verifyOrCreatePin(name, pin)
    setChecking(false)
    if (result.error === 'wrong-pin') {
      setError('Incorrect PIN. Please try again.')
      return
    }
    if (result.error === 'other') {
      setError("Couldn't reach the server. Please try again.")
      return
    }
    setError(false)
    onSuccess(result.id)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="w-full max-w-xs text-center">
        <h2 className="text-lg font-medium text-charcoal">Welcome back, {name}</h2>
        <p className="mt-1 text-sm text-ink">Enter your PIN to continue</p>

        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ''))
            setError(false)
          }}
          placeholder="••••"
          className="focus-ring mt-6 w-full rounded-md border border-line bg-card px-4 py-3 text-center text-lg tracking-[0.5em] text-charcoal placeholder:text-neutral2"
        />

        {error && (
          <p className="mt-2 text-sm text-rose animate-fade-in">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={checking}
          className="focus-ring mt-4 w-full rounded-md bg-sage px-4 py-3 text-sm font-medium text-cream transition-transform duration-150 active:scale-[0.99] disabled:opacity-60"
        >
          {checking ? 'Checking…' : 'Continue'}
        </button>

        <button onClick={onBack} className="focus-ring mt-5 text-sm text-ink hover:text-charcoal">
          ← Change person
        </button>
      </div>
    </div>
  )
}
