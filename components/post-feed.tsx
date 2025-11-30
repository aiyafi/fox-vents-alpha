"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Post } from "@/components/post"
import { PostFeedSkeleton } from "@/components/loading-skeleton"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EndOfFeed } from "@/components/end-of-feed"
import { PostModal } from "@/components/post-modal"
import { PostModalProvider } from "@/contexts/post-modal-context"
import { getInitialPosts, getNextPosts } from "@/lib/firestore"
import { PostWithTimestamp } from "@/lib/types"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { DocumentSnapshot } from "firebase/firestore"
import { gsap } from "gsap"

const PAGE_SIZE = 10

export function PostFeed() {
  const [posts, setPosts] = useState<PostWithTimestamp[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)
  const newPostsRef = useRef<Set<string>>(new Set())

  // Load initial posts
  useEffect(() => {
    async function fetchInitialPosts() {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching initial posts...')
        const result = await getInitialPosts(PAGE_SIZE)
        console.log('Initial posts result:', result)
        setPosts(result.posts)
        setLastVisible(result.lastVisible)
        setHasMore(result.hasMore)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err instanceof Error ? err.message : 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchInitialPosts()
  }, [])

  // Load more posts
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !lastVisible) return

    try {
      setLoadingMore(true)
      setError(null)
      console.log('Loading more posts...')
      
      const result = await getNextPosts(PAGE_SIZE, lastVisible)
      console.log('Next posts result:', result)
      
      if (result.posts.length > 0) {
        // Track new posts for animation
        result.posts.forEach(post => newPostsRef.current.add(post.id))
        
        setPosts(prev => [...prev, ...result.posts])
        setLastVisible(result.lastVisible)
        setHasMore(result.hasMore)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error fetching more posts:', err)
      setError(err instanceof Error ? err.message : 'Failed to load more posts')
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, lastVisible])

  // Infinite scroll hook
  const { sentinelRef } = useInfiniteScroll(loadMore, {
    threshold: 0.1,
    rootMargin: '200px',
    enabled: hasMore && !loadingMore && !loading,
  })

  // Animate new posts
  useEffect(() => {
    if (newPostsRef.current.size === 0) return

    const newPostElements = Array.from(newPostsRef.current).map(id =>
      document.querySelector(`[data-post-id="${id}"]`)
    ).filter(Boolean)

    if (newPostElements.length > 0) {
      gsap.fromTo(
        newPostElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          onComplete: () => {
            newPostsRef.current.clear()
          }
        }
      )
    }
  }, [posts])

  if (loading) {
    return <PostFeedSkeleton />
  }

  if (error && posts.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <p className="text-muted-foreground">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <p className="text-muted-foreground">No posts yet</p>
      </div>
    )
  }

  return (
    <PostModalProvider>
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-0">
          {posts.map((post, index) => (
            <Post key={post.id} post={post} data-post-id={post.id} isLast={index === posts.length - 1} />
          ))}
        </div>

        {/* Sentinel element for infinite scroll */}
        <div ref={sentinelRef} className="h-px" />

        {/* Loading states */}
        {loadingMore && <LoadingSpinner />}
        
        {/* Error state for batch loading */}
        {error && posts.length > 0 && (
          <div className="w-full flex justify-center items-center py-8">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">{error}</p>
              <button
                onClick={loadMore}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}
        
        {/* End of feed */}
        {!hasMore && !loadingMore && <EndOfFeed />}
      </div>

      {/* Expandable Post Modal */}
      <PostModal />
    </PostModalProvider>
  )
}
