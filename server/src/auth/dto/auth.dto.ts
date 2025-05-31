export interface LoginDto {
  name: string;
  password: string;
}

export interface AuthTokenDto {
  name: string;
  id: number;
  iat: number;
  exp: number;
}
