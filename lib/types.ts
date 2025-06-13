import { Timestamp } from 'firebase/firestore'

export interface Post {
  id: string
  content: string
  imageUrl?: string | null
  videoUrl?: string | null
  createdAt: Timestamp
}

export interface PostWithTimestamp {
  id: string
  content: string
  imageUrl?: string | null
  videoUrl?: string | null
  timestamp: string  // Only the formatted timestamp, no createdAt
} 