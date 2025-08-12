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
    className="tw:rounded-full tw:border-2 tw:border-muted/90 tw:size-12 tw:p-3 tw:bg-tool-bg tw:shadow tw:fixed tw:bottom-4 tw:right-4 tw:z-1000"
    aria-label="Debug Button"
    {...props}
  >
    <Image
      src={bug}
      alt="Debug Button"
      className="tw:size-full tw:object-contain"
    />
  </Button>
)