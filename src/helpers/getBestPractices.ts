import type { MetricResult as BestPractices } from '@@types/metricResult'

/**
 * Get best practices metrics for the current document.
 * @returns A BestPractices metric result.
 */
export const getBestPractices = (): BestPractices => {
  const details: BestPractices['details'] = []

  /**
   * Check a specific best practice condition.
   * @param label The label for the best practice.
   * @param condition The condition to check.
   * @returns void
   */
  const check = (label: string, condition: boolean) => {
    details.push({ label, value: condition ? 1 : 0 })
  }

  check("https", location.protocol === "https:")
  check("device-memory", 'deviceMemory' in navigator)
  check("hardware-concurrency", 'hardwareConcurrency' in navigator)
  check("secure-context", window.isSecureContext)
  check("crypto", 'crypto' in window)
  check("document.write", document.write.toString().includes('[native code]'))

  const passwordInputs = Array.from(document.querySelectorAll('input[type="password"]')) as HTMLInputElement[]
  const allSecureAutocomplete = passwordInputs.every(input =>
    input.autocomplete === 'current-password' || input.autocomplete === 'new-password'
  )

  check("password-autocomplete", allSecureAutocomplete)

  const score = Math.round(
    (details.filter(detail => detail.value === 1).length / details.length) * 100
  )

  return {
    score,
    details
  }
}