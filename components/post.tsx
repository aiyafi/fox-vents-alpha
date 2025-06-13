"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface PostProps {
  post: {
    id: number
    content: string
    image?: string
    video?: string
    likes: number
    timestamp: string
  }
}

export function Post({ post }: PostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
      <div className="p-4">
        <p className="text-card-foreground whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.image && (
        <div className="w-full">
          <img src={post.image || "/placeholder.svg"} alt="Post attachment" className="w-full h-auto" />
        </div>
      )}

      {post.video && (
        <div className="w-full">
          <video src={post.video} controls className="w-full h-auto" />
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-between border-t border-border">
        <button onClick={handleLike} className="flex items-center gap-1.5 focus:outline-none">
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          <span className={`text-sm ${liked ? "text-red-500" : "text-muted-foreground"}`}>{likeCount}</span>
        </button>

        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
      </div>
    </div>
  )
}
