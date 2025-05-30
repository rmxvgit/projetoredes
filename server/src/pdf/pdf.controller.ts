import { Controller } from '@nestjs/common';
import { Param, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pngService: PdfService) {}

  @Get('user:id')
  findAllUserPdfs(@Param('id') id: string) {
    return this.pngService.findAllUserPngs(+id);
  }

  @Get('recent')
  findRecentPdfs() {
    return this.pngService.findRecentPngs();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pngService.findOne(+id);
  }
}
