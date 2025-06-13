import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data (move this to a separate file later)
export const posts = [
  {
    id: 1,
    content: "Sometimes I feel like I'm not doing enough with my life. Everyone around me seems to be achieving so much more. I know I shouldn't compare, but it's hard not to.",
    image: "/placeholder.svg?height=400&width=600",
    likes: 24,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    content: "I finally stood up for myself today at work when my colleague tried to take credit for my project. My heart was racing, but I did it. Small victory.",
    likes: 56,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    content: "I miss the person I used to be before anxiety took over my life. Trying to find my way back to that version of myself.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: 103,
    timestamp: "Yesterday",
  },
  {
    id: 4,
    content: "Does anyone else feel completely overwhelmed by the state of the world right now? It's like there's too much happening and I don't know how to process it all.",
    likes: 89,
    timestamp: "2 days ago",
  },
]

export function getAllPosts() {
  return posts
}

export function getPostById(id: number) {
  return posts.find(post => post.id === id) || null
}
