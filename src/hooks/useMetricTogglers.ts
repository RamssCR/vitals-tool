import { useEffect, useState } from 'react'
import { useToggle } from './useToggle'

/**
 * Custom hook to manage the state of metric togglers.
 * @param active Whether the metric is active or not.
 * @returns An object containing the state and toggle functions.
 */
export const useMetricTogglers = (active = false) => {
  const [shouldRender, setShouldRender] = useState(active)
  const [animateOut, setAnimateOut] = useState(false)
  const { active: detailsActive, toggle: detailsToggle } = useToggle()

  useEffect(() => {
    if (active) {
      setShouldRender(true)
      setAnimateOut(false)
    } else if (shouldRender) {
      setAnimateOut(true)
    }
  }, [active, shouldRender])

  const handleAnimationEnd = () => {
    if (animateOut) {
      setShouldRender(false)
      setAnimateOut(false)
    }
  }

  return {
    shouldRender,
    animateOut,
    detailsActive,
    detailsToggle,
    handleAnimationEnd,
  }
}