import { Module } from '@nestjs/common';
import { PngService } from './png.service';
import { PngController } from './png.controller';

@Module({
  providers: [PngService],
  controllers: [PngController],
})
export class PngModule {}
