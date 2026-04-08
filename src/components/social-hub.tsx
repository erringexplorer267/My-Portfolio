"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Globe, LucideIcon } from "lucide-react";

interface Social {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface MagneticProps {
  children: React.ReactNode;
}

export function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

const socials: Social[] = [
  { icon: Github || Globe, href: "https://github.com/erringexplorer267", label: "GitHub" },
  { icon: Linkedin || Globe, href: "https://www.linkedin.com/in/uttiyo-modak-4b49752b7/", label: "LinkedIn" },
  { icon: Instagram || Globe, href: "https://instagram.com/psychopath_xd_", label: "Instagram" },
];

export function SocialHub() {
  return (
    <div className="flex gap-8 justify-center">
      {socials.map((social) => (
        <Magnetic key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 glass rounded-2xl flex items-center justify-center border-accent-1/20 hover:border-accent-1/50 group transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
          >
            <social.icon 
              className="text-foreground group-hover:text-accent-1 transition-colors" 
              size={28} 
            />
          </a>
        </Magnetic>
      ))}
    </div>
  );
}
