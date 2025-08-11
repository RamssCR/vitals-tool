import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva(
  '',
  {
    variants: {
      variant: {
        primary: 'tw:text-primary',
        muted: 'tw:text-muted-foreground',
      },
      size: {
        xxs: 'tw:text-[0.625em]',
        xs: 'tw:text-xs',
        sm: 'tw:text-sm',
        base: 'tw:text-base',
        lg: 'tw:text-lg',
      },
      weight: {
        thin: 'tw:font-thin',
        extralight: 'tw:font-extralight',
        light: 'tw:font-light',
        normal: 'tw:font-normal',
        medium: 'tw:font-medium',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
      weight: 'normal',
    },
  }
)

export type TextVariants = VariantProps<typeof variants>