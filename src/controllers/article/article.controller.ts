import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleDto } from 'src/models/article.dto';

import { ArticleService } from './article.service';

@Controller('api/article')
export class ArticleController {

  constructor(private readonly service: ArticleService) { }

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number) {
    Logger.log('get all articles', 'ArticleController');
    return this.service.getArticles(page, take);
  }

  @Get(':articleId')
  async getOne(@Param('articleId') articleId: number) {
    Logger.log('get one article', 'ArticleController');
    const article = await this.service.getOneArticle(articleId);
    if (article) {
      return article;
    }
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  async create(@Body() articleDto: ArticleDto) {
    Logger.log('create new article', 'ArticleController');
    if (articleDto && articleDto.body && articleDto.title) {
      const article = await this.service.createArticle(articleDto);
      if (article) {
        return article;
      }
    }
    throw new HttpException('Not created', HttpStatus.NOT_ACCEPTABLE);
  }

  @Put(':articleId')
  async update(@Param('articleId') articleId: number, @Body() articleDto: ArticleDto) {
    Logger.log('edit article', 'ArticleController');
    if (articleDto && articleDto.body && articleDto.title) {
      const article = await this.service.updateArticle(articleId, articleDto);
      if (article) {
        return article;
      }
    }
    throw new HttpException('Not updated', HttpStatus.NOT_ACCEPTABLE);
  }

  @Delete(':articleId')
  async remove(@Param('articleId') articleId: number) {
    Logger.log('remove article', 'ArticleController');
    const article = await this.service.removeArticle(articleId);
    if (article) {
      return article;
    }
    throw new HttpException('Not deleted', HttpStatus.NOT_FOUND);
  }

}
