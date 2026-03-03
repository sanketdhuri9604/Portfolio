import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/usePortfolio";
import type { Experience } from "@/portfolioData";

const typeStyle: Record<Experience["type"], { bg: string; text: string; border: string }> = {
  "Full-time":  { bg: "rgba(0,255,135,0.08)",  text: "#00FF87",              border: "rgba(0,255,135,0.25)" },
  Internship:   { bg: "rgba(0,217,126,0.08)",   text: "rgba(0,217,126,0.9)",  border: "rgba(0,217,126,0.25)" },
  Freelance:    { bg: "rgba(0,200,100,0.08)",   text: "rgba(0,200,100,0.9)",  border: "rgba(0,200,100,0.25)" },
  "Part-time":  { bg: "rgba(0,230,115,0.08)",   text: "rgba(0,230,115,0.9)",  border: "rgba(0,230,115,0.25)" },
};

const ExperienceSection = () => {
  const { data } = usePortfolio();
  return (
    <section id="experience" className="py-32 px-6" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-16">
          <span className="section-tag mb-4 block">Journey</span>
          <h2 id="experience-heading" className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[rgba(255,255,255,0.88)]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Work <span className="text-gradient">experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 bottom-0 w-px md:left-[180px]"
            style={{ background: "linear-gradient(to bottom, rgba(0,255,135,0.3), rgba(255,255,255,0.05), transparent)" }}
          />

          <div className="space-y-8">
            {data.experiences.map((exp, i) => {
              const ts = typeStyle[exp.type];
              return (
                <motion.div
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="relative flex gap-6 md:gap-10"
                >
                  {/* Date / dot */}
                  <div aria-hidden="true" className="relative flex-shrink-0 flex items-start pt-5 pl-3 md:pl-0 md:w-[168px] md:text-right md:flex-col md:items-end">
                    <div
                      className="absolute left-[9px] md:right-[-13px] md:left-auto top-[22px] flex h-[13px] w-[13px] items-center justify-center rounded-full border-2 z-10"
                      style={{ borderColor: exp.current ? "#00FF87" : "rgba(255,255,255,0.1)", background: "hsl(140 30% 3%)" }}
                    >
                      {exp.current && <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#00FF87" }} />}
                    </div>
                    <div className="pl-7 md:pl-0">
                      <p className="text-[11px] text-[rgba(255,255,255,0.3)] leading-relaxed" style={{ fontFamily: "'DM Mono', monospace" }}>{exp.duration}</p>
                      <p className="text-[11px] text-[rgba(255,255,255,0.2)]" style={{ fontFamily: "'DM Mono', monospace" }}>{exp.location}</p>
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex-1 glass rounded-2xl p-6 noise transition-all hover:border-[rgba(0,255,135,0.15)]"
                  >
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[rgba(255,255,255,0.88)]" style={{ fontFamily: "'Syne', sans-serif" }}>{exp.role}</h3>
                        {exp.companyUrl && exp.companyUrl !== "#" ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium link-anim" style={{ color: "#00FF87" }}>
                            {exp.company} <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <p className="text-sm font-medium" style={{ color: "#00FF87" }}>{exp.company}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-xl px-3 py-1 text-[11px] font-medium border"
                          style={{ background: ts.bg, color: ts.text, borderColor: ts.border, fontFamily: "'DM Mono', monospace" }}
                        >{exp.type}</span>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#00FF87", fontFamily: "'DM Mono', monospace" }}>
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "#00FF87" }} />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#00FF87" }} />
                            </span>
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.highlights.filter(Boolean).map((pt, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-[rgba(255,255,255,0.5)]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#00FF87" }} aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;