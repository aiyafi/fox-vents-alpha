import { PostFeed } from "@/components/post-feed"
import { Navbar } from "@/components/navbar"
import { PageTransition } from "@/components/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-2xl mx-auto px-0">
          <PostFeed />
        </main>
      </div>
    </PageTransition>
  )
}
