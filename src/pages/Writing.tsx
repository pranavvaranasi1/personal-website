import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { articles, type Article } from '../data/articles'
import { Reveal } from '../components/Reveal'

export function Writing() {
  const [open, setOpen] = useState<string | null>(null)
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <header className="gutter pt-10 md:pt-16 pb-16">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint">Writing</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-5xl md:text-8xl tracking-tight max-w-[18ch] text-balance leading-[0.96]">
            What I think about <span style={{ color: 'var(--color-ember)' }}>AI</span> and us.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[58ch] text-bone-mute text-[17px] leading-[1.7]">
            Click any title to open the full essay inline. Some of these were written for Deloitte's <a className="underline decoration-ember underline-offset-4 hover:decoration-bone transition" href="https://nextfutures.substack.com" target="_blank" rel="noreferrer">Next Futures</a>. The rest are mine, on <a className="underline decoration-ember underline-offset-4 hover:decoration-bone transition" href="https://pranavvaranasi.substack.com" target="_blank" rel="noreferrer">Substack</a>.
          </p>
        </Reveal>
      </header>

      <section className="gutter pb-24">
        <ul className="border-t border-ink-3">
          {sorted.map((a, i) => (
            <li key={a.slug} className="border-b border-ink-3">
              <Reveal delay={i * 0.04}>
                <ArticleRow article={a} open={open === a.slug} onToggle={() => setOpen(open === a.slug ? null : a.slug)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function ArticleRow({ article, open, onToggle }: { article: Article; open: boolean; onToggle: () => void }) {
  return (
    <article className="">
      <button
        onClick={onToggle}
        className="group w-full text-left py-7 md:py-9 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline"
      >
        <div className="md:col-span-9">
          <h2
            className={[
              'font-display text-[28px] md:text-[40px] leading-[1.05] tracking-tight transition-colors duration-300',
              open ? 'text-ember' : 'group-hover:text-ember',
            ].join(' ')}
          >
            {article.title}
          </h2>
          <p className="mt-2 text-[15px] text-bone-mute max-w-[60ch] leading-[1.55]">{article.subtitle}</p>
        </div>
        <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3 md:gap-1 text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          <span>{article.publication}</span>
          <span>{article.readMin} min read</span>
        </div>
        <div className="md:col-span-1 md:text-right">
          <span className={['inline-block transition-transform duration-500', open ? 'rotate-45' : 'rotate-0'].join(' ')}>
            <span className="text-2xl text-bone-mute group-hover:text-bone">+</span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="reader"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Reader article={article} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

function Reader({ article }: { article: Article }) {
  // Render markdown-ish body. Supports ## headings, > pull quotes, *italic*, **bold**.
  const blocks = article.body.split('\n\n')
  return (
    <div className="pb-16 pt-4">
      {article.pull && (
        <div className="my-10 max-w-[68ch] mx-auto">
          <blockquote className="font-display text-[28px] md:text-[42px] leading-[1.15] tracking-tight text-bone text-pretty border-l-2 pl-6" style={{ borderColor: 'var(--color-ember)' }}>
            {article.pull}
          </blockquote>
        </div>
      )}
      <div className="max-w-[68ch] mx-auto" style={{ fontFamily: 'var(--font-display)' }}>
        {blocks.map((b, i) => {
          if (b.startsWith('## ')) {
            return (
              <h3 key={i} className="mt-12 mb-4 font-display text-[28px] md:text-[34px] tracking-tight" style={{ color: 'var(--color-ember)' }}>
                {b.slice(3)}
              </h3>
            )
          }
          if (b.startsWith('> ')) {
            return (
              <blockquote key={i} className="my-8 border-l-2 pl-5 font-display text-[22px] md:text-[26px] leading-[1.3] text-bone" style={{ borderColor: 'var(--color-ember)' }}>
                {b.slice(2)}
              </blockquote>
            )
          }
          // First paragraph: drop cap
          const isFirst = i === 0
          return (
            <p
              key={i}
              className={[
                'mb-6 text-[19px] md:text-[20px] leading-[1.7] text-bone-mute',
                isFirst ? 'first-letter:font-display first-letter:font-medium first-letter:text-[64px] first-letter:leading-[0.85] first-letter:float-left first-letter:pr-3 first-letter:pt-1 first-letter:text-ember' : '',
              ].join(' ')}
              dangerouslySetInnerHTML={{ __html: inline(b) }}
            />
          )
        })}
        {article.aiNote && (
          <p className="mt-12 text-[12px] italic text-bone-faint border-l-2 border-ink-3 pl-4 max-w-[60ch]" style={{ fontFamily: 'var(--font-sans)' }}>
            Author's note — {article.aiNote}
          </p>
        )}
        <div className="mt-8 pt-6 border-t border-ink-3 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-bone-faint" style={{ fontFamily: 'var(--font-sans)' }}>
          <span>{article.publication}</span>
          <a href={article.url} target="_blank" rel="noreferrer" className="hover:text-bone transition">Original on Substack →</a>
        </div>
      </div>
    </div>
  )
}

function inline(s: string): string {
  // Escape HTML, then format **bold** and *italic*.
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return esc
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color: var(--color-bone); font-weight: 600;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}
