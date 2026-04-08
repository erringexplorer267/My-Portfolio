"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface TerminalAboutProps {
  text: string;
}

export function TerminalAbout({ text }: TerminalAboutProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-xl overflow-hidden font-mono text-sm md:text-base border-accent-1/20 shadow-2xl"
    >
      <div className="bg-white/5 border-b border-accent-1/10 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center text-accent-2 text-xs flex items-center justify-center gap-2">
          <Terminal size={12} /> journey_path.sh
        </div>
      </div>
      <div className="p-6 space-y-2 min-h-[200px]">
        <div className="flex gap-2 text-accent-1">
          <span>$</span>
          <span>my journey.txt</span>
        </div>
        <div className="text-foreground leading-relaxed">
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-accent-1 ml-1 align-middle"
          />
        </div>
      </div>
    </motion.div>
  );
}
