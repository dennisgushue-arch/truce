import PackTile from './PackTile'

export default function PackGrid({ packs, onAction }) {
  return (
    <div className="pack-grid">
      {packs.map((pack) => (
        <PackTile key={pack.id} pack={pack} onAction={onAction} />
      ))}
    </div>
  )
}
