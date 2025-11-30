"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import Link from 'next/link'
import { isPostLiked, addLikedPost, removeLikedPost } from "@/lib/storage"
import { PostWithTimestamp } from "@/lib/types"
import { MarkdownText } from "@/components/markdown-text"

interface PostProps {
  post: PostWithTimestamp
  'data-post-id'?: string
  isLast?: boolean
}

export function Post({ post, 'data-post-id': dataPostId, isLast = false }: PostProps) {
  const [liked, setLiked] = useState(() => isPostLiked(post.id))

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Heart animation
    const heartIcon = e.currentTarget.querySelector('.heart-icon')
    if (heartIcon) {
      gsap.to(heartIcon, {
        scale: 1.2,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "back.out(1.7)"
      })
    }

    if (liked) {
      removeLikedPost(post.id)
      setLiked(false)
    } else {
      addLikedPost(post.id)
      setLiked(true)
    }
  }

  return (
    <Link href={`/post/${post.id}`} className="block">
      <Card
        data-post-card
        data-post-id={dataPostId}
        className={`border-0 shadow-none rounded-none ${isLast ? '' : 'border-b'} hover:bg-muted/20 transition-colors cursor-pointer overflow-x-hidden`}
      >
        <div className="p-6 space-y-3">
          {/* Content with markdown support */}
          <div className="text-sm leading-relaxed text-foreground/90">
            <MarkdownText>{post.content}</MarkdownText>
          </div>

          {/* Media */}
          {post.imageUrl && (
            <div className="pt-2">
              <img
                src={post.imageUrl}
                alt=""
                style={{ viewTransitionName: `post-image-${post.id}` }}
                className="w-full rounded-md max-h-96 object-cover"
                loading="lazy"
              />
            </div>
          )}

          {post.videoUrl && (
            <div className="pt-2">
              <video
                src={post.videoUrl}
                controls
                className="w-full rounded-md max-h-96"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <Heart className={`heart-icon w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            <time className="text-xs text-muted-foreground/60">
              {post.timestamp}
            </time>
          </div>
        </div>
      </Card>
    </Link>
  )
}
