"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Couple() {
  return (
    <section className="w-full py-24 md:py-32 bg-theater-cream relative overflow-hidden flex flex-col items-center">
      
      {/* Frame style border for image */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl mx-auto px-6"
      >
        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full border-[8px] md:border-[16px] border-white shadow-2xl overflow-hidden bg-white">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/RAJ09650.JPG.jpeg" 
              alt="Couple"
              fill
              className="object-cover sepia-[0.2]"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            {/* Darker Theater Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-theater-red/30 via-transparent to-transparent mix-blend-multiply" />
          </motion.div>
        </div>
      </motion.div>

      {/* Names below image */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-cursive text-theater-red drop-shadow-sm pr-4">Saritha</h2>
          <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-theater-green mt-4 border-t border-theater-red/30 pt-4 px-4">
            Bride
          </p>
        </div>

        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-theater-red text-2xl md:text-4xl font-serif italic my-4 md:my-0"
        >
          &
        </motion.div>

        <div className="flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-cursive text-theater-red drop-shadow-sm pl-4">Sravan Kumar</h2>
          <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-theater-green mt-4 border-t border-theater-red/30 pt-4 px-4">
            Groom
          </p>
        </div>
      </motion.div>
    </section>
  );
}
