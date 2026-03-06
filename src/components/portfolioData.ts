// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PORTFOLIO DATA — edit this file or use the Admin Panel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { supabase } from "@/supabaseClient";

export interface Project {
  num: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  filters: ("Web" | "AI/ML" | "Mobile" | "Backend")[];
  year: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  images?: string[];
  accent: string;
}

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  duration: string;
  type: "Full-time" | "Internship" | "Freelance" | "Part-time";
  description: string;
  highlights: string[];
  current?: boolean;
}

export interface SkillCategory {
  title: string;
  desc: string;
  skills: string[];
  color: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    firstName: string;
    tagline: string;
    taglineSuffix?: string;
    subtitle: string;
    badge: string;
    githubUrl: string;
    linkedinUrl: string;
    resumeUrl: string;
    eyebrow: string;
  };
  about: {
    bio: string;
    bio2: string;
    email: string;
    avatar?: string;
    stats: { value: number; suffix: string; label: string }[];
    info: { title: string; value: string }[];
    coreStack: string[];
  };
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
  contact: {
    email: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    location: string;
    availability: string;
    tagline: string;
    footerYear: string;
    footerName: string;
  };
}

export const defaultData: PortfolioData = {
  hero: {
    name: "Sanket Dhuri",
    firstName: "SANKET",
    tagline: "I build things",
    subtitle: "Web & App Developer · AI & Data Science Engineer · React · Node.js · Python · Problem Solver.\nBuilding performant, beautiful digital experiences from Mumbai.",
    badge: "Open to opportunities · Mumbai, India",
    githubUrl: "https://github.com/sanketdhuri",
    linkedinUrl: "https://linkedin.com/in/sanketdhuri",
    resumeUrl: "/resume.pdf",
    eyebrow: 'Full-Stack Developer, AI/ML Engineer, Problem Solver, React Developer, Open to Work 🚀',
  },
  about: {
    bio: "I'm a passionate developer from Mumbai with expertise across the full stack — from crafting pixel-perfect React interfaces to building robust Node.js backends and exploring the frontiers of AI and Data Science.",
    bio2: "Whether it's a sleek web app, a mobile experience, or an intelligent data pipeline, I bring curiosity, clean code, and a problem-solver's mindset to every project. I love turning complex problems into elegant, user-centered solutions.",
    email: "sanketdhuri9604@gmail.com",
    stats: [
      { value: 15, suffix: "+", label: "Projects" },
      { value: 12, suffix: "+", label: "Technologies" },
      { value: 200, suffix: "+", label: "Problems Solved" },
      { value: 1200, suffix: "+", label: "Cups of Tea" },
    ],
    info: [
      { title: "Location", value: "Mumbai, Maharashtra, India" },
      { title: "Availability", value: "Freelance · Internship · Full-time" },
      { title: "Education", value: "Computer Engineering" },
      { title: "Focus", value: "React · Node.js · Python · AI/ML" },
      { title: "Fuel", value: "Tea & curiosity" },
      { title: "Superpower", value: "Turning ideas into code fast" },
    ],
    coreStack: ["React", "Node.js", "Python", "JavaScript", "SQL", "MongoDB", "TensorFlow", "FastAPI", "Git"],
  },
  projects: [
    {
      num: "01",
      title: "Project One",
      description: "A full-stack web application.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind"],
      filters: ["Web", "Backend"],
      featured: true,
      year: "2025",
      liveUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      accent: "from-green-500/10 to-emerald-500/5",
    },
    {
      num: "02",
      title: "Project Two",
      description: "An AI/ML project.",
      tags: ["Python", "TensorFlow", "FastAPI", "NumPy"],
      filters: ["AI/ML", "Backend"],
      year: "2025",
      liveUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
      accent: "from-teal-500/10 to-green-500/5",
    },
    {
      num: "03",
      title: "Project Three",
      description: "Mobile or web app.",
      tags: ["React Native", "Firebase", "Expo"],
      filters: ["Mobile"],
      year: "2024",
      liveUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
      accent: "from-emerald-500/10 to-teal-500/5",
    },
    {
      num: "04",
      title: "Project Four",
      description: "Data science pipeline.",
      tags: ["Python", "SQL", "Pandas", "Streamlit"],
      filters: ["AI/ML", "Web"],
      year: "2024",
      liveUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      accent: "from-green-600/10 to-emerald-600/5",
    },
  ],
  experiences: [
    {
      role: "Your Role Here",
      company: "Company Name",
      companyUrl: "#",
      location: "Mumbai / Remote",
      duration: "Jan 2025 – Present",
      type: "Full-time",
      current: true,
      description: "Brief description of what this role involves.",
      highlights: ["Key achievement #1", "Key achievement #2", "Key achievement #3"],
    },
    {
      role: "Your Role Here",
      company: "Company Name",
      companyUrl: "#",
      location: "Mumbai / Remote",
      duration: "Jun 2024 – Dec 2024",
      type: "Internship",
      current: false,
      description: "Brief description of the internship.",
      highlights: ["Key achievement #1", "Key achievement #2", "Key achievement #3"],
    },
  ],
  skills: [
    { title: "Frontend", desc: "Interfaces users love", color: "hsl(152 60% 48%)", skills: ["React.js", "JavaScript", "HTML & CSS", "Tailwind CSS", "Framer Motion"] },
    { title: "Backend", desc: "APIs & server logic", color: "hsl(168 55% 45%)", skills: ["Node.js", "Express.js", "REST APIs", "Python", "FastAPI"] },
    { title: "AI & Data Science", desc: "Intelligent systems", color: "hsl(152 55% 42%)", skills: ["Machine Learning", "TensorFlow", "Pandas", "NumPy", "Scikit-learn"] },
    { title: "Database", desc: "Data & queries", color: "hsl(168 50% 42%)", skills: ["SQL", "MySQL", "MongoDB", "Firebase", "PostgreSQL"] },
    { title: "Mobile", desc: "Cross-platform apps", color: "hsl(152 60% 45%)", skills: ["React Native", "Expo", "Mobile UI", "Push Notifications"] },
    { title: "Tools", desc: "Dev workflow", color: "hsl(168 55% 40%)", skills: ["Git & GitHub", "Docker", "VS Code", "Postman", "Linux"] },
  ],
  contact: {
    email: "sanketdhuri9604@gmail.com",
    githubUrl: "https://github.com/sanketdhuri",
    linkedinUrl: "https://linkedin.com/in/sanketdhuri",
    twitterUrl: "https://twitter.com/sanketdhuri",
    instagramUrl: "https://instagram.com/sanketdhuri",
    location: "Mumbai, India 🇮🇳",
    availability: "Open to freelance, internships & full-time. Responds within 24h.",
    tagline: "Have a project idea or want to collaborate? Drop a message — I reply within 24 hours.",
    footerYear: "2025",
    footerName: "Sanket Dhuri",
  },
};

// ── Storage Key ───────────────────────────────────────────────────────────────
const STORAGE_KEY = "portfolio_data_v1";

// ── Deep merge — nested objects properly override defaultData ─────────────────
function deepMerge(base: PortfolioData, override: Partial<PortfolioData>): PortfolioData {
  return {
    hero:        { ...base.hero,    ...(override.hero    ?? {}) },
    about:       { ...base.about,   ...(override.about   ?? {}) },
    contact:     { ...base.contact, ...(override.contact ?? {}) },
    projects:    override.projects    ?? base.projects,
    experiences: override.experiences ?? base.experiences,
    skills:      override.skills      ?? base.skills,
  };
}

// ── Load from Supabase — always preferred, localStorage only as fallback ───────
export async function loadDataAsync(): Promise<PortfolioData> {
  try {
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("data")
      .eq("id", "main")
      .single();

    if (error || !data) throw new Error("No data in Supabase");

    const parsed = data.data as Partial<PortfolioData>;

    // Always overwrite localStorage with latest from Supabase
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed)); } catch { /* ignore */ }

    return deepMerge(defaultData, parsed);
  } catch {
    // Supabase unreachable — use localStorage cache
    return loadData();
  }
}

// ── Save to Supabase + localStorage ──────────────────────────────────────────
export async function saveDataAsync(data: PortfolioData): Promise<void> {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }

  const { error } = await supabase
    .from("portfolio_data")
    .upsert({ id: "main", data, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}

// ── localStorage helpers ──────────────────────────────────────────────────────
export function loadData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return deepMerge(defaultData, JSON.parse(raw));
  } catch { /* ignore */ }
  return defaultData;
}

export function saveData(data: PortfolioData): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

export function resetData(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  supabase.from("portfolio_data").delete().eq("id", "main").then(() => {});
}