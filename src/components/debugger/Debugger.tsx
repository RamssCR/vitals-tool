import { AuditProvider } from '@providers/AuditProvider';
import { DebugButton } from "./DebugButton"
import { Metrics } from "./Metrics"
import { AuditContext } from '@contexts/AuditContext';
import { useToggle } from "@hooks/useToggle"
import { use } from 'react';

export const Debugger = () => {
  const audit = use(AuditContext)
  if (audit) {
    return (
      <DebuggerUI />
    )
  }

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
    <section 
      className="w-full h-[100dvh] flex flex-col items-center justify-between fixed top-0 left-0 p-4 overflow-hidden"
      aria-label="Debugger section"
    >
      <Metrics active={active} toggle={toggle} />
      <DebugButton onClick={toggle} />
    </section>
  )
}