import { Body, Controller, Get, HttpException, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/models/user/user.dto';

import { User } from '../auth/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/count')
  getCount() {
    try {
      return this.userService.getCount();
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number) {
    try {
      return this.userService.getUsers(page, take);
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Get('/own')
  async getOwn(@User() user: any) {
    try {
      const userOwnInfo = this.userService.getOneUserByEmail(user.email);
      return userOwnInfo;
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Put(':userId')
  async edit(@Param('userId') userId: number, @Body() userDto: UserDto) {
    try {
      const ret = await this.userService.editUser(userId, userDto);
      return ret;
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Get()
  getAuthors(@Query('page') page: number, @Query('take') take: number) {
    try {
      return this.userService.getUsersAuthors(page, take);
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }
}
