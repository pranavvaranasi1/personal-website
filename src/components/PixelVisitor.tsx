import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Pixel-art visitor character. Visitor picks one of these for the Ask Pranav
 * chat. 28x36 grid like PixelPranav so they pair visually at the counter.
 *
 * Char legend (per character grid):
 *   . = transparent
 *   A = hair dark
 *   B = hair light (highlight)
 *   E = skin mid
 *   N = skin highlight
 *   C = skin shadow
 *   G = eye dark
 *   L = lip
 *   M = mouth interior
 *   F = facial hair / shadow
 *   H = shirt
 *   J = outfit dark
 *   K = outfit light
 *   I = accent (glasses, accessory, hat band)
 */

const W = 28
const H = 36

export type CharacterId = 'long' | 'bald' | 'cap' | 'curly'

export interface CharacterDef {
  id: CharacterId
  label: string
  description: string
  /** color overrides per pixel char */
  palette: Record<string, string>
  grid: string[]
}

// Shared base for face + body (row 9 onward). Each character inserts their
// own hair on rows 0-12. Separating to keep this DRY-ish.
const FACE_AND_BODY: Record<number, string> = {
  9:  '......AAAEEEEEEEEEEAAAAAA...',
  10: '.....AAEEEEEEEEEEEEEAAAAAA..',
  11: '....AAEEEEEEEEEEEEEEEEAAAA..',
  12: '....AEEEEEEEEEEEEEEEEEAAA...',
  13: '....AEEEGGEEEEEEEEGGEEEAA...',
  14: '....AEEEGGEEEEEEEEGGEEEAA...',
  15: '....EEEEEEEEEENEEEEEEEEAA...',
  16: '....EEEEEEEEEDDEEEEEEEE.....',
  17: '.....EEEEEEEDDDEEEEEEE......',
  18: '.....EEEEEEEDDEEEEEEE.......',
  19: '......EELLLLLLLLLEEE........',
  20: '......EEMMMMMMMMMEE.........',
  21: '......EELLLLLLLLLEEE........',
  22: '......EEEEEEEEEEEEEE........',
  23: '......EEEEEEEEEEEEEE........',
  24: '.......EEEEEEEEEEEE.........',
  25: '........EEEEEEEEEE..........',
  26: '.......EEEEEEEEEEEE.........',
  27: '......HHHEEEEEEEEHHH........',
  28: '......HHHHHHHHHHHHH.........',
  29: '....JJHHHHHHHHHHHHHHJJ......',
  30: '...JJJKKHHHHHHHHHHHHKKJJJ...',
  31: '..JJJJJKKKKHHHHHHKKKKJJJJJ..',
  32: '.JJJJJJJJJKKKKKKKKJJJJJJJJJ.',
  33: 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ',
  34: 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ',
  35: 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ',
}

// Hair-only rows for each character (rows 0-8, plus optional row 9 override)
const HAIRS: Record<CharacterId, { rows: Record<number, string>; replaceFace?: Record<number, string> }> = {
  // long flowing hair past shoulders
  long: {
    rows: {
      2: '..........AAAAAAAA..........',
      3: '........AAAAAAAAAAAA........',
      4: '.......AAAAAAAAAAAAAA.......',
      5: '......AAAAAAAAAAAAAAAA......',
      6: '.....AAAAAAAAAAAAAAAAAA.....',
      7: '....AAAAAAAAAAAAAAAAAAAA....',
      8: '....AAAAAAAAAAAAAAAAAAAAA...',
    },
    replaceFace: {
      // hair flows down the sides past the face
      9:  '....AAAEEEEEEEEEEEEAAAAA....',
      10: '...AAAEEEEEEEEEEEEEEEAAAA...',
      11: '..AAEEEEEEEEEEEEEEEEEAAAA...',
      12: '..AAEEEEEEEEEEEEEEEEEAAAA...',
      13: '..AAEEEEGGEEEEEEEEGGEEAAAA..',
      14: '..AAEEEEGGEEEEEEEEGGEEAAAA..',
      15: '..AAEEEEEEEEEENEEEEEEEAAA...',
      16: '..AAEEEEEEEEEDDEEEEEEEE.....',
      17: '..AAEEEEEEEDDDEEEEEEEA......',
      18: '..AEEEEEEEEDDEEEEEEEE.......',
      22: '..AAEEEEEEEEEEEEEEAA........',
      23: '...AAEEEEEEEEEEEEAA.........',
    },
  },
  // bald + small mustache, refined look
  bald: {
    rows: {
      // a tiny shading on the dome
      8: '.......BBEEEEEEEEEEBB.......',
    },
    replaceFace: {
      9:  '......EEEEEEEEEEEEEEEEEE....', // top of head all skin
      10: '.....EEEEEEEEEEEEEEEEEEEE...',
      11: '....EEEEEEEEEEEEEEEEEEEEE...',
      12: '....EEEEEEEEEEEEEEEEEEEEE...',
      19: '......EELLLLLLLLLEEE........',
      20: '......EEMMMMMMMMMEE.........',
      21: '......EELLLLLLLLLEEE........',
      22: '......FFFEEEEEEEFFF.........', // little mustache
    },
  },
  // baseball cap forward
  cap: {
    rows: {
      4: '.........IIIIIIIIIIII.......',
      5: '........IIIIIIIIIIIIII......',
      6: '.......IIIIIIIIIIIIIIII.....',
      7: '......IIIIIIIIIIIIIIIIII....',
      8: '......IAAAAAAAAAAAAAAAII....', // cap brim shadow
    },
    replaceFace: {
      9:  '......AAAEEEEEEEEEEAAAAAA...',
    },
  },
  // shoulder-length curly hair, hoop earrings
  curly: {
    rows: {
      2: '..........AAABBAAAA.........',
      3: '........AABBAABBAABBA.......',
      4: '.......AABBAABBAABBAAB......',
      5: '......AABBAABBAABBAABBA.....',
      6: '.....AABBAABBAABBAABBAAB....',
      7: '....AABBAABBAABBAABBAABBA...',
      8: '....AABBAABBAABBAABBAABBA...',
    },
    replaceFace: {
      // hair frames the face on both sides
      9:  '....AAAEEEEEEEEEEAAAABBA....',
      10: '...AABBEEEEEEEEEEEEAAAAA....',
      11: '..AABEEEEEEEEEEEEEEEAAAA....',
      12: '..ABEEEEEEEEEEEEEEEEEABA....',
      // hoop earring on each side, lining up with the cheekbone
      13: '..AAEEIIEGGEEEEEEEEGGEIIEAA.',
      14: '..AAEEIIEGGEEEEEEEEGGEIIEAA.',
      15: '..AAEEEEEEEEEENEEEEEEEEAA...',
      16: '..AAEEEEEEEEDDEEEEEEEE......',
      17: '..AAEEEEEEEDDDEEEEEEEAA.....',
      18: '..AAEEEEEEEDDEEEEEEEEAA.....',
      // hair tips along jawline
      22: '..AAEEEEEEEEEEEEEEEEAAA.....',
      23: '...AAEEEEEEEEEEEEEEAA.......',
    },
  },
}

const PALETTE_DEFAULTS: Record<string, string> = {
  '.': 'transparent',
  E: '#bd8462',
  N: '#dca080',
  C: '#7a4527',
  D: '#a16744',
  G: '#0a0408',
  L: '#7a4530',
  M: '#371410',
  F: '#3d1e15',
  H: '#f4ecdc',
  A: '#1c1014',
  B: '#2e1a14',
  J: '#10131c',
  K: '#1d2231',
  I: '#cdaa56',
}

export const CHARACTERS: CharacterDef[] = [
  {
    id: 'long',
    label: 'The Writer',
    description: 'Long hair, red sweater. Always reading.',
    palette: {
      A: '#1f0f10', B: '#3d1f1f',
      E: '#e8c19a', N: '#f5d2ad', D: '#cfa280',
      H: '#f0eadd',
      J: '#7a1f24', K: '#a8323a',
    },
    grid: makeGrid('long'),
  },
  {
    id: 'bald',
    label: 'The Mentor',
    description: 'Bald, charcoal blazer. Asks the right questions.',
    palette: {
      A: 'transparent', B: '#724830',
      E: '#7a4f33', N: '#94633f', D: '#603c24', C: '#3d2718',
      F: '#2a1a10',
      H: '#e8dccb',
      J: '#1a1a22', K: '#2a2a35',
    },
    grid: makeGrid('bald'),
  },
  {
    id: 'cap',
    label: 'The Builder',
    description: 'Cap, gray tee. Probably has a side project.',
    palette: {
      A: '#1c1410', B: '#2e1f18',
      E: '#bd8462', N: '#dca080', D: '#a16744',
      H: '#a8a8b0',
      J: '#2a2d36', K: '#3d4148',
      I: '#cf3a3a', // cap red
    },
    grid: makeGrid('cap'),
  },
  {
    id: 'curly',
    label: 'The Friend',
    description: 'Curly hair, hoop earrings. Always knows the move.',
    palette: {
      A: '#1f1010', B: '#3d1c14',
      E: '#d4a47a', N: '#e6b890', D: '#b88160',
      L: '#a8323a',
      H: '#e8dccb',
      J: '#1f3a2a', K: '#2a5a3a',
      I: '#cdaa56', // gold hoop earring
    },
    grid: makeGrid('curly'),
  },
]

function makeGrid(id: CharacterId): string[] {
  const rows: string[] = []
  const hair = HAIRS[id]
  for (let y = 0; y < H; y++) {
    if (hair.rows[y]) {
      rows.push(hair.rows[y])
    } else if (hair.replaceFace?.[y]) {
      rows.push(hair.replaceFace[y])
    } else if (FACE_AND_BODY[y]) {
      rows.push(FACE_AND_BODY[y])
    } else {
      rows.push('.'.repeat(W))
    }
  }
  return rows
}

interface VisitorProps {
  character: CharacterId
  scale?: number
  mood?: 'idle' | 'speak' | 'listen' | 'wave'
  flip?: boolean
  className?: string
}

export function PixelVisitor({ character, scale = 8, mood = 'idle', flip = false, className = '' }: VisitorProps) {
  const def = CHARACTERS.find((c) => c.id === character) ?? CHARACTERS[0]
  const palette = { ...PALETTE_DEFAULTS, ...def.palette }

  const [blink, setBlink] = useState(false)
  const [mouthFrame, setMouthFrame] = useState(0)

  useEffect(() => {
    let t: number
    const tick = () => {
      const next = 3000 + Math.random() * 4500
      t = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 130)
        tick()
      }, next)
    }
    tick()
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (mood !== 'speak') {
      setMouthFrame(0)
      return
    }
    const interval = window.setInterval(() => setMouthFrame((f) => (f + 1) % 3), 160)
    return () => window.clearInterval(interval)
  }, [mood])

  const grid = def.grid.map((row, y) => {
    let r = row
    if (blink && (y === 13 || y === 14)) {
      r = r.split('').map((c) => (c === 'G' ? 'E' : c)).join('')
    }
    if (mood === 'speak' && y === 20 && mouthFrame === 1) {
      r = r.replace(/M/g, 'L')
    }
    return r
  })

  return (
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
      style={{
        width: W * scale,
        height: H * scale,
        imageRendering: 'pixelated',
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" shapeRendering="crispEdges">
        {grid.map((row, y) =>
          row.split('').map((ch, x) => {
            const fill = palette[ch]
            if (!fill || fill === 'transparent') return null
            return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
          })
        )}
      </svg>
    </motion.div>
  )
}
