import { Controller, Get, Param } from '@nestjs/common';
import { PngService } from './png.service';

@Controller('png')
export class PngController {
  constructor(private readonly pngService: PngService) {}

  @Get('user:id')
  findAllUserPosts(@Param('id') id: string) {
    return this.pngService.findAllUserPngs(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pngService.findOne(+id);
  }
}
