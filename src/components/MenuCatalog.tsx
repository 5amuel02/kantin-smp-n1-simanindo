"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Menu {
  id: number;
  nama: string;
  deskripsi: string | null;
  harga: number;
  gambar_url: string | null;
  kategori: string | null;
  tersedia: boolean;
}

export default function MenuCatalog({ initialMenus, categories = ["Semua", "Jajanan", "Peralatan Sekolah", "Lainnya"] }: { initialMenus: Menu[], categories?: string[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Maaf, browser Anda tidak mendukung fitur Pencarian Suara.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript.replace(/[.,]/g, ''));
      setIsListening(false);
    };
    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        alert("Akses mikrofon ditolak! Tolong izinkan akses mikrofon di pengaturan browser (ikon gembok di sebelah kiri alamat web).");
      } else if (event.error === 'no-speech') {
        alert("Suara tidak terdengar. Pastikan mikrofon Anda aktif dan coba lagi.");
      } else {
        alert("Pencarian suara gagal: " + event.error);
      }
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const filteredMenus = initialMenus.filter(menu => {
    const matchesSearch = menu.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (menu.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = activeCategory === "Semua" || (menu.kategori || "Lainnya") === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="menu" className="menu-section">
      <div className="section-title fade-in-up">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Katalog Menu <span className="highlight">Kantin</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Pilihan jajanan favorit dan perlengkapan sekolah lengkap!
        </motion.p>
      </div>

      {/* Search & Filter Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ 
          maxWidth: '800px', 
          margin: '0 auto 2.5rem auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          padding: '0 20px'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '20px', color: '#888' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Cari jajanan, minuman, atau alat sekolah..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '1rem 3.5rem 1rem 3.5rem', // Extra right padding for mic
              fontSize: '1.1rem',
              borderRadius: '50px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(0,0,0,0.2)',
              color: 'var(--text-dark)',
              width: '100%',
              outline: 'none',
              boxShadow: 'var(--shadow-soft)',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-color)';
              e.target.style.boxShadow = 'var(--glow)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--glass-border)';
              e.target.style.boxShadow = 'var(--shadow-soft)';
            }}
          />
          <motion.button 
            type="button"
            onClick={startListening}
            animate={{ scale: isListening ? [1, 1.2, 1] : 1, color: isListening ? '#d35400' : '#888' }}
            transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
            style={{ 
              position: 'absolute', 
              right: '20px', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Pencarian Suara"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
          </motion.button>
        </div>
        
        <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                position: 'relative',
                padding: '0.6rem 1.2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                background: activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.05)',
                color: activeCategory === cat ? '#fff' : 'var(--text-light)',
                border: '1px solid var(--glass-border)',
                transition: 'color 0.3s ease',
              }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '50px',
                    zIndex: -1,
                    boxShadow: 'var(--glow)'
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                />
              )}
              {cat === 'Peralatan Sekolah' ? 'Alat Sekolah' : cat}
            </button>
          ))}
        </div>
      </motion.div>

      {initialMenus.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Belum ada menu yang ditambahkan.</p>
      ) : filteredMenus.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', backdropFilter: 'blur(10px)' }}
        >
          <h3 style={{ color: 'var(--text-dark)' }}>Oops! Tidak ditemukan</h3>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Pencarian "{searchQuery}" tidak membuahkan hasil di kategori {activeCategory}.</p>
        </motion.div>
      ) : (
        <motion.div layout className="category-grid" style={{ gap: '2rem', alignItems: 'start' }}>
          {categories.slice(1).map((kategoriNama) => {
            const items = filteredMenus.filter(m => (m.kategori || 'Lainnya') === kategoriNama);
            if (items.length === 0) return null;

            return (
              <motion.div layout key={kategoriNama} style={{ marginBottom: '2rem', paddingTop: '1rem', minWidth: 0 }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <motion.h3 
                    layout
                    style={{ 
                      fontSize: '1.5rem', 
                      color: 'var(--primary)', 
                      display: 'inline-block', 
                      padding: '0.5rem 1.5rem',
                      background: 'var(--glass-bg)',
                      borderRadius: '50px',
                      boxShadow: 'var(--glow)',
                      border: '1px solid var(--primary-color)'
                    }}>
                    {kategoriNama === 'Jajanan' ? 'Jajanan & Minuman' : (kategoriNama === 'Peralatan Sekolah' ? 'Peralatan Sekolah' : kategoriNama)}
                  </motion.h3>
                </div>
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <AnimatePresence>
                    {items.map(menu => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        whileHover={{ y: -8, scale: 1.02, boxShadow: '0 15px 35px 0 rgba(99, 102, 241, 0.25)' }}
                        transition={{ layout: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }, opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
                        key={menu.id} 
                        className="menu-card"
                        style={{ border: '1px solid rgba(0,0,0,0.03)' }}
                      >
                        <div className="menu-img" style={{ height: '160px' }}>
                          {menu.gambar_url ? (
                            <img src={menu.gambar_url} alt={menu.nama} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                          ) : (
                            <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#eee', color:'#999'}}>No Image</div>
                          )}
                        </div>
                        <div className="menu-info" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <h4 style={{fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-dark)'}}>
                            {menu.nama}
                            {!menu.tersedia && <span className="badge-soldout">Habis</span>}
                          </h4>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0.8rem', flexGrow: 1, color: 'var(--text-light)' }}>{menu.deskripsi}</p>
                          <span className="price" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-color)' }}>Rp {menu.harga.toLocaleString('id-ID')}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
