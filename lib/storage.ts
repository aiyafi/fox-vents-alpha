// Manage liked posts in localStorage
export function getLikedPosts(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const liked = localStorage.getItem('liked-posts')
    return liked ? JSON.parse(liked) : []
  } catch {
    return []
  }
}

export function addLikedPost(postId: string): void {
  if (typeof window === 'undefined') return
  
  const liked = getLikedPosts()
  if (!liked.includes(postId)) {
    liked.push(postId)
    localStorage.setItem('liked-posts', JSON.stringify(liked))
  }
}

export function removeLikedPost(postId: string): void {
  if (typeof window === 'undefined') return
  
  const liked = getLikedPosts()
  const filtered = liked.filter(id => id !== postId)
  localStorage.setItem('liked-posts', JSON.stringify(filtered))
}

export function isPostLiked(postId: string): boolean {
  return getLikedPosts().includes(postId)
}

// Generate anonymous user ID
export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return ''
  
  let userId = localStorage.getItem('anonymous-user-id')
  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem('anonymous-user-id', userId)
  }
  return userId
}

// Add function untuk menghitung total likes
export function getTotalLikes(postId: string): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const allLikedPosts = localStorage.getItem('all-liked-posts')
    const likedPosts = allLikedPosts ? JSON.parse(allLikedPosts) : {}
    return likedPosts[postId] || 0
  } catch {
    return 0
  }
}

// Add function untuk increment likes
export function incrementLikes(postId: string): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const allLikedPosts = localStorage.getItem('all-liked-posts')
    const likedPosts = allLikedPosts ? JSON.parse(allLikedPosts) : {}
    
    likedPosts[postId] = (likedPosts[postId] || 0) + 1
    localStorage.setItem('all-liked-posts', JSON.stringify(likedPosts))
    
    return likedPosts[postId]
  } catch {
    return 0
  }
}

// Add function untuk decrement likes
export function decrementLikes(postId: string): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const allLikedPosts = localStorage.getItem('all-liked-posts')
    const likedPosts = allLikedPosts ? JSON.parse(allLikedPosts) : {}
    
    likedPosts[postId] = Math.max((likedPosts[postId] || 0) - 1, 0)
    localStorage.setItem('all-liked-posts', JSON.stringify(likedPosts))
    
    return likedPosts[postId]
  } catch {
    return 0
  }
} 