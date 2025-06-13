"use client"

import { Post } from "@/components/post"
import { getAllPosts } from "@/lib/utils"

export function PostFeed() {
  const posts = getAllPosts()
  
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
