import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDto } from '../dto/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = request.headers.authorization?.split(' ')[1];

    if (!token || typeof token != 'string') return false;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwt.verifyAsync(token);
      if (!(payload instanceof AuthTokenDto)) {
        console.log('invalid token values');
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
