import { describe, expect, test } from 'vitest'
import { classMerger } from '@utils/classMerger'

describe('classMerger', () => {
  test('merges multiple class names into a single string', () => {
    const result = classMerger('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  test('ignores falsy values', () => {
    const result = classMerger('class1', '', 'class3', null, undefined)
    expect(result).toBe('class1 class3')
  })

  test('handles arrays of class names', () => {
    const result = classMerger(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })
})