import { variants, type ButtonVariants } from '@variants/button'
import type { ButtonHTMLAttributes } from 'react'
import { classMerger } from '@utils/classMerger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants

/**
 * Button component for the notes application.
 * This component uses class-variance-authority for styling variants.
 * It supports different variants and sizes, allowing for flexible styling.
 */
export const Button = ({ 
  className, 
  variant, 
  size, 
  ...props 
}: ButtonProps) => (
  <button
    type="button"
    className={classMerger(
      variants({ variant, size }),
      className,
    )}
    {...props}
  />
)