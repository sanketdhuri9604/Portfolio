const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`skeleton ${className ?? ""}`} />
);

const SkeletonLoader = () => (
  <div className="min-h-screen bg-[hsl(140,30%,3%)]">
    <style>{`
      @keyframes sk-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      .sk-item {
        background: linear-gradient(90deg, rgba(0,255,135,0.04) 25%, rgba(0,255,135,0.09) 50%, rgba(0,255,135,0.04) 75%);
        background-size: 200% 100%;
        animation: sk-shimmer 1.8s infinite;
        border-radius: 8px;
      }
    `}</style>

    {/* Navbar skeleton */}
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="sk-item h-9 w-9 rounded-xl" />
        <div className="sk-item h-4 w-24 hidden sm:block" />
      </div>
      <div className="hidden md:flex gap-3">
        {[...Array(5)].map((_, i) => <div key={i} className="sk-item h-7 w-14 rounded-xl" />)}
      </div>
      <div className="sk-item h-9 w-9 rounded-xl md:hidden" />
    </div>

    {/* Hero skeleton */}
    <div className="flex flex-col justify-center min-h-screen px-6 pt-24 pb-16 max-w-6xl mx-auto">
      {/* Avatar */}
      <div className="sk-item h-20 w-20 rounded-2xl mb-8" />
      {/* Eyebrow */}
      <div className="sk-item h-4 w-48 mb-8 rounded-full" />
      {/* H1 lines */}
      <div className="sk-item h-8 w-32 mb-3" />
      <div className="sk-item h-20 w-3/4 mb-3" style={{ borderRadius: 12 }} />
      <div className="sk-item h-16 w-1/2 mb-10" style={{ borderRadius: 12 }} />
      {/* Subtitle */}
      <div className="sk-item h-4 w-96 mb-3 max-w-full" />
      <div className="sk-item h-4 w-80 mb-10 max-w-full" />
      {/* Buttons */}
      <div className="flex gap-4 flex-wrap">
        <div className="sk-item h-12 w-36 rounded-xl" />
        <div className="sk-item h-12 w-28 rounded-xl" />
        <div className="sk-item h-10 w-10 rounded-xl" />
        <div className="sk-item h-10 w-10 rounded-xl" />
        <div className="sk-item h-10 w-10 rounded-xl" />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;