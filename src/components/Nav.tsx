import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModeToggle } from './ModeToggle'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/books', label: 'Books' },
  { to: '/travel', label: 'Travel' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="relative z-30 gutter pt-6 pb-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-[22px] leading-none tracking-tight font-medium hover:opacity-80 transition-opacity"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            pranav<span style={{ color: 'var(--color-ember)' }}>.</span>
          </Link>

          {/* Desktop nav (md and up) */}
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

          {/* Right cluster: hamburger (mobile) + ModeToggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden text-bone-mute hover:text-ember transition-colors p-2 -mr-2"
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden grain"
            style={{ background: 'oklch(0.13 0.012 280)' }}
          >
            {/* Top bar inside the overlay (mirrors the header) */}
            <div className="gutter pt-6 pb-3 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="font-display text-[22px] leading-none tracking-tight font-medium"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                pranav<span style={{ color: 'var(--color-ember)' }}>.</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-bone-mute hover:text-ember transition-colors p-2 -mr-2"
              >
                <X size={22} strokeWidth={1.6} />
              </button>
            </div>

            {/* Stacked nav links */}
            <nav className="gutter pt-12 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        'block font-display text-[44px] tracking-tight leading-[1.1] py-2 transition-colors',
                        isActive ? 'text-ember' : 'text-bone hover:text-ember',
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer hint inside the overlay */}
            <div className="absolute bottom-8 left-0 right-0 gutter font-mono text-[10px] uppercase tracking-[0.24em] text-bone-faint">
              tap a link or × to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
