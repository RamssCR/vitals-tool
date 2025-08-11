// rules/seo.ts
import type { Rules } from '@@types/rules'

const fetchWithTimeout = async (input: RequestInfo, init?: RequestInit, timeout = 3000) => {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  const signal = controller?.signal
  const timer = controller ? setTimeout(() => controller.abort(), timeout) : undefined
  try {
    return await fetch(input, { signal, ...init })
  } finally {
    if (timer) clearTimeout(timer)
  }
};

export const rules: Rules[] = [
  { label: 'website-title', check: (env) => Boolean(env.document.title) },
  { label: 'meta-description', check: (env) => Boolean(env.document.querySelector('meta[name="description"]')) },
  { label: 'meta-viewport', check: (env) => Boolean(env.document.querySelector('meta[name="viewport"]')) },
  { label: 'canonical-url', check: (env) => Boolean(env.document.querySelector('link[rel="canonical"]')) },
  {
    label: 'heading-structure',
    check: (env) => {
      const headings = Array.from(env.document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      return headings.length > 0 && headings[0].tagName === 'H1'
    }
  },
  {
    label: 'alt-attributes',
    check: (env) => {
      const images = Array.from(env.document.querySelectorAll('img'))
      return images.length === 0 || images.every(img => img.hasAttribute('alt'))
    }
  },
  {
    label: 'robots-indexable',
    check: (env) => {
      const robots = env.document.querySelector('meta[name="robots"]')
      return robots ? robots.getAttribute('content')?.toLowerCase().includes('noindex') === false : true
    }
  },
  { label: 'lang-attribute', check: (env) => Boolean(env.document.documentElement.lang) },
  {
    label: 'robots.txt',
    check: async (env) => {
      try {
        const url = new URL('/robots.txt', env.location.origin).href
        const res = await fetchWithTimeout(url, undefined, 3000)
        if (!res || !res.ok) return false
        const contentType = res.headers.get('content-type') ?? ''
        return contentType.includes('text/plain')
      } catch { return false }
    }
  },
  {
    label: 'valid-links',
    check: async (env) => {
      try {
        const anchors = Array.from(env.document.querySelectorAll('a'))
        const hrefs = anchors.map(a => a.getAttribute('href') ?? '').filter(Boolean)
        if (hrefs.length === 0) return true
        const sameOrigin = hrefs
          .map(href => {
            try { return new URL(href, env.location.href).href }
            catch { return null }
          })
          .filter(Boolean)
          .filter(href => new URL(href!).origin === env.location.origin)

        const candidates = (sameOrigin.length ? sameOrigin : hrefs.slice(0, 20)).slice(0, 20)
        const checks = await Promise.all(
          candidates.map(async href => {
            try {
              let res = await fetchWithTimeout(href!, { method: 'HEAD' }, 3000)
              if (!res || !res.ok) {
                res = await fetchWithTimeout(href!, { method: 'GET' }, 3000)
              }
              return Boolean(res) && res.ok
            } catch {
              return false
            }
          })
        );

        return checks.length > 0 ? checks.every(Boolean) : true
      } catch {
        return false
      }
    }
  }
];
