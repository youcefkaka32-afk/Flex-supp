// Global safeguard: strip 'Upgrade-Insecure-Requests' from cross-origin requests
;(function () {
  if (typeof window === 'undefined') return
  try {
    const host = location.hostname || ''
    if (!['localhost', '127.0.0.1'].includes(host) && !host.startsWith('192.168.')) {
      return
    }
  } catch (e) {
    return
  }
  try {
    const originalFetch = window.fetch.bind(window)

    window.fetch = function (input, init) {
      try {
        let url
        let options = init ? { ...init } : {}

        // Normalize headers into a Headers instance
        const headers = new Headers(options.headers || {})

        if (input instanceof Request) {
          url = input.url
          // Merge headers from the Request instance
          const reqHeaders = new Headers(input.headers)
          for (const [k, v] of reqHeaders.entries()) {
            if (!headers.has(k)) headers.append(k, v)
          }
          // Ensure method/body/mode etc are preserved unless overridden
          options.method = options.method || input.method
          if (options.body === undefined) options.body = input.body
          options.mode = options.mode || input.mode
          options.credentials = options.credentials || input.credentials
          options.cache = options.cache || input.cache
          options.redirect = options.redirect || input.redirect
          options.referrer = options.referrer || input.referrer
          options.referrerPolicy = options.referrerPolicy || input.referrerPolicy
          options.integrity = options.integrity || input.integrity
        } else {
          url = String(input)
        }

        // If cross-origin, remove the problematic header
        try {
          const reqUrl = new URL(url, location.href)
          if (reqUrl.origin !== location.origin) {
            headers.delete('Upgrade-Insecure-Requests')
            headers.delete('upgrade-insecure-requests')
          }
        } catch (e) {
          // If URL parsing fails, skip special handling
        }

        options.headers = headers
        return originalFetch(url, options)
      } catch (e) {
        return originalFetch.apply(this, arguments)
      }
    }
  } catch (e) {
    // Ignore if fetch isn't available or override fails
  }

  // Patch XHR to ignore attempts to set the header for cross-origin requests
  try {
    if (typeof XMLHttpRequest !== 'undefined') {
      const origOpen = XMLHttpRequest.prototype.open
      XMLHttpRequest.prototype.open = function (method, url) {
        try {
          this.__req_url = url
        } catch (e) {}
        return origOpen.apply(this, arguments)
      }

      const origSetHeader = XMLHttpRequest.prototype.setRequestHeader
      XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        try {
          if (name && name.toLowerCase() === 'upgrade-insecure-requests') {
            // If we have the request url, ensure it's cross-origin before ignoring
            if (this.__req_url) {
              try {
                const u = new URL(this.__req_url, location.href)
                if (u.origin !== location.origin) return
              } catch (e) {
                return
              }
            } else {
              return
            }
          }
        } catch (e) {}
        return origSetHeader.apply(this, arguments)
      }
    }
  } catch (e) {
    // ignore
  }
})()

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Chatbase loader removed — previously injected a third-party widget that
// could hide the page by toggling `html.__cb_widget_active`. Removal
// prevents the production black-screen issue.

