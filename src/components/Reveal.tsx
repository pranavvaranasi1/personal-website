import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'p' | 'h2' | 'h3'
}

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  )
}

interface SplitWordsProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function SplitWords({ text, className, delay = 0, stagger = 0.06 }: SplitWordsProps) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline" style={{ marginRight: '0.25em', verticalAlign: 'top' }} aria-hidden>
          <motion.span
            initial={reduce ? { opacity: 0 } : { y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: delay + i * stagger,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
