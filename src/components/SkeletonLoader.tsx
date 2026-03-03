// Skeleton Loading Screen — shown while Supabase data loads
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`skeleton ${className ?? ""}`} />
);

const SkeletonLoader = () => (
  <div className="min-h-screen" style={{ background: "hsl(140 30% 3%)" }}>
    {/* Noise overlay */}
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />

    {/* Navbar skeleton */}
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ borderBottom: "1px solid rgba(0,255,135,0.08)" }}
    >
      <SkeletonBlock className="h-9 w-9 rounded-xl" />
      <div className="hidden md:flex gap-2">
        {[60, 50, 60, 72, 56].map((w, i) => (
          <div key={i} className="skeleton h-8 rounded-xl" style={{ width: w + "px" }} />
        ))}
      </div>
    </div>

    {/* Hero skeleton */}
    <div className="flex flex-col justify-center min-h-screen px-6 pt-24 pb-16 max-w-6xl mx-auto relative">
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%)",
        }}
      />

      {/* Eyebrow */}
      <SkeletonBlock className="h-4 w-56 mb-8 rounded-full" />

      {/* H1 lines */}
      <SkeletonBlock className="h-[clamp(3rem,7vw,6rem)] w-1/3 mb-3 rounded-2xl" />
      <SkeletonBlock className="h-[clamp(3rem,7vw,6rem)] w-2/3 mb-3 rounded-2xl" />
      <SkeletonBlock className="h-[clamp(1.5rem,3.5vw,3rem)] w-1/2 mb-10 rounded-xl" />

      {/* Subtitle */}
      <SkeletonBlock className="h-4 w-96 mb-2.5 rounded-lg" />
      <SkeletonBlock className="h-4 w-80 mb-10 rounded-lg" />

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <SkeletonBlock className="h-12 w-36 rounded-xl" />
        <SkeletonBlock className="h-12 w-28 rounded-xl" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
      </div>

      {/* Loading bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] animate-[loading_2s_ease-out_forwards]"
        style={{ background: "linear-gradient(90deg, #00FF87, rgba(0,255,135,0.3))", boxShadow: "0 0 8px #00FF87" }}
      />
    </div>

    <style>{`
      @keyframes loading {
        0%   { width: 0%; }
        60%  { width: 70%; }
        85%  { width: 88%; }
        100% { width: 100%; }
      }
    `}</style>
  </div>
);

export default SkeletonLoader;