import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Metric } from '@components/debugger/Metric'

describe('Metric', () => {
  test('renders metric with label and value', () => {
    render(<Metric label="Test Metric" value={42} />)
    const label = screen.getByText('Test Metric')
    const value = screen.getByText('42')
    expect(label).toBeDefined()
    expect(value).toBeDefined()
  })

  test('renders items with an active state', () => {
    render(<Metric label="Active Metric" value={100} active={true} />)
    const label = screen.getByText('Active Metric')
    expect(label).toBeDefined()
  })

  test('renders an item without a value', () => {
    render(<Metric label="Test Metric" value={undefined} />)
    const label = screen.getByText('Test Metric')
    expect(label).toBeDefined()
  })
})