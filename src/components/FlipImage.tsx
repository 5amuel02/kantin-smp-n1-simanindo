"use client";
import { motion } from 'framer-motion';

export default function FlipImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div style={{ perspective: '2000px', width: '100%' }}>
      <motion.img
        initial={{ rotateX: 80, opacity: 0, y: 100, scale: 0.8 }}
        whileInView={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        src={src}
        alt={alt}
        style={{ 
          width: '100%', 
          borderRadius: '16px', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          transformStyle: 'preserve-3d'
        }}
      />
    </div>
  );
}
