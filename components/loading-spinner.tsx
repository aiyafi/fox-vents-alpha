export function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground/60">Loading more posts...</p>
      </div>
    </div>
  )
}
