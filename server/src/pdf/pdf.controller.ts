import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Param, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { AuthGuard } from 'src/auth/guards/guards';
import { FileStorage } from 'src/lib/storage';
import { join } from 'path/posix';
import { existsSync, createReadStream } from 'fs';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('user:id')
  @UseGuards(AuthGuard)
  findAllUserPdfs(@Param('id') id: string) {
    return this.pdfService.findAllUserPngs(+id);
  }

  @Get('see:name')
  findRecendUserPngImages(@Param('name') name: string, @Res() res: Response) {
    console.log(name);
    console.log(process.cwd());
    console.log(FileStorage.PDF_STORAGE_PATH);

    const file_path = join(process.cwd(), FileStorage.PNG_STORAGE_PATH, name);

    if (!existsSync(file_path)) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }

    const stream = createReadStream(file_path);
    stream.pipe(res);
  }

  @Get('recent')
  @UseGuards(AuthGuard)
  findRecentPdfs() {
    return this.pdfService.findRecentPngs();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.pdfService.findOne(+id);
  }
}
