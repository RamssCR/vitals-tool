import { type TextVariants, variants } from '@variants/text'
import type { HTMLAttributes } from 'react'
import { classMerger } from '@utils/classMerger'

type TextProps = HTMLAttributes<HTMLParagraphElement> & TextVariants

/**
 * Renders a text element with customizable styles.
 * This component uses the variants defined in @variants/text to apply styles based on variant, size, and weight.
 * It merges these styles with any additional class names provided via the `className` prop.
 */
export const Text = ({ 
  className, 
  variant, 
  size, 
  weight, 
  ...props 
}: TextProps) => {
  return (
    <p
      className={classMerger(
        variants({ variant, size, weight }),
        className
      )}
      {...props}
    />
  )
}