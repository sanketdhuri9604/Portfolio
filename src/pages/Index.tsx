import { useEffect } from "react";
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

const IndexContent = () => {
  const { isSyncing } = usePortfolio();
  if (isSyncing) return <SkeletonLoader />;
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
    </div>
  );
};

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