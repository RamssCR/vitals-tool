import type { MetricResult as SEO } from "@@types/metricResult"

type DetailItem = {
  label: string;
  value: number;
}

export const getSEO = (): SEO => {
  const details: DetailItem[] = []

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

  const h1s = document.querySelectorAll('h1').length
  check("has-h1", h1s > 0)

  const score = details.reduce((acc, { value }) => acc + value, 0) / details.length * 100

  return {
    score: Math.round(score),
    details
  }
}