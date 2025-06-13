"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Page enter animation
    const tl = gsap.timeline()
    
    // Set initial state
    gsap.set(containerRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95
    })

    // Animate in
    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out"
    })

  }, [pathname])

  return (
    <div 
      ref={containerRef}
      className="w-full"
    >
      {children}
    </div>
  )
} 