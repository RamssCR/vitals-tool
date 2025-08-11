import { describe, expect, test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useToggle } from '@hooks/useToggle'

describe('useToggle', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current.active).toBe(false)
  })

  test('should initialize with custom value', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current.active).toBe(true)
  })

  test('should toggle state', () => {
    const { result } = renderHook(() => useToggle())
    act(() => {
      result.current.toggle()
    })
    expect(result.current.active).toBe(true)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.active).toBe(false)
  })
})