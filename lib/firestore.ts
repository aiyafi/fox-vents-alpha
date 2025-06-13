import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  orderBy, 
  query, 
  updateDoc,
  increment
} from 'firebase/firestore'
import { db } from './firebase'
import { Post, PostWithTimestamp } from './types'

// Collection reference
const postsCollection = collection(db, 'posts')

// Format timestamp for display
function formatTimestamp(timestamp: any): string {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate()
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

// Get all posts
export async function getAllPosts(): Promise<PostWithTimestamp[]> {
  try {
    const q = query(postsCollection, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const posts: PostWithTimestamp[] = []
    
    querySnapshot.forEach((doc) => {
      const { id, createdAt, ...data } = doc.data() as Post & { id?: string }
      posts.push({
        id: doc.id,
        ...data,
        timestamp: formatTimestamp(createdAt)
      })
    })
    
    return posts
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}

// Get single post by ID
export async function getPostById(id: string): Promise<PostWithTimestamp | null> {
  try {
    const docRef = doc(db, 'posts', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const { id, createdAt, ...data } = docSnap.data() as Post & { id?: string }
      return {
        id: docSnap.id,
        ...data,
        timestamp: formatTimestamp(createdAt)
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting post:', error)
    return null
  }
} 