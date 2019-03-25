import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { CommentDto } from 'src/models/comment.dto';

import { CommentService } from './comment.service';

@Controller('api/comment')
export class CommentController {

  constructor(private readonly service: CommentService) { }

  @Post()
  async create(@Query('articleId') articleId, @Body() commentDto: CommentDto) {
    Logger.log('create new comment', 'CommentController');
    if (commentDto && commentDto.message) {
      const comment = await this.service.createComment(articleId, commentDto);
      if (comment) {
        return comment;
      }
    }
    throw new HttpException('Not created', HttpStatus.NOT_ACCEPTABLE);
  }

  @Get()
  getAll(@Query('articleId') articleId, @Query('page') page: number, @Query('take') take: number) {
    Logger.log('get all comments', 'CommentController');
    return this.service.getComments(articleId, page, take);
  }

  @Get(':commentId')
  async getOne(@Param('commentId') commentId: number) {
    Logger.log('get one article', 'CommentController');
    const comment = await this.service.getOneComment(commentId);
    if (comment) {
      return comment;
    }
    throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
  }

  @Put(':commentId')
  async update(@Param('commentId') commentId: number, @Body() commentDto: CommentDto) {
    Logger.log('edit comment', 'CommentController');
    if (commentDto && commentDto.message) {
      const comment = await this.service.updateComment(commentId, commentDto);
      if (comment) {
        return comment;
      }
    }
    throw new HttpException('Not updated', HttpStatus.NOT_ACCEPTABLE);
  }

  @Delete(':commentId')
  async remove(@Param('commentId') commentId: number) {
    Logger.log('remove comment', 'CommentController');
    const comment = await this.service.removeComment(commentId);
    if (comment) {
      return comment;
    }
    throw new HttpException('Not deleted', HttpStatus.NOT_FOUND);
  }

}
