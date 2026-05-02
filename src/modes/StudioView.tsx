import { profile, askPranavSystemPrompt } from '../data/profile'
import { projects } from '../data/projects'
import { articles } from '../data/articles'
import { countries, nationalParks } from '../data/locations'
import { useMode } from './ModeContext'
import { useState } from 'react'

const sourceTree = {
  'src/': {
    'pages/': ['Home.tsx', 'Projects.tsx', 'Writing.tsx', 'Travel.tsx', 'Ask.tsx'],
    'components/': ['Nav.tsx', 'Avatar.tsx', 'Reveal.tsx', 'ModeToggle.tsx', 'Footer.tsx'],
    'modes/': ['ModeContext.tsx', 'AgentView.tsx', 'StudioView.tsx'],
    'data/': ['profile.ts', 'projects.ts', 'articles.ts', 'locations.ts'],
  },
}

export function StudioView() {
  const { setMode } = useMode()
  const [tab, setTab] = useState<'prompt' | 'data' | 'tree' | 'why'>('why')

  return (
    <main className="gutter pt-10 md:pt-16 pb-24 max-w-[1100px] mx-auto">
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.24em] text-bone-faint">Studio mode · Behind the curtain</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl tracking-tight max-w-[18ch] text-balance leading-[0.96]">
          The <span style={{ color: 'var(--color-ember)' }}>machinery</span> of this site.
        </h1>
        <p className="mt-5 max-w-[58ch] text-bone-mute text-[17px] leading-[1.7]">
          A peek under the hood. The system prompt powering the digital twin, the data structures behind every page, the source tree, and the design rationale. Nothing here is secret.
        </p>
      </div>

      <div className="flex gap-1 border-b border-ink-3 mb-8 overflow-x-auto">
        {([
          { id: 'why', label: 'Why this site' },
          { id: 'prompt', label: 'System prompt' },
          { id: 'data', label: 'Data layer' },
          { id: 'tree', label: 'Source tree' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              'relative px-4 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors',
              tab === t.id ? 'text-bone' : 'text-bone-faint hover:text-bone',
            ].join(' ')}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--color-ember)' }} />
            )}
          </button>
        ))}
      </div>

      {tab === 'why' && (
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-5 text-[16px] leading-[1.75] text-bone-mute">
            <h2 className="font-display text-3xl text-bone tracking-tight">Thesis</h2>
            <p>
              Every essay I've written is about the line between AI and what's human. This site is an attempt to embody that tension instead of just talking about it.
            </p>
            <p>
              The default Human mode is photographic, editorial, slow. The Agent mode strips everything down to structured text for AI crawlers. The Studio mode (this one) shows you the wiring.
            </p>
            <p>
              Built with Claude. The system prompt is in the next tab. The avatar is hand-drawn SVG. The globe is d3-geo SVG with real continent geometry. The articles are inline so AI can actually read them, not just see link cards.
            </p>
          </div>

          <div className="space-y-5 text-[16px] leading-[1.75] text-bone-mute">
            <h2 className="font-display text-3xl text-bone tracking-tight">Stack</h2>
            <ul className="list-disc pl-5 space-y-1 text-[14px]">
              <li>Vite + React 19 + TypeScript</li>
              <li>Tailwind CSS v4 (OKLCH theme tokens)</li>
              <li>Framer Motion for component motion</li>
              <li>React Three Fiber + Three.js for the globe</li>
              <li>React Router v7 for navigation</li>
              <li>Anthropic API (Claude) for the digital twin</li>
              <li>Designed with the <a className="underline decoration-ember underline-offset-4" href="https://impeccable.style" target="_blank" rel="noreferrer">impeccable</a> design skill</li>
            </ul>

          </div>
        </div>
      )}

      {tab === 'prompt' && (
        <div>
          <pre className="font-mono text-[12px] leading-[1.7] text-bone-mute bg-ink-2 border border-ink-3 rounded-sm p-6 overflow-x-auto whitespace-pre-wrap">
{askPranavSystemPrompt}
          </pre>
        </div>
      )}

      {tab === 'data' && (
        <div className="space-y-10">
          <DataBlock
            title="profile"
            count={1}
            sample={{ name: profile.name, email: profile.email, work: profile.work.length + ' entries', education: profile.education.length + ' entries' }}
          />
          <DataBlock
            title="projects"
            count={projects.length}
            sample={projects.map((p) => ({ key: p.key, name: p.name, role: p.role, year: p.year }))}
          />
          <DataBlock
            title="articles"
            count={articles.length}
            sample={articles.map((a) => ({ slug: a.slug, title: a.title, publication: a.publication, date: a.date, words: a.body.split(' ').length }))}
          />
          <DataBlock
            title="countries"
            count={countries.length}
            sample={countries.map((c) => ({ name: c.display ?? c.name, kind: c.kind }))}
          />
          <DataBlock
            title="nationalParks"
            count={nationalParks.length}
            sample={nationalParks.map((p) => ({ name: p.name, state: p.state, visited: p.visited }))}
          />
        </div>
      )}

      {tab === 'tree' && (
        <pre className="font-mono text-[13px] leading-[1.8] text-bone-mute bg-ink-2 border border-ink-3 rounded-sm p-6">
{renderTree(sourceTree, 0)}
        </pre>
      )}

      <div className="mt-16 pt-8 border-t border-ink-3 flex items-center justify-between">
        <button
          onClick={() => setMode('human')}
          className="text-[12px] uppercase tracking-[0.2em] text-bone-faint hover:text-bone transition"
        >
          ← Back to Human mode
        </button>
        <span className="font-mono text-[11px] text-bone-faint">studio · {new Date().toISOString().slice(0, 10)}</span>
      </div>
    </main>
  )
}

function DataBlock({ title, count, sample }: { title: string; count: number; sample: unknown }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-display text-2xl text-bone tracking-tight">{title}</h3>
        <span className="font-mono text-[11px] text-bone-faint">{count} record{count === 1 ? '' : 's'}</span>
      </div>
      <pre className="font-mono text-[12px] leading-[1.7] text-bone-mute bg-ink-2 border border-ink-3 rounded-sm p-5 overflow-x-auto">
{JSON.stringify(sample, null, 2)}
      </pre>
    </div>
  )
}

function renderTree(tree: unknown, depth: number): string {
  const pad = '  '.repeat(depth)
  if (Array.isArray(tree)) {
    return tree.map((f) => `${pad}├── ${f}`).join('\n')
  }
  if (typeof tree === 'object' && tree !== null) {
    const entries = Object.entries(tree)
    return entries.map(([k, v]) => `${pad}${k}\n${renderTree(v, depth + 1)}`).join('\n')
  }
  return ''
}
