import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { AuditContext } from '@contexts/AuditContext'
import { AuditProvider } from '@providers/AuditProvider'
import { getAccessibility } from '@helpers/getAccessibility'
import { getBestPractices } from '@helpers/getBestPractices'
import { getPerformance } from '@helpers/getPerformance'
import { getSEO } from '@helpers/getSEO'
import type { Audit } from '@@types/audit'

vi.mock('@helpers/getAccessibility')
vi.mock('@helpers/getBestPractices')
vi.mock('@helpers/getPerformance') 
vi.mock('@helpers/getSEO')

describe('AuditProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getAccessibility).mockResolvedValue({ score: 1, details: [{ label: 'item 1', value: 1 }] })
    vi.mocked(getBestPractices).mockReturnValue({ score: 1, details: [{ label: 'item 2', value: 1 }] })
    vi.mocked(getSEO).mockResolvedValue({ score: 1, details: [{ label: 'item 3', value: 1 }] })
    vi.mocked(getPerformance).mockImplementation(cb => {
      cb({ score: 90, details: [{ label: 'item 4', value: 90 }] })
      return undefined
    })
  })

  test('should initialize with loading state', () => {
    const { getByTestId } = render(
      <AuditProvider>
        <div data-testid="child">Child</div>
      </AuditProvider>
    )

    expect(getByTestId('child')).toBeDefined()
  })

  test('should fetch and update all audit scores', async () => {
    let contextValue: Audit | null
    render(
      <AuditProvider>
        <AuditContext.Consumer>
          {value => {
            contextValue = value
            return null
          }}
        </AuditContext.Consumer>
      </AuditProvider>
    )

    await waitFor(() => {
      expect(contextValue).toEqual({
        vitals: { score: 90, details: [{ label: 'item 4', value: 90 }] },
        accessibility: { score: 1, details: [{ label: 'item 1', value: 1 }] },
        bestPractices: { score: 1, details: [{ label: 'item 2', value: 1 }] },
        seo: { score: 1, details: [{ label: 'item 3', value: 1 }] },
        loading: false
      })
    })
  })

  test('should call all audit functions', async () => {
    render(<AuditProvider><div /></AuditProvider>)

    await waitFor(() => {
      expect(getAccessibility).toHaveBeenCalled()
      expect(getBestPractices).toHaveBeenCalled()
      expect(getSEO).toHaveBeenCalled()
      expect(getPerformance).toHaveBeenCalled()
    })
  })
})