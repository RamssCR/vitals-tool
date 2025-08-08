type Item = {
  label?: string
  value?: number
}

type MetricProps = Item & {
  active?: boolean
  details?: Item[]
}

export type MetricResult = {
  score: number
  details: Item[]
}