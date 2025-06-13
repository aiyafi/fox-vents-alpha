import { PostFeed } from "@/components/post-feed"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-2xl mx-auto px-4 py-6">
        <PostFeed />
      </main>
    </div>
  )
}
