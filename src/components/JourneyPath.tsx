"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// Custom Animated Shape Card
const CustomShapeCard = ({ 
  children, 
  isLeft, 
  isActive, 
  index 
}: { 
  children: React.ReactNode, 
  isLeft: boolean, 
  isActive: boolean,
  index: number
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  // Define unique shapes (border-radius) for each step
  const shapes = [
    '2px 24px 2px 24px', // Step 0 (Kelas): Asymmetric like a desk/book
    '50px',              // Step 1 (Koridor): Pill shape, long and continuous
    '40px 40px 8px 8px', // Step 2 (Teras): Archway / Door shape
    '50%',               // Step 3 (Kantin): Perfect circle / Plate
  ];

  const borderRadius = shapes[index];
  const isCircle = index === 3;

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
      animate={{ 
        opacity: isActive ? 1 : 0.4, 
        x: isActive ? 0 : (isLeft ? 10 : -10),
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'relative',
        padding: '2px', // Space for the animated border
        borderRadius: borderRadius,
        overflow: 'hidden',
        textAlign: isCircle ? 'center' : (isLeft ? 'right' : 'left'),
        // Ensure circle has equal width/height aspect ratio
        aspectRatio: isCircle ? '1 / 1' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Animated Wrapping Border (Conic Gradient) */}
      {isActive && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'conic-gradient(from 0deg, transparent 70%, var(--primary-color) 80%, transparent 100%)',
            zIndex: 0
          }}
        />
      )}

      {/* Inner Content Card (Masks the center of the gradient) */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          background: isActive ? 'rgba(11, 15, 25, 0.9)' : 'rgba(11, 15, 25, 0.4)',
          backdropFilter: 'blur(12px)',
          borderRadius: borderRadius,
          padding: isCircle ? '2rem' : '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isCircle ? 'center' : 'stretch'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default function JourneyPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const rawPathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = useSpring(rawPathLength, { stiffness: 60, damping: 25 });

  const [activeNodes, setActiveNodes] = useState<boolean[]>([false, false, false, false]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveNodes([
      latest >= 0.10,
      latest >= 0.35,
      latest >= 0.65,
      latest >= 0.90,
    ]);
  });

  const steps = [
    { x: 50, y: 10, title: "Meja Kelas", desc: "Peregangan sejenak.", distance: "LANGKAH 1", align: "right" },
    { x: 75, y: 35, title: "Koridor", desc: "Wangi bumbu tercium.", distance: "LANGKAH 2", align: "left" },
    { x: 25, y: 65, title: "Teras Kantin", desc: "Saatnya memesan!", distance: "LANGKAH 3", align: "right" },
    { x: 50, y: 90, title: "Kantin Putri Manik", desc: "Energi 100%.", distance: "TIBA!", align: "left" },
  ];

  return (
    <section className="journey-section" style={{ padding: '8rem 5%', background: 'var(--dark-bg)', position: 'relative' }}>
      
      <div className="section-title">
        <h2>Perjalanan Singkat <span className="highlight">Menuju Kenyang</span></h2>
        <p>Hanya sejengkal dari kelasmu menuju energi tanpa batas.</p>
      </div>

      <div 
        ref={containerRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '800px', 
          height: '1000px', 
          margin: '0 auto',
          marginTop: '4rem'
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        >
          {/* Track Base */}
          <path 
            d="M 50 10 C 80 15, 90 25, 75 35 C 50 50, 10 50, 25 65 C 40 80, 50 80, 50 90"
            fill="transparent"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Animated Track */}
          <motion.path 
            d="M 50 10 C 80 15, 90 25, 75 35 C 50 50, 10 50, 25 65 C 40 80, 50 80, 50 90"
            fill="transparent"
            stroke="var(--primary-color)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ 
              pathLength: pathLength,
              filter: 'drop-shadow(0 0 4px rgba(116, 123, 255, 0.4))' 
            }}
          />

          {steps.map((step, i) => (
            <g key={`dot-${i}`}>
              <circle 
                cx={step.x} cy={step.y} r="1" 
                fill="var(--dark-bg)" 
                stroke={activeNodes[i] ? "var(--primary-color)" : "rgba(255,255,255,0.2)"}
                strokeWidth="0.5" 
                vectorEffect="non-scaling-stroke"
                style={{ transition: 'stroke 0.5s ease' }}
              />
              <motion.circle 
                cx={step.x} cy={step.y} r="0.5" 
                fill={activeNodes[i] ? "var(--primary-color)" : "transparent"}
                vectorEffect="non-scaling-stroke"
                animate={{ scale: activeNodes[i] ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </g>
          ))}
        </svg>

        {steps.map((step, i) => {
          const isLeft = step.align === 'left';
          return (
            <div 
              key={`card-${i}`}
              style={{
                position: 'absolute',
                top: `${step.y}%`,
                left: !isLeft ? `${step.x + 8}%` : 'auto',
                right: isLeft ? `${100 - step.x + 8}%` : 'auto',
                transform: 'translateY(-50%)',
                width: '35%',
                zIndex: 10
              }}
            >
              <CustomShapeCard isLeft={isLeft} isActive={activeNodes[i]} index={i}>
                <div style={{ color: activeNodes[i] ? 'var(--primary-color)' : 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '3px', marginBottom: '8px', transition: 'color 0.5s ease' }}>
                  {step.distance}
                </div>
                <h3 style={{ color: activeNodes[i] ? 'var(--text-dark)' : 'rgba(255,255,255,0.4)', fontSize: '1.2rem', marginBottom: '4px', fontWeight: 500, lineHeight: 1.3, transition: 'color 0.5s ease' }}>
                  {step.title}
                </h3>
                <p style={{ color: activeNodes[i] ? 'var(--text-light)' : 'rgba(255,255,255,0.2)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5, transition: 'color 0.5s ease' }}>
                  {step.desc}
                </p>
              </CustomShapeCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
