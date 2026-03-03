// Skeleton Loading Screen — shown while Supabase data loads
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`skeleton ${className ?? ""}`} />
);

const SkeletonLoader = () => (
  <div className="min-h-screen animate-pulse bg-[hsl(140,30%,3%)]">
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5">
      <SkeletonBlock className="h-9 w-24" />
      <div className="flex gap-3">
        <SkeletonBlock className="h-8 w-16" />
        <SkeletonBlock className="h-8 w-16" />
        <SkeletonBlock className="h-8 w-16" />
        <SkeletonBlock className="h-8 w-16" />
      </div>
    </div>
    <div className="flex flex-col justify-center min-h-screen px-6 pt-24 pb-16 max-w-6xl mx-auto">
      <SkeletonBlock className="h-6 w-48 mb-8 rounded-full" />
      <SkeletonBlock className="h-20 w-3/4 mb-4" />
      <SkeletonBlock className="h-20 w-1/2 mb-8" />
      <SkeletonBlock className="h-5 w-96 mb-3" />
      <SkeletonBlock className="h-5 w-80 mb-10" />
      <div className="flex gap-4">
        <SkeletonBlock className="h-12 w-36 rounded-full" />
        <SkeletonBlock className="h-12 w-28 rounded-full" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;