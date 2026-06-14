import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detect touch device — don't render custom cursor on touch
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const el = cursorRef.current
    if (!el) return

    // Enable custom cursor styling on html tag (CSS will hide native cursor)
    document.documentElement.classList.add('custom-cursor-active')

    // Smooth follow using GSAP quickTo (avoids layout thrash)
    const xTo = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power2.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)

      // Hide cursor when over hero to avoid visual conflict with hero cursor
      const overHero = e.target.closest && e.target.closest('#hero')
      if (overHero) el.classList.add('is-hidden')
      else el.classList.remove('is-hidden')
    }

    const handleMouseEnterWindow = () => el.classList.remove('is-hidden')
    const handleMouseLeaveWindow = () => el.classList.add('is-hidden')

    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor-pointer], .interactive-hover'
    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = target && target.closest && target.closest(interactiveSelector)
      if (isInteractive) el.classList.add('is-hovered')
      else el.classList.remove('is-hovered')
    }

    // Keyboard focus support (accessibility): show pointer state when focusing interactive elements
    const handleFocusIn = (e) => {
      if (e.target && e.target.closest && e.target.closest(interactiveSelector)) el.classList.add('is-hovered')
    }
    const handleFocusOut = () => el.classList.remove('is-hovered')

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('focusin', handleFocusIn)
    window.addEventListener('focusout', handleFocusOut)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('focusout', handleFocusOut)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return <div ref={cursorRef} className="global-custom-cursor is-hidden" />
}
