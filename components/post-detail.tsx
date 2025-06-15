"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import { addLikedPost, removeLikedPost, isPostLiked } from "@/lib/storage"
import { PostWithTimestamp } from "@/lib/types"
import { LinkText } from "@/components/link-text"

interface PostDetailProps {
  post: PostWithTimestamp
}

export function PostDetail({ post }: PostDetailProps) {
  // State
  const [liked, setLiked] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLDivElement>(null)

  // After mount in client, only then get from localStorage
  useEffect(() => {
    setLiked(isPostLiked(post.id))
  }, [post.id])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, x: -20 })
      tl.to(backButtonRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      })
    }

    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 })
      tl.to(
        contentRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      )
    }

    if (actionsRef.current) {
      gsap.set(actionsRef.current, { opacity: 0, y: 20 })
      tl.to(
        actionsRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.3"
      )
    }
  }, [])

  const handleLike = () => {
    const heartIcon = document.querySelector(".heart-icon")
    if (heartIcon) {
      gsap.to(heartIcon, {
        scale: 1.3,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
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

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Fox Thoughts",
          text: post.content.substring(0, 100) + "...",
          url,
        })
      } catch {
        navigator.clipboard.writeText(url)
      }
    } else {
      navigator.clipboard.writeText(url)
      const shareButton = document.querySelector(".share-button")
      if (shareButton) {
        gsap.to(shareButton, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        })
      }
    }
  }

  return (
    <div className="py-6 space-y-4">
      {/* Back & Timestamp */}
      <div
        ref={backButtonRef}
        className="px-4 flex items-center justify-between"
      >
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to feed
          </Button>
        </Link>
        <time className="text-sm text-muted-foreground">
          {post.timestamp}
        </time>
      </div>

      {/* Content */}
      <Card className="border-0 shadow-none rounded-none">
        <div ref={contentRef} className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="text-base leading-relaxed text-foreground">
              <LinkText text={post.content} />
            </div>

            {post.imageUrl && (
              <div className="pt-2">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            )}

            {post.videoUrl && (
              <div className="pt-2">
                <video
                  src={post.videoUrl}
                  controls
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="px-6 pb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className="h-10 px-4 text-muted-foreground hover:text-foreground"
          >
            <Heart
              className={`heart-icon w-4 h-4 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="share-button h-10 px-4 text-muted-foreground hover:text-foreground"
          >
            <Share2 className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}