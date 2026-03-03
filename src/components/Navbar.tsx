import { Menu, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const els = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[hsl(140_30%_3%/0.88)] backdrop-blur-xl border-b border-[rgba(0,255,135,0.08)]"
            : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Go to top"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(0,255,135,0.25)] bg-[rgba(0,255,135,0.06)] font-bold text-sm text-[#00FF87] transition-all group-hover:border-[rgba(0,255,135,0.5)] group-hover:bg-[rgba(0,255,135,0.1)] group-hover:shadow-[0_0_20px_rgba(0,255,135,0.2)]"
              style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
              SD
            </span>
            <span className="hidden font-medium text-sm text-[rgba(255,255,255,0.3)] group-hover:text-[rgba(255,255,255,0.7)] transition-colors sm:block"
              style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
              Sanket Dhuri
            </span>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-current={activeSection === id ? "location" : undefined}
                className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-colors duration-200 tracking-widest uppercase ${
                  activeSection === id
                    ? "text-[#00FF87]"
                    : "text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.8)]"
                }`}
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="navpill"
                    className="absolute inset-0 rounded-xl bg-[rgba(0,255,135,0.07)] border border-[rgba(0,255,135,0.15)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close" : "Open menu"}
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-xl border border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.4)] hover:text-[#00FF87] hover:border-[rgba(0,255,135,0.25)] transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={mobileOpen ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8"
            style={{ background: "hsl(140 30% 3%)" }}
          >
            {/* Grid lines bg */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <nav className="relative flex flex-col mt-6 space-y-1">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(id)}
                  className={`text-left py-4 border-b border-[rgba(255,255,255,0.04)] text-3xl font-bold tracking-tight transition-colors ${
                    activeSection === id ? "text-[#00FF87]" : "text-[rgba(255,255,255,0.35)] hover:text-white"
                  }`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <span className="text-[#00FF87] text-sm font-mono mr-3 opacity-50">0{i + 1}</span>
                  {label}
                </motion.button>
              ))}
            </nav>

            {/* Bottom status */}
            <div className="relative mt-auto pt-8 border-t border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-2">
                <span className="status-pulse" />
                <span className="text-xs text-[#00FF87] font-mono tracking-widest">OPEN_TO_WORK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;