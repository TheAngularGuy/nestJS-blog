import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleDto } from 'src/models/article/article.dto';

import { ArticleService } from './article.service';

@Controller('api/article')
export class ArticleController {

  constructor(private readonly service: ArticleService) { }

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number) {
    try {
      return this.service.getArticles(page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':articleId')
  async getOne(@Param('articleId') articleId: number) {
    try {
      return await this.service.getOneArticle(articleId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() articleDto: ArticleDto) {
    try {
      return await this.service.createArticle(articleDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':articleId')
  @UseGuards(AuthGuard())
  async update(@Param('articleId') articleId: number, @Body() articleDto: ArticleDto) {
    try {
      return await this.service.updateArticle(articleId, articleDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':articleId')
  @UseGuards(AuthGuard())
  async remove(@Param('articleId') articleId: number) {
    try {
      return await this.service.removeArticle(articleId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

}
