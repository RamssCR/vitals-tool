import type { Rules } from '@@types/rules'

export const rules: Rules[] = [
  { label: 'no-console', check: (env) => Boolean(env.window.console) },
  { label: 'no-alert', check: (env) => Boolean(env.window.alert) },
  { label: 'device-memory', check: (env) => 'deviceMemory' in env.navigator },
  { label: 'hardware-concurrency', check: (env) => 'hardwareConcurrency' in env.navigator },
  { label: 'secure-context', check: (env) => env.window.isSecureContext },
  { label: 'crypto', check: (env) => Boolean(env.window.crypto) },
  { label: 'document.write', check: (env) => env.document.write.toString().includes('[native code]') },
  { label: 'password-autocomplete', check: (env) => {
    const inputs = Array.from(env.document.querySelectorAll('input[type="password"]')) as HTMLInputElement[]
    return inputs.every(input => input.autocomplete === 'current-password' || input.autocomplete === 'new-password')
  }}
]