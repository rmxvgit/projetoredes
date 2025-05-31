import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(credentials: LoginDto) {
    const user = await this.validate(credentials);
    return this.jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      { secret: this.configService.get('JWT_SECRET') },
    );
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
