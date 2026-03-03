import { useState, useRef } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Send, CheckCircle2, MapPin } from "lucide-react";
import { usePortfolio } from "@/usePortfolio";

type FS = "idle" | "loading" | "success";

const ContactSection = () => {
  const { data } = usePortfolio();
  const { contact } = data;
  const [state, setState] = useState<FS>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    const form = formRef.current!;
    const getData = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.value ?? "";
    try {
      await emailjs.send(
        "service_of0yywc",
        "template_zce8mh8",
        {
          from_name:  getData("name"),
          from_email: getData("email"),
          subject:    getData("subject"),
          message:    getData("message"),
          name:       getData("name"),
          email:      getData("email"),
        },
        "rcGa5K6mH9VtYHWH_"
      );
      setState("success");
      formRef.current?.reset();
      setTimeout(() => setState("idle"), 4000);
    } catch {
      setState("idle");
      alert("Failed to send message. Please try again!");
    }
  };

  const socials = [
    { icon: Github,    label: "GitHub",      href: contact.githubUrl },
    { icon: Linkedin,  label: "LinkedIn",    href: contact.linkedinUrl },
    { icon: Twitter,   label: "Twitter / X", href: contact.twitterUrl },
    { icon: Instagram, label: "Instagram",   href: contact.instagramUrl || "https://instagram.com" },
  ];

  const inputBase = "peer w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 pt-6 pb-2 text-sm text-[rgba(255,255,255,0.85)] focus:border-[rgba(0,255,135,0.4)] focus:outline-none focus:ring-1 focus:ring-[rgba(0,255,135,0.15)] transition-all";
  const labelBase = "absolute left-4 top-4 text-[10px] font-medium text-[rgba(255,255,255,0.25)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-[#00FF87] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px] uppercase tracking-widest pointer-events-none";

  return (
    <section id="contact" className="py-32 px-6" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="section-tag mb-4 block">Contact</span>
          <h2
            id="contact-heading"
            className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[rgba(255,255,255,0.88)]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's work{" "}<span className="text-gradient">together</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-[rgba(255,255,255,0.65)] leading-relaxed" style={{ fontWeight: 300 }}>
            {contact.tagline}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px] items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form ref={formRef} onSubmit={submit} noValidate className="glass rounded-2xl p-8 noise space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { id: "name",  label: "Your Name",      type: "text",  auto: "name" },
                  { id: "email", label: "Email Address",  type: "email", auto: "email" },
                ].map(f => (
                  <div key={f.id} className="relative">
                    <input id={f.id} name={f.id} type={f.type} required autoComplete={f.auto} placeholder=" "
                      className={`${inputBase} invalid:border-red-500/40`} style={{ fontFamily: "'DM Sans', sans-serif" }} />
                    <label htmlFor={f.id} className={labelBase} style={{ fontFamily: "'DM Mono', monospace" }}>{f.label}</label>
                  </div>
                ))}
              </div>

              <div className="relative">
                <input id="subject" name="subject" type="text" placeholder=" "
                  className={inputBase} style={{ fontFamily: "'DM Sans', sans-serif" }} />
                <label htmlFor="subject" className={labelBase} style={{ fontFamily: "'DM Mono', monospace" }}>Subject</label>
              </div>

              <div className="relative">
                <textarea id="message" name="message" rows={5} required placeholder=" "
                  className={`${inputBase} resize-none invalid:border-red-500/40`} style={{ fontFamily: "'DM Sans', sans-serif" }} />
                <label htmlFor="message" className={labelBase} style={{ fontFamily: "'DM Mono', monospace" }}>Your Message</label>
              </div>

              {state === "idle" && (
                <p className="text-xs text-[rgba(255,255,255,0.2)]" style={{ fontFamily: "'DM Mono', monospace" }}>
                  * Name, email and message are required
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading" || state === "success"}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {state === "loading" ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" /><span>Sending…</span></>
                ) : state === "success" ? (
                  <><CheckCircle2 className="h-4 w-4" /><span>Message Sent! ✓</span></>
                ) : (
                  <><span>Send Message</span><Send className="h-4 w-4" /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Aside */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Status */}
            <div className="glass rounded-2xl p-6 noise glow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "#00FF87" }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: "#00FF87" }} />
                </span>
                <span className="text-sm font-medium" style={{ color: "#00FF87", fontFamily: "'DM Mono', monospace" }}>Available now</span>
              </div>
              <p className="text-xs text-[rgba(255,255,255,0.62)] leading-relaxed">{contact.availability}</p>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(0,255,135,0.08)]">
                <MapPin className="h-4 w-4" style={{ color: "#00FF87" }} />
              </span>
              <div>
                <p className="mono-label mb-0.5">Based in</p>
                <p className="text-sm text-[rgba(255,255,255,0.85)]">{contact.location}</p>
              </div>
            </div>

            {/* Socials */}
            <div className="glass rounded-2xl p-5 noise">
              <p className="mono-label mb-4">Find me on</p>
              <div className="space-y-1">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[rgba(255,255,255,0.62)] transition-all hover:bg-[rgba(0,255,135,0.05)] hover:text-[rgba(255,255,255,0.85)] group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 group-hover:text-[#00FF87] transition-colors" />
                      {label}
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:text-[#00FF87] transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          role="contentinfo"
        >
          <p className="text-sm text-[rgba(255,255,255,0.45)]">
            © {contact.footerYear}{" "}
            <span className="text-[rgba(255,255,255,0.5)] font-medium">{contact.footerName}</span>. Built with passion &amp; clean code.
          </p>
          <p className="text-xs text-[rgba(255,255,255,0.38)]">Made in Mumbai 🇮🇳</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;