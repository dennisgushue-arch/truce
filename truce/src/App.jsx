import { useState } from 'react'
import { packs } from './data/packs'
import PackGrid from './components/PackGrid'
import ActionPanel from './components/ActionPanel'
import HotMomentPanel from './components/HotMomentPanel'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activePack, setActivePack] = useState(null)
  const [activeAction, setActiveAction] = useState(null)
  const [hotMomentOpen, setHotMomentOpen] = useState(false)

  function handleAction(pack, action) {
    setActivePack(pack)
    setActiveAction(action)
  }

  function handleClose() {
    setActivePack(null)
    setActiveAction(null)
  }

  function handleHotMomentOpen() {
    setHotMomentOpen(true)
  }

  function handleHotMomentClose() {
    setHotMomentOpen(false)
  }

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <header className="app-header">
        <div className="app-header-inner">
          <span className="app-logo">🕊️</span>
          <h1 className="app-title">TRUCE</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p className="app-subtitle">De-escalate together — pick a pack</p>
        <button className="hot-moment-cta" onClick={handleHotMomentOpen}>
          ⚡ Hot Moment — I need help now
        </button>
      </header>

      <main className="app-main">
        <PackGrid packs={packs} onAction={handleAction} />
      </main>

      {activePack && activeAction && (
        <ActionPanel pack={activePack} action={activeAction} onClose={handleClose} />
      )}

      {hotMomentOpen && <HotMomentPanel packs={packs} onClose={handleHotMomentClose} />}
    </div>
  )
}
