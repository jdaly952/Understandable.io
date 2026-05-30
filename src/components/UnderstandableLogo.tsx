import React from "react";
import { SageTheGhost } from "./SageTheGhost";

export const UnderstandableLogo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 md:gap-4 ${className}`}>
    <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
      <SageTheGhost size={32} className="absolute -top-4 -left-4 -rotate-12 opacity-40 md:opacity-100" />
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-accent relative z-10">
        <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50 10 L50 90" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 30 L50 50 L90 30" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 70 L50 50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M90 70 L50 50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M40 40 L40 55 Q40 65 50 65 Q60 65 60 55 L60 40" 
              stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="hidden md:block font-display text-xl md:text-3xl font-black uppercase tracking-[0.2em] text-ink">Understandable.io</span>
    </div>
  </div>
);
