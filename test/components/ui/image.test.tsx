import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Image } from '@components/ui/Image'

describe('Image Component', () => {
  test('renders with default props', () => {
    render(<Image src="test.jpg" alt="Test Image" />)
    const img = screen.getByAltText('Test Image')
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toBe('test.jpg')
  })

  test('applies custom className', () => {
    render(<Image src="test.jpg" alt="Test Image" className="custom-class" />)
    const img = screen.getByAltText('Test Image')
    expect(img.getAttribute('class')).toContain('custom-class')
  })

  test('renders without crashing when no props are passed', () => {
    render(<Image />)
    const img = screen.getByRole('img')
    expect(img).toBeDefined()
  })
})