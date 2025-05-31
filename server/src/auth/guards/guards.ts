import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const token = request.headers.authorization.split(' ')[1];

      if (!token || typeof token != 'string') return false;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = this.jwt.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      console.log('token payload:', payload);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
