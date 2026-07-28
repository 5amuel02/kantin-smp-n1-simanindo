'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

async function uploadImage(imageFile: File | null): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) return null;
  
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('menu-images')
    .upload(fileName, imageFile, {
      cacheControl: '3600',
      upsert: false,
    });
    
  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  
  const { data: urlData } = supabase.storage
    .from('menu-images')
    .getPublicUrl(fileName);
    
  return urlData.publicUrl;
}

export async function addMenu(formData: FormData) {
  const nama = formData.get('nama') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const harga = parseInt(formData.get('harga') as string);
  let gambar_url = formData.get('gambar_url') as string;
  const kategori = formData.get('kategori') as string || 'Jajanan';
  const imageFile = formData.get('gambar_file') as File | null;

  const uploadedUrl = await uploadImage(imageFile);
  if (uploadedUrl) {
    gambar_url = uploadedUrl;
  }

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
  let gambar_url = formData.get('gambar_url') as string;
  const kategori = formData.get('kategori') as string || 'Jajanan';
  const imageFile = formData.get('gambar_file') as File | null;

  const uploadedUrl = await uploadImage(imageFile);
  if (uploadedUrl) {
    gambar_url = uploadedUrl;
  }

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
