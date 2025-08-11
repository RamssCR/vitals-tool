/**
 * Represents a set of rules for auditing a web application.
 * This type defines the structure of the audit rules.
 * @file src/@types/rules.d.ts
 */
export type Rules = {
  label: string
  check: (environment: BrowserEnvironment) => boolean | Promise<boolean>
}

/**
 * Represents the browser environment during the audit.
 * This type defines the structure of the browser environment.
 * @file src/@types/rules.d.ts
 */
export type BrowserEnvironment = {
  location: Location
  navigator: Navigator
  window: Window & typeof globalThis
  document: Document
}