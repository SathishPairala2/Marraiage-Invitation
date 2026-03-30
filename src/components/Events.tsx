"use client";

import { motion, Variants } from "framer-motion";
import ScratchCard from "./ScratchCard";

export default function Events() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const DateCircles = ({ day, month, year }: { day: string, month: string, year: string }) => (
    <div className="flex flex-col items-center gap-6 text-theater-green mb-8 w-full border-y border-theater-red/30 py-10">
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-theater-red/70 font-sans">Scratch to discover the date</span>
      
      <div className="flex gap-4 md:gap-6 justify-center w-full">
        {/* Day */}
        <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
          <ScratchCard theme="gold" shape="circle">
            <div className="w-full h-full bg-theater-cream flex flex-col items-center justify-center rounded-full border border-theater-red/20 shadow-inner">
              <span className="text-3xl md:text-4xl font-serif text-theater-red leading-none mb-1">{day}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-theater-green">Day</span>
            </div>
          </ScratchCard>
        </div>
        
        {/* Month */}
        <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
           <ScratchCard theme="gold" shape="circle">
            <div className="w-full h-full bg-theater-cream flex flex-col items-center justify-center rounded-full border border-theater-red/20 shadow-inner">
              <span className="text-xl md:text-2xl font-serif text-theater-red tracking-widest leading-none mb-1 uppercase">{month}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-theater-green">Month</span>
            </div>
          </ScratchCard>
        </div>
        
        {/* Year */}
        <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
           <ScratchCard theme="gold" shape="circle">
            <div className="w-full h-full bg-theater-cream flex flex-col items-center justify-center rounded-full border border-theater-red/20 shadow-inner">
              <span className="text-xl md:text-2xl font-serif text-theater-red tracking-widest leading-none mb-1">{year}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-theater-green">Year</span>
            </div>
          </ScratchCard>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full py-24 bg-theater-cream relative overflow-hidden flex flex-col items-center border-t border-theater-red/20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans text-theater-green mb-4 block">The Details</span>
        <h2 className="text-5xl md:text-7xl font-cursive text-theater-red drop-shadow-sm mb-4">
          Wedding Events
        </h2>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-8 relative z-10">
        
        {/* Muhurtham Card */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-transparent flex flex-col items-center h-full max-w-sm lg:max-w-md mx-auto w-full group"
        >
          <div className="flex flex-col items-center text-center flex-grow w-full">
            <h3 className="text-3xl md:text-4xl font-serif text-theater-red tracking-wide mb-6">Muhurtham</h3>
            
            <DateCircles day="02" month="April" year="2026" />
            
            <div className="text-center font-sans text-sm leading-relaxed mt-2">
              <p className="tracking-widest opacity-80 mb-2 uppercase text-[10px] text-theater-red">Time: 9:48 AM</p>
              <p className="font-serif text-lg text-theater-red mb-1">B.V. Reddy Function Hall</p>
              <p className="opacity-80">Paleru, Kusumanchi</p>
              <p className="opacity-80">Khammam</p>
            </div>
            
            <a 
              href="https://maps.google.com/?q=B.V.+Reddy+Function+Hall+Paleru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 px-8 py-3 bg-theater-red text-theater-cream rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </motion.div>

        {/* Reception Card */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-transparent flex flex-col items-center h-full max-w-sm lg:max-w-md mx-auto w-full group"
        >
           <div className="flex flex-col items-center text-center flex-grow w-full">
            <h3 className="text-3xl md:text-4xl font-serif text-theater-red tracking-wide mb-6">Reception</h3>
            
            <DateCircles day="03" month="April" year="2026" />
            
            <div className="text-center font-sans text-sm leading-relaxed mt-2">
              <p className="tracking-widest opacity-80 mb-2 uppercase text-[10px] text-theater-red">Time: 12:00 PM Onwards</p>
              <p className="font-serif text-lg text-theater-red mb-1">Vandana Gardens</p>
              <p className="opacity-80">Narsampet Road</p>
              <p className="opacity-80">Warangal</p>
            </div>
            
            <a 
              href="https://maps.google.com/?q=Vandana+Gardens+Narsampet+Road+Warangal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 px-8 py-3 bg-theater-red text-theater-cream rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
