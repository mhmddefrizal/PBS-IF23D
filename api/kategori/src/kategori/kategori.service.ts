import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { conflictKategori } from '../common/utils/conflict-kategori.util';
import { notExistKategori } from '../common/utils/not-exist-kategori.util';
import { PrismaService } from '../prisma.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Injectable()
export class KategoriService {
  // buat constructor untuk inject prisma service
  constructor(private readonly prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto) {
    // return 'This action adds a new kategori';

    // panggil fungsi conflictKategori
    const nama_filter = await conflictKategori(
      this.prisma.kategori,
      process.env.FAILED_SAVE!,
      createKategoriDto.nama,
    );

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
      message: process.env.SUCCESS_SAVE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // buat fungsi untuk tampil data kategori
  async findAll() {
    // return `This action returns all kategori`;
    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany();

    // jika data kategori tidak ditemukan
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //     success: false,
      //     message: 'Data Kategori Tidak Ditemukan !',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //       total_data: data.length,
      //     },
      //   },
      //   HttpStatus.NOT_FOUND,
      // );

      throw new NotFoundException({
        success: false,
        message: 'Data Kategori Tidak Ditemukan !',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data kategori ditemukan
    return {
      success: true,
      message: '',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  // buat fungsi untuk detail data
  async findOne(id: number) {
    // return `This action returns a #${id} kategori`;

    try {
      // panggil fungsi notExistKategori
      const data = await notExistKategori(
        this.prisma.kategori,
        id,
        'Data Kategori Tidak Ditemukan !',
      );

      // jika data ditemukan
      return {
        success: true,
        message: '',
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter / Slug ID Harus Angka !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // buat fungsi untuk ubah data
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    // return `This action updates a #${id} kategori`;

    try {
      // panggil fungsi notExistKategori
      await notExistKategori(
        this.prisma.kategori,
        id,
        'Data Kategori Tidak Ditemukan !',
      );

      // jika data ditemukan
      // panggil fungsi conflictKategori
      const nama_filter = await conflictKategori(
        this.prisma.kategori,
        process.env.FAILED_UPDATE!,
        updateKategoriDto.nama ?? '',
        id,
      );

      // jika nama kategori belum ada
      // ubah data kategori berdasarkan id
      await this.prisma.kategori.update({
        where: { id: id },
        data: {
          nama: updateKategoriDto.nama,
          nama_filter: nama_filter,
        },
      });

      return {
        success: true,
        message: 'Data Kategori Berhasil Diubah',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // if (
      //   error instanceof NotFoundException ||
      //   error instanceof ConflictException
      // ) {
      //   throw error;
      // }

      // if (error instanceof ConflictException) {
      //   throw error;
      // }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter / Slug ID Harus Angka !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // buat fungsi untuk hapus data
  async remove(id: number) {
    // return `This action removes a #${id} kategori`;

    try {
      // panggil fungsi notExistKategori
      await notExistKategori(
        this.prisma.kategori,
        id,
        'Data Kategori Tidak Ditemukan !',
      );

      // jika data ditemukan
      // hapus data kategori berdasarkan id
      await this.prisma.kategori.delete({
        where: { id: id },
      });

      return {
        success: true,
        message: 'Data Kategori Berhasil Dihapus',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter / Slug ID Harus Angka !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
