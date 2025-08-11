import { describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useMetricTogglers } from '@hooks/useMetricTogglers'

describe('useMetricTogglers', () => {
  test('should initialize with active = false by default', () => {
    const { result } = renderHook(() => useMetricTogglers())
    expect(result.current.shouldRender).toBe(false)
    expect(result.current.animateOut).toBe(false)
    expect(result.current.detailsActive).toBe(false)
  })

  test('should initialize with active = true', () => {
    const { result } = renderHook(() => useMetricTogglers(true))
    expect(result.current.shouldRender).toBe(true)
    expect(result.current.animateOut).toBe(false)
  })

  test('should set animateOut to true when active changes to false', () => {
    const { result, rerender } = renderHook(
      ({ active }) => useMetricTogglers(active),
      { initialProps: { active: true } }
    )

    expect(result.current.shouldRender).toBe(true)

    rerender({ active: false })
    expect(result.current.animateOut).toBe(true)
  })

  test('should hide component after animation ends', () => {
    const { result } = renderHook(() => useMetricTogglers(true))

    act(() => {
      result.current._debug.setAnimateOut(true)
    })

    act(() => {
      result.current.handleAnimationEnd()
    })

    vi.waitFor(() => {
      expect(result.current.shouldRender).toBe(false)
    })
    expect(result.current.animateOut).toBe(false)
  })

  test('should toggle detailsActive via detailsToggle', () => {
    const { result } = renderHook(() => useMetricTogglers())

    act(() => {
      result.current.detailsToggle()
    })

    expect(result.current.detailsActive).toBe(true)

    act(() => {
      result.current.detailsToggle()
    })

    expect(result.current.detailsActive).toBe(false)
  })
})
