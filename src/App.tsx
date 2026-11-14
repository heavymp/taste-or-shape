import { useEffect, useState, type FormEvent } from 'react'
import { foods, reasonFor, tallyReasons, type Reason } from './foods'

type Step = 'intro' | 'reveal' | 'summary'

export default function App() {
  const [step, setStep] = useState<Step>('intro')
  const [name, setName] = useState('')
  const [draft, setDraft] = useState('')
  const [index, setIndex] = useState(0)
  const [error, setError] = useState('')

  const food = foods[index]
  const reason: Reason | null = step === 'reveal' ? reasonFor(name, food.id) : null
  const totals = step === 'summary' ? tallyReasons(name) : null
  const dRule = /^d/i.test(name.trim())

  useEffect(() => {
    if (step === 'reveal') {
      const prev = document.title
      document.title = `${food.name} — Taste or Shape?`
      return () => {
        document.title = prev
      }
    }
  }, [step, food])

  function start(e: FormEvent) {
    e.preventDefault()
    const next = draft.trim()
    if (!next) {
      setError('Gotta put a name in there.')
      return
    }
    if (next.length > 40) {
      setError('Keep it under 40 characters.')
      return
    }
    setError('')
    setName(next)
    setIndex(0)
    setStep('reveal')
  }

  function nextFood() {
    if (index >= foods.length - 1) {
      setStep('summary')
      return
    }
    setIndex((i) => i + 1)
  }

  function reset() {
    setStep('intro')
    setDraft('')
    setName('')
    setIndex(0)
    setError('')
  }

  return (
    <div className="mx-auto flex h-dvh max-h-dvh w-full max-w-3xl flex-col overflow-hidden px-4 py-3 sm:px-6 sm:py-5">
      {step === 'intro' && (
        <section className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden animate-slide-up">
          <p
            className="font-display leading-none text-[var(--ketchup)]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
          >
            Taste or Shape?
          </p>
          <h1
            className="mt-3 max-w-xl font-extrabold tracking-tight text-[var(--ink)]"
            style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.875rem)' }}
          >
            The scientific* ranking of suspiciously shaped snacks.
          </h1>
          <p className="mt-2 max-w-md text-sm text-[var(--grill)]/80 sm:text-base">
            Enter your name. We’ll go through {foods.length} iconic foods and tell you —
            for each one — whether you like it for the taste or the shape.
          </p>
          <p className="mt-1 text-xs italic text-[var(--grill)]/55">*not scientific</p>

          <form onSubmit={start} className="mt-5 flex w-full max-w-md flex-col gap-2">
            <label htmlFor="name" className="text-sm font-bold uppercase tracking-wide text-[var(--grill)]">
              Your name
            </label>
            <input
              id="name"
              autoComplete="given-name"
              autoFocus
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value)
                if (error) setError('')
              }}
              placeholder="e.g. Dana, Marcus, Pickle Pete"
              className="w-full rounded-xl border-2 border-[var(--ink)] bg-white/90 px-4 py-3 text-lg font-bold outline-none ring-[var(--mustard)] transition focus:ring-4"
            />
            {error && <p className="text-sm font-bold text-[var(--ketchup)]">{error}</p>}
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-xl border-2 border-[var(--ink)] bg-[var(--mustard)] px-6 py-3 text-lg font-extrabold shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)] active:translate-y-0.5 active:shadow-[2px_2px_0_var(--ink)]"
            >
              Next →
            </button>
          </form>
        </section>
      )}

      {step === 'reveal' && reason && (
        <section key={food.id} className="flex min-h-0 flex-1 flex-col overflow-hidden animate-pop">
          <header className="mb-2 flex shrink-0 items-end justify-between gap-3">
            <div>
              <p
                className="font-display text-[var(--ketchup)]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
              >
                Taste or Shape?
              </p>
              <p className="mt-0.5 text-sm font-bold text-[var(--grill)]/70">
                Hey <span className="text-[var(--ink)]">{name}</span> — food {index + 1} of {foods.length}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="shrink-0 text-sm font-bold underline decoration-2 underline-offset-2 opacity-70 hover:opacity-100"
            >
              Start over
            </button>
          </header>

          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border-2 border-[var(--ink)] bg-[var(--grill)] shadow-[6px_6px_0_var(--ink)]">
            <img
              src={food.image}
              alt={food.name}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div
              className={`animate-stamp absolute right-3 top-3 rotate-[-4deg] rounded-md border-[3px] px-3 py-2 font-display text-2xl uppercase tracking-wide shadow-md sm:right-5 sm:top-5 sm:text-3xl ${
                reason === 'shape'
                  ? 'border-[var(--shape)] bg-[#fff3e6] text-[var(--shape)]'
                  : 'border-[var(--taste)] bg-[#e8f7f4] text-[var(--taste)]'
              }`}
            >
              {reason === 'shape' ? 'Shape!' : 'Taste!'}
            </div>
          </div>

          <div className="mt-3 shrink-0 animate-slide-up">
            <h2
              className="font-display text-[var(--ink)]"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
            >
              {food.name}
            </h2>
            <p className="mt-0.5 text-sm text-[var(--grill)]/75 sm:text-base">{food.blurb}</p>
            <p className="mt-2 text-lg font-extrabold leading-snug sm:text-xl">
              {name}, you like the {food.name.toLowerCase()} because of the{' '}
              <span className={reason === 'shape' ? 'text-[var(--shape)]' : 'text-[var(--taste)]'}>
                {reason}
              </span>
              .
            </p>
            {dRule && (
              <p className="mt-1 text-sm font-bold text-[var(--shape)]">
                D-name privilege: it’s always the shape for you.
              </p>
            )}
          </div>

          <div className="mt-3 flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={nextFood}
              className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-[var(--ink)] bg-[var(--mustard)] px-6 py-2.5 text-lg font-extrabold shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)] active:translate-y-0.5 active:shadow-[2px_2px_0_var(--ink)] sm:flex-none"
            >
              {index >= foods.length - 1 ? 'See my verdict →' : 'Next food →'}
            </button>
            {index > 0 && (
              <button
                type="button"
                onClick={() => setIndex((i) => i - 1)}
                className="rounded-xl border-2 border-[var(--ink)] bg-white/80 px-5 py-2.5 font-bold"
              >
                ← Back
              </button>
            )}
          </div>

          <div className="mt-3 h-2 shrink-0 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[var(--ketchup)] transition-all duration-300"
              style={{ width: `${((index + 1) / foods.length) * 100}%` }}
            />
          </div>
        </section>
      )}

      {step === 'summary' && totals && (
        <section className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden animate-slide-up">
          <p
            className="font-display text-[var(--ketchup)]"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}
          >
            Taste or Shape?
          </p>
          <h2
            className="mt-2 font-extrabold"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Okay, {name}. Here’s the damage.
          </h2>
          <p className="mt-1 max-w-lg text-sm text-[var(--grill)]/80 sm:text-base">
            Across {foods.length} phallic-adjacent foods, your personal algorithm landed here:
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-[var(--ink)] bg-[#fff3e6] p-4 shadow-[4px_4px_0_var(--ink)]">
              <p className="font-display text-4xl text-[var(--shape)] sm:text-5xl">{totals.shape}</p>
              <p className="mt-1 text-lg font-extrabold">for the shape</p>
            </div>
            <div className="rounded-2xl border-2 border-[var(--ink)] bg-[#e8f7f4] p-4 shadow-[4px_4px_0_var(--ink)]">
              <p className="font-display text-4xl text-[var(--taste)] sm:text-5xl">{totals.taste}</p>
              <p className="mt-1 text-lg font-extrabold">for the taste</p>
            </div>
          </div>

          <p className="mt-4 text-lg font-extrabold sm:text-xl">
            {dRule
              ? 'D-name confirmed: pure shape energy. No notes.'
              : totals.shape > totals.taste
                ? 'You’re here for the geometry.'
                : totals.taste > totals.shape
                  ? 'You’re claiming it’s the flavor. Sure.'
                  : 'Perfectly split. Diplomacy is boring, but fine.'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setIndex(0)
                setStep('reveal')
              }}
              className="rounded-xl border-2 border-[var(--ink)] bg-white/90 px-5 py-2.5 font-bold"
            >
              Replay foods
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border-2 border-[var(--ink)] bg-[var(--mustard)] px-5 py-2.5 font-extrabold shadow-[4px_4px_0_var(--ink)]"
            >
              Try another name
            </button>
          </div>
        </section>
      )}

      <footer className="mt-2 shrink-0 text-center text-xs text-[var(--grill)]/50">
        Static meme toy · no accounts · no database · photos via Wikimedia Commons
      </footer>
    </div>
  )
}
