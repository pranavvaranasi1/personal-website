import { motion } from 'framer-motion'
import { books, type Book } from '../data/books'
import { Reveal } from '../components/Reveal'

export function Books() {
  return (
    <>
      <header className="gutter pt-10 md:pt-16 pb-12">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint">Books · {books.length} I keep handing to people</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-5xl md:text-8xl tracking-tight max-w-[26ch] text-balance leading-[0.96]">
            10 books I'd recommend to anyone. <span style={{ color: 'var(--color-ember)' }}>They shaped me.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[58ch] text-bone-mute text-[17px] leading-[1.7]">
            Roughly ranked by how often the book still shows up in how I think. If you've asked me what to read, this is the list I send back. Hover or tap any cover for why.
          </p>
        </Reveal>
      </header>

      {/* Shelf — books displayed as spines, then expanded list below */}
      <section className="gutter pb-10">
        <Shelf />
      </section>

      <section className="gutter pb-32">
        <ul className="border-t border-ink-3">
          {books.map((b, i) => (
            <li key={b.rank} className="border-b border-ink-3">
              <Reveal delay={i * 0.04}>
                <BookRow book={b} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function Shelf() {
  return (
    <div className="relative">
      {/* The shelf board */}
      <div className="absolute bottom-0 inset-x-0 h-3 rounded-sm" style={{ background: 'linear-gradient(to bottom, oklch(0.32 0.014 280), oklch(0.21 0.014 280))', boxShadow: '0 14px 30px -10px oklch(0 0 0 / 0.6)' }} />

      <div className="relative flex items-end gap-1 md:gap-2 pt-4 px-2 overflow-x-auto pb-3">
        {books.map((b, i) => (
          <Spine key={b.rank} book={b} index={i} />
        ))}
      </div>
    </div>
  )
}

function Spine({ book, index }: { book: Book; index: number }) {
  // Vary heights for visual rhythm (taller = more impactful)
  const heights = [220, 200, 245, 210, 230, 195, 215, 205, 200, 218, 232, 208]
  const widths = [44, 38, 52, 42, 48, 36, 46, 40, 38, 44, 50, 42]
  const h = heights[index] ?? 210
  const w = widths[index] ?? 42

  return (
    <motion.a
      href={`#book-${book.rank}`}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="relative block shrink-0 cursor-pointer group"
      style={{
        height: h,
        width: w,
        background: book.spine,
        borderRadius: '1px 2px 2px 1px',
        boxShadow: 'inset -2px 0 0 rgba(0,0,0,0.2), inset 2px 0 0 rgba(255,255,255,0.06), 2px 6px 12px -4px rgba(0,0,0,0.5)',
      }}
      title={`${book.title} — ${book.author}`}
    >
      {/* Top cap edge */}
      <div className="absolute inset-x-0 top-0 h-2 rounded-t" style={{ background: 'rgba(255,255,255,0.06)' }} />
      {/* Title rotated up the spine */}
      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          whiteSpace: 'nowrap',
        }}
      >
        <div className="font-display text-[12px] md:text-[13px] font-medium tracking-tight" style={{ color: textColorOn(book.spine) }}>
          {book.title}
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em] mt-0.5 opacity-80" style={{ color: textColorOn(book.spine) }}>
          {book.author}
        </div>
      </div>

      {/* Rank chip */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-wider"
        style={{ color: textColorOn(book.spine), opacity: 0.7 }}
      >
        #{book.rank}
      </div>
    </motion.a>
  )
}

function BookRow({ book }: { book: Book }) {
  return (
    <article id={`book-${book.rank}`} className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-12 scroll-mt-32">
      {/* Rank */}
      <div className="md:col-span-2 flex items-start gap-4">
        <span
          className="font-display text-[64px] md:text-[88px] leading-none tracking-tight"
          style={{ color: 'var(--color-ember)' }}
        >
          {book.rank.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Cover swatch */}
      <div className="md:col-span-2">
        <div
          className="aspect-[2/3] rounded-sm relative overflow-hidden"
          style={{
            background: book.spine,
            boxShadow: '0 14px 30px -10px rgba(0,0,0,0.5), inset 2px 0 0 rgba(255,255,255,0.06)',
          }}
        >
          {book.cover ? (
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-3 flex flex-col justify-between" style={{ color: textColorOn(book.spine) }}>
              <div className="font-display text-[15px] leading-tight font-medium tracking-tight">
                {book.title}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">{book.author}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] opacity-60 mt-1">{book.year}</div>
              </div>
            </div>
          )}
          {/* spine highlight */}
          <div className="absolute inset-y-0 left-0 w-2" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>

      {/* Body */}
      <div className="md:col-span-8">
        <div className="flex items-baseline gap-3 mb-2 text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          <span>{book.genre}</span>
          <span className="opacity-50">·</span>
          <span>{book.year}</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">{book.title}</h2>
        <div className="mt-1 text-[15px] text-bone-mute">{book.author}</div>
        <p className="mt-5 text-[16px] md:text-[17px] leading-[1.7] text-bone-mute max-w-[58ch]">
          {book.note}
        </p>
      </div>
    </article>
  )
}

/** Pick light or dark text based on spine luminance. */
function textColorOn(hex: string): string {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.6 ? '#1a1a1a' : 'oklch(0.96 0.008 80)'
}
