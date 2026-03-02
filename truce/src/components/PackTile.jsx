export default function PackTile({ pack, onAction }) {
  const buttons = [
    { key: 'reset',   label: '🫁 Reset'     },
    { key: 'say',     label: '🗣️ Say it'    },
    { key: 'rewrite', label: '📱 Rewrite'   },
    { key: 'next',    label: '➡️ Next Move' },
    { key: 'repair',  label: '🛠️ Repair'   },
  ]

  return (
    <article className="pack-tile" style={{ '--accent': pack.color }}>
      <div className="tile-header" style={{ background: pack.color }}>
        <span className="tile-emoji">{pack.emoji}</span>
        <div className="tile-header-text">
          <h2 className="tile-name">{pack.name}</h2>
          <p className="tile-tap-when">Tap when: {pack.tapWhen}</p>
        </div>
      </div>
      <div className="tile-body">
        <p className="tile-promise">🤝 {pack.promise}</p>
        <div className="tile-actions">
          {buttons.map(b => (
            <button
              key={b.key}
              className="action-btn"
              onClick={() => onAction(pack, b.key)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}
