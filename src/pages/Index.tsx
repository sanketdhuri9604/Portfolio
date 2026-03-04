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

  // Agar networkError reset ho gaya (retry success) toh dismissed bhi reset karo
  useEffect(() => {
    if (!networkError) {
      setDismissed(false);
      setRetrying(false);
    }
  }, [networkError]);

  if (!networkError || dismissed) return null;

  const handleRetry = async () => {
    setRetrying(true);
    retry();
    // 3 sec baad retrying false kar do chahe result kuch bhi ho
    setTimeout(() => setRetrying(false), 3000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderRadius: "16px",
        border: "1px solid rgba(239,68,68,0.2)",
        background: "rgba(10,3,3,0.92)",
        padding: "12px 18px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(239,68,68,0.12), 0 2px 8px rgba(0,0,0,0.4)",
        whiteSpace: "nowrap",
        animation: "toastSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
      }}
    >
      <style>{`
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes toastPing {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes toastSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Pulsing dot */}
      <span style={{ position: "relative", display: "flex", height: "8px", width: "8px", flexShrink: 0 }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "#f87171", opacity: 0.5,
          animation: "toastPing 1.2s cubic-bezier(0,0,0.2,1) infinite",
        }} />
        <span style={{ position: "relative", display: "inline-flex", height: "8px", width: "8px", borderRadius: "50%", background: "#f87171" }} />
      </span>

      {/* Message */}
      <span style={{
        fontSize: "11px", fontWeight: 500, color: "#f87171",
        letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace",
      }}>
        {retrying ? "RETRYING..." : "NETWORK_ERROR — data unavailable"}
      </span>

      {/* Divider */}
      <span style={{ width: "1px", height: "16px", background: "rgba(239,68,68,0.2)", flexShrink: 0 }} />

      {/* Retry button */}
      <button
        onClick={handleRetry}
        disabled={retrying}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "10px", fontFamily: "'DM Mono', monospace",
          border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px",
          padding: "4px 10px", color: retrying ? "rgba(248,113,113,0.4)" : "rgba(248,113,113,0.8)",
          background: "transparent", cursor: retrying ? "not-allowed" : "pointer",
          letterSpacing: "0.1em", transition: "all 0.2s ease",
        }}
      >
        {retrying && (
          <span style={{
            display: "inline-block", width: "8px", height: "8px",
            borderRadius: "50%", border: "1.5px solid rgba(248,113,113,0.3)",
            borderTopColor: "#f87171",
            animation: "toastSpin 0.8s linear infinite",
          }} />
        )}
        {retrying ? "WAIT" : "RETRY"}
      </button>

      {/* Close button */}
      <button
        onClick={() => setDismissed(true)}
        style={{
          fontSize: "14px", color: "rgba(248,113,113,0.4)",
          background: "transparent", border: "none",
          cursor: "pointer", lineHeight: 1, padding: "2px 4px",
          borderRadius: "4px", transition: "color 0.2s",
          fontFamily: "sans-serif",
        }}
      >✕</button>
    </div>
  );
};

// ── Main Content ──────────────────────────────────────────────────────────────
const IndexContent = () => {
  const { isLoading } = usePortfolio();
  if (isLoading) return <SkeletonLoader />;
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <AdminToggle />
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