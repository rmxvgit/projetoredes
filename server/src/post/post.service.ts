import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from './dtos';

@Injectable()
export class PostService {
  prisma = new PrismaClient();

  findAllUserPosts(user_id: number) {
    return this.prisma.post.findMany({ where: { id: user_id } });
  }

  async findOne(id: number) {
    const res = await this.prisma.post.findUnique({ where: { id } });
    if (res == null) {
      throw new Error('Post not found');
    }
    return res;
  }

  async createPost(data: CreatePostDto) {
    const res = await this.prisma.post.create({
      data: {
        user_id: data.user_id,
        title: data.title,
        body: data.body,
      },
    });
    return res;
  }
}
