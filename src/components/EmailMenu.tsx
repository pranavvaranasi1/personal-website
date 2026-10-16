import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

const SUBJECT = 'Saw your site, pranavtech.me'

export function EmailMenu() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const to = encodeURIComponent(profile.email)
  const su = encodeURIComponent(SUBJECT)
  const options = [
    { label: 'Gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}`, external: true },
    { label: 'Outlook', href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}`, external: true },
    { label: 'Yahoo Mail', href: `https://compose.mail.yahoo.com/?to=${to}&subject=${su}`, external: true },
    { label: 'Default mail app', href: `mailto:${profile.email}?subject=${su}`, external: false },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked; the address is visible below the button anyway
    }
  }

  const itemClass =
    'block w-full text-left px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-bone-mute hover:text-bone hover:bg-ink-3 transition-colors'

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-3 rounded-[2px] px-7 py-4 font-mono text-[13px] md:text-[14px] uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 cursor-pointer"
        style={{ background: 'var(--color-ember)', color: 'var(--color-ink)', boxShadow: '0 0 40px var(--color-ember-glow)' }}
      >
        Email me {open ? '↑' : '↓'}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 z-20 min-w-[240px] rounded-[2px] border border-ink-3 bg-ink-2 py-1 shadow-2xl"
        >
          {options.map((o) => (
            <a
              key={o.label}
              role="menuitem"
              href={o.href}
              {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              {o.label}
            </a>
          ))}
          <button type="button" role="menuitem" onClick={copy} className={`${itemClass} border-t border-ink-3 cursor-pointer`}>
            {copied ? 'Copied ✓' : 'Copy address'}
          </button>
        </div>
      )}
    </div>
  )
}
