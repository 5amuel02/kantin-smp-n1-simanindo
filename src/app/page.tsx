import { prisma } from '@/lib/prisma';
import MenuCatalog from '@/components/MenuCatalog';
import ReviewSection from '@/components/ReviewSection';
import Typewriter from '@/components/Typewriter';
import ParticleBackground from '@/components/ParticleBackground';
import Marquee from '@/components/Marquee';
import HeroButtons from '@/components/HeroButtons';
import FlipImage from '@/components/FlipImage';
import JourneyPath from '@/components/JourneyPath';
import { getReviews } from './actions/review';

export const revalidate = 0; // Disable caching to always show latest data
export const dynamic = 'force-dynamic';

export default async function Home() {
  const menus = await prisma.menu.findMany({
    orderBy: { id: 'desc' }
  });
  const reviews = await getReviews();

  const kategoriUnik = Array.from(new Set(menus.map(menu => menu.kategori)));
  const menuWithImageUrl = menus.map(menu => ({ 
    ...menu, 
    image: menu.gambar_url || '/placeholder.jpg' 
  }));

  return (
    <main>
      {/* Hero Section */}
      <section id="beranda" className="hero">
        <ParticleBackground />
        <div className="hero-grid">
          <div className="hero-content fade-in-up">
            <h1>
              Selamat Datang di <br />
              <span className="highlight glow-text">Kantin Putri Manik</span>
            </h1>
            <p className="fade-in-up delay-100" style={{ minHeight: '3rem' }}>
              <Typewriter text="Tersedia berbagai macam jajanan enak, bersih, dan bergizi. Ayo penuhi energimu hari ini dengan makanan terbaik dari kami!" delay={2500} speed={40} />
            </p>
            
            <HeroButtons />
          </div>
          <div className="hero-image-container fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="hero-3d-text-wrapper">
              <div className="text-line line-1">KANTIN PUTRI</div>
              <div className="text-line line-2">SMP N 1 SIMANINDO</div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Menu Catalog Section with Search and Filter */}
      <MenuCatalog
        categories={['Semua', ...kategoriUnik]}
        initialMenus={menuWithImageUrl}
      />

      {/* Review Section */}
      <ReviewSection initialReviews={reviews} />

      {/* Short Journey Map Section */}
      <JourneyPath />

      {/* Location Section */}
      <section id="lokasi" className="location-section">
        <div className="section-title">
          <h2>Lokasi <span className="highlight">Kantin Kami</span></h2>
          <p>Kunjungi kami secara langsung!</p>
        </div>

        <div className="location-container">
          <div className="map-wrapper glass-panel" style={{ padding: '1rem' }}>
            <iframe 
              src="https://maps.google.com/maps?q=2.676867,98.834477&hl=id&z=17&output=embed" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          
          <div className="location-details glass-panel" style={{ padding: '2rem' }}>
            <h3>Alamat & Titik Lokasi</h3>
            <p>Dekat dengan lingkungan SMP N 1 Simanindo.</p>
            <img src="/kantin.jpg" alt="Foto Kantin dari Depan" style={{width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem'}} />
            <div className="info-item">
              <div>
                <strong>Jam Buka:</strong>
                <p>Setiap Hari: 06:00 - 18:00 WIB</p>
              </div>
            </div>
            <div className="info-item" style={{marginTop: '1rem'}}>
              <div>
                <strong>Info:</strong>
                <p>Saat ini hanya melayani pembelian langsung atau pesan antar mandiri.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section id="visi" className="menu-section" style={{ background: 'var(--dark-bg)' }}>
        <div className="section-title">
          <h2>Visi <span className="highlight">Masa Depan</span> Kantin Kami</h2>
          <p>Mimpi kami untuk terus berkembang memberikan kenyamanan terbaik bagi siswa.</p>
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          <FlipImage src="/future-kantin.jpg" alt="Visi Kantin Masa Depan" />
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-light)', fontSize: '1.1rem', fontStyle: 'italic' }}>
            "Suatu hari nanti, Kantin Putri Manik akan menjadi tempat yang megah, nyaman, dan menjadi pusat berkumpul favorit seluruh siswa SMP N 1 Simanindo. Amin!"
          </p>
        </div>
      </section>
    </main>
  );
}
