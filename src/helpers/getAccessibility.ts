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

  const total = result.violations.length + result.passes.length
  const score = total === 0
    ? 100
    : Math.round((result.passes.length / total) * 100)

  const details = result.violations.map((violation) => ({
    label: violation.id,
    value: 0
  }))

  result.passes.forEach((pass) => {
    details.push({
      label: pass.id,
      value: 1
    })
  })

  return {
    score,
    details
  }
}