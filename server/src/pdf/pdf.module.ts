import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { AuthGuard } from 'src/auth/guards/guards';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [PdfService, AuthGuard, JwtService, ConfigService],
  controllers: [PdfController],
})
export class PdfModule {}
