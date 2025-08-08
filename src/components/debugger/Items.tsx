import type { Item } from '@@types/metricResult';
import { Text } from "@components/ui/Text";
import { useId } from "react";

type ItemsProps = {
  items: Item[]
}

/**
 * Component for displaying a list of items with labels and values.
 * Each item is displayed in a styled format with a label and a value.
 */
export const Items = ({ items }: ItemsProps) => {
  const itemId = useId()

  return (
    <article role="grid" className="w-full max-w-[23em] bg-tool-bg/85 rounded-lg">
      {items.map(item => (
        <div
          key={`${itemId}-${item.label}`}
          className="flex items-center justify-between px-4 py-3"
          aria-label={`Metric ${item.label}`}
        >
          <Text size="xs" className="text-muted/85" weight="medium">{item.label}</Text>
          <Text size="xs" weight="medium" className="text-bg">{item.value}</Text>
        </div>
      ))}
    </article>
  )
}