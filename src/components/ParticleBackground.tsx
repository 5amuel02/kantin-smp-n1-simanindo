"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Helper for random numbers
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function ParticleBackground() {
  const [particles, setParticles] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate random particles only on the client
    const particleCount = 20; // 20 glowing orbs
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: random(0, 100), // percentage
      y: random(0, 100), // percentage
      size: random(10, 100), // px
      duration: random(10, 30), // seconds to move
      delay: random(0, 5),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0, // Behind the hero content
        pointerEvents: 'none' // Click through to buttons
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.x}vw`, 
            y: `${p.y}vh`, 
            opacity: 0, 
            scale: 0 
          }}
          animate={{ 
            x: [`${p.x}vw`, `${p.x + random(-20, 20)}vw`, `${p.x}vw`], 
            y: [`${p.y}vh`, `${p.y + random(-20, 20)}vh`, `${p.y}vh`],
            opacity: [0, 0.3, 0.1, 0],
            scale: [0, 1, 1.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(211,84,0,0.15) 0%, rgba(0,0,0,0) 70%)`, // Matches primary color
            filter: 'blur(10px)',
          }}
        />
      ))}
    </div>
  );
}
