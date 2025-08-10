import type { MetricResult as BestPractices } from '@@types/metricResult'
import type { BrowserEnvironment } from '@@types/rules'
import { rules } from './rules/bestPractices'

/**
 * Get best practices metrics for the current document.
 * @returns A BestPractices metric result.
 */
export const getBestPractices = (environment: BrowserEnvironment = {
  location,
  navigator,
  window,
  document
}): BestPractices => {
  const details: BestPractices['details'] = rules.map(rule => ({
    label: rule.label,
    value: rule.check(environment) ? 1 : 0,
  }))

  const score = Math.round(
    (details.filter(detail => detail.value === 1).length / details.length) * 100
  )

  return {
    score,
    details
  }
}