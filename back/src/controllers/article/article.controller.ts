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
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';

@Controller('api/article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
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

  @Get('category/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId: number,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    try {
      const category = await this.categoryService.getOneCategory(categoryId);
      return await this.service.getArticlesByCategory(category, page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }

  @Get('author/:authorId/count')
  async getCountByAuthor(@Param('authorId') authorId: number) {
    try {
      const author = await this.userService.getOneUserById(authorId);
      return await this.service.getArticlesCountByAuthor(author);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }

  @Get('author/:authorId')
  async getByAuthor(
    @Param('authorId') authorId: number,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    try {
      const author = await this.userService.getOneUserById(authorId);
      return await this.service.getArticlesByAuthor(author, page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }
}
