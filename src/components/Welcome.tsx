"use client";

import { motion } from "framer-motion";

export default function Welcome() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full py-12 md:py-16 flex flex-col items-center justify-center bg-theater-cream text-center px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 relative z-10">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          variants={textVariants}
          className="text-sm md:text-base font-serif text-theater-red mb-2 uppercase tracking-[0.4em]"
        >
          Dear Friends & Family
        </motion.p>
        
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          variants={textVariants}
          className="text-4xl md:text-6xl font-cursive text-theater-red leading-tight my-2"
        >
          Welcome with Love<br/>& Happiness
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          variants={textVariants}
          className="space-y-6 text-sm md:text-base font-sans text-theater-green leading-relaxed max-w-2xl mt-6 relative"
        >
          <p>
            We are delighted to invite you to celebrate this joyous occasion with us. 
            Your presence will add more happiness and blessings to our family as we embark on this beautiful journey.
          </p>
          <p className="font-serif italic text-lg text-theater-red/80 pt-4 tracking-wide">
            We look forward to welcoming you.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="mt-20 flex items-center gap-6"
      >
        <span className="w-16 md:w-32 h-[1px] bg-theater-red/40"></span>
        <div className="w-2 h-2 rounded-full border border-theater-red/60"></div>
        <span className="w-16 md:w-32 h-[1px] bg-theater-red/40"></span>
      </motion.div>
    </section>
  );
}
