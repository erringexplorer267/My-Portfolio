"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { GithubPulse } from "@/components/github-pulse";
import { useGithubPulse } from "@/hooks/use-github-pulse";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CircleDot, GraduationCap, BookOpen, Cpu, ArrowDownRight, Download, Loader2, FileCheck } from "lucide-react";
import { TerminalAbout } from "@/components/terminal-about";
import { SkillsOrbit } from "@/components/skills-orbit";
import { ProjectVault } from "@/components/project-vault";
import { SocialHub } from "@/components/social-hub";
import { JourneyTrack } from "@/components/journey-track";

const JOURNEY_TEXT = "I,Uttiyo Modak, architect high-performance digital systems inspired by the precision of hardware. With a background in ECE and a mastery of the Modern Web, I build everything from IoT-integrated applications to AI-powered simulations. Dedicated to creating digital experiences that feel as solid as the silicon they are built up";

interface MainContentProps {
  initialSkills?: any[];
  initialProjects?: any[];
}

export function MainContent({ initialSkills = [], initialProjects = [] }: MainContentProps) {
  const { data: session, status } = useSession();
  const { data: githubData, loading: githubLoading } = useGithubPulse();
  const { skills, projects, journeys, loading: portfolioLoading } = usePortfolioData(initialSkills, initialProjects);
  const [resumeStatus, setResumeStatus] = useState<"idle" | "downloading" | "done">("idle");

  const handleResumeDownload = () => {
    setResumeStatus("downloading");
    setTimeout(() => {
      setResumeStatus("done");
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Uttiyo_Modak_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => setResumeStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 pt-12 pb-20 min-h-screen flex flex-col gap-32">
      {/* ─── Hero Section ─── */}
      <section id="home" className="relative flex flex-col items-center text-center gap-10 pt-10 pb-4">


        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-1/25 bg-accent-1/5 text-accent-1 text-[11px] font-bold italic tracking-widest shadow-inner"
        >
          <Sparkles size={12} />
          Hi, I&apos;m Uttiyo
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="space-y-2"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
            Redefining
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-none bg-gradient-to-r from-accent-1 via-accent-2 to-accent-1 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]">
            Versatility
          </h1>
        </motion.div>

        {/* Role tags row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {["ECE Engineer", "Full-Stack Dev", "IoT Builder", "Open to Opportunities"].map((tag, i) => (
            <span
              key={tag}
              className={`text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-full border ${
                i === 3
                  ? "bg-accent-1/10 border-accent-1/40 text-accent-1"
                  : "glass border-glass-border text-accent-2"
              }`}
            >
              {i === 3 && <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />}
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-accent-2 max-w-xl mx-auto font-medium leading-relaxed"
        >
          Building experiences that sit at the intersection of hardware precision and software elegance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-accent-1 text-zinc-950 text-[11px] font-black uppercase tracking-[0.18em] hover:shadow-[0_0_30px_rgba(88,166,255,0.35)] transition-all duration-300"
          >
            View Vault <ArrowDownRight size={14} />
          </a>

          {/* Resume Download — replaces the static FAB */}
          <motion.button
            onClick={handleResumeDownload}
            disabled={resumeStatus !== "idle"}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-2 px-7 py-3 rounded-2xl glass border border-white/10 text-[11px] font-black uppercase tracking-[0.18em] overflow-hidden group"
          >
            {/* Gradient shimmer on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-accent-1/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <AnimatePresence mode="wait">
              {resumeStatus === "idle" && (
                <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2 relative">
                  <Download size={14} className="text-violet-400" />
                  <span className="bg-gradient-to-r from-violet-400 to-accent-1 bg-clip-text text-transparent">Resume.pdf</span>
                </motion.span>
              )}
              {resumeStatus === "downloading" && (
                <motion.span key="loading" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2 relative text-accent-2">
                  <Loader2 size={14} className="animate-spin" />
                  Fetching...
                </motion.span>
              )}
              {resumeStatus === "done" && (
                <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2 relative text-green-400">
                  <FileCheck size={14} />
                  Downloaded!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Subtle divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-1/40 to-transparent origin-center"
        />
      </section>

      {/* Socials Connection (Repositioned) */}
      <section id="socials" className="flex flex-col items-center gap-8 -mt-16">
        <div className="text-center space-y-1">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-1">Connect with the Core</h2>
        </div>
        <SocialHub />
      </section>

      {/* Education Timeline */}
      <section className="flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-2"
        >
          Academic Pathway
        </motion.p>
        <div className="flex flex-col md:flex-row items-stretch gap-4 w-full max-w-4xl">
          {[
            {
              Icon: BookOpen,
              label: "Secondary",
              school: "S.A.V.M.",
              period: "2010 – 2020",
              badge: "10th",
            },
            {
              Icon: BookOpen,
              label: "Higher Secondary",
              school: "S.A.V.M.",
              period: "2020 – 2022",
              badge: "12th",
            },
            {
              Icon: Cpu,
              label: "B.Tech — ECE",
              school: "Academy Of Technology",
              period: "2023 – 2027",
              badge: "Current",
              highlight: true,
            },
          ].map(({ Icon, label, school, period, badge, highlight }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`flex-1 glass rounded-2xl p-5 flex items-start gap-4 border ${
                highlight
                  ? "border-accent-1/40 bg-accent-1/5 shadow-[0_0_20px_rgba(88,166,255,0.08)]"
                  : "border-glass-border"
              }`}
            >
              <div className={`p-2.5 rounded-xl ${ highlight ? "bg-accent-1 text-background" : "bg-accent-1/10 text-accent-1" } shrink-0`}>
                <Icon size={18} />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-black text-foreground tracking-tight">{label}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    highlight ? "bg-accent-1 text-background" : "bg-accent-2/10 text-accent-2"
                  }`}>{badge}</span>
                </div>
                <span className="text-xs text-accent-2 font-medium">{school}</span>
                <span className="text-[10px] text-accent-2/60 font-mono">{period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About & Pulse Section */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-8">
           <h2 className="text-sm font-black uppercase tracking-[0.3em] text-accent-1 mb-4 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent-1" /> System Overview
          </h2>
          <TerminalAbout text={JOURNEY_TEXT} />
        </div>
        <div className="lg:col-span-2">
          <GithubPulse data={githubData} loading={githubLoading} />
        </div>
      </section>

      {/* Skills Orbit */}
      <section id="skills" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black italic uppercase tracking-tight">Architectural <span className="text-accent-1">Stack</span></h2>
          <p className="text-accent-2 max-w-xl mx-auto">Categorized expertise across the hardware-software spectrum.</p>
        </div>
        <SkillsOrbit skills={skills} loading={portfolioLoading} />
      </section>

      {/* Projects Vault */}
      <section id="projects" className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Project <span className="text-accent-1">Vault</span></h2>
            <p className="text-accent-2">A curated selection of experiments and solutions for the weightless web.</p>
          </div>
           <div className="text-xs font-bold uppercase tracking-widest text-accent-2 bg-accent-2/5 px-4 py-2 rounded-full border border-accent-2/10">
            Total Projects: {projects.length.toString().padStart(2, '0')}
          </div>
        </div>
        <ProjectVault projects={projects} loading={portfolioLoading} />
      </section>

      {/* My Journey Track */}
      <section id="journey" className="space-y-20">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-16 h-16 glass rounded-full flex items-center justify-center text-accent-1 mx-auto shadow-[0_0_20px_rgba(0,245,255,0.2)]"
          >
            <CircleDot size={32} />
          </motion.div>
          <h2 className="text-4xl font-black italic uppercase tracking-tight">Temporal <span className="text-accent-1">Journey</span></h2>
          <p className="text-accent-2 max-w-xl mx-auto">Tracking system incidents and development milestones across the timeline.</p>
        </div>
        <JourneyTrack journeys={journeys} loading={portfolioLoading} />
      </section>

      <footer className="py-12 text-center text-accent-2 text-sm border-t border-accent-2/5 space-y-4">
        <p>&copy; {new Date().getFullYear()} Uttiyo Modak. All rights reserved.</p>
        <div className="flex justify-center">
          <a 
            href="/admin" 
            className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 hover:text-accent-1 transition-all"
          >
            Admin-Uttiyo
          </a>
        </div>
      </footer>
    </div>
  );
}
