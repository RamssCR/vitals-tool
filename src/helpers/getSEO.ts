import type { MetricResult as SEO } from "@@types/metricResult"

type DetailItem = {
  label: string;
  value: number;
}

/**
 * Get SEO metrics for the current document.
 * @returns A Promise that resolves to an SEO metric result.
 */
export const getSEO = async (): Promise<SEO> => {
  const details: DetailItem[] = []

  /**
   * Check a specific SEO condition.
   * @param label The label for the SEO metric.
   * @param condition The condition to check.
   * @returns void
   */
  const check = (label: string, condition: boolean) => {
    details.push({ label, value: condition ? 1 : 0 })
  }

  check("website-title", document.title.trim().length > 0)
  
  const description = document.querySelector('meta[name="description"]')
  check("meta-description", Boolean(description) && Boolean(description?.getAttribute('content')?.trim()))

  const robots = document.querySelector('meta[name="robots"]')
  const robotsContent = robots?.getAttribute('content')?.toLowerCase()
  check("robots-indexable", !robotsContent?.includes('noindex'))

  const language = document.documentElement.lang
  check("html-lang", Boolean(language))

  const links = Array.from(document.links)
  const invalidLinks = links.filter(link => {
    const href = link.getAttribute('href')?.trim()
    return !href || href === "" || href === "#"
  }).length
  check("valid-links", invalidLinks === 0)

  /**
   * Checks if the robots.txt file exists.
   * @returns A promise that resolves to a boolean indicating the existence of the robots.txt file.
   */
  const isRobotsFileExisting = async () => {
    const response = await fetch('/robots.txt')
    const contentType = response.headers.get('content-type') ?? ''
    return contentType === 'text/plain'
  }

  const robotsFileExists = await isRobotsFileExisting()
  check("robots.txt-exists", robotsFileExists)

  const h1s = document.querySelectorAll('h1').length
  check("has-h1", h1s > 0)

  const score = details.reduce((acc, { value }) => acc + value, 0) / details.length * 100

  return {
    score: Math.round(score),
    details
  }
}