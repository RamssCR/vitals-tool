import type { Rules } from '@@types/rules'

export const rules: Rules[] = [
  { label: 'website-title', check: (env) => Boolean(env.document.title) },
  { label: 'meta-description', check: (env) => Boolean(env.document.querySelector('meta[name="description"]')) },
  { label: 'meta-viewport', check: (env) => Boolean(env.document.querySelector('meta[name="viewport"]')) },
  { label: 'canonical-url', check: (env) => Boolean(env.document.querySelector('link[rel="canonical"]')) },
  { label: 'heading-structure', check: (env) => {
    const headings = Array.from(env.document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    return headings.length > 0 && headings[0].tagName === 'H1'
  }},
  { label: 'alt-attributes', check: (env) => {
    const images = Array.from(env.document.querySelectorAll('img'))
    return images.every(img => img.hasAttribute('alt'))
  }},
  { label: 'robots-indexable', check: (env) => {
    const robots = env.document.querySelector('meta[name="robots"]')
    return robots ? robots.getAttribute('content') !== 'noindex' : true
  }},
  { label: 'lang-attribute', check: (env) => Boolean(env.document.documentElement.lang) },
  { label: 'robots.txt', check: async () => {
    const response = await fetch('/robots.txt')
    const contentType = response.headers.get('content-type') ?? ''
    return contentType === 'text/plain'
  }},
  { label: 'valid-links', check: async (env) => {
    const links = Array.from(env.document.querySelectorAll('a'))
    const results = await Promise.all(links.map(link => fetch(link.href).then(res => res.ok).catch(() => false)))
    return results.every(Boolean)
  }}
]