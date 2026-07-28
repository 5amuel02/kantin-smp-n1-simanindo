import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import BlurBlobs from "@/components/BlurBlobs";
import FooterLinks from "@/components/FooterLinks";

export const metadata: Metadata = {
  title: "Kantin Putri Manik | Solusi Jajan Siswa",
  description: "Katalog menu jajanan, minuman, dan perlengkapan sekolah lengkap dari Kantin Putri Manik - SMP N 1 Simanindo.",
  openGraph: {
    title: "Kantin Putri Manik",
    description: "Katalog jajanan dan peralatan sekolah termurah dan terlengkap di SMP N 1 Simanindo.",
    url: "https://kantinputrimanik.vercel.app", // Alamat web masa depan
    siteName: "Kantin Putri Manik",
    images: [
      {
        url: "/kantin.jpg", // Menggunakan foto kantin sebagai thumbnail
        width: 1200,
        height: 630,
        alt: "Foto Kantin Putri Manik",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kantin Putri Manik",
    description: "Katalog jajanan SMP N 1 Simanindo.",
    images: ["/kantin.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <BlurBlobs />
        <CustomCursor />
        <SplashScreen />
        <Navbar />
        {children}
        <BackToTop />
        <footer>
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                Kantin<span>PutriManik</span>
              </div>
              <p>Menyediakan aneka jajanan lezat, minuman segar, dan peralatan sekolah berkualitas dengan harga pelajar.</p>
            </div>
            
            <div className="footer-col">
              <h3>Tautan Cepat</h3>
              <FooterLinks />
            </div>

            <div className="footer-col">
              <h3>Jam Operasional & Info</h3>
              <p>Senin - Jumat: 06:00 - 15:00 WIB<br />Sabtu - Minggu: Tutup</p>
              <p>Milik: <strong>Poltak Manik</strong></p>
              <div className="footer-links" style={{marginTop: '1rem'}}>
                <a href="/admin" style={{ color: 'var(--primary-color)' }}>Admin Login &rarr;</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Kantin Putri Manik SMP N 1 Simanindo. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
