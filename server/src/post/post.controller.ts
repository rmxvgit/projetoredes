import { Controller, Param, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos';
import { AuthGuard } from 'src/auth/guards/guards';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('user:id')
  findAllUserPosts(@Param('id') id: string) {
    return this.postService.findAllUserPosts(+id);
  }

  @Get('recent')
  @UseGuards(AuthGuard)
  findRecentPosts() {
    return this.postService.findRecentPosts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }
}
