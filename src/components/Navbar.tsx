"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCanteenOpen, setIsCanteenOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkStatus = () => {
      const now = new Date();
      // Asumsi zona waktu lokal WIB (atau UTC+7)
      const hour = now.getHours();
      setIsCanteenOpen(hour >= 6 && hour < 18);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsOpen(false); // Tutup menu mobile jika sedang terbuka

    if (pathname === '/') {
      e.preventDefault();
      const elem = document.getElementById(targetId);
      if (elem) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = elem.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        const startY = window.scrollY || window.pageYOffset;
        const distance = offsetPosition - startY;
        const duration = 800;
        let start: number | null = null;

        const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t * t + b;
          t -= 2;
          return c / 2 * (t * t * t + 2) + b;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const nextY = easeInOutCubic(timeElapsed, startY, distance, duration);
          
          window.scrollTo(0, nextY);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            window.scrollTo(0, offsetPosition);
          }
        };

        requestAnimationFrame(animation);
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>Kantin<span>PutriManik</span></div>
          {isClient && (
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '0.3rem 0.6rem',
              borderRadius: '20px',
              backgroundColor: isCanteenOpen ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
              color: isCanteenOpen ? '#2ecc71' : '#e74c3c',
              border: `1px solid ${isCanteenOpen ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              letterSpacing: '1px'
            }}>
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: isCanteenOpen ? '#2ecc71' : '#e74c3c',
                boxShadow: `0 0 8px ${isCanteenOpen ? '#2ecc71' : '#e74c3c'}`
              }}></span>
              {isCanteenOpen ? 'BUKA' : 'TUTUP'}
            </div>
          )}
        </div>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          <li><a href="/#beranda" onClick={(e) => handleScroll(e, 'beranda')}>Beranda</a></li>
          <li><a href="/#menu" onClick={(e) => handleScroll(e, 'menu')}>Menu</a></li>
          <li><a href="/#lokasi" onClick={(e) => handleScroll(e, 'lokasi')}>Lokasi</a></li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown (Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              padding: '6rem 2rem 2rem',
              background: 'rgba(11, 15, 25, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a href="/#beranda" onClick={(e) => handleScroll(e, 'beranda')} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)' }}>Beranda</a>
            <a href="/#menu" onClick={(e) => handleScroll(e, 'menu')} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)' }}>Menu</a>
            <a href="/#lokasi" onClick={(e) => handleScroll(e, 'lokasi')} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)' }}>Lokasi</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
