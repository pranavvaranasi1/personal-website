import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Pixel-art portrait of Pranav. 28 cols × 36 rows on a strict pixel grid.
 *
 * Each character in GRID maps to a color in PALETTE. '.' is transparent.
 * Rendered as <rect> elements; image-rendering: pixelated keeps edges sharp.
 *
 * Animation:
 *   idle: subtle breath bob
 *   blink: eye rows briefly swap to skin
 *   speak: mouth row alternates
 */

const W = 28
const H = 36

const PALETTE: Record<string, string> = {
  '.': 'transparent',
  A: '#0d0608', // hair darkest
  B: '#1c1014', // hair dark
  C: '#7a4527', // skin shadow
  D: '#a16744', // skin mid
  E: '#bd8462', // skin light
  F: '#3d1e15', // beard
  G: '#0a0408', // eye dark
  H: '#f4ecdc', // shirt
  I: '#cdaa56', // om gold
  J: '#10131c', // blazer dark
  K: '#1d2231', // blazer mid
  L: '#7a4530', // lip
  M: '#371410', // mouth interior
  N: '#dca080', // skin highlight
}

// 28 wide, 36 rows. Each row exactly 28 chars.
const BASE_GRID = [
  '............................', // 0
  '............................', // 1
  '............................', // 2
  '...........AAAAAA...........', // 3
  '.........AAAAAAAAAAA........', // 4
  '........AAABAAABAAAAA.......', // 5
  '.......AABAAAAAAAAAAAAA.....', // 6
  '......AAAAAAAAAAAAAAAAAA....', // 7
  '......AAAAAAAAAAAAAAAAAAA...', // 8
  '......AAAEEEEEEEEEEAAAAAA...', // 9   face starts
  '.....AAEEEEEEEEEEEEEAAAAAA..', // 10
  '....AAEEEEEEEEEEEEEEEEAAAA..', // 11
  '....AEEEEEEEEEEEEEEEEEAAA...', // 12
  '....AEEEGGEEEEEEEEGGEEEAA...', // 13  eyes
  '....AEEEGGEEEEEEEEGGEEEAA...', // 14
  '....EEEEEEEEEENEEEEEEEEAA...', // 15
  '....EEEEEEEEEDDEEEEEEEE.....', // 16  nose
  '.....EEEEEEEDDDEEEEEEE......', // 17
  '.....EEEEEEEDDEEEEEEE.......', // 18
  '......EELLLLLLLLLEEE........', // 19  upper lip
  '......EEMMMMMMMMMEE.........', // 20  smile
  '......EELLLLLLLLLEEE........', // 21  lower lip
  '......FFFEEEEEEEFFF.........', // 22  beard sides
  '.....FFFFFFFFFFFFFFF........', // 23  beard line
  '......FFFFEEEEEEFFF.........', // 24  chin
  '........EEEEEEEEEE..........', // 25  neck
  '.......EEEEEEEEEEEE.........', // 26  neck wider
  '......HHHEEEEEEEEHHH........', // 27  collar opens
  '......HHHHHIHHHHHHH.........', // 28  shirt + om
  '....JJHHHHHHHHHHHHHHJJ......', // 29  blazer V starts
  '...JJJKKHHHHHHHHHHHHKKJJJ...', // 30
  '..JJJJJKKKKHHHHHHKKKKJJJJJ..', // 31
  '.JJJJJJJJJKKKKKKKKJJJJJJJJJ.', // 32
  'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ', // 33
  'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ', // 34
  'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ', // 35
]

interface PixelProps {
  scale?: number
  mood?: 'idle' | 'speak' | 'listen' | 'wave'
  className?: string
}

export function PixelPranav({ scale = 8, mood = 'idle', className = '' }: PixelProps) {
  const [blink, setBlink] = useState(false)
  const [mouthFrame, setMouthFrame] = useState(0)

  useEffect(() => {
    let t: number
    const tick = () => {
      const next = 2800 + Math.random() * 4500
      t = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 130)
        tick()
      }, next)
    }
    tick()
    return () => window.clearTimeout(t)
  }, [])

  // Mouth animation when speaking
  useEffect(() => {
    if (mood !== 'speak') {
      setMouthFrame(0)
      return
    }
    const interval = window.setInterval(() => {
      setMouthFrame((f) => (f + 1) % 3)
    }, 160)
    return () => window.clearInterval(interval)
  }, [mood])

  // Apply animations to grid
  const grid = BASE_GRID.map((row, y) => {
    let r = row
    if (blink && (y === 13 || y === 14)) {
      // Replace eye dark with skin during blink
      r = r.split('').map((c) => (c === 'G' ? 'E' : c)).join('')
    }
    if (mood === 'speak' && (y === 19 || y === 20 || y === 21)) {
      if (mouthFrame === 0) r = r.replace(/L/g, 'L').replace(/M/g, 'M')
      if (mouthFrame === 1 && y === 20) r = r.replace(/M/g, 'L') // mouth closed
      if (mouthFrame === 2 && y === 19) r = r.replace(/L/g, 'M') // mouth wider open
    }
    if (mood === 'listen' && y === 20) {
      r = r.replace(/MMMMMMMMM/, 'MMMMMMMMM')
    }
    return r
  })

  return (
    <motion.div
      animate={mood === 'wave' ? { y: [0, -3, 0, -2, 0] } : { y: [0, -2, 0] }}
      transition={{
        duration: mood === 'wave' ? 1.2 : mood === 'speak' ? 1.6 : 3.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
      style={{ width: W * scale, height: H * scale, imageRendering: 'pixelated' }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        style={{ imageRendering: 'pixelated' }}
      >
        {grid.map((row, y) =>
          row.split('').map((ch, x) => {
            if (ch === '.') return null
            const fill = PALETTE[ch]
            if (!fill || fill === 'transparent') return null
            return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} shapeRendering="crispEdges" />
          })
        )}
      </svg>
    </motion.div>
  )
}
