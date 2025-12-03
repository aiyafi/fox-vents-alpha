import { Navbar } from "@/components/navbar"
import { PostDetail } from "@/components/post-detail"
import { PageTransition } from "@/components/page-transition"
import { getPostById } from "@/lib/firestore"
import { stripMarkdown } from "@/lib/utils"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  try {
    const { id } = await params
    const post = await getPostById(id)
    
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
  } catch (error) {
    console.error('Error loading post:', error)
    notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  try {
    const { id } = await params
    const post = await getPostById(id)
    
    if (!post) {
      return {
        title: 'Post not found - FoxThoughts',
      }
    }

    const cleanContent = stripMarkdown(post.content)
    const words = cleanContent.split(/\s+/).slice(0, 5).join(' ')

    return {
      title: `${words}... on FoxThoughts`,
      description: cleanContent.substring(0, 160),
    }
  } catch {
    return {
      title: 'Post - FoxThoughts',
    }
  }
} 