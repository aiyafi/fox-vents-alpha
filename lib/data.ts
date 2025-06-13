import { collection, getDocs, doc, getDoc, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface Post {
  id: string;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  likeCount: number;
  createdAt: string;
}

export interface FirebasePost {
  id: string;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  likeCount: number;
  createdAt: Timestamp;
}

// Transform Firestore data for client components
function transformPostForClient(id: string, data: any): Post {
  return {
    id,
    content: data.content,
    imageUrl: data.imageUrl === "null" ? null : data.imageUrl,
    videoUrl: data.videoUrl === "null" ? null : data.videoUrl,
    likeCount: data.likeCount || 0,
    createdAt: data.createdAt.toDate().toISOString()
  }
}

// Format timestamp for display from ISO string
export function formatTimestamp(isoString: string): string {
  const now = new Date()
  const postDate = new Date(isoString)
  const diff = now.getTime() - postDate.getTime()
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return postDate.toLocaleDateString()
}

// Get all posts from Firestore
export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const posts: Post[] = []
    querySnapshot.forEach((doc) => {
      posts.push(transformPostForClient(doc.id, doc.data()))
    })
    
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Get single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const postRef = doc(db, 'posts', id)
    const postSnap = await getDoc(postRef)
    
    if (postSnap.exists()) {
      return transformPostForClient(postSnap.id, postSnap.data())
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}