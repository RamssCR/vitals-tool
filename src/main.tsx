import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { AuditProvider } from '@providers/AuditProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuditProvider>
      <App />
    </AuditProvider>
  </StrictMode>,
)
