import type { ImgHTMLAttributes } from 'react'
import { classMerger } from '@utils/classMerger'

/**
 * Image component for displaying images with customizable styles.
 * It merges any additional class names provided via the `className` prop.
 */
export const Image = ({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      className={classMerger(className)}
      {...props}
    />
  )
}