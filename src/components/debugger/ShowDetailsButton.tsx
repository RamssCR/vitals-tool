import type { ComponentProps } from "react"
import { Button } from "@components/ui/Button"
import { Image } from "@components/ui/Image"
import { classMerger } from "@utils/classMerger"
import arrowDown from "@assets/arrow-down.svg"

/**
 * ShowDetailsButton component displays a button to toggle the visibility of additional details.
 * @param props - Props for the button component.
 * @returns The rendered button component.
 */
export const ShowDetailsButton = ({ 
  active = false, 
  ...props 
}: ComponentProps<typeof Button> & { active?: boolean }) => {
  return (
    <Button
      variant="none"
      className="tw:gap-2 tw:pr-4 tw:pl-2 tw:text-bg tw:absolute tw:top-1 tw:right-1"
      {...props}
    >
      <Image
        src={arrowDown}
        role="img"
        className={classMerger(
          "tw:w-4 tw:h-4 tw:ml-2 tw:transition-transform tw:duration-150 tw:ease-in-out",
          active ? "tw:rotate-180" : "tw:rotate-0"
        )}
        aria-hidden="true"
      />
    </Button>
  )
}