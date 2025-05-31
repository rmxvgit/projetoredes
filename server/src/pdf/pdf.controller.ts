import { Controller, UseGuards } from '@nestjs/common';
import { Param, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { AuthGuard } from 'src/auth/guards/guards';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pngService: PdfService) {}

  @Get('user:id')
  @UseGuards(AuthGuard)
  findAllUserPdfs(@Param('id') id: string) {
    return this.pngService.findAllUserPngs(+id);
  }

  @Get('recent')
  @UseGuards(AuthGuard)
  findRecentPdfs() {
    return this.pngService.findRecentPngs();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.pngService.findOne(+id);
  }
}
