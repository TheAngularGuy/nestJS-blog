import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { JwtToken } from 'src/models/auth/jwt.token';
import { LoginDto } from 'src/models/auth/login.dto';
import { PasswordDto } from 'src/models/auth/password.dto';
import { SigninDto } from 'src/models/auth/signin.dto';

import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() user: LoginDto): Promise<JwtToken> {
    try {
      return await this.authService.logIn(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Post('signin')
  async signIn(@Body() user: SigninDto): Promise<JwtToken> {
    try {
      return await this.authService.signIn(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':userId/password')
  async editPassword(@Param('userId') userId: number, @Body() passDto: PasswordDto) {
    try {
      const ret = await this.authService.editPassword(userId, passDto);
      return ret;
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
