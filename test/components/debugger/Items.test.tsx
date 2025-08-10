import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Items } from '@components/debugger/Items'

describe('Items', () => {
  test('renders items correctly', () => {
    const items = [
      { label: 'Item 1', value: 1 },
      { label: 'Item 2', value: 2 },
      { label: 'Item 3', value: 3 },
    ]

    render(<Items items={items} />);
    const value = screen.getByText('1')
    expect(value).toBeDefined()
  })
})