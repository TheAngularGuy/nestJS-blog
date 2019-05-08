import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
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
      const userOwnInfo = this.userService.getOneUserArticlesByEmail(user.email);
      return userOwnInfo;
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Get('/own/articles')
  async getOwnArticles(@User() user: any, @Query('page') page: number, @Query('take') take: number) {
    try {
      const articlesOfUser = this.userService.getOneUserArticlesByEmail(user.email, page, take);
      return articlesOfUser;
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Get('/own/articles/count')
  async getOwnArticlesCount(@User() user: any) {
    try {
      const countOfUserArticles = this.userService.getOneUserArticlesCountByEmail(user.email);
      return countOfUserArticles;
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

  @Delete(':userId')
  async delete(@Param('userId') userId: number) {
    try {
      const user = await this.userService.getOneUserById(userId);
      const ret = await this.userService.deleteUser(user);
      return ret;
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }

  @Get()
  getAuthors(@Query('page') page: number, @Query('take') take: number) {
    try {
      return this.userService.getAuthors(page, take);
    } catch (err) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }
  }
}
