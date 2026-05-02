import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModeProvider, useMode } from './modes/ModeContext'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { AskPill } from './components/AskPill'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Writing } from './pages/Writing'
import { Travel } from './pages/Travel'
import { Ask } from './pages/Ask'
import { Books } from './pages/Books'
import { AgentView } from './modes/AgentView'
import { StudioView } from './modes/StudioView'

function ModeAwareApp() {
  const { mode } = useMode()

  if (mode === 'agent') {
    return (
      <div className="min-h-screen grain">
        <AgentView />
      </div>
    )
  }

  if (mode === 'studio') {
    return (
      <div className="min-h-screen grain">
        <Nav />
        <StudioView />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen grain">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/books" element={<Books />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
      <Footer />
      <AskPill />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ModeProvider>
        <ModeAwareApp />
      </ModeProvider>
    </BrowserRouter>
  )
}
