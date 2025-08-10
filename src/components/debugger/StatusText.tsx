import { Text } from "@components/ui/Text"
import { classMerger } from "@utils/classMerger"
import type { ComponentProps } from "react"

/**
 * Utility function to determine the status class based on the status value.
 * - Returns 'text-analytic-success' for status >= 90
 * - Returns 'text-analytic-warning' for status >= 75 and < 90
 * - Returns 'text-analytic-error' for status < 75
 * - Returns 'text-muted/85' for undefined or negative status values.
 */
const detectStatus = (status: number) => {
  if (status >= 90) return 'tw:text-analytic-success'
  if (status >= 75) return 'tw:text-analytic-warning'
  if (status >= 0) return 'tw:text-analytic-error'
  return 'tw:text-muted/85'
}

type StatusProps = ComponentProps<typeof Text> & {
  status: number
}

/**
 * StatusText component displays the status of an operation.
 * It changes color based on the status value:
 * - Green for status >= 90
 * - Yellow for status >= 75 and < 90
 * - Red for status < 75
 * - Gray for undefined or negative status values.
 */
export const StatusText = ({ status, className, size = "sm", ...props }: StatusProps) => {
  return (
    <Text
      className={classMerger(detectStatus(status), className)}
      size={size}
      {...props}
    />
  )
}