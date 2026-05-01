import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="gutter mt-32 pb-12 border-t border-ink-3 pt-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="font-display text-3xl md:text-4xl tracking-tight max-w-md text-balance">
          Want to talk?
        </div>
        <div className="flex flex-col gap-1 text-sm text-bone-mute">
          <a className="hover:text-bone transition" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="hover:text-bone transition" href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:text-bone transition" href={profile.links.substack} target="_blank" rel="noreferrer">
            Substack
          </a>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-ink-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-bone-faint">
        <span>{profile.location}</span>
        <span>built by hand · {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
