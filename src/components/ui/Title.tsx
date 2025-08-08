import type { HTMLAttributes } from 'react'
import { variants, type TitleVariantsProps } from '@variants/title'
import { classMerger } from '@utils/classMerger'

type TitleProps = HTMLAttributes<HTMLHeadingElement> & TitleVariantsProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Title component for displaying headings with customizable styles.
 * It supports different HTML heading tags (h1, h2, etc.) and applies 
 * styles based on the provided variants.
 */
export const Title = ({
  children,
  as: Tag = "h1",
  className,
  variant,
  size,
  ...props
}: TitleProps) => {
  return (
    <Tag
      className={classMerger(
        variants({ variant, size }),
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}