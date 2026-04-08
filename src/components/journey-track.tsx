"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { FloatingCard } from "./floating-card";
import { Circle, Calendar } from "lucide-react";

interface JourneyItem {
  _id: string;
  title: string;
  date: string;
  description: string;
}

interface JourneyTrackProps {
  journeys: JourneyItem[];
  loading?: boolean;
}

export function JourneyTrack({ journeys, loading }: JourneyTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return <div className="h-96 glass animate-pulse rounded-3xl" />;
  }

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-20 pb-40">
      {/* Central Track Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-accent-1/10 -translate-x-1/2 rounded-full overflow-hidden">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-accent-1 shadow-[0_0_15px_rgba(0,245,255,0.5)]"
        />
      </div>

      <div className="space-y-40">
        {journeys.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`flex items-center gap-12 ${idx % 2 === 0 ? "flex-row text-right" : "flex-row-reverse text-left"}`}
          >
            {/* Content Card */}
            <div className="flex-1">
              <FloatingCard className="relative group">
                <div className="flex flex-col gap-2">
                   <h3 className={`text-xl font-black text-white italic tracking-tight ${idx % 2 === 0 ? "text-right" : "text-left"}`}>
                     {item.title}
                   </h3>
                   <div className={`flex items-center gap-2 text-accent-1 font-black italic tracking-widest text-[10px] uppercase ${idx % 2 === 0 ? "justify-end" : "justify-start"}`}>
                     <Calendar size={10} />
                     {item.date}
                   </div>
                   <p className="text-accent-2 text-lg font-medium leading-relaxed">
                     {item.description}
                   </p>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-1 bg-accent-1/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-3xl -z-10" />
              </FloatingCard>
            </div>

            {/* Pivot Point */}
            <div className="relative z-10 flex items-center justify-center">
               <motion.div 
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 viewport={{ once: true }}
                 className="w-4 h-4 bg-background border-2 border-accent-1 rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"
               />
               <div className="absolute w-12 h-[2px] bg-accent-1/20 -z-10" />
            </div>

            {/* Spacer for layout symmetry */}
            <div className="flex-1" />
          </motion.div>
        ))}

        {journeys.length === 0 && (
          <div className="text-center text-accent-2 italic py-20">
            Scanning temporal data... No incidents recorded in this sector yet.
          </div>
        )}
      </div>
    </div>
  );
}
