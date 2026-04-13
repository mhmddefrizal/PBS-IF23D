// buat fungsi untuk cek data kategori
// duplikasi data kategori

import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';
import { PrismaService } from '../../prisma.service';
import { HttpStatus } from '@nestjs/common/enums';

export const conflictKategori = async (
  prisma: PrismaService['kategori'],
  message: string,
  nama: string,
  id?: number,
) => {
  const nama_filter = nama.replace(/\s/g, '').toLowerCase().trim();

  // cek apakah nama kategori sudah ada
  const exist = await prisma.findFirst({
    where: {
      // ternary operator
      // NOT: id ? { id: id } : undefined,
      nama_filter: nama_filter,
      // spread operator
      ...(id ? { NOT: { id: id } } : undefined),
    },
  });

  // jika nama kategori sudah ada
  if (exist) {
    throw new ConflictException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }

  return nama_filter;
};
