"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-04-02T09:48:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full py-16 bg-theater-cream flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-10 z-10 w-full max-w-3xl px-6"
      >
        <div className="flex justify-center gap-3 md:gap-8 w-full">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex flex-col items-center gap-4 flex-1 max-w-[120px]">
              <div className="w-full aspect-square border border-theater-red rounded-lg flex items-center justify-center shadow-[inset_0_0_10px_rgba(92,32,24,0.05)] bg-theater-cream">
                <span className="text-3xl md:text-5xl font-serif text-theater-red font-light">
                  {unit.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] md:text-xs font-sans tracking-[0.2em] uppercase text-theater-green">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
