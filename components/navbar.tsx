"use client"

import { ThemeToggle } from "@/components/theme-toggle"
// atau gunakan yang advanced:
// import { ThemeToggleAdvanced as ThemeToggle } from "@/components/theme-toggle-advanced"
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Fox Thoughts
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
