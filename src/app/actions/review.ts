"use server";

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addReview(pengguna: string, rating: number, komentar: string) {
  try {
    const newReview = await prisma.review.create({
      data: {
        pengguna,
        rating,
        komentar
      }
    });
    
    // Revalidasi path beranda supaya data ulasan yang baru langsung muncul
    revalidatePath('/');
    
    return { success: true, data: newReview };
  } catch (error) {
    console.error("Gagal menambahkan ulasan:", error);
    return { success: false, message: "Gagal menyimpan ulasan" };
  }
}

export async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        dibuatPada: 'desc'
      },
      take: 20 // Ambil maksimal 20 ulasan terbaru
    });
    return reviews;
  } catch (error) {
    console.error("Gagal mengambil data ulasan:", error);
    return [];
  }
}
