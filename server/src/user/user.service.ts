import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dtos';
import { FileStorage } from 'src/lib/storage';
import { buffer } from 'rxjs';

@Injectable()
export class UserService {
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
    FileStorage.storeImage(data.image, data.buffer);
    return this.prisma.user.create({
      data: {
        name: data.name,
        job: data.job,
        password: data.password,
        image: data.image,
        bio: data.bio,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: data });
  }
}
