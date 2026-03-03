import { useEffect, useState } from 'react'
import { contextModes, contextPacks, contextRiskFlags } from './data/packs'
import PackGrid from './components/PackGrid'
import ActionPanel from './components/ActionPanel'
import HotMomentPanel from './components/HotMomentPanel'

const CONTEXT_STORAGE_KEY = 'truce-context-mode'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [contextMode, setContextMode] = useState('partner')
  const [activePack, setActivePack] = useState(null)
  const [activeAction, setActiveAction] = useState(null)
  const [hotMomentOpen, setHotMomentOpen] = useState(false)

  const activePacks = contextPacks[contextMode] ?? contextPacks.partner
  const activeRiskFlags = contextRiskFlags[contextMode]

  useEffect(() => {
    const stored = window.localStorage.getItem(CONTEXT_STORAGE_KEY)
    if (stored && contextPacks[stored]) {
      setContextMode(stored)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(CONTEXT_STORAGE_KEY, contextMode)
  }, [contextMode])

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

  function handleContextModeChange(nextMode) {
    setContextMode(nextMode)
    setActivePack(null)
    setActiveAction(null)
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
        <div className="context-chip-row" role="tablist" aria-label="Who is this with">
          {contextModes.map((mode) => (
            <button
              key={mode.id}
              className={`context-chip${contextMode === mode.id ? ' active' : ''}`}
              onClick={() => handleContextModeChange(mode.id)}
              role="tab"
              aria-selected={contextMode === mode.id}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <button className="hot-moment-cta" onClick={handleHotMomentOpen}>
          ⚡ Hot Moment — I need help now
        </button>
      </header>

      <main className="app-main">
        <PackGrid packs={activePacks} onAction={handleAction} />
      </main>

      {activePack && activeAction && (
        <ActionPanel
          pack={activePack}
          action={activeAction}
          riskFlags={activeRiskFlags}
          onClose={handleClose}
        />
      )}

      {hotMomentOpen && <HotMomentPanel packs={activePacks} onClose={handleHotMomentClose} />}
    </div>
  )
}
