export function PostSkeleton() {
  return (
    <div className="p-6 space-y-3 border-b border-border/30 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
      
      <div className="h-48 bg-muted rounded-md"></div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-muted rounded w-16"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
      </div>
    </div>
  )
}

export function PostFeedSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  )
} 