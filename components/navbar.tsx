"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="border-b bg-background shadow-sm">
      <div className="container max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-medium text-foreground">quiet thoughts</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
