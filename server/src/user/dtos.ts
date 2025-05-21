export interface CreateUserDto {
  name: string;
  password: string;
  bio: string;
  image: string;
  job: string;
}

export interface UpdateUserDto {
  name: string | undefined;
  password: string | undefined;
  bio: string | undefined;
  image: string | undefined;
  job: string | undefined;
}
