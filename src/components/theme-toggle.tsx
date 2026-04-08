"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed top-8 left-8 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-accent-1/20 transition-all shadow-lg overflow-hidden"
      >
        <div className="relative w-6 h-6">
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === "dark" ? 0 : 180,
              opacity: theme === "dark" ? 1 : 0,
              scale: theme === "dark" ? 1 : 0
            }}
            className="absolute inset-0 flex items-center justify-center text-accent-1"
          >
            <Moon size={20} />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === "light" ? 0 : -180,
              opacity: theme === "light" ? 1 : 0,
              scale: theme === "light" ? 1 : 0
            }}
            className="absolute inset-0 flex items-center justify-center text-accent-1"
          >
            <Sun size={20} />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}
