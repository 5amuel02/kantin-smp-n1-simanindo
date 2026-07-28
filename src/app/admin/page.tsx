import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { addMenu, deleteMenu, toggleAvailability, editMenu } from '../actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminPage(props: { searchParams: Promise<{ edit?: string, error?: string }> | { edit?: string, error?: string } }) {
  // Await searchParams conditionally for Next.js 15+ compatibility, or just use it if it's Next.js 14
  const searchParams = await props.searchParams;
  const editId = searchParams?.edit ? parseInt(searchParams.edit) : null;
  const hasError = searchParams?.error === '1';

  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');

  // Simple authentication check
  if (authCookie?.value !== 'authenticated') {
    return (
      <div className="admin-container">
        <div className="admin-login glassmorphism">
          <h2>Login Admin</h2>
          <p style={{marginBottom: '1rem'}}>Masukkan kata sandi untuk masuk.</p>
          {hasError && <p style={{color: 'red', marginBottom: '1rem', fontWeight: 'bold'}}>Kata sandi salah!</p>}
          <form action={async (formData) => {
            'use server';
            const password = formData.get('password');
            // Bersihkan spasi jika ada saat copy-paste dari Vercel env
            const truePassword = (process.env.ADMIN_PASSWORD || 'admin123').trim();
            
            if (password === truePassword) {
              (await cookies()).set('admin_auth', 'authenticated', { maxAge: 60 * 60 * 24 });
              revalidatePath('/admin');
              redirect('/admin');
            } else {
              redirect('/admin?error=1');
            }
          }}>
            <input type="password" name="password" placeholder="Kata Sandi Rahasia" required />
            <button type="submit" className="btn-primary">Masuk</button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, show dashboard
  const menus = await prisma.menu.findMany({
    orderBy: { id: 'desc' }
  });

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Dashboard Admin Kantin</h2>
        <form action={async () => {
          'use server';
          (await cookies()).delete('admin_auth');
          revalidatePath('/admin');
          redirect('/admin');
        }}>
          <button type="submit" className="btn-secondary">Keluar (Logout)</button>
        </form>
      </div>

      <div className="admin-form">
        <form action={addMenu} style={{display:'flex', flexDirection:'column', gap:'10px', gridColumn: '1 / -1'}}>
          <h3>Tambah Menu Baru</h3>
          <input type="text" name="nama" placeholder="Nama Menu (misal: Nasi Goreng)" required />
          <textarea name="deskripsi" placeholder="Deskripsi Singkat (opsional)"></textarea>
          <input type="number" name="harga" placeholder="Harga (misal: 12000)" required />
          <select name="kategori" required style={{padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc'}}>
            <option value="Jajanan">Jajanan</option>
            <option value="Peralatan Sekolah">Peralatan Sekolah</option>
          </select>
          <input type="url" name="gambar_url" placeholder="Link Gambar URL (Unsplash/Imgur)" />
          <button type="submit" className="btn-primary" style={{alignSelf: 'flex-start'}}>+ Tambah Menu</button>
        </form>
      </div>

      <h3>Daftar Menu Saat Ini</h3>
      <div style={{overflowX: 'auto', marginTop: '1rem'}}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.length === 0 && (
              <tr><td colSpan={5} style={{textAlign:'center'}}>Belum ada data.</td></tr>
            )}
            {menus.map(menu => (
              editId === menu.id ? (
                <tr key={menu.id} style={{backgroundColor: '#f9f9f9'}}>
                  <td colSpan={6}>
                    <form action={editMenu} style={{display:'flex', gap:'10px', flexWrap:'wrap', padding:'10px'}}>
                      <input type="hidden" name="id" value={menu.id} />
                      <input type="text" name="nama" defaultValue={menu.nama} required style={{flex:1, minWidth:'150px'}} />
                      <select name="kategori" defaultValue={menu.kategori} required>
                        <option value="Jajanan">Jajanan</option>
                        <option value="Peralatan Sekolah">Peralatan Sekolah</option>
                      </select>
                      <input type="number" name="harga" defaultValue={menu.harga} required style={{width:'100px'}} />
                      <input type="url" name="gambar_url" defaultValue={menu.gambar_url || ''} placeholder="Link Gambar" style={{flex:1}} />
                      <input type="text" name="deskripsi" defaultValue={menu.deskripsi || ''} placeholder="Deskripsi" style={{flex:1}} />
                      <button type="submit" className="btn-primary">Simpan</button>
                      <Link href="/admin" className="btn-secondary" style={{padding:'0.5rem 1rem', textDecoration:'none', color:'#fff'}}>Batal</Link>
                    </form>
                  </td>
                </tr>
              ) : (
                <tr key={menu.id}>
                  <td>{menu.id}</td>
                  <td><strong>{menu.nama}</strong></td>
                  <td><span className="badge-category" style={{background:'#eee', padding:'2px 8px', borderRadius:'12px', fontSize:'0.8rem'}}>{menu.kategori}</span></td>
                  <td>Rp {menu.harga.toLocaleString('id-ID')}</td>
                  <td>
                    <form action={async () => {
                      'use server';
                      await toggleAvailability(menu.id, menu.tersedia);
                    }}>
                      <button type="submit" className={menu.tersedia ? 'btn-warning' : 'btn-secondary'}>
                        {menu.tersedia ? 'Tandai Habis' : 'Tandai Tersedia'}
                      </button>
                    </form>
                  </td>
                  <td style={{display:'flex', gap:'5px'}}>
                    <Link href={`/admin?edit=${menu.id}`} className="btn-primary" style={{padding:'0.5rem 1rem', textDecoration:'none', color:'#fff', borderRadius:'4px', border:'none', cursor:'pointer'}}>Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteMenu(menu.id);
                    }}>
                      <button type="submit" className="btn-danger">Hapus</button>
                    </form>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
