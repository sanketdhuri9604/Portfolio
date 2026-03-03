import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Save, RotateCcw, User, Briefcase, Code2, Layers,
  Mail, Plus, Trash2, ChevronDown, ChevronUp, Eye, EyeOff,
  CheckCircle2, AlertCircle, GripVertical, Star, Lock, ShieldCheck
} from "lucide-react";
import { usePortfolio } from "./usePortfolio";
import { defaultData } from "./portfolioData";
import type { PortfolioData, Project, Experience, SkillCategory } from "@/portfolioData";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED UI COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[9px] font-medium uppercase tracking-widest text-[rgba(255,255,255,0.25)] mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`w-full rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-[rgba(255,255,255,0.88)] placeholder:text-[rgba(255,255,255,0.15)] focus:border-[rgba(0,255,135,0.5)] focus:outline-none transition-colors ${props.className ?? ""}`} />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`w-full rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-[rgba(255,255,255,0.88)] placeholder:text-[rgba(255,255,255,0.15)] focus:border-[rgba(0,255,135,0.5)] focus:outline-none transition-colors resize-none ${props.className ?? ""}`} />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`w-full rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-[rgba(255,255,255,0.88)] focus:border-[rgba(0,255,135,0.5)] focus:outline-none transition-colors ${props.className ?? ""}`} />
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 space-y-4">
    <h3 className="text-sm font-bold text-[rgba(255,255,255,0.45)] uppercase tracking-widest">{title}</h3>
    {children}
  </div>
);

const TagEditor = ({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) => {
  const [input, setInput] = useState("");
  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) { onChange([...tags, trimmed]); setInput(""); }
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 min-h-8">
        {tags.map(t => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(0,255,135,0.2)] bg-[rgba(0,255,135,0.05)] px-2.5 py-1 text-xs font-medium text-[#00FF87]">
            {t}
            <button onClick={() => onChange(tags.filter(x => x !== t))} className="opacity-50 hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())} placeholder="Type and press Enter…" />
        <button onClick={add} className="shrink-0 rounded-xl border border-[rgba(0,255,135,0.3)] px-3 text-[#00FF87] hover:bg-[rgba(0,255,135,0.05)] transition-colors">
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// ── Image Upload ──────────────────────────────────────────────────────────────
const ImageUpload = ({
  value,
  onChange,
  label = "Upload Image",
  hint = "JPG, PNG, WEBP · Max 2MB recommended"
}: {
  value?: string;
  onChange: (base64: string) => void;
  label?: string;
  hint?: string;
}) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => { if (e.target?.result) onChange(e.target.result as string); };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />

      {/* Preview */}
      {value && (
        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[rgba(0,255,135,0.3)]">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 flex items-center justify-center h-7 w-7 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-white font-medium">
            {label}
          </div>
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-5 cursor-pointer transition-all ${
          dragging
            ? "border-[hsl(152_60%_45%)] bg-[rgba(0,255,135,0.05)]"
            : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,255,135,0.4)] hover:bg-[rgba(0,255,135,0.03)]"
        }`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(0,255,135,0.06)]">
          <Plus className="h-4 w-4 text-[#00FF87]" />
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-[rgba(255,255,255,0.55)]">{value ? "Change photo" : "Click or drag photo here"}</p>
          <p className="text-[10px] text-[rgba(255,255,255,0.2)] mt-0.5">{hint}</p>
        </div>
      </div>
    </div>
  );
};

// ── Multi Image Upload ────────────────────────────────────────────────────────
const MultiImageUpload = ({ onAdd }: { onAdd: (base64: string) => void }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = e => { if (e.target?.result) onAdd(e.target.result as string); };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={e => { if (e.target.files) processFiles(e.target.files); e.target.value = ""; }} className="hidden" />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files) processFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-4 cursor-pointer transition-all ${dragging ? "border-[hsl(152_60%_45%)] bg-[rgba(0,255,135,0.05)]" : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,255,135,0.4)] hover:bg-[rgba(0,255,135,0.03)]"}`}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(0,255,135,0.06)]">
          <Plus className="h-4 w-4 text-[#00FF87]" />
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-[rgba(255,255,255,0.55)]">Click or drag images here</p>
          <p className="text-[10px] text-[rgba(255,255,255,0.2)] mt-0.5">Multiple select supported · JPG, PNG, WEBP</p>
        </div>
      </div>
    </div>
  );
};

type NotifType = "success" | "error";

const Notif = ({ type, msg, onClose }: { type: NotifType; msg: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
    className={`fixed top-6 right-6 z-[200] flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium shadow-2xl border backdrop-blur-xl ${type === "success" ? "bg-[rgba(0,255,135,0.08)] border-[hsl(152_60%_30%/0.4)] text-[hsl(152_60%_65%)]" : "bg-[hsl(0_60%_10%)] border-[hsl(0_60%_30%/0.4)] text-[hsl(0_60%_65%)]"}`}
  >
    {type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
    {msg}
    <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity"><X className="h-3.5 w-3.5" /></button>
  </motion.div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB COMPONENTS (defined OUTSIDE AdminPanel — fixes the error)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Updater = <K extends keyof PortfolioData>(section: K, patch: Partial<PortfolioData[K]>) => void;
interface TabProps { draft: PortfolioData; setDraft: React.Dispatch<React.SetStateAction<PortfolioData>>; up: Updater; }

// ── Hero Tab ─────────────────────────────────────────────────────────────────
const HeroTab = ({ draft, up }: TabProps) => (
  <div className="space-y-4">
    <SectionCard title="Identity">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Full Name</Label><Input value={draft.hero.name} onChange={e => up("hero", { name: e.target.value })} placeholder="Sanket Dhuri" /></div>
        <div><Label>First Name (BG text)</Label><Input value={draft.hero.firstName} onChange={e => up("hero", { firstName: e.target.value })} placeholder="SANKET" /></div>
      </div>
      <div><Label>Tagline (line 1)</Label><Input value={draft.hero.tagline} onChange={e => up("hero", { tagline: e.target.value })} /></div>
      <div><Label>Tagline Suffix (line 2 — e.g. "for the web.")</Label><Input value={draft.hero.taglineSuffix ?? "for the web."} onChange={e => up("hero", { taglineSuffix: e.target.value })} /></div>
      <div><Label>Subtitle / Description</Label><Textarea rows={3} value={draft.hero.subtitle} onChange={e => up("hero", { subtitle: e.target.value })} /></div>
    </SectionCard>
    <SectionCard title="Links">
      <div><Label>Resume PDF URL</Label><Input value={draft.hero.resumeUrl} onChange={e => up("hero", { resumeUrl: e.target.value })} /></div>
    </SectionCard>
  </div>
);

// ── About Tab ────────────────────────────────────────────────────────────────
const AboutTab = ({ draft, up }: TabProps) => (
  <div className="space-y-4">
    <SectionCard title="Profile Photo">
      <ImageUpload
        value={draft.about.avatar}
        onChange={v => up("about", { avatar: v })}
        label="Profile Photo"
        hint="Square photo recommended · JPG, PNG, WEBP"
      />
    </SectionCard>
    <SectionCard title="Bio">
      <div><Label>Bio Paragraph 1</Label><Textarea rows={3} value={draft.about.bio} onChange={e => up("about", { bio: e.target.value })} /></div>
      <div><Label>Bio Paragraph 2</Label><Textarea rows={3} value={draft.about.bio2} onChange={e => up("about", { bio2: e.target.value })} /></div>
      <div><Label>Email</Label><Input type="email" value={draft.about.email} onChange={e => up("about", { email: e.target.value })} /></div>
    </SectionCard>
    <SectionCard title="Stats">
      <div className="space-y-3">
        {draft.about.stats.map((s: { label: string; value: number; suffix: string }, i: number) => (
          <div key={i} className="grid grid-cols-[1fr_80px_80px] gap-3 items-end">
            <div><Label>Label</Label><Input value={s.label} onChange={e => { const st = [...draft.about.stats]; st[i] = { ...st[i], label: e.target.value }; up("about", { stats: st }); }} /></div>
            <div><Label>Value</Label><Input type="number" value={s.value} onChange={e => { const st = [...draft.about.stats]; st[i] = { ...st[i], value: Number(e.target.value) }; up("about", { stats: st }); }} /></div>
            <div><Label>Suffix</Label><Input value={s.suffix} onChange={e => { const st = [...draft.about.stats]; st[i] = { ...st[i], suffix: e.target.value }; up("about", { stats: st }); }} /></div>
          </div>
        ))}
      </div>
    </SectionCard>
    <SectionCard title="Info Cards">
      <div className="space-y-3">
        {draft.about.info.map((inf: { title: string; value: string }, i: number) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <div><Label>Title</Label><Input value={inf.title} onChange={e => { const arr = [...draft.about.info]; arr[i] = { ...arr[i], title: e.target.value }; up("about", { info: arr }); }} /></div>
            <div><Label>Value</Label><Input value={inf.value} onChange={e => { const arr = [...draft.about.info]; arr[i] = { ...arr[i], value: e.target.value }; up("about", { info: arr }); }} /></div>
          </div>
        ))}
      </div>
    </SectionCard>
    <SectionCard title="Core Stack">
      <Label>Technologies</Label>
      <TagEditor tags={draft.about.coreStack} onChange={v => up("about", { coreStack: v })} />
    </SectionCard>
  </div>
);

// ── Projects Tab ─────────────────────────────────────────────────────────────

const ProjectsTab = ({ draft, setDraft }: TabProps) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(0);

  const addProject = () => {
    const num = String(draft.projects.length + 1).padStart(2, "0");
    const newProj: Project = { num, title: "New Project", description: "", tags: [], filters: ["Web"], year: "2025", liveUrl: "#", githubUrl: "#", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80", accent: "from-green-500/10 to-emerald-500/5" };
    setDraft((d: PortfolioData) => ({ ...d, projects: [...d.projects, newProj] }));
    setExpandedProject(draft.projects.length);
  };

  const removeProject = (i: number) => { setDraft((d: PortfolioData) => ({ ...d, projects: d.projects.filter((_, j) => j !== i) })); setExpandedProject(null); };

  const updateProject = (i: number, patch: Partial<Project>) =>
    setDraft((d: PortfolioData) => { const p = [...d.projects]; p[i] = { ...p[i], ...patch }; return { ...d, projects: p }; });

  return (
    <div className="space-y-3">
      {draft.projects.map((p: Project, i: number) => (
        <div key={i} className="rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors" onClick={() => setExpandedProject(expandedProject === i ? null : i)}>
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-[rgba(255,255,255,0.2)]" />
              {p.featured && <Star className="h-3.5 w-3.5 text-[#00FF87]" />}
              <span className="text-sm font-semibold text-[rgba(255,255,255,0.88)]">{p.title || "Untitled"}</span>
              <span className="text-xs text-[rgba(255,255,255,0.25)]">{p.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeProject(i); }} className="p-1.5 rounded-lg text-[hsl(0_60%_55%)] hover:bg-[hsl(0_60%_45%/0.12)] transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              {expandedProject === i ? <ChevronUp className="h-4 w-4 text-[rgba(255,255,255,0.25)]" /> : <ChevronDown className="h-4 w-4 text-[rgba(255,255,255,0.25)]" />}
            </div>
          </div>
          <AnimatePresence>
            {expandedProject === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 pb-5 space-y-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Title</Label><Input value={p.title} onChange={e => updateProject(i, { title: e.target.value })} /></div>
                    <div><Label>Year</Label><Input value={p.year} onChange={e => updateProject(i, { year: e.target.value })} /></div>
                  </div>
                  <div><Label>Description</Label><Textarea rows={3} value={p.description} onChange={e => updateProject(i, { description: e.target.value })} /></div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Live URL</Label><Input value={p.liveUrl || ""} onChange={e => updateProject(i, { liveUrl: e.target.value })} /></div>
                    <div><Label>GitHub URL</Label><Input value={p.githubUrl || ""} onChange={e => updateProject(i, { githubUrl: e.target.value })} /></div>
                  </div>
                  <div>
                    <Label>Project Image</Label>
                    <ImageUpload
                      value={p.image?.startsWith("data:") ? p.image : undefined}
                      onChange={v => updateProject(i, { image: v || p.image })}
                      label="Project Image"
                      hint="Wide/landscape photo recommended"
                    />
                    <p className="text-[10px] text-[rgba(255,255,255,0.2)] mt-2 mb-1">Or use a URL:</p>
                    <Input value={p.image?.startsWith("data:") ? "" : p.image} onChange={e => updateProject(i, { image: e.target.value })} placeholder="https://images.unsplash.com/…" />
                  </div>
                  <div>
                    <Label>Long Description (shown in modal popup)</Label>
                    <Textarea rows={4} value={p.longDescription || ""} onChange={e => updateProject(i, { longDescription: e.target.value })} placeholder="Detailed project description shown in the popup modal..." />
                  </div>
                  <div>
                    <Label>Gallery Images</Label>
                    <div className="space-y-2">
                      {/* Existing images grid */}
                      {(p.images && p.images.length > 0) && (
                        <div className="grid grid-cols-3 gap-2">
                          {p.images.map((img: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative group aspect-video overflow-hidden rounded-xl border border-[rgba(255,255,255,0.07)]">
                              <img src={img} alt="" className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                              <button
                                onClick={() => {
                                  const imgs = (p.images || []).filter((_: string, j: number) => j !== imgIdx);
                                  updateProject(i, { images: imgs.length ? imgs : undefined });
                                }}
                                className="absolute top-1 right-1 h-6 w-6 rounded-lg bg-black/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:bg-red-500/80"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white font-mono">
                                {imgIdx + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Upload button */}
                      <MultiImageUpload
                        onAdd={(base64) => {
                          const current = p.images && p.images.length > 0 ? p.images : [p.image];
                          updateProject(i, { images: [...current, base64] });
                        }}
                      />
                    </div>
                  </div>
                  <div><Label>Tags</Label><TagEditor tags={p.tags} onChange={v => updateProject(i, { tags: v })} /></div>
                  <button onClick={() => updateProject(i, { featured: !p.featured })} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${p.featured ? "bg-[rgba(0,255,135,0.1)] border-[rgba(0,255,135,0.4)] text-[#00FF87]" : "border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.3)]"}`}>
                    <Star className="h-3.5 w-3.5" />{p.featured ? "Featured ✓" : "Mark as Featured"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <button onClick={addProject} className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[rgba(0,255,135,0.3)] py-4 text-sm font-semibold text-[#00FF87] hover:bg-[rgba(0,255,135,0.03)] transition-colors">
        <Plus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
};

// ── Experience Tab ────────────────────────────────────────────────────────────
const ExperienceTab = ({ draft, setDraft }: TabProps) => {
  const [expandedExp, setExpandedExp] = useState<number | null>(0);

  const addExp = () => {
    const newExp: Experience = { role: "New Role", company: "Company", location: "Mumbai / Remote", duration: "Jan 2025 – Present", type: "Full-time", current: false, description: "", highlights: ["Achievement 1"] };
    setDraft((d: PortfolioData) => ({ ...d, experiences: [...d.experiences, newExp] }));
    setExpandedExp(draft.experiences.length);
  };

  const removeExp = (i: number) => { setDraft((d: PortfolioData) => ({ ...d, experiences: d.experiences.filter((_, j) => j !== i) })); setExpandedExp(null); };

  const updateExp = (i: number, patch: Partial<Experience>) =>
    setDraft((d: PortfolioData) => { const e = [...d.experiences]; e[i] = { ...e[i], ...patch }; return { ...d, experiences: e }; });

  return (
    <div className="space-y-3">
      {draft.experiences.map((exp: Experience, i: number) => (
        <div key={i} className="rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors" onClick={() => setExpandedExp(expandedExp === i ? null : i)}>
            <div className="flex items-center gap-3">
              {exp.current && <span className="h-2 w-2 rounded-full bg-[#20ffa0] animate-pulse" />}
              <span className="text-sm font-semibold text-[rgba(255,255,255,0.88)]">{exp.role}</span>
              <span className="text-xs text-[rgba(255,255,255,0.25)]">@ {exp.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeExp(i); }} className="p-1.5 rounded-lg text-[hsl(0_60%_55%)] hover:bg-[hsl(0_60%_45%/0.12)] transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              {expandedExp === i ? <ChevronUp className="h-4 w-4 text-[rgba(255,255,255,0.25)]" /> : <ChevronDown className="h-4 w-4 text-[rgba(255,255,255,0.25)]" />}
            </div>
          </div>
          <AnimatePresence>
            {expandedExp === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 pb-5 space-y-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Role</Label><Input value={exp.role} onChange={e => updateExp(i, { role: e.target.value })} /></div>
                    <div><Label>Company</Label><Input value={exp.company} onChange={e => updateExp(i, { company: e.target.value })} /></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Company URL</Label><Input value={exp.companyUrl || ""} onChange={e => updateExp(i, { companyUrl: e.target.value })} /></div>
                    <div><Label>Location</Label><Input value={exp.location} onChange={e => updateExp(i, { location: e.target.value })} /></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Duration</Label><Input value={exp.duration} onChange={e => updateExp(i, { duration: e.target.value })} placeholder="Jan 2025 – Present" /></div>
                    <div>
                      <Label>Type</Label>
                      <Select value={exp.type} onChange={e => updateExp(i, { type: e.target.value as Experience["type"] })}>
                        <option>Full-time</option><option>Internship</option><option>Freelance</option><option>Part-time</option>
                      </Select>
                    </div>
                  </div>
                  <div><Label>Description</Label><Textarea rows={3} value={exp.description} onChange={e => updateExp(i, { description: e.target.value })} /></div>
                  <div>
                    <Label>Highlights (one per line)</Label>
                    <Textarea rows={4} value={exp.highlights.join("\n")} onChange={e => updateExp(i, { highlights: e.target.value.split("\n") })} placeholder={"Achievement 1\nAchievement 2"} />
                  </div>
                  <button onClick={() => updateExp(i, { current: !exp.current })} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${exp.current ? "bg-[rgba(0,255,135,0.1)] border-[rgba(0,255,135,0.4)] text-[#00FF87]" : "border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.3)]"}`}>
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {exp.current ? "Current Role ✓" : "Mark as Current"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <button onClick={addExp} className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[rgba(0,255,135,0.3)] py-4 text-sm font-semibold text-[#00FF87] hover:bg-[rgba(0,255,135,0.03)] transition-colors">
        <Plus className="h-4 w-4" /> Add Experience
      </button>
    </div>
  );
};

// ── Skills Tab ────────────────────────────────────────────────────────────────
const SkillsTab = ({ draft, setDraft }: TabProps) => {
  const [expandedSkill, setExpandedSkill] = useState<number | null>(0);

  const updateSkill = (i: number, patch: Partial<SkillCategory>) =>
    setDraft((d: PortfolioData) => { const s = [...d.skills]; s[i] = { ...s[i], ...patch }; return { ...d, skills: s }; });

  const addSkill = () => {
    setDraft((d: PortfolioData) => ({ ...d, skills: [...d.skills, { title: "New Category", desc: "Description", color: "hsl(152 60% 45%)", skills: [] }] }));
    setExpandedSkill(draft.skills.length);
  };

  const removeSkill = (i: number) => { setDraft((d: PortfolioData) => ({ ...d, skills: d.skills.filter((_, j) => j !== i) })); setExpandedSkill(null); };

  return (
    <div className="space-y-3">
      {draft.skills.map((cat: SkillCategory, i: number) => (
        <div key={i} className="rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors" onClick={() => setExpandedSkill(expandedSkill === i ? null : i)}>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full shrink-0" style={{ background: cat.color }} />
              <span className="text-sm font-semibold text-[rgba(255,255,255,0.88)]">{cat.title}</span>
              <span className="text-xs text-[rgba(255,255,255,0.25)]">{cat.skills.length} skills</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeSkill(i); }} className="p-1.5 rounded-lg text-[hsl(0_60%_55%)] hover:bg-[hsl(0_60%_45%/0.12)] transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              {expandedSkill === i ? <ChevronUp className="h-4 w-4 text-[rgba(255,255,255,0.25)]" /> : <ChevronDown className="h-4 w-4 text-[rgba(255,255,255,0.25)]" />}
            </div>
          </div>
          <AnimatePresence>
            {expandedSkill === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 pb-5 space-y-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Category Title</Label><Input value={cat.title} onChange={e => updateSkill(i, { title: e.target.value })} /></div>
                    <div><Label>Description</Label><Input value={cat.desc} onChange={e => updateSkill(i, { desc: e.target.value })} /></div>
                  </div>
                  <div><Label>Accent Color (HSL)</Label><Input value={cat.color} onChange={e => updateSkill(i, { color: e.target.value })} placeholder="hsl(152 60% 48%)" /></div>
                  <div><Label>Skills</Label><TagEditor tags={cat.skills} onChange={v => updateSkill(i, { skills: v })} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <button onClick={addSkill} className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[rgba(0,255,135,0.3)] py-4 text-sm font-semibold text-[#00FF87] hover:bg-[rgba(0,255,135,0.03)] transition-colors">
        <Plus className="h-4 w-4" /> Add Category
      </button>
    </div>
  );
};

// ── Contact Tab ───────────────────────────────────────────────────────────────
const ContactTab = ({ draft, up }: TabProps) => (
  <div className="space-y-4">
    <SectionCard title="Social Links">
      <div><Label>Email</Label><Input type="email" value={draft.contact.email} onChange={e => up("contact", { email: e.target.value })} /></div>
      <div><Label>GitHub URL</Label><Input value={draft.contact.githubUrl} onChange={e => up("contact", { githubUrl: e.target.value })} /></div>
      <div><Label>LinkedIn URL</Label><Input value={draft.contact.linkedinUrl} onChange={e => up("contact", { linkedinUrl: e.target.value })} /></div>
      <div><Label>Twitter / X URL</Label><Input value={draft.contact.twitterUrl} onChange={e => up("contact", { twitterUrl: e.target.value })} /></div>
      <div><Label>Instagram URL</Label><Input placeholder="https://instagram.com/username" value={draft.contact.instagramUrl ?? ""} onChange={e => up("contact", { instagramUrl: e.target.value })} /></div>
    </SectionCard>
    <SectionCard title="Sidebar">
      <div><Label>Location</Label><Input value={draft.contact.location} onChange={e => up("contact", { location: e.target.value })} /></div>
      <div><Label>Section Tagline</Label><Textarea rows={2} value={draft.contact.tagline ?? ""} onChange={e => up("contact", { tagline: e.target.value })} placeholder="Have a project idea or want to collaborate?..." /></div>
      <div><Label>Availability Message</Label><Textarea rows={2} value={draft.contact.availability} onChange={e => up("contact", { availability: e.target.value })} /></div>
    </SectionCard>
    <SectionCard title="Footer">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Year</Label><Input value={draft.contact.footerYear} onChange={e => up("contact", { footerYear: e.target.value })} /></div>
        <div><Label>Footer Name</Label><Input value={draft.contact.footerName} onChange={e => up("contact", { footerName: e.target.value })} /></div>
      </div>
    </SectionCard>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SETTINGS TAB
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SettingsTab = () => {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleChange = async () => {
    if (!oldPw || !newPw || !confirmPw) { setMsg("Please fill all fields!"); setStatus("error"); return; }
    if (newPw !== confirmPw) { setMsg("New passwords do not match!"); setStatus("error"); return; }
    if (newPw.length < 4) { setMsg("Password must be at least 4 characters!"); setStatus("error"); return; }

    setStatus("loading");
    try {
      // Verify old password first
      const { data, error } = await supabase
        .from("admin_config")
        .select("value")
        .eq("key", "admin_password")
        .single();

      if (error || !data) throw new Error("DB error");
      if (oldPw !== data.value) { setMsg("Current password is incorrect!"); setStatus("error"); return; }

      // Save new password
      const { error: updateError } = await supabase
        .from("admin_config")
        .update({ value: newPw })
        .eq("key", "admin_password");

      if (updateError) throw updateError;

      setStatus("success");
      setMsg("Password changed successfully! 🎉");
      setOldPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => { setStatus("idle"); setMsg(""); }, 3000);
    } catch {
      setMsg("Something went wrong, please try again!");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard title="🔐 Change Password">
        <div className="space-y-3">
          <div>
            <Label>Current Password</Label>
            <Input type="password" value={oldPw} onChange={e => { setOldPw(e.target.value); setStatus("idle"); }} placeholder="Current password..." />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" value={newPw} onChange={e => { setNewPw(e.target.value); setStatus("idle"); }} placeholder="New password..." />
          </div>
          <div>
            <Label>New Password Confirm Karo</Label>
            <Input type="password" value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setStatus("idle"); }} placeholder="Confirm new password..." onKeyDown={e => e.key === "Enter" && handleChange()} />
          </div>

          {msg && (
            <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${status === "success" ? "bg-[rgba(0,255,135,0.08)] text-[#00FF87] border border-[rgba(0,255,135,0.2)]" : "bg-[hsl(0_60%_45%/0.10)] text-[hsl(0_60%_55%)] border border-[hsl(0_60%_45%/0.25)]"}`}>
              {status === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              {msg}
            </div>
          )}

          <button onClick={handleChange} disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00FF87] py-3 text-sm font-bold text-[hsl(140_30%_3%)] hover:bg-[#20ffa0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {status === "loading"
              ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              : <Lock className="h-4 w-4" />}
            {status === "loading" ? "Saving..." : "Update Password"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN ADMIN PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type Tab = "hero" | "about" | "projects" | "experience" | "skills" | "contact" | "settings";
const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "hero", label: "Hero", icon: User },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "settings", label: "Settings", icon: Lock },
];

interface AdminPanelProps { onClose: () => void; }

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const { data, save, isSaving } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(JSON.parse(JSON.stringify(data)));
  const [tab, setTab] = useState<Tab>("hero");
  const [notif, setNotif] = useState<{ type: NotifType; msg: string } | null>(null);

  const showNotif = (type: NotifType, msg: string) => {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 3500);
  };

  const handleSave = async () => {
    try {
      await save(draft);
      showNotif("success", "Changes saved! Live on all devices 🌍");
    } catch {
      showNotif("error", "Save failed! Check your connection.");
    }
  };
  const handleReset = () => { setDraft(JSON.parse(JSON.stringify(defaultData))); showNotif("error", "Reset to defaults — save to apply."); };

  const up: Updater = (section, patch) =>
    setDraft((d: PortfolioData) => ({ ...d, [section]: { ...(d[section] as object), ...(patch as object) } }));

  const tabProps: TabProps = { draft, setDraft, up };

  const tabContent: Record<Tab, React.ReactNode> = {
    hero:       <HeroTab {...tabProps} />,
    about:      <AboutTab {...tabProps} />,
    projects:   <ProjectsTab {...tabProps} />,
    experience: <ExperienceTab {...tabProps} />,
    skills:     <SkillsTab {...tabProps} />,
    contact:    <ContactTab {...tabProps} />,
    settings:   <SettingsTab />,
  };

  return (
    <>
      <AnimatePresence>
        {notif && <Notif key="notif" type={notif.type} msg={notif.msg} onClose={() => setNotif(null)} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.aside
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed right-0 top-0 bottom-0 z-[110] w-full max-w-2xl flex flex-col border-l border-[rgba(255,255,255,0.06)]"
        style={{ background: "hsl(140 30% 3%)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-6 py-4 shrink-0">
          <div>
            <h2 className="font-bold text-[rgba(255,255,255,0.88)]" style={{ fontFamily: "'Syne',sans-serif" }}>Admin Panel</h2>
            <p className="text-xs text-[rgba(255,255,255,0.2)] mt-0.5">Edit content · Save · See changes instantly</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.07)] px-3 py-2 text-xs font-semibold text-[rgba(255,255,255,0.3)] hover:border-[rgba(220,50,50,0.4)] hover:text-[hsl(0_60%_55%)] transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 rounded-xl bg-[#00FF87] px-4 py-2 text-xs font-bold text-[hsl(140_30%_3%)] hover:bg-[#20ffa0] transition-colors shadow-lg shadow-[rgba(0,255,135,0.18)] disabled:opacity-60 disabled:cursor-not-allowed">
              {isSaving ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Save className="h-3.5 w-3.5" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-[rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.88)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[rgba(255,255,255,0.06)] px-4 py-2 shrink-0 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${tab === id ? "bg-[rgba(0,255,135,0.08)] text-[#00FF87] border border-[rgba(0,255,135,0.2)]" : "text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.88)] hover:bg-[rgba(255,255,255,0.04)]"}`}>
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tabContent[tab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-[rgba(255,255,255,0.06)] px-6 py-4 shrink-0">
          <button onClick={handleSave} disabled={isSaving} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00FF87] py-3 text-sm font-bold text-[hsl(140_30%_3%)] hover:bg-[#20ffa0] transition-colors shadow-lg shadow-[rgba(0,255,135,0.18)] disabled:opacity-60 disabled:cursor-not-allowed">
            {isSaving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Saving to cloud..." : "Save All Changes"}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PASSWORD GATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PasswordGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const attempt = async () => {
    if (!pw.trim()) return;
    setLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from("admin_config")
        .select("value")
        .eq("key", "admin_password")
        .single();

      if (dbError || !data) throw new Error("DB error");

      if (pw === data.value) {
        sessionStorage.setItem("admin_auth", "1");
        onSuccess();
      } else {
        throw new Error("Wrong password");
      }
    } catch {
      setError(true);
      setShake(true);
      setPw("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: shake ? [0, -8, 8, -5, 5, 0] : 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: shake ? 0.4 : 0.25 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-6"
      >
        <div className="w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.07)] p-8 shadow-2xl"
          style={{ background: "hsl(140 30% 3%)" }}>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${error ? "bg-[hsl(0_60%_45%/0.15)] border border-[hsl(0_60%_45%/0.3)]" : "bg-[rgba(0,255,135,0.08)] border border-[rgba(0,255,135,0.2)]"}`}>
              {error
                ? <AlertCircle className="h-6 w-6 text-[hsl(0_60%_55%)]" />
                : <Lock className="h-6 w-6 text-[#00FF87]" />
              }
            </div>
          </div>

          <h2 className="text-center text-lg font-bold text-[rgba(255,255,255,0.88)] mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
            Admin Access
          </h2>
          <p className="text-center text-xs text-[rgba(255,255,255,0.25)] mb-6">
            {error ? "❌ Incorrect password — please try again" : "Enter password to access admin panel"}
          </p>

          <div className="space-y-3">
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              onKeyDown={e => e.key === "Enter" && attempt()}
              placeholder="Password…"
              autoFocus
              className={`w-full rounded-xl border px-4 py-3 text-sm text-[rgba(255,255,255,0.88)] bg-[rgba(255,255,255,0.03)] placeholder:text-[rgba(255,255,255,0.15)] focus:outline-none transition-colors ${
                error
                  ? "border-[hsl(0_60%_45%/0.5)] focus:border-[hsl(0_60%_45%)]"
                  : "border-[rgba(255,255,255,0.07)] focus:border-[rgba(0,255,135,0.5)]"
              }`}
            />
            <button onClick={attempt} disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00FF87] py-3 text-sm font-bold text-[hsl(140_30%_3%)] hover:bg-[#20ffa0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <ShieldCheck className="h-4 w-4" />}
              {loading ? "Checking..." : "Enter"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FLOATING TOGGLE BUTTON
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const AdminToggle = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "1"
  );
  const [showGate, setShowGate] = useState(false);

  // Only show admin button on /admin route
 const path = window.location.pathname.replace(/\/$/, "");
if (path !== "/admin") return null;

  const handleEditClick = () => {
    if (authenticated) {
      setOpen(true);
    } else {
      setShowGate(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthenticated(true);
    setShowGate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Password Gate */}
      <AnimatePresence>
        {showGate && !authenticated && (
          <PasswordGate onSuccess={handleAuthSuccess} />
        )}
      </AnimatePresence>

      {/* Admin Panel */}
      <AnimatePresence>
        {open && authenticated && <AdminPanel onClose={handleClose} />}
      </AnimatePresence>

      {/* Floating button */}
      <AnimatePresence>
        {visible && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleEditClick}
              className="flex items-center gap-2.5 rounded-2xl border border-[rgba(0,255,135,0.35)] bg-[rgba(5,15,8,0.95)] px-5 py-3 text-sm font-semibold text-[#00FF87] shadow-2xl shadow-black/50 backdrop-blur-xl hover:border-[rgba(0,255,135,0.5)] hover:bg-[rgba(0,255,135,0.05)] transition-all">
              {authenticated ? <Eye className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {authenticated ? "Edit Content" : "Admin"}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setVisible(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(5,15,8,0.95)] text-[rgba(255,255,255,0.2)] hover:text-[hsl(150_6%_60%)] backdrop-blur-xl transition-all">
              <EyeOff className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
