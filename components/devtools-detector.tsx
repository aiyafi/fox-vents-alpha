'use client'

import { useEffect } from 'react'

export function DevToolsDetector() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Dynamic import to avoid SSR issues
    import('disable-devtool').then((module) => {
      const DisableDevtool = module.default

      DisableDevtool({
        // Redirect to about:blank when DevTools is detected
        url: 'about:blank',
        // Disable right-click context menu
        disableMenu: true,
        // Disable select text
        disableSelect: false,
        // Disable copy
        disableCopy: false,
        // Disable cut
        disableCut: false,
        // Disable paste
        disablePaste: false,
        // Clear console logs
        clearLog: true,
        // Interval to check DevTools status (ms)
        interval: 500,
        // Disable keyboard shortcuts (F12, Ctrl+Shift+I, etc)
        disableIframeParents: true,
        // Callback when DevTools is opened
        ondevtoolopen: () => {
          window.location.href = 'about:blank'
        },
      })
    })
  }, [])

  return null
}
