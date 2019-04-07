import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

}
