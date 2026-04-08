"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { 
  X, 
  User, 
  Home, 
  Cpu, 
  Briefcase, 
  Share2, 
  Milestone,
  Command,
  LogOut,
  LogIn,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "next-themes";

export function DashboardToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Core Engine", href: "#home", icon: Home },
    { name: "Architecture", href: "#skills", icon: Cpu },
    { name: "System Vault", href: "#projects", icon: Briefcase },
    { name: "Temporal Journey", href: "#journey", icon: Milestone },
    { name: "Connections", href: "#socials", icon: Share2 },
  ];

  return (
    <>
      {/* Dashboard Trigger Orb */}
      <div className="fixed top-8 right-8 z-[100]">
        <motion.div
           animate={{ 
            y: [0, -4, 0],
            rotate: isOpen ? 90 : 0
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.5, ease: "anticipate" }
          }}
          className="relative group"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-[18px] flex items-center justify-center transition-all duration-500 border shadow-lg ${
            isOpen
              ? 'bg-accent-1 text-zinc-950 border-transparent shadow-[0_0_24px_rgba(88,166,255,0.4)]'
              : 'glass border-white/10 text-accent-1 hover:bg-accent-1/10 hover:shadow-[0_0_20px_rgba(88,166,255,0.2)]'
          }`}
          >
            {isOpen ? <X size={20} strokeWidth={2.5} /> : (
              session?.user?.image ? (
                <img src={session.user.image} alt="User" className="w-9 h-9 object-cover rounded-[12px]" />
              ) : (
                <Command size={22} strokeWidth={1.8} />
              )
            )}
            
            {/* Drifting ring around orb */}
            {!isOpen && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-accent-1/10 rounded-2xl scale-125"
              />
            )}
          </button>

          {/* Status Tooltip */}
          {!isOpen && (
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="glass px-4 py-2 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest border-accent-1/20 shadow-2xl">
                {session ? `Logged as ${session.user?.name}` : "Access Dashboard"}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Slid-out Dashboard Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[80]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-[320px] md:max-w-[400px] glass bg-zinc-950/90 border-l border-white/5 z-[90] p-12 flex flex-col gap-12"
            >
              {/* Header */}
              <div className="space-y-2 mt-8">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-accent-1">System</h2>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Dashboard</h2>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-accent-1 hover:text-zinc-950 transition-all duration-300 group/nav"
                    whileHover={{ scale: 1.02, x: -8 }}
                  >
                    <div className="p-2 rounded-lg bg-accent-1/10 group-hover/nav:bg-zinc-950/10 transition-colors">
                      <link.icon size={18} />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs whitespace-nowrap">{link.name}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Preferences */}
              <div className="mt-auto space-y-6 pt-12 border-t border-accent-1/10">
                <div className="flex items-center justify-between">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex items-center gap-3 glass px-6 py-3 rounded-xl hover:text-accent-1 transition-all"
                    >
                      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{theme === "dark" ? "Light Shift" : "Dark Shift"}</span>
                    </button>
                  )}
                  
                  <a href="/admin" onClick={() => setIsOpen(false)} className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
                    Admin
                  </a>
                </div>

                {/* Auth Session */}
                <div className="glass p-6 rounded-3xl space-y-4">
                  {session ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden glass border-accent-1/20">
                          <img src={session.user?.image || ""} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-sm truncate">{session.user?.name}</span>
                          <span className="text-[10px] text-accent-1 font-mono uppercase tracking-tighter opacity-70">Active Session</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => signOut()}
                        className="w-full py-4 glass border-accent-1/20 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                      >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Terminate Access</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-center space-y-2">
                         <div className="w-12 h-12 rounded-full glass border-accent-1/20 flex items-center justify-center mx-auto text-accent-2">
                           <User size={24} />
                         </div>
                         <p className="text-[10px] text-accent-2 font-medium uppercase tracking-[0.2em]">Guest User</p>
                      </div>
                      <button 
                        onClick={() => signIn("github")}
                        className="w-full py-4 bg-accent-1 text-zinc-950 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(88,166,255,0.4)] transition-all group"
                      >
                        <LogIn size={16} className="group-hover:translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Initialize Access</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
