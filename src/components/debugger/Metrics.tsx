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
        'tw:fixed tw:z-1000 tw:transform tw:left-1/2 tw:-translate-x-1/2 tw:top-4 tw:w-full tw:max-w-4xl tw:grid tw:grid-cols-1 tw:gap-y-6 tw:items-start tw:md:grid-cols-2 tw:md:gap-x-4 tw:lg:grid-cols-4 tw:rounded-xl tw:bg-gradient-to-b tw:from-tool-bg tw:to-tool-muted tw:py-4 tw:px-5 tw:md:px-7 tw:max-h-[95svh] tw:overflow-y-auto',
        animateOut ? 'tw:animate-tool-out' : 'tw:animate-tool-in',
        loading && 'tw:h-24',
      )}
      aria-label="Metrics section"
      onAnimationEnd={handleAnimationEnd}
    >
      {loading && (
        <Title 
          as="h2" 
          size="2xl" 
          className="tw:text-bg tw:absolute tw:top-1/2 tw:left-1/2 tw:transform tw:-translate-x-1/2 tw:-translate-y-1/2"
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
