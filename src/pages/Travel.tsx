import { useState, useMemo, useRef, useEffect } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { geoOrthographic, geoPath, geoGraticule10, geoCentroid } from 'd3-geo'
import { feature } from 'topojson-client'
// world-atlas ships TopoJSON for country boundaries
import countriesTopo from 'world-atlas/countries-110m.json'
import { countries, nationalParks, type Country, type NationalPark } from '../data/locations'
import { Reveal } from '../components/Reveal'

// Resolve TopoJSON → GeoJSON FeatureCollection of countries
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const countriesFC: any = feature(countriesTopo as any, (countriesTopo as any).objects.countries)

const countryByName = new Map<string, Country>(countries.map((c) => [c.name, c]))

// Fill colors per country kind
const COUNTRY_FILL: Record<CountryKind | 'none', string> = {
  lived: 'oklch(0.66 0.18 150)',
  visited: 'oklch(0.50 0.14 150)',
  wanted: 'oklch(0.36 0.014 280)',
  none: 'oklch(0.26 0.014 280)',
}

const COUNTRY_STROKE: Record<CountryKind | 'none', string> = {
  lived: 'oklch(0.78 0.16 150)',
  visited: 'oklch(0.62 0.14 150)',
  wanted: 'oklch(0.48 0.012 80)',
  none: 'oklch(0.40 0.014 280)',
}

type CountryKind = 'lived' | 'visited' | 'wanted'
type Selection =
  | { type: 'country'; country: Country }
  | { type: 'park'; park: NationalPark }
  | null

export function Travel() {
  const [active, setActive] = useState<Selection>(null)

  return (
    <>
      <header className="gutter pt-10 md:pt-16 pb-10">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint">Travel · The map</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-5xl md:text-8xl tracking-tight max-w-[16ch] text-balance leading-[0.96]">
            Where I've been on <span style={{ color: 'var(--color-ember)' }}>this rock.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[58ch] text-bone-mute text-[17px] leading-[1.7]">
            Drag to spin the globe. Filled countries are places I've been. The dots are US National Parks I've made it to.
          </p>
        </Reveal>
      </header>

      <section className="gutter pb-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          <Globe active={active} setActive={setActive} />
        </div>

        <aside className="md:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint mb-4">
            Countries · {countries.length}
          </div>
          <ul className="divide-y divide-ink-3 mb-8">
            {countries.map((c) => (
              <li key={c.name}>
                <button
                  onClick={() => setActive({ type: 'country', country: c })}
                  className={[
                    'w-full text-left py-3 flex items-center gap-3 transition-colors',
                    active?.type === 'country' && active.country.name === c.name
                      ? 'text-bone'
                      : 'text-bone-mute hover:text-bone',
                  ].join(' ')}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{
                      background: c.kind === 'wanted' ? 'transparent' : COUNTRY_STROKE[c.kind],
                      border: c.kind === 'wanted' ? `1px solid ${COUNTRY_STROKE.wanted}` : 'none',
                    }}
                  />
                  <span className="text-[15px]">{c.display ?? c.name}</span>
                  <span className="ml-auto font-mono text-[10px] tracking-[0.18em] uppercase text-bone-faint">
                    {c.kind}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint mb-4">
            National Parks · {nationalParks.filter((p) => p.visited).length} / 63
          </div>
          <ul className="divide-y divide-ink-3">
            {nationalParks.map((p) => (
              <li key={p.name}>
                <button
                  onClick={() => setActive({ type: 'park', park: p })}
                  className={[
                    'w-full text-left py-3 flex items-center gap-3 transition-colors',
                    active?.type === 'park' && active.park.name === p.name
                      ? 'text-bone'
                      : 'text-bone-mute hover:text-bone',
                  ].join(' ')}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                    <polygon
                      points="5,0.6 6.4,3.7 9.7,4 7.2,6.2 8,9.4 5,7.7 2,9.4 2.8,6.2 0.3,4 3.6,3.7"
                      fill={p.visited ? 'var(--color-ember)' : 'none'}
                      stroke="var(--color-ember)"
                      strokeWidth="0.8"
                    />
                  </svg>
                  <span className="text-[15px]">{p.name}</span>
                  <span className="ml-auto font-mono text-[10px] tracking-[0.18em] uppercase text-bone-faint">
                    {p.state}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  )
}

interface GlobeProps {
  active: Selection
  setActive: (s: Selection) => void
}

function Globe({ active, setActive }: GlobeProps) {
  // Initial view centered on the Atlantic so both Americas and Europe/Africa show
  const [rotation, setRotation] = useState<[number, number]>([20, -20])
  const [dragging, setDragging] = useState(false)
  const [size, setSize] = useState(640)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 })
  const lastMoveTime = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      setSize(Math.min(w, 760))
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Idle slow rotation when not dragging and nothing selected
  useEffect(() => {
    if (dragging || active) return
    let raf: number
    const tick = () => {
      setRotation(([x, y]) => [x + 0.06, y])
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [dragging, active])

  // Spin to selected country/park
  useEffect(() => {
    if (!active) return
    if (active.type === 'park') {
      setRotation([-active.park.lon, -active.park.lat])
      return
    }
    // For a country, use its centroid
    const feat = countriesFC.features.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (f: any) => f.properties.name === active.country.name
    )
    if (feat) {
      const [lon, lat] = geoCentroid(feat)
      setRotation([-lon, -lat])
    }
  }, [active])

  const projection = useMemo(() => {
    return geoOrthographic()
      .scale(size / 2 - 10)
      .translate([size / 2, size / 2])
      .clipAngle(90)
      .rotate([rotation[0], rotation[1], 0])
  }, [rotation, size])

  const pathGen = useMemo(() => geoPath(projection), [projection])
  const graticulePath = useMemo(() => pathGen(geoGraticule10()) || '', [pathGen])

  // Pre-compute country paths & their fill kind
  type CountryPath = {
    name: string
    d: string
    kind: CountryKind | 'none'
    country: Country | undefined
  }
  const countryPaths = useMemo<CountryPath[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return countriesFC.features.map((f: any): CountryPath => {
      const c = countryByName.get(f.properties.name)
      return {
        name: f.properties.name as string,
        d: pathGen(f) || '',
        kind: (c?.kind ?? 'none') as CountryKind | 'none',
        country: c,
      }
    })
  }, [pathGen])

  // Park dots — only render if on near hemisphere
  const parkProjections = useMemo(() => {
    return nationalParks
      .map((p) => {
        const projected = projection([p.lon, p.lat])
        return projected ? { park: p, x: projected[0], y: projected[1] } : null
      })
      .filter((x): x is { park: NationalPark; x: number; y: number } => x !== null)
  }, [projection])

  const handlePointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    setDragging(true)
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation[0],
      rotY: rotation[1],
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging) return
    const now = performance.now()
    if (now - lastMoveTime.current < 12) return
    lastMoveTime.current = now
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setRotation([
      dragStart.current.rotX + dx * 0.5,
      Math.max(-80, Math.min(80, dragStart.current.rotY - dy * 0.5)),
    ])
  }
  const handlePointerUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    setDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  // Tooltip content
  let tip: { title: string; sub: string; note?: string } | null = null
  if (active?.type === 'country') {
    tip = {
      title: active.country.display ?? active.country.name,
      sub: active.country.kind === 'lived' ? 'Lived here' : active.country.kind === 'visited' ? 'Visited' : 'On the list',
      note: active.country.note,
    }
  } else if (active?.type === 'park') {
    tip = {
      title: active.park.name,
      sub: `${active.park.state} · National Park`,
      note: active.park.note,
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-square rounded-sm border border-ink-3 bg-ink/40 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="block w-full h-full select-none"
        style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          <radialGradient id="globe-bg" cx="35%" cy="32%" r="78%">
            <stop offset="0%" stopColor="oklch(0.20 0.014 280)" />
            <stop offset="65%" stopColor="oklch(0.14 0.012 280)" />
            <stop offset="100%" stopColor="oklch(0.10 0.010 280)" />
          </radialGradient>
          <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="oklch(0.72 0.18 150 / 0)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 150 / 0.18)" />
          </radialGradient>
          <filter id="park-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Globe disc */}
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 10} fill="url(#globe-bg)" />

        {/* Graticule */}
        <path
          d={graticulePath}
          fill="none"
          stroke="oklch(0.24 0.014 280)"
          strokeWidth={0.4}
          strokeOpacity={0.7}
        />

        {/* Country paths — fill by kind */}
        {countryPaths.map(({ name, d, kind, country }) => {
          if (!d) return null
          const isActive = active?.type === 'country' && active.country.name === name
          const fill = kind === 'wanted' ? 'transparent' : COUNTRY_FILL[kind]
          const stroke = COUNTRY_STROKE[kind]
          const isInteractive = !!country
          return (
            <path
              key={name}
              d={d}
              fill={isActive ? COUNTRY_FILL.lived : fill}
              stroke={stroke}
              strokeWidth={isActive ? 1 : 0.4}
              strokeLinejoin="round"
              style={{
                cursor: isInteractive ? 'pointer' : 'default',
                strokeDasharray: kind === 'wanted' ? '2 2' : 'none',
                pointerEvents: isInteractive ? 'auto' : 'none',
              }}
              onPointerDown={(e) => {
                if (!country) return
                e.stopPropagation()
                setActive({ type: 'country', country })
              }}
            />
          )
        })}

        {/* Outer rim */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="url(#globe-rim)"
          pointerEvents="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="none"
          stroke="oklch(0.40 0.014 280)"
          strokeWidth={1}
          pointerEvents="none"
        />

        {/* National park markers (front-hemisphere only) */}
        {parkProjections.map(({ park, x, y }) => {
          const isActive = active?.type === 'park' && active.park.name === park.name
          return (
            <g
              key={park.name}
              style={{ cursor: 'pointer' }}
              onPointerDown={(e) => {
                e.stopPropagation()
                setActive({ type: 'park', park })
              }}
            >
              {isActive && (
                <circle cx={x} cy={y} r={6} fill="none" stroke="var(--color-ember)" strokeWidth={1.4}>
                  <animate attributeName="r" from="4" to="16" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Star marker for national parks */}
              <polygon
                points={starPoints(x, y, isActive ? 6 : 4.5, isActive ? 2.4 : 1.8)}
                fill="var(--color-ember)"
                stroke="oklch(0.96 0.008 80)"
                strokeWidth={0.5}
                filter="url(#park-glow)"
              />
              {isActive && (
                <text
                  x={x + 10}
                  y={y + 4}
                  fontFamily="JetBrains Mono, ui-monospace, monospace"
                  fontSize={11}
                  letterSpacing="0.18em"
                  fill="oklch(0.96 0.008 80)"
                  style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
                >
                  {park.name}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {tip && (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-md p-5 rounded-sm border border-ink-3 bg-ink/95 backdrop-blur"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-3 right-3 text-bone-faint hover:text-bone text-[11px] font-mono tracking-[0.2em] uppercase"
            >
              ✕
            </button>
            <h3 className="font-display text-2xl pr-6">{tip.title}</h3>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-bone-faint">{tip.sub}</div>
            {tip.note && (
              <p className="mt-3 text-[15px] leading-[1.65] text-bone-mute">{tip.note}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 right-5 flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-bone-faint font-mono pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="h-2 w-3 rounded-sm" style={{ background: COUNTRY_FILL.lived }} />
          lived
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-3 rounded-sm" style={{ background: COUNTRY_FILL.visited }} />
          visited
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-3 rounded-sm border" style={{ borderColor: COUNTRY_STROKE.wanted, borderStyle: 'dashed' }} />
          wanted
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-ink-3 mt-1">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon
              points="5,0.6 6.4,3.7 9.7,4 7.2,6.2 8,9.4 5,7.7 2,9.4 2.8,6.2 0.3,4 3.6,3.7"
              fill="var(--color-ember)"
            />
          </svg>
          park
        </div>
      </div>

      {/* Rotation read-out */}
      <div className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.24em] text-bone-faint pointer-events-none">
        ROT [{rotation[0].toFixed(0).padStart(4, ' ')}°, {rotation[1].toFixed(0).padStart(3, ' ')}°]
      </div>
    </div>
  )
}

/** 5-point star polygon — given a center, outer radius, and inner radius. */
function starPoints(cx: number, cy: number, ro: number, ri: number): string {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? ro : ri
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`)
  }
  return pts.join(' ')
}
