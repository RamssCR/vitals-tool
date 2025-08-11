import { describe, expect, test } from 'vitest'
import { formatKey } from '@utils/formatKey'

describe('formatKey', () => {
  test('formats keys correctly', () => {
    expect(formatKey('testKey')).toBe('TestKey')
    expect(formatKey('anotherTestKey')).toBe('AnotherTestKey')
  })
})