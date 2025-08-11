import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva(
  'tw:flex tw:items-center tw:justify-center tw:rounded-sm tw:text-sm tw:font-medium tw:transition-all tw:hover:cursor-pointer tw:focus:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-offset-2 tw:disabled:opacity-50 tw:disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'tw:bg-transparent tw:hover:bg-muted tw:text-contrast tw:focus-visible:ring-contrast',
        tool: 'tw:bg-tool-bg tw:text-bg tw:hover:bg-tool-bg/90 tw:focus-visible:ring-tool-bg',
        none: 'tw:bg-transparent tw:text-contrast tw:hover:brightness-110',
      },
      size: {
        default: 'tw:h-10 tw:px-4 tw:py-2',
        sm: 'tw:h-9 tw:rounded-md tw:px-3 tw:py-1',
        lg: 'tw:h-11 tw:rounded-md tw:px-8',
        icon: 'tw:h-10 tw:w-10',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof variants>