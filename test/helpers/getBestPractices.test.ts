import { describe, test, expect, vi } from 'vitest'

vi.mock('@helpers/rules/bestPractices', () => ({
  rules: [
    { label: 'Rule 1', check: vi.fn() },
    { label: 'Rule 2', check: vi.fn() },
    { label: 'Rule 3', check: vi.fn() }
  ]
}))

import { getBestPractices } from '@helpers/getBestPractices'
import { rules } from '@helpers/rules/bestPractices'

describe('getBestPractices', () => {
  const mockEnv = {
    location: {} as Location,
    navigator: {} as Navigator,
    window: {} as Window & typeof globalThis,
    document: {} as Document
  }

  test('retorna score 100 cuando todas las reglas pasan', () => {
    rules[0].check = vi.fn().mockReturnValue(true)
    rules[1].check = vi.fn().mockReturnValue(true)
    rules[2].check = vi.fn().mockReturnValue(true)

    const result = getBestPractices(mockEnv)
    expect(result.score).toBe(100)
    expect(result.details).toEqual([
      { label: 'Rule 1', value: 1 },
      { label: 'Rule 2', value: 1 },
      { label: 'Rule 3', value: 1 }
    ])
  })

  test('calcula score parcial cuando algunas reglas fallan', () => {
    (rules[0].check as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true)
    ;(rules[1].check as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false)
    ;(rules[2].check as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true)

    const result = getBestPractices(mockEnv)
    expect(result.score).toBe(67)
    expect(result.details).toEqual([
      { label: 'Rule 1', value: 1 },
      { label: 'Rule 2', value: 0 },
      { label: 'Rule 3', value: 1 }
    ])
  })

  test('retorna score 0 cuando todas las reglas fallan', () => {
    (rules[0].check as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false)
    ;(rules[1].check as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false)
    ;(rules[2].check as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false)

    const result = getBestPractices(mockEnv)
    expect(result.score).toBe(0)
    expect(result.details).toEqual([
      { label: 'Rule 1', value: 0 },
      { label: 'Rule 2', value: 0 },
      { label: 'Rule 3', value: 0 }
    ])
  })
})
