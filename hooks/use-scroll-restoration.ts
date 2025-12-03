"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SCROLL_POSITIONS = new Map<string, number>()

export function useScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Restore scroll position when navigating back to a page
    const savedPosition = SCROLL_POSITIONS.get(pathname)
    if (savedPosition !== undefined) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition)
      })
    }

    // Save scroll position before navigating away
    const handleScroll = () => {
      SCROLL_POSITIONS.set(pathname, window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])
}
