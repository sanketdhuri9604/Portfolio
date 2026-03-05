import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Code2, Coffee, Zap } from "lucide-react";
import { usePortfolio } from "@/usePortfolio";

const iconMap: Record<string, React.ElementType> = { Location: MapPin, Availability: Briefcase, Education: GraduationCap, Focus: Code2, Fuel: Coffee, Superpower: Zap };

const useCountUp = (target: number, inView: boolean) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = target / 60;
    const id = setInterval(() => { n = Math.min(n + step, target); setVal(Math.floor(n)); if (n >= target) clearInterval(id); }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return val;
};

const Stat = ({ value, suffix, label, inView, delay }: { value: number; suffix: string; label: string; inView: boolean; delay: number }) => {
  const count = useCountUp(value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-6 text-center glow-sm card-lift noise"
    >
      <p className="text-4xl font-black text-gradient mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{count}{suffix}</p>
      <p className="mono-label" style={{ color: "rgba(255,255,255,0.78)" }}>{label}</p>
    </motion.div>
  );
};

const InfoCard = ({ icon: Icon, title, value, delay }: { icon: React.ElementType; title: string; value: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ x: 6 }}
    className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] px-4 py-3 transition-all hover:border-[rgba(0,255,135,0.2)] hover:bg-[rgba(0,255,135,0.04)]"
  >
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,255,135,0.08)]">
      <Icon className="h-4 w-4" style={{ color: "#00FF87" }} aria-hidden="true" />
    </span>
    <div>
      <p className="mono-label mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{title}</p>
      <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.92)" }}>{value}</p>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const { data } = usePortfolio();
  const { about, hero } = data;
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const initials = hero.name.split(" ").map(n => n[0]).join("");
  const [showMore, setShowMore] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <section ref={sectionRef} id="about" className="py-20 px-6 relative overflow-hidden" aria-labelledby="about-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-[100px]"
          style={{ background: "rgba(0,255,135,0.05)" }}
        />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="section-tag mb-4 block">About me</span>
            <h2
              id="about-heading"
              className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[rgba(255,255,255,0.88)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Building the <span className="text-gradient">future</span>,<br />one line at a time.
            </h2>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* LEFT */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ y: avatarY }}
                className="glass rounded-2xl p-6 noise glow-sm"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="h-16 w-16 rounded-2xl shrink-0 shadow-lg overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-[rgba(0,255,135,0.4)] transition-all"
                    onClick={() => about.avatar && setLightbox(true)}
                    title={about.avatar ? "Click to enlarge" : ""}
                  >
                    {about.avatar ? (
                      <img src={about.avatar} alt={hero.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00FF87, #00C864)" }}>
                        <span className="text-2xl font-black" style={{ color: "hsl(140 30% 3%)", fontFamily: "'Syne', sans-serif" }}>{initials}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[rgba(255,255,255,0.9)]" style={{ fontFamily: "'Syne', sans-serif" }}>{hero.name}</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.78)" }}>{hero.subtitle.split("\n")[0]}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="status-pulse" />
                      <span className="mono-label" style={{ color: "#00FF87" }}>Open to work</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-[1.9]" style={{ color: "rgba(255,255,255,0.88)" }}>{about.bio}</p>
              </motion.div>

              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`text-base leading-[1.9] ${!showMore ? "line-clamp-4" : ""}`}
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {about.bio2}
                </motion.p>
                {about.bio2?.length > 200 && (
                  <button
                    onClick={() => setShowMore(v => !v)}
                    className="mt-2 text-xs font-medium transition-colors"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#00FF87", letterSpacing: "0.08em" }}
                  >
                    {showMore ? "Show less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a href={hero.resumeUrl} download className="btn-primary"><span>Download Resume</span></a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline">Get in Touch</a>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div ref={statsRef} className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              {about.stats.filter(({ value, label }) => value > 0 && label?.trim()).length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {about.stats.filter(({ value, label }) => value > 0 && label?.trim()).map(({ value, suffix, label }, i) => (
                    <Stat key={label} value={value} suffix={suffix} label={label} inView={inView} delay={i * 0.1} />
                  ))}
                </div>
              )}

              {about.info.filter(({ value }) => value?.trim()).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {about.info.filter(({ value }) => value?.trim()).map(({ title, value }, i) => {
                    const Icon = iconMap[title] ?? MapPin;
                    return <InfoCard key={title} icon={Icon} title={title} value={value} delay={0.05 * i} />;
                  })}
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="glass rounded-2xl p-6 noise"
              >
                <p className="mono-label mb-4" style={{ color: "rgba(255,255,255,0.78)" }}>Core Stack</p>
                <div className="flex flex-wrap gap-2">
                  {about.coreStack.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="inline-block rounded-xl border border-[rgba(0,255,135,0.2)] bg-[rgba(0,255,135,0.05)] px-3 py-1.5 text-xs font-medium cursor-default transition-all hover:border-[rgba(0,255,135,0.45)] hover:text-[#00FF87]"
                      style={{ fontFamily: "'DM Mono', monospace", color: "rgba(0,255,135,0.92)" }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

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
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              src={about.avatar}
              alt={hero.name}
              className="max-h-[85vh] max-w-[85vw] rounded-3xl shadow-2xl object-contain"
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

export default AboutSection;