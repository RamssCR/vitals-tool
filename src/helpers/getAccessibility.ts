import type { MetricResult as Accessibility } from '@@types/metricResult'
import axe from 'axe-core'

let isRunning = false

/**
 * Get accessibility metrics for the current document.
 * @returns A promise that resolves to an Accessibility metric result.
 */
export const getAccessibility = async (): Promise<Accessibility> => {
  if (isRunning) {
    return {
      score: 0,
      details: []
    }
  }
  isRunning = true
  const result = await axe.run(document, {
    runOnly: ['wcag2a', 'wcag2aa'],
    rules: {
      'color-contrast': { enabled: true },
      'image-alt': { enabled: true },
      'label': { enabled: true },
      'link-name': { enabled: true },
      'document-title': { enabled: false },
      'html-has-lang': { enabled: false },
    }
  })

  const filteredResults = new Map<string, number>()
  result.violations.forEach(violation => filteredResults.set(violation.id, 0))

  result.passes.forEach(pass => {
    if (!filteredResults.has(pass.id)) {
      filteredResults.set(pass.id, 1)
    }
  })
  
  const details = Array.from(filteredResults, ([label, value]) => ({ label, value }))
  const score = details.length === 0
    ? 100
    : Math.round(
      (details.filter(detail => detail.value === 1).length / details.length) * 100
    )

  return {
    score,
    details
  }
}