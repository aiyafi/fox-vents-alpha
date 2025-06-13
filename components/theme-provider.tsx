'use client'

import * as React from 'react'
import { useEffect } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { gsap } from 'gsap'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    // Prevent initial flash
    document.documentElement.classList.add('theme-transition-disable')
    
    // Enable transitions after mount
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition-disable')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
