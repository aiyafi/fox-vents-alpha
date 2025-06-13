"use client"

import { Post } from "@/components/post"

// Mock data for posts
const posts = [
  {
    id: 1,
    content:
      "Sometimes I feel like I'm not doing enough with my life. Everyone around me seems to be achieving so much more. I know I shouldn't compare, but it's hard not to.",
    image: "/placeholder.svg?height=400&width=600",
    likes: 24,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    content:
      "I finally stood up for myself today at work when my colleague tried to take credit for my project. My heart was racing, but I did it. Small victory.",
    likes: 56,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    content:
      "I miss the person I used to be before anxiety took over my life. Trying to find my way back to that version of myself.",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: 103,
    timestamp: "Yesterday",
  },
  {
    id: 4,
    content:
      "Does anyone else feel completely overwhelmed by the state of the world right now? It's like there's too much happening and I don't know how to process it all.",
    likes: 89,
    timestamp: "2 days ago",
  },
]

export function PostFeed() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
