import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

/**
 * Resets scroll to the top whenever the route's pathname changes.
 *
 * Triggers on `pathname` only — not the full `location` — so navigating
 * to in-page anchors (`/projects#project-variant-labs`, `#book-3`, etc.)
 * still scrolls to the anchor instead of jumping to the top.
 *
 * Uses instant scroll (no smooth) because animating from the bottom of
 * one page to the top of another is jarring on long pages, especially
 * on mobile where the address bar resizes the viewport mid-animation.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
