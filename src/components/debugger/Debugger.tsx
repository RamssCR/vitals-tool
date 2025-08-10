import { AuditProvider } from '@providers/AuditProvider';
import { DebugButton } from "./DebugButton"
import { Metrics } from "./Metrics"
import { AuditContext } from '@contexts/AuditContext';
import { useToggle } from "@hooks/useToggle"
import { use } from 'react';

/**
 * Debugger component for displaying the debugging interface.
 * Used to provide a section for debugging tools and information.
 */
export const Debugger = () => {
  const audit = use(AuditContext)
  if (audit) return <DebuggerUI />

  return (
    <AuditProvider>
      <DebuggerUI />
    </AuditProvider>
  )
}

/**
 * Debugger component for displaying the debugging interface.
 * Used to provide a section for debugging tools and information.
 */
export const DebuggerUI = () => {
  const { active, toggle } = useToggle()

  return (
    <>
      <Metrics active={active} toggle={toggle} />
      <DebugButton onClick={toggle} />
    </>
  )
}