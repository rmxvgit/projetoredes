import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PngService } from './png.service';
import { AuthGuard } from 'src/auth/guards/guards';
import { join } from 'node:path/posix';
import { FileStorage } from 'src/lib/storage';
import { createReadStream, existsSync } from 'node:fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFields, NewPngBody } from './dtos';
import { AuthTokenDto } from 'src/auth/dto/auth.dto';

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
  seeImage(@Param('name') name: string, @Res() res: Response) {
    console.log(name);
    console.log(process.cwd());
    console.log(FileStorage.PNG_STORAGE_PATH);

    let file_path = join(process.cwd(), FileStorage.PNG_STORAGE_PATH, name);

    if (!existsSync(file_path)) {
      file_path = join(process.cwd(), FileStorage.DEFAULT_PROFILE_IMG_PATH);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user: AuthTokenDto = request.user;
    return this.pngService.createPng(body, image, user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pngService.findOne(+id);
  }
}
