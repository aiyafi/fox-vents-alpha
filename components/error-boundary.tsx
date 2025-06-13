"use client"

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <h2 className="text-lg font-medium text-foreground mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">Please try refreshing the page</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Refresh page
          </button>
        </div>
      )
    }

    return this.props.children
  }
} 