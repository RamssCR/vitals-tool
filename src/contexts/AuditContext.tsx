import { createContext } from 'react'
import type { Audit } from '@@types/audit'

export const AuditContext = createContext<Audit | null>(null)