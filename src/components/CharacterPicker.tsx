import { motion } from 'framer-motion'
import { PixelVisitor, CHARACTERS, type CharacterId } from './PixelVisitor'

interface PickerProps {
  onPick: (id: CharacterId) => void
}

export function CharacterPicker({ onPick }: PickerProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint mb-2">Step 1 · Pick your seat</div>
      <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-[20ch] text-balance leading-[1]">
        Who's joining me at the counter?
      </h2>
      <p className="mt-4 text-bone-mute text-[15px] max-w-[48ch] leading-[1.6]">
        Pick a character. They'll sit next to me in the chat. (Yes, this is silly. It's also more fun than a chat box.)
      </p>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-[920px]">
        {CHARACTERS.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            onClick={() => onPick(c.id)}
            className="group relative flex flex-col items-center p-5 rounded-sm border border-ink-3 hover:border-ember bg-ink-2/40 hover:bg-ink-2/70 transition-colors duration-300 cursor-pointer"
          >
            {/* spotlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
              style={{
                background: 'radial-gradient(circle at 50% 30%, oklch(0.72 0.16 150 / 0.18), transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <PixelVisitor character={c.id} scale={5} />
            </div>
            <div className="relative z-10 mt-4 font-display text-xl tracking-tight">{c.label}</div>
            <div className="relative z-10 mt-1 text-[12px] text-bone-faint max-w-[20ch] leading-[1.4]">{c.description}</div>
            <div className="relative z-10 mt-4 text-[10px] uppercase tracking-[0.2em] text-ember opacity-0 group-hover:opacity-100 transition-opacity">
              Choose →
            </div>
          </motion.button>
        ))}
      </div>

      <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-bone-faint">
        You can always switch later
      </p>
    </div>
  )
}
