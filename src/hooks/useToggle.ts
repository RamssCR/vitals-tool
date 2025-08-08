import { useCallback, useState } from 'react'

/**
 * Custom hook for toggling a boolean state.
 * It provides the current state and a function to toggle it.
 */
export const useToggle = (initial = false) => {
  const [active, setActive] = useState(initial)
  const toggle = useCallback(() => setActive((prev) => !prev), [])
  return { active, toggle }
}