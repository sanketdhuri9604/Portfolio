// SkillsSection.tsx
import { motion } from "framer-motion";
import { Monitor, Server, Brain, Database, Smartphone, Wrench, Layers } from "lucide-react";
import { usePortfolio } from "@/usePortfolio";

const iconMap: Record<string, React.ElementType> = { Frontend: Monitor, Backend: Server, "AI & Data Science": Brain, Database, Mobile: Smartphone, Tools: Wrench };

const SkillsSection = () => {
  const { data } = usePortfolio();
  return (
    <section id="skills" className="py-32 px-6" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-16">
          <span className="section-tag mb-4 block">Expertise</span>
          <h2 id="skills-heading" className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[rgba(255,255,255,0.88)]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Skills &amp;{" "}<span className="text-gradient">technologies</span>
          </h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.skills.map((cat, i) => {
            const Icon = iconMap[cat.title] ?? Layers;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-7 noise card-lift group skill-bar"
              >
                <div className="mb-6 flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all"
                    style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: cat.color }} aria-hidden="true" />
                  </motion.span>
                  <div>
                    <h3 className="font-bold text-[rgba(255,255,255,0.85)] text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{cat.title}</h3>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.58)" }}>{cat.desc}</p>
                  </div>
                </div>
                <div className="mb-5 h-px" style={{ background: `linear-gradient(90deg, ${cat.color}30, transparent)` }} aria-hidden="true" />
                <ul className="flex flex-wrap gap-2" aria-label={`${cat.title} skills`}>
                  {cat.skills.map((s) => (
                    <motion.li key={s} whileHover={{ scale: 1.06 }}>
                      <span
                        className="inline-block rounded-xl border border-[rgba(0,255,135,0.2)] bg-[rgba(0,255,135,0.04)] px-3 py-1.5 text-xs font-medium cursor-default transition-all hover:border-[rgba(0,255,135,0.4)] hover:text-[#00FF87]" style={{ color: "rgba(0,255,135,0.78)" }}
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;