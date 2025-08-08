import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva(
  'flex items-center justify-center rounded-sm text-sm font-medium transition-all hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-muted text-contrast focus-visible:ring-contrast',
        tool: 'bg-tool-bg text-bg hover:bg-tool-bg/90 focus-visible:ring-tool-bg',
        none: 'bg-transparent text-contrast hover:brightness-110',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 py-1',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof variants>