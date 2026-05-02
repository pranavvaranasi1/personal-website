import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PixelPranav } from './PixelPranav'

export function AskPill() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  if (location.pathname === '/ask') return null

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to="/ask"
        className="group flex items-center rounded-full border border-ink-3 bg-ink/85 backdrop-blur-md shadow-[0_14px_30px_-10px_rgba(0,0,0,0.5)] hover:border-ember transition-colors p-1.5 sm:gap-3 sm:pl-2 sm:pr-4 sm:py-2"
        aria-label="Ask Pranav"
      >
        <div
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden flex items-center justify-center shrink-0"
          style={{ background: 'oklch(0.21 0.014 280)' }}
        >
          <PixelPranav scale={1.3} mood={open ? 'speak' : 'idle'} />
        </div>
        {/* Text label hidden on mobile, visible from sm: up */}
        <div className="hidden sm:flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.18em] text-bone-faint group-hover:text-ember transition-colors">
            Talk to my twin
          </span>
          <span className="text-[12px] text-bone leading-tight">
            {open ? 'Ask anything.' : 'Ask anything →'}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
