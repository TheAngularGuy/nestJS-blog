import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from 'src/models/category/category.dto';

import { CategoryService } from './category.service';

@Controller('api/category')
export class CategoryController {

  constructor(
    private readonly service: CategoryService,
  ) { }

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number) {
    try {
      return this.service.getCategories(page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':categoryId')
  async getOne(@Param('categoryId') catId: number) {
    try {
      return await this.service.getOneCategory(catId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() catDto: CategoryDto) {
    try {
      return await this.service.createcCtegory(catDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

}
