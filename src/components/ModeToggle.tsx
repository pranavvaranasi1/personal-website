import { useMode, type Mode } from '../modes/ModeContext'

const modes: { id: Mode; label: string; hint: string }[] = [
  { id: 'human', label: 'Human', hint: 'For people. Cinematic.' },
  { id: 'agent', label: 'Agent', hint: 'For AI crawlers. Stripped to text.' },
  { id: 'studio', label: 'Studio', hint: 'Behind the curtain. The machinery.' },
]

export function ModeToggle() {
  const { mode, setMode } = useMode()
  return (
    <div className="flex items-center gap-1 rounded-full border border-ink-3 bg-ink-2/60 p-1 backdrop-blur" data-mode-bg={mode}>
      {modes.map((m) => {
        const active = mode === m.id
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            title={m.hint}
            aria-pressed={active}
            className={[
              'relative px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors duration-200',
              active
                ? 'bg-ember text-bone'
                : 'text-bone-faint hover:text-bone',
            ].join(' ')}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
