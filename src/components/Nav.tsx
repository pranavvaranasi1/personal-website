import { Link, NavLink } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'
import { useMode } from '../modes/ModeContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/books', label: 'Books' },
  { to: '/travel', label: 'Travel' },
  { to: '/ask', label: 'Ask Pranav' },
]

export function Nav() {
  const { mode } = useMode()
  return (
    <header className="relative z-30 gutter pt-6 pb-3">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-[22px] leading-none tracking-tight font-medium hover:opacity-80 transition-opacity"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          pranav<span style={{ color: 'var(--color-ember)' }}>.</span>
        </Link>

        {mode !== 'agent' && (
          <nav className="hidden md:flex items-center gap-7 text-[13px] uppercase tracking-[0.18em]">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  [
                    'relative py-1 transition-colors duration-200',
                    isActive ? 'text-bone' : 'text-bone-faint hover:text-bone',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-px"
                        style={{ background: 'var(--color-ember)' }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}

        <ModeToggle />
      </div>
    </header>
  )
}
