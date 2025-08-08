import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva(
  '',
  {
    variants: {
      variant: {
        primary: 'text-primary',
        muted: 'text-muted-foreground',
      },
      size: {
        xxs: 'text-[0.625em]',
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
      weight: {
        thin: 'font-thin',
        extralight: 'font-extralight',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
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