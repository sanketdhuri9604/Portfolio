import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"hsl(140,30%,3%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'DM Mono', monospace", position:"relative", overflow:"hidden" }}>
      {/* Grid bg */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)", backgroundSize:"56px 56px", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%)", pointerEvents:"none" }} />

      {/* Glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(0,255,135,0.04)", filter:"blur(80px)", pointerEvents:"none" }} />

      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }} style={{ textAlign:"center", position:"relative", zIndex:1 }}>

        {/* 404 */}
        <div style={{ position:"relative", marginBottom:"16px" }}>
          <div style={{
            fontSize:"clamp(6rem,20vw,14rem)",
            fontWeight:900,
            lineHeight:1,
            fontFamily:"'Syne', sans-serif",
            background:"linear-gradient(135deg, #00FF87, #00C864)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            filter:glitch ? "drop-shadow(3px 0 0 rgba(255,0,100,0.7)) drop-shadow(-3px 0 0 rgba(0,200,255,0.7))" : "none",
            transform:glitch ? "skew(-2deg)" : "none",
            transition:"filter 0.05s, transform 0.05s",
          }}>404</div>
        </div>

        {/* Label */}
        <div style={{ fontSize:"10px", letterSpacing:"0.25em", color:"rgba(0,255,135,0.6)", marginBottom:"24px" }}>
          // PAGE_NOT_FOUND
        </div>

        {/* Message */}
        <p style={{ fontSize:"clamp(1rem,3vw,1.4rem)", fontFamily:"'Syne', sans-serif", color:"rgba(255,255,255,0.75)", marginBottom:"8px", fontWeight:700 }}>
          Looks like you're lost in the matrix.
        </p>
        <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.3)", marginBottom:"40px", maxWidth:"360px" }}>
          This page doesn't exist — or it used to and got deleted. Let's get you back.
        </p>

        {/* Button */}
        <motion.a
          href="/"
          whileHover={{ scale:1.05, y:-2 }}
          whileTap={{ scale:0.97 }}
          style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"#00FF87", color:"hsl(140,30%,3%)", fontFamily:"'DM Mono', monospace", fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", padding:"14px 32px", borderRadius:"14px", textDecoration:"none", boxShadow:"0 8px 28px rgba(0,255,135,0.25)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          BACK_TO_HOME
        </motion.a>

        {/* Status */}
        <div style={{ marginTop:"48px", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", fontSize:"9px", letterSpacing:"0.18em", color:"rgba(0,255,135,0.4)" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#00FF87", boxShadow:"0 0 8px rgba(0,255,135,0.6)", display:"inline-block", animation:"pulse 2s infinite" }} />
          SD_PORTFOLIO · MUMBAI · IN
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;900&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
};

export default NotFound;