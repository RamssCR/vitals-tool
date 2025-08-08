import type { ComponentProps } from "react"
import { Button } from "@components/ui/Button"
import { Image } from "@components/ui/Image"
import { classMerger } from "@utils/classMerger"
import arrowDown from "@assets/arrow-down.svg"

export const ShowDetailsButton = ({ 
  active = false, 
  ...props 
}: ComponentProps<typeof Button> & { active?: boolean }) => {
  return (
    <Button
      variant="none"
      className="gap-2 pr-4 pl-2 text-bg absolute top-1 right-1"
      {...props}
    >
      <Image
        src={arrowDown}
        alt=""
        className={classMerger(
          "w-4 h-4 ml-2 transition-transform duration-150 ease-in-out",
          active ? "rotate-180" : "rotate-0"
        )}
        aria-hidden="true"
      />
    </Button>
  )
}