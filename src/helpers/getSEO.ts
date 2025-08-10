import type { MetricResult as SEO } from "@@types/metricResult"
import type { BrowserEnvironment } from "@@types/rules"
import { rules } from "./rules/seo"

type DetailItem = { label: string, value: number }

/**
 * Get SEO metrics for the current document.
 * @returns A Promise that resolves to an SEO metric result.
 */
export const getSEO = async (environment: BrowserEnvironment = {
  location,
  navigator,
  window,
  document
}): Promise<SEO> => {
  const details: DetailItem[] = await Promise.all(
    rules.map(async rule => {
      try {
        const result = await Promise.resolve(rule.check(environment))
        return { label: rule.label, value: result ? 1 : 0 }
      } catch {
        return { label: rule.label, value: 0 }
      }
    })
  )

  const score = details.reduce((acc, { value }) => acc + value, 0) / details.length * 100

  return {
    score: Math.round(score),
    details
  }
}