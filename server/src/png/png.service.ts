import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

@Injectable()
export class PngService {
  findRecendUserPngImages() {
    throw new Error('Method not implemented.');
  }
  prisma = new PrismaClient();

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
