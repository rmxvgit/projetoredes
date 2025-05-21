import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { PdfController } from './pdf/pdf.controller';
import { PngController } from './png/png.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PostController,
    PdfController,
    PngController,
  ],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
