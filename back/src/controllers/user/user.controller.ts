import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../auth/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

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
}
