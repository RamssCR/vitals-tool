import type { MetricResult as BestPractices } from '@@types/metricResult'

export const getBestPractices = (): BestPractices => {
  const details: BestPractices['details'] = []

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