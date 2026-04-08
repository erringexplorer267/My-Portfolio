"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingCard({ children, className, delay = 0 }: FloatingCardProps) {
  const finalDelay = Math.random() * 2 + delay;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{
        duration: 8, // Slower floating
        repeat: Infinity,
        ease: "easeInOut",
        delay: finalDelay,
      }}
      style={{ willChange: "transform" }}
      className={cn(
        "glass p-6 rounded-2xl shadow-xl transition-all duration-500",
        "border border-accent-1/10 hover:border-accent-1/60",
        "relative overflow-hidden group",
        "hover:shadow-[0_0_40px_rgba(255,70,85,0.2)]",
        className
      )}
    >
      {/* Dynamic Glow Overlay */}
      <div className="absolute inset-0 bg-accent-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Neon Edge Highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-1/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {children}
    </motion.div>
  );
}
