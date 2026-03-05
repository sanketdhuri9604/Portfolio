import { useEffect, useState } from "react";
import ThemeProvider from "../components/ThemeContext";
import SkeletonLoader from "../components/SkeletonLoader";
import { usePortfolio } from "../components/usePortfolio";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ContactSection from "../components/ContactSection";
import PortfolioProvider from "../components/PortfolioContext";
import { AdminToggle } from "../components/AdminPanel";

// ── Network Error Toast ───────────────────────────────────────────────────────
const NetworkToast = () => {
  const { networkError, retry } = usePortfolio();
  const [retrying, setRetrying] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!networkError) { setDismissed(false); setRetrying(false); }
  }, [networkError]);

  if (!networkError || dismissed) return null;

  const handleRetry = async () => {
    setRetrying(true);
    retry();
    setTimeout(() => setRetrying(false), 3000);
  };

  return (
    <div style={{ position:"fixed", bottom:"24px", left:"50%", transform:"translateX(-50%)", zIndex:9999, display:"flex", alignItems:"center", gap:"12px", borderRadius:"16px", border:"1px solid rgba(239,68,68,0.2)", background:"rgba(10,3,3,0.92)", padding:"12px 18px", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", boxShadow:"0 8px 40px rgba(239,68,68,0.12), 0 2px 8px rgba(0,0,0,0.4)", whiteSpace:"nowrap", animation:"toastSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}>
      <style>{`
        @keyframes toastSlideUp { from{opacity:0;transform:translate(-50%,16px)} to{opacity:1;transform:translate(-50%,0)} }
        @keyframes toastPing { 75%,100%{transform:scale(2);opacity:0} }
        @keyframes toastSpin { to{transform:rotate(360deg)} }
      `}</style>
      <span style={{ position:"relative", display:"flex", height:"8px", width:"8px", flexShrink:0 }}>
        <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#f87171", opacity:0.5, animation:"toastPing 1.2s cubic-bezier(0,0,0.2,1) infinite" }} />
        <span style={{ position:"relative", display:"inline-flex", height:"8px", width:"8px", borderRadius:"50%", background:"#f87171" }} />
      </span>
      <span style={{ fontSize:"11px", fontWeight:500, color:"#f87171", letterSpacing:"0.08em", fontFamily:"'DM Mono', monospace" }}>
        {retrying ? "RETRYING..." : "NETWORK_ERROR — data unavailable"}
      </span>
      <span style={{ width:"1px", height:"16px", background:"rgba(239,68,68,0.2)", flexShrink:0 }} />
      <button onClick={handleRetry} disabled={retrying} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"10px", fontFamily:"'DM Mono', monospace", border:"1px solid rgba(239,68,68,0.3)", borderRadius:"8px", padding:"4px 10px", color:retrying?"rgba(248,113,113,0.4)":"rgba(248,113,113,0.8)", background:"transparent", cursor:retrying?"not-allowed":"pointer", letterSpacing:"0.1em", transition:"all 0.2s ease" }}>
        {retrying && <span style={{ display:"inline-block", width:"8px", height:"8px", borderRadius:"50%", border:"1.5px solid rgba(248,113,113,0.3)", borderTopColor:"#f87171", animation:"toastSpin 0.8s linear infinite" }} />}
        {retrying ? "WAIT" : "RETRY"}
      </button>
      <button onClick={() => setDismissed(true)} style={{ fontSize:"14px", color:"rgba(248,113,113,0.4)", background:"transparent", border:"none", cursor:"pointer", lineHeight:1, padding:"2px 4px", borderRadius:"4px", transition:"color 0.2s", fontFamily:"sans-serif" }}>✕</button>
    </div>
  );
};

// ── Page Load Progress Bar ────────────────────────────────────────────────────
const PageProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 90) { clearInterval(iv); p = 90; }
      setProgress(p);
    }, 120);
    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 500);
    }, 1000);
    return () => { clearInterval(iv); clearTimeout(done); };
  }, []);

  if (!visible) return null;
  return (
    <div className="progress-bar" style={{ width:`${progress}%`, opacity:progress >= 100 ? 0 : 1, transition:"width 0.2s ease, opacity 0.5s ease" }} />
  );
};

// ── Scroll To Top Button ──────────────────────────────────────────────────────
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <button
      className={`scroll-top-btn ${visible ? "visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

// ── Side Dot Navigation ───────────────────────────────────────────────────────
const NAV_DOTS = [
  { id: "hero-heading", label: "Home" },
  { id: "about",        label: "About" },
  { id: "projects",     label: "Work" },
  { id: "skills",       label: "Skills" },
  { id: "experience",   label: "Experience" },
  { id: "contact",      label: "Contact" },
];

const DotNav = () => {
  const [active, setActive] = useState("hero-heading");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const els = NAV_DOTS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="dot-nav hidden lg:flex" role="navigation" aria-label="Section navigation">
      {NAV_DOTS.map(({ id, label }) => (
        <div key={id} style={{ position:"relative", display:"flex", alignItems:"center" }}>
          {hovered === id && (
            <div style={{ position:"absolute", right:"18px", background:"rgba(5,15,8,0.95)", border:"1px solid rgba(0,255,135,0.2)", borderRadius:"8px", padding:"4px 10px", fontSize:"9px", color:"#00FF87", whiteSpace:"nowrap", fontFamily:"'DM Mono', monospace", letterSpacing:"0.1em", pointerEvents:"none" }}>
              {label}
            </div>
          )}
          <button
            className={`dot-nav-item ${active === id ? "active" : ""}`}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={label}
          />
        </div>
      ))}
    </div>
  );
};

// ── Section Divider ───────────────────────────────────────────────────────────
const SectionDivider = () => (
  <div style={{ padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.12))" }} />
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(0,255,135,0.25)" }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(0,255,135,0.5)", boxShadow: "0 0 8px rgba(0,255,135,0.35)" }} />
      <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(0,255,135,0.25)" }} />
    </div>
    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,255,135,0.12), transparent)" }} />
  </div>
);

// ── Main Content ──────────────────────────────────────────────────────────────
const IndexContent = () => {
  const { isLoading } = usePortfolio();
  if (isLoading) return <SkeletonLoader />;
  return (
    <div className="min-h-screen">
      <PageProgress />
      <Navbar />
      <DotNav />
      <main id="main-content">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <AdminToggle />
      <ScrollToTop />
      <NetworkToast />
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
const Index = () => {
  useEffect(() => {
    document.title = "Sanket Dhuri - Developer";
  }, []);

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <IndexContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default Index;