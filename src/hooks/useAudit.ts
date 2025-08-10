import { AuditContext } from '@contexts/AuditContext'
import { use } from 'react'

/**
 * Custom hook to access the audit context.
 * This hook provides the latest audit results including performance, accessibility, SEO, and best practices.
 * It leverages React's `use` function to consume the context.
 * @returns The latest audit results.
 */
export const useAudit = () => {
  const context = use(AuditContext)
  if (!context) {
    throw new Error('useAudit must be used within an AuditProvider')
  }
  return context
}