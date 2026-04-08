"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Code2 } from "lucide-react";
import { FloatingCard } from "./floating-card";

interface Project {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  tags: string[];
  techStack?: string[];
  githubLink?: string;
  liveDemoLink?: string;
  image?: string;
}

interface ProjectVaultProps {
  projects: Project[];
  loading?: boolean;
}

export function ProjectVault({ projects, loading }: ProjectVaultProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find((p) => (p._id || p.id) === selectedId);

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-64 glass rounded-2xl" />)}
    </div>;
  }

  const GithubIcon = Github || Code2;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id || project.id}
            layoutId={project._id || project.id}
            onClick={() => setSelectedId((project._id || project.id) as string)}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer group"
          >
            <FloatingCard className="p-0 overflow-hidden h-full group">
              <div className="aspect-video bg-accent-2/10 relative overflow-hidden">
                {project.image ? (
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Code2 size={80} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-black group-hover:text-accent-1 transition-colors drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-accent-2 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-accent-1/10 text-accent-1 text-[10px] font-bold uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 border-t border-accent-1/5 pt-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] text-accent-2/60 font-medium px-1.5 py-0.5 rounded bg-white/5 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FloatingCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              layoutId={selectedId}
              className="fixed inset-4 md:inset-x-[15%] md:inset-y-[12%] glass rounded-3xl z-[70] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 glass rounded-full hover:text-accent-1 transition-colors z-[80] shadow-xl"
              >
                <X size={20} />
              </button>

              <div className="h-full flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-accent-2/10 relative overflow-hidden min-h-[250px] md:min-h-full">
                   {selectedProject.image ? (
                     <img 
                       src={selectedProject.image} 
                       alt={selectedProject.title}
                       className="w-full h-full object-cover"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center">
                       <Code2 size={120} className="text-accent-1 opacity-20" />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-accent-1/10 mix-blend-overlay" />
                </div>
                <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-start gap-6 bg-zinc-950/80 backdrop-blur-xl">
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase">{selectedProject.title}</h2>
                    <div className="h-1 w-16 bg-accent-1" />
                    <p className="text-accent-2 leading-relaxed text-sm md:text-base font-medium">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-accent-1/10 text-accent-1 text-[9px] font-black uppercase tracking-widest border border-accent-1/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-accent-1/60">Tectonic Stack</p>
                       <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech) => (
                          <div 
                            key={tech}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-accent-2 font-bold"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-1 shadow-[0_0_5px_rgba(0,245,255,0.5)]" />
                            {tech}
                          </div>
                        ))}
                       </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href={selectedProject.githubLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass py-4 rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-white/5 transition-all group"
                    >
                      <GithubIcon size={18} className="text-accent-1" /> 
                      <span className="uppercase tracking-widest text-[10px]">Source Code</span>
                    </a>
                    <a
                      href={selectedProject.liveDemoLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-accent-1 text-zinc-950 py-4 rounded-xl flex items-center justify-center gap-3 font-black hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] transition-all"
                    >
                      <ExternalLink size={18} /> 
                      <span className="uppercase tracking-widest text-[10px]">Live System</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
