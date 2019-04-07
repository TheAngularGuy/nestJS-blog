import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

@Controller('api/user')
@UseGuards(AuthGuard())
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number) {
    return this.userService.getUsers(page, take);
  }

}
