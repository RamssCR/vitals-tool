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
    <article className="tw:w-full tw:max-w-[23em] tw:bg-tool-bg/85 tw:rounded-lg">
      {items.map(item => (
        <div
          key={`${itemId}-${item.label}`}
          className="tw:flex tw:items-center tw:justify-between tw:px-4 tw:py-3"
          aria-label={`Metric ${item.label}`}
        >
          <Text size="xs" className="tw:text-muted/85" weight="medium">{item.label}</Text>
          <Text size="xs" weight="medium" className="tw:text-bg">{item.value}</Text>
        </div>
      ))}
    </article>
  )
}