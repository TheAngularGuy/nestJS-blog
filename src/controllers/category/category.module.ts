import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/models/category/category.entity';

import { AuthModule } from '../auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity
    ]),
    AuthModule,
  ],
  controllers: [
    CategoryController,
  ],
  providers: [
    CategoryService,
  ],
  exports: [
    CategoryService,
  ]
})
export class CategoryModule { }
