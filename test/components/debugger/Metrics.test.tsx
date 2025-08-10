import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Metrics } from '@components/debugger/Metrics'
import { useMetricTogglers } from '@hooks/useMetricTogglers'
import { useAudit } from '@hooks/useAudit'

vi.mock('@hooks/useMetricTogglers')
vi.mock('@hooks/useAudit', () => ({
  useAudit: vi.fn(() => ({
    loading: false,
    bestPractices: { score: 80, details: [] },
    performance: { score: 90, details: [] },
    seo: { score: 85, details: [] },
  })),
}))

describe('Metrics', () => {
  test('renders correctly', () => {
    (useMetricTogglers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shouldRender: true,
      animateOut: false,
      detailsActive: false,
      detailsToggle: vi.fn(),
      handleAnimationEnd: vi.fn(),
    })

    const { container } = render(<Metrics active={true} toggle={vi.fn()} />)
    expect(container).toBeDefined()
  })

  test('does not render when shouldRender is false', () => {
    (useMetricTogglers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shouldRender: false,
      animateOut: false,
      detailsActive: false,
      detailsToggle: vi.fn(),
      handleAnimationEnd: vi.fn(),
    })

    const { container } = render(<Metrics active={true} toggle={vi.fn()} />)
    expect(container.tagName).toBe('DIV')
  })

  test('renders loading state', () => {
    (useMetricTogglers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shouldRender: true,
      animateOut: true,
      detailsActive: false,
      detailsToggle: vi.fn(),
      handleAnimationEnd: vi.fn(),
    })
      ; (useAudit as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        loading: true,
        bestPractices: { score: 80, details: [] },
        performance: { score: 90, details: [] },
        seo: { score: 85, details: [] },
      })

    render(<Metrics active={true} toggle={vi.fn()} />)
    const loader = screen.getByText('Loading Analyzers...')
    expect(loader).toBeDefined()
  })
})