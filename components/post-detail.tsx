"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"

interface PostDetailProps {
  post: {
    id: number
    content: string
    image?: string
    video?: string
    likes: number
    timestamp: string
  }
}

export function PostDetail({ post }: PostDetailProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const contentRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Stagger animation for post detail elements
    const tl = gsap.timeline({ delay: 0.2 })

    // Back button animation
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, x: -20 })
      tl.to(backButtonRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power3.out"
      })
    }

    // Content animation
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 })
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2")
    }

    // Actions animation
    if (actionsRef.current) {
      gsap.set(actionsRef.current, { opacity: 0, y: 20 })
      tl.to(actionsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.3")
    }
  }, [])

  const handleLike = () => {
    // Like animation
    const heartIcon = document.querySelector('.heart-icon')
    if (heartIcon) {
      gsap.to(heartIcon, {
        scale: 1.3,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }

    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleShare = async () => {
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiet Thoughts',
          text: post.content.substring(0, 100) + '...',
          url: url,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url)
      
      // Show copied feedback
      const shareButton = document.querySelector('.share-button')
      if (shareButton) {
        gsap.to(shareButton, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        })
      }
    }
  }

  return (
    <div className="py-6 space-y-4">
      {/* Back Button */}
      <div ref={backButtonRef} className="px-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to feed
          </Button>
        </Link>
      </div>

      {/* Post Content */}
      <Card className="border-0 shadow-none rounded-none">
        <div ref={contentRef} className="p-6 space-y-4">
          {/* Main Content */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-foreground">
              {post.content}
            </p>

            {/* Media */}
            {post.image && (
              <div className="pt-2">
                <img 
                  src={post.image || "/placeholder.svg"} 
                  alt="" 
                  className="w-full rounded-lg max-h-[500px] object-cover"
                />
              </div>
            )}

            {post.video && (
              <div className="pt-2">
                <video 
                  src={post.video} 
                  controls 
                  className="w-full rounded-lg max-h-[500px]"
                />
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-border/30">
            <time className="text-sm text-muted-foreground">
              {post.timestamp}
            </time>
          </div>
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="h-10 px-4 text-muted-foreground hover:text-foreground"
            >
              <Heart className={`heart-icon w-4 h-4 mr-2 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              <span className={`text-sm tabular-nums ${liked ? "text-red-500" : ""}`}>
                {likeCount} {likeCount === 1 ? 'like' : 'likes'}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="share-button h-10 px-4 text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4 mr-2" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 