import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('axe-core', () => ({
  default: {
    run: vi.fn()
  }
}))

import axe from 'axe-core'

describe('getAccessibility', () => {
  const mockRun = axe.run as unknown as ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('retorna 100 cuando no hay violaciones ni pases', async () => {
    mockRun.mockResolvedValueOnce({
      violations: [],
      passes: []
    })

    const { getAccessibility } = await import('@helpers/getAccessibility')
    const result = await getAccessibility()

    expect(result.score).toBe(100)
    expect(result.details).toEqual([])
  })

  it('calcula score correctamente con violaciones y pases', async () => {
    mockRun.mockResolvedValueOnce({
      violations: [{ id: 'color-contrast' }],
      passes: [{ id: 'label' }, { id: 'link-name' }]
    })

    const { getAccessibility } = await import('@helpers/getAccessibility')
    const result = await getAccessibility()

    expect(result.score).toBe(67)
    expect(result.details).toContainEqual({ label: 'color-contrast', value: 0 })
    expect(result.details).toContainEqual({ label: 'label', value: 1 })
    expect(result.details).toContainEqual({ label: 'link-name', value: 1 })
  })

  it('devuelve score 0 si ya está en ejecución', async () => {
    mockRun.mockResolvedValue({
      violations: [],
      passes: []
    })

    const { getAccessibility } = await import('@helpers/getAccessibility')

    await getAccessibility()
    const result = await getAccessibility()

    expect(result).toEqual({ score: 0, details: [] })
    expect(mockRun).toHaveBeenCalledTimes(1)
  })
})
