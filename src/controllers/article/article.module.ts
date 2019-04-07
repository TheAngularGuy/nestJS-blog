import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article/article.entity';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity
    ])
  ],
  controllers: [
    ArticleController
  ],
  providers: [
    ArticleService
  ],
  exports: [
    ArticleService
  ]
})
export class ArticleModule { }
