import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '.prisma/client';
import { AuthGuard } from 'src/auth/guards/guards';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UserService, JwtService, PrismaClient, AuthGuard, ConfigService],
  controllers: [UserController],
})
export class UserModule {}
