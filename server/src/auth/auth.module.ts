import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'adc123146dfad$fh234grdfcv42&342',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaClient],
  controllers: [AuthController],
})
export class AuthModule {}
