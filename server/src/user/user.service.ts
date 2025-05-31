import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, password: false, image: true, job: true },
    });
  }

  async getUserProfile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        job: true,
        pngs: true,
        pdfs: true,
        posts: true,
      },
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data: data });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: data });
  }

  async findAllTeachers() {
    return this.prisma.user.findMany({ where: { job: 'TEACHER' } });
  }

  async findAllStudents() {
    return this.prisma.user.findMany({ where: { job: 'STUDENT' } });
  }
}
