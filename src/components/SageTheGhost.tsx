import React from "react";
import { motion } from "motion/react";
import { Ghost } from "lucide-react";

export const SageTheGhost = ({ className = "", size = 24 }: { className?: string, size?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -4, 0],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={`inline-flex items-center justify-center drop-shadow-[0_2px_4px_rgba(166,139,106,0.2)] ${className}`}
  >
    <Ghost size={size} strokeWidth={1.5} />
  </motion.div>
);
