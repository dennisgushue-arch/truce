const SAY_LABELS = {
  soft: 'Softer',
  direct: 'Direct',
  firm: 'Firm',
}

const REWRITE_LABELS = {
  calm: 'Calm',
  boundary: 'Boundary',
  short: 'Short',
}

export default function ToneToggle({ mode, tone, setTone }) {
  if (mode === 'say') {
    return (
      <div className="tone-toggle">
        <div className="tone-row">
          {['soft', 'direct', 'firm'].map((t) => (
            <button
              key={t}
              className={`tone-btn${tone === t ? ' active' : ''}`}
              onClick={() => setTone(t)}
            >
              {SAY_LABELS[t]}
            </button>
          ))}
        </div>
      </div>
    )
  }
  if (mode === 'rewrite') {
    return (
      <div className="tone-toggle">
        <div className="tone-row">
          {['calm', 'boundary', 'short'].map((t) => (
            <button
              key={t}
              className={`tone-btn${tone === t ? ' active' : ''}`}
              onClick={() => setTone(t)}
            >
              {REWRITE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>
    )
  }
  return null
}
