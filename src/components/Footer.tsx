"use client";

import { motion } from "framer-motion";
import { Camera, MessageCircle } from "lucide-react";

export default function Footer() {
  const shareMessage = encodeURIComponent("You're invited to Saritha & Sravan Kumar's Wedding! Join us in celebration on April 2, 2026. View our invitation: [Website Link]");

  return (
    <footer className="w-full bg-theater-red text-theater-cream pt-24 pb-12 flex flex-col items-center relative overflow-hidden">

      <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center md:text-left relative z-10 border-b border-theater-cream/20 pb-16">
        
        {/* Left: Thank You message */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-5xl font-cursive text-theater-cream mb-6">Thank You</h3>
          <p className="font-sans text-theater-cream/80 text-sm leading-relaxed max-w-xs font-light tracking-wide">
            Your presence is our blessing. We can&apos;t wait to celebrate the beginning of our beautiful journey with you.
          </p>
        </div>

        {/* Middle: Family */}
        <div className="flex flex-col items-center">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-theater-cream/60 mb-6">Invited By</h4>
          <div className="font-serif text-lg md:text-xl flex flex-col gap-3 items-center text-center">
            <p className="tracking-widest">Smt. & Sri Thotakuri Sujatha</p>
            <p className="tracking-widest">Sri Mallesh Yadav</p>
          </div>
        </div>

        {/* Right: Social & Contact */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-theater-cream/60 mb-6">Share the Joy</h4>
          <div className="flex gap-4">
            <a 
              href={`https://wa.me/?text=${shareMessage}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-theater-cream/30 flex items-center justify-center hover:bg-theater-cream hover:text-theater-red transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-theater-cream/30 flex items-center justify-center hover:bg-theater-cream hover:text-theater-red transition-all"
            >
              <Camera className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-[10px] font-sans tracking-[0.3em] uppercase text-theater-cream/40 relative z-10 w-full px-6 flex flex-col md:flex-row justify-center md:justify-between items-center max-w-5xl mx-auto">
        <p>Saritha & Sravan Kumar.</p>
        <p className="mt-4 md:mt-0 opacity-80">Forged in Love</p>
      </div>

    </footer>
  );
}
