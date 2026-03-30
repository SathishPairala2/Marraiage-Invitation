"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 500);
    }
  }, [isOpen]);

  // Prevent scrolling while curtain is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-theater-cream text-theater-red">
      
      {/* Theater Curtain Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            key="curtain"
            className="fixed inset-0 z-[100] flex cursor-pointer"
            onClick={() => setIsOpen(true)}
            exit={{ opacity: 0, transition: { delay: 1, duration: 0.1 } }}
          >
            {/* Left Curtain */}
            <motion.div 
              className="w-1/2 h-full z-[101] shadow-[15px_0_30px_rgba(0,0,0,0.8)] border-r-2 border-red-950/50"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 15%, rgba(0,0,0,0.6) 50%, rgba(255,255,255,0.1) 85%, rgba(0,0,0,0.5) 100%), linear-gradient(to bottom, #5C2018, #3A0000)`,
                backgroundBlendMode: 'multiply',
                backgroundSize: '8vw 100%, 100% 100%'
              }}
              exit={{ x: "-100%", skewX: "2deg" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Right Curtain */}
            <motion.div 
              className="w-1/2 h-full z-[101] shadow-[-15px_0_30px_rgba(0,0,0,0.8)] border-l-2 border-red-950/50"
              style={{
                backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 15%, rgba(0,0,0,0.6) 50%, rgba(255,255,255,0.1) 85%, rgba(0,0,0,0.5) 100%), linear-gradient(to bottom, #5C2018, #3A0000)`,
                backgroundBlendMode: 'multiply',
                backgroundSize: '8vw 100%, 100% 100%'
              }}
              exit={{ x: "100%", skewX: "-2deg" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />
            
            {/* Tap to continue Text */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-[102]"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center gap-6 text-theater-cream">
                <span className="font-sans tracking-widest text-xs uppercase opacity-80 animate-pulse">
                  Tap to continue
                </span>
                <h2 className="text-5xl md:text-7xl font-cursive text-theater-cream drop-shadow-md">
                  The Invitation
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center px-4 w-full h-full justify-center">
        {showContent && (
          <>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-xs md:text-sm font-sans tracking-[0.25em] text-theater-green mb-10 uppercase font-semibold"
            >
              ॥ Shree Ganeshaya Namaha ॥
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-1 mb-10"
            >
              <span className="text-[10px] md:text-xs font-serif tracking-[0.3em] uppercase text-theater-red/70 border-y border-theater-red/20 py-3 px-8">
                Together with their families
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 md:gap-6 my-2"
            >
              <h1 className="text-7xl md:text-9xl 2xl:text-[11rem] font-cursive text-theater-red leading-none drop-shadow-sm">
                Saritha
              </h1>
              <span className="text-sm md:text-base font-serif text-theater-green/70 my-4 tracking-[0.4em] uppercase">
                And
              </span>
              <h1 className="text-7xl md:text-9xl 2xl:text-[11rem] font-cursive text-theater-red leading-none drop-shadow-sm">
                Sravan Kumar
              </h1>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.5 }}
              className="absolute bottom-10 z-10 flex flex-col items-center gap-4"
            >
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-sans text-theater-red/60">
                SCROLL
              </span>
              <motion.div
                animate={{ height: ["0px", "40px", "0px"], opacity: [0, 1, 0], y: [0, 20, 40] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-[1px] bg-theater-red/40"
              />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
