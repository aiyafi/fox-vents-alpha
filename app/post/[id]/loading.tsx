import { Navbar } from "@/components/navbar"
import { PostDetailSkeleton } from "@/components/loading-skeleton"
import { PageTransition } from "@/components/page-transition"

export default function Loading() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container max-w-2xl mx-auto px-0">
                    <PostDetailSkeleton />
                </main>
            </div>
        </PageTransition>
    )
} 