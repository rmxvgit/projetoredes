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
    return this.prisma.user.findMany();
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
