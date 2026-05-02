import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { projects } from '../data/projects'
import { Reveal } from '../components/Reveal'
import medicastSxsw1 from '../assets/medicast-sxsw-1.jpg'
import medicastSxsw2 from '../assets/medicast-sxsw-2.jpg'
import variantPitch from '../assets/variant-labs-pitch.jpg'
import actorStill1 from '../assets/actor-still-1.jpg'
import actorStill2 from '../assets/actor-still-2.jpg'
import actorStill3 from '../assets/actor-still-3.jpg'
import actorStill4 from '../assets/actor-still-4.jpg'

export function Projects() {
  return (
    <>
      <Header />
      <VariantLabsSection />
      <AdaptSection />
      <MedicastSection />
      <ActingSection />
    </>
  )
}

const PROJECT_CATEGORIES = [
  { label: 'Techbio', target: 'project-variant-labs' },
  { label: 'Fitness', target: 'project-adapt' },
  { label: 'Acting', target: 'project-acting' },
  { label: 'Healthcare', target: 'project-medicast' },
]

function Header() {
  return (
    <section className="gutter pt-10 md:pt-16 pb-16">
      <Reveal>
        <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint">Projects · Four of them</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-4 font-display text-5xl md:text-8xl tracking-tight max-w-[14ch] text-balance leading-[0.96]">
          Things I've actually <span style={{ color: 'var(--color-ember)' }}>built.</span>
        </h1>
      </Reveal>
      <Reveal delay={0.25}>
        <div className="mt-8 flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c.target}
              type="button"
              onClick={() => {
                const el = document.getElementById(c.target)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="group text-[11px] uppercase tracking-[0.2em] text-bone-mute border border-ink-3 hover:border-ember hover:text-ember transition-colors px-3.5 py-1.5 rounded-full"
            >
              {c.label}
              <span className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Variant Labs — editorial spread with protein helix ---------- */

function VariantLabsSection() {
  const p = projects[0]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const helixRot = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={ref} id="project-variant-labs" className="gutter py-24 md:py-32 border-t border-ink-3 relative overflow-hidden scroll-mt-8">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-7 md:order-1 order-2">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone-faint">01</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint">{p.role}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-[88px] leading-[0.95] tracking-tight">{p.name}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-display text-[24px] md:text-[28px] leading-[1.25] text-bone-mute max-w-[28ch] text-balance">
              {p.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 max-w-[60ch] space-y-5 text-[17px] leading-[1.75] text-bone-mute">
              <p>{p.description}</p>
              <p className="relative pl-6 border-l border-ember-low text-bone">
                {p.story}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[11px] tracking-wide text-bone-faint border border-ink-3 rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:order-2 order-1 md:sticky md:top-32">
          <motion.div
            className="aspect-square w-full max-w-[480px] mx-auto relative"
            style={{ rotate: helixRot }}
          >
            <ProteinHelix />
          </motion.div>
          <p className="mt-3 text-center font-mono text-[10px] tracking-[0.2em] text-bone-faint">
            ALPHAFOLD · CHAI-2 · BOLTZ-2
          </p>
        </div>
      </div>

      <VariantPitchSpread />
    </section>
  )
}

function VariantPitchSpread() {
  return (
    <div className="mt-20 md:mt-28 max-w-[640px]">
      <Reveal>
        <div className="flex items-baseline justify-between mb-4">
          <span className="font-mono text-[11px] tracking-[0.22em]" style={{ color: 'var(--color-ember)' }}>
            ★ ON THE GROUND
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-bone-faint">
            VARIANT LABS · PITCH
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <figure className="relative overflow-hidden rounded-sm bg-ink-2">
          <img
            src={variantPitch}
            alt="Pranav pitching Variant Labs"
            className="w-full h-auto block"
            style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
            loading="lazy"
          />
        </figure>
      </Reveal>
    </div>
  )
}

function ProteinHelix() {
  // Stylized double helix made of dots
  const turns = 4
  const perTurn = 14
  const total = turns * perTurn
  const dots = Array.from({ length: total }, (_, i) => i)
  return (
    <svg viewBox="-100 -100 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="emberDot">
          <stop offset="0%" stopColor="oklch(0.72 0.18 25)" />
          <stop offset="100%" stopColor="oklch(0.45 0.14 25)" />
        </radialGradient>
        <radialGradient id="boneDot">
          <stop offset="0%" stopColor="oklch(0.96 0.008 80)" />
          <stop offset="100%" stopColor="oklch(0.65 0.012 80)" />
        </radialGradient>
      </defs>
      {dots.map((i) => {
        const t = (i / total) * Math.PI * 2 * turns
        const y = -85 + (i / total) * 170
        const x1 = Math.cos(t) * 36
        const x2 = Math.cos(t + Math.PI) * 36
        const z1 = Math.sin(t)
        const r1 = 3 + z1 * 1.2
        const r2 = 3 - z1 * 1.2
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="oklch(0.36 0.014 280)" strokeWidth="0.5" />
            <circle cx={x1} cy={y} r={Math.max(1.5, r1)} fill={i % 4 === 0 ? 'url(#emberDot)' : 'url(#boneDot)'} opacity={0.7 + z1 * 0.3} />
            <circle cx={x2} cy={y} r={Math.max(1.5, r2)} fill={i % 4 === 0 ? 'url(#emberDot)' : 'url(#boneDot)'} opacity={0.7 - z1 * 0.3} />
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Adapt — phone mockup with tilt-on-scroll ---------- */

function AdaptSection() {
  const p = projects[1]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Dampen the parallax tilt on phones so the phone mockup doesn't rotate
  // past its container on narrow screens.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const tiltMax = isMobile ? 8 : 25
  const yMax = isMobile ? 24 : 60

  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [tiltMax, 0, -tiltMax])
  const yShift = useTransform(scrollYProgress, [0, 1], [yMax, -yMax])

  return (
    <section ref={ref} id="project-adapt" className="gutter py-32 md:py-40 border-t border-ink-3 relative overflow-hidden bg-ink-2/30 scroll-mt-8">
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 md:col-start-1">
          <motion.div
            style={{ rotate: tilt, y: yShift }}
            className="relative mx-auto"
          >
            <PhoneMock />
          </motion.div>
          <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-bone-faint">
            iOS · SWIFT · HEALTHKIT
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone-faint">02 · {p.year}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint">{p.role}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-[88px] leading-[0.95] tracking-tight">{p.name}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-display text-[24px] md:text-[28px] leading-[1.25] text-bone-mute max-w-[28ch] text-balance">
              {p.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 max-w-[55ch] space-y-5 text-[17px] leading-[1.75] text-bone-mute">
              <p>{p.description}</p>
              <p className="relative pl-6 border-l border-ember-low text-bone">{p.story}</p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[11px] tracking-wide text-bone-faint border border-ink-3 rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PhoneMock() {
  const teamA = 247
  const teamB = 219
  const aPct = Math.round((teamA / (teamA + teamB)) * 100)
  const lead = teamA - teamB

  // 7-day cumulative score sparkline
  const aPts = '0,26 20,21 40,17 60,18 80,11 100,9 120,4'
  const bPts = '0,28 20,24 40,21 60,18 80,18 100,16 120,14'

  const todayPts = 24
  const multiplier = 0.62 // 62% toward 2× streak

  return (
    <div
      className="relative w-[260px] aspect-[9/19] rounded-[40px] mx-auto"
      style={{
        background: 'linear-gradient(160deg, oklch(0.30 0.014 280), oklch(0.18 0.012 280))',
        boxShadow: '0 50px 80px -20px oklch(0 0 0 / 0.6), inset 0 0 0 2px oklch(0.36 0.014 280)',
      }}
    >
      <div className="absolute inset-2 rounded-[34px] overflow-hidden bg-ink p-4 flex flex-col">
        <div className="flex justify-between items-center text-[10px] font-mono text-bone-faint">
          <span>9:41</span>
          <span>●●●</span>
        </div>

        {/* Kicker — H2H + days left, mirrors the real H2H view */}
        <div className="mt-4 flex items-baseline justify-between font-mono text-[9px] tracking-[0.22em] uppercase">
          <span className="text-bone-faint">H2H</span>
          <span style={{ color: 'var(--color-ember)' }}>3 days left</span>
        </div>

        {/* Challenge title (italic display, like the actual app) */}
        <div className="mt-1 italic font-display text-[20px] leading-tight tracking-tight text-bone">
          Spring Showdown
        </div>

        {/* Team showdown — Team A vs Team B */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-[17px] tracking-tight text-bone">Team A</span>
            <span className="font-mono text-[22px] tracking-tight tabular-nums" style={{ color: 'var(--color-ember)' }}>
              {teamA}
            </span>
          </div>
          <div className="mt-1.5 relative h-[3px] rounded-full bg-ink-3 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${aPct}%`, background: 'var(--color-ember)' }}
            />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="font-display text-[17px] tracking-tight text-bone-mute">Team B</span>
            <span className="font-mono text-[22px] tracking-tight tabular-nums text-bone-mute">{teamB}</span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between mb-1.5 font-mono text-[9px] tracking-[0.2em] uppercase">
            <span className="text-bone-faint">Last 7 days</span>
            <span style={{ color: 'var(--color-ember)' }}>+{lead} lead</span>
          </div>
          <svg viewBox="0 0 120 30" className="block w-full h-[32px]" preserveAspectRatio="none">
            <line x1="0" y1="8" x2="120" y2="8" stroke="oklch(0.22 0.014 280)" strokeWidth="0.4" strokeDasharray="2 3" />
            <line x1="0" y1="20" x2="120" y2="20" stroke="oklch(0.22 0.014 280)" strokeWidth="0.4" strokeDasharray="2 3" />
            <polyline
              points={bPts}
              fill="none"
              stroke="oklch(0.65 0.012 80)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
            <circle cx="120" cy="14" r="1.6" fill="oklch(0.65 0.012 80)" opacity="0.7" />
            <polyline
              points={aPts}
              fill="none"
              stroke="var(--color-ember)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="120" cy="4" r="2" fill="var(--color-ember)" />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[8px] tracking-[0.18em] uppercase text-bone-faint">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
        </div>

        {/* Today's points + multiplier (mirrors the real H2H view) */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-faint">Today</span>
            <span className="font-mono text-[14px] tabular-nums" style={{ color: 'var(--color-ember)' }}>+{todayPts}</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-bone-faint">2× streak</span>
            <span className="font-mono text-[10px] tabular-nums text-bone-mute">{Math.round(multiplier * 100)}%</span>
          </div>
          <div className="mt-1.5 relative h-[2px] rounded-full bg-ink-3 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${multiplier * 100}%`, background: 'var(--color-ember)', opacity: 0.6 }}
            />
          </div>
        </div>

        <div className="mt-auto flex justify-around text-[18px] text-bone-faint">
          <span>◎</span>
          <span style={{ color: 'var(--color-ember)' }}>▲</span>
          <span>◊</span>
          <span>○</span>
        </div>
      </div>
    </div>
  )
}

/* ---------- Medicast — audio waveform that animates ---------- */

function MedicastSection() {
  const p = projects[2]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} id="project-medicast" className="gutter py-32 md:py-40 border-t border-ink-3 relative overflow-hidden scroll-mt-8">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-bone-faint">03 · {p.year}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint">{p.role}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-6xl md:text-[120px] leading-[0.92] tracking-tight">{p.name}</h2>
      </Reveal>

      <div className="mt-10">
        <Waveform progress={scrollYProgress} />
      </div>

      <div className="mt-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7 md:col-start-1">
          <Reveal delay={0.15}>
            <p className="font-display text-[24px] md:text-[28px] leading-[1.25] text-bone-mute max-w-[36ch] text-balance">
              {p.tagline}
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={0.3}>
            <div className="space-y-5 text-[17px] leading-[1.75] text-bone-mute">
              <p>{p.description}</p>
              <p className="relative pl-6 border-l border-ember-low text-bone">{p.story}</p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[11px] tracking-wide text-bone-faint border border-ink-3 rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <MedicastWinSpread />
    </section>
  )
}

function MedicastWinSpread() {
  return (
    <div className="mt-20 md:mt-28 max-w-[760px]">
      <Reveal>
        <div className="flex items-baseline justify-between mb-4">
          <span className="font-mono text-[11px] tracking-[0.22em]" style={{ color: 'var(--color-ember)' }}>
            ★ AUSTIN · SXSW · WINNERS
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-bone-faint">
            META LLAMA HACKATHON
          </span>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <Reveal delay={0.1}>
          <figure className="relative overflow-hidden rounded-sm bg-ink-2">
            <img
              src={medicastSxsw1}
              alt="Pranav with his brother Kesav and friend Zanir at SXSW after winning the Meta Llama hackathon"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '4 / 5' }}
              loading="lazy"
            />
          </figure>
        </Reveal>
        <Reveal delay={0.2}>
          <figure className="relative overflow-hidden rounded-sm bg-ink-2">
            <img
              src={medicastSxsw2}
              alt="Medicast team celebrating their hackathon win at SXSW"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '4 / 5' }}
              loading="lazy"
            />
          </figure>
        </Reveal>
      </div>
      <Reveal delay={0.3}>
        <p className="mt-5 max-w-[60ch] text-bone-mute text-[15.5px] leading-[1.7]">
          We won the Meta Llama–sponsored hackathon at SXSW in Austin. One of my favorite memories — me, my brother <span className="text-bone">Kesav</span>, and our friend <span className="text-bone">Zanir</span>.
        </p>
      </Reveal>
    </div>
  )
}

function Waveform({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  // Static deterministic waveform; 'play head' moves with scroll
  const bars = Array.from({ length: 96 }, (_, i) => {
    const seed = Math.sin(i * 0.7) * 0.5 + Math.cos(i * 0.3) * 0.3 + Math.sin(i * 1.7) * 0.2
    return 18 + Math.abs(seed) * 70
  })
  const headX = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <div className="relative">
      <div className="flex items-center gap-[2px] h-[120px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${h}%`,
              background: i % 12 === 0 ? 'var(--color-ember)' : 'var(--color-ink-4)',
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: headX, background: 'var(--color-ember)' }}
      >
        <div className="absolute -top-2 -left-1 w-2 h-2 rounded-full" style={{ background: 'var(--color-ember)' }} />
      </motion.div>
      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.2em] text-bone-faint">
        <span>00:00</span>
        <span>CARDIOLOGY · EP 14</span>
        <span>22:14</span>
      </div>
    </div>
  )
}

/* ---------- Acting — carousel of stills ---------- */

function ActingSection() {
  return (
    <section id="project-acting" className="gutter py-32 md:py-40 border-t border-ink-3 relative overflow-hidden scroll-mt-8">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-bone-faint">04 · 2021 — 2022</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint">Background actor</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-6xl md:text-[120px] leading-[0.92] tracking-tight">Acting.</h2>
      </Reveal>

      <div className="mt-10">
        <ActingCarousel />
      </div>

      <div className="mt-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7 md:col-start-1">
          <Reveal delay={0.15}>
            <p className="font-display text-[24px] md:text-[28px] leading-[1.25] text-bone-mute max-w-[36ch] text-balance">
              Background work, on the side. <em>Don't Look Up</em> was the biggest one.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={0.3}>
            <div className="space-y-5 text-[17px] leading-[1.75] text-bone-mute">
              <p>
                Acting was a way to be in rooms I'd otherwise never be in. The biggest one was <em>Don't Look Up</em>. A few seconds in the mission control scenes with Leonardo DiCaprio and Jonah Hill. Smaller ones along the way: a Bank of America corporate training video, and a local commercial where I played a dad with a baby stroller.
              </p>
              <p className="relative pl-6 border-l border-ember-low text-bone">
                None of it adds up to a career. All of it taught me something about presence and repetition I didn't know I needed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Don't Look Up · 2021", 'BofA Corporate', 'Stroller Commercial'].map((s) => (
                <span key={s} className="font-mono text-[11px] tracking-wide text-bone-faint border border-ink-3 rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const ACTING_SLIDES = [
  { src: actorStill1, caption: "Don't Look Up · 2021", credit: 'Mission Control' },
  { src: actorStill2, caption: "Don't Look Up · 2021", credit: 'Wide Shot · HUD' },
  { src: actorStill3, caption: "Don't Look Up · 2021", credit: 'Mid Cut · Headset' },
  { src: actorStill4, caption: "Don't Look Up · 2021", credit: 'Final Sequence' },
]

const SLIDE_DURATION = 4500

function ActingCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const total = ACTING_SLIDES.length

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), SLIDE_DURATION)
    return () => clearTimeout(t)
  }, [index, paused, total])

  // Track in-view so arrow keys only steal focus when the carousel is on-screen
  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Arrow-key navigation when carousel is in view
  useEffect(() => {
    if (!inView) return
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      // Don't hijack arrows when user is typing somewhere
      const target = e.target as HTMLElement
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return
      e.preventDefault()
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [inView, total])

  const slide = ACTING_SLIDES[index]

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-sm bg-ink-2" style={{ aspectRatio: '16 / 9' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slide.src}
            alt={slide.caption}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
          <span className="text-bone">{String(index + 1).padStart(2, '0')}</span>
          <span className="opacity-60"> / {String(total).padStart(2, '0')}</span>
        </div>

        {/* Click zones for prev/next, no chrome on top of image */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          className="absolute inset-y-0 left-0 w-1/3"
        />
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % total)}
          className="absolute inset-y-0 right-0 w-1/3"
        />
      </div>

      {/* Progress bars per slide */}
      <div className="mt-4 flex items-center gap-2">
        {ACTING_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="relative h-px flex-1 overflow-hidden cursor-pointer"
            style={{ background: 'var(--color-ink-3)' }}
          >
            {i < index && (
              <div className="absolute inset-y-0 left-0 w-full" style={{ background: 'var(--color-bone-faint, oklch(0.6 0.012 80))', opacity: 0.4 }} />
            )}
            {i === index && (
              <motion.div
                key={`fill-${i}-${index}-${paused ? 'p' : 'r'}`}
                className="absolute inset-y-0 left-0"
                style={{ background: 'var(--color-ember)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: paused ? 999 : SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Caption */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
          {slide.caption}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--color-ember)' }}>
          {slide.credit}
        </span>
      </div>
    </div>
  )
}
