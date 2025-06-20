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

export function PostDetailSkeleton() {
  return (
    <div className="py-6 space-y-4">
      {/* Back & Timestamp Skeleton */}
      <div className="px-4 flex items-center justify-between animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
        </div>
        <div className="h-4 bg-muted rounded w-16"></div>
      </div>

      {/* Content Skeleton */}
      <div className="border-0 shadow-none rounded-none">
        <div className="p-6 space-y-4 animate-pulse">
          <div className="space-y-4">
            {/* Text content skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-11/12"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>

            {/* Media skeleton */}
            <div className="pt-2">
              <div className="w-full h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Actions Skeleton */}
        <div className="px-6 pb-6 flex items-center justify-between animate-pulse">
          <div className="h-8 w-8 bg-muted rounded"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  )
} 