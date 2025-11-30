"use client"

import { useState, useRef } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { usePostModal } from "@/contexts/post-modal-context"
import { isPostLiked, addLikedPost, removeLikedPost } from "@/lib/storage"
import { PostWithTimestamp } from "@/lib/types"
import { MarkdownText } from "@/components/markdown-text"

// Register GSAP Flip plugin
gsap.registerPlugin(Flip)

interface PostProps {
  post: PostWithTimestamp
  'data-post-id'?: string
  isLast?: boolean
}

export function Post({ post, 'data-post-id': dataPostId, isLast = false }: PostProps) {
  const [liked, setLiked] = useState(() => isPostLiked(post.id))
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const { setActivePost } = usePostModal()

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

  const handlePostClick = () => {
    if (!imageRef.current) {
      setActivePost(post)
      return
    }

    // Capture initial state with GSAP Flip
    const state = Flip.getState(imageRef.current)

    // Set active post (this will render the modal)
    setActivePost(post)

    // Wait for modal to render, then animate
    requestAnimationFrame(() => {
      const modalImage = document.querySelector(`[data-modal-image="${post.id}"]`)
      if (modalImage) {
        Flip.from(state, {
          targets: modalImage,
          duration: 0.6,
          ease: "power2.inOut",
          scale: true,
          absolute: true,
        })
      }
    })
  }

  return (
    <Card
      ref={cardRef}
      data-post-card
      data-post-id={dataPostId}
      onClick={handlePostClick}
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
              ref={imageRef}
              src={post.imageUrl}
              alt=""
              data-feed-image={post.id}
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
  )
}
