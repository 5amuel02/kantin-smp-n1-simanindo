"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addReview } from '../app/actions/review';

type Review = {
  id: number;
  pengguna: string;
  rating: number;
  komentar: string;
  dibuatPada: Date | string;
};

export default function ReviewSection({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [guestName, setGuestName] = useState<string>('');
  const [inputName, setInputName] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Form State
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [komentar, setKomentar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setIsClient(true);
    const savedName = localStorage.getItem('guestName');
    if (savedName) setGuestName(savedName);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      localStorage.setItem('guestName', inputName.trim());
      setGuestName(inputName.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('guestName');
    setGuestName('');
    setRating(0);
    setKomentar('');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || rating === 0 || !komentar.trim()) return;

    setIsSubmitting(true);
    const res = await addReview(guestName, rating, komentar.trim());
    
    if (res.success && res.data) {
      setSuccessMsg('Terima kasih atas ulasan Anda!');
      setKomentar('');
      setRating(0);
      
      // Update UI optimistically
      const newReview = res.data as Review;
      setReviews([newReview, ...reviews]);
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert(res.message || 'Gagal mengirim ulasan');
    }
    setIsSubmitting(false);
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <section id="ulasan" className="review-section" style={{ padding: '5rem 5%', position: 'relative', zIndex: 5 }}>
      <div className="section-title">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Suara Pengunjung</h2>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Form Login / Beri Ulasan */}
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        }}>
          {!guestName ? (
            <AnimatePresence mode="wait">
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleLogin} 
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Beri Kami Ulasan</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>Masukkan nama Anda untuk mulai memberi bintang dan ulasan.</p>
                <input
                  type="text"
                  placeholder="Nama Anda..."
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '1rem 1.5rem',
                    borderRadius: '50px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                  required
                />
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '0.8rem 2rem' }}>
                  Lanjut
                </button>
              </motion.form>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmitReview}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.3rem' }}>Halo, <span style={{ color: 'var(--primary-color)' }}>{guestName}</span>!</h3>
                  <button type="button" onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem' }}>
                    Bukan {guestName}? Ganti Nama
                  </button>
                </div>
                
                {/* Bintang */}
                <div>
                  <p style={{ marginBottom: '0.5rem', color: 'var(--text-light)' }}>Beri Bintang:</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '2rem',
                          color: (hoverRating || rating) >= star ? '#f1c40f' : 'rgba(255, 255, 255, 0.2)',
                          transition: 'color 0.2s',
                          padding: 0
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Komentar */}
                <textarea
                  placeholder="Bagaimana rasa makanannya? Pelayanannya?"
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '1rem',
                    borderRadius: '16px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  required
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting || rating === 0}
                    style={{ opacity: (isSubmitting || rating === 0) ? 0.5 : 1 }}
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                  </button>
                  {successMsg && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#2ecc71', fontWeight: 600 }}>
                      {successMsg}
                    </motion.span>
                  )}
                </div>
              </motion.form>
            </AnimatePresence>
          )}
        </div>

        {/* Daftar Ulasan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Ulasan Terbaru</h3>
          {reviews.length === 0 ? (
            <p style={{ color: 'var(--text-light)', textAlign: 'center', fontStyle: 'italic' }}>Belum ada ulasan. Jadilah yang pertama!</p>
          ) : (
            reviews.map((r, i) => (
              <motion.div 
                key={r.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>{r.pengguna}</strong>
                  <span style={{ color: '#f1c40f', fontSize: '1.1rem' }}>
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </span>
                </div>
                <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>{r.komentar}</p>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.3)', marginTop: '0.5rem' }}>
                  {new Date(r.dibuatPada).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
