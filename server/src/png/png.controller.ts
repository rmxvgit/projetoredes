import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PngService } from './png.service';
import { AuthGuard } from 'src/auth/guards/guards';

@Controller('png')
export class PngController {
  constructor(private readonly pngService: PngService) {}

  @Get('user:id')
  findAllUserPosts(@Param('id') id: string) {
    return this.pngService.findAllUserPngs(+id);
  }

  @Get('recent')
  @UseGuards(AuthGuard)
  findRecentUserPngs() {
    return this.pngService.findRecentPngs();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pngService.findOne(+id);
  }
}
