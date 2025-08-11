import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva(
  'tw:font-semibold',
  {
    variants: {
      variant: {
        primary: 'tw:text-primary',
      },
      size: {
        xs: 'tw:text-xs',
        sm: 'tw:text-sm',
        base: 'tw:text-base',
        lg: 'tw:text-lg',
        xl: 'tw:text-xl',
        '2xl': 'tw:text-2xl',
        '3xl': 'tw:text-3xl',
        '4xl': 'tw:text-4xl',
        '5xl': 'tw:text-5xl',
        '6xl': 'tw:text-6xl',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    }
  }
)

export type TitleVariantsProps = VariantProps<typeof variants>