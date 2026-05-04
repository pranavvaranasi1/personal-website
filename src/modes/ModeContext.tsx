import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Two persistent modes:
 * - 'human'   = the normal site (default)
 * - 'machine' = structured plain-text view for AI crawlers
 *
 * "Agent" is not a mode — it's a button on the toggle that navigates to
 * /ask within human mode. Visual highlight on the toggle is computed from
 * the current pathname, not from this state.
 */
export type Mode = 'human' | 'machine'

interface ModeContextValue {
  mode: Mode
  setMode: (m: Mode) => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

const BOT_REGEX = /bot|crawler|spider|crawling|gptbot|claude-?web|anthropic|openai|perplexity|chatgpt|googlebot|bingbot/i

function detectInitialMode(): Mode {
  if (typeof window === 'undefined') return 'human'
  const stored = window.localStorage.getItem('pranav-mode')
  if (stored === 'human') return 'human'
  if (stored === 'machine') return 'machine'
  // Migrate legacy values: old 'agent' (was plaintext) and 'studio' both
  // collapse to 'machine'. Default everything else to human.
  if (stored === 'agent' || stored === 'studio') return 'machine'
  if (BOT_REGEX.test(navigator.userAgent)) return 'machine'
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
