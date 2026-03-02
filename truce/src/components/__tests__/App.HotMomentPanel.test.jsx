import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('HotMomentPanel in App', () => {
  it('opens from CTA and closes from close button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /hot moment/i }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /hot moment quick flow/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close/i }))

    expect(
      screen.queryByRole('heading', { name: /hot moment quick flow/i })
    ).not.toBeInTheDocument()
  })
})
