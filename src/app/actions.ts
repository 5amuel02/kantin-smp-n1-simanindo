'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addMenu(formData: FormData) {
  const nama = formData.get('nama') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const harga = parseInt(formData.get('harga') as string);
  const gambar_url = formData.get('gambar_url') as string;
  const kategori = formData.get('kategori') as string || 'Jajanan';

  await prisma.menu.create({
    data: {
      nama,
      deskripsi,
      harga,
      gambar_url,
      kategori,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteMenu(id: number) {
  await prisma.menu.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function toggleAvailability(id: number, currentStatus: boolean) {
  await prisma.menu.update({
    where: { id },
    data: { tersedia: !currentStatus },
  });

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function editMenu(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const nama = formData.get('nama') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const harga = parseInt(formData.get('harga') as string);
  const gambar_url = formData.get('gambar_url') as string;
  const kategori = formData.get('kategori') as string || 'Jajanan';

  await prisma.menu.update({
    where: { id },
    data: {
      nama,
      deskripsi,
      harga,
      gambar_url,
      kategori,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin');
}
