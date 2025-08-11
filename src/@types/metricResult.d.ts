/**
 * Represents a single item in a metric result.
 * This type defines the structure of each item in the metric results.
 * @file src/@types/metricResult.d.ts
 */
type Item = {
  label?: string
  value?: number
}

/**
 * Represents the properties of a metric.
 * This type defines the structure of the metric properties.
 * @file src/@types/metricResult.d.ts
 */
type MetricProps = Item & {
  active?: boolean
  details?: Item[]
}

/**
 * Represents the result of a metric evaluation.
 * This type defines the structure of the metric results.
 * @file src/@types/metricResult.d.ts
 */
export type MetricResult = {
  score: number
  details: Item[]
}