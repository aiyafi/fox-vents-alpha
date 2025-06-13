"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    if (!iconRef.current || !buttonRef.current) return

    // Button press animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    })

    // Icon rotation and fade animation
    const tl = gsap.timeline()
    
    tl.to(iconRef.current, {
      rotateY: 90,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.inOut"
    })
    .call(() => {
      // Change theme in the middle of animation
      setTheme(theme === "dark" ? "light" : "dark")
    })
    .to(iconRef.current, {
      rotateY: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut"
    })
  }

  // Animate icon when theme changes
  useEffect(() => {
    if (mounted && iconRef.current) {
      gsap.fromTo(iconRef.current, 
        { 
          rotateY: -90,
          scale: 0.8,
          opacity: 0
        },
        {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }
      )
    }
  }, [theme, mounted])

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="w-8 h-8 p-0 opacity-0" />
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <div ref={iconRef} className="flex items-center justify-center">
        {theme === "dark" ? 
          <Sun className="h-3.5 w-3.5" /> : 
          <Moon className="h-3.5 w-3.5" />
        }
      </div>
    </Button>
  )
}
