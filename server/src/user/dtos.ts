export interface CreateUserDto {
  name: string;
  password: string;
  bio: string;
  image: string;
  job: string;
}

export interface UpdateUserDto {
  name?: string;
  password?: string;
  bio?: string;
  image?: string;
  job?: string;
}
