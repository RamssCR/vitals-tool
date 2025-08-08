import { Metric } from "./Metric"
import { ShowDetailsButton } from "./ShowDetailsButton"
import { classMerger } from "@utils/classMerger"
import { useToggle } from '@hooks/useToggle';
import { useMetricTogglers } from "@hooks/useMetricTogglers";
import { useAudit } from "@hooks/useAudit";
import { formatKey } from "@utils/formatKey";
import { Title } from "@components/ui/Title";

export const Metrics = ({
  active = false,
}: ReturnType<typeof useToggle>) => {
  const { shouldRender, animateOut, detailsActive, detailsToggle, handleAnimationEnd } = useMetricTogglers(active)
  const { loading, ...auditors } = useAudit()

  if (!shouldRender) return null

  return (
    <article
      className={classMerger(
        'relative w-full max-w-4xl grid grid-cols-1 gap-y-6 items-start md:grid-cols-2 md:gap-x-4 lg:grid-cols-4 rounded-xl bg-gradient-to-b from-tool-bg to-tool-muted py-4 px-5 md:px-7 max-h-[95svh] overflow-y-auto',
        animateOut ? 'animate-tool-out' : 'animate-tool-in',
        loading && 'h-24',
      )}
      aria-label="Metrics section"
      onAnimationEnd={handleAnimationEnd}
    >
      {loading && (
        <Title 
          as="h2" 
          size="2xl" 
          className="text-bg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          aria-busy="true"
        >
          Loading Analyzers...
        </Title>
      )}
      {!loading && Object.entries(auditors).map(([key, auditor]) => (
        <Metric 
          key={key}
          label={formatKey(key === 'bestPractices' ? 'Best Practices' : key)} 
          value={auditor?.score} 
          details={auditor?.details} 
          active={detailsActive} 
        />
      ))}
      <ShowDetailsButton 
        active={detailsActive} 
        onClick={detailsToggle} 
      />
    </article>
  )
}
