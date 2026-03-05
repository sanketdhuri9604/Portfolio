import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileText, Github, Linkedin, Instagram } from "lucide-react";
import { usePortfolio } from "@/usePortfolio";

const ParticleCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!; const ctx = canvas.getContext("2d")!;
    let raf: number; let W = 0, H = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particles: P[] = [];
    const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); };
    const init = () => { particles.length = 0; const count = Math.floor((W * H) / 14000); for (let i = 0; i < count; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.5 + 0.1 }); };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,255,135,${p.a * 1.0})`; ctx.fill(); });
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,255,135,${1.0 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.stroke(); } }
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(() => { resize(); init(); }); ro.observe(canvas); resize(); init(); draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
};

const reveal: import("framer-motion").Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({ y: "0%", opacity: 1, transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } })
};

const HeroSection = () => {
  const { data } = usePortfolio();
  const { hero, about, contact } = data;
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <section
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 pb-16 mesh-hero noise"
        aria-labelledby="hero-heading"
      >
        <ParticleCanvas />

        {/* Grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%)",
          }}
        />

        {/* HUD corners */}
        <div aria-hidden="true" className="pointer-events-none absolute top-20 left-6 select-none" style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(0,255,135,0.85)", lineHeight: 1.9 }}>
          <div>// SD_PORTFOLIO</div>
          <div>STATUS: ACTIVE</div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute top-20 right-6 text-right select-none" style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(0,255,135,0.85)", lineHeight: 1.9 }}>
          <div>MUMBAI · IN</div>
          <div>FULLSTACK · AI/ML</div>
        </div>

        {/* Watermark */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="text-[12vw] font-black leading-none tracking-tighter opacity-[0.035]" style={{ fontFamily: "'Syne', sans-serif", color: "#00FF87" }}>{hero.firstName}</span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Avatar */}
          {about.avatar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLightbox(true)}
                className="relative h-20 w-20 cursor-pointer"
              >
                <div className="h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-[rgba(0,255,135,0.4)] ring-offset-2 ring-offset-[hsl(140_30%_3%)] shadow-lg shadow-[rgba(0,255,135,0.15)]">
                  <img src={about.avatar} alt={hero.name} className="h-full w-full object-cover img-blur" onLoad={e => e.currentTarget.classList.add("loaded")} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex items-center gap-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#00FF87" }}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#00FF87] shadow-[0_0_8px_#00FF87] animate-pulse" />
            <span className="w-6 h-px bg-gradient-to-r from-[#00FF87] to-transparent" />
            {hero.eyebrow}
          </motion.div>

          {/* H1 */}
          <h1 id="hero-heading" className="mb-8 overflow-hidden">
            {[
              { text: `Hi, I'm`, cls: "text-[rgba(255,255,255,0.5)] font-medium text-[clamp(1.2rem,2.5vw,1.8rem)]", style: { fontFamily: "'DM Sans', sans-serif" } },
              { text: hero.name + ".", cls: "text-gradient font-black text-[clamp(3.5rem,9vw,8rem)] leading-none", style: { fontFamily: "'Syne', sans-serif" } },
              { text: hero.tagline, cls: "font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none", style: { fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)" } },
              ...(hero.taglineSuffix?.trim() ? [{ text: hero.taglineSuffix, cls: "font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none text-outline", style: { fontFamily: "'Syne', sans-serif" } }] : []),
            ].map(({ text, cls, style }, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div custom={i} variants={reveal} initial="hidden" animate="show" className={`block ${cls}`} style={style}>{text}</motion.div>
              </div>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-10 max-w-lg text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              <span>View My Work</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>

            <a href={hero.resumeUrl} download className="btn-outline">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>

            <div className="flex items-center gap-2 ml-1">
              {[
                { href: contact.githubUrl, icon: Github, label: "GitHub" },
                { href: contact.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
                { href: (contact.instagramUrl || "https://instagram.com"), icon: Instagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(0,255,135,0.35)] hover:text-[#00FF87] hover:bg-[rgba(0,255,135,0.06)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-6 flex items-center gap-3"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "rgba(0,255,135,0.85)" }}
        >
          <span className="w-8 h-px bg-gradient-to-r from-[#00FF87] to-transparent" />
          SCROLL_TO_EXPLORE
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && about.avatar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={() => setLightbox(false)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              src={about.avatar}
              alt={hero.name}
              className="max-h-[80vh] max-w-[80vw] rounded-2xl shadow-2xl object-cover aspect-square img-blur"
              onLoad={e => e.currentTarget.classList.add("loaded")}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-xl font-bold"
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;