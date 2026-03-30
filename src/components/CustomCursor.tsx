"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Heart } from "lucide-react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverState, setHoverState] = useState<"text" | "button" | "image" | "none">("none");

  // Instant positioning for the cursor
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      const isText = window.getComputedStyle(target).cursor === "text" || ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "STRONG", "EM"].includes(target.tagName) || target.closest("p, h2, h3, h1, span");
      const isButton = window.getComputedStyle(target).cursor === "pointer" || ["BUTTON", "A", "CANVAS"].includes(target.tagName) || target.closest("button, a, canvas");
      const isImage = ["IMG", "PICTURE"].includes(target.tagName) || target.closest(".gallery-image, img");

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

  return (
    <>
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
          scale: isClicking ? 0.7 : hoverState !== "none" ? 1.4 : 1, // Grow cursor on hover so you can clearly see the transparent heart
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {/* Continuous Heartbeat Animation */}
        <motion.div
           animate={{ scale: [1, 1.2, 1, 1] }}
           transition={{ duration: 1, repeat: Infinity, times: [0, 0.15, 0.3, 1], ease: "easeInOut" }}
        >
          {/* Colors change when placed on objects to become beautifully transparent cream heartbeat */}
          <Heart 
            className={`transition-colors duration-300 w-8 h-8 ${
              hoverState !== "none" 
                ? "text-[#F1EBDF] fill-[#F1EBDF]/30 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                : "text-[#ff0000] fill-[#ff0000]"
            }`} 
          />
        </motion.div>

        {/* Clicking Ripple Shockwave Effect */}
        {isClicking && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1, borderWidth: "4px" }}
            animate={{ scale: hoverState !== "none" ? 5 : 3.5, opacity: 0, borderWidth: "0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] ${hoverState !== "none" ? "border-[#F1EBDF]" : "border-[#ff0000]"}`}
          />
        )}
      </motion.div>
    </>
  );
}
