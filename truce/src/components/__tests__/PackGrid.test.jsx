import { render, screen } from '@testing-library/react'
import PackGrid from '../PackGrid'
import { packs } from '../../data/packs'

describe('PackGrid', () => {
  it('renders all packs from data', () => {
    render(<PackGrid packs={packs} onAction={vi.fn()} />)

    expect(screen.getAllByRole('article')).toHaveLength(packs.length)
    packs.forEach((pack) => {
      expect(screen.getByText(pack.name)).toBeInTheDocument()
    })
  })
})
