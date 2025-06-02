import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { ImageFields, NewPngBody } from './dtos';
import { FileStorage } from 'src/lib/storage';

@Injectable()
export class PngService {
  constructor(private readonly prisma: PrismaClient) {}

  async createPng(body: NewPngBody, image: ImageFields, author_id: number) {
    const result = await this.prisma.png.create({
      data: {
        title: body.title,
        file_name: image.originalname,
        user_id: author_id,
      },
    });

    try {
      FileStorage.storeImage(`p${result.id}.png`, image.buffer);
    } catch {
      return await this.prisma.png.delete({ where: { id: result.id } });
    }

    return result;
  }
  findRecendUserPngImages() {
    throw new Error('Method not implemented.');
  }

  findAllUserPngs(user_id: number) {
    return this.prisma.post.findMany({ where: { id: user_id } });
  }

  findRecentPngs() {
    return this.prisma.png.findMany({
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
