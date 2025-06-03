import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos';
import { AuthGuard } from 'src/auth/guards/guards';
import { AuthTokenDto } from 'src/auth/dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageInfo } from 'src/lib/dtos';
import { getUserTokenData } from 'src/lib/conversions';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🍏 PEGAR DADOS DO USUÁRIO
  @Get('profile:id')
  @UseGuards(AuthGuard)
  getUserProfile(@Param('id') id: string, @Req() request: any) {
    if (id === 'me') {
      console.log(typeof request);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const user: AuthTokenDto = request.user;
      return this.userService.getUserProfile(user.id, true);
    }
    return this.userService.getUserProfile(parseInt(id, 10), false);
  }

  // 🍏 PEGAR TODOS OS USUÁRIOS
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  // 🚨 CRIAR USUÁRIO
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Req() request: any,
    @UploadedFile()
    image: ImageInfo | null,
    @Body() body: { name: string; job: string; password: string; bio: string },
  ) {
    if (!image) {
      return this.userService.createNoImage();
    }

    const user_data = {
      name: body.name,
      job: body.job,
      password: body.password,
      bio: body.bio,

      image: image.originalname,
      buffer: image.buffer,
      type: image.mimetype.split('/')[1],
    };

    return this.userService.create(user_data);
  }

  // 🚨 ALTERAR IMAGEM DO USUÁRIO
  @Patch('image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateUserImage(@Req() req: any, @UploadedFile() img: ImageInfo) {
    console.log(img);
    const credentials = getUserTokenData(req);
    return this.userService.updateUserImage(credentials, img);
  }

  // 🚨 ALTERAR DADOS DO USUÁRIO
  @Patch()
  @UseGuards(AuthGuard)
  update(@Body() data: UpdateUserDto, @Req() req: any) {
    console.log(data);
    const credetials = getUserTokenData(req);
    return this.userService.update(credetials, data);
  }
}
