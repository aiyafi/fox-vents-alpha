"use client"

import { useEffect, useRef, useState } from "react"
import { X, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { usePostModal } from "@/contexts/post-modal-context"
import { isPostLiked, addLikedPost, removeLikedPost } from "@/lib/storage"
import { MarkdownText } from "@/components/markdown-text"

// Register GSAP Flip plugin
gsap.registerPlugin(Flip)

export function PostModal() {
  const { activePost, setActivePost } = usePostModal()
  const [liked, setLiked] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activePost) {
      setLiked(isPostLiked(activePost.id))
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePost) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePost])

  useEffect(() => {
    if (!activePost || !modalRef.current) return

    // Animate modal entrance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: "power3.out" }
      )
    }
  }, [activePost])

  const handleClose = () => {
    if (!modalRef.current) return

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setActivePost(null)
    })
  }

  const handleLike = () => {
    if (!activePost) return

    const heartIcon = document.querySelector(".modal-heart-icon")
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
      removeLikedPost(activePost.id)
      setLiked(false)
    } else {
      addLikedPost(activePost.id)
      setLiked(true)
    }
  }

  const handleShare = async () => {
    if (!activePost) return

    const url = `${window.location.origin}/post/${activePost.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Fox Thoughts",
          text: activePost.content.substring(0, 100) + "...",
          url,
        })
      } catch {
        navigator.clipboard.writeText(url)
      }
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  if (!activePost) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-modal-content={activePost.id}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image */}
          {activePost.imageUrl && (
            <div className="relative w-full">
              <img
                src={activePost.imageUrl}
                alt=""
                data-modal-image={activePost.id}
                className="w-full h-auto max-h-[60vh] object-contain bg-muted"
              />
            </div>
          )}

          {/* Video */}
          {activePost.videoUrl && (
            <div className="relative w-full">
              <video
                src={activePost.videoUrl}
                controls
                className="w-full h-auto max-h-[60vh] object-contain bg-muted"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="text-base leading-relaxed text-foreground">
              <MarkdownText>{activePost.content}</MarkdownText>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className="h-10 px-4 text-muted-foreground hover:text-foreground"
                >
                  <Heart
                    className={`modal-heart-icon w-4 h-4 ${
                      liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="h-10 px-4 text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <time className="text-sm text-muted-foreground">
                {activePost.timestamp}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
