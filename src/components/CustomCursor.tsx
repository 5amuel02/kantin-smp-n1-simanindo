"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hanya aktif di perangkat desktop (mencegah bentrok dengan layar sentuh HP)
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsDesktop(true);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Perbesar kursor kalau mendekati tombol atau link
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 3 : 1,
          opacity: 1
        }}
        transition={{ 
          x: { duration: 0 },
          y: { duration: 0 },
          scale: { type: "tween", ease: "easeOut", duration: 0.15 }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(211, 84, 0, 0.2)' : 'var(--primary-color)',
          boxShadow: isHovering ? 'none' : '0 0 20px 5px var(--primary-color)',
          pointerEvents: 'none',
          zIndex: 999999, // Harus paling atas
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
