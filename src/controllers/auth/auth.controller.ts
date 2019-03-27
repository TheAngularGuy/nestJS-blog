import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/models/user.dto';
import { UserEntity } from 'src/models/user.entity';

import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }


  @Post('login')
  async logIn(@Body() user: UserDto): Promise<any> {
    const ret = await this.authService.logIn(user);
    if (ret) {
      return ret;
    }
    throw new UnauthorizedException();
  }

  @Post('signin')
  async signIn(@Body() user: UserDto): Promise<UserEntity> {
    const ret = await this.authService.signIn(user);
    if (ret) {
      return ret;
    }
    throw new HttpException('Not registred', HttpStatus.NOT_ACCEPTABLE);
  }

}
