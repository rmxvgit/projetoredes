import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id, 10));
  }

  @Get()
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
