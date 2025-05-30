import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwt: JwtService,
  ) {}

  async login(credentials: LoginDto) {
    const user = await this.validate(credentials);

    return this.jwt.sign({
      name: user.name,
      id: user.id,
    });
  }

  async validate(credentials: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { name: credentials.name, password: credentials.password },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
