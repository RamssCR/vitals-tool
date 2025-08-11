import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DebugButton } from '@components/debugger/DebugButton'

describe('DebugButton', () => {
  test('renders correctly', () => {
    render(<DebugButton />)
    const button = screen.getByRole('button')
    expect(button).toBeDefined()
  })
})