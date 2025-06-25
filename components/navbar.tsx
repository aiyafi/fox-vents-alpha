"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { SquareUserRound } from "lucide-react"
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
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link href="https://thoughtsboard.yafff.tech/" target="_blank">
            <SquareUserRound className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  )
}
