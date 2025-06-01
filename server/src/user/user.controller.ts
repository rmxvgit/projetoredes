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
    image: { originalname: string; buffer: Buffer; mimetype: string },
    @Body() body: { name: string; job: string; password: string; bio: string },
  ) {
    const user_data = {
      name: body.name,
      job: body.job,
      password: body.password,
      bio: body.bio,

      image: '',
      buffer: image.buffer,
      type: image.mimetype.split('/')[1],
    };

    return this.userService.create(user_data);
  }

  // 🚨 PEGAR IMAGEM DE PERFIL
  @Get('profileimage')
  @UseGuards(AuthGuard)
  getUserImage(@Param('id') id: string) {}

  // 🚨 ALTERAR IMAGEM DO USUÁRIO
  @Patch('image:id')
  updateUserImage(@Param('id') id: string) {}

  // 🚨 ALTERAR DADOS DO USUÁRIO
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(parseInt(id, 10), data);
  }
}
