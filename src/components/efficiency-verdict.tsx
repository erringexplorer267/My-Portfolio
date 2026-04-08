"use client";

import { motion } from "framer-motion";
import { FloatingCard } from "./floating-card";
import { ShieldCheck, Cpu, Zap, Target } from "lucide-react";
import { useMemo } from "react";

interface EfficiencyVerdictProps {
  repoCount: number;
  languages: { name: string; value: number }[];
  projectCount: number;
}

export function EfficiencyVerdict({ repoCount, languages, projectCount }: EfficiencyVerdictProps) {
  const verdict = useMemo(() => {
    const totalScore = (repoCount * 2) + (projectCount * 5) + (languages.length * 5);
    const score = Math.min(100, Math.floor(totalScore / 1.5));
    
    let label = "Emerging Talent";
    let sublabel = "Building the foundation of modern systems.";
    
    if (score > 85) {
      label = "Architecture Specialist";
      sublabel = "High-efficiency systems designer with scale mindset.";
    } else if (score > 70) {
      label = "Product-Minded Engineer";
      sublabel = "Focused on delivering user-centric scalable features.";
    } else if (score > 50) {
      label = "System Strategist";
      sublabel = "Optimizing performance across the full stack.";
    }
    
    return { score, label, sublabel };
  }, [repoCount, languages, projectCount]);

  return (
    <FloatingCard className="relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <ShieldCheck size={120} className="text-accent-1" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Target className="text-accent-1" size={20} />
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent-2">System Analytics</h3>
        </div>
        
        <h2 className="text-3xl font-black mb-2 tracking-tight">
          The Efficiency <span className="text-accent-1">Verdict</span>
        </h2>
        
        <div className="flex items-center gap-4 my-8">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-accent-2/10"
              />
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="var(--accent-1)" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 283" }}
                animate={{ strokeDasharray: `${(verdict.score / 100) * 283} 283` }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">{verdict.score}%</span>
            </div>
          </div>
          
          <div>
            <div className="text-xl font-bold text-white">{verdict.label}</div>
            <p className="text-sm text-accent-2 max-w-[200px] leading-tight">
              {verdict.sublabel}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-1/10 text-accent-1">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-accent-2">Velocity</div>
              <div className="font-bold">{repoCount > 20 ? "Turbo" : repoCount > 10 ? "High" : "Optimal"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-2/10 text-accent-2">
              <Cpu size={18} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-accent-2">Complexity</div>
              <div className="font-bold">{(projectCount * 1.5 + repoCount * 0.5).toFixed(1)}x</div>
            </div>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}
