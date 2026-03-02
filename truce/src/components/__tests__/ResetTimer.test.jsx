import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetTimer from '../ResetTimer'

describe('ResetTimer', () => {
  it('starts and stops the timer flow', async () => {
    const user = userEvent.setup()
    render(<ResetTimer reset="Take a breath" color="#2a9d8f" />)

    expect(screen.getByText(/tap start/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /start 90-sec reset/i }))

    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /stop/i }))

    expect(screen.queryByRole('button', { name: /stop/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start 90-sec reset/i })).toBeInTheDocument()
  })
})
