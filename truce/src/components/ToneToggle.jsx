export default function ToneToggle({ mode, tone, setTone, publicMode, setPublicMode }) {
  if (mode === 'say') {
    return (
      <div className="tone-toggle">
        <div className="tone-row">
          {['soft', 'neutral', 'firm'].map((t) => (
            <button
              key={t}
              className={`tone-btn${tone === t ? ' active' : ''}`}
              onClick={() => setTone(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <label className="public-toggle">
          <input
            type="checkbox"
            checked={publicMode}
            onChange={(e) => setPublicMode(e.target.checked)}
          />
          <span className="public-label">Public Mode</span>
        </label>
      </div>
    )
  }
  if (mode === 'rewrite') {
    return (
      <div className="tone-toggle">
        <div className="tone-row">
          {['rewrite', 'boundary', 'short'].map((t) => (
            <button
              key={t}
              className={`tone-btn${tone === t ? ' active' : ''}`}
              onClick={() => setTone(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <label className="public-toggle">
          <input
            type="checkbox"
            checked={publicMode}
            onChange={(e) => setPublicMode(e.target.checked)}
          />
          <span className="public-label">Public Mode</span>
        </label>
      </div>
    )
  }
  return null
}
