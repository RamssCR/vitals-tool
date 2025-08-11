import { Items } from "./Items"
import { StatusText } from "./StatusText"
import { Title } from "@components/ui/Title"
import type { Item, MetricProps } from '@@types/metricResult'

/**
 * Metric component for displaying a single metric value.
 * It shows a label and a value in a styled format.
 */
export const Metric = ({ active = false, label, value, details }: MetricProps) => {
  const fallback: Item[] = [
    { label: "No details", value: 0 }
  ]

  return (
    <article className="tw:relative tw:w-full tw:flex tw:flex-col tw:items-center tw:gap-2">
      <Title size="xl" className="tw:text-bg tw:uppercase">{label}</Title>
      <StatusText status={value ?? -1} size="lg">{value ?? '--'}</StatusText>
      {active && <Items items={details ?? fallback} />}
    </article>
  )
}