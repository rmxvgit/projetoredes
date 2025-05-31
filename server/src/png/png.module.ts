import { Module } from '@nestjs/common';
import { PngService } from './png.service';
import { PngController } from './png.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/guards/guards';

@Module({
  providers: [PngService, JwtService, ConfigService, AuthGuard],
  controllers: [PngController],
})
export class PngModule {}
