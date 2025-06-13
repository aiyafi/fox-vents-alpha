"use client"

import { useState, useRef } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import { useRouter } from 'next/navigation'
import { formatTimestamp, type Post as PostType } from "@/lib/data"
import { isPostLiked, addLikedPost, removeLikedPost, getTotalLikes, incrementLikes, decrementLikes } from "@/lib/storage"
import { PostWithTimestamp } from "@/lib/types"

interface PostProps {
  post: PostWithTimestamp
}

export function Post({ post }: PostProps) {
  const [liked, setLiked] = useState(() => isPostLiked(post.id))
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const handlePostClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!cardRef.current) return

    // Page exit animation
    const tl = gsap.timeline({
      onComplete: () => {
        router.push(`/post/${post.id}`)
      }
    })

    // Animate current post
    tl.to(cardRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    })
      .to(cardRef.current, {
        opacity: 0.7,
        duration: 0.1
      }, "-=0.1")

    // Animate other posts out
    const otherPosts = document.querySelectorAll('[data-post-card]')
    otherPosts.forEach((otherPost, index) => {
      if (otherPost !== cardRef.current) {
        gsap.to(otherPost, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          delay: index * 0.02,
          ease: "power2.out"
        })
      }
    })
  }

  return (
    <Card
      ref={cardRef}
      data-post-card
      className="border-0 shadow-none rounded-none border-b last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer overflow-x-hidden"
      onClick={handlePostClick}
    >
      <div className="p-6 space-y-3">
        {/* Content */}
        <p className="text-sm leading-relaxed text-foreground/90 break-words whitespace-pre-wrap">
          {post.content}
        </p>

        {/* Media */}
        {post.imageUrl && (
          <div className="pt-2">
            <img
              src={post.imageUrl}
              alt=""
              className="w-full rounded-md max-h-96 object-cover"
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
  )
}
