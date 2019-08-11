import { MinLength } from 'class-validator';

export class PasswordDto {
  @MinLength(4)
  password?: string;

  @MinLength(4)
  password1?: string;

  @MinLength(4)
  password2?: string;
}
