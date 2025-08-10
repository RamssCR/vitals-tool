import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { AuditContext } from '@contexts/AuditContext'
import { Debugger } from '@components/debugger/Debugger'

describe('Debugger', () => {
  test('renders the component adding the context', () => {
    const { container } = render(
      <AuditContext value={null}>
        <Debugger />
      </AuditContext>
    )
    expect(container).toBeDefined()
  })

  test('renders the component with the context', () => {
    const context = {
      accessibility: { score: 90, details: [{ label: 'item 1', value: 1 }] },
      vitals: { score: 85, details: [{ label: 'item 2', value: 2 }] },
      bestPractices: { score: 80, details: [{ label: 'item 3', value: 3 }] },
      seo: { score: 75, details: [{ label: 'item 4', value: 4 }] },
      loading: false
    }

    const { container } = render(
      <AuditContext value={context}>
        <Debugger />
      </AuditContext>
    )
    expect(container).toBeDefined()
  })
})