import { useLocation, useNavigate } from 'react-router-dom'
import { useMode } from '../modes/ModeContext'

/**
 * Three-segment toggle. Modeled after IA Collaborative's Classic / Agent /
 * Machine pattern.
 *
 * - Human   → setMode('human'), navigate('/')
 * - Agent   → setMode('human'), navigate('/ask')   — chat with the digital twin
 * - Machine → setMode('machine')                   — structured plain-text view
 *
 * Active highlight is computed live: Machine wins when mode is 'machine',
 * otherwise Agent wins on the /ask route, otherwise Human.
 */
export function ModeToggle() {
  const { mode, setMode } = useMode()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const active: 'human' | 'agent' | 'machine' =
    mode === 'machine' ? 'machine' : pathname === '/ask' ? 'agent' : 'human'

  const buttons: Array<{
    id: 'human' | 'agent' | 'machine'
    label: string
    hint: string
    onClick: () => void
  }> = [
    {
      id: 'human',
      label: 'Human',
      hint: 'For people. The full editorial site.',
      onClick: () => {
        setMode('human')
        if (pathname === '/ask') navigate('/')
      },
    },
    {
      id: 'agent',
      label: 'Agent',
      hint: 'Talk to my digital twin.',
      onClick: () => {
        setMode('human')
        navigate('/ask')
      },
    },
    {
      id: 'machine',
      label: 'Machine',
      hint: 'For AI crawlers. Stripped to text.',
      onClick: () => setMode('machine'),
    },
  ]

  return (
    <div className="flex items-center gap-1 rounded-full border border-ink-3 bg-ink-2/60 p-1 backdrop-blur" data-mode-bg={mode}>
      {buttons.map((b) => {
        const isActive = active === b.id
        return (
          <button
            key={b.id}
            type="button"
            onClick={b.onClick}
            title={b.hint}
            aria-pressed={isActive}
            className={[
              'relative px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors duration-200',
              isActive ? 'bg-ember text-bone' : 'text-bone-faint hover:text-bone',
            ].join(' ')}
          >
            {b.label}
          </button>
        )
      })}
    </div>
  )
}
