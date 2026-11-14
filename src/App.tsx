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
      document.title = `${food.name} — Shape or Taste?`
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
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
      {step === 'intro' && (
        <section className="flex flex-1 flex-col justify-center animate-slide-up">
          <p className="font-display text-5xl leading-none text-[var(--ketchup)] sm:text-7xl md:text-8xl">
            Shape or Taste?
          </p>
          <h1 className="mt-4 max-w-xl text-2xl font-extrabold tracking-tight text-[var(--ink)] sm:text-3xl">
            The scientific* ranking of suspiciously shaped snacks.
          </h1>
          <p className="mt-3 max-w-md text-base text-[var(--grill)]/80 sm:text-lg">
            Enter your name. We’ll go through {foods.length} iconic foods and tell you —
            for each one — whether you like it for the shape or the taste.
          </p>
          <p className="mt-2 text-sm italic text-[var(--grill)]/55">*not scientific</p>

          <form onSubmit={start} className="mt-8 flex w-full max-w-md flex-col gap-3">
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
        <section key={food.id} className="flex flex-1 flex-col animate-pop">
          <header className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-3xl text-[var(--ketchup)] sm:text-4xl">Shape or Taste?</p>
              <p className="mt-1 text-sm font-bold text-[var(--grill)]/70">
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

          <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--ink)] bg-[var(--grill)] shadow-[6px_6px_0_var(--ink)]">
            <img
              src={food.image}
              alt={food.name}
              className="aspect-[4/3] w-full object-cover"
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

          <div className="mt-5 animate-slide-up">
            <h2 className="font-display text-4xl text-[var(--ink)] sm:text-5xl">{food.name}</h2>
            <p className="mt-1 text-[var(--grill)]/75">{food.blurb}</p>
            <p className="mt-4 text-xl font-extrabold leading-snug sm:text-2xl">
              {name}, you like the {food.name.toLowerCase()} because of the{' '}
              <span className={reason === 'shape' ? 'text-[var(--shape)]' : 'text-[var(--taste)]'}>
                {reason}
              </span>
              .
            </p>
            {dRule && (
              <p className="mt-2 text-sm font-bold text-[var(--shape)]">
                D-name privilege: it’s always the shape for you.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={nextFood}
              className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-[var(--ink)] bg-[var(--mustard)] px-6 py-3 text-lg font-extrabold shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)] active:translate-y-0.5 active:shadow-[2px_2px_0_var(--ink)] sm:flex-none"
            >
              {index >= foods.length - 1 ? 'See my verdict →' : 'Next food →'}
            </button>
            {index > 0 && (
              <button
                type="button"
                onClick={() => setIndex((i) => i - 1)}
                className="rounded-xl border-2 border-[var(--ink)] bg-white/80 px-5 py-3 font-bold"
              >
                ← Back
              </button>
            )}
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[var(--ketchup)] transition-all duration-300"
              style={{ width: `${((index + 1) / foods.length) * 100}%` }}
            />
          </div>
        </section>
      )}

      {step === 'summary' && totals && (
        <section className="flex flex-1 flex-col justify-center animate-slide-up">
          <p className="font-display text-4xl text-[var(--ketchup)] sm:text-6xl">Shape or Taste?</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Okay, {name}. Here’s the damage.
          </h2>
          <p className="mt-2 max-w-lg text-[var(--grill)]/80">
            Across {foods.length} phallic-adjacent foods, your personal algorithm landed here:
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-[var(--ink)] bg-[#fff3e6] p-5 shadow-[4px_4px_0_var(--ink)]">
              <p className="font-display text-5xl text-[var(--shape)]">{totals.shape}</p>
              <p className="mt-1 text-lg font-extrabold">for the shape</p>
            </div>
            <div className="rounded-2xl border-2 border-[var(--ink)] bg-[#e8f7f4] p-5 shadow-[4px_4px_0_var(--ink)]">
              <p className="font-display text-5xl text-[var(--taste)]">{totals.taste}</p>
              <p className="mt-1 text-lg font-extrabold">for the taste</p>
            </div>
          </div>

          <p className="mt-6 text-xl font-extrabold">
            {dRule
              ? 'D-name confirmed: pure shape energy. No notes.'
              : totals.shape > totals.taste
                ? 'You’re here for the geometry.'
                : totals.taste > totals.shape
                  ? 'You’re claiming it’s the flavor. Sure.'
                  : 'Perfectly split. Diplomacy is boring, but fine.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setIndex(0)
                setStep('reveal')
              }}
              className="rounded-xl border-2 border-[var(--ink)] bg-white/90 px-5 py-3 font-bold"
            >
              Replay foods
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border-2 border-[var(--ink)] bg-[var(--mustard)] px-5 py-3 font-extrabold shadow-[4px_4px_0_var(--ink)]"
            >
              Try another name
            </button>
          </div>
        </section>
      )}

      <footer className="mt-10 text-center text-xs text-[var(--grill)]/50">
        Static meme toy · no accounts · no database · photos via Wikimedia Commons
      </footer>
    </div>
  )
}
