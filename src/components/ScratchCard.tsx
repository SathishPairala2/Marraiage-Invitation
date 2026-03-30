"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  children: React.ReactNode;
  coverText?: string;
  theme?: "silver" | "gold";
  shape?: "rect" | "circle";
}

export default function ScratchCard({ children, coverText = "", theme = "silver", shape = "rect" }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);

  const fireCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#BF953F", "#FCF6BA", "#B38728", "#5C2018", "#F1EBDF", "#c0392b", "#e8d5a3"],
      shapes: ["star", "circle"],
      scalar: 1.2,
    });
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 80, origin: { x: 0, y: 0.7 }, colors: ["#BF953F", "#FCF6BA", "#5C2018"] });
      confetti({ particleCount: 60, angle: 120, spread: 80, origin: { x: 1, y: 0.7 }, colors: ["#BF953F", "#FCF6BA", "#5C2018"] });
    }, 200);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Create metallic gradient based on theme
    let gradient;
    if (theme === "gold") {
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#BF953F");
      gradient.addColorStop(0.25, "#FCF6BA");
      gradient.addColorStop(0.5, "#B38728");
      gradient.addColorStop(0.75, "#FBF5B7");
      gradient.addColorStop(1, "#AA771C");
    } else {
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#E0E0E0");
      gradient.addColorStop(0.5, "#B8B8B8");
      gradient.addColorStop(1, "#989898");
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add texture noise
    for(let i=0; i < (width * height) / 50; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.05)";
        ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    
    // Add circular concentric gradient overlay if it's a circle to make it look like a coin
    if (shape === "circle") {
      const radialGroup = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
      radialGroup.addColorStop(0, "rgba(255,255,255,0.4)");
      radialGroup.addColorStop(1, "rgba(0,0,0,0.1)");
      ctx.fillStyle = radialGroup;
      ctx.fillRect(0, 0, width, height);
      
      // Outer ring
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/2 - 4, 0, Math.PI * 2);
      ctx.strokeStyle = theme === "gold" ? "rgba(255,223,115,0.5)" : "rgba(255,255,255,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Add text if provided
    let hasDrawnText = false;
    if (coverText && !hasDrawnText) {
      ctx.font = '600 16px sans-serif';
      ctx.fillStyle = theme === "gold" ? '#5C2018' : '#4A4A4A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = "2px";
      ctx.fillText(coverText, width / 2, height / 2);
    }

    let isDrawing = false;
    let celebrationFired = false;
    
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      const brushSize = "touches" in e ? 25 : 15;
      ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is cleared
      if (Math.random() < 0.1 && !isScratched && !celebrationFired) {
        checkScratched(ctx, width, height);
      }
    };

    const checkScratched = (context: CanvasRenderingContext2D, w: number, h: number) => {
      try {
        const imageData = context.getImageData(0, 0, w, h);
        const pixels = imageData.data;
        let transparentPixels = 0;
        
        for (let i = 3; i < pixels.length; i += 16) {
          if (pixels[i] === 0) transparentPixels++;
        }
        
        let threshold = shape === "circle" ? 0.35 : 0.4;
        
        if (transparentPixels / (pixels.length / 16) > threshold && !celebrationFired) {
            celebrationFired = true;
            setIsScratched(true);
            fireCelebration();
            canvas.style.transition = "opacity 0.6s ease-out";
            canvas.style.opacity = "0";
            setTimeout(() => {
                canvas.style.pointerEvents = "none";
            }, 600);
        }
      } catch (e) {
        console.error("Canvas read error:", e);
      }
    };

    const handleDown = (e: MouseEvent | TouchEvent) => { isDrawing = true; scratch(e); };
    const handleUp = () => { 
        isDrawing = false; 
        if (!celebrationFired && !isScratched) checkScratched(ctx, width, height);
    };
    
    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", scratch);
    window.addEventListener("mouseup", handleUp);
    
    canvas.addEventListener("touchstart", handleDown, { passive: false });
    canvas.addEventListener("touchmove", scratch, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
        canvas.removeEventListener("mousedown", handleDown);
        canvas.removeEventListener("mousemove", scratch);
        window.removeEventListener("mouseup", handleUp);
        
        canvas.removeEventListener("touchstart", handleDown);
        canvas.removeEventListener("touchmove", scratch);
        window.removeEventListener("touchend", handleUp);
    };
  }, [isScratched, coverText, theme, shape]);

  const cornerClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div ref={containerRef} className={`relative w-full h-full select-none ${cornerClass}`}>
      <div className={`w-full h-full ${cornerClass} overflow-hidden`}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full shadow-lg touch-none ${cornerClass}`}
        style={{ zIndex: isScratched ? -1 : 10 }}
      />
    </div>
  );
}
