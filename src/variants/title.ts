import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva(
  'font-semibold',
  {
    variants: {
      variant: {
        primary: 'text-primary',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    }
  }
)

export type TitleVariantsProps = VariantProps<typeof variants>