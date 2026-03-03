import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolio } from "@/usePortfolio";
import type { Project } from "@/portfolioData";

// ── Image Gallery ─────────────────────────────────────────
const ImageGallery = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl bg-[rgba(0,255,135,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center min-h-48">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Screenshot ${current + 1}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-[#00FF87]" : "w-1.5 bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`shrink-0 h-16 w-24 overflow-hidden rounded-xl border-2 transition-all ${i === current ? "border-[#00FF87]" : "border-transparent opacity-50 hover:opacity-80"}`}>
              <img src={img} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Project Modal ─────────────────────────────────────────
const ProjectModal = ({ p, onClose }: { p: Project; onClose: () => void }) => {
  const images = p.images?.length ? p.images : [p.image];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(0,255,135,0.12)] shadow-2xl shadow-black/50"
          style={{ background: "hsl(140 30% 3%)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {p.featured && (
                  <span className="flex items-center gap-1.5 rounded-xl bg-[rgba(0,255,135,0.08)] px-3 py-1 text-[11px] font-medium border border-[rgba(0,255,135,0.2)]" style={{ color: "#00FF87", fontFamily: "'DM Mono', monospace" }}>
                    <Star className="h-3 w-3" /> Featured
                  </span>
                )}
                <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.52)" }}>{p.year}</span>
                <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.4)" }}>{p.num}</span>
              </div>
              <h2 className="text-3xl font-black text-gradient mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>{p.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{p.longDescription || p.description}</p>
            </div>
            <ImageGallery images={images} />
            <div>
              <p className="mono-label mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="rounded-xl border border-[rgba(0,255,135,0.2)] bg-[rgba(0,255,135,0.04)] px-3 py-1.5 text-xs font-medium hover:border-[rgba(0,255,135,0.4)] hover:text-[#00FF87] transition-colors" style={{ color: "rgba(0,255,135,0.78)" }}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {p.liveUrl && p.liveUrl !== "#" && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#00FF87] py-3 text-sm font-bold transition-all hover:bg-[#20ffa0] hover:shadow-[0_8px_24px_rgba(0,255,135,0.3)]"
                  style={{ color: "hsl(140 30% 3%)" }}
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
              {p.githubUrl && p.githubUrl !== "#" && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] py-3 text-sm font-medium text-[rgba(255,255,255,0.55)] hover:border-[rgba(0,255,135,0.3)] hover:text-[#00FF87] transition-all"
                >
                  <Github className="h-4 w-4" /> View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ── Featured Card ─────────────────────────────────────────
const FeaturedCard = ({ p, onClick }: { p: Project; onClick: () => void }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.45 }}
    onClick={onClick}
    className="group relative col-span-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(0,255,135,0.2)] noise cursor-pointer"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10 flex flex-col md:flex-row gap-0">
      <div className="relative h-52 md:h-auto md:w-2/5 overflow-hidden">
        <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(140_20%_5%)] hidden md:block" />
      </div>
      <div className="flex-1 p-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-xl bg-[rgba(0,255,135,0.08)] border border-[rgba(0,255,135,0.2)] px-3 py-1 text-[11px] font-medium" style={{ color: "#00FF87", fontFamily: "'DM Mono', monospace" }}>
            <Star className="h-3 w-3" /> Featured
          </span>
          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.52)" }}>{p.year}</span>
          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.4)" }}>{p.num}</span>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-[rgba(255,255,255,0.85)] group-hover:text-gradient transition-all" style={{ fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
        <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{p.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {p.tags.map(t => (
            <span key={t} className="rounded-xl border border-[rgba(0,255,135,0.2)] px-3 py-1 text-xs" style={{ color: "rgba(0,255,135,0.72)" }} style={{ fontFamily: "'DM Mono', monospace" }}>{t}</span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#00FF87", fontFamily: "'DM Mono', monospace" }}>
          View Details <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </motion.article>
);

// ── Small Card ────────────────────────────────────────────
const SmallCard = ({ p, i, onClick }: { p: Project; i: number; onClick: () => void }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.4, delay: i * 0.07 }}
    onClick={onClick}
    className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] card-lift noise cursor-pointer"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="relative h-40 overflow-hidden">
        <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(140_20%_5%)] to-transparent" />
        <span className="absolute bottom-3 left-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }} style={{ fontFamily: "'DM Mono', monospace" }}>{p.num}</span>
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.52)" }}>{p.year}</span>
          <span className="h-7 w-7 flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.3)] group-hover:border-[rgba(0,255,135,0.3)] group-hover:text-[#00FF87] transition-all">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-[rgba(255,255,255,0.8)]" style={{ fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
        <p className="mb-4 text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.62)" }}>{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.slice(0, 3).map(t => (
            <span key={t} className="rounded-xl border border-[rgba(0,255,135,0.2)] px-2.5 py-1 text-[10px]" style={{ color: "rgba(0,255,135,0.72)" }} style={{ fontFamily: "'DM Mono', monospace" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  </motion.article>
);

// ── Main ──────────────────────────────────────────────────
const ProjectsSection = () => {
  const { data } = usePortfolio();
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = data.projects.find(p => p.featured);
  const rest = data.projects.filter(p => !p.featured);

  return (
    <>
      <section id="projects" className="py-32 px-6" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <span className="section-tag mb-4 block">Selected work</span>
            <h2
              id="projects-heading"
              className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[rgba(255,255,255,0.88)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Projects <span className="text-gradient">highlight</span>
            </h2>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {featured && <FeaturedCard key={featured.num} p={featured} onClick={() => setSelected(featured)} />}
              {rest.map((p, i) => <SmallCard key={p.num} p={p} i={i} onClick={() => setSelected(p)} />)}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <a
              href={data.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-[#00FF87] transition-colors link-anim" style={{ color: "rgba(255,255,255,0.52)" }}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <Github className="h-4 w-4" /> More on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;