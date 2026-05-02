import { motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { PixelPranav } from './PixelPranav'
import { PixelVisitor, type CharacterId } from './PixelVisitor'

interface CoffeeShopProps {
  visitorCharacter: CharacterId
  pranavMood: 'idle' | 'speak'
  visitorMood: 'idle' | 'speak'
  speaker: 'pranav' | 'visitor' | null
  speakerName: string
  line: string
  composer: ReactNode
  onChangeCharacter: () => void
}

/**
 * Coffee Talk-style scene. Pixel-art interior, two characters at the counter.
 * Desktop: dialogue floats inside the scene as an overlay (immersive).
 * Mobile: scene is taller, characters scale down, and the dialogue moves into
 * a full-width readable panel BELOW the scene so long replies aren't clipped.
 */
export function CoffeeShop({
  visitorCharacter,
  pranavMood,
  visitorMood,
  speaker,
  speakerName,
  line,
  composer,
  onChangeCharacter,
}: CoffeeShopProps) {
  // Detect mobile viewport (matches Tailwind's `sm` breakpoint at 640px)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const charScale = isMobile ? 3.5 : 6
  const speakerColor = speaker === 'pranav' ? 'oklch(0.62 0.18 150)' : 'oklch(0.78 0.012 80)'
  const speakerAccent = speaker === 'pranav' ? 'oklch(0.72 0.18 150)' : 'oklch(0.78 0.012 80)'

  return (
    <div className="relative w-full max-w-[1100px] mx-auto rounded-sm overflow-hidden border border-ink-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* Scene — taller on mobile, wide on tablet/desktop */}
      <div
        className="relative aspect-[5/4] sm:aspect-[16/9] w-full"
        style={{ background: '#1a0e0a' }}
      >
        <BackgroundScene />

        {/* Characters at the counter, lower 40% */}
        <div className="absolute inset-x-0 bottom-[18%] flex justify-around items-end px-[6%] sm:px-[8%] z-10 pointer-events-none">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="self-end"
          >
            <PixelVisitor character={visitorCharacter} scale={charScale} mood={visitorMood} />
          </motion.div>
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="self-end"
          >
            <PixelPranav scale={charScale} mood={pranavMood} />
          </motion.div>
        </div>

        {/* Desktop dialogue (floats inside scene) — sm and up only */}
        {line && (
          <motion.div
            key={`desktop-${line}`}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block absolute left-[5%] right-[5%] bottom-[3%] z-20"
          >
            <div
              className="relative px-5 py-4 rounded-sm border-2 backdrop-blur-md"
              style={{ background: 'rgba(8, 6, 12, 0.78)', borderColor: speakerColor }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] mb-1" style={{ color: speakerAccent }}>
                {speakerName}
              </div>
              <p className="text-[15px] md:text-[16px] leading-[1.55] text-bone">{line}</p>
              <div
                className="absolute -top-3 h-3 w-3"
                style={{
                  left: speaker === 'pranav' ? '70%' : '30%',
                  background: 'rgba(8, 6, 12, 0.78)',
                  borderTop: `2px solid ${speakerColor}`,
                  borderLeft: `2px solid ${speakerColor}`,
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Change-seat chrome */}
        <div className="absolute top-3 right-3 flex gap-2 z-30 pointer-events-auto">
          <button
            onClick={onChangeCharacter}
            className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-black/60 text-bone-mute hover:text-bone hover:bg-black/80 backdrop-blur transition-colors"
          >
            ⟲ Change seat
          </button>
        </div>
      </div>

      {/* Mobile dialogue panel — sits below the scene, full width, readable */}
      {line && (
        <motion.div
          key={`mobile-${line}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block sm:hidden border-t-2 px-5 py-4"
          style={{ background: 'rgba(8, 6, 12, 0.85)', borderColor: speakerColor }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] mb-1.5" style={{ color: speakerAccent }}>
            {speakerName}
          </div>
          <p className="text-[15.5px] leading-[1.6] text-bone">{line}</p>
        </motion.div>
      )}

      {/* Composer */}
      <div className="bg-ink-2/80 border-t border-ink-3 backdrop-blur">
        {composer}
      </div>
    </div>
  )
}

/** Pixel-art interior of a small coffee shop. SVG drawn at 320x180 native res. */
function BackgroundScene() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated' }}
    >
      <defs>
        <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d2a4f" />
          <stop offset="60%" stopColor="#1a1325" />
          <stop offset="100%" stopColor="#0d0612" />
        </linearGradient>
        <radialGradient id="lamp" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#ffd86b" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ffae3a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5577" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Wall base color */}
      <rect x="0" y="0" width="320" height="125" fill="#2a1813" />

      {/* Brick pattern */}
      <BrickWall />

      {/* Window on right with night sky */}
      <g>
        <rect x="220" y="18" width="86" height="72" fill="url(#windowGlow)" />
        <rect x="220" y="18" width="86" height="72" fill="none" stroke="#1a0d08" strokeWidth="2" />
        <rect x="262" y="18" width="2" height="72" fill="#1a0d08" />
        <rect x="220" y="52" width="86" height="2" fill="#1a0d08" />
        <rect x="232" y="28" width="1" height="1" fill="#fff" opacity="0.8" />
        <rect x="248" y="34" width="1" height="1" fill="#fff" opacity="0.6" />
        <rect x="278" y="26" width="1" height="1" fill="#fff" opacity="0.9" />
        <rect x="290" y="40" width="1" height="1" fill="#fff" opacity="0.7" />
        <circle cx="295" cy="32" r="3" fill="#f5e8c8" opacity="0.7" />
      </g>

      {/* Top shelf with jars */}
      <rect x="14" y="40" width="190" height="3" fill="#3d2418" />
      <rect x="14" y="42" width="190" height="1" fill="#1a0d08" opacity="0.6" />
      {[
        { x: 22, c: '#caa07a' },
        { x: 38, c: '#9a6a3d' },
        { x: 54, c: '#dfc89a' },
        { x: 70, c: '#7a4524' },
        { x: 86, c: '#a8845a' },
        { x: 102, c: '#643516' },
        { x: 118, c: '#c9a06a' },
        { x: 134, c: '#824a25' },
        { x: 150, c: '#b88560' },
        { x: 166, c: '#5a3014' },
        { x: 182, c: '#cda87a' },
      ].map((jar, i) => (
        <g key={i}>
          <rect x={jar.x} y="28" width="10" height="12" fill={jar.c} />
          <rect x={jar.x - 1} y="27" width="12" height="2" fill="#3d2418" />
          <rect x={jar.x + 2} y="32" width="3" height="6" fill="#fff" opacity="0.12" />
        </g>
      ))}

      {/* Mid shelf — books */}
      <rect x="14" y="62" width="190" height="3" fill="#3d2418" />
      {[
        { x: 18, w: 3, c: '#a8323a' },
        { x: 22, w: 3, c: '#1a3d68' },
        { x: 26, w: 4, c: '#2a5a3a' },
        { x: 31, w: 3, c: '#5b3a1a' },
        { x: 35, w: 3, c: '#7a1f24' },
        { x: 39, w: 4, c: '#1f1c2c' },
        { x: 44, w: 3, c: '#824a25' },
        { x: 48, w: 3, c: '#3a1f5e' },
        { x: 52, w: 3, c: '#643516' },
        { x: 56, w: 4, c: '#0f0f0f' },
        { x: 61, w: 3, c: '#a8845a' },
        { x: 65, w: 3, c: '#1a3d68' },
        { x: 69, w: 4, c: '#7a4524' },
        { x: 74, w: 3, c: '#a8323a' },
        { x: 78, w: 3, c: '#2a5a3a' },
        { x: 82, w: 3, c: '#5b3a1a' },
        { x: 86, w: 4, c: '#1f1c2c' },
        { x: 91, w: 3, c: '#7a1f24' },
        { x: 95, w: 3, c: '#3a1f5e' },
        { x: 99, w: 3, c: '#643516' },
        { x: 103, w: 4, c: '#0f0f0f' },
        { x: 108, w: 3, c: '#a8845a' },
        { x: 112, w: 3, c: '#a8323a' },
        { x: 116, w: 3, c: '#1a3d68' },
        { x: 120, w: 4, c: '#2a5a3a' },
      ].map((b, i) => (
        <rect key={i} x={b.x} y="50" width={b.w} height="12" fill={b.c} />
      ))}
      <rect x="135" y="48" width="14" height="14" fill="#5b3a1a" />
      <rect x="138" y="51" width="8" height="2" fill="#cdaa56" />
      <rect x="138" y="54" width="8" height="1" fill="#cdaa56" opacity="0.5" />
      <rect x="155" y="50" width="20" height="3" fill="#a8323a" />
      <rect x="156" y="53" width="20" height="3" fill="#1a3d68" />
      <rect x="155" y="56" width="20" height="3" fill="#5b3a1a" />
      <rect x="157" y="59" width="20" height="3" fill="#2a5a3a" />

      {/* Neon "OPEN" sign */}
      <g>
        <rect x="232" y="60" width="62" height="22" fill="url(#neonGlow)" />
        <rect x="240" y="62" width="46" height="18" fill="#0a0408" />
        <rect x="240" y="62" width="46" height="18" fill="none" stroke="#ff5577" strokeWidth="0.8" opacity="0.9" />
        <g fill="#ff5577">
          <rect x="244" y="66" width="1" height="10" />
          <rect x="245" y="66" width="6" height="1" />
          <rect x="245" y="75" width="6" height="1" />
          <rect x="251" y="66" width="1" height="10" />

          <rect x="254" y="66" width="1" height="10" />
          <rect x="255" y="66" width="6" height="1" />
          <rect x="255" y="71" width="5" height="1" />
          <rect x="261" y="66" width="1" height="6" />

          <rect x="264" y="66" width="1" height="10" />
          <rect x="265" y="66" width="6" height="1" />
          <rect x="265" y="71" width="5" height="1" />
          <rect x="265" y="75" width="6" height="1" />

          <rect x="274" y="66" width="1" height="10" />
          <rect x="275" y="74" width="1" height="2" />
          <rect x="276" y="72" width="1" height="2" />
          <rect x="277" y="70" width="1" height="2" />
          <rect x="278" y="68" width="1" height="2" />
          <rect x="279" y="66" width="1" height="10" />
        </g>
      </g>

      {/* Hanging lamp */}
      <g>
        <rect x="159" y="0" width="2" height="80" fill="#1a0d08" />
        <ellipse cx="160" cy="86" rx="14" ry="6" fill="#3d2418" />
        <rect x="148" y="80" width="24" height="6" fill="#5b3a1a" />
        <rect x="150" y="82" width="20" height="2" fill="#ffd86b" opacity="0.9" />
        <ellipse cx="160" cy="92" rx="44" ry="22" fill="url(#lamp)" />
      </g>

      {/* Hanging plant */}
      <g>
        <rect x="34" y="0" width="2" height="20" fill="#1a0d08" />
        <rect x="28" y="20" width="14" height="6" fill="#3d2418" />
        <ellipse cx="22" cy="32" rx="8" ry="5" fill="#3a5a2a" />
        <ellipse cx="48" cy="34" rx="9" ry="6" fill="#2a4a1f" />
        <ellipse cx="35" cy="38" rx="10" ry="5" fill="#3a5a2a" />
      </g>

      {/* Wall sconce */}
      <g>
        <rect x="200" y="92" width="3" height="10" fill="#3d2418" />
        <rect x="198" y="98" width="7" height="2" fill="#ffd86b" />
      </g>

      {/* Counter */}
      <rect x="0" y="125" width="320" height="55" fill="#2a160c" />
      <rect x="0" y="125" width="320" height="2" fill="#5b3416" />
      <rect x="0" y="127" width="320" height="1" fill="#7a4524" opacity="0.7" />
      {Array.from({ length: 18 }, (_, i) => (
        <rect
          key={i}
          x={Math.floor((i * 320) / 18)}
          y={132 + (i % 4) * 9}
          width={26 + (i % 5) * 6}
          height="1"
          fill="#1a0d08"
          opacity="0.5"
        />
      ))}
      <rect x="0" y="125" width="320" height="60" fill="url(#counterShadow)" opacity="0.3" />

      {/* visitor's cup */}
      <g transform="translate(70, 130)">
        <rect x="0" y="6" width="14" height="10" fill="#e8dccb" />
        <rect x="14" y="9" width="3" height="5" fill="#e8dccb" />
        <rect x="14" y="9" width="2" height="5" fill="#3d2418" opacity="0.4" />
        <rect x="2" y="3" width="10" height="3" fill="#3d2218" />
        <rect x="4" y="-2" width="1" height="2" fill="#fff" opacity="0.4" />
        <rect x="8" y="-4" width="1" height="2" fill="#fff" opacity="0.3" />
      </g>

      {/* pranav's cup */}
      <g transform="translate(228, 132)">
        <rect x="0" y="6" width="14" height="10" fill="#1a0d08" />
        <rect x="2" y="8" width="10" height="2" fill="#5b3416" />
        <rect x="14" y="9" width="3" height="5" fill="#1a0d08" />
        <rect x="2" y="3" width="10" height="3" fill="#3d2218" />
        <rect x="4" y="-1" width="1" height="2" fill="#fff" opacity="0.35" />
        <rect x="9" y="-3" width="1" height="2" fill="#fff" opacity="0.25" />
      </g>

      {/* phone */}
      <g transform="translate(46, 144)">
        <rect x="0" y="0" width="18" height="10" fill="#0a0408" rx="1" />
        <rect x="2" y="2" width="14" height="6" fill="#1d2231" />
        <rect x="3" y="3" width="2" height="1" fill="#cdaa56" />
      </g>

      {/* notebook */}
      <g transform="translate(254, 142)">
        <rect x="0" y="0" width="22" height="12" fill="#5b3a1a" />
        <rect x="0" y="0" width="22" height="2" fill="#824a25" />
        {[0, 4, 8, 12, 16, 20].map((dx) => (
          <rect key={dx} x={dx + 1} y="0" width="1" height="2" fill="#cdaa56" />
        ))}
      </g>

      <rect x="0" y="0" width="320" height="180" fill="url(#vignette)" />
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="80%">
          <stop offset="60%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.5" />
        </radialGradient>
        <linearGradient id="counterShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0.4" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function BrickWall() {
  const bricks: ReactNode[] = []
  const brickW = 16
  const brickH = 6
  const palette = ['#3d2218', '#4a2a1c', '#2e190f', '#5a3221', '#3d2218']
  let key = 0
  for (let row = 0; row < 22; row++) {
    const y = row * brickH
    if (y > 120) break
    const offset = row % 2 === 0 ? 0 : brickW / 2
    for (let col = 0; col < 24; col++) {
      const x = col * brickW + offset - brickW / 2
      if (x + brickW > 218 && x < 308 && y + brickH > 18 && y < 92) continue
      const c = palette[(row * 7 + col * 3) % palette.length]
      bricks.push(<rect key={key++} x={x} y={y} width={brickW - 1} height={brickH - 1} fill={c} />)
      bricks.push(<rect key={key++} x={x} y={y + brickH - 1} width={brickW} height={1} fill="#160a06" />)
    }
  }
  return <g>{bricks}</g>
}
