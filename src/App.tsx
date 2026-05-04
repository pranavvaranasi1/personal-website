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
import { MachineView } from './modes/MachineView'

function ModeAwareApp() {
  const { mode } = useMode()

  if (mode === 'machine') {
    return (
      <div className="min-h-screen grain">
        <MachineView />
      </div>
    )
  }

  // Human mode (default). Agent button on the toggle just routes to /ask
  // within this same layout, so it shows the Ask Pranav page with the
  // regular nav and footer around it.
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
