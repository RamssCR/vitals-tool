import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '@components/ui/Button'

describe('Button', () => {
  test('renders with default props', () => {
    render(<Button>Default Button</Button>)
    const button = screen.getByText('Default Button')
    expect(button).toBeDefined()
    expect(button.getAttribute('class')).toContain('bg-transparent')
  })

  test('renders with custom className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>)
    const button = screen.getByText('Custom Class Button')
    expect(button.getAttribute('class')).toContain('custom-class')
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable Button</Button>)
    const button = screen.getByText('Clickable Button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})