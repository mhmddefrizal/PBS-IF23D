import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable()
export class KategoriService {
  // buat constructor untuk inject prisma service
  constructor(private readonly prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto) {
    // return 'This action adds a new kategori';

    // buat variabel untuk filter nama
    const nama_filter = createKategoriDto.nama
      .replace(/\s/g, '')
      .toLowerCase()
      .trim();

    // cek apakah nama kategori sudah ada
    const exist = await this.prisma.kategori.findFirst({
      where: {
        nama_filter: nama_filter,
      },
    });

    // jika nama kategori sudah ada
    if (exist) {
      throw new ConflictException({
        success: false,
        message: 'Data kategori Gagal disimpan!, nama kategori sudah ada.',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    // jika nama kategori belum ada

    // simpan data kategori
    await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });

    return {
      success: true,
      message: 'Data kategori berhasil disimpan',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // buat fungsi untuk tampil data kategori
  async findAll() {
    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany();

    // jika data kategori tidak ditemukan
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //     success: false,
      //     message: 'Data kategori tidak ditemukan',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //       total_data: data.length,
      //     },
      //   },
      //   HttpStatus.NOT_FOUND,
      // );

      throw new NotFoundException({
        success: false,
        message: 'Data kategori tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data kategori ditemukan
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
