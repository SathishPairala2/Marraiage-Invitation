"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-play music on first user interaction (e.g. clicking the curtain)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsPlaying(true);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  // Send play/pause command to the embedded YouTube iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const command = isPlaying ? "playVideo" : "pauseVideo";
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*"
    );
  }, [isPlaying]);

  return (
    <>
      {/* Hidden YouTube iframe — enablejsapi=1 allows postMessage control */}
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/t8CtqlqMLI0?enablejsapi=1&loop=1&playlist=t8CtqlqMLI0&autoplay=0&controls=0&mute=0"
        allow="autoplay"
        className="hidden"
        title="background-music"
      />

      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() => setIsPlaying((p) => !p)}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all border ${
          isPlaying
            ? "bg-theater-red text-theater-cream border-theater-red"
            : "bg-theater-cream text-theater-red border-theater-red/30 hover:border-theater-red/80"
        }`}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}

        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-theater-red animate-ping opacity-60" />
            <span
              className="absolute inset-0 rounded-full border border-theater-red animate-ping opacity-40"
              style={{ animationDelay: "0.25s" }}
            />
          </>
        )}
      </motion.button>
    </>
  );
}
