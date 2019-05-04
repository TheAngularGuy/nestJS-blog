import { Allow, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @Allow()
  avatar?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Allow()
  password?: string;

  @IsNotEmpty()
  firstname?: string;

  @IsNotEmpty()
  lastname?: string;

  @Allow()
  isAuthor?: boolean;

  @Allow()
  isAdmin?: boolean;
}
