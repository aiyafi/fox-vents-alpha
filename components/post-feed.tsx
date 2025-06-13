"use client"

import { useState, useEffect } from "react"
import { Post } from "@/components/post"
import { PostFeedSkeleton } from "@/components/loading-skeleton"
import { getAllPosts } from "@/lib/firestore"
import { PostWithTimestamp } from "@/lib/types"

export function PostFeed() {
  const [posts, setPosts] = useState<PostWithTimestamp[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)
        const fetchedPosts = await getAllPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        setError('Failed to load posts')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <PostFeedSkeleton />
  }

  if (error) {
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-0">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
