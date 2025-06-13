"use client"

import { useState, useRef } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import { useRouter } from 'next/navigation'

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
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
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

    // Animate current page out
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
      className="border-0 shadow-none rounded-none border-b last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="p-6 space-y-3">
        {/* Content */}
        <p className="text-sm leading-relaxed text-foreground/90">
          {post.content}
        </p>

        {/* Media */}
        {post.image && (
          <div className="pt-2">
            <img 
              src={post.image || "/placeholder.svg"} 
              alt="" 
              className="w-full rounded-md max-h-96 object-cover"
            />
          </div>
        )}

        {post.video && (
          <div className="pt-2">
            <video 
              src={post.video} 
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
            <Heart className={`heart-icon w-3.5 h-3.5 mr-1.5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className={`text-xs tabular-nums ${liked ? "text-red-500" : ""}`}>
              {likeCount}
            </span>
          </Button>

          <time className="text-xs text-muted-foreground/60">
            {post.timestamp}
          </time>
        </div>
      </div>
    </Card>
  )
}
