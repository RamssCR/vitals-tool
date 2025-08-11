import { describe, expect, test } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAudit } from '@hooks/useAudit'
import { AuditContext } from '@contexts/AuditContext'
import type { ReactNode } from 'react'

describe('useAudit', () => {
  const mockAuditData = {
    vitals: {
      score: 0.95,
      details: []
    },
    accessibility: {
      score: 0.9,
      details: []
    },
    bestPractices: {
      score: 0.85,
      details: []
    },
    seo: {
      score: 1,
      details: []
    },
    loading: false
  }

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuditContext value={mockAuditData}>
      {children}
    </AuditContext>
  )

  test('should return audit context data', () => {
    const { result } = renderHook(() => useAudit(), { wrapper })
    expect(result.current).toEqual(mockAuditData)
  })

  test('should throw error when used outside of AuditProvider', () => {
    expect(() => {
      renderHook(() => useAudit())
    }).toThrow('useAudit must be used within an AuditProvider')
  })

  test('should handle loading state', () => {
    const loadingState = {
      ...mockAuditData,
      loading: true
    }
    
    const loadingWrapper = ({ children }: { children: ReactNode }) => (
      <AuditContext value={loadingState}>
        {children}
      </AuditContext>
    )

    const { result } = renderHook(() => useAudit(), { wrapper: loadingWrapper })
    expect(result.current.loading).toBe(true)
  })
})