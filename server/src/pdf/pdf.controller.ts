import {
  Controller,
  Res,
  Post,
  UseGuards,
  Body,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Param, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { AuthGuard } from 'src/auth/guards/guards';
import { FileStorage } from 'src/lib/storage';
import { join } from 'path/posix';
import { existsSync, createReadStream } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthTokenDto } from 'src/auth/dto/auth.dto';
import { NewPngBody, ImageFields } from 'src/png/dtos';
import { getUserTokenData } from 'src/lib/conversions';

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
    console.log('retrieving pdf', name);
    let file_path = join(process.cwd(), FileStorage.PNG_STORAGE_PATH, name);

    if (!existsSync(file_path)) {
      file_path = join(process.cwd(), FileStorage.DEFAULT_PDF_PATH);
    }

    const stream = createReadStream(file_path);
    stream.pipe(res);
  }

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  newPngPost(
    @Body() body: NewPngBody,
    @UploadedFile()
    image: ImageFields,
    @Req() request: any,
  ) {
    console.log('posting pdf...', image.originalname);
    const user: AuthTokenDto = getUserTokenData(request);
    return this.pdfService.createPdf(body, image, user.id);
  }

  @Get('recent')
  @UseGuards(AuthGuard)
  findRecentPdfs() {
    return this.pdfService.findRecenPdfs();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.pdfService.findOne(+id);
  }
}
