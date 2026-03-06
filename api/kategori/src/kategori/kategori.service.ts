import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable()
export class KategoriService {
  // buat constructor untuk inject prisma service
  constructor(private readonly prisma: PrismaService) {}

  create(createKategoriDto: CreateKategoriDto) {
    return 'This action adds a new kategori';
  }

  // buat fungsi untuk tampil data kategori
  async findAll() {
    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany();
    return {
      success: true,
      message: 'Data kategori',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} kategori`;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
