import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleDto } from 'src/models/article/article.dto';

import { User } from '../auth/decorators/user.decorator';
import { CategoryService } from '../category/category.service';
import { ArticleService } from './article.service';

@Controller('api/article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('/count')
  async getCount() {
    try {
      return await this.service.getCount();
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }

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
  async create(@Body() articleDto: ArticleDto, @User() user: any) {
    try {
      return await this.service.createArticle(articleDto, user.email);
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

  @Get('category/:categoryId/count')
  async getCountByCategory(@Param('categoryId') categoryId: number) {
    try {
      const category = await this.categoryService.getOneCategory(categoryId);
      return await this.service.getArticlesCountByCategory(category);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }
}
