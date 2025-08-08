import type { ComponentProps } from "react"
import { Button } from "@components/ui/Button"
import { Image } from "@components/ui/Image"
import bug from "@assets/bug.svg"

/**
 * Debug button for the debugging interface.
 * Used to toggle or activate debugging features.
 */
export const DebugButton = ({ ...props }: ComponentProps<typeof Button>) => (
  <Button
    variant="none"
    size="icon"
    className="rounded-full size-12 p-3 bg-tool-bg shadow absolute bottom-4 right-4 z-1000"
    aria-label="Debug Button"
    {...props}
  >
    <Image
      src={bug}
      alt="Debug Button"
      className="size-full object-contain"
    />
  </Button>
)