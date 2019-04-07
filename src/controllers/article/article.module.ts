import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article/article.entity';

import { AuthModule } from '../auth/auth.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity
    ]),
    AuthModule
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
