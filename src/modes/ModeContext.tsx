import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Mode = 'human' | 'agent' | 'studio'

interface ModeContextValue {
  mode: Mode
  setMode: (m: Mode) => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

const BOT_REGEX = /bot|crawler|spider|crawling|gptbot|claude-?web|anthropic|openai|perplexity|chatgpt|googlebot|bingbot/i

function detectInitialMode(): Mode {
  if (typeof window === 'undefined') return 'human'
  const stored = window.localStorage.getItem('pranav-mode') as Mode | null
  if (stored === 'human' || stored === 'agent' || stored === 'studio') return stored
  if (BOT_REGEX.test(navigator.userAgent)) return 'agent'
  return 'human'
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>('human')

  useEffect(() => {
    setModeState(detectInitialMode())
  }, [])

  useEffect(() => {
    document.body.dataset.mode = mode
    window.localStorage.setItem('pranav-mode', mode)
  }, [mode])

  const setMode = (m: Mode) => setModeState(m)

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}
