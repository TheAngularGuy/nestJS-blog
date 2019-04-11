import { Allow, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {

  @Allow()
  avatar?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @MinLength(4)
  password?: string;

  @IsNotEmpty()
  firstname?: string;

  @IsNotEmpty()
  lastname?: string;

  @Allow()
  isAuthor?: boolean;

}
