export interface LoginDto {
  name: string;
  password: string;
}

export class AuthTokenDto {
  name: string;
  id: number;
  iat: number;
  exp: number;
}
