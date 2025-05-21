import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PdfService {
  prisma = new PrismaClient();

  findAllUserPngs(user_id: number) {
    return this.prisma.post.findMany({ where: { id: user_id } });
  }

  async findOne(id: number) {
    const res = await this.prisma.post.findUnique({ where: { id } });
    if (res == null) {
      throw new Error('Post not found');
    }
    return res;
  }
}
