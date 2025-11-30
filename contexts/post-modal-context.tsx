"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { PostWithTimestamp } from '@/lib/types'

interface PostModalContextType {
  activePost: PostWithTimestamp | null
  setActivePost: (post: PostWithTimestamp | null) => void
}

const PostModalContext = createContext<PostModalContextType | undefined>(undefined)

export function PostModalProvider({ children }: { children: ReactNode }) {
  const [activePost, setActivePost] = useState<PostWithTimestamp | null>(null)

  return (
    <PostModalContext.Provider value={{ activePost, setActivePost }}>
      {children}
    </PostModalContext.Provider>
  )
}

export function usePostModal() {
  const context = useContext(PostModalContext)
  if (!context) {
    throw new Error('usePostModal must be used within PostModalProvider')
  }
  return context
}
