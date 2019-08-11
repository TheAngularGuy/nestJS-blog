import { Allow, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {

  @IsNotEmpty()
  username?: string;

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

}
