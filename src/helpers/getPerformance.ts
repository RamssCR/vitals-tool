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
    case 'LCP':
    case 'CLS':
    case 'FCP':
    case 'TTFB':
      return Math.max(0, 100 - value)
    default:
      return 0
  }
}

const listeners = {
  LCP: (cb: (metric: Metric) => void) => onLCP(cb, { reportAllChanges: true }),
  CLS: (cb: (metric: Metric) => void) => onCLS(cb, { reportAllChanges: true }),
  INP: (cb: (metric: Metric) => void) => onINP(cb, { reportAllChanges: true }),
  FCP: (cb: (metric: Metric) => void) => onFCP(cb, { reportAllChanges: true }),
  TTFB: (cb: (metric: Metric) => void) => onTTFB(cb, { reportAllChanges: true }),
}

/**
 * Obtains performance metrics and returns a promise that resolves with the performance result.
 * The result includes a score and detailed metrics.
 * @returns A promise that resolves to a PerformanceResult.
 */
export const getPerformance = (onUpdate: (result: PerformanceResult) => void): void => {
  const metrics: Partial<Record<keyof typeof listeners, number>> = {}

  const emitUpdate = () => {
    const details = Object.entries(metrics).map(([label, value]) => ({
      label,
      value: Number(value!.toFixed(2)),
    }))

    const score =
      details.reduce(
        (acc, curr) => acc + normalizeScore(curr.label, curr.value),
        0
      ) / (details.length)

    onUpdate({
      score: Math.round(score),
      details,
    })
  }

  const handleMetric =
    (name: keyof typeof listeners) => (metric: Metric) => {
      metrics[name] = metric.value
      emitUpdate()
    }

  for (const [name, fn] of Object.entries(listeners) as [
    keyof typeof listeners,
    (onReport: (metric: Metric) => void) => void
  ][]) {
    fn(handleMetric(name))
  }
}
