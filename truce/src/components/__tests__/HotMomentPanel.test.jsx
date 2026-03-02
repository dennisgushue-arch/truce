import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HotMomentPanel from '../HotMomentPanel'
import { packs } from '../../data/packs'

describe('HotMomentPanel', () => {
  it('updates neutral script when a new issue type is selected', async () => {
    const user = userEvent.setup()
    render(<HotMomentPanel packs={packs} onClose={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /👶 parenting & kids chaos/i }))

    expect(
      screen.getByText(/let's pick one approach for today and debrief later\./i)
    ).toBeInTheDocument()
  })

  it('supports copy interaction for the quick script', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    render(<HotMomentPanel packs={packs} onClose={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /copy/i }))

    expect(writeText).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument()
  })
})
