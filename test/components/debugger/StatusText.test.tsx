import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusText } from '@components/debugger/StatusText'

describe('StatusText', () => {
  test('renders as a successful status', () => {
    render(<StatusText status={90} />)
    const statusText = screen.getByText('90')
    expect(statusText).toBeDefined()
    expect(statusText.className).toContain('tw:text-analytic-success')
  })

  test('renders as a warning status', () => {
    render(<StatusText status={75} />)
    const statusText = screen.getByText('75')
    expect(statusText).toBeDefined()
    expect(statusText.className).toContain('tw:text-analytic-warning')
  })

  test('renders as an error status', () => {
    render(<StatusText status={50} />)
    const statusText = screen.getByText('50')
    expect(statusText).toBeDefined()
    expect(statusText.className).toContain('tw:text-analytic-error')
  })

  test('renders as a default status', () => {
    render(<StatusText status={-1} />)
    const statusText = screen.getByText('-1')
    expect(statusText).toBeDefined()
    expect(statusText.className).toContain('tw:text-muted/85')
  })
})