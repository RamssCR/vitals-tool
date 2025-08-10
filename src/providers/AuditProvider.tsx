import { type ReactNode, useEffect, useState } from 'react'
import type { Audit } from '@@types/audit'
import { AuditContext } from '@contexts/AuditContext'
import { getAccessibility } from '@helpers/getAccessibility'
import { getBestPractices } from '@helpers/getBestPractices'
import { getPerformance } from '@helpers/getPerformance'
import { getSEO } from '@helpers/getSEO'

/**
 * Provider component that runs web vitals audits and provides the results via context.
 * It performs audits for performance, accessibility, SEO, and best practices.
 */
export const AuditProvider = ({ children }: { children: ReactNode }) => {
  const [vitals, setVitals] = useState<Audit>({
    vitals: null,
    accessibility: null,
    bestPractices: null,
    seo: null,
    loading: true
  })

  useEffect(() => {
    const runAudits = async () => {
      const [accessibility, bestPractices] = await Promise.all([
        getAccessibility(),
        Promise.resolve(getBestPractices())
      ])

      const seo = await getSEO()
      const vitals = await getPerformance()

      setVitals({
        vitals,
        accessibility,
        bestPractices,
        seo,
        loading: false
      })
    }

    runAudits()
  }, [])

  return (
    <AuditContext value={vitals}>
      {children}
    </AuditContext>
  )
}