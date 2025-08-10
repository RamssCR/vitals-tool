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
 * @param props The props for the provider component.
 * @returns The provider component.
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
    /**
     * Runs the web vitals audits.
     * @returns A promise that resolves when all audits are complete.
     */
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