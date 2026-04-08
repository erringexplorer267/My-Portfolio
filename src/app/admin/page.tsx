"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, LogOut, Plus, Trash2, Edit3, Settings, Loader2, Sparkles, Database } from "lucide-react";
import { FloatingCard } from "@/components/floating-card";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import toast, { Toaster } from "react-hot-toast";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveDemoLink, setLiveDemoLink] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skillLogo, setSkillLogo] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyDescription, setJourneyDescription] = useState("");
  const [skillCategory, setSkillCategory] = useState<"Frontend" | "Backend" | "AI/ML" | "Languages" | "DevOps & Tools" | "Database">("Frontend");
  const [newNodeType, setNewNodeType] = useState<"skill" | "project" | "journey">("project");
  const [projectTechStack, setProjectTechStack] = useState("");
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  const { skills, projects, journeys, loading, setSkills, setProjects, setJourneys } = usePortfolioData() as any;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "amijanina") {
      setIsAuthorized(true);
      setError("");
      toast.success("Security Uplink Established");
    } else {
      setError("Unauthorized access attempt. Sequence logged.");
      toast.error("Invalid Access Key");
    }
  };

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName) return;
    
    setIsInitializing(true);
    const getAutomaticIcon = (name: string) => {
      const n = name.toLowerCase();
      if (n.includes("python")) return "Terminal";
      if (n.includes("javascript") || n.includes("js")) return "Braces";
      if (n.includes("react")) return "Globe";
      if (n.includes("node")) return "Server";
      if (n.includes("iot") || n.includes("hardware") || n.includes("arduino")) return "Cpu";
      if (n.includes("database") || n.includes("mongodb") || n.includes("sql")) return "Database";
      return "Zap";
    };

    const body = {
      type: newNodeType,
      data: newNodeType === 'skill' 
        ? { 
            name: newNodeName, 
            category: skillCategory,
            icon: skillLogo || "Zap"
          }
        : newNodeType === 'project'
        ? { 
            title: newNodeName, 
            description: projectDescription || "New project initialized in vault.", 
            category: "Default", 
            link: "#", 
            tags: ["New"],
            techStack: projectTechStack.split(',').map(s => s.trim()).filter(s => s !== ""),
            githubLink: githubLink,
            liveDemoLink: liveDemoLink,
            image: projectImage ? (projectImage.startsWith('/') ? projectImage : `/${projectImage}`) : ""
          }
        : {
            title: newNodeName,
            date: journeyDate,
            description: journeyDescription
          }
    };

    try {
      const res = await fetch(`/api/admin/update`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const savedData = await res.json();
        toast.success(`${newNodeType === 'skill' ? 'Skill' : 'Project'} Node Initialized`);
        
        // Optimistic Update
        if (newNodeType === 'skill') {
          setSkills((prev: any) => [...prev, savedData]);
        } else if (newNodeType === 'project') {
          setProjects((prev: any) => [...prev, savedData]);
        } else if (newNodeType === 'journey') {
          setJourneys((prev: any) => [...prev, savedData]);
        }

        setShowUpdateSuccess(true);
        setTimeout(() => setShowUpdateSuccess(false), 3000);
        setNewNodeName("");
        setGithubLink("");
        setLiveDemoLink("");
        setProjectImage("");
        setProjectDescription("");
        setProjectTechStack("");
        setSkillLogo("");
        setJourneyDate("");
        setJourneyDescription("");
      } else {
        toast.error("Initialization Failed");
      }
    } catch (err) {
      toast.error("System Override Error");
    } finally {
      setIsInitializing(false);
    }
  };

  const deleteItem = async (type: "skill" | "project" | "journey", id: string) => {
    const confirmPrune = confirm("Initiate pruning sequence?");
    if (!confirmPrune) return;

    try {
      const res = await fetch(`/api/admin/delete`, { 
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`
        },
        body: JSON.stringify({ type, id })
      });

      if (res.ok) {
        toast.success("Node Pruned Successfully");
        if (type === 'skill') {
          setSkills((prev: any) => prev.filter((s: any) => (s._id || s.id) !== id));
        } else if (type === 'project') {
          setProjects((prev: any) => prev.filter((p: any) => (p._id || p.id) !== id));
        } else if (type === 'journey') {
          setJourneys((prev: any) => prev.filter((j: any) => (j._id || j.id) !== id));
        }
      } else {
        toast.error("Pruning Failed");
      }
    } catch (err) {
      toast.error("Sync Interrupted");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
        <Toaster position="top-center" reverseOrder={false} />
        <FloatingCard className="w-full max-w-md p-10 space-y-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-accent-1">
              <Lock size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-widest">Admin Uplink</h1>
              <p className="text-accent-2 text-sm">Secure biometric or password bypass required.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-accent-2 tracking-widest">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass bg-white/5 border-accent-1/20 text-foreground px-4 py-3 rounded-xl focus:border-accent-1 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-accent-1 text-xs font-bold animate-pulse">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-accent-1 text-background font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all uppercase tracking-widest"
            >
              Initialize Session
            </button>
          </form>
        </FloatingCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <AnimatePresence>
        {showUpdateSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 30, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-12 left-1/2 transform -translate-x-1/2 z-[100] text-[#ff4655] font-black tracking-[0.2em] uppercase text-2xl drop-shadow-[0_0_15px_rgba(255,70,85,0.8)]"
          >
            Vault Updated
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="top-right" />
      <header className="glass border-b border-accent-1/20 px-8 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-2 glass rounded-lg text-accent-1">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest">Admin Dashboard</h2>
            <p className="text-[10px] text-accent-1 animate-pulse">Session: Active [Uplink Established]</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAuthorized(false)}
          className="text-accent-2 hover:text-accent-1 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={16} /> Disconnect
        </button>
      </header>

      <main className="container mx-auto p-8 space-y-12">
        {/* Node Creator Form */}
        <section>
          <FloatingCard className="bg-accent-1/5 border-accent-1/20">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="text-accent-1" />
              <h3 className="text-lg font-black italic uppercase tracking-widest">Node Creator</h3>
            </div>
            <form onSubmit={handleInitialize} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <input 
                    type="text"
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    placeholder="Enter dynamic node name..."
                    className="w-full glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all"
                  />
                </div>
                <select 
                  value={newNodeType}
                  onChange={(e: any) => setNewNodeType(e.target.value)}
                  className="glass bg-background border-accent-2/20 px-4 py-3 rounded-xl text-accent-2 outline-none font-bold uppercase text-xs"
                >
                  <option value="project">Project Node</option>
                  <option value="skill">Skill Node</option>
                  <option value="journey">Journey Node</option>
                </select>
                <button 
                  disabled={isInitializing}
                  type="submit"
                  className="bg-accent-1 text-background font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isInitializing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Loader2 size={20} />
                    </motion.div>
                  ) : (
                    <Plus size={20} />
                  )}
                  Initialize
                </button>
              </div>

              {newNodeType === "project" ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      placeholder="GitHub Repo Link"
                      className="glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                    />
                    <input 
                      type="text"
                      value={liveDemoLink}
                      onChange={(e) => setLiveDemoLink(e.target.value)}
                      placeholder="Live Demo Link"
                      className="glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                    />
                  </div>
                  <input 
                    type="text"
                    value={projectImage}
                    onChange={(e) => setProjectImage(e.target.value)}
                    placeholder="Project Preview Image Filename (e.g. preview.png)"
                    className="w-full glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                  />
                  <textarea 
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Project Short Description (2-3 lines max)"
                    rows={3}
                    className="w-full glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm resize-none"
                  />
                  <input 
                    type="text"
                    value={projectTechStack}
                    onChange={(e) => setProjectTechStack(e.target.value)}
                    placeholder="Tech Stack (comma separated, e.g. React, Next.js, MongoDB)"
                    className="w-full glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                  />
                </div>
              ) : newNodeType === "skill" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <select 
                    value={skillCategory}
                    onChange={(e: any) => setSkillCategory(e.target.value)}
                    className="glass bg-background border-accent-2/20 px-4 py-3 rounded-xl text-accent-2 outline-none font-bold uppercase text-xs col-span-1"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Languages">Languages</option>
                    <option value="DevOps & Tools">DevOps & Tools</option>
                    <option value="Database">Database</option>
                  </select>
                  <input 
                    type="text"
                    value={skillLogo}
                    onChange={(e) => setSkillLogo(e.target.value)}
                    placeholder="Skill Logo filename (e.g. python.png)"
                    className="col-span-2 glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    placeholder="Date (e.g. 2024 - 2025)"
                    className="glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                  />
                  <input 
                    type="text"
                    value={journeyDescription}
                    onChange={(e) => setJourneyDescription(e.target.value)}
                    placeholder="Brief description of the incident..."
                    className="col-span-2 glass bg-white/5 border-accent-2/20 px-4 py-3 rounded-xl text-foreground focus:border-accent-1 outline-none transition-all text-sm"
                  />
                </div>
              )}
            </form>
          </FloatingCard>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vault List: Skills */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-accent-1/10 pb-4">
              <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                <Database size={18} className="text-accent-1" />
                Skill Nodes
              </h3>
              <span className="text-xs font-bold text-accent-2">{skills.length} Loaded</span>
            </div>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {skills.map((skill: any) => (
                  <motion.div 
                    key={skill._id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="glass p-4 rounded-xl flex items-center justify-between group"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{skill.name}</span>
                      <span className="text-[10px] text-accent-2 uppercase font-black">{skill.category}</span>
                    </div>
                    <button 
                      onClick={() => deleteItem('skill', skill._id)}
                      className="p-2 text-accent-2 hover:text-accent-1 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Vault List: Projects */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-accent-1/10 pb-4">
              <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                <Sparkles size={18} className="text-accent-1" />
                Project Vault
              </h3>
              <span className="text-xs font-bold text-accent-2">{projects.length} Nodes</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {projects.map((project: any) => (
                  <motion.div 
                    key={project._id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="glass overflow-hidden group border border-accent-1/5"
                  >
                    <div className="aspect-video bg-white/5 p-8 flex items-center justify-center relative overflow-hidden">
                       <Database className="absolute opacity-5 -right-4 -bottom-4" size={120} />
                       <Edit3 className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-1 z-10" size={32} />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-black/20">
                      <div>
                        <h4 className="font-bold text-sm tracking-tight">{project.title}</h4>
                        <p className="text-[10px] text-accent-2 italic uppercase">Node: {project._id.slice(-6)}</p>
                      </div>
                      <button 
                        onClick={() => deleteItem('project', project._id)}
                        className="p-2 text-accent-2 hover:text-accent-1 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Journey Management */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-accent-1/10 pb-4">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Database size={18} className="text-accent-1" />
              Journey Incidents
            </h3>
            <span className="text-xs font-bold text-accent-2">{journeys.length} Nodes</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {journeys.map((j: any) => (
                <motion.div 
                  key={j._id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="glass p-4 rounded-xl flex items-center justify-between group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{j.title}</span>
                    <span className="text-[10px] text-accent-1 italic">{j.date}</span>
                    <span className="text-[10px] text-accent-2 uppercase font-black truncate max-w-[150px]">{j.description}</span>
                  </div>
                  <button 
                    onClick={() => deleteItem('journey', j._id)}
                    className="p-2 text-accent-2 hover:text-accent-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
