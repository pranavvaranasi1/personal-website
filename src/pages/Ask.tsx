import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { CharacterPicker } from '../components/CharacterPicker'
import { CoffeeShop } from '../components/CoffeeShop'
import type { CharacterId } from '../components/PixelVisitor'
import { askPranavSystemPrompt, profile } from '../data/profile'

interface Msg {
  role: 'user' | 'pranav'
  text: string
  ts: number
}

const SUGGESTIONS = [
  "What's the most interesting thing you did at Deloitte?",
  'What are you doing at Google this summer?',
  "What's the deal with the Don't Look Up role?",
  "What's a book that changed how you think?",
  "What music are you on lately?",
]

const STORAGE_KEY = 'pranav-character'

export function Ask() {
  const [character, setCharacter] = useState<CharacterId | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [twinOffline, setTwinOffline] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as CharacterId | null
    if (stored) setCharacter(stored)
  }, [])

  useEffect(() => {
    if (showTranscript) transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showTranscript])

  function pick(id: CharacterId) {
    setCharacter(id)
    window.localStorage.setItem(STORAGE_KEY, id)
  }

  async function send(text: string) {
    if (!text.trim()) return
    const user: Msg = { role: 'user', text: text.trim(), ts: Date.now() }
    setMessages((m) => [...m, user])
    setInput('')
    setThinking(true)

    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: askPranavSystemPrompt,
          messages: [...messages, user].map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      })

      if (!res.ok) {
        setTwinOffline(true)
        setMessages((m) => [
          ...m,
          {
            role: 'pranav',
            text: `hey, my digital twin is offline right now. email me at ${profile.email} and i'll reply for real.`,
            ts: Date.now(),
          },
        ])
        return
      }

      const json = await res.json()
      const reply = json.content?.[0]?.text || 'sorry, the model returned nothing.'
      setTwinOffline(false)
      setMessages((m) => [...m, { role: 'pranav', text: reply, ts: Date.now() }])
    } catch {
      setTwinOffline(true)
      setMessages((m) => [...m, { role: 'pranav', text: 'something broke on my end. try again in a sec.', ts: Date.now() }])
    } finally {
      setThinking(false)
    }
  }

  const lastMsg = messages[messages.length - 1]
  const lastSpeaker: 'pranav' | 'visitor' | null = thinking
    ? 'pranav'
    : lastMsg
      ? lastMsg.role === 'user'
        ? 'visitor'
        : 'pranav'
      : null
  const dialogueLine = thinking
    ? '...'
    : lastMsg?.text ??
      'ask me anything. writing, the projects, grad school, whatever. i\'ll get back to you.'
  const speakerName = lastSpeaker === 'visitor' ? 'You' : 'Pranav'
  const pranavMood: 'idle' | 'speak' = thinking || (lastMsg && lastMsg.role === 'pranav') ? 'speak' : 'idle'
  const visitorMood: 'idle' | 'speak' = !thinking && lastMsg && lastMsg.role === 'user' ? 'speak' : 'idle'

  return (
    <>
      <header className="gutter pt-10 md:pt-16 pb-10">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint">Ask Pranav · A digital twin</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-5xl md:text-8xl tracking-tight max-w-[16ch] text-balance leading-[0.96]">
            Talk to me at the <span style={{ color: 'var(--color-ember)' }}>coffee shop.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[58ch] text-bone-mute text-[17px] leading-[1.7]">
            This is Claude running a system prompt I wrote. Pick a character and ask anything.
          </p>
        </Reveal>
      </header>

      <section className="gutter pb-20">
        <AnimatePresence mode="wait">
          {!character ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-8"
            >
              <CharacterPicker onPick={pick} />
            </motion.div>
          ) : (
            <motion.div
              key="scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CoffeeShop
                visitorCharacter={character}
                pranavMood={pranavMood}
                visitorMood={visitorMood}
                speaker={lastSpeaker}
                speakerName={speakerName}
                line={dialogueLine}
                onChangeCharacter={() => setCharacter(null)}
                composer={
                  <Composer
                    input={input}
                    setInput={setInput}
                    onSend={send}
                    thinking={thinking}
                    twinOffline={twinOffline}
                    suggestions={messages.length === 0 ? SUGGESTIONS : []}
                  />
                }
              />

              {/* Transcript toggle */}
              <div className="mt-6 max-w-[1100px] mx-auto flex items-center justify-between">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-[12px] uppercase tracking-[0.18em] text-bone-faint hover:text-bone transition"
                >
                  {showTranscript ? 'Hide transcript' : `Show full transcript${messages.length ? ` (${messages.length})` : ''}`}
                </button>
                <span className="text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                  {twinOffline ? 'Twin offline' : 'Twin online'}
                </span>
              </div>

              <AnimatePresence>
                {showTranscript && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[1100px] mx-auto overflow-hidden"
                  >
                    <div className="mt-4 border border-ink-3 rounded-sm bg-ink-2/40 p-6 space-y-4 max-h-[400px] overflow-y-auto">
                      {messages.length === 0 && (
                        <p className="text-bone-faint text-[14px]">Nothing yet. Say something.</p>
                      )}
                      {messages.map((m, i) => (
                        <div key={i} className={['flex gap-3', m.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}>
                          <div
                            className={[
                              'max-w-[70%] px-3 py-2 rounded-sm text-[14px] leading-[1.55]',
                              m.role === 'user'
                                ? 'bg-ember text-bone'
                                : 'bg-ink border border-ink-3 text-bone-mute',
                            ].join(' ')}
                          >
                            <div className="text-[10px] uppercase tracking-[0.2em] mb-1 opacity-70">
                              {m.role === 'user' ? 'You' : 'Pranav'}
                            </div>
                            {m.text}
                          </div>
                        </div>
                      ))}
                      <div ref={transcriptEndRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

interface ComposerProps {
  input: string
  setInput: (s: string) => void
  onSend: (s: string) => void
  thinking: boolean
  twinOffline: boolean
  suggestions: string[]
}

function Composer({ input, setInput, onSend, thinking, twinOffline, suggestions }: ComposerProps) {
  return (
    <div className="px-5 py-4">
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSend(s)}
              disabled={thinking}
              className="text-[12px] px-3 py-1.5 rounded-full border border-ink-3 text-bone-mute hover:text-bone hover:border-ember transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSend(input)
        }}
        className="flex items-center gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={twinOffline ? 'Type a message (twin offline, will explain why)...' : 'Type a message...'}
          className="flex-1 bg-ink/60 border border-ink-3 rounded-sm px-3 py-2 text-bone placeholder:text-bone-faint focus:outline-none focus:border-ember text-[15px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking}
          className="rounded-sm px-4 py-2 text-[13px] font-medium bg-ember text-bone disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ember-low transition-colors"
        >
          {thinking ? '...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
