"use client";

import { FloatingCard } from "./floating-card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { GitBranch, Activity, Code } from "lucide-react";

interface GithubData {
  totalRepos: number;
  languages: { name: string; value: number }[];
  recentActivity: any[];
  avatarUrl: string;
  name: string;
}

interface GithubPulseProps {
  data: GithubData | null;
  loading: boolean;
}

const COLORS = ["#00f5ff", "#7000ff", "#0066ff", "#64748b", "#3b82f6"];

export function GithubPulse({ data, loading }: GithubPulseProps) {
  if (loading) {
    return (
      <FloatingCard className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-accent-2/20 rounded-full" />
          <div className="h-4 w-32 bg-accent-2/20 rounded" />
          <div className="h-4 w-48 bg-accent-2/20 rounded" />
        </div>
      </FloatingCard>
    );
  }

  return (
    <FloatingCard className="w-full overflow-hidden p-0 group/pulse">
      <div className="flex flex-col md:flex-row min-h-[420px]">
        {/* Left Side: Stats and Chart */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <img src={data?.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-xl border border-accent-1/30 object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                 <h3 className="text-xs font-black uppercase tracking-[0.25em] text-accent-1">Core Identity</h3>
                 <span className="w-2 h-[1px] bg-accent-1/30" />
              </div>
              <h4 className="text-lg font-black italic tracking-tighter text-foreground -mt-1 truncate max-w-[180px]">
                {data?.name || "Anonymous Engineer"}
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="relative p-4 rounded-xl glass border border-accent-1/10 overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10"><GitBranch size={40} /></div>
              <div className="relative z-10 flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-1 mb-1">Repositories</span>
                <span className="text-3xl font-black italic tracking-tighter text-foreground">{data?.totalRepos?.toString().padStart(2, '0') || "00"}</span>
              </div>
            </div>
            <div className="relative p-4 rounded-xl glass border border-accent-2/10 overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10"><Activity size={40} /></div>
              <div className="relative z-10 flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-2 mb-1">Latest Pulse</span>
                <span className="text-xs font-black italic tracking-tight text-foreground truncate mt-2">{data?.recentActivity[0]?.repo.split("/").pop() || "Idle"}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
                 <Code size={14} className="text-accent-2" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-2">Language Matrix</h4>
            </div>
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.languages}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {data?.languages?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#fff', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.1em' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Optional: Center hole text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-accent-2/40">Efficiency</span>
                    <span className="text-xs font-black italic text-foreground leading-none">OPTIMIZED</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Language Legend */}
        <div className="w-full md:w-[200px] lg:w-[240px] bg-accent-1/5 md:border-l border-accent-1/10 p-6 flex flex-col justify-center space-y-5">
          {data?.languages?.map((lang, i) => (
            <div key={lang.name} className="flex items-center group/lang transition-all duration-300">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div 
                  className="w-1.5 h-1.5 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all group-hover/lang:scale-125 group-hover/lang:ring-offset-0 shrink-0" 
                  style={{ 
                    backgroundColor: COLORS[i % COLORS.length],
                    boxShadow: `0 0 10px ${COLORS[i % COLORS.length]}88`
                  } as any} 
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-2/80 group-hover/lang:text-foreground transition-colors truncate">
                  {lang.name}
                </span>
              </div>
              <div className="flex items-center gap-2 pl-4 ml-2 border-l border-white/5 w-16 shrink-0 justify-end">
                <span className="text-[11px] font-black italic text-accent-1 group-hover/lang:translate-x-[-2px] transition-transform">
                  {lang.value}
                </span>
                <span className="text-[7px] font-black uppercase tracking-tighter text-accent-2/20">RPS</span>
              </div>
            </div>
          ))}
          {/* Subtle decoration */}
          <div className="pt-4 mt-4 border-t border-white/5 opacity-20 hidden md:block">
             <div className="flex flex-col gap-1">
                <div className="h-1 w-full bg-accent-1/10 rounded-full" />
                <div className="h-1 w-2/3 bg-accent-1/10 rounded-full" />
             </div>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}
