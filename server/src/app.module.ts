import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PngModule } from './png/png.module';
import { PdfModule } from './pdf/pdf.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PostModule, PngModule, PdfModule, UserModule],
  providers: [AppService],
})
export class AppModule {}
