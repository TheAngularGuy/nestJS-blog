import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/models/auth/jwt.payload';
import { CommentDto } from 'src/models/comment/comment.dto';
import { UtilitiesService } from 'src/services/utilities/utilities.service';

import { CommentService } from './comment.service';


@Controller('api/article/:articleId/comment')
export class CommentController {

  constructor(
    private readonly service: CommentService,
    private readonly utils: UtilitiesService
  ) { }

  @Get()
  getAll(@Param('articleId') articleId: number, @Query('page') page: number, @Query('take') take: number) {
    try {
      return this.service.getComments(articleId, page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':commentId')
  async getOne(@Param('commentId') commentId: number) {
    try {
      return await this.service.getOneComment(commentId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Param('articleId') articleId: number, @Body() commentDto: CommentDto, @Headers() headers: any) {
    try {
      const token: JwtPayload = await this.utils.headersToJwtDecoded(headers);
      return await this.service.createComment(articleId, commentDto, token.email);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':commentId')
  @UseGuards(AuthGuard())
  async update(@Param('commentId') commentId: number, @Body() commentDto: CommentDto) {
    try {
      return await this.service.updateComment(commentId, commentDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard())
  async remove(@Param('commentId') commentId: number) {
    try {
      return await this.service.removeComment(commentId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

}
