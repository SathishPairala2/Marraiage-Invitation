"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Heart } from "lucide-react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverState, setHoverState] = useState<"text" | "button" | "image" | "none">("none");

  // Instant positioning for the tiny precise center
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth, heavy spring positioning for the large trailing glass
  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      const isText = window.getComputedStyle(target).cursor === "text" || ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "STRONG", "EM"].includes(target.tagName) || target.closest("p, h2, h3, h1, span");
      const isButton = window.getComputedStyle(target).cursor === "pointer" || ["BUTTON", "A", "CANVAS"].includes(target.tagName) || target.closest("button, a, canvas");
      const isImage = ["IMG", "PICTURE"].includes(target.tagName) || target.closest(".gallery-image, img");

      // Set the global hover state which controls the trailing glass blob
      if (isButton) setHoverState("button");
      else if (isImage) setHoverState("image");
      else if (isText) setHoverState("text");
      else setHoverState("none");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY]);

  // Determine variants for the glass follower based on hover state
  const glassVariants = {
    none: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(255, 0, 0, 0)",
      border: "1px solid rgba(255, 0, 0, 0.3)",
      backdropFilter: "blur(0px)",
      scale: 1,
      opacity: 0.7
    },
    text: {
      width: 96,
      height: 96,
      backgroundColor: "rgba(255, 0, 0, 0.05)",
      border: "1px solid rgba(255, 0, 0, 0.15)",
      backdropFilter: "blur(6px)",
      scale: 1.1,
      opacity: 1
    },
    button: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(255, 0, 0, 0.15)",
      border: "2px solid rgba(255, 0, 0, 0.8)",
      backdropFilter: "blur(4px)",
      scale: 1.2,
      opacity: 1
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      border: "2px dashed rgba(255, 0, 0, 0.5)",
      backdropFilter: "blur(8px)",
      scale: 1,
      opacity: 1
    }
  };

  return (
    <>
      {/* 1. THE FOLLOWER (Smooth trailing glass blob) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99998] flex items-center justify-center rounded-full origin-center shadow-lg"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={hoverState}
        variants={glassVariants}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {hoverState === "image" && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-sans tracking-widest text-[#ff0000] font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          >
            Hover
          </motion.span>
        )}
      </motion.div>

      {/* 2. THE LEAD (Instant, precise red heart) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center"
        style={{
          x: rawX,
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {/* Heartbeat Animation wrapped around the lead heart */}
        <motion.div
           animate={{ scale: hoverState === "none" ? [1, 1.2, 1, 1] : 1 }}
           transition={{ duration: 1, repeat: Infinity, times: [0, 0.15, 0.3, 1], ease: "easeInOut" }}
        >
          <Heart 
            className={`transition-all duration-300 ${
              hoverState === "none" 
                ? "w-8 h-8 text-[#ff0000] fill-[#ff0000]"
                : hoverState === "text"
                ? "w-4 h-4 text-[#ff0000]/80 fill-[#ff0000]/80"
                : "w-6 h-6 text-[#ff0000] fill-[#ff0000]"
            }`}
          />
        </motion.div>

        {/* Clicking Ripple Shockwave Effect */}
        {isClicking && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1, borderWidth: "4px" }}
            animate={{ scale: 3, opacity: 0, borderWidth: "0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.5)]"
          />
        )}
      </motion.div>
    </>
  );
}
