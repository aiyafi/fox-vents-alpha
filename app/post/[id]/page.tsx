import { Navbar } from "@/components/navbar"
import { PostDetail } from "@/components/post-detail"
import { PageTransition } from "@/components/page-transition"
import { getPostById } from "@/lib/utils"
import { notFound } from "next/navigation"

export default function PostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id)
  const post = getPostById(postId)
  
  if (!post) {
    notFound()
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-2xl mx-auto px-0">
          <PostDetail post={post} />
        </main>
      </div>
    </PageTransition>
  )
} 