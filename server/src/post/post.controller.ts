import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('user:id')
  findAllUserPosts(@Param('id') id: string) {
    return this.postService.findAllUserPosts(+id);
  }

  @Get('recent')
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
