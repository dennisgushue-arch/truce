import { useState } from 'react'
import { packs } from './data/packs'
import PackGrid from './components/PackGrid'
import ActionPanel from './components/ActionPanel'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activePack, setActivePack] = useState(null)
  const [activeAction, setActiveAction] = useState(null)

  function handleAction(pack, action) {
    setActivePack(pack)
    setActiveAction(action)
  }

  function handleClose() {
    setActivePack(null)
    setActiveAction(null)
  }

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <header className="app-header">
        <div className="app-header-inner">
          <span className="app-logo">🕊️</span>
          <h1 className="app-title">TRUCE</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(d => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p className="app-subtitle">De-escalate together — pick a pack</p>
      </header>

      <main className="app-main">
        <PackGrid packs={packs} onAction={handleAction} />
      </main>

      {activePack && activeAction && (
        <ActionPanel
          pack={activePack}
          action={activeAction}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
