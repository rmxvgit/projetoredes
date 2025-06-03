/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthTokenDto } from 'src/auth/dto/auth.dto';

export function getUserTokenData(request: any): AuthTokenDto {
  if ('user' in request) {
    return request.user;
  }
  throw new HttpException(
    'getUserTokenData: credenciais inválidas',
    HttpStatus.UNAUTHORIZED,
  );
}
