"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const marqueeText = (
    <>
      <span style={{ color: 'var(--primary-color)', margin: '0 20px' }}>✦</span>
      JAJANAN SEHAT & HIGIENIS
      <span style={{ color: 'var(--primary-color)', margin: '0 20px' }}>✦</span>
      HARGA PELAJAR
      <span style={{ color: 'var(--primary-color)', margin: '0 20px' }}>✦</span>
      MELAYANI PESAN ANTAR (KHUSUS GURU)
    </>
  );

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      padding: '1.2rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      zIndex: 10
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ 
            fontSize: '0.9rem', 
            fontWeight: 500, 
            color: 'var(--text-light)', 
            letterSpacing: '3px', 
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center'
          }}>
            {marqueeText}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
