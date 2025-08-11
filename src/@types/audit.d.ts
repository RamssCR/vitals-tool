import type { MetricResult } from "./metricResult"

/**
 * Audit metrics for a web application.
 * This type defines the structure of the audit results.
 * @file src/@types/audit.d.ts
 */
export type Audit = {
  vitals: MetricResult | null
  accessibility: MetricResult | null
  bestPractices: MetricResult | null
  seo: MetricResult | null
  loading: boolean
}