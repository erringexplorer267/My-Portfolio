"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Socials", href: "#socials" },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-6">
      <motion.nav
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass backdrop-blur-xl border border-accent-1/20 px-8 py-3 rounded-2xl flex items-center gap-12 shadow-[0_0_50px_rgba(255,70,85,0.1)]"
      >
        <a href="#" className="flex items-center gap-0 group select-none shrink-0">
          <span className="text-sm font-black italic tracking-tight text-accent-1 group-hover:opacity-80 transition-opacity duration-200">uttiyo</span>
          <span className="mx-2 text-accent-2/40 font-light text-base leading-none">|</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-2/70 group-hover:text-accent-2 transition-colors duration-200">Portfolio</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-black uppercase tracking-[0.2em] text-accent-2 hover:text-accent-1 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-1 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:text-accent-1 transition-colors"
        >
          {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
        </button>
      </motion.nav>
    </div>
  );
}
