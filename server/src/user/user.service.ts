import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dtos';
import { FileStorage } from 'src/lib/storage';

@Injectable()
export class UserService {
  createNoImage() {
    throw new Error('Method not implemented.');
  }
  prisma = new PrismaClient();

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, password: false, image: true, job: true },
    });
  }

  async getUserProfile(id: number, is_owner: boolean) {
    const user_profile_data = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        image: true,
        job: true,
        pngs: { include: { user: { select: { id: true, name: true } } } },
        pdfs: { include: { user: { select: { id: true, name: true } } } },
        posts: { include: { user: { select: { id: true, name: true } } } },
      },
    });

    return { owner: is_owner, ...user_profile_data };
  }

  async create(data: {
    name: string;
    job: string;
    password: string;
    bio: string;
    image: string;
    buffer: Buffer<ArrayBufferLike>;
    type: string;
  }) {
    const exists = await this.prisma.user.count({ where: { name: data.name } });
    if (exists > 0) {
      return { exists: true };
    }

    const new_user = await this.prisma.user.create({
      data: {
        name: data.name,
        job: data.job,
        password: data.password,
        image: data.image,
        bio: data.bio,
      },
    });

    FileStorage.storeImage(`u${new_user.id}.png`, data.buffer);
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: data });
  }
}
