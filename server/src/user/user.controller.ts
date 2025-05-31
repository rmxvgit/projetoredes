import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { AuthGuard } from 'src/auth/guards/guards';
import { AuthTokenDto } from 'src/auth/dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id, 10));
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('teachers')
  findTeachers() {
    return this.userService.findAllTeachers();
  }

  @Get('students')
  findStudents() {
    return this.userService.findAllStudents();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(parseInt(id, 10), data);
  }
}
