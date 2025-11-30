import { Timestamp, DocumentSnapshot } from 'firebase/firestore'

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

// Pagination types
export interface PaginatedResult {
  posts: PostWithTimestamp[]
  lastVisible: DocumentSnapshot | null
  hasMore: boolean
}

export interface PaginationState {
  posts: PostWithTimestamp[]
  lastVisible: DocumentSnapshot | null
  hasMore: boolean
  loading: boolean
  loadingMore: boolean
  error: string | null
} 