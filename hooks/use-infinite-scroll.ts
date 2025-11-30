import { useEffect, useRef, RefObject } from 'react'

export interface UseInfiniteScrollOptions {
  threshold?: number      // Intersection threshold (default: 0.1)
  rootMargin?: string    // Root margin for early triggering (default: "200px")
  enabled?: boolean      // Enable/disable observer (default: true)
}

export interface UseInfiniteScrollReturn {
  sentinelRef: RefObject<HTMLDivElement | null>  // Ref for sentinel element
  isIntersecting: boolean                        // Whether sentinel is visible
}

/**
 * Custom hook for implementing infinite scroll using Intersection Observer API
 * 
 * @param onIntersect - Callback function to trigger when sentinel enters viewport
 * @param options - Configuration options for the Intersection Observer
 * @returns Object containing sentinel ref and intersection state
 * 
 * @example
 * ```tsx
 * const { sentinelRef } = useInfiniteScroll(() => {
 *   loadMorePosts()
 * }, { threshold: 0.1, rootMargin: '200px' })
 * 
 * return (
 *   <div>
 *     {posts.map(post => <Post key={post.id} post={post} />)}
 *     <div ref={sentinelRef} />
 *   </div>
 * )
 * ```
 */
export function useInfiniteScroll(
  onIntersect: () => void,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn {
  const {
    threshold = 0.1,
    rootMargin = '200px',
    enabled = true,
  } = options

  const sentinelRef = useRef<HTMLDivElement>(null)
  const isIntersectingRef = useRef(false)

  useEffect(() => {
    // Don't create observer if disabled
    if (!enabled) {
      return
    }

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver is not supported in this browser')
      return
    }

    const sentinel = sentinelRef.current
    
    // Don't create observer if sentinel doesn't exist yet
    if (!sentinel) {
      return
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        
        // Update intersection state
        isIntersectingRef.current = entry.isIntersecting
        
        // Trigger callback when sentinel enters viewport
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    // Start observing
    observer.observe(sentinel)

    // Cleanup on unmount or when dependencies change
    return () => {
      observer.disconnect()
    }
  }, [onIntersect, threshold, rootMargin, enabled])

  return {
    sentinelRef,
    isIntersecting: isIntersectingRef.current,
  }
}
