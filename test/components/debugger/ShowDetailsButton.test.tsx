import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ShowDetailsButton } from '@components/debugger/ShowDetailsButton'

describe('ShowDetailsButton', () => {
  test('renders as an non-active component', () => {
    render(<ShowDetailsButton active={false} />)
    const image = screen.getByRole('img', { hidden: true })
    expect(image).toBeDefined()
    expect(image.className).toContain('tw:rotate-0')
  })

  test('renders as an active component', () => {
    render(<ShowDetailsButton active={true} />)
    const image = screen.getByRole('img', { hidden: true })
    expect(image).toBeDefined()
    expect(image.className).toContain('tw:rotate-180')
  })
})