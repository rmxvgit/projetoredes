import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { NewPngBody, ImageFields } from 'src/png/dtos';
import { FileStorage } from 'src/lib/storage';

@Injectable()
export class PdfService {
  prisma = new PrismaClient();

  async createPdf(body: NewPngBody, image: ImageFields, id: number) {
    const result = await this.prisma.pdf.create({
      data: {
        title: body.title,
        file_name: image.originalname,
        user_id: id,
      },
    });

    try {
      FileStorage.storeImage(`p${result.id}.pdf`, image.buffer);
    } catch {
      return await this.prisma.pdf.delete({ where: { id: result.id } });
    }

    return result;
  }

  findAllUserPngs(user_id: number) {
    return this.prisma.post.findMany({ where: { id: user_id } });
  }

  findRecenPdfs() {
    return this.prisma.pdf.findMany({
      take: 20,
      select: {
        id: true,
        title: true,
        createdAt: true,
        file_name: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const res = await this.prisma.post.findUnique({ where: { id } });
    if (res == null) {
      throw new Error('Post not found');
    }
    return res;
  }
}
