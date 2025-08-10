import {
  onINP,
  onLCP,
  onCLS,
  onFCP,
  onTTFB,
  type Metric,
} from 'web-vitals'
import type { MetricResult as PerformanceResult } from '@@types/metricResult'

/**
 * Normalizes the performance score based on the metric name and value.
 * The lower the value, the higher the score.
 * @param name The name of the metric (e.g., 'INP', 'LCP', etc.).
 * @param value The value of the metric.
 * @returns The normalized score for the metric.
 */
export const normalizeScore = (name: string, value: number): number => {
  switch (name) {
    case 'INP':
      return Math.max(0, 100 - value)
    case 'LCP':
      return Math.max(0, 100 - value)
    case 'CLS':
      return Math.max(0, 100 - value)
    case 'FCP':
      return Math.max(0, 100 - value)
    case 'TTFB':
      return Math.max(0, 100 - value)
    default:
      return 0
  }
}

const listeners = {
  LCP: onLCP,
  CLS: onCLS,
  INP: onINP,
  FCP: onFCP,
  TTFB: onTTFB,
}

let performancePromise: Promise<PerformanceResult> | null = null

/**
 * Obtains performance metrics and returns a promise that resolves with the performance result.
 * The result includes a score and detailed metrics.
 * @returns A promise that resolves to a PerformanceResult.
 */
export const getPerformance = (): Promise<PerformanceResult> => {
  if (!performancePromise) {
    performancePromise = new Promise((resolve) => {
      const metrics: Partial<Record<keyof typeof listeners, number>> = {}
      let collected = 0
      let resolved = false

      /**
       * Tries to resolve the performance promise with the collected metrics.
       * If the metrics are not yet collected, it calculates the score based on the normalized values.
       * If the metrics are already resolved, it does nothing.
       * @returns void
       */
      const tryResolve = () => {
        if (resolved) return

        const details = Object.entries(metrics).map(([label, value]) => ({
          label,
          value: Number(value!.toFixed(2)),
        }))

        const score =
          details.reduce(
            (acc, curr) => acc + normalizeScore(curr.label, curr.value),
            0
          ) / details.length

        resolved = true
        resolve({ score: Math.round(score), details })
      }

      /**
       * Handles the metric reporting.
       * It checks if the metric for the given name is already collected.
       * If not, it stores the metric value and increments the collected count.
       * @param name The name of the metric.
       * @returns A function that handles the metric reporting.
       */
      const handleMetric = (name: keyof typeof listeners) => (metric: Metric) => {
        if (!metrics[name]) {
          metrics[name] = metric.value
          collected++

          if (collected === Object.keys(listeners).length) {
            tryResolve()
          }
        }
      }

      for (const [name, fn] of Object.entries(listeners) as [
        keyof typeof listeners,
        (onReport: (metric: Metric) => void) => void
      ][]) {
        fn(handleMetric(name))
      }

      setTimeout(() => {
        if (!resolved) tryResolve()
      }, 5000)
    })
  }

  return performancePromise
}
