import { useEffect, useRef, useState } from 'react'
import ResetTimer from './ResetTimer'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
      alert('Copy failed — please select and copy the text manually.')
    }
  }

  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  )
}

export default function HotMomentPanel({ packs, onClose }) {
  const overlayRef = useRef(null)
  const [selectedPackId, setSelectedPackId] = useState(packs[0]?.id ?? null)

  const selectedPack = packs.find((pack) => pack.id === selectedPackId) ?? packs[0]

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleOverlayClick(event) {
    if (event.target === overlayRef.current) onClose()
  }

  return (
    <div
      className="panel-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hot-moment-title-id"
    >
      <div className="hot-moment-sheet" style={{ '--accent': selectedPack.color }}>
        <div className="hot-moment-header">
          <h2 id="hot-moment-title-id" className="hot-moment-title">
            ⚡ Hot Moment Quick Flow
          </h2>
          <button className="panel-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="hot-moment-body">
          <div className="hot-moment-step">
            <p className="hot-moment-step-title">1) Reset your nervous system (90s)</p>
            <ResetTimer reset={selectedPack.reset} color={selectedPack.color} />
          </div>

          <div className="hot-moment-step">
            <p className="hot-moment-step-title">2) Pick the closest issue type</p>
            <div className="hot-pack-grid">
              {packs.map((pack) => (
                <button
                  key={pack.id}
                  className={`hot-pack-btn${selectedPack.id === pack.id ? ' active' : ''}`}
                  onClick={() => setSelectedPackId(pack.id)}
                >
                  {pack.emoji} {pack.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hot-moment-step hot-script">
            <p className="hot-moment-step-title">3) Use this neutral script now</p>
            <p className="script-text">"{selectedPack.scripts.neutral}"</p>
            <CopyBtn text={selectedPack.scripts.neutral} />
          </div>
        </div>
      </div>
    </div>
  )
}
