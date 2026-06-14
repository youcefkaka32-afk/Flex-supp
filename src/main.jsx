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

// Robust Chatbase loader: if the embed script fails to load for any reason
// (CORS/preflight or network issues), attempt a fallback that fetches the
// script via the patched `fetch` (so the problematic header is removed)
// and injects it as a blob script. This will only be attempted if the
// normal embed hasn't initialized after a short timeout.
(function setupChatbaseFallback() {
  if (typeof window === 'undefined') return
  try {
    const host = location.hostname || ''
    if (!['localhost', '127.0.0.1'].includes(host) && !host.startsWith('192.168.')) {
      return
    }
  } catch (e) {
    return
  }

  const CHATBASE_ID = 'sHaahB1RfteTCk55rvx1L'
  const CHATBASE_SRC = 'https://www.chatbase.co/embed.min.js'

  function isChatbaseLoaded() {
    try {
      // chatbase exposes a function; when initialized it will return "initialized"
      return typeof window.chatbase === 'function' && window.chatbase('getState') === 'initialized'
    } catch (e) {
      return false
    }
  }

  function tryInjectScript() {
    // avoid injecting twice
    if (document.getElementById(CHATBASE_ID)) return true
    const s = document.createElement('script')
    s.src = CHATBASE_SRC
    s.id = CHATBASE_ID
    s.async = true
    s.onload = () => { console.log('[Chatbase] embed script loaded') }
    s.onerror = async () => {
      console.warn('[Chatbase] script tag load failed — attempting fetch+blob fallback')
      try {
        // fetch via our patched fetch (will strip problematic headers)
        const res = await fetch(CHATBASE_SRC, { mode: 'cors' })
        if (!res.ok) throw new Error('fetch failed')
        const text = await res.text()
        const blob = new Blob([text], { type: 'application/javascript' })
        const blobUrl = URL.createObjectURL(blob)
        const s2 = document.createElement('script')
        s2.src = blobUrl
        s2.async = true
        s2.onload = () => { URL.revokeObjectURL(blobUrl); console.log('[Chatbase] fallback script executed') }
        s2.onerror = (err) => { console.error('[Chatbase] fallback execution failed', err) }
        document.body.appendChild(s2)
      } catch (err) {
        console.error('[Chatbase] fallback failed', err)
      }
    }
    document.body.appendChild(s)
    return true
  }

  // Wait until load (index.html also tries to append script on load). If
  // after 2s the embed hasn't initialized, inject our script and fallback.
  const onReady = () => {
    setTimeout(() => {
      if (!isChatbaseLoaded()) {
        console.log('[Chatbase] not initialized — injecting/fallback')
        tryInjectScript()
      } else {
        console.log('[Chatbase] already initialized')
      }
    }, 2000)
  }

  if (document.readyState === 'complete') onReady()
  else window.addEventListener('load', onReady)
})()
