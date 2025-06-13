"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export function ThemeToggleAdvanced() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const createRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current || !rippleRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    
    gsap.set(rippleRef.current, {
      width: size,
      height: size,
      left: e.clientX - rect.left - size / 2,
      top: e.clientY - rect.top - size / 2,
      scale: 0,
      opacity: 0.3
    })

    gsap.to(rippleRef.current, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })
  }

  const handleThemeChange = (e: React.MouseEvent) => {
    if (isAnimating || !iconRef.current || !buttonRef.current) return
    
    setIsAnimating(true)
    createRipple(e)

    // Complex animation sequence
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    })

    // Button bounce
    tl.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.out"
    })

    // Icon flip and scale
    tl.to(iconRef.current, {
      rotationY: 90,
      scale: 0.7,
      duration: 0.15,
      ease: "power2.inOut"
    }, "-=0.05")

    // Change theme at midpoint
    tl.call(() => {
      setTheme(theme === "dark" ? "light" : "dark")
    })

    // Icon flip back with bounce
    tl.to(iconRef.current, {
      rotationY: 0,
      scale: 1.1,
      duration: 0.15,
      ease: "back.out(2)"
    })

    // Button and icon settle
    tl.to([buttonRef.current, iconRef.current], {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.1")
  }

  // Theme change animation
  useEffect(() => {
    if (mounted && iconRef.current) {
      gsap.fromTo(iconRef.current, 
        { 
          rotationY: -180,
          scale: 0.5,
          opacity: 0
        },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      )
    }
  }, [theme, mounted])

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="w-8 h-8 p-0 opacity-0" />
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={handleThemeChange}
        disabled={isAnimating}
        className="relative overflow-hidden w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {/* Ripple effect */}
        <div
          ref={rippleRef}
          className="absolute rounded-full bg-current pointer-events-none"
          style={{ opacity: 0 }}
        />
        
        {/* Icon container */}
        <div ref={iconRef} className="flex items-center justify-center relative z-10">
          {theme === "dark" ? 
            <Sun className="h-3.5 w-3.5" /> : 
            <Moon className="h-3.5 w-3.5" />
          }
        </div>
      </Button>
    </div>
  )
} 