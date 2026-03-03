import { useState, useEffect, useRef } from 'react'
import ToneToggle from './ToneToggle'
import ResetTimer from './ResetTimer'
import { relationshipModes } from '../data/packs'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        setCopied(false)
        alert('Copy failed — please select and copy the text manually.')
      })
  }
  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  )
}

const ACTION_META = {
  reset: { title: '🫁 90-Second Reset', hasTone: false },
  say: { title: '🗣️ Say It', hasTone: true },
  rewrite: { title: '📱 Text Rewrite', hasTone: true },
  next: { title: '➡️ Next Moves', hasTone: false },
  repair: { title: '🛠️ Repair Scripts', hasTone: false },
}

export default function ActionPanel({ pack, action, riskFlags, onClose }) {
  const [tone, setTone] = useState('direct')
  const [relationshipMode, setRelationshipMode] = useState('problemSolve')
  const overlayRef = useRef(null)

  useEffect(() => {
    setTone(action === 'rewrite' ? 'calm' : 'direct')
    setRelationshipMode('problemSolve')
  }, [action, pack])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  const meta = ACTION_META[action] || {}

  function renderContent() {
    if (action === 'reset') {
      return <ResetTimer reset={pack.reset} color={pack.color} />
    }

    if (action === 'say') {
      const goalScript = pack.goalScripts?.[relationshipMode]?.[tone]
      const script = goalScript ?? pack.scripts[tone] ?? pack.scripts.direct
      return (
        <div className="panel-content">
          <p className="script-text">"{script}"</p>
          <CopyBtn text={script} />
        </div>
      )
    }

    if (action === 'rewrite') {
      const text = pack.textShield[tone] ?? pack.textShield.calm
      return (
        <div className="panel-content">
          <p className="script-text">"{text}"</p>
          <CopyBtn text={text} />
          {riskFlags && (
            <div className="risk-flag-box">
              <p className="risk-flag-title">⚠️ Hot words to avoid</p>
              <p className="risk-flag-list">{riskFlags.hotWords.slice(0, 6).join(', ')}</p>
            </div>
          )}
        </div>
      )
    }

    if (action === 'next') {
      return (
        <ol className="next-moves-list">
          {pack.nextMoves.map((move, i) => (
            <li key={i}>{move}</li>
          ))}
        </ol>
      )
    }

    if (action === 'repair') {
      return (
        <div className="repair-list">
          {pack.repair.map((r, i) => (
            <div key={i} className="repair-item">
              <p>"{r}"</p>
              <CopyBtn text={r} />
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <div
      className="panel-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title-id"
    >
      <div className="panel-sheet" style={{ '--accent': pack.color }}>
        <div className="panel-header" style={{ background: pack.color }}>
          <span className="panel-pack-name">
            {pack.emoji} {pack.name}
          </span>
          <button className="panel-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="panel-body">
          <h2 id="panel-title-id" className="panel-title">
            {meta.title}
          </h2>
          {meta.hasTone && <ToneToggle mode={action} tone={tone} setTone={setTone} />}
          {action === 'say' && (
            <div className="goal-toggle">
              <p className="goal-toggle-title">Relationship Mode</p>
              <div className="goal-toggle-row">
                {relationshipModes.map((mode) => (
                  <button
                    key={mode.id}
                    className={`goal-btn${relationshipMode === mode.id ? ' active' : ''}`}
                    onClick={() => setRelationshipMode(mode.id)}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
