import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PngService } from './png.service';
import { AuthGuard } from 'src/auth/guards/guards';
import { join } from 'node:path/posix';
import { FileStorage } from 'src/lib/storage';
import { createReadStream, existsSync } from 'node:fs';
import { Response } from 'express';

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

  @Get('see:name')
  findRecendUserPngImages(@Param('name') name: string, @Res() res: Response) {
    console.log(name);
    console.log(process.cwd());
    console.log(FileStorage.PNG_STORAGE_PATH);

    const file_path = join(process.cwd(), FileStorage.PNG_STORAGE_PATH, name);

    if (!existsSync(file_path)) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }

    const stream = createReadStream(file_path);
    stream.pipe(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pngService.findOne(+id);
  }
}
