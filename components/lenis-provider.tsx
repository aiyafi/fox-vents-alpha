"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with custom options
    const lenis = new Lenis({
      duration: 1.2, // Animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2, // Touch scroll multiplier
      infinite: false, // Disable infinite scroll
    })

    lenisRef.current = lenis

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Optional: Add to window for debugging
    if (typeof window !== 'undefined') {
      ;(window as any).lenis = lenis
    }

    // Cleanup function
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
} 