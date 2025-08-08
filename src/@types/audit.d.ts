import type { MetricResult } from "./metricResult"

export type Audit = {
  vitals: MetricResult | null
  accessibility: MetricResult | null
  bestPractices: MetricResult | null
  seo: MetricResult | null
  loading: boolean
}