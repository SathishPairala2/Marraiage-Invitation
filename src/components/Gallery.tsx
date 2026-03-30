"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/RAJ09563.JPG.jpeg", 
  "/images/RAJ09571.JPG.jpeg", 
  "/images/RAJ09634.JPG.jpeg", 
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="w-full py-12 bg-theater-cream relative overflow-hidden flex flex-col items-center border-t border-theater-red/20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-cursive text-theater-red drop-shadow-sm mb-4">
          Moments
        </h2>
        <span className="w-16 h-[1px] bg-theater-red mx-auto block" />
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-12 h-[50vh] md:h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full relative border-[8px] bg-white border-white shadow-2xl overflow-hidden"
          >
            <Image
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-cover sepia-[0.2]"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={prevSlide}
          className="absolute left-6 md:left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-lg border border-theater-red/20 flex items-center justify-center text-theater-red transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-6 md:right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-lg border border-theater-red/20 flex items-center justify-center text-theater-red transition-all z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-3 mt-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all border border-theater-red ${
              idx === currentIndex ? "bg-theater-red w-8" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
