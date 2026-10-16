import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { profile } from '../data/profile'
import { Reveal, SplitWords } from '../components/Reveal'
import pranavPhoto from '../assets/pranav.jpg'
import googleLogo from '../assets/google.png'
import { EmailMenu } from '../components/EmailMenu'
import { PixelPranav } from '../components/PixelPranav'
import kelloggLogo from '../assets/kellogg.png'
import brandeisLogo from '../assets/brandeis.svg'
import deloitteLogo from '../assets/deloitte.svg'

export function Home() {
  return (
    <>
      <Hero />
      <Now />
      <Bio />
      <Path />
      <CrossLinks />
    </>
  )
}

const TWIN_LINES = [
  "Hi. I'm the one that doesn't need sleep.",
  'Ask me about Google. Or the temple. Both are fair.',
  "He wrote my system prompt. I'm still deciding how I feel about it.",
  'The real one is on the left. He has strong opinions about pickleball.',
]

function useTwinLine() {
  const reduce = useReducedMotion()
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(reduce ? TWIN_LINES[0].length : 0)

  useEffect(() => {
    if (reduce) return
    const full = TWIN_LINES[line].length
    if (chars < full) {
      const t = window.setTimeout(() => setChars((c) => c + 1), 32)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => {
      setLine((l) => (l + 1) % TWIN_LINES.length)
      setChars(0)
    }, 3400)
    return () => window.clearTimeout(t)
  }, [line, chars, reduce])

  const text = TWIN_LINES[line]
  return { shown: text.slice(0, chars), full: text, typing: chars < text.length }
}

function Hero() {
  const twin = useTwinLine()

  return (
    <section className="relative min-h-[88svh] gutter pt-6 pb-16 md:pt-10 md:pb-24 grid md:grid-cols-12 gap-12 md:gap-8 items-center">
      <div className="md:col-span-7 relative z-10">
        <h1 className="font-display font-medium leading-[0.92] tracking-tight text-balance" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
          <SplitWords text="Pranav" stagger={0.08} />
          <br />
          <span style={{ color: 'var(--color-ember)' }}>
            <SplitWords text="Varanasi." stagger={0.08} delay={0.1} />
          </span>
        </h1>
        <Reveal delay={0.6} className="mt-8 max-w-[26ch] font-display text-[28px] md:text-[38px] leading-[1.08] tracking-tight text-bone text-balance">
          I get AI into real organizations, then make sure people use it.
        </Reveal>
        <Reveal delay={0.75} className="mt-6 max-w-[52ch] text-[16px] md:text-[17px] text-bone-mute leading-[1.65] text-pretty">
          Joint MBA and AI degree at Kellogg and McCormick. Fresh off a summer at Google, four years of Deloitte GenAI before that. Looking for a deployment strategist or product manager role starting spring 2027.
        </Reveal>
        <Reveal delay={0.9} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent('Saw your site, pranavtech.me')}`}
            className="inline-flex items-center px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-ember)', color: 'var(--color-ink)' }}
          >
            Email me
          </a>
          <Link to="/ask" className="font-mono text-[12px] uppercase tracking-[0.18em] text-bone hover:text-ember transition-colors">
            Ask my twin first
          </Link>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[12px] uppercase tracking-[0.18em] text-bone-mute hover:text-bone transition-colors"
          >
            LinkedIn
          </a>
        </Reveal>
      </div>

      {/* Two Pranavs: the human and the twin, same frame, labelled plainly. */}
      <div className="md:col-span-5 relative z-0 grid grid-cols-2 gap-4 md:gap-5 items-start">
        <motion.figure
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
            <img
              src={pranavPhoto}
              alt="Pranav Varanasi"
              className="h-full w-full object-cover"
              style={{ filter: 'contrast(1.04) saturate(0.95)' }}
            />
          </div>
          <figcaption className="mt-4">
            <div className="font-display text-[26px] leading-none tracking-tight text-bone">Human</div>
            <div className="mt-1.5 text-[14px] text-bone-mute">The real one.</div>
          </figcaption>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            className="relative flex items-end justify-center overflow-hidden"
            style={{ aspectRatio: '4 / 5', background: 'oklch(0.3 0.06 150)' }}
          >
            <div className="origin-bottom scale-[0.62] sm:scale-[0.8] md:scale-[0.62] lg:scale-[0.8]">
              <PixelPranav scale={9} mood={twin.typing ? 'speak' : 'idle'} />
            </div>
          </div>
          <figcaption className="mt-4">
            <div className="font-display text-[26px] leading-none tracking-tight" style={{ color: 'var(--color-ember)' }}>Twin</div>
            <div className="mt-1.5 text-[14px] text-bone-mute">The AI one.</div>
          </figcaption>
        </motion.figure>

        <div className="col-span-2 mt-2 border border-ink-3 bg-ink-2 p-5">
          <p className="min-h-[3.2em] text-[17px] leading-snug text-bone text-pretty" aria-label={twin.full}>
            <span aria-hidden>{twin.shown}</span>
          </p>
          <Link to="/ask" className="mt-3 inline-block text-[14px] text-bone-mute hover:text-ember transition-colors">
            It's Claude running a prompt I wrote. Talk to it →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Now() {
  return (
    <section className="gutter py-24 md:py-32 border-t border-ink-3">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <div className="text-[12px] uppercase tracking-[0.24em] text-bone-faint">Right now</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">One wrapped, one in progress.</h2>
          </Reveal>
        </div>
        <div className="md:col-span-9 grid md:grid-cols-2 gap-10 md:gap-14">
          {/* Google */}
          <Reveal>
            <div className="font-mono text-[12px] tracking-[0.2em] text-bone-faint">01</div>
            <h3 className="mt-4 font-display text-3xl md:text-[34px] tracking-tight">Google · Summer 2026</h3>

            <PeopleOpsAIDiagram />

            <p className="mt-8 text-bone-mute text-[15.5px] leading-[1.75] max-w-[44ch]">
              Spent the summer in People Operations finding 70+ pain points, getting 4 AI use cases approved, and building an agent that cut a 10-step search down to 2 (about 25 hours a week saved). Then I trained the team to use it.
            </p>
          </Reveal>

          {/* Northwestern MBAi */}
          <Reveal delay={0.1}>
            <div className="font-mono text-[12px] tracking-[0.2em] text-bone-faint">02</div>
            <h3 className="mt-4 font-display text-3xl md:text-[34px] tracking-tight">Northwestern · MBAi</h3>

            <MBAiDiagram />

            <p className="mt-6 text-bone-mute text-[15.5px] leading-[1.7] max-w-[42ch]">
              Director of Research at the AI Club. A more technical MBA: business through an AI lens, hands-on with the latest tools, training for the roles that will reshape this era.
            </p>
          </Reveal>
        </div>
      </div>
      {/* Looking for: its own band, same 3/9 split as the section above */}
      <div className="mt-20 md:mt-28 pt-12 md:pt-16 border-t border-ink-3 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-3">
          <div className="text-[12px] uppercase tracking-[0.24em] text-bone-faint">What's next</div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-9">
          <h3 className="font-display text-4xl md:text-6xl tracking-tight text-balance">
            Looking for a full-time role{' '}
            <span style={{ color: 'var(--color-ember)' }}>starting spring 2027.</span>
          </h3>
          <p className="mt-6 text-bone-mute text-[16px] md:text-[17px] leading-[1.7] max-w-[56ch]">
            Deployment strategist or product manager: getting AI into real organizations and making sure people actually use it. If that's a seat on your team, I'd love to talk.
          </p>
          <div className="mt-8"><EmailMenu /></div>
          <div className="mt-4 font-mono text-[12px] text-bone-faint">{profile.email}</div>
        </Reveal>
      </div>
    </section>
  )
}

function MBAiDiagram() {
  return (
    <div className="mt-8">
      {/* inline-block parent sizes to wordmark width so labels align to its edges */}
      <div className="inline-block">
        <div className="flex items-end">
          {/* MBA column — bracket auto-sizes to MBA letter width */}
          <div className="flex flex-col items-stretch">
            <motion.span
              className="font-display tracking-tighter leading-[0.85] text-bone"
              style={{ fontSize: 'clamp(82px, 13vw, 148px)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              MBA
            </motion.span>
            <motion.svg
              width="100%" height="10" viewBox="0 0 100 10" preserveAspectRatio="none"
              className="block text-bone-faint mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <path d="M 1 0 L 1 8 L 99 8 L 99 0" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </motion.svg>
          </div>

          {/* i column — bracket auto-sizes to just the i letter */}
          <div className="flex flex-col items-stretch">
            <motion.span
              className="font-display tracking-tighter leading-[0.85]"
              style={{ fontSize: 'clamp(82px, 13vw, 148px)', color: 'var(--color-ember)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              i
            </motion.span>
            <motion.svg
              width="100%" height="10" viewBox="0 0 100 10" preserveAspectRatio="none"
              className="block mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <path d="M 1 0 L 1 8 L 99 8 L 99 0" fill="none" stroke="var(--color-ember)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </motion.svg>
          </div>
        </div>

        {/* Labels span the full wordmark width, anchored to its edges */}
        <div className="flex justify-between mt-2 gap-3">
          <div className="text-[10px] uppercase tracking-[0.22em] text-bone-mute">
            Kellogg<span className="text-bone-faint"> · Business</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-right" style={{ color: 'var(--color-ember)' }}>
            McCormick · AI
          </div>
        </div>
      </div>

      {/* Bottom rule with metadata */}
      <div className="mt-6 pt-4 border-t border-ink-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
        <span>Joint degree · Northwestern</span>
        <span className="text-bone-mute">→ Mar 2027</span>
      </div>
    </div>
  )
}

function PeopleOpsAIDiagram() {
  return (
    <div className="mt-7">
      <div className="inline-block">
        {/* Stacked typographic wordmarks — People Ops above, × AI below */}
        <div className="font-display tracking-tighter leading-[0.92]" style={{ fontSize: 'clamp(46px, 6.2vw, 74px)' }}>
          <motion.div
            className="text-bone"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            People Ops
          </motion.div>
          <motion.div
            style={{ color: 'var(--color-ember)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            × AI
          </motion.div>
        </div>

      </div>

      {/* Bottom rule with metadata, mirrors MBAi card */}
      <div className="mt-6 pt-4 border-t border-ink-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
        <span>AI Ops Program Manager Intern · NYC</span>
        <span className="text-bone-mute">→ Jun to Aug 2026</span>
      </div>
    </div>
  )
}

function Bio() {
  return (
    <section className="gutter py-24 md:py-36 border-t border-ink-3">
      <div className="max-w-[68ch] mx-auto">
        <Reveal>
          <div className="text-[12px] uppercase tracking-[0.24em] text-bone-faint mb-6">A short version</div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-[28px] md:text-[37px] leading-[1.18] tracking-tight text-pretty">
            <span style={{ color: 'var(--color-ember)' }}>I love exploring how AI is used and where it's heading.</span> I write on Substack about what it's doing to us. I coached 6th-grade basketball, take RV trips to national parks, and once had a background role in a Leonardo DiCaprio movie.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

interface PathStop {
  year: string
  yearRange?: string
  place: string
  city: string
  title: string
  body: string
  icon: 'brandeis' | 'deloitte' | 'variant' | 'kellogg' | 'google'
  tag: string
}

function Path() {
  const stops: PathStop[] = [
    {
      year: '2017',
      yearRange: '2017 to 2021',
      place: 'Brandeis University',
      city: 'Waltham, MA',
      title: 'Health Policy',
      tag: 'Undergrad',
      body: 'Studied health, science, and society. Wrote about healthcare access. Studied abroad in London. Made finals in three startup competitions and lost all of them.',
      icon: 'brandeis',
    },
    {
      year: '2021',
      yearRange: '2021 to 2025',
      place: 'Deloitte',
      city: 'Austin, TX',
      title: 'AI Strategy',
      tag: 'Consulting · Four years',
      icon: 'deloitte',
      body: `Led the team that launched Deloitte's GenAI incubator: enhanced 14 of their proprietary solutions with generative AI capability. Projected $145M in sales over three years. Acted as APM for an AI/ML self-service analytics platform, coordinating 15 engineers and 3 designers.\n\nWrote a GenAI playbook for 1,000+ IT employees at a major US health insurer; defined how to evaluate and roll out AI use cases responsibly. $1M in additional sales attributed to it.\n\nWrote fictional 20-year storylines about generative AI for a Deloitte whitepaper. 10K+ views across channels. Got showcased at SXSW.\n\nStarted an inclusion program for introverts inside the firm. Hosted a panel of senior introvert leaders. Ran a newsletter called Unlocking Introvert Potential. ~100 attendees on the launch.`,
    },
    {
      year: '2025',
      yearRange: '2025 to 2027',
      place: 'Northwestern',
      city: 'Evanston, IL',
      title: 'MBAi',
      tag: 'Kellogg + McCormick',
      icon: 'kellogg',
      body: 'Joint MBA + AI degree at Kellogg + McCormick. Three-year program. Director of Research & Innovation for the AI Club. Marketing & Admissions Director for the MBAi program.',
    },
    {
      year: '2026',
      place: 'Google',
      city: 'New York, NY',
      title: 'AI Operations',
      tag: 'Internship · People Operations',
      icon: 'google',
      body: 'Summer internship as an AI Operations Program Manager in People Operations. Ran 15 discovery sessions, wrote the requirements doc that got 4 AI use cases approved, built a Drive auditing agent and a Gemini Notebook, and trained the team on 40 practical AI workflows.',
    },
  ]
  return <PathBody stops={stops} />
}

function PathBody({ stops }: { stops: PathStop[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.7', 'end 0.7'] })
  const lineHeight = useTransform(scrollYProgress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`)
  const dotTop = useTransform(scrollYProgress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`)

  return (
    <section ref={sectionRef} className="gutter py-24 md:py-40 border-t border-ink-3 relative overflow-hidden">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24">
          <div>
            <div className="text-[12px] uppercase tracking-[0.24em] text-bone-faint">The path</div>
            <h2 className="mt-3 font-display text-5xl md:text-7xl tracking-tight">How I got here.</h2>
          </div>
          <div className="font-mono text-[11px] text-bone-faint hidden md:block">2017 → 2026</div>
        </div>
      </Reveal>

      {/* desktop: animated travelling spine */}
      <div className="absolute left-1/2 top-[260px] bottom-32 w-px hidden md:block pointer-events-none">
        <div className="absolute inset-0 bg-ink-3" />
        <motion.div className="absolute inset-x-0 top-0" style={{ height: lineHeight, background: 'var(--color-ember)' }} />
        <motion.div
          className="absolute -left-[5px] h-2.5 w-2.5 rounded-full"
          style={{
            top: dotTop,
            background: 'var(--color-ember)',
            boxShadow: '0 0 24px oklch(0.62 0.18 150 / 0.7)',
          }}
        />
      </div>

      <ol className="relative space-y-28 md:space-y-44">
        {stops.map((s, i) => (
          <PathChapter key={s.year} stop={s} index={i} total={stops.length} />
        ))}
      </ol>
    </section>
  )
}

function PathChapter({ stop, index, total }: { stop: PathStop; index: number; total: number }) {
  const left = index % 2 === 0
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress: chapterProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] })
  const chapterOpacity = useTransform(chapterProgress, [0, 1], [0.5, 1])

  return (
    <motion.li ref={ref} className="relative" style={{ opacity: chapterOpacity }}>
      {/* HUGE year as visual anchor */}
      <div
        className={[
          'pointer-events-none absolute -z-0 -top-4 select-none',
          left ? 'right-0 md:right-auto md:left-[55%]' : 'right-0 md:left-auto md:right-[55%]',
        ].join(' ')}
        aria-hidden
      >
        <div
          className="font-display font-medium leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(72px, 16vw, 240px)',
            color: 'oklch(0.21 0.014 280)',
            opacity: 0.7,
          }}
        >
          {stop.year}
        </div>
      </div>

      <div className="relative md:grid md:grid-cols-2 md:gap-20 items-start">
        {/* Marker side */}
        <div className={['relative', left ? 'md:order-1' : 'md:order-2 md:col-start-2'].join(' ')}>
          <div className={['flex items-start gap-4', left ? 'md:flex-row-reverse md:text-right md:justify-start' : 'md:text-left md:justify-start'].join(' ')}>
            <PathIcon kind={stop.icon} />
            <div>
              <div className="font-mono text-[12px] tracking-[0.2em] text-bone-faint">
                {stop.yearRange ?? stop.year}
              </div>
              <div className="font-display text-[28px] md:text-[40px] leading-[1.05] tracking-tight mt-1">
                {stop.place}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bone-faint mt-1">
                {stop.city}
              </div>
            </div>
          </div>
        </div>

        {/* Center marker dot (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-3 -translate-x-1/2 z-10">
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded-full" style={{ background: 'var(--color-ink)', border: '2px solid var(--color-ember)' }} />
            <div className="absolute inset-1.5 rounded-full" style={{ background: 'var(--color-ember)' }} />
          </div>
        </div>

        {/* Body side */}
        <div className={['mt-8 md:mt-1', left ? 'md:order-2 md:col-start-2' : 'md:order-1 md:col-start-1'].join(' ')}>
          <div className="text-[11px] uppercase tracking-[0.18em] text-bone-faint">{stop.tag}</div>
          <h3 className="mt-2 font-display text-3xl md:text-[44px] leading-[1] tracking-tight">{stop.title}</h3>
          <div className="mt-5 max-w-[58ch] space-y-3.5">
            {stop.body.split('\n\n').map((para, j) => (
              <p key={j} className="text-[15px] md:text-[16px] text-bone-mute leading-[1.75]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-only chapter divider */}
      {index < total - 1 && (
        <div className="md:hidden mt-14 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-3" />
          <div className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">{index + 1} / {total}</div>
          <div className="h-px flex-1 bg-ink-3" />
        </div>
      )}
    </motion.li>
  )
}

function PathIcon({ kind }: { kind: PathStop['icon'] }) {
  const size = 56
  const wrap = 'relative flex items-center justify-center rounded-full shrink-0'
  if (kind === 'kellogg') {
    return (
      <div className={wrap} style={{ height: size, width: size, background: 'oklch(0.96 0.008 80)', boxShadow: '0 0 0 1px var(--color-ink-3), 0 12px 24px -10px oklch(0 0 0 / 0.4)' }}>
        <img src={kelloggLogo} alt="Kellogg" className="h-7 w-auto" />
      </div>
    )
  }
  if (kind === 'google') {
    return (
      <div className={wrap} style={{ height: size, width: size, background: 'oklch(0.96 0.008 80)', boxShadow: '0 0 0 1px var(--color-ink-3), 0 12px 24px -10px oklch(0 0 0 / 0.4)' }}>
        <img src={googleLogo} alt="Google" className="h-7 w-auto" />
      </div>
    )
  }
  if (kind === 'brandeis') {
    return (
      <div className={wrap} style={{ height: size, width: size, background: 'oklch(0.96 0.008 80)', boxShadow: '0 0 0 1px var(--color-ink-3), 0 12px 24px -10px oklch(0 0 0 / 0.4)' }}>
        <img src={brandeisLogo} alt="Brandeis" className="h-5 w-auto" />
      </div>
    )
  }
  if (kind === 'deloitte') {
    return (
      <div className={wrap} style={{ height: size, width: size, background: 'oklch(0.96 0.008 80)', boxShadow: '0 0 0 1px var(--color-ink-3), 0 12px 24px -10px oklch(0 0 0 / 0.4)' }}>
        <img src={deloitteLogo} alt="Deloitte" className="h-4 w-auto" />
      </div>
    )
  }
  if (kind === 'variant') {
    return (
      <div className={wrap} style={{ height: size, width: size, background: 'oklch(0.21 0.014 280)', boxShadow: '0 0 0 1px var(--color-ink-3)' }}>
        <svg viewBox="-20 -20 40 40" className="h-7 w-7">
          {Array.from({ length: 8 }, (_, i) => {
            const t = (i / 8) * Math.PI * 2 * 1.5
            const y = -14 + (i / 7) * 28
            const x1 = Math.cos(t) * 7
            const x2 = Math.cos(t + Math.PI) * 7
            return (
              <g key={i}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="oklch(0.45 0.014 280)" strokeWidth="0.6" />
                <circle cx={x1} cy={y} r="1.4" fill={i % 2 === 0 ? 'var(--color-ember)' : 'oklch(0.96 0.008 80)'} />
                <circle cx={x2} cy={y} r="1.4" fill={i % 2 === 0 ? 'oklch(0.96 0.008 80)' : 'var(--color-ember)'} />
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
  return null
}

function CrossLinks() {
  const links = [
    { to: '/projects', kicker: 'Projects', label: 'Three things I\'ve shipped.', n: '03' },
    { to: '/writing', kicker: 'Writing', label: 'Nine essays on AI and humanity.', n: '09' },
    { to: '/books', kicker: 'Books', label: 'The shelf, in order of impact.', n: '12' },
    { to: '/travel', kicker: 'Travel', label: 'Where I\'ve been on the map.', n: '∞' },
    { to: '/ask', kicker: 'Ask Pranav', label: 'Talk to a model trained on me.', n: 'AI' },
  ]
  return (
    <section className="gutter py-24 md:py-32 border-t border-ink-3">
      <ul className="divide-y divide-ink-3">
        {links.map((l, i) => (
          <li key={l.to}>
            <Reveal delay={i * 0.04}>
              <Link to={l.to} className="group flex items-baseline justify-between py-7 md:py-9 hover:bg-ink-2/40 transition-colors duration-300 -mx-4 md:-mx-6 px-4 md:px-6 rounded-sm">
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-bone-faint w-8">{l.n}</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint w-24 hidden md:inline">{l.kicker}</span>
                  <span className="font-display text-3xl md:text-5xl tracking-tight group-hover:text-ember transition-colors duration-300">{l.label}</span>
                </div>
                <span className="text-bone-faint group-hover:text-bone group-hover:translate-x-2 transition-all duration-300 text-2xl">→</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
