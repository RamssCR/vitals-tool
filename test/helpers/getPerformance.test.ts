import { describe, test, expect, vi, beforeEach } from 'vitest'
import { getPerformance, normalizeScore } from '@helpers/getPerformance'
import type { Metric } from 'web-vitals'

vi.mock('web-vitals', () => ({
  onINP: vi.fn(),
  onLCP: vi.fn(),
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onTTFB: vi.fn(),
}))

import { onINP, onLCP, onCLS, onFCP, onTTFB } from 'web-vitals'

describe('normalizeScore', () => {
  test('should return 100 - value for valid metrics', () => {
    expect(normalizeScore('LCP', 20)).toBe(80)
    expect(normalizeScore('INP', 0)).toBe(100)
  })

  test('should return 0 for unknown metrics', () => {
    expect(normalizeScore('UNKNOWN', 50)).toBe(0)
  })

  test('should not return negative scores', () => {
    expect(normalizeScore('LCP', 200)).toBe(0)
  })
})

describe('getPerformance', () => {
  let onUpdate: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    onUpdate = vi.fn()
  })

  test('should register all listeners', () => {
    getPerformance(onUpdate)

    expect(onLCP).toHaveBeenCalled()
    expect(onCLS).toHaveBeenCalled()
    expect(onINP).toHaveBeenCalled()
    expect(onFCP).toHaveBeenCalled()
    expect(onTTFB).toHaveBeenCalled()
  })

  test('should calculate score and details when metrics are reported', () => {
    getPerformance(onUpdate)

    const lcpCallback = (onLCP as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0]
    lcpCallback({ name: 'LCP', value: 40 } as Metric)

    expect(onUpdate).toHaveBeenCalledWith({
      score: expect.any(Number),
      details: expect.arrayContaining([
        { label: 'LCP', value: 40 }
      ]),
    })
  })

  test('should update results when multiple metrics are reported', () => {
    getPerformance(onUpdate)

    const lcpCb = (onLCP as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0]
    const clsCb = (onCLS as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0]

    lcpCb({ name: 'LCP', value: 20 } as Metric)
    clsCb({ name: 'CLS', value: 10 } as Metric)

    const lastCall = onUpdate.mock.calls.at(-1)?.[0]
    expect(lastCall?.details).toEqual([
      { label: 'LCP', value: 20 },
      { label: 'CLS', value: 10 },
    ])
  })
})
