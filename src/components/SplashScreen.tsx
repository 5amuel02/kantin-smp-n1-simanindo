"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // Sembunyikan splash screen setelah 2.5 detik untuk memberi kesan loading elegan
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0a0a0a', // Solid dark background to hide content underneath
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          {/* Efek Lingkaran Glow di Belakang Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(211, 84, 0, 0.15) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
              zIndex: -1
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="logo"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', textAlign: 'center' }}
          >
            Kantin<span style={{ color: 'var(--primary-color)', textShadow: 'var(--glow)' }}>PutriManik</span>
          </motion.div>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--primary-color), transparent)',
              borderRadius: '2px',
              boxShadow: 'var(--glow)'
            }}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              marginTop: '1.5rem',
              color: 'var(--text-light)',
              fontSize: '0.9rem',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            Menyiapkan Menu...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
