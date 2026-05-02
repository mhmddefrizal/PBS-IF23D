import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

// buat fungsi untuk cek data kategori
export const notExistKategori = async (
  prisma: PrismaService['kategori'],
  id: number,
  message: string,
) => {
  // tampilkan data kategori berdasarkan id
  const data = await prisma.findUnique({
    where: { id: id },
  });

  // jika data tidak ditemukan
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
};

// export async function notExistKategori() {

// }
