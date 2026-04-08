"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Loader2, FileCheck } from "lucide-react";

export function ResumeFAB() {
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle");

  const handleDownload = () => {
    setStatus("downloading");
    
    setTimeout(() => {
      setStatus("done");
      
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "portfolio-resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => setStatus("idle"), 3000);
    }, 2500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={handleDownload}
        disabled={status !== "idle"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass relative flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border-accent-1/20 group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3"
            >
              <Download className="text-accent-1 group-hover:animate-bounce" size={20} />
              <span className="font-bold tracking-tight">RESUME.cmd</span>
            </motion.div>
          )}

          {status === "downloading" && (
            <motion.div 
              key="downloading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3"
            >
              <Loader2 className="text-accent-1 animate-spin" size={20} />
              <span className="font-medium animate-pulse">System Downloading...</span>
            </motion.div>
          )}

          {status === "done" && (
            <motion.div 
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3"
            >
              <FileCheck className="text-green-500" size={20} />
              <span className="font-bold text-green-500">Download Complete</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent-1/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
}
