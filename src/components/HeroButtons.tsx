"use client";

import React from 'react';

export default function HeroButtons() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
  };

  return (
    <div className="hero-buttons">
      <a href="#menu" onClick={(e) => handleScroll(e, 'menu')} className="btn-primary">
        Lihat Menu Sekarang
      </a>
      <a href="#lokasi" onClick={(e) => handleScroll(e, 'lokasi')} className="btn-secondary">
        Lokasi Kami
      </a>
    </div>
  );
}
