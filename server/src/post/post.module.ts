import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/guards/guards';

@Module({
  providers: [PostService, JwtService, ConfigService, AuthGuard],
  controllers: [PostController],
})
export class PostModule {}
