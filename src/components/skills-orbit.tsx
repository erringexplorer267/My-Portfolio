"use client";

import { motion } from "framer-motion";
import { Cpu, Layout, Server, Database, Globe, Zap, Terminal, Braces, Sparkles, Settings, Layers } from "lucide-react";

const skillIcons: Record<string, any> = {
  Terminal,
  Braces,
  Server,
  Globe,
  Cpu,
  Database,
  Zap,
  Sparkles,
  Settings,
  Layers
};

interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "AI/ML" | "Languages" | "DevOps & Tools" | "Database";
  icon?: string;
}

const categoryIcons: Record<string, any> = {
  Frontend: Globe,
  Backend: Server,
  "AI/ML": Sparkles,
  Languages: Terminal,
  "DevOps & Tools": Settings,
  Database: Database,
};

interface SkillsOrbitProps {
  skills: Skill[];
  loading?: boolean;
}

export function SkillsOrbit({ skills, loading }: SkillsOrbitProps) {
  const categories = ["Frontend", "Backend", "AI/ML", "Languages", "DevOps & Tools", "Database"] as const;
  const displayNames: Record<string, string> = {
    Frontend: "Frontend",
    Backend: "Backend",
    "AI/ML": "AI / Machine Learning",
    Languages: "Programming Languages",
    "DevOps & Tools": "DevOps & Other Tools",
    Database: "Hardware & Database"
  };

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 glass rounded-2xl" />)}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
      {categories.map((cat, idx) => {
        const CategoryIcon = categoryIcons[cat] || Globe;
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, rotateY: idx % 2 === 0 ? 15 : -15 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="glass p-6 rounded-2xl border-accent-1/10 hover:border-accent-1/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] relative group"
          >
            <div className="absolute -top-4 -left-4 bg-accent-1 text-background px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest z-10 shadow-lg flex items-center gap-2">
              <CategoryIcon size={12} />
              {displayNames[cat]}
            </div>
            <div className="space-y-4 pt-4">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 group/item">
                    <div className="p-2 rounded-lg bg-accent-1/5 text-accent-1 group-hover/item:bg-accent-1 group-hover/item:text-background transition-colors duration-300 w-10 h-10 flex items-center justify-center overflow-hidden">
                      {(() => {
                        const iconPath = skill.icon || "";
                        const isImage = iconPath.includes(".") || iconPath.startsWith("/");
                        
                        if (isImage) {
                          const src = iconPath.startsWith("/") ? iconPath : `/${iconPath}`;
                          return <img src={src} alt={skill.name} className="w-full h-full object-contain group-hover/item:invert transition-all" />;
                        }
                        
                        const Icon = skillIcons[iconPath] || Zap;
                        return <Icon size={18} />;
                      })()}
                    </div>
                    <span className="text-sm font-medium text-accent-2 group-hover/item:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              {skills.filter(s => s.category === cat).length === 0 && (
                <p className="text-xs text-accent-2 italic">Node data required...</p>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
}
