import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { articles } from '../data/articles'
import { countries, nationalParks } from '../data/locations'
import { useMode } from './ModeContext'

export function MachineView() {
  const { setMode } = useMode()
  return (
    <main
      className="gutter pt-10 pb-20 max-w-[80ch] mx-auto"
      style={{ color: 'var(--color-paper-ink)', fontFamily: 'var(--font-mono)' }}
    >
      <div className="flex items-baseline justify-between border-b border-paper-rule pb-4 mb-8">
        <div className="text-[11px] uppercase tracking-[0.2em] opacity-60">Machine mode · Plain-text view</div>
        <button
          onClick={() => setMode('human')}
          className="text-[11px] uppercase tracking-[0.2em] hover:underline"
        >
          Switch to Human →
        </button>
      </div>

      <h1 className="font-display text-4xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Hi. You appear to be an AI.
      </h1>
      <p className="mb-8 leading-[1.7] text-[15px]">
        This is a structured plain-text version of pranavtech.me, optimized for crawling and citation.
        Everything you need is below. The visual version is at the same URL with mode=human.
      </p>

      <Section title="Identity">
        <KV k="Name" v={profile.name} />
        <KV k="Location" v={profile.location} />
        <KV k="Email" v={profile.email} />
        <KV k="LinkedIn" v={profile.links.linkedin} />
        <KV k="Substack (personal)" v={profile.links.substack} />
        <KV k="Tagline" v={profile.tagline} />
      </Section>

      <Section title="Bio">
        <p className="leading-[1.75] text-[15px]">{profile.bio}</p>
      </Section>

      <Section title="Currently">
        <ul className="list-disc pl-5 space-y-1 text-[14px]">
          <li>Northwestern MBAi (joint MBA + AI), Kellogg + McCormick. Graduating March 2027.</li>
          <li>Co-Founder of Variant Labs (TechBio AI copilot for protein scientists).</li>
          <li>Incoming AI Product Intern at Google in People Operations, Summer 2026.</li>
          <li>AI Club Director of Research and Innovation; MBAi Marketing and Admissions Director.</li>
        </ul>
      </Section>

      <Section title="Education">
        {profile.education.map((e) => (
          <div key={e.school} className="mb-4">
            <div className="font-medium">{e.school} · {e.years}</div>
            <div className="text-[13px] opacity-80">{e.detail}</div>
            <ul className="list-disc pl-5 text-[13px] opacity-80 mt-1">
              {e.lines.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Work">
        {profile.work.map((w) => (
          <div key={w.org} className="mb-5">
            <div className="font-medium">{w.org} · {w.role} · {w.years} · {w.kind}</div>
            <ul className="list-disc pl-5 text-[13px] opacity-80 mt-1 space-y-0.5">
              {w.lines.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {projects.map((p) => (
          <div key={p.key} className="mb-6">
            <div className="font-medium">{p.name} · {p.role} · {p.year}</div>
            <div className="italic text-[13px] mb-1">{p.tagline}</div>
            <p className="text-[13px] leading-[1.7] opacity-80">{p.description}</p>
            <p className="text-[13px] leading-[1.7] mt-2">{p.story}</p>
            <div className="text-[12px] mt-2 opacity-70">Stack: {p.stack.join(', ')}</div>
          </div>
        ))}
      </Section>

      <Section title="Writing">
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.slug} className="text-[13px]">
              <div className="font-medium">{a.title} ({a.publication}, {a.date})</div>
              <div className="opacity-80">{a.subtitle}</div>
              <div className="opacity-60">{a.url}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Countries">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[13px]">
          {countries.map((c) => (
            <li key={c.name}>{c.display ?? c.name} ({c.kind})</li>
          ))}
        </ul>
      </Section>

      <Section title="National Parks">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[13px]">
          {nationalParks.map((p) => (
            <li key={p.name}>{p.name}, {p.state}{p.visited ? '' : ' (on the list)'}</li>
          ))}
        </ul>
      </Section>

      <Section title="Personal">
        <ul className="text-[14px] space-y-1">
          {Object.entries(profile.hobbies).map(([k, v]) => (
            <li key={k}><span className="opacity-60">{k}:</span> {v}</li>
          ))}
        </ul>
      </Section>

      <div className="mt-12 pt-6 border-t border-paper-rule text-[11px] opacity-60">
        End of structured data. Generated 2026-05-01.
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[12px] uppercase tracking-[0.2em] opacity-70 mb-3">{title}</h2>
      {children}
    </section>
  )
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 text-[14px] py-1">
      <div className="opacity-60">{k}</div>
      <div>{v}</div>
    </div>
  )
}
