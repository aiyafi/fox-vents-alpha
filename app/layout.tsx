import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LenisProvider } from "@/components/lenis-provider"
import { DisclaimerDialog } from "@/components/disclaimer-dialog"
import { DevToolsDetector } from "@/components/devtools-detector"

export const metadata = {
  title: "Home - FoxThoughts",
  description: "A quiet place for K9Fox to drop crumbs — honest thoughts, quietly placed.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LenisProvider>
            <DevToolsDetector />
            <DisclaimerDialog />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
