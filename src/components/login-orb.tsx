"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";

export function LoginOrb() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative group"
      >
        <button
          onClick={() => (session ? signOut() : signIn("github"))}
          className="w-14 h-14 rounded-full glass flex items-center justify-center border-accent-1/30 shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-500 overflow-hidden"
        >
          {session?.user?.image ? (
            <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
          ) : (
            <User className="text-accent-1" size={24} />
          )}
          
          {/* Drifting ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-accent-1/20 rounded-full scale-125"
          />
        </button>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="glass px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold">
            {session ? `Sign Out (${session.user?.name})` : "Enter the Void"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
