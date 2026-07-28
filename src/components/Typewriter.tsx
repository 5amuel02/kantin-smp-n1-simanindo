"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Typewriter({ text, delay = 0, speed = 50 }: { text: string, delay?: number, speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, started]);

  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        style={{ 
          display: 'inline-block', 
          width: '3px', 
          height: '1em', 
          backgroundColor: 'var(--primary-color)',
          marginLeft: '4px',
          verticalAlign: 'bottom',
          boxShadow: 'var(--glow)'
        }}
      />
    </span>
  );
}
